import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions as shoppingCardActions } from "../store/shoppingCard/shoppingCardSlice";
import { actions as productsActions } from "../store/products/dummyjson.com_slice";
import { actions as searchProductsActions } from "../store/searchProducts/searchProducts.slice";
import { actions as databaseUserActions } from "../store/databaseUser/databaseUser_slice";
import { actions as cityWeatherActions } from "../store/cityWeather/cityWeather_slice";
import { bindActionCreators } from "@reduxjs/toolkit";

const rootActions = {
  ...shoppingCardActions,
  ...productsActions,
  ...searchProductsActions,
  ...databaseUserActions,
  ...cityWeatherActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch);
  }, [dispatch]);
};
