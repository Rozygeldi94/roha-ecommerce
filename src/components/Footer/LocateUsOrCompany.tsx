import { Box, Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface ILocateUsOrCompanyProps {
  title: string;
  children: ReactNode;
}

export const LocateUsOrCompany: FC<ILocateUsOrCompanyProps> = ({
  title,
  children,
}) => {
  return (
    <Box className="locate-us-or-company">
      <Text as="h2" width="100%" mb="5px" fontSize="1.2rem">
        {title}
      </Text>
      <Box display="flex" flexDirection="column" gap="10px">
        {children}
      </Box>
    </Box>
  );
};
