import { Dispatch, FC } from "react";
import { Button } from "@chakra-ui/react";

interface IButtonShowMoreProps {
  setShowedProducts: Dispatch<React.SetStateAction<number>>;
  isShowed: boolean;
}

export const ButtonShowMore: FC<IButtonShowMoreProps> = ({
  setShowedProducts,
  isShowed,
}): JSX.Element => {
  const showMore = () => {
    if (isShowed) {
      setShowedProducts((prev: number) => prev + 10);
    }
  };
  return (
    <Button padding="10px 60px" colorScheme="twitter" onClick={showMore}>
      Show more
    </Button>
  );
};
