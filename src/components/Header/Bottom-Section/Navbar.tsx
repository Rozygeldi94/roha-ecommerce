import {
  Link,
  List,
  ListItem,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  WOMEN,
  MEN,
  OTHER,
  ELECTRONICS,
  KIDS,
  HOME_AND_FURNITURE,
  SPORT_AND_OUTDOOR,
  COSMETICS,
  MOTORCYCLE,
} from "@/route";

export const Navbar = () => {
  const { colorMode } = useColorMode();
  const [isLargerThan1215] = useMediaQuery("(min-width: 1215px)");
  const [isLargerThan886] = useMediaQuery("(min-width: 886px)");
  const navItemsForLargeDisplay = [
    { id: 1, title: "Men", href: MEN },
    { id: 2, title: "Women", href: WOMEN },
    { id: 3, title: "Kids", href: KIDS },
    { id: 4, title: "Electronics", href: ELECTRONICS },
    { id: 5, title: "Home & Furniture", href: HOME_AND_FURNITURE },
    { id: 6, title: "Cosmetics", href: COSMETICS },
    { id: 7, title: "Motorcycle", href: MOTORCYCLE },
    { id: 8, title: "Sport & Outdoor", href: SPORT_AND_OUTDOOR },
    { id: 9, title: "Other", href: OTHER },
  ];

  const navItemsForMediumDisplay = [
    { id: 1, title: "Men", href: MEN },
    { id: 2, title: "Women", href: WOMEN },
    { id: 3, title: "Kids", href: KIDS },
    { id: 4, title: "Electronics", href: ELECTRONICS },
    { id: 5, title: "Home & Furniture", href: HOME_AND_FURNITURE },
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
        <ListItem
          key={item?.id}
          padding="5px 17.5px"
          bg={colorMode === "light" ? "#c5c9e4" : "#3f627a"}
          fontSize="1.1rem"
          fontWeight="600"
          _hover={{ background: "#a5abdd" }}
        >
          <Link
            as={RouterLink}
            to={item?.href}
            _hover={{ textDecoration: "none" }}
          >
            {item?.title}
          </Link>
        </ListItem>
      ))}
    </List>
  );
};
