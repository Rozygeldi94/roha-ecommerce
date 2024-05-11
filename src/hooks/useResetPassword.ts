import { auth } from "../firebase/firebaseConfig";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../route";
import { useToast } from "@chakra-ui/react";

export function useResetPassword() {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const ResetPassword = async ({ email }: { email: string }) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Check your email!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      setLoading(false);
      navigate(LOGIN);
    } catch (error) {
      toast({
        title: (error as Error).message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };
  return { ResetPassword, isLoading };
}
