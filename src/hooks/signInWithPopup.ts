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

    signInWithPopup(auth, provider)
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
            .then(() => {
              console.log("password changed");
            })
            .catch((error) => {
              console.log(error);
            });
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
        console.log(error.message);

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

/* export const useSignInWithFacebook = () => {
  const signInWithFacebook = () => {
    let existingEmail = null;
    let pendingCred = null;
    let facebookProvider = new FacebookAuthProvider();

    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // Successful sign-in.
      })
      .catch((error) => {
        // Account exists with different credential. To recover both accounts
        // have to be linked but the user must prove ownership of the original
        // account.

        if (error.code == "auth/account-exists-with-different-credential") {
          existingEmail = error.customData.email;
          pendingCred = error.credential;
          // Lookup existing account’s provider ID.

          return fetchSignInMethodsForEmail(auth, error.customData.email)
            .then((providers) => {
              console.log(providers);

              if (providers.indexOf(EmailAuthProvider.PROVIDER_ID) != -1) {
                // Password account already exists with the same email.
                // Ask user to provide password associated with that account.
                var password = window.prompt(
                  "Please provide the password for " + existingEmail
                );
                return signInWithEmailAndPassword(
                  auth,
                  existingEmail,
                  password
                );
              } else if (
                providers.indexOf(GoogleAuthProvider.PROVIDER_ID) != -1
              ) {
                let googProvider = new GoogleAuthProvider();
                // Sign in user to Google with same account.
                googProvider.setCustomParameters({ login_hint: existingEmail });
                return signInWithPopup(auth, googProvider).then(function (
                  result
                ) {
                  return result.user;
                });
              } else {
              }
            })
            .then(function (user) {
              // Existing email/password or Google user signed in.
              // Link Facebook OAuth credential to existing account.
              return user.linkWithCredential(pendingCred);
            });
        }
        throw error;
      });
  };
  return { signInWithFacebook };
}; */
