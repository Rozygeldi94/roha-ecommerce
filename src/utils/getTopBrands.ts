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
      brand: "Samsung",
      desc: "Top seller",
      image: "/Top_Brands/samsung.png",
      link: "/special_offers/brand",
    },
    {
      id: 3,
      brand: "Oppo",
      desc: "Best price",
      image: "/Top_Brands/oppo.png",
      link: "/special_offers/brand",
    },
    {
      id: 4,
      brand: "Infinix",
      desc: "Special for you",
      image: "/Top_Brands/infinix.png",
      link: "/special_offers/brand",
    },
    {
      id: 5,
      brand: "L'Oreal Paris",
      desc: "Best price",
      image: "/Top_Brands/loreal_paris.png",
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
