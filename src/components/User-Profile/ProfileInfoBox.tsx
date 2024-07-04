import {
  Box,
  Button,
  FormControl,
  Heading,
  Text,
  Textarea,
  Tooltip,
  Link,
  VStack,
  FormErrorMessage,
  InputElementProps,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useUserInfo } from "@/hooks/useUserInfo";
import { InputController } from "./InputController";
import { formatDistanceToNow } from "date-fns";
import ct from "countries-and-timezones";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import { City, Country, State } from "@/types/reactCountryStateCity.type";
import "react-country-state-city/dist/react-country-state-city.css";
import { MainContext } from "@/pages/Layout";

enum EUserInfoForm {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  ABOUT_YOU = "aboutYou",
}
export interface IUserInfoForm {
  [EUserInfoForm.FIRST_NAME]: string;
  [EUserInfoForm.LAST_NAME]: string;
  [EUserInfoForm.ABOUT_YOU]: string;
}

export const ProfileInfoBox: FC = () => {
  const { currentUser, colorMode } = useContext(MainContext);
  const { updateUserData, isLoading } = useUserInfo();
  const [isBoxHover, setIsBoxHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState<Country | null>(null);
  const [countryState, setCountryState] = useState<State | null>(null);
  const [countryCity, setCountryCity] = useState<City | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<IUserInfoForm>({
    defaultValues: {
      aboutYou: "",
      firstName: "",
      lastName: "",
    },
  });

  const saveUserInfoToDB = (data: IUserInfoForm) => {
    const getCountryTimeZone = ct.getCountry(
      country?.iso2 ? country?.iso2 : ""
    );
    updateUserData({
      data,
      country: country?.name,
      countryState: countryState?.name,
      countryCity: countryCity?.name,
      countryTimeZone: getCountryTimeZone?.timezones?.[0],
    });
    reset();
  };
  const handleSetOpen = (open: boolean) => () => {
    setOpen(!open);
  };

  return (
    <Box
      maxWidth={{
        base: "95%",
        isLargerThan500: "80%",
        md: "45%",
      }}
      width="100%"
      padding="10px 15px"
      bg={colorMode === "light" ? "#f6f6f8" : "#4f4f82"}
      borderRadius="10px"
      boxShadow={
        colorMode === "light"
          ? "0 3px 6px rgba(0,0,0,0.06), 0 3px 6px rgba(0,0,0,0.13)"
          : "0 3px 6px rgba(72, 137, 223, 0.6), 0 3px 6px rgba(58, 166, 230, 0.33)"
      }
      _hover={{
        boxShadow:
          colorMode === "light"
            ? "0 14px 28px rgba(0,0,0,0.16), 0 10px 10px rgba(0,0,0,0.13)"
            : "0 14px 28px rgba(72, 137, 223, 0.6), 0 10px 10px rgba(58, 166, 230, 0.33)",
      }}
      position="relative"
      onMouseEnter={() => setIsBoxHover(true)}
      onMouseLeave={() => setIsBoxHover(false)}
    >
      {isBoxHover ? (
        <IconContext.Provider
          value={{
            color: "dark",
            style: {
              width: "18px",
              height: "18px",
              position: "absolute",
              top: "8px",
              right: "8px",
              cursor: "pointer",
            },
          }}
        >
          <Tooltip placement="right-end" label="Edit profile information">
            <div onClick={handleSetOpen(open)}>
              <FaRegEdit />
            </div>
          </Tooltip>
        </IconContext.Provider>
      ) : (
        ""
      )}

      <Heading mb="20px" as="h3" textAlign="center" fontSize="1.2rem">
        Profile information
      </Heading>
      {open ? (
        <ChangeProfileInfo>
          <form
            onSubmit={handleSubmit(saveUserInfoToDB)}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <FormControl
              isInvalid={errors[EUserInfoForm.ABOUT_YOU] ? true : false}
            >
              <Textarea
                required
                bg={colorMode === "light" ? "#fff" : "#41416b"}
                border={
                  colorMode === "light"
                    ? "#6d6d78 1px solid"
                    : "#b9b9dc 1px solid"
                }
                placeholder="Here is about you"
                _placeholder={{
                  color: colorMode === "dark" ? "#baa9ce" : "#41416b",
                }}
                {...register(EUserInfoForm.ABOUT_YOU, {
                  maxLength: {
                    value: 300,
                    message: "Max length must be no longer 300 charachter!",
                  },
                })}
              />
              <FormErrorMessage
                color={colorMode === "light" ? "#9e0b0b" : "#fdfd3d"}
              >
                {errors[EUserInfoForm.ABOUT_YOU]?.message}
              </FormErrorMessage>
            </FormControl>

            <InputController
              control={control}
              name={EUserInfoForm.FIRST_NAME}
              inputType="text"
              placeholder="First name"
            />
            {errors[EUserInfoForm.FIRST_NAME] && (
              <Text color={colorMode === "light" ? "#9e0b0b" : "#fdfd3d"}>
                {errors[EUserInfoForm.FIRST_NAME].message}
              </Text>
            )}

            <InputController
              control={control}
              name={EUserInfoForm.LAST_NAME}
              inputType="text"
              placeholder="Last name"
            />
            {errors[EUserInfoForm.LAST_NAME] && (
              <Text color={colorMode === "light" ? "#9e0b0b" : "#fdfd3d"}>
                {errors[EUserInfoForm.LAST_NAME].message}
              </Text>
            )}

            <CountrySelect
              onChange={(e: Country) => {
                setCountry(e);
              }}
              placeHolder="Select Country"
            />

            <StateSelect
              countryid={country?.id}
              onChange={(e: State) => {
                setCountryState(e);
              }}
              placeHolder="Select State"
            />

            <CitySelect
              countryid={country?.id}
              stateid={countryState?.id}
              onChange={(e: City) => {
                setCountryCity(e);
              }}
              placeHolder="Select City"
            />

            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Saving"
              size="sm"
              colorScheme="blue"
            >
              Save
            </Button>
          </form>
        </ChangeProfileInfo>
      ) : (
        <Box display={open === false ? "block" : "none"}>
          <Text mb="20px">{currentUser?.about_you}</Text>
          <VStack spacing="3" alignItems="start">
            <Box fontWeight="700">
              <Text as="span">Full name:</Text>{" "}
              <Text as="span" fontWeight="400">
                {`${currentUser?.first_name} ${currentUser?.last_name}`}
              </Text>
            </Box>
            <Box>
              <Text as="span" fontWeight="700">
                Email:
              </Text>{" "}
              <Link
                fontWeight="400"
                href={`mailto: ${currentUser?.user_email}`}
              >
                {currentUser?.user_email ? currentUser?.user_email : "none"}
              </Link>
            </Box>
            <Box>
              <Text as="span" fontWeight="700">
                Gender:
              </Text>{" "}
              <Link fontWeight="400">
                {currentUser?.gender ? currentUser?.gender : "none"}
              </Link>
            </Box>
            <Box w="100%" fontWeight="700" display="flex" gap="5px">
              <Text>Phone number: </Text>
              <Link
                fontWeight="400"
                href={`tel: +${currentUser?.phone_number}`}
              >
                {currentUser?.phone_number
                  ? `+${currentUser.phone_number}`
                  : "none"}
              </Link>
            </Box>
            <Box>
              <Text as="span" fontWeight="700">
                Location:
              </Text>{" "}
              <Text as="span" fontWeight="400">
                {currentUser?.location?.city || currentUser?.location?.state
                  ? `${
                      currentUser?.location?.city ||
                      currentUser?.location?.state
                    }, ${currentUser?.location?.country}`
                  : currentUser?.location?.country
                  ? currentUser?.location?.country
                  : "none"}
              </Text>
            </Box>
            <Text alignSelf="center" fontWeight="500" fontSize="0.85rem">
              {currentUser?.date
                ? ` Registered ${formatDistanceToNow(currentUser.date)} ago`
                : ""}{" "}
            </Text>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

const ChangeProfileInfo = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const allInputs = document.querySelectorAll<HTMLElement>(
      ".stsearch-box > input"
    );
    allInputs.forEach((el) => (el.required = true));
  }, []);
  return children;
};
