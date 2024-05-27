import { FC, useState } from "react";
import { ProductCard } from "../ProductCard";
import { Flex, Grid } from "@chakra-ui/react";
import { ButtonShowMore } from "./ButtonShowMore";
import { ButtonShowAll } from "./ButtonShowAll";
import { IProductCards } from "@/types/product.types";

export const RecommendedProducts: FC<IProductCards> = ({ products }) => {
  const [showedProducts, setShowedProducts] = useState(15);

  const recommendedProducts = products?.filter(
    (product) =>
      product?.reviews?.reduce((acc: number, item) => {
        return acc + item.rating;
      }, 0) >= 14
  );

  const result = recommendedProducts?.slice(0, showedProducts);
  const isShowed = recommendedProducts?.length > showedProducts;

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
          <ProductCard
            product={product}
            key={product?.id}
            hasDiscount={false}
            isRecommended={true}
          />
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
            productsLength={recommendedProducts?.length}
          />
        </Flex>
      )}
    </>
  );
};
