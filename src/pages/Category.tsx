/* import { Products } from "@/components/Products";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {
  useGetAllProductsQuery,
  useLazyGetProductsByTitleQuery,
  useLazyGetProductsOfCategoryQuery,
} from "@/store/api";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function Category() {
  const { category, title } = useParams();

  const { setCategoryValue, setBrandValue, setPriceValue, setAA } =
    useActions();
  useEffect(() => {
    setCategoryValue(title);
    setAA("sidebarFilter");
  }, [title]);
  console.log(title);

  const { data } = useGetAllProductsQuery("");
  const [trigger, result] = useLazyGetProductsByTitleQuery();
  const searchInputValue = useTypedSelector(
    (state) => state.searchProducts.value
  );
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    trigger(searchInputValue);
    //  setSearchParams(searchInputValue && { q: searchInputValue });
  }, [searchInputValue]);
  return (
    <Products
      products={data?.products}
      result={result}
      searchInputValue={searchInputValue}
    />
  );
}
 */
