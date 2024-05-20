import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getCurrentMonth } from "@/utils/getCurrentMonth";
import { useToast } from "@chakra-ui/react";

export interface IPromoCode {
  month: string;
  title: string;
  promo_price: number;
  valid_to: number;
}
export interface IActivatedPromoCode extends IPromoCode {
  activatedDate: number;
}

export function usePromoCode() {
  const [isLoading, setLoading] = useState(false);
  const [currentMonthPromo, setCurrentMonthPromo] = useState<IPromoCode | null>(
    null
  );
  const getCurrentMonthPromo = async () => {
    try {
      setLoading(true);
      const ref = doc(db, "promo-codes", "all-products");
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const currentMonth = getCurrentMonth();
        setCurrentMonthPromo(docSnap.data()[currentMonth]);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { currentMonthPromo, getCurrentMonthPromo, isLoading };
}
export const useActivatedPromoCode = () => {
  const [isSaveLoading, setSaveLoading] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const [activatedPromo, setActivatedPromo] =
    useState<IActivatedPromoCode | null>(null);
  const toast = useToast();

  const saveActivatedPromoCode = (
    activatedPromoCode: IPromoCode,
    activatedMonth: string
  ) => {
    onAuthStateChanged(auth, (user) => {
      (async () => {
        try {
          setSaveLoading(true);
          const docRef = doc(db, "users", user?.email as string);
          await updateDoc(docRef, {
            activated_promo_codes: [
              {
                [activatedMonth]: {
                  ...activatedPromoCode,
                  activatedDate: new Date().getTime(),
                },
              },
            ],
          });

          setSaveLoading(false);
        } catch (error) {
          toast({
            title: (error as Error).message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } finally {
          setSaveLoading(false);
        }
      })();
    });
  };

  const getActivatedPromoCode = () => {
    onAuthStateChanged(auth, (user) => {
      (async () => {
        try {
          const docRef = doc(db, "users", user?.email as string);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const currentMonth = getCurrentMonth();
            setActivatedPromo(
              docSnap.data()?.activated_promo_codes?.[0]?.[currentMonth]
            );
          }
        } catch (error) {
          console.error(error);
        }
      })();
    });
  };

  const deleteActivatedPromoCode = () => {
    onAuthStateChanged(auth, (user) => {
      (async () => {
        try {
          setDeleteLoading(true);
          const docRef = doc(db, "users", user?.email as string);
          await updateDoc(docRef, {
            activated_promo_codes: deleteField(),
          });
          setActivatedPromo(null);
          setDeleteLoading(false);
        } catch (error) {
          console.error(error);
        } finally {
          setDeleteLoading(false);
        }
      })();
    });
  };
  return {
    saveActivatedPromoCode,
    isSaveLoading,
    activatedPromo,
    getActivatedPromoCode,
    deleteActivatedPromoCode,
    isDeleteLoading,
  };
};
