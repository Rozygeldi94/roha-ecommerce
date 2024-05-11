import { FC, useContext } from "react";
import { Box, Link, Text, useColorMode } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { SHOPPING_CART } from "@/route";
import { FaCartShopping } from "react-icons/fa6";
import { MainContext } from "@/pages/Layout";
import { IProduct } from "@/types/product.types";

interface IShoppingCartButtonProps {
  products: IProduct[];
  type: "link" | "text";
  hasBorder: boolean;
  isLargerThan767?: boolean;
}

export const ShoppingCartButton: FC<IShoppingCartButtonProps> = ({
  products,
  type,
  hasBorder = true,
  isLargerThan767 = true,
}) => {
  const { authUser } = useContext(MainContext);
  const { colorMode } = useColorMode();

  switch (type) {
    case "link":
      return isLargerThan767 ? (
        <Link
          as={RouterLink}
          to={SHOPPING_CART}
          padding="4px 10px"
          display="flex"
          alignItems="center"
          gap="10px"
          fontWeight="500"
          bg={authUser ? "twitter.500" : "none"}
          color={{ base: "#000", md: "initial" }}
          fontSize={{ base: "0.8rem", isLargerThan440: "1rem" }}
          borderRadius="7px"
          aria-label="shopping-cart-link"
          border={
            !authUser && hasBorder && colorMode === "light"
              ? "2px #33449b solid"
              : !authUser && hasBorder && colorMode === "dark"
              ? "2px #b6bcda solid"
              : "none"
          }
          transition="all 0.5s !important"
          _hover={{
            boxShadow: "inset 10em 0 0 0 #4949cf, inset -10em 0 0 0 #4949cf",
            borderColor: "#4949cf",
            color: "#fff",
          }}
        >
          <Box position="relative">
            <FaCartShopping size="22px" />
            {authUser && products?.length > 0 && (
              <Box
                width="18px"
                height="17px"
                bg="#fff"
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius="50%"
                position="absolute"
                top="-5px"
                right="-5px"
              >
                <Box
                  width="17px"
                  height="17px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="0.7rem"
                  bg="#e09f2f"
                  borderRadius="50%"
                >
                  <span>{authUser ? products?.length : 0}</span>
                </Box>
              </Box>
            )}
          </Box>
          Shopping cart
        </Link>
      ) : (
        <Link
          as={RouterLink}
          to={SHOPPING_CART}
          margin="0 5px 0 2px"
          aria-label="shopping-cart-link"
        >
          <Box position="relative">
            <FaCartShopping size={authUser ? "25px" : "22px"} />
            {authUser && products?.length > 0 && (
              <Box
                width="18px"
                height="17px"
                bg="#fff"
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius="50%"
                position="absolute"
                top="-5px"
                right="-5px"
              >
                <Box
                  width="17px"
                  height="17px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="0.7rem"
                  bg="#e09f2f"
                  borderRadius="50%"
                >
                  <span>{authUser ? products?.length : 0}</span>
                </Box>
              </Box>
            )}
          </Box>
        </Link>
      );

      break;
    case "text":
      return (
        <Text
          as="h2"
          textAlign="center"
          fontSize={{ base: "1rem", md: "1.1rem", isLargerThan550: "1.2rem" }}
          fontWeight="500"
          mb="10px"
        >
          Shopping cart
          <Text as="sup" ml="2px" color="red" fontWeight="700">
            {products?.length}
          </Text>
        </Text>
      );
    default:
      break;
  }
};
