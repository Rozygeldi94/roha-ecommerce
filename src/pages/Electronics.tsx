import { ProductCard } from "../components/ProductCard";
import { Box, Grid } from "@chakra-ui/react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/store/products/dummyjson.com_slice";
import { useGetAllProductsQuery } from "@/store/api";

export default function Electronics() {
  useDocumentTitle("Electronics | RoHa");
  const { data: products } = useGetAllProductsQuery("");

  const electronics = products?.products.filter(
    (item) => item.category === "laptops" || item.category === "smartphones"
  );

  return (
    <Grid
      id="products-wrap"
      maxWidth="1230px"
      margin="30px auto"
      padding={{ base: "0 10px", isLargerThan440: "0 15px" }}
      gridTemplateColumns={{
        sm: "repeat(auto-fit, minmax(210px, 1fr))",
      }}
      gap="20px"
    >
      {electronics?.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Grid>
  );
}
