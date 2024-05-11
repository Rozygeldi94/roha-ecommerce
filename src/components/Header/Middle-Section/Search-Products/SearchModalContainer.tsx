import { Dispatch, FC, useContext, useRef } from "react";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useGetProductsByTitleQuery } from "@/store/api";
import { getCategoriesAndBrands } from "@/utils/getCategoriesAndBrands";
import { Box, Flex, Text, useOutsideClick } from "@chakra-ui/react";
import { SearchedCategoryModal, SearchedProductsModal } from "./SearchModal";
import { NothingFound } from "@/components/Products/NothingFound";
import { MainContext } from "@/pages/Layout";
import { Search } from ".";

interface ISearchModalContainerProps {
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

export const SearchModalContainer: FC<ISearchModalContainerProps> = ({
  setIsModalOpen,
}) => {
  const [storageValue] = useSessionStorage("sidebarSelectedValues", []);
  const { categories, brands } = getCategoriesAndBrands(storageValue);
  const { colorMode } = useContext(MainContext);
  const searchedResult: Record<string, string[]> = { category: [], brand: [] };
  const ref = useRef(null);
  const searchInputValue = useTypedSelector(
    (state) => state.searchProducts.value
  );

  const { data: result } = useGetProductsByTitleQuery(searchInputValue);

  const products = result?.products;

  useOutsideClick({
    ref: ref,
    handler: () => {
      setIsModalOpen(false);
    },
  });

  categories.forEach((el) => {
    if (el?.category.toLowerCase().includes(searchInputValue.toLowerCase())) {
      let makeUppercase = el?.category.substring(0, 1).toUpperCase();
      let concatedValue = makeUppercase.concat(
        el?.category.substring(1).toLowerCase()
      );
      searchedResult.category.push(concatedValue);
    }
  });

  brands.forEach((el) => {
    if (el?.brand?.toLowerCase().includes(searchInputValue.toLowerCase())) {
      let makeUppercase = el?.brand?.substring(0, 1).toUpperCase();

      let concatedValue = makeUppercase.concat(
        el?.brand?.substring(1).toLowerCase()
      );
      searchedResult.brand.push(concatedValue);
    }
  });

  return (
    <Flex
      ref={ref}
      maxWidth="1000px"
      width="calc(100vw - 40px)"
      minHeight="235px"
      maxHeight="70vh"
      padding={{
        base: "15px 10px",
        isLargerThan440: "20px 15px",
        isLargerThan650: "20px 30px",
      }}
      flexDirection="column"
      gap="30px"
      bg={colorMode === "light" ? "blue.200" : "#2d3748"}
      border={colorMode === "dark" ? "1px #1da1f2 solid" : "none"}
      borderRadius="4px"
      position="absolute"
      left="50%"
      top="50px"
      transform="translateX(-50%)"
      overflowY="auto"
      zIndex="99999"
    >
      {!searchInputValue ? (
        <>
          <Search isVisible={true} />
          <Text mt="20px" textAlign="center">
            The results will be shown here...
          </Text>
        </>
      ) : (
        <>
          <Search isVisible={true} />
          {searchedResult?.category.length > 0 && (
            <Flex gap="15px">
              <Box minWidth="80px">Categories:</Box>

              <SearchedCategoryModal
                type="categories"
                list={searchedResult?.category}
                searchInputValue={searchInputValue}
              />
            </Flex>
          )}
          {searchedResult?.brand.length > 0 && (
            <Flex gap="15px">
              <Box minWidth="80px">Brands:</Box>

              <SearchedCategoryModal
                type="brands"
                list={searchedResult?.brand}
                searchInputValue={searchInputValue}
              />
            </Flex>
          )}
          {products?.length > 0 && (
            <Flex
              gap="15px"
              flexDirection={{ base: "column", isLargerThan600: "row" }}
            >
              <Box minWidth="80px">Products:</Box>

              <SearchedProductsModal products={products} />
            </Flex>
          )}
          {!searchedResult?.category.length &&
            !searchedResult?.brand.length &&
            !products?.length && <NothingFound />}
        </>
      )}
    </Flex>
  );
};
