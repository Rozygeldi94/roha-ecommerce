import { onAuthStateChanged } from "firebase/auth";
import { addDoc, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
import { IShoppingCartSliceState } from "@/types/product.types";

interface IUpdateFirestoreDocField {
  (
    data: IShoppingCartSliceState[],
    documentFieldTitle: string,
    isArrayUnion: boolean
  ): void;
}

export const updateFirestoreDocField: IUpdateFirestoreDocField = (
  data,
  documentFieldTitle,
  isArrayUnion
) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      (async () => {
        const docRef = doc(db, "users", user?.email);
        if (isArrayUnion) {
          await updateDoc(docRef, {
            [documentFieldTitle]: arrayUnion(data),
          });
        } else {
          await updateDoc(docRef, {
            [documentFieldTitle]: [...data],
          });
        }
      })();
    }
  });
};
