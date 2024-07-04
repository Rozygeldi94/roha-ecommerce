import { auth, db } from "../firebase/firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { DocumentData, doc, getDoc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AES } from "crypto-js";
import { useNavigate } from "react-router-dom";
import { LOGIN, ROOT } from "../route";
import { IsUserExits } from "../utils/isUserExits";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useActions } from "./useActions";
import { ICurrentUser } from "@/types/currentUser.types";
import { IRegisterForm } from "@/components/Register";
import { useToast } from "@chakra-ui/react";

export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [currentUser, setcurrentUser] = useState<
    ICurrentUser | DocumentData | null
  >(null);

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", authUser?.email);
      setLoading(true);
      const docSnap = await getDoc(docRef);

      setcurrentUser(docSnap.data());

      setLoading(false);
    }
    if (!authLoading) {
      if (authUser) fetchData();
      else setLoading(false); // Not signed in
    }
  }, [authLoading]);
  return { currentUser, isLoading, error } as const;
}
export function useLogin() {
  const navigate = useNavigate();
  const toast = useToast();
  async function Login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Succesfully signed in",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      navigate(ROOT);
    } catch (error) {
      toast({
        title:
          (error as Error).message ===
          "Firebase: Error (auth/invalid-credential)."
            ? "You have entered incorrect username or password!"
            : (error as Error).message,

        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }
  return { Login };
}

export function useRegister() {
  const navigate = useNavigate();
  const [signOut, isLoading] = useSignOut(auth);

  const toast = useToast();
  const registerUser = async ({
    firstName,
    lastName,
    gender,
    email,
    password,
  }: IRegisterForm) => {
    const isUserExits = await IsUserExits(email);

    if (isUserExits) {
      toast({
        title: "Account is already exits",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      try {
        const encryptedPassword = AES.encrypt(
          password,
          import.meta.env.VITE_USER_PASSWORD_SECRET
        );
        await createUserWithEmailAndPassword(auth, email, password);
        auth.languageCode = "ru";
        let actionCodeSettings = {
          url: "http://localhost:5173/login",
          handleCodeInApp: true,
        };
        if (auth.currentUser) {
          sendEmailVerification(auth.currentUser, actionCodeSettings).then(
            function () {
              // Verification email sent.
            }
          );
        }

        await setDoc(doc(db, "users", email), {
          first_name: firstName,
          last_name: lastName,
          gender: gender,
          user_email: email,
          date: Date.now(),
          provider: "email/password",
          avatar: "",
          isEmailVerified: false,
          password: encryptedPassword.toString(),
        });

        toast({
          title: "Please verify your email adress!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        signOut();
        navigate(LOGIN);
      } catch (error) {
        toast({
          title: (error as Error).message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };
  return { registerUser };
}

export function useLogOut() {
  const [signOut, isLoading] = useSignOut(auth);
  const navigate = useNavigate();
  const { clearStore } = useActions();
  async function logOut() {
    await signOut();
    clearStore();
    navigate(ROOT);
    location.reload();
  }
  return { logOut, isLoading };
}
