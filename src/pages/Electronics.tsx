import { ProductCard } from "../components/ProductCard";
import { Box } from "@chakra-ui/react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Electronics() {
  useDocumentTitle("Electronics | RoHa");
  const products = useTypedSelector((state) => state.products.products);
  console.log(products);

  const electronics = products[0]?.products.filter(
    (item) => item.category === "laptops" || item.category === "smartphones"
  );

  return (
    <Box
      maxWidth="1200px"
      margin="30px auto"
      display="grid"
      gridTemplateColumns="repeat(4, 1fr)"
      gap="20px"
      mb="20px"
    >
      {electronics?.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Box>
  );
}
