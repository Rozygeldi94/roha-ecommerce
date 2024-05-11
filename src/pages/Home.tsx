import {
  useGetAllProductsQuery,
  useLazyGetProductsByTitleQuery,
} from "@/store/api";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { Container } from "@chakra-ui/react";
import { Banner } from "@/components/Banner";
import { TopBrands } from "@/components/TopBrands";
import { DiscountProducts } from "@/components/DiscountProductsTab";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Home() {
  useDocumentTitle("E-commerce web site | RoHa");
  const { data } = useGetAllProductsQuery("");
  const [trigger, result] = useLazyGetProductsByTitleQuery();
  const searchInputValue = useTypedSelector(
    (state) => state.searchProducts.value
  );

  return (
    <Container
      maxWidth="1230px"
      padding={{ base: "0 10px", isLargerThan440: "0 15px" }}
      margin="30px auto"
    >
      <Banner />
      <TopBrands />
      <DiscountProducts />
    </Container>
  );
}
