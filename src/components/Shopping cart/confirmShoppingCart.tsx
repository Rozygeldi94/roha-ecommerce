import {
  useEffect,
  useState,
  useContext,
  ChangeEvent,
  KeyboardEventHandler,
} from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useActions } from "@/hooks/useActions";
import { Link as RouterLink } from "react-router-dom";
import { ROOT } from "@/route";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { FaArrowRight } from "react-icons/fa";
import { usePromoCode, useActivatedPromoCode } from "@/hooks/usePromoCode";
import { getCurrentMonth } from "@/utils/getCurrentMonth";
import { BsXLg } from "react-icons/bs";
import { MainContext } from "@/pages/Layout";

export const ConfirmShoppingCart = () => {
  const {
    saveActivatedPromoCode,
    isSaveLoading,
    activatedPromo,
    getActivatedPromoCode,
    deleteActivatedPromoCode,
    isDeleteLoading,
  } = useActivatedPromoCode();

  const { currentMonthPromo, getCurrentMonthPromo } = usePromoCode();
  const { authUser, colorMode } = useContext(MainContext);
  const { getTotal } = useActions();
  const [isActivePromo, setIsActivePromo] = useState(false);
  const [promoError, setPromoError] = useState({ title: "", status: false });
  const products = useTypedSelector((state) => state.shoppingCard);
  const [userInputText, setUserInputText] = useState("");

  const totalPrice = +products?.cardTotalAmount.toPrecision(4);
  const cargoPrice =
    (authUser && totalPrice > 150) || totalPrice === 0
      ? 0
      : authUser && 25
      ? 25
      : 0;

  useEffect(() => {
    getTotal();
    getCurrentMonthPromo();
    getActivatedPromoCode();
  }, [products]);

  useEffect(() => {
    activatedPromo && setUserInputText(activatedPromo?.title);
    activatedPromo && setIsActivePromo(true);
  }, [activatedPromo]);

  const calculateTotalPrice = () => {
    if (authUser) {
      if (currentMonthPromo?.promo_price && (isActivePromo || activatedPromo)) {
        if (cargoPrice) {
          return totalPrice + cargoPrice - currentMonthPromo?.promo_price;
        }
        return totalPrice - currentMonthPromo?.promo_price;
      } else {
        if (totalPrice >= 150) {
          return totalPrice - cargoPrice;
        } else {
          return totalPrice + cargoPrice;
        }
      }
    } else {
      if (totalPrice === 0) {
        return 0;
      } else {
        if (authUser && Number(totalPrice + cargoPrice).toPrecision(4)) {
          return Number(totalPrice + cargoPrice).toPrecision(4);
        } else {
          return 0;
        }
      }
    }
  };

  const handleClick = () => {
    const currentTime = new Date().getTime();
    if (!userInputText.length) {
      setPromoError({ title: "Enter promo code!", status: true });
      return;
    }

    if (currentMonthPromo?.title === userInputText) {
      if (currentMonthPromo?.validTo < currentTime) {
        setPromoError({
          title: "The promo code validity period has expired!",
          status: true,
        });
      } else {
        const currentMonth = getCurrentMonth();
        !isActivePromo && setIsActivePromo(true);
        saveActivatedPromoCode(currentMonthPromo, currentMonth);
        setPromoError({ title: "", status: false });
      }
    } else {
      setPromoError({
        title: "Invalid promo code!",
        status: true,
      });
    }
  };
  const deletePromoCode = () => {
    isActivePromo && deleteActivatedPromoCode();
    setUserInputText("");
    setIsActivePromo(false);
    setPromoError({
      title: "",
      status: false,
    });
  };
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInputText(e.target.value);
    setPromoError({ title: "", status: false });

    if (userInputText === activatedPromo?.title) {
      isActivePromo && setIsActivePromo(false);
    }
  };
  const handleKeyPress = (e: KeyboardEventHandler<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <VStack
      minWidth={{
        base: "200px",
        isLargerThan550: "550px",
        isLargerThan850: "200px",
      }}
      padding={{ base: "0 15px", isLargerThan550: "0" }}
      gap="20px"
    >
      <Flex
        width="100%"
        flexDirection={{
          base: "column",
          isLargerThan550: "row",
          isLargerThan850: "column",
        }}
        padding="10px 15px"
        bg={colorMode === "light" ? "#fff" : "#372e3e"}
        border="2px solid #201e1d1f"
        boxShadow={
          colorMode === "light"
            ? "rgba(99, 99, 99, 0.2)0px 2px 8px 0px"
            : "rgba(236, 218, 218, 0.36)0px 1px 3px 0px"
        }
        alignItems="center"
        gap="20px"
      >
        <Box>
          <Flex gap="5px">
            <InputGroup>
              <Input
                required
                maxLength={20}
                size={{ base: "sm", isLargerThan700: "md" }}
                placeholder="Enter promo code"
                border="1px #1d6cda solid"
                value={userInputText}
                onChange={handleChangeInput}
                isDisabled={isActivePromo ? true : false}
                style={{ paddingRight: "45px" }}
                onKeyDown={handleKeyPress}
              />

              {userInputText && (
                <InputRightElement>
                  <Tooltip
                    isDisabled={isActivePromo ? false : true}
                    label="Delete promo code"
                    zIndex="99999"
                  >
                    <Box position="relative">
                      <BsXLg cursor="pointer" onClick={deletePromoCode} />
                    </Box>
                  </Tooltip>
                </InputRightElement>
              )}
            </InputGroup>

            <Button
              size={{ base: "sm", isLargerThan700: "md" }}
              colorScheme="twitter"
              onClick={handleClick}
              isLoading={isSaveLoading || isDeleteLoading}
              isDisabled={isActivePromo ? true : false}
            >
              <FaArrowRight />
            </Button>
          </Flex>
          {promoError?.status ? (
            <Text color="red">{promoError?.title}</Text>
          ) : isActivePromo ? (
            <Text mt="5px" color={colorMode === "light" ? "green" : "#10bc10"}>
              Promo code activated!
            </Text>
          ) : (
            ""
          )}
        </Box>

        <Divider
          orientation={{
            base: "horizontal",
            isLargerThan550: "vertical",
            isLargerThan850: "horizontal",
          }}
          width={{
            base: "100%",
            isLargerThan550: "1px",
            isLargerThan850: "100%",
          }}
          minHeight={{
            base: "1px",
            isLargerThan550: "100px",
            isLargerThan850: "1px",
          }}
          bg="blue.300"
        />
        <Box
          width={{
            base: "100%",
            isLargerThan550: "50%",
            isLargerThan850: "100%",
          }}
        >
          <Text textAlign="center">Order summary</Text>
          <Flex m="6px 0 2px 0" justifyContent="space-between">
            <Text>Orders total:</Text>
            <Text as="span">{authUser ? totalPrice : 0} TL</Text>
          </Flex>
          <Flex mb="6px" justifyContent="space-between">
            <Text>Cargo total: </Text>
            <Text as="span">{cargoPrice} TL</Text>
          </Flex>
          {isActivePromo && (
            <Flex
              mb="6px"
              justifyContent="space-between"
              color={colorMode === "light" ? "green" : "#10bc10"}
            >
              <Text>Promo code:</Text>
              <Text as="span">- {currentMonthPromo?.promo_price} TL</Text>
            </Flex>
          )}
          <Divider bg="#ddcaca" height="0.4px" />
          <Flex justifyContent="center">
            <Text>Total: {calculateTotalPrice()} TL</Text>
          </Flex>
        </Box>
      </Flex>

      <Button
        as={RouterLink}
        to={ROOT}
        size={{ sm: "sm", lg: "md" }}
        width="100%"
        padding="10px 15px"
        colorScheme="twitter"
      >
        <Text as="span" fontSize="1.4rem" fontWeight="800" mr="5px">
          ←
        </Text>
        Go shopping
      </Button>
    </VStack>
  );
};
