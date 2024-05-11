import { FC } from "react";
import { Image } from "@chakra-ui/react";

interface IFooterLogoProps {
  logoSrc: string;
}

export const FooterLogo: FC<IFooterLogoProps> = ({ logoSrc }) => {
  return (
    <Image
      maxW={{ base: "4.8rem", isLargerThan440: "5rem", lg: "6.62rem" }}
      h={{ base: "1.08rem", isLargerThan440: "1.18rem", lg: "2.17rem" }}
      src={logoSrc}
      alt="footer logo"
    />
  );
};
