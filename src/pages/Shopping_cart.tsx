import { Box, Flex, Text } from "@chakra-ui/react";
import { ShoppingCardProduct } from "../components/Shopping cart";
import { ConfirmShoppingCart } from "../components/Shopping cart/confirmShoppingCart";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { ShoppingCartButton } from "@/components/Header/Middle-Section/ShoppingCartButton";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function ShoppingCart() {
  useDocumentTitle("Shopping cart | RoHa");
  const shoppingCartProducts = useTypedSelector(
    (state) => state.shoppingCard.shoppingCartProducts
  );
  const [authUser] = useAuthState(auth);

  return (
    <Box
      maxW="1230px"
      margin="30px auto"
      padding={{ base: "0 10px", isLargerThan440: "0 15px" }}
    >
      {authUser && shoppingCartProducts?.length ? (
        <>
          <ShoppingCartButton
            products={shoppingCartProducts}
            type="text"
            hasBorder={false}
          />
          <Flex
            flexDirection={{ base: "column", isLargerThan850: "row" }}
            columnGap="20px"
          >
            <Flex flexDirection="column" gap="20px" flexGrow="1">
              {shoppingCartProducts?.map((product) => (
                <ShoppingCardProduct shoppingCartProduct={product} />
              ))}
            </Flex>
            <Box
              mt={{ base: "20px", isLargerThan850: "0" }}
              maxWidth={{ base: "100vw", isLargerThan850: "300px" }}
              display={{ base: "flex", isLargerThan850: "block" }}
              justifyContent="center"
            >
              <ConfirmShoppingCart />
            </Box>
          </Flex>
        </>
      ) : authUser && shoppingCartProducts?.length === 0 ? (
        <Text fontSize="1.2rem" fontWeight="500">
          There are no items in the cart yet!
        </Text>
      ) : (
        <Text
          textAlign="center"
          fontSize={{ base: "1rem", md: "1.2rem" }}
          fontWeight="500"
        >
          Please sign in!
        </Text>
      )}
    </Box>
  );
}
