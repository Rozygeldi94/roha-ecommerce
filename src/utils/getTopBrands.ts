import { useMediaQuery } from "@chakra-ui/react";
export const getTopBrands = () => {
  const [isLargerThan767] = useMediaQuery("(min-width: 500px)");
  const topBrands = [
    {
      id: 1,
      brand: "Apple",
      desc: "Top seller",
      image: "/Top_Brands/apple.png",
      link: "/special_offers/brand",
      width: isLargerThan767 ? "45px" : "30px",
    },
    {
      id: 2,
      brand: "Dell",
      desc: "Top seller",
      image: "/Top_Brands/dell.png",
      link: "/special_offers/brand",
    },
    {
      id: 3,
      brand: "Lenovo",
      desc: "Best price",
      image: "/Top_Brands/lenovo.png",
      link: "/special_offers/brand",
    },
    {
      id: 4,
      brand: "Gigabyte",
      desc: "Special for you",
      image: "/Top_Brands/gigabyte.png",
      link: "/special_offers/brand",
    },
    {
      id: 5,
      brand: "Asus",
      desc: "Best price",
      image: "/Top_Brands/asus.png",
      link: "/special_offers/brand",
    },
    {
      id: 6,
      brand: "Huawei",
      desc: "Special for you",
      image: "/Top_Brands/huawei.png",
      link: "/special_offers/brand",
      width: isLargerThan767 ? "45px" : "30px",
    },
  ];
  return topBrands;
};
