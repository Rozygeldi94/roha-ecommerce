import { FC } from "react";
import { Button, useColorMode } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import { FaMoon, FaSun } from "react-icons/fa";

interface IToogleDarkModeProps {
  isVisible: boolean;
  isMobileVersion: boolean;
}

export const ToogleDarkMode: FC<IToogleDarkModeProps> = ({
  isVisible,
  isMobileVersion = false,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleToggleColorMode = () => {
    toggleColorMode();
  };

  return (
    <Button
      size={{ base: "xs", isLargerThan440: "sm" }}
      display={isVisible ? "flex" : "none"}
      gap="5px"
      bg={colorMode === "dark" ? "#1da1f2" : "#adc3df"}
      _hover={{
        background: colorMode === "dark" ? "#523b3b" : "#adc3df",
      }}
      aria-label="toggle-dark-mode"
      margin={isMobileVersion ? "0 10px " : "0"}
      padding={isMobileVersion ? "0 10px " : "0"}
      style={
        !isMobileVersion
          ? { paddingInlineStart: "0", paddingInlineEnd: "0" }
          : {}
      }
      onClick={handleToggleColorMode}
    >
      {colorMode === "light" ? (
        <IconContext.Provider
          value={{
            color: "dark",
            style: { width: "20px", height: "20px" },
          }}
        >
          <FaMoon />
        </IconContext.Provider>
      ) : (
        <IconContext.Provider
          value={{
            color: "light",
            style: { width: "20px", height: "20px" },
          }}
        >
          <FaSun />
        </IconContext.Provider>
      )}
      {isMobileVersion && colorMode === "light" && "Dark mode"}
      {isMobileVersion && colorMode === "dark" && "Light mode"}
    </Button>
  );
};
