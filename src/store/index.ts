import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { productsApi } from "./api";
import { reducer as shoppingCardReducer } from "./shoppingCard/shoppingCardSlice";
import { reducer as productsReducer } from "./products/dummyjson.com_slice";
import { reducer as searchProductsReducer } from "./searchProducts/searchProducts.slice";
import { reducer as databaseUserReducer } from "./databaseUser/databaseUser_slice";
import { reducer as cityWeatherReducer } from "./cityWeather/cityWeather_slice";

const reducers = combineReducers({
  shoppingCard: shoppingCardReducer,
  [productsApi.reducerPath]: productsApi.reducer,
  products: productsReducer,
  searchProducts: searchProductsReducer,
  databaseUser: databaseUserReducer,
  cityWeather: cityWeatherReducer,
});

const logger = createLogger({ collapsed: true });

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
