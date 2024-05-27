import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { UpTo10 } from "./UpTo10";
import { Between11And20 } from "./Between11And20";
import { useGetAllProductsQuery } from "@/store/api";
import { TopRating } from "./TopRating";
import { RecommendedProducts } from "./RecommendedProducts";

export const DiscountProducts = () => {
  const { data } = useGetAllProductsQuery("");
  return (
    <Box mt="60px">
      <Text as="h2" fontSize="1.5rem" fontWeight="700">
        Popular
      </Text>
      <Tabs position="relative" variant="unstyled">
        <TabList flexWrap="wrap">
          <Tab _selected={{ color: "white", bg: "blue.500" }}>
            Up to 10% OFF
          </Tab>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>
            11% - 20% OFF
          </Tab>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>Top rating</Tab>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>
            Recommended products
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UpTo10 products={data?.products} />
          </TabPanel>
          <TabPanel>
            <Between11And20 products={data?.products} />
          </TabPanel>
          <TabPanel>
            <TopRating products={data?.products} />
          </TabPanel>
          <TabPanel>
            <RecommendedProducts products={data?.products} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
