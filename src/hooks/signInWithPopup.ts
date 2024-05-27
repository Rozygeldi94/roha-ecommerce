import {
  signInWithPopup,
  GoogleAuthProvider,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { IsUserExits } from "@/utils/isUserExits";
import { getAllUsersFromFirestore } from "@/utils/getAllUsersFromFirestore";
import { AES, enc } from "crypto-js";
import { useToast } from "@chakra-ui/react";

export const useSignInWithGoogle = () => {
  const toast = useToast();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const allFirestoreUsers = await getAllUsersFromFirestore();

    await signInWithPopup(auth, provider)
      .then((result) => {
        const currentUser = result.user;
        const filteredUser = allFirestoreUsers.filter(
          (firestoreUser) => firestoreUser.user_email === currentUser.email
        );
        const filteredUserPassword = AES.decrypt(
          filteredUser[0]?.password,
          import.meta.env.VITE_USER_PASSWORD_SECRET
        ).toString(enc.Utf8);

        if (filteredUser) {
          updatePassword(currentUser, filteredUserPassword)
            .then(() => {})
            .catch((error) => {});
        }

        const userName = currentUser.displayName?.split(" ");

        (async () => {
          const isUserExits = await IsUserExits(currentUser?.email);
          if (!isUserExits) {
            await setDoc(doc(db, "users", currentUser?.email as string), {
              first_name: userName?.[0],
              last_name: userName?.[1],
              user_email: currentUser?.email,
              gender: "",
              date: Date.now(),
              provider: "google.com",
              avatar: "",
              isEmailVerified: true,
            });
            toast({
              title: "Account succesfully created via Google",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          } else {
            await updateDoc(doc(db, "users", currentUser?.email as string), {
              provider: "google.com",
              isEmailVerified: true,
            });
          }
        })();
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          toast({
            title:
              "Please sign in with Google or using your email adress and password!",
            status: "error",
            duration: 6000,
            isClosable: true,
            position: "top",
          });
        }
      });
  };
  return { signInWithGoogle };
};
