import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Box } from "@chakra-ui/react";

export default function Motorcycle() {
  useDocumentTitle("Motorcycle | RoHa");
  return (
    <Box
      maxWidth="1230px"
      width="100%"
      margin="30px auto"
      padding={{ base: "0 10px", isLargerThan440: "0 15px" }}
    >
      Motorcycle
    </Box>
  );
}
