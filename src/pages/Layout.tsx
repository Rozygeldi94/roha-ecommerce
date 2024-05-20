import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import {
  Box,
  ColorMode,
  Flex,
  Grid,
  Skeleton,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  Dispatch,
  SetStateAction,
  Suspense,
  createContext,
  useEffect,
  useState,
} from "react";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { ScrollToTop } from "@/utils/scrollToTop";
import { useAuth } from "@/hooks/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { ICurrentUser } from "@/types/currentUser.types";
import { IDatabaseUser } from "@/types/databaseUser.type";
import { OfferSection } from "@/components/Header/_offerSection/OfferSection";
import { useRealtimeDataBase } from "@/hooks/realtimeDataBase";

type TMainContext = {
  currentUser: ICurrentUser | DocumentData | null;
  databaseUser: IDatabaseUser | null; //tazeden goz gezdirmeli sebabi firebase realtime database loading edenok!
  authUser: User | null | undefined;
  colorMode: ColorMode;
  hasScrolled: boolean;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const MainContext = createContext<TMainContext>(null);

export default function Layout() {
  const storeProducts = useTypedSelector(
    (state) => state.shoppingCard.shoppingCartProducts
  );
  const [isLargerThan767] = useMediaQuery("(min-width: 768px)");
  const { saveImportedDataToStore } = useActions();
  const location = useLocation();
  const [isVisibleOfferSection, setIsVisibleOfferSection] = useState(true);
  const { getData, getData2 } = useRealtimeDataBase();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      async function fetchData() {
        const docRef = doc(db, "users", user?.email as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.data()?.shopping_cart.length && !storeProducts.length) {
          saveImportedDataToStore(docSnap.data()?.shopping_cart);
        }
      }
      fetchData();
    }
  });
  const [hasScrolled, setHasSrolled] = useState(false);
  useEffect(() => {
    const resizeHeaderOnScroll = () => {
      setHasSrolled((hasScrolled) => {
        if (
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
        ) {
          return true;
        }

        if (
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false;
        }
        return hasScrolled;
      });
    };
    window.addEventListener("scroll", resizeHeaderOnScroll);

    return () => window.removeEventListener("scroll", resizeHeaderOnScroll);
  }, []);
  /*   const obj = {
    name: "Jemal",
    job: "Frontend Developer",
    salary: {
      may: 80,
      juny: 90,
    },
  };
  const arr = [
    ["name", "Jemal"],
    ["job", "Frontend Developer"],
    ["salary", 100],
  ];

  const { job: _, ...aaa } = obj;
  console.log(aaa); */
  const { currentUser } = useAuth();
  const [authUser, authLoading, error] = useAuthState(auth);
  const databaseUser: IDatabaseUser | null = useTypedSelector(
    (state) => state.databaseUser.user
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getData(`users/${authUser?.uid}`);
    getData2(`users`);
  }, [authUser?.uid]);

  const { colorMode } = useColorMode();

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <MainContext.Provider
        value={{
          currentUser,
          databaseUser,
          authUser,
          colorMode,
          hasScrolled,
          isModalOpen,
          setIsModalOpen,
        }}
      >
        {isVisibleOfferSection && (
          <OfferSection setIsVisibleOfferSection={setIsVisibleOfferSection} />
        )}
        <Header isVisibleOfferSection={isVisibleOfferSection} />
        <Box as="main" flexGrow="1" position="relative">
          <Suspense
            fallback={
              location.pathname === "/" ? (
                <Box flexGrow="1" position="relative">
                  <Box
                    display="flex"
                    gap="15px"
                    maxWidth="1230px"
                    padding={{ base: "0 10px", isLargerThan440: "0 15px" }}
                    margin="20px auto"
                  >
                    {isLargerThan767 && (
                      <Box
                        width="250px"
                        display="flex"
                        flexDirection="column"
                        gap="15px"
                        position="sticky"
                        top="75px"
                        overflowY="auto"
                        style={{ height: "calc(100vh - 70px)" }}
                      >
                        <Skeleton width="233px" height="275px"></Skeleton>
                        <Skeleton width="233px" height="275px"></Skeleton>
                        <Skeleton width="233px" height="275px"></Skeleton>
                      </Box>
                    )}

                    <Box flexGrow="1" alignSelf="flex-start">
                      <Skeleton height="27px"></Skeleton>
                      <Grid
                        id="products-wrap"
                        mt="20px"
                        gridTemplateColumns={{
                          sm: "repeat(auto-fit, minmax(210px, 1fr))",
                        }}
                        gap="20px"
                      >
                        {Array(5)
                          .fill(undefined)
                          .map((item, i) => (
                            <Skeleton key={i} height="378px" width="218px" />
                          ))}
                      </Grid>
                    </Box>
                  </Box>
                  <Box padding="0 15px">
                    <Skeleton
                      maxWidth="1200px"
                      margin="20px auto"
                      height="30px"
                    ></Skeleton>
                  </Box>
                </Box>
              ) : (
                <Box padding="0 15px">
                  <Text maxWidth="1200px" margin="20px auto">
                    Loading...
                  </Text>
                </Box>
              )
            }
          >
            <Outlet />
          </Suspense>
        </Box>
        <Footer />
      </MainContext.Provider>

      <ScrollToTop />
    </Flex>
  );
}
