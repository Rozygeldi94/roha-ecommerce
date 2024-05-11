import {
  Box,
  Link,
  Text,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  Divider,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { useLogOut } from "@/hooks/auth";
import { LOGIN } from "@/route";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { FC, useContext, useEffect, useState } from "react";
import { ToogleDarkMode } from "./ToogleDarkMode";
import { UserAvatar } from "@/components/User-Profile/UserAvatar";
import { useRealtimeDataBase } from "@/hooks/realtimeDataBase";
import { MainContext } from "@/pages/Layout";
import { IProduct } from "@/types/product.types";
import { LogOutButton } from "./LogOutButton";

interface IUserProps {
  type?: string;
  isLargerThan767: boolean;
  isLargerThan440: boolean;
  products: IProduct[];
}

export const User: FC<IUserProps> = ({
  type,
  isLargerThan767 = true,
  isLargerThan440 = true,
  products,
}) => {
  const { authUser, currentUser, databaseUser } = useContext(MainContext);
  const { colorMode } = useColorMode();
  const { getData, getData2 } = useRealtimeDataBase();
  const stringToUpperCase = (str: string) =>
    str?.[0].toUpperCase() + str?.slice(1).toLowerCase();

  useEffect(() => {
    getData(`users/${authUser?.uid}`);
    getData2(`users`);
  }, []);

  return (
    <Box display="flex" alignItems="center">
      {authUser ? (
        <>
          <Link
            mr="2px"
            width={isLargerThan440 ? "40px" : "35px"}
            as={RouterLink}
            to={`/dashboard/${authUser?.uid}`}
            position="relative"
            aria-label="to-user-dashboard"
          >
            <UserAvatar
              currentUser={currentUser}
              databaseUserAvatar={databaseUser?.user_avatar}
              isRealUser={true}
              minWidth="100%"
              height={isLargerThan440 ? "40px" : "35px"}
              borderRadius="50%"
            />
          </Link>
          {!isLargerThan440 && (
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton isActive={isOpen}>
                    {isOpen ? <BiCaretUp /> : <BiCaretDown />}
                  </MenuButton>
                  <MenuList
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap="10px"
                    bg={colorMode === "light" ? "aqua" : "#2d3748"}
                  >
                    <ToogleDarkMode
                      isVisible={isLargerThan440 ? false : true}
                      isMobileVersion={true}
                    />
                    <LogOutButton />
                    <Divider
                      margin="10px 0"
                      borderColor={
                        colorMode === "light" ? "#1944b9" : "#45f88a"
                      }
                    />
                    <Text
                      textAlign="center"
                      color={colorMode === "light" ? "blue" : "yellow.500"}
                      fontSize="0.75rem"
                    >
                      Developed in 2024
                    </Text>
                  </MenuList>
                </>
              )}
            </Menu>
          )}
          {type === "burger-menu" ? (
            <Box ml="10px">
              <Text>{`Hello ${stringToUpperCase(
                currentUser ? currentUser?.first_name : "?"
              )}`}</Text>
              <LogOutButton isLargerThan440={isLargerThan440} />
            </Box>
          ) : (
            <LogOutButton isLargerThan440={isLargerThan440} />
          )}
        </>
      ) : isLargerThan767 ? (
        <Link
          as={RouterLink}
          to={LOGIN}
          padding="4px 10px"
          display="flex"
          alignItems="center"
          gap="10px"
          fontWeight="600"
          border={
            colorMode === "light" ? "2px #33449b solid" : "2px #b6bcda solid"
          }
          borderRadius="7px"
          fontSize={{
            base: "0.8rem",
            isLargerThan360: "0.9rem",
            isLargerThan700: "1rem",
          }}
          aria-label="to-login-page"
          transition="all 0.5s !important"
          _hover={{
            boxShadow: "inset 6em 0 0 0 #4949cf, inset -6em 0 0 0 #4949cf",
            borderColor: "#4949cf",
            color: "#fff",
          }}
        >
          <FaUserShield
            color={colorMode === "light" ? "#000" : "#fff"}
            size={isLargerThan440 ? "23px" : "20px"}
          />
          {type === "burger-menu" && "Login"} Sign in
        </Link>
      ) : (
        <Link as={RouterLink} to={LOGIN} aria-label="to-login-page">
          <FaUserShield
            color={colorMode === "light" ? "#000" : "#fff"}
            size={isLargerThan440 ? "23px" : "20px"}
          />
        </Link>
      )}
    </Box>
  );
};
