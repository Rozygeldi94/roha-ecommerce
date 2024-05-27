import { FC, useContext, useEffect, useState } from "react";
import { Text, Image, Box, Link, useColorMode, Flex } from "@chakra-ui/react";
import { StarRating } from "./StarRating";
import { Link as RouterLink } from "react-router-dom";
import { ButtonAddToShoppingCart } from "../ButtonAddToShoppingCart";
import { useGetAllCommentsByPostIdQuery } from "@/store/api";
import { MdComment } from "react-icons/md";
import { IProduct } from "@/types/product.types";
import { calculateAllCommentsCount } from "@/utils/calculateAllCommentsCount";
import { MainContext } from "@/pages/Layout";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { IBotComment, IComment } from "@/types/productComments";

interface IProductCardProps {
  product: IProduct;
  hasDiscount?: boolean;
  isRecommended?: boolean;
}

export const ProductCard: FC<IProductCardProps> = ({
  product,
  hasDiscount,
  isRecommended,
}) => {
  const { colorMode } = useContext(MainContext);
  const databaseUsers = useTypedSelector((state) => state.databaseUser.users);
  const newPrice = Math.floor(
    (product?.price / 100) *
      (100 -
        Math.floor(
          product?.discountPercentage ? product?.discountPercentage : 0
        ))
  );
  const [allComments, setAllComments] = useState<(IComment | IBotComment)[]>(
    []
  );
  const { data: productComments } = useGetAllCommentsByPostIdQuery(product?.id);

  useEffect(() => {
    const allComments = calculateAllCommentsCount(
      databaseUsers,
      productComments?.comments,
      product?.id.toString()
    );
    setAllComments(allComments);
  }, [databaseUsers, productComments]);

  return (
    <Link
      as={RouterLink}
      to={`/${product?.category}/${product?.id}/${product?.title}`}
      maxWidth="260px"
      padding="35px 10px 10px 10px"
      position="relative"
      bg={colorMode === "light" ? "#fff" : "#35343f"}
      border={
        colorMode === "light" ? "2px solid #201e1d1f" : "2px solid #a3ff221f"
      }
      boxShadow={
        colorMode === "light"
          ? "rgba(99, 99, 99, 0.2)0px 2px 8px 0px"
          : "rgba(215, 244, 52, 0.2)0px 2px 8px 0px"
      }
      _hover={{
        boxShadow:
          colorMode === "light"
            ? "rgba(50, 119, 210, 0.9)0px 2px 10px 0px"
            : "rgba(210, 243, 24, 0.9)0px 2px 10px 0px",
        textDecoration: "none",
      }}
    >
      <Text
        as="span"
        padding="3px 5px"
        bg="gray.500"
        position="absolute"
        top="10px"
        left="10px"
        borderRadius="1px"
        color="#fff"
        fontSize="0.7rem"
        zIndex="3"
        _hover={{ textDecoration: "none" }}
      >
        {product?.category}
      </Text>

      <Box mb="10px" height="200px" position="relative">
        <Image
          src={product?.images?.[0] as string}
          alt={product?.title}
          maxH="200px"
          h="max-content"
          w="max-content"
          position="absolute"
          top="50%"
          left="50%"
          transform={"translate(-50%, -50%)"}
        />
      </Box>

      <Text
        mb="5px"
        overflow="hidden"
        height="43.2px"
        fontSize="0.9rem"
        fontWeight="500"
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: "2",
          WebkitBoxOrient: "vertical",
        }}
      >
        {product?.title}
      </Text>

      {!hasDiscount && (
        <Flex justifyContent="space-between">
          {isRecommended ? (
            <Image maxW="35px" src="recommended.png" alt="recommended logo" />
          ) : (
            <StarRating productRating={product?.rating} />
          )}
          <Flex alignItems="center" gap="3px">
            <MdComment />
            {allComments?.length}
          </Flex>
        </Flex>
      )}
      <Box
        mt="10px"
        display="flex"
        justifyContent="end"
        alignItems="center"
        gap="10px"
      >
        {hasDiscount && (
          <Text
            fontSize="1.2rem"
            color={colorMode === "light" ? "green" : "#e8cf17"}
            fontWeight="600"
          >
            {newPrice} TL
          </Text>
        )}
        {hasDiscount ? (
          <Box position="relative">
            <del style={{ fontSize: "0.9rem", color: "#a0b4cf" }}>
              {product?.price} TL
            </del>
            <Text
              as="span"
              padding="1px 5px"
              fontSize="0.8rem"
              position="absolute"
              top="-20px"
              left="0"
              color="#fff"
              bg="#b92114"
              borderRadius="8px"
            >
              -
              {Math.floor(
                product?.discountPercentage ? product?.discountPercentage : 0
              )}
              %
            </Text>
          </Box>
        ) : (
          <Text
            fontSize="1.2rem"
            color={colorMode === "light" ? "green" : "#e8cf17"}
            fontWeight="600"
          >
            {" "}
            {product?.price} TL
          </Text>
        )}
        {!hasDiscount && (
          <Text
            padding="3px 5px"
            bg="blue.500"
            borderRadius="1px"
            color="#fff"
            fontSize="0.7rem"
            zIndex="3"
            _hover={{ textDecoration: "none" }}
          >
            Stock: {product?.stock || 1}
          </Text>
        )}
      </Box>
      <Flex justifyContent="center">
        <ButtonAddToShoppingCart currentProduct={product} size="sm" />
      </Flex>
    </Link>
  );
};
