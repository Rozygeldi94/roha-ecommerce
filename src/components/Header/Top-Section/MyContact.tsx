import { Link, useColorMode } from "@chakra-ui/react";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

interface IMyContactProps {
  [keys: string]: string;
}

export const MyContact: FC<IMyContactProps> = ({ contact, ...otherProps }) => {
  const { colorMode } = useColorMode();
  return (
    <Link
      as={RouterLink}
      {...otherProps}
      _hover={{
        textDecoration: "none",
        color: colorMode === "light" ? "blue" : "#b1dc26",
      }}
    >
      {contact}
    </Link>
  );
};
