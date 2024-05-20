import { MainContext } from "@/pages/Layout";
import { Box, Text } from "@chakra-ui/react";
import { useContext } from "react";

export const UserActivites = () => {
  const { currentUser, databaseUser, colorMode } = useContext(MainContext);

  return (
    <Box
      maxWidth="45%"
      width="100%"
      display={{ base: "none", md: "block" }}
      padding="10px 15px"
      bg={colorMode === "light" ? "#f6f6f8" : "#4f4f82"}
      borderRadius="10px"
      boxShadow={
        colorMode === "light"
          ? "0 3px 6px rgba(0,0,0,0.06), 0 3px 6px rgba(0,0,0,0.13)"
          : "0 3px 6px rgba(72, 137, 223, 0.6), 0 3px 6px rgba(58, 166, 230, 0.33)"
      }
      _hover={{
        boxShadow:
          colorMode === "light"
            ? "0 14px 28px rgba(0,0,0,0.16), 0 10px 10px rgba(0,0,0,0.13)"
            : "0 14px 28px rgba(72, 137, 223, 0.6), 0 10px 10px rgba(58, 166, 230, 0.33)",
      }}
      position="relative"
    >
      <Text>
        Your activated promo codes:{" "}
        <Text as="span">{currentUser?.activated_promo_codes?.length}</Text>
      </Text>
      <Text>
        Your comments:{" "}
        <Text as="span">
          {databaseUser && Object.values(databaseUser?.comments).length}
        </Text>
      </Text>
    </Box>
  );
};
