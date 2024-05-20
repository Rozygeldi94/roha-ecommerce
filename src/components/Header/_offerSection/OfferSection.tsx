import { Dispatch, FC, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { BsXLg } from "react-icons/bs";
import { CountdownTimer } from "./CountdownTimer";
import { usePromoCode } from "@/hooks/usePromoCode";

interface IOfferSectionProps {
  setIsVisibleOfferSection: Dispatch<React.SetStateAction<boolean>>;
}

export const OfferSection: FC<IOfferSectionProps> = ({
  setIsVisibleOfferSection,
}) => {
  const { currentMonthPromo, getCurrentMonthPromo } = usePromoCode();
  const handleCloseSection = () => {
    setIsVisibleOfferSection((prev) => !prev);
  };

  useEffect(() => {
    getCurrentMonthPromo();
  }, []);
  return (
    <Box
      id="offer-section"
      width="100%"
      padding="5px 0"
      bg="aqua"
      position="fixed"
      top="0"
      left="0"
      zIndex="100"
    >
      <Flex
        maxWidth="1230px"
        width="100%"
        height="100%"
        margin="0 auto"
        padding={{ base: "0 10px", isLargerThan440: "0 15px" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex
          alignItems="center"
          gap={{
            base: "20px",
            isLargerThan360: "30px",
            isLargerThan850: "50px",
          }}
        >
          <Flex
            display={{ base: "none", isLargerThan600: "flex" }}
            alignItems="center"
            color="#000"
          >
            <Text as="span" mr="3px" display={{ base: "none", md: "inline" }}>
              Hurry up!{" "}
            </Text>
            <Text as="span"> Get promo</Text>
            <Text
              ml="5px"
              bg="#3c5dcc"
              color="#fff"
              padding="0 5px"
              sx={{
                clipPath:
                  "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
              }}
            >
              50TL
            </Text>
          </Flex>{" "}
          <Text
            fontSize={{ base: "0.8rem", isLargerThan360: "0.9rem" }}
            color="#000"
          >
            Use the code{" "}
            <b>
              <u>may50</u>
            </b>
          </Text>
          <Flex alignItems="center">
            <Text
              display={{ base: "none", isLargerThan450: "block" }}
              mr="5px"
              color="#000"
            >
              Expire after
            </Text>
            <CountdownTimer targetDate={currentMonthPromo?.valid_to} />
          </Flex>
        </Flex>
        <Button
          minWidth={{ base: "20px", isLargerThan360: "25px" }}
          height={{ base: "20px", isLargerThan360: "25px" }}
          bg="green.500"
          _hover={{ bg: "green.600" }}
          color="#fff"
          padding="0"
          aria-label="section-close-button"
          onClick={handleCloseSection}
        >
          <BsXLg />
        </Button>
      </Flex>
    </Box>
  );
};
