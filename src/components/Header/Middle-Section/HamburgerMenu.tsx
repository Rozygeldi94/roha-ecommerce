import {
  Link,
  Flex,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorMode,
  useDisclosure,
  Button,
  Divider,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosMan, IoIosWoman } from "react-icons/io";
import {
  FcElectronics,
  FcViewDetails,
  FcNext,
  FcFlashOn,
  FcStackOfPhotos,
} from "react-icons/fc";
import { ALL_PRODUCTS, ELECTRONICS, MEN, OTHER, WOMEN } from "@/route";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FC, useContext, useEffect } from "react";
import { MainContext } from "@/pages/Layout";
import { resetSidebarValuesFn } from "@/utils/resetSidebarValues";

interface IHamburgerMenuProps {
  isLargerThan440: boolean;
}

export const HamburgerMenu: FC<IHamburgerMenuProps> = ({ isLargerThan440 }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useContext(MainContext);
  const location = useLocation();
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  return (
    <>
      <Button
        display={{ base: "flex", md: "none" }}
        minWidth="30px"
        height="auto"
        padding="0"
        bg="none"
        aria-label="hamburger-button"
        onClick={onOpen}
      >
        <GiHamburgerMenu size={isLargerThan440 ? "25px" : "22px"} />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderBottomColor="#ae2727">
            Basic Drawer
          </DrawerHeader>
          <DrawerBody padding="0">
            <Link
              as={RouterLink}
              padding="0 20px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bg="linear-gradient(90deg, rgba(255, 59, 0, 1) 0%, rgba(255, 255, 0, 1) 100%);"
            >
              <Flex alignItems="center" gap="5px" minHeight="50px">
                <FcFlashOn size="28px" /> Main page
              </Flex>
              <Flex
                w="24px"
                h="24px"
                justifyContent="center"
                alignItems="center"
                bg="#a7d5d4"
                borderRadius="50%"
              >
                <FcNext />
              </Flex>
            </Link>
            <Divider borderColor="#46395b" />
            <Link
              as={RouterLink}
              to={ALL_PRODUCTS}
              padding="0 20px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              onClick={resetSidebarValuesFn}
            >
              <Flex alignItems="center" gap="5px" minHeight="45px">
                <FcStackOfPhotos size="18px" /> All
              </Flex>
              <FcNext />
            </Link>
            <Divider
              borderColor={colorMode === "light" ? "#46395b" : "#c4d1ed"}
            />
            <Link
              as={RouterLink}
              to={MEN}
              padding="0 20px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex alignItems="center" gap="5px" minHeight="45px">
                <IoIosMan size="18px" /> Men
              </Flex>
              <FcNext />
            </Link>
            <Divider
              borderColor={colorMode === "light" ? "#46395b" : "#c4d1ed"}
            />
            <Link
              as={RouterLink}
              to={WOMEN}
              padding="0 20px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex alignItems="center" gap="5px" minHeight="45px">
                <IoIosWoman size="18px" /> Women
              </Flex>
              <FcNext />
            </Link>
            <Divider
              borderColor={colorMode === "light" ? "#46395b" : "#c4d1ed"}
            />
            <Link
              as={RouterLink}
              to={ELECTRONICS}
              padding="0 20px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex alignItems="center" gap="5px" minHeight="45px">
                <FcElectronics size="18px" /> Electronics
              </Flex>
              <FcNext />
            </Link>
            <Divider
              borderColor={colorMode === "light" ? "#46395b" : "#c4d1ed"}
            />
            <Link
              as={RouterLink}
              to={OTHER}
              padding="0 20px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex alignItems="center" gap="5px" minHeight="45px">
                <FcViewDetails size="18px" />
                Other
              </Flex>
              <FcNext />
            </Link>
            <Divider
              borderColor={colorMode === "light" ? "#46395b" : "#c4d1ed"}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
