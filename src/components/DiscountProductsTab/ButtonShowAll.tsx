import { Dispatch, FC } from "react";
import { Button } from "@chakra-ui/react";

interface IButtonShowAllProps {
  setShowedProducts: Dispatch<React.SetStateAction<number>>;
  isShowed: boolean;
  productsLength: number;
}

export const ButtonShowAll: FC<IButtonShowAllProps> = ({
  setShowedProducts,
  isShowed,
  productsLength,
}) => {
  const showAll = () => {
    if (isShowed) {
      setShowedProducts((prev: number) => (prev = productsLength));
    }
  };
  return (
    <Button size="sm" colorScheme="teal" variant="outline" onClick={showAll}>
      Show all
    </Button>
  );
};
