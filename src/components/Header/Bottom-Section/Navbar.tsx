import {
  Link,
  List,
  ListItem,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  ALL_PRODUCTS,
  MEN,
  WOMEN,
  OTHER,
  ELECTRONICS,
  KIDS,
  HOME_AND_FURNITURE,
  SPORT_AND_OUTDOOR,
  COSMETICS,
} from "@/route";
import { resetSidebarValuesFn } from "@/utils/resetSidebarValues";

export const Navbar = () => {
  const { colorMode } = useColorMode();
  const [isLargerThan1215] = useMediaQuery("(min-width: 1215px)");
  const [isLargerThan886] = useMediaQuery("(min-width: 886px)");
  const navItemsForLargeDisplay = [
    { id: 1, title: "All", href: ALL_PRODUCTS },
    { id: 2, title: "Men", href: MEN },
    { id: 3, title: "Women", href: WOMEN },
    { id: 4, title: "Kids", href: KIDS },
    { id: 5, title: "Electronics", href: ELECTRONICS },
    { id: 6, title: "Home & Furniture", href: HOME_AND_FURNITURE },
    { id: 7, title: "Cosmetics", href: COSMETICS },
    { id: 8, title: "Sport & Outdoor", href: SPORT_AND_OUTDOOR },
    { id: 9, title: "Other", href: OTHER },
  ];

  const navItemsForMediumDisplay = [
    { id: 1, title: "All", href: ALL_PRODUCTS },
    { id: 2, title: "Men", href: MEN },
    { id: 3, title: "Women", href: WOMEN },
    { id: 4, title: "Kids", href: KIDS },
    { id: 5, title: "Electronics", href: ELECTRONICS },
    { id: 6, title: "Sport & Outdoor", href: SPORT_AND_OUTDOOR },
    { id: 7, title: "Other", href: OTHER },
  ];
  const navItemsForSmallDisplay = navItemsForMediumDisplay.filter(
    (item) => item.title !== "Sport & Outdoor"
  );
  const navItems = isLargerThan1215
    ? navItemsForLargeDisplay
    : isLargerThan886
    ? navItemsForMediumDisplay
    : navItemsForSmallDisplay;

  return (
    <List
      width={isLargerThan1215 ? "95%" : "100%"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap="6px"
    >
      {navItems.map((item) => (
        <ListItem>
          <Link
            as={RouterLink}
            to={item?.href}
            key={item?.id}
            padding="5px 17.5px"
            bg={colorMode === "light" ? "#c5c9e4" : "#3f627a"}
            fontSize="1.1rem"
            fontWeight="600"
            _hover={{ background: "#a5abdd", textDecoration: "none" }}
            onClick={item?.title === "All" ? resetSidebarValuesFn : undefined}
          >
            {item?.title}
          </Link>
        </ListItem>
      ))}
    </List>
  );
};
