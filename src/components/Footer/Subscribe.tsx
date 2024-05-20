import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  keyframes,
  useColorMode,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase/firebaseConfig";
import { useEmailSubscription } from "@/hooks/useUserInfo";

interface IEmailSubscription {
  email: string;
}

export const Subscribe = () => {
  const [authUser] = useAuthState(auth);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { updateEmailSubscription } = useEmailSubscription();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IEmailSubscription>();

  const saveSubscribeEmailToDatabase: SubmitHandler<IEmailSubscription> = (
    data
  ) => {
    if (authUser) {
      updateEmailSubscription(data.email);
      reset();
    } else {
      navigate("/login");
      reset();
    }
  };
  const titleAnimation = keyframes`
  from {
    background-position: 0;
  }
  to {
    background-position: 100%;
  }
  `;
  return (
    <>
      <Text
        as="h2"
        className="subscribe-title"
        fontSize="1.2rem"
        textAlign="center"
        bgGradient={
          colorMode === "light"
            ? "linear-gradient(90deg,#601e1e,#5e3d76,#d3d336,#000000,#185dff,#273005)"
            : "linear-gradient(90deg,#601e1e,#ffff00,#ff00f3,#e2e5f0,#185dff,#a1c12f)"
        }
        bgSize="400%"
        sx={{
          " -webkit-text-fill-color": "transparent",
          WebkitBackgroundClip: "text",
        }}
        animation={`${titleAnimation} linear 6s infinite`}
      >
        Subscribe! Get more from us!
      </Text>
      <form onSubmit={handleSubmit(saveSubscribeEmailToDatabase)}>
        <FormControl isInvalid={errors.email ? true : false}>
          <Input
            placeholder="Your email"
            maxLength={50}
            size={{ base: "sm", isLargerThan360: "md" }}
            border={
              colorMode === "light" ? "1px solid #454764" : "1px solid #b9bdf2"
            }
            type="email"
            {...register("email", {
              required: { value: true, message: "This field required!" },
              maxLength: {
                value: 40,
                message: "Email must be no longer than 40 charachter",
              },
            })}
          />
          <FormErrorMessage
            color={colorMode === "dark" ? "#dee820" : "#ff0000"}
          >
            {errors.email?.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          width="100%"
          mt="15px"
          size={{ base: "sm", isLargerThan360: "md" }}
          colorScheme="twitter"
        >
          Subcribe
        </Button>
      </form>
    </>
  );
};
