import { FC, useState } from "react";
import { ProductCard } from "../ProductCard";
import { Flex, Grid } from "@chakra-ui/react";
import { ButtonShowMore } from "./ButtonShowMore";
import { ButtonShowAll } from "./ButtonShowAll";
import { IProductCards } from "@/types/product.types";

export const Between11And20: FC<IProductCards> = ({ products }) => {
  const [showedProducts, setShowedProducts] = useState(15);
  const discountBetween10And20Percent = products?.filter(
    (product) =>
      product.discountPercentage > 11 && product.discountPercentage <= 20
  );
  const result = discountBetween10And20Percent?.slice(0, showedProducts);
  const isShowed = discountBetween10And20Percent?.length > showedProducts;

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
          <ProductCard product={product} key={product?.id} hasDiscount={true} />
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
            productsLength={discountBetween10And20Percent?.length}
          />
        </Flex>
      )}
    </>
  );
};
