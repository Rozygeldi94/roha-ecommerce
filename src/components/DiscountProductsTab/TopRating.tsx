import { FC, useState } from "react";
import { Flex, Grid } from "@chakra-ui/react";
import { ProductCard } from "../ProductCard";
import { ButtonShowMore } from "./ButtonShowMore";
import { ButtonShowAll } from "./ButtonShowAll";
import { IProductCards } from "@/types/product.types";

export const TopRating: FC<IProductCards> = ({ products }) => {
  const [showedProducts, setShowedProducts] = useState(15);
  const topRating = products?.filter((product) => product?.rating > 4.51);
  const result = topRating?.slice(0, showedProducts);
  const isShowed = topRating?.length > showedProducts;
  return (
    <>
      <Grid
        className="productsWrap"
        mt="20px"
        gridTemplateColumns={{
          sm: "repeat(auto-fit, minmax(210px, 1fr))",
        }}
        gap="20px"
      >
        {result?.map((product) => (
          <ProductCard product={product} key={product?.id} />
        ))}
      </Grid>
      {isShowed && (
        <Flex mt="30px" flexDirection="column" alignItems="center" gap="10px">
          <ButtonShowMore
            setShowedProducts={setShowedProducts}
            isShowed={isShowed}
          />
          <ButtonShowAll
            setShowedProducts={setShowedProducts}
            isShowed={isShowed}
            productsLength={topRating?.length}
          />
        </Flex>
      )}
    </>
  );
};
