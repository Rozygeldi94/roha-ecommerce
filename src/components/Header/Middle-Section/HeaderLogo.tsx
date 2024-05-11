import { FC } from "react";
import { Image } from "@chakra-ui/react";

interface IHeaderLogoProps {
  logoSrc: string;
}

export const HeaderLogo: FC<IHeaderLogoProps> = ({ logoSrc }) => {
  return (
    <Image
      maxW="calc(80px + (106 - 77) * ((100vw - 300px) / (1230 - 300)))"
      h="calc(20px + (35 - 18) * ((100vw - 300px) / (1230 - 300)))"
      src={logoSrc}
      alt="header logo"
      fetchpriority="high"
    />
  );
};
