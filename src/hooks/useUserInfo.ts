import { useToast } from "@chakra-ui/react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { useRealtimeDataBase } from "./realtimeDataBase";

interface IUpdateUserData {
  data: any;
  country: string | undefined;
  countryState: string | undefined;
  countryCity: string | undefined;
  countryTimeZone: string | undefined;
}

export const useUserInfo = () => {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(false);
  const { setData } = useRealtimeDataBase();

  const toast = useToast();
  const updateUserData = async ({
    data,
    country,
    countryState,
    countryCity,
    countryTimeZone,
  }: IUpdateUserData) => {
    try {
      setLoading(true);
      const docRef = doc(db, "users", authUser?.email);
      await updateDoc(docRef, {
        about_you: data?.aboutYou,
        first_name: data?.firstName,
        last_name: data?.lastName,
        "location.country": country,
        "location.state": countryState,
        "location.city": countryCity,
        "location.countryTimeZone": countryTimeZone,
      });
      setData(
        `users/${authUser?.uid}`,
        {
          userEmail: authUser?.email ? authUser?.email : "",
          userName: data?.firstName,
          locationCity: countryCity,
          timeZone: countryTimeZone,
          id: authUser?.uid ? authUser?.uid : "",
        },
        "update"
      );

      toast({
        title: "Your information has been updated!",
        position: "top",
        duration: 4000,
        status: "success",
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: (error as Error).message,
        position: "top",
        duration: 4000,
        status: "error",
      });
    }
    setLoading(false);
  };
  return { updateUserData, isLoading };
};

export const useEmailSubscription = () => {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(false);

  const toast = useToast();
  async function updateEmailSubscription(email: string) {
    try {
      setLoading(true);
      const ref = doc(db, "followers", authUser?.email);
      await setDoc(ref, {
        user_email: email,
      });
      toast({
        title: "You have successfully subscribed!",
        position: "top",
        duration: 4000,
        status: "success",
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: (error as Error).message,
        position: "top",
        duration: 4000,
        status: "error",
      });
    }
  }
  return { updateEmailSubscription, isLoading };
};
