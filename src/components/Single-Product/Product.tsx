import { FC, createContext, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
  Flex,
} from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { StarRating } from "../ProductCard/StarRating";
import { ELECTRONICS, ROOT, MEN, WOMEN, OTHER } from "@/route";
import {
  useGetAllCommentsByPostIdQuery,
  useGetProductByIdQuery,
} from "@/store/api";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { ProductImages } from "./ProductImages";
import { ButtonAddToShoppingCart } from "@/components/ButtonAddToShoppingCart";
import { AddComment } from "./AddComment";
import { ProductComments } from "./ProductComments";
import { IUserInfo, useRealtimeDataBase } from "@/hooks/realtimeDataBase";
import { MainContext } from "@/pages/Layout";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { IBotComment, IComment, TCommentLikes } from "@/types/productComments";
import { calculateAllCommentsCount } from "@/utils/calculateAllCommentsCount";

export interface IDatabaseContext {
  setData: (
    docRef: string,
    data: IComment | IUserInfo | TCommentLikes,
    method: string
  ) => void;
}
export const DatabaseContext = createContext<IDatabaseContext | null>(null);

export const Product: FC = () => {
  const { id } = useParams();
  const { data: currentProduct } = useGetProductByIdQuery(id);
  const { data: productComments } = useGetAllCommentsByPostIdQuery(id);
  useDocumentTitle(
    currentProduct ? `${currentProduct?.title}` : "Product | RoHa"
  );
  const location = useLocation();

  const { authUser, colorMode, isModalOpen, setIsModalOpen } =
    useContext(MainContext);
  const [allComments, setAllComments] = useState<(IComment | IBotComment)[]>(
    []
  );
  const databaseUsers = useTypedSelector((state) => state.databaseUser.users);
  const storeProducts = useTypedSelector(
    (state) => state.shoppingCard.shoppingCartProducts
  );
  const { setData } = useRealtimeDataBase();

  useEffect(() => {
    const allComments = calculateAllCommentsCount(
      databaseUsers,
      productComments?.comments,
      id
    );
    setAllComments(allComments);
  }, [databaseUsers, productComments]);

  useEffect(() => {
    isModalOpen && setIsModalOpen(false);
  }, [location.pathname]);

  return (
    <DatabaseContext.Provider value={{ setData }}>
      <Box maxWidth="1230px" margin="15px auto">
        <Breadcrumb spacing="5px" padding="0 15px" separator={<FaAngleRight />}>
          <BreadcrumbItem>
            <BreadcrumbLink href={ROOT}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={(() => {
                switch (currentProduct?.category) {
                  case "laptops":
                  case "smartphones":
                    return ELECTRONICS;
                  case "men's clothing":
                    return MEN;
                  case "women's clothing":
                    return WOMEN;
                  default:
                    return OTHER;
                }
              })()}
            >
              {(() => {
                switch (currentProduct?.category) {
                  case "laptops":
                  case "smartphones":
                    return "Electronics";
                  case "men's clothing":
                    return "Men";
                  case "women's clothing":
                    return "Women";
                  default:
                    return "Other";
                }
              })()}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">{currentProduct?.category}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              color={colorMode === "light" ? "#2f33e7" : "#ff4102"}
              fontWeight="500"
              href="#"
            >
              {currentProduct?.brand}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex
          flexDirection={{ base: "column", isLargerThan600: "row" }}
          gap="40px"
          mt="15px"
          padding="0 15px"
        >
          <ProductImages currentProduct={currentProduct} />
          <Box flexGrow="1">
            <Box
              w={{ isLargerThan360: "100%", md: "80%" }}
              h="100%"
              display="flex"
              flexDirection="column"
              gap={{ base: "10px", isLargerThan600: "0" }}
            >
              <Text mb="10px" fontSize="1.1rem">
                <Link as={RouterLink} to="#" fontWeight="600">
                  {currentProduct?.brand ? `${currentProduct?.brand},` : ""}
                </Link>
                {currentProduct?.title}
              </Text>
              <Text flexGrow="1">{currentProduct?.description}</Text>
              <Text
                fontSize="1.2rem"
                color={colorMode === "light" ? "green" : "#e8cf17"}
                fontWeight="600"
              >
                {currentProduct?.price} TL
              </Text>
              <Flex gap="15px" alignItems="center">
                <Flex
                  gap="10px"
                  justifyContent="space-between"
                  alignItems="center"
                  margin="5px 0 10px 0"
                >
                  {currentProduct?.rating}
                  <StarRating productRating={currentProduct?.rating} />
                </Flex>
                <Text>{allComments?.length} comments</Text>
              </Flex>
              <ButtonAddToShoppingCart currentProduct={currentProduct} />
            </Box>
          </Box>
        </Flex>
        {authUser ? (
          <Box padding={{ base: "0 10px", isLargerThan440: "0 15px" }}>
            <AddComment postId={id} setData={setData} />
            <ProductComments allComments={allComments} />
          </Box>
        ) : (
          <Text
            mt="40px"
            padding={{ base: "0 10px", isLargerThan440: "0 15px" }}
          >
            Please sign in to view comments!
          </Text>
        )}
      </Box>
    </DatabaseContext.Provider>
  );
};
