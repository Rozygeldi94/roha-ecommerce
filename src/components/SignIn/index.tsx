import { Box, Button, Heading, Input, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { REGISTER, RESET_PASSWORD } from "@/route";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLogin } from "@/hooks/auth";
import { useContext, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useSignInWithGoogle } from "@/hooks/signInWithPopup";
import { MainContext } from "@/pages/Layout";

enum EInputName {
  EMAIL = "email",
  PASSWORD = "password",
}
interface ILoginForm {
  [EInputName.EMAIL]: string;
  [EInputName.PASSWORD]: string;
}

export const SignIn: React.FC = () => {
  const { Login } = useLogin();
  const { authUser } = useContext(MainContext);
  const navigate = useNavigate();
  const { signInWithGoogle } = useSignInWithGoogle();

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser]);

  const { register, handleSubmit } = useForm<ILoginForm>();

  //when user click the subscription button automatically will navigate
  //to login page and after 0.5s will scroll top
  //  setTimeout(() => {
  //  animateScroll.scrollToTop();
  //  }, 1000);
  //end scroll

  const login: SubmitHandler<ILoginForm> = (data) => {
    Login({
      email: data.email,
      password: data.password,
    });
  };
  const handleLogin = () => {
    signInWithGoogle();
  };

  return (
    <Box id="sign-in" padding={{ base: "0 10px", isLargerThan440: "0 15px" }}>
      <Box
        maxWidth="400px"
        margin="50px auto"
        padding="20px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderRadius="3px"
        background="#53bcf5"
      >
        <Heading fontSize="1.5rem" color="#343333" textAlign="center" as="h3">
          Sign in
        </Heading>
        <form
          style={{
            width: "80%",
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
          onSubmit={handleSubmit(login)}
        >
          <Input
            w="100%"
            p="8px 15px"
            color="#343333"
            type="email"
            borderRadius="5px"
            border="none"
            outline="none"
            placeholder="Email address"
            _placeholder={{ color: "#504c90" }}
            bg="#e0e6f2"
            {...register(EInputName.EMAIL)}
          />

          <Input
            w="100%"
            p="8px 15px"
            color="#343333"
            type="password"
            borderRadius="5px"
            border="none"
            outline="none"
            placeholder="Password"
            _placeholder={{ color: "#504c90" }}
            bg="#e0e6f2"
            {...register(EInputName.PASSWORD)}
          />
          <Button
            p="8px 15px"
            mt="10px"
            borderRadius="5px"
            border="none"
            outline="none"
            fontSize="1rem"
            type="submit"
            bg="#3d0d6d"
            color="#fff"
            cursor="pointer"
            transition="0.3s linear"
            fontWeight="500"
            _hover={{ bg: "#6c4710" }}
          >
            Sign in
          </Button>
        </form>{" "}
        <Text mt="10px" fontSize="0.9rem" color="#343333">
          Forget your password?{" "}
          <Link
            fontWeight="500"
            color="#3217fc"
            as={RouterLink}
            to={RESET_PASSWORD}
          >
            Reset now!
          </Link>{" "}
        </Text>
        <Text color="#343333" fontSize="0.9rem">
          Don't have account?{" "}
          <Link fontWeight="600" color="#3217fc" as={RouterLink} to={REGISTER}>
            Register now!
          </Link>{" "}
        </Text>
        <Text margin="10px 0" color="#4e58a0" fontWeight="700">
          OR
        </Text>
        <Box w="100%" display="flex" gap="20px">
          <Text
            w="50%"
            margin="0 auto"
            padding="2px 5px"
            fontSize="0.8rem"
            color="#343333"
            bg="#dcf4f6"
            borderRadius="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            onClick={handleLogin}
          >
            Sign in with{" "}
            <FcGoogle size="1.3rem" style={{ marginLeft: "5px" }} />
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
