import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "@/types/product.types";

export const fetchProducts = createAsyncThunk("users/fetchById", async () => {
  const productsURL = "https://dummyjson.com/products";
  const response = await fetch(productsURL);
  return response?.json();
});

export interface ISidebarFilter {
  category: (string | number)[];
  brand: (string | number)[];
  price: string;
}

interface IProductState {
  products: IProduct[];
  sidebarFilter: ISidebarFilter;
  isSidebarActive: boolean;
  loading: boolean;
  error: string;
}

const initialState: IProductState = {
  products: [],
  sidebarFilter: { category: [], brand: [], price: "" },
  isSidebarActive: false,
  loading: false,
  error: "",
};

const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    setCategoryValue: (state, { payload }) => {
      if (payload) {
        state.sidebarFilter = {
          ...state.sidebarFilter,
          category: payload,
        };
      }
    },
    setBrandValue: (state, { payload }) => {
      if (payload) {
        state.sidebarFilter = {
          ...state.sidebarFilter,
          brand: payload,
        };
      }
    },
    setPriceValue: (state, { payload }) => {
      if (payload) {
        state.sidebarFilter = {
          ...state.sidebarFilter,
          price: payload,
        };
      }
    },
    setSidebarActive: (state, { payload }) => {
      state.isSidebarActive = payload;
    },
    resetSidebarValues: (state) => {
      state.sidebarFilter = {
        ...state.sidebarFilter,
        category: [],
        brand: [],
        price: "",
      };
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.products = [];
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, { payload }: PayloadAction<IProduct>) => {
          state.products.push(payload);
          state.loading = false;
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.products = [];
        state.loading = false;
      });
  },
});
export const { actions, reducer } = productsSlice;
