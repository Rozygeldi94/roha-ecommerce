import {
  Box,
  Heading,
  Text,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  Flex,
  Link,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IconContext } from "react-icons";
import { FaUserLock } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { useResetPassword } from "@/hooks/useResetPassword";
import { LOGIN, REGISTER } from "@/route";

const ResetPassword = () => {
  const { ResetPassword, isLoading } = useResetPassword();

  enum EReseResetPassword {
    EMAIL = "email",
  }
  interface IResetPassword {
    [EReseResetPassword.EMAIL]: string;
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IResetPassword>();

  const resetPassword: SubmitHandler<IResetPassword> = (data) => {
    ResetPassword({ email: data.email });
  };
  return (
    <Box minWidth="300px" maxWidth="400px" m="50px auto" padding="0 15px">
      <Box
        p="20px 30px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderRadius="3px"
        background="#53bcf5"
      >
        <IconContext.Provider
          value={{
            size: "40px",
            color: "blue",
            className: "global-class-name",
          }}
        >
          <div>
            <FaUserLock />
          </div>
        </IconContext.Provider>
        <Heading
          as="h3"
          margin="10px 0"
          color="#2d164a"
          fontWeight="700"
          fontSize="1.2rem"
          textAlign="center"
        >
          Having Problems Signing In?
        </Heading>
        <Text color="#3f295b" fontWeight="600">
          Enter your email address and we'll send you a link so you can re-login
          to your account.
        </Text>
        <form
          style={{
            width: "100%",
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
          onSubmit={handleSubmit(resetPassword)}
        >
          <FormControl
            isInvalid={errors[EReseResetPassword.EMAIL] ? true : false}
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
              {...register(EReseResetPassword.EMAIL)}
            />
            <FormErrorMessage>
              {errors[EReseResetPassword.EMAIL]?.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            bg="#5151dc"
            color="#fff"
            isLoading={isLoading}
            loadingText="Sending"
            transition="linear 0.3s"
            _hover={{ background: "#2d2db8" }}
          >
            Send email link
          </Button>
        </form>
        <Flex mt="15px" align={"center"} gap="15px">
          <Link
            as={RouterLink}
            to={LOGIN}
            fontSize="0.9rem"
            padding="5px 20px"
            bg="#17ac4c"
            color="#fff"
            border="1px #000 solid"
            borderRadius="6px"
            textDecoration="none"
            transition="linear 0.3s"
            _hover={{ background: "#0b8636" }}
          >
            Login
          </Link>{" "}
          <Text color="#4e58a0" fontWeight="700">
            OR
          </Text>
          <Link
            as={RouterLink}
            to={REGISTER}
            fontSize="0.9rem"
            bg="#1471a2"
            color="#fff"
            padding="5px 20px"
            border="1px #000 solid"
            borderRadius="6px"
            textDecoration="none"
            transition="linear 0.3s"
            _hover={{ background: "#0a4e73" }}
          >
            Register
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};
export default ResetPassword;
