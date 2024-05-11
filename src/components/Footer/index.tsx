import { FC } from "react";
import { Box, Divider, Text, Link, useColorMode, Flex } from "@chakra-ui/react";
import { Payments } from "./Payments";
import { LocateUsOrCompany } from "./LocateUsOrCompany";
import { Subscribe } from "./Subscribe";

export const Footer: FC = () => {
  const { colorMode } = useColorMode();
  const colors = {
    colorLink: colorMode === "light" ? "#3900f5" : "#b1dc26",
    hoverColorLink: colorMode === "light" ? "#5cc31c" : "#42a242",
  };
  return (
    <Box as="footer" bg={colorMode === "light" ? "#dcecef" : "#2b3648"}>
      <Box
        maxWidth="1230px"
        width="100%"
        margin="50px auto"
        padding="0 15px"
        display="flex"
        flexWrap={{ base: "wrap", lg: "nowrap" }}
        justifyContent={{ base: "center", sm: "space-between" }}
        alignItems="start"
        rowGap="20px"
      >
        <Box
          flexGrow="1"
          display="flex"
          marginRight={{
            base: "20px",
            lg: "calc(40px + (100 - 50) * ((100vw - 992px) / (1230 - 992)))",
            xl: "100px",
          }}
          flexWrap={{ base: "wrap", md: "nowrap" }}
          justifyContent={{
            isLargerThan440: "center",
            isLargerThan600: "space-between",
          }}
          gap={{ base: "30px", sm: "50px" }}
        >
          <Payments />
          <Divider display={{ base: "block", sm: "none" }} />
          <LocateUsOrCompany title="Locate us">
            <Text>Kadikoy, Istanbul, Turkiye</Text>
            <Text>
              Mobile:{" "}
              <Link
                href="tel: +905425750594"
                color={colors.colorLink}
                _hover={{
                  textDecoration: "none",
                  color: colors.hoverColorLink,
                }}
              >
                +905425750594
              </Link>
            </Text>
            <Text>
              Fax:{" "}
              <Link
                href="tel: +905425770589"
                color={colors.colorLink}
                _hover={{
                  textDecoration: "none",
                  color: colors.hoverColorLink,
                }}
              >
                +905425770589
              </Link>
            </Text>
            <Text>
              Email:{" "}
              <Link
                href="mailto: example@mail.ru"
                color={colors.colorLink}
                _hover={{
                  textDecoration: "none",
                  color: colors.hoverColorLink,
                }}
              >
                example@mail.ru
              </Link>
            </Text>
          </LocateUsOrCompany>
          <LocateUsOrCompany title="Company">
            <Link
              href="#"
              color={colors.colorLink}
              _hover={{
                textDecoration: "none",
                color: colors.hoverColorLink,
              }}
            >
              About us
            </Link>
            <Link
              href="#"
              color={colors.colorLink}
              _hover={{
                textDecoration: "none",
                color: colors.hoverColorLink,
              }}
            >
              Blog
            </Link>{" "}
            <Link
              href="#"
              color={colors.colorLink}
              _hover={{
                textDecoration: "none",
                color: colors.hoverColorLink,
              }}
            >
              Partnerships
            </Link>
            <Link
              href="#"
              color={colors.colorLink}
              _hover={{
                textDecoration: "none",
                color: colors.hoverColorLink,
              }}
            >
              Careers
            </Link>
          </LocateUsOrCompany>
        </Box>
        <Flex
          maxWidth="500px"
          width={{ base: "100%", isLargerThan440: "80%", lg: "372px" }}
          margin={{ base: "20px auto 0 auto", lg: "0 auto" }}
          textAlign={{ base: "center", md: "start" }}
          flexDirection="column"
          gap="10px"
        >
          <Subscribe />
        </Flex>
      </Box>
    </Box>
  );
};
