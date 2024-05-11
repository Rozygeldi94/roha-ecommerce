import { useActions } from "@/hooks/useActions";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { ISidebarFilter } from "@/store/products/dummyjson.com_slice";
import { IProduct } from "@/types/product.types";
import { getCategoriesAndBrands } from "@/utils/getCategoriesAndBrands";
import {
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { SidebarAccordion } from "./SidebarAccordion";

interface ISidebarProps {
  products: IProduct[];
}

export const Sidebar: FC<ISidebarProps> = ({ products }) => {
  const { setCategoryValue, setBrandValue, setPriceValue, setSidebarActive } =
    useActions();
  const sidebarFilterValues = useTypedSelector(
    (state) => state.products.sidebarFilter
  );
  const [storageValue, setValue] = useSessionStorage(
    "sidebarSelectedValues",
    []
  );
  const { categories, brands, prices } = getCategoriesAndBrands(
    storageValue as ISidebarFilter
  );

  useEffect(() => {
    if (
      !sidebarFilterValues?.brand?.length ||
      !sidebarFilterValues?.category?.length
    ) {
      setCategoryValue(storageValue?.category);
      setBrandValue(storageValue?.brand);
    }
  }, []);

  const checkedCategories = categories.filter((item) => item.isChecked);
  const checkedBrands = brands.filter((item) => item.isChecked);

  return (
    <>
      <SidebarAccordion groupTitle="Category">
        <CheckboxGroup
          defaultValue={checkedCategories.map((item) => item.category)}
          onChange={(selectedCategoryValue) => {
            setCategoryValue(selectedCategoryValue);
            setValue({
              ...sidebarFilterValues,
              category: selectedCategoryValue,
            });
            setSidebarActive(true);
            const currentPagenationPage = document.querySelectorAll(
              ".pagenation-container li a"
            ) as NodeListOf<HTMLAnchorElement>;

            currentPagenationPage[1].click();
          }}
        >
          <VStack direction="column" align="flex-start">
            {categories?.map((item, index) => (
              <Checkbox value={item?.category} key={index}>
                {item?.category}
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>
      </SidebarAccordion>

      <SidebarAccordion groupTitle="Brand">
        <CheckboxGroup
          defaultValue={
            checkedBrands.length
              ? checkedBrands.map((item) => item.brand)
              : (storageValue as ISidebarFilter).brand.map((item) => item)
          }
          onChange={(selectedBrandValue) => {
            setBrandValue(selectedBrandValue);
            setValue({
              ...sidebarFilterValues,
              brand: selectedBrandValue,
            });
            setSidebarActive(true);

            const currentPagenationPage = document.querySelectorAll(
              ".pagenation-container li a"
            ) as NodeListOf<HTMLAnchorElement>;
            currentPagenationPage[1].click();
          }}
        >
          <VStack direction="column" align="flex-start">
            {brands?.map((item, index) => (
              <Checkbox value={item?.brand} key={index}>
                {item.brand}
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>
      </SidebarAccordion>
      <SidebarAccordion groupTitle="Price">
        <RadioGroup
          onChange={(selectedPriceValue) => {
            console.log(selectedPriceValue);

            setPriceValue(selectedPriceValue);
            setSidebarActive(true);
            const currentPagenationPage = document.querySelectorAll(
              ".pagenation-container li a"
            ) as NodeListOf<HTMLAnchorElement>;
            currentPagenationPage[1].click();
          }}
          value={sidebarFilterValues?.price}
        >
          <VStack direction="column" align="flex-start">
            {prices?.map((item, index) => (
              <Radio value={item} key={index}>
                <Text fontSize="0.9rem">{item}</Text>
              </Radio>
            ))}
          </VStack>
        </RadioGroup>
      </SidebarAccordion>
    </>
  );
};
