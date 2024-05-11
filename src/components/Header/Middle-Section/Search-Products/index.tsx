import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ChangeEventHandler,
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsSearch, BsXLg } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import debounce from "lodash.debounce";
import { useActions } from "@/hooks/useActions";
import { SearchModalContainer } from "./SearchModalContainer";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { MainContext } from "@/pages/Layout";

interface ISearchProps {
  isMobile?: boolean;
  isVisible: boolean;
}

export const Search: FC<ISearchProps> = ({ isMobile = false, isVisible }) => {
  const { colorMode } = useContext(MainContext);
  const searchInputValue = useTypedSelector(
    (state) => state.searchProducts.value
  );
  const [value, setValue] = useState(searchInputValue);
  const {
    updatedInputValue,
    resetInputValue,
    setSidebarActive,
    resetSidebarValues,
  } = useActions();
  const {
    isOpen: isOpenMobileModal,
    onOpen: onOpenMobileModal,
    onClose: onCloseMobileModal,
  } = useDisclosure();
  const {
    isOpen: isOpenSearchModal,
    onOpen: onOpenSearchModal,
    onClose: onCloseSearchModal,
  } = useDisclosure();

  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToResults = () => {
    if (innerWidth > 600) {
      document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.code === "KeyK") {
          inputRef.current?.click();
          inputRef.current?.focus();
          e.preventDefault();
        }
      });
    }
  };

  useEffect(() => {
    scrollToResults();
    return () => {
      scrollToResults();
    };
  }, []);

  const callbackDebounce = useCallback(
    debounce((inputValue: string | number) => {
      updatedInputValue(inputValue);
      setSidebarActive(false);
      resetSidebarValues();
      const pop = document.querySelectorAll<HTMLElement>(
        ".css-1ey9w6j [data-checked]"
      );
      const pop1 = document.querySelectorAll<HTMLElement>(
        ".css-e9m96y[data-checked] div"
      );

      pop.forEach((el) => {
        el.removeAttribute("data-checked");
      });
      pop1.forEach((el) => {
        el.style.display = "none";
        el.click();
      });
    }, 1000),
    []
  );

  const updateInputValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    inputRef.current?.click();
    callbackDebounce(e.target.value);
  };

  const resetInputValues = () => {
    setValue("");
    resetInputValue();
    inputRef.current?.focus();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return isMobile ? (
    <>
      <BiSearch
        size="23px"
        height="23px"
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && <SearchModalContainer setIsModalOpen={setIsModalOpen} />}
    </>
  ) : (
    <InputGroup
      display={isVisible ? { base: "flex", isLargerThan600: "none" } : {}}
      size="sm"
      position="relative"
      className="searchInput"
      onClick={onOpenSearchModal}
    >
      <InputLeftElement width="2rem">
        <BsSearch size="19px" />
      </InputLeftElement>
      <Input
        value={value}
        placeholder="Title or Description"
        onChange={updateInputValue}
        ref={inputRef}
        border={
          colorMode === "light" ? "1px #386338 solid" : "1px #c7b6df solid"
        }
        _hover={{
          borderColor: colorMode === "light" ? "#3e2f55" : "#c7b6df",
        }}
      />

      {value ? (
        <InputRightElement onClick={resetInputValues}>
          <BsXLg cursor="pointer" />
        </InputRightElement>
      ) : isMobile ? (
        <Text position="absolute" top="2px" right="10px">
          <Kbd
            bg={colorMode === "light" ? "#c0ccd8" : "#535f6b"}
            padding="2px 5px"
          >
            Ctrl
          </Kbd>
          <Kbd
            bg={colorMode === "light" ? "#c0ccd8" : "#535f6b"}
            padding="2px 5px"
          >
            K
          </Kbd>
        </Text>
      ) : (
        ""
      )}
      <Text
        as="span"
        width="0"
        height="1px"
        position="absolute"
        left="50%"
        bottom="0"
        bg={colorMode === "light" ? "#2208ca" : "#e5ec0a"}
        transition="0.4s"
        sx={{
          ".searchInput:hover &": {
            width: "100%",
            height: "1px",
            left: "0",
            bottom: "0",
            transition: "0.4s",
          },
        }}
      ></Text>
    </InputGroup>
  );
};
