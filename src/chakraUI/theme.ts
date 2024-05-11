import { extendTheme } from "@chakra-ui/react";

const themes = {
  initialColorMode: "dark",
  useSystemColorMode: true,
  styles: {
    global: ({ colorMode }: any) => ({
      body: {
        paddingTop: { base: "105px", isLargerThan440: "110px", md: "175px" },
      },
      ".pagenation-page-link": {
        color: colorMode === "light" ? "#3d4355" : "#afb9d9",
      },
      ".pagenation-active-link": {
        color: colorMode === "light" ? "#f5f5f5" : "#333726",
      },
      ".selected": {
        background: colorMode === "light" ? "#4b558f" : "#aed238",
      },
      ".stdropdown-menu": {
        backgroundColor: colorMode === "dark" && "#3b3b3b !important",
      },
    }),
  },
};

const breakpoints = {
  base: "0px",
  sm: "320px",
  isLargerThan360: "360px",
  isLargerThan440: "439px",
  isLargerThan450: "450px",
  isLargerThan500: "500px",
  isLargerThan550: "550px",
  isLargerThan600: "600px",
  isLargerThan650: "650px",
  isLargerThan700: "701px",
  md: "768px",
  isLargerThan850: "850px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const theme = extendTheme(themes, { breakpoints });
export default theme;
