import { useContext } from "react";
import { MainContext } from "@/pages/Layout";
import { getTopBrands } from "@/utils/getTopBrands";
import { Flex, Link, Text, useColorMode } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const TopBrands = () => {
  const { colorMode } = useContext(MainContext);
  const topBrands = getTopBrands();
  return (
    <Flex flexWrap="wrap" justifyContent="center" mt="40px" gap="20px">
      {topBrands.map((item) => (
        <Link
          className="top-brand"
          as={RouterLink}
          to={item?.link}
          key={item?.id}
          state={{ brand: item?.brand }}
          maxWidth={{ base: "140px", isLargerThan600: "165px" }}
          maxHeight={{ base: "140px", isLargerThan600: "165px" }}
          width="100%"
          padding={{ base: "5px", isLargerThan500: "15px" }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={colorMode === "light" ? "#f3f4f5" : " #91a3c1;"}
          position="relative"
          borderRadius="8px"
          _hover={{ textDecoration: "none", bg: "#dfddee" }}
        >
          <Flex
            width={{ base: "40px", isLargerThan500: "60px" }}
            height={{ base: "25px", isLargerThan500: "40px" }}
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={item?.image}
              width={item?.width}
              alt={item?.brand}
              fetchpriority="high"
            />
          </Flex>
          <Text mb="30px" color="#000" fontWeight="600">
            {item?.brand}
          </Text>
          <Flex
            justifyContent="center"
            alignItems="center"
            w="100%"
            minHeight="30px"
            bg={colorMode === "light" ? "#a9aee8" : "#4d4d4e"}
            borderBottomRadius="8px"
            position="absolute"
            left="0"
            bottom="0"
            sx={{
              ".top-brand:hover &": {
                background: colorMode === "light" ? "green.300" : "green.400",
              },
            }}
          >
            <Text>{item?.desc}</Text>
          </Flex>
        </Link>
      ))}
    </Flex>
  );
};
