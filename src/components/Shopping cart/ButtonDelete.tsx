import { FC } from "react";
import { IShoppingCartSlice } from "@/types/product.types";
import { Button, useMediaQuery } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

interface IButtonDeleteProps {
  shoppingCartProduct: IShoppingCartSlice;
  handleDelete: () => void;
}

export const ButtonDelete: FC<IButtonDeleteProps> = ({
  shoppingCartProduct,
  handleDelete,
}) => {
  const [isLargerThan960] = useMediaQuery("(min-width: 960px)");

  return (
    <Button
      minW={{ md: "21px", lg: "23px", xl: "25px" }}
      width={{ md: "21px", lg: "23px", xl: "25px" }}
      height={{ md: "21px", lg: "23px", xl: "25px" }}
      padding="0"
      bg="none"
      _hover={{ bg: "none" }}
      isDisabled={!shoppingCartProduct?.isCheckboxActive}
      onClick={handleDelete}
    >
      <IconContext.Provider
        value={{
          color: "light",
          style: {
            width: isLargerThan960 ? "20px" : "18px",
            height: isLargerThan960 ? "20px" : "18px",
            cursor: shoppingCartProduct?.isCheckboxActive
              ? "pointer"
              : "not-allowed",
          },
        }}
      >
        <>
          <FaTrashAlt />
        </>
      </IconContext.Provider>
    </Button>
  );
};
