import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Box } from "@chakra-ui/react";

export default function Cosmetics() {
  useDocumentTitle("Cosmetics | RoHa");
  return (
    <Box
      maxWidth="1230px"
      width="100%"
      height="50vh"
      margin="30px auto"
      padding={{ base: "0 10px", isLargerThan440: "0 15px" }}
    >
      Cosmetics
    </Box>
  );
}
