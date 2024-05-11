import { Products } from "./Products";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useActions } from "@/hooks/useActions";
import { useSessionStorage } from "@/hooks/useSessionStorage";

export const SpecialOffers = () => {
  const { setSidebarActive } = useActions();
  const productTitle = useParams();
  const { setBrandValue } = useActions();
  const [storedValue, setStorageValue] = useSessionStorage(
    "sidebarSelectedValues",
    []
  );
  const sidebarFilterValues = useTypedSelector(
    (state) => state.products.sidebarFilter
  );

  useEffect(() => {
    if (productTitle.title) {
      setBrandValue([productTitle?.titles]);
      setStorageValue({
        ...sidebarFilterValues,
        brand: [productTitle.title],
      });
      setSidebarActive(true);
    }
  }, []);

  return <Products />;
};
