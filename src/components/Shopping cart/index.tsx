import {
  Box,
  Checkbox,
  Flex,
  Image,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { QuantityCount } from "./quantityCount";
import { useActions } from "@/hooks/useActions";
import { Link as RouterLink } from "react-router-dom";
import { ButtonDelete } from "./ButtonDelete";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { updateFirestoreDocField } from "@/utils/updateFirestoreShoppingCart";
import { IProduct, IShoppingCartSlice } from "@/types/product.types";

interface IShoppingCardProductProps {
  shoppingCartProduct: IShoppingCartSlice;
}

export const ShoppingCardProduct: FC<IShoppingCardProductProps> = ({
  shoppingCartProduct,
}) => {
  const { colorMode } = useColorMode();
  const { removeProduct, changeCheckboxStatus } = useActions();
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");
  const storeProducts = useTypedSelector(
    (state) => state.shoppingCard.shoppingCartProducts
  );

  const isShoppingCartProduct = (shoppingCartProduct: IProduct) =>
    shoppingCartProduct?.images !== undefined;

  const handleDelete = () => {
    if (
      confirm(
        `Do you wanna remove this product?! \nProduct name: ${shoppingCartProduct?.title}`
      ) === true
    ) {
      removeProduct(shoppingCartProduct?.id);
      updateFirestoreDocField([], "shopping_cart", false);
    }
  };

  useEffect(() => {
    updateFirestoreDocField(storeProducts, "shopping_cart", false);
  }, [storeProducts]);

  return (
    <Box
      display="flex"
      gap={{ sm: "20px", xl: "40px" }}
      alignItems="center"
      padding="15px 20px"
      bg={colorMode === "light" ? "#fff" : "#372e3e"}
      border="2px solid #201e1d1f"
      opacity={shoppingCartProduct?.isCheckboxActive === true ? 1 : 0.4}
      boxShadow={
        colorMode === "light"
          ? "rgba(99, 99, 99, 0.2)0px 2px 8px 0px"
          : "rgba(236, 218, 218, 0.36)0px 1px 3px 0px"
      }
    >
      <Box
        display="flex"
        gap={{ base: "0", isLargerThan440: "30px" }}
        alignItems="center"
        flexGrow="1"
      >
        <Checkbox
          isChecked={shoppingCartProduct?.isCheckboxActive}
          onChange={() => {
            changeCheckboxStatus(shoppingCartProduct);
          }}
        />

        <Image
          w="50px"
          m={{ base: "0 20px 0 10px", isLargerThan440: "0" }}
          src={shoppingCartProduct?.images?.[0] as string}
        />

        <Box flexGrow="1">
          {shoppingCartProduct?.isCheckboxActive === true ? (
            <Text
              as={RouterLink}
              to={`/${shoppingCartProduct?.category}/${shoppingCartProduct?.id}/${shoppingCartProduct?.title}`}
              fontSize={{ md: "1rem", lg: "1.1rem", xl: "1.2rem" }}
              cursor="pointer"
              textOverflow="ellipsis"
              fontWeight="600"
            >
              {shoppingCartProduct?.title}
            </Text>
          ) : (
            <Text
              as="p"
              fontSize={{ md: "1rem", lg: "1.1rem", xl: "1.2rem" }}
              cursor="text"
              textOverflow="ellipsis"
              fontWeight="600"
            >
              {shoppingCartProduct?.title}
            </Text>
          )}

          <Flex
            mt="10px"
            alignItems="center"
            justifyContent={isLargerThan500 ? "space-between" : "end"}
          >
            {isLargerThan500 && (
              <Text>Stock: {shoppingCartProduct?.stock}</Text>
            )}
            <Flex alignItems="center" gap="10px">
              <Text
                minW="60px"
                mb="5px"
                color="red"
                fontSize={{ base: "1rem", lg: "1.1rem", xl: "1.2rem" }}
                fontWeight="600"
                textAlign="center"
              >
                {shoppingCartProduct?.price} TL
              </Text>
              <QuantityCount shoppingCartProduct={shoppingCartProduct} />
              <ButtonDelete
                shoppingCartProduct={shoppingCartProduct}
                handleDelete={handleDelete}
              />
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
