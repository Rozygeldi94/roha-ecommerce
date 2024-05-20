import { useId } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  Link,
  FormControl,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { LOGIN } from "@/route";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRegister } from "@/hooks/auth";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .max(40, "The first name charackter must be no longer than 40 character"),

  lastName: Yup.string()
    .required("Last name is required")
    .max(40, "The last name charackter must be no longer than 40 character"),

  gender: Yup.string().required("Gender is required"),

  email: Yup.string()
    .required("Email address is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i,
      "Email address is not valid"
    )
    .max(40, "Email adress must be no longer 40 character long"),

  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
    ),
  cPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

enum ERegisterForm {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  GENDER = "gender",
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "cPassword",
}
export interface IRegisterForm {
  [ERegisterForm.FIRST_NAME]: string;
  [ERegisterForm.LAST_NAME]: string;
  [ERegisterForm.GENDER]: string;
  [ERegisterForm.EMAIL]: string;
  [ERegisterForm.PASSWORD]: string;
}
interface IFormFields extends IRegisterForm {
  [ERegisterForm.CONFIRM_PASSWORD]: string;
}

export const SignUp: React.FC = () => {
  const maleId = useId();
  const femaleId = useId();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormFields>({ resolver: yupResolver(validationSchema) });

  const { registerUser } = useRegister();

  const registerToDatabase: SubmitHandler<IRegisterForm> = (data) => {
    registerUser({
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Box minWidth="300px" maxWidth="400px" m="50px auto" padding="0 15px">
      <Box
        width="100%"
        p="20px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="15px"
        borderRadius="3px"
        background="#53bcf5"
      >
        <Heading fontSize="1.5rem" color="#343333" textAlign="center" as="h3">
          Register
        </Heading>
        <form
          onSubmit={handleSubmit(registerToDatabase)}
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <FormControl
            isInvalid={errors[ERegisterForm.FIRST_NAME] ? true : false}
          >
            <Input
              maxLength={41}
              w="100%"
              p="8px 15px"
              color="#343333"
              type="text"
              borderRadius="5px"
              border="none"
              outline="none"
              placeholder="First name"
              _placeholder={{ color: "#504c90" }}
              bg="#e0e6f2"
              {...register(ERegisterForm.FIRST_NAME)}
            />
            <FormErrorMessage>
              {errors[ERegisterForm.FIRST_NAME]?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={errors[ERegisterForm.LAST_NAME] ? true : false}
          >
            <Input
              maxLength={41}
              w="100%"
              p="8px 15px"
              color="#343333"
              type="text"
              borderRadius="5px"
              border="none"
              outline="none"
              placeholder="Last name"
              _placeholder={{ color: "#504c90" }}
              bg="#e0e6f2"
              {...register(ERegisterForm.LAST_NAME)}
            />
            <FormErrorMessage>
              {errors[ERegisterForm.LAST_NAME]?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors[ERegisterForm.EMAIL] ? true : false}>
            <Input
              maxLength={41}
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
              {...register(ERegisterForm.EMAIL)}
            />
            <FormErrorMessage>
              {errors[ERegisterForm.EMAIL]?.message}
            </FormErrorMessage>
          </FormControl>
          <Box width="100%">
            <Text color="#0c0e0c" fontWeight="500">
              Gender:
            </Text>

            <FormControl
              isInvalid={errors[ERegisterForm.GENDER] ? true : false}
            >
              <Flex width="100%" gap="15px">
                <Text
                  width="50%"
                  padding="5px 10px"
                  display="flex"
                  justifyContent="space-between"
                  borderRadius="5px"
                  border="none"
                  outline="none"
                  bg="#e0e6f2"
                  color="#343333"
                >
                  <label htmlFor={maleId}>Male</label>
                  <input
                    id={maleId}
                    type="radio"
                    value="male"
                    style={{ accentColor: "blue" }}
                    {...register(ERegisterForm.GENDER)}
                  />
                </Text>
                <Text
                  width="50%"
                  padding="5px 10px"
                  display="flex"
                  justifyContent="space-between"
                  borderRadius="5px"
                  border="none"
                  outline="none"
                  bg="#e0e6f2"
                  color="#343333"
                >
                  <label htmlFor={femaleId}>Female</label>
                  <input
                    id={femaleId}
                    type="radio"
                    value="female"
                    style={{ accentColor: "blue" }}
                    {...register(ERegisterForm.GENDER)}
                  />
                </Text>
              </Flex>
              <FormErrorMessage>
                {errors[ERegisterForm.GENDER]?.message}
              </FormErrorMessage>{" "}
            </FormControl>
          </Box>

          <FormControl
            isInvalid={errors[ERegisterForm.PASSWORD] ? true : false}
          >
            <Input
              maxLength={21}
              type="password"
              color="#343333"
              w="100%"
              p="8px 15px"
              borderRadius="5px"
              border="none"
              outline="none"
              placeholder="Password"
              _placeholder={{ color: "#504c90" }}
              bg="#e0e6f2"
              {...register(ERegisterForm.PASSWORD)}
            />
            <FormErrorMessage>
              {errors[ERegisterForm.PASSWORD]?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={errors[ERegisterForm.CONFIRM_PASSWORD] ? true : false}
          >
            <Input
              maxLength={21}
              type="password"
              color="#343333"
              w="100%"
              p="8px 15px"
              borderRadius="5px"
              border="none"
              outline="none"
              placeholder="Confirm password"
              _placeholder={{ color: "#504c90" }}
              bg="#e0e6f2"
              {...register(ERegisterForm.CONFIRM_PASSWORD)}
            />
            <FormErrorMessage>
              {errors[ERegisterForm.CONFIRM_PASSWORD]?.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            p="8px 15px"
            mt="10px"
            borderRadius="5px"
            border="none"
            outline="none"
            fontSize="1rem"
            bg="#3d0d6d"
            color="#fff"
            cursor="pointer"
            transition="0.3s linear"
            fontWeight="500"
            _hover={{ bg: "#6c4710" }}
          >
            Register
          </Button>
        </form>
        <Text color="#343333">
          have an account?{"  "}
          <Link fontWeight="600" color="#3217fc" as={RouterLink} to={LOGIN}>
            Login now!
          </Link>
        </Text>
      </Box>
    </Box>
  );
};
