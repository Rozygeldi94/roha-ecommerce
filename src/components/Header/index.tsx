import { FC, useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ROOT } from "@/route";
import { Box, Link, useMediaQuery, Flex } from "@chakra-ui/react";
import { Navbar } from "./Bottom-Section/Navbar";
import { ShoppingCartButton } from "./Middle-Section/ShoppingCartButton";
import { User } from "./Middle-Section/User";
import { ToogleDarkMode } from "./Middle-Section/ToogleDarkMode";
import { HamburgerMenu } from "./Middle-Section/HamburgerMenu";
import { Search } from "./Middle-Section/Search-Products";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { UserLocalTime } from "./Top-Section/UserLocalTime";
import { UserLocationWeather } from "./Top-Section/UserLocationWeather";
import { MyContact } from "./Top-Section/MyContact";
import { useLazyGetProductsByTitleQuery } from "@/store/api";
import { MainContext } from "@/pages/Layout";
import { SearchModalContainer } from "./Middle-Section/Search-Products/SearchModalContainer";
import { HeaderLogo } from "./Middle-Section/HeaderLogo";

interface IHeaderProps {
  isVisibleOfferSection: boolean;
}

export const Header: FC<IHeaderProps> = ({ isVisibleOfferSection }) => {
  const products = useTypedSelector(
    (state) => state.shoppingCard.shoppingCartProducts
  );
  const { authUser, hasScrolled, colorMode } = useContext(MainContext);
  const [isLargerThan767] = useMediaQuery("(min-width: 768px)");
  const [isLargerThan640] = useMediaQuery("(min-width: 640px)");
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [isLargerThan440] = useMediaQuery("(min-width: 440px)");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trigger] = useLazyGetProductsByTitleQuery();
  const searchInputValue = useTypedSelector(
    (state) => state.searchProducts.value
  );
  const offerSectionHeight =
    document.getElementById("offer-section")?.offsetHeight;

  useEffect(() => {
    //  trigger(searchInputValue);
    if (searchInputValue.length) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [searchInputValue]);

  return (
    <>
      {hasScrolled ? (
        <Box
          as="header"
          id="header"
          bg={colorMode === "light" ? "#dcecef" : "#2b3648"}
          borderBottom={
            colorMode === "light" ? "2px solid #324a78" : "2px solid #737283"
          }
          width="100%"
          position="fixed"
          top={isVisibleOfferSection ? `${offerSectionHeight}px` : "0"}
          left="0"
          zIndex="999"
        >
          <Box width="100%">
            <Flex
              maxWidth="1230px"
              width="100%"
              padding={{ base: "0 10px", isLargerThan440: "0 15px" }}
              margin={isLargerThan767 ? "10px auto" : "8px 0"}
              alignItems="center"
              gap={{ base: "10px", isLargerThan440: "20px", md: "40px" }}
              position="relative"
            >
              <HamburgerMenu isLargerThan440={isLargerThan440} />
              <Link as={RouterLink} to={ROOT}>
                {colorMode === "light" ? (
                  <HeaderLogo logoSrc="/logo_brown.svg" />
                ) : (
                  <HeaderLogo logoSrc="/logo_white.svg" />
                )}
              </Link>
              <Box flexGrow={1} maxW="100%">
                <Search
                  isMobile={isLargerThan600 ? false : true}
                  isVisible={false}
                />
              </Box>
              <Box
                className="right-content"
                display="flex"
                justifyContent={{ base: "end", md: "unset" }}
                alignItems="center"
                gap={{ base: "10px", md: "15px" }}
                flexGrow={{ base: "1", md: "inherit" }}
              >
                <User
                  isLargerThan767={isLargerThan767}
                  isLargerThan440={isLargerThan440}
                  products={products}
                />
                <ShoppingCartButton
                  products={products}
                  type="link"
                  hasBorder={true}
                  isLargerThan767={isLargerThan767}
                />
                <ToogleDarkMode
                  isVisible={isLargerThan440 || !authUser ? true : false}
                  isMobileVersion={false}
                />
              </Box>
              {isModalOpen && (
                <SearchModalContainer setIsModalOpen={setIsModalOpen} />
              )}
            </Flex>
          </Box>
        </Box>
      ) : (
        <Box
          as="header"
          id="header"
          bg={colorMode === "light" ? "#dcecef" : "#2b3648"}
          borderBottom={
            colorMode === "light" ? "2px solid #324a78" : "2px solid #737283"
          }
          width="100%"
          position="fixed"
          top={isVisibleOfferSection ? `${offerSectionHeight}px` : "0"}
          left="0"
          zIndex="999"
        >
          <Box
            width="100%"
            borderBottom={
              colorMode === "light" ? "1px solid #b7b5dc" : "1px solid #494755"
            }
          >
            <Box
              maxWidth="1230px"
              width="100%"
              padding={{ base: "0 10px", isLargerThan440: "0 15px" }}
              margin="5px auto"
              display="flex"
              justifyContent="end"
              alignItems="center"
              gap="40px"
            >
              <UserLocalTime isActive={isLargerThan440 ? true : false} />
              <UserLocationWeather />
              <Box
                flexGrow="1"
                display="flex"
                justifyContent="end"
                alignItems="center"
                gap="20px"
              >
                {isLargerThan640 && (
                  <MyContact
                    contact="rozygeldi1994@gmail.com"
                    to="mailto:rozygeldi1994@gmail.com"
                    rel="nofollow"
                  />
                )}
                <MyContact
                  contact="+905425750594"
                  to="tel:+905425750594"
                  rel="nofollow"
                />
              </Box>
            </Box>
          </Box>
          <Box width="100%">
            <Flex
              maxWidth="1230px"
              width="100%"
              padding={{ base: "0 10px", isLargerThan440: "0 15px" }}
              margin={isLargerThan767 ? "10px auto" : "4px 0"}
              alignItems="center"
              gap={{ base: "10px", isLargerThan440: "20px", md: "40px" }}
              position="relative"
            >
              <HamburgerMenu isLargerThan440={isLargerThan440} />
              <Link as={RouterLink} to={ROOT}>
                {colorMode === "light" ? (
                  <HeaderLogo logoSrc="/logo_brown.svg" />
                ) : (
                  <HeaderLogo logoSrc="/logo_white.svg" />
                )}
              </Link>
              <Box flexGrow={1} maxW="100%">
                <Search
                  isMobile={isLargerThan600 ? false : true}
                  isVisible={false}
                />
              </Box>
              <Box
                className="right-content"
                display="flex"
                justifyContent={{ base: "end", md: "unset" }}
                alignItems="center"
                gap={{ base: "10px", md: "15px" }}
                flexGrow={{ base: "1", md: "inherit" }}
              >
                <User
                  isLargerThan767={isLargerThan767}
                  isLargerThan440={isLargerThan440}
                  products={products}
                />
                <ShoppingCartButton
                  products={products}
                  type="link"
                  hasBorder={true}
                  isLargerThan767={isLargerThan767}
                />
                <ToogleDarkMode
                  isVisible={isLargerThan440 || !authUser ? true : false}
                  isMobileVersion={false}
                />
              </Box>
              {isModalOpen && (
                <SearchModalContainer setIsModalOpen={setIsModalOpen} />
              )}
            </Flex>
          </Box>
          <Box width="100%">
            {isLargerThan767 && (
              <Box
                maxWidth="1230px"
                width="100%"
                minHeight={{ base: "30px", sm: "40px", md: "50px" }}
                padding={{ base: "0 10px", sm: "0 15px" }}
                margin="0 auto"
                alignItems="center"
                gap="10px"
              >
                <Box
                  as="nav"
                  display={{ base: "none", md: "flex" }}
                  justifyContent="center"
                  flexGrow="1"
                >
                  <Navbar />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
