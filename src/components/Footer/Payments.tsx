import { Box, Flex, Link, useColorMode } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTelegram,
  FaLinkedin,
  FaCcMastercard,
  FaCcVisa,
  FaCcPaypal,
} from "react-icons/fa";
import { SiWebmoney } from "react-icons/si";
import { ROOT } from "@/route";
import { FooterLogo } from "./FooterLogo";

export const Payments = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      className="footer-payments"
      justifySelf="center"
      flexDirection="column"
      gap="10px"
      color={colorMode === "light" ? "#3939b6" : "#e7effe"}
    >
      <Link as={RouterLink} pt="6px" to={ROOT}>
        {colorMode === "light" ? (
          <FooterLogo logoSrc="/logo_brown.svg" />
        ) : (
          <FooterLogo logoSrc="/logo_white.svg" />
        )}
      </Link>
      <Box display="flex" alignItems="center" gap="5px">
        <span style={{ fontSize: "1.16rem" }}>©</span> by Rozygeldi
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={{ base: "10px", sm: "15px" }}
      >
        <FaCcVisa size="20px" />
        <FaCcMastercard size="20px" />
        <FaCcPaypal size="20px" />
        <SiWebmoney size="20px" />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={{ base: "10px", sm: "15px" }}
      >
        <a href="#" aria-label="twitter logo">
          <FaTwitter size="20px" />
        </a>
        <a href="#" aria-label="facebook logo">
          <FaFacebook size="20px" />
        </a>
        <a href="#" aria-label="instagram logo">
          <FaInstagram size="20px" />
        </a>
        <a href="#" aria-label="telegram logo">
          <FaTelegram size="20px" />
        </a>
        <a href="#" aria-label="linkedin logo">
          <FaLinkedin size="20px" />
        </a>
      </Box>
    </Flex>
  );
};
