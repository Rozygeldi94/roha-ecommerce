import { FC, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { updateFirestoreDocField } from "@/utils/updateFirestoreShoppingCart";
import { IShoppingCartSlice } from "@/types/product.types";

interface IQuantityCountProps {
  shoppingCartProduct: IShoppingCartSlice;
}

export const QuantityCount: FC<IQuantityCountProps> = ({
  shoppingCartProduct,
}) => {
  const { addToStore, decrementProductCount } = useActions();
  const storeProducts = useTypedSelector(
    (state) => state.shoppingCard.shoppingCartProducts
  );

  useEffect(() => {
    updateFirestoreDocField(storeProducts, "shopping_cart", false);
  }, [storeProducts]);

  const handleIncrementCount =
    (shoppingCartProduct: IShoppingCartSlice) => () => {
      addToStore(shoppingCartProduct);
    };
  const handleDecrementCount =
    (shoppingCartProduct: IShoppingCartSlice) => () => {
      decrementProductCount(shoppingCartProduct);
    };

  return (
    <Box
      minWidth={{ base: "65px", lg: "90px" }}
      height={{ base: "26px", lg: "33px" }}
      display="flex"
      alignItems="center"
      bg="#b2b3c2"
      borderRadius="3px"
      border="1px #dbd0d0 solid"
    >
      <Button
        minWidth={{ base: "18px", lg: "24px" }}
        width={{ base: "18px", lg: "24px" }}
        height="100%"
        borderRadius="0"
        padding="0"
        fontSize="1.2rem"
        color="#000"
        cursor={shoppingCartProduct?.quantity === 1 ? "default" : "pointer"}
        bg={shoppingCartProduct?.quantity === 1 ? "#f7f5f5" : "#edf2f7"}
        _hover={{
          bg: shoppingCartProduct?.quantity === 1 ? "#f7f5f5" : "#dfe2f0",
        }}
        isDisabled={!shoppingCartProduct?.isCheckboxActive}
        onClick={handleDecrementCount(shoppingCartProduct)}
      >
        -
      </Button>
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="#000"
        bg="#d3d4df"
        flexGrow="1"
      >
        <span>{shoppingCartProduct?.quantity}</span>
      </Box>
      <Button
        minWidth={{ base: "18px", lg: "24px" }}
        width={{ base: "18px", lg: "24px" }}
        height="100%"
        borderRadius="0"
        padding="0"
        fontSize="1.2rem"
        color="#000"
        cursor={shoppingCartProduct?.quantity === 20 ? "default" : "pointer"}
        bg={shoppingCartProduct?.quantity === 20 ? "#f7f5f5" : "#edf2f7"}
        _hover={{
          bg: shoppingCartProduct?.quantity === 20 ? "#f7f5f5" : "#dfe2f0",
        }}
        isDisabled={!shoppingCartProduct?.isCheckboxActive}
        onClick={handleIncrementCount(shoppingCartProduct)}
      >
        +
      </Button>
    </Box>
  );
};
