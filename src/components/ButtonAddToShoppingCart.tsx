import { FC, MouseEvent, useEffect } from "react";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { IProduct } from "@/types/product.types";
import { updateFirestoreDocField } from "@/utils/updateFirestoreShoppingCart";
import { useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

interface IButtonAddToShoppingCartProps {
  currentProduct: IProduct | null;
  size?: string;
}

export const ButtonAddToShoppingCart: FC<IButtonAddToShoppingCartProps> = ({
  currentProduct,
  size,
}) => {
  const { addToStore } = useActions();
  const toast = useToast();
  const storeProducts = useTypedSelector(
    (state) => state.shoppingCard.shoppingCartProducts
  );

  const isExits = storeProducts?.some(
    (product) => product?.id === currentProduct?.id
  );
  useEffect(() => {
    if (storeProducts.length) {
      updateFirestoreDocField(storeProducts, "shopping_cart", false);
    }
  }, [storeProducts]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToStore(currentProduct);
    toast({
      title: `${currentProduct?.title} added to shopping card`,
      status: "success",
      position: "top",
      duration: 4000,
    });
  };

  return (
    <Button
      size={{ base: "sm", md: size ? size : "md" }}
      textAlign={size ? "center" : "initial"}
      colorScheme={isExits ? "green" : "blue"}
      onClick={handleClick}
    >
      {isExits ? "Added to Shopping card" : "Add to Shopping card"}
    </Button>
  );
};
