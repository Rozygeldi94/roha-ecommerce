import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct, IShoppingCartSlice } from "@/types/product.types";

interface IInitialState {
  shoppingCartProducts: IShoppingCartSlice[];
  cardTotalAmount: number;
  cardTotalQuantity: number;
}

const initialState: IInitialState = {
  shoppingCartProducts: [],
  cardTotalAmount: 0,
  cardTotalQuantity: 0,
};

export const shoppingCardSlice = createSlice({
  name: "shoppingCard",
  initialState,
  reducers: {
    saveImportedDataToStore: (state, { payload: productFromDB }) => {
      state.shoppingCartProducts = productFromDB;
    },
    clearStore: (state) => {
      return {
        shoppingCartProducts: [],
        cardTotalAmount: 0,
        cardTotalQuantity: 0,
      };
    },
    addToStore: (
      state,
      { payload: product }: PayloadAction<IProduct | null>
    ) => {
      const productIndex = state.shoppingCartProducts.findIndex(
        (item) => item.id === product?.id
      );
      if (state?.shoppingCartProducts[productIndex]?.quantity >= 0) {
        if (state.shoppingCartProducts[productIndex].quantity === 20) {
          state.shoppingCartProducts[productIndex].quantity = 20;
        } else {
          state.shoppingCartProducts[productIndex].quantity += 1;
        }
      } else {
        const copyCardItems: unknown = [
          ...state.shoppingCartProducts,
          { ...product, quantity: 1, isCheckboxActive: true },
        ];
        state.shoppingCartProducts = copyCardItems as IShoppingCartSlice[];
      }
    },
    decrementProductCount: (
      state,
      { payload: product }: PayloadAction<IProduct>
    ) => {
      const productIndex = state.shoppingCartProducts.findIndex(
        (item) => item.id === product.id
      );
      const copyCartDecrement = [...state.shoppingCartProducts];
      if (state.shoppingCartProducts[productIndex].quantity === 1) {
        copyCartDecrement[productIndex].quantity = 1;
      } else {
        copyCartDecrement[productIndex].quantity -= 1;
      }
    },
    changeCheckboxStatus: (state, { payload: product }) => {
      const productIndex = state.shoppingCartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (state.shoppingCartProducts[productIndex].isCheckboxActive === true) {
        state.shoppingCartProducts[productIndex].isCheckboxActive = false;
      } else {
        state.shoppingCartProducts[productIndex].isCheckboxActive = true;
      }
    },

    removeProduct: (state, { payload: productId }) => {
      state.shoppingCartProducts = state.shoppingCartProducts.filter(
        (item) => item.id !== productId
      );
    },

    getTotal: (state) => {
      const activeProduct = state.shoppingCartProducts.filter(
        (item) => item?.isCheckboxActive === true
      );
      let { total, quantity } = activeProduct.reduce(
        (totalAmount, item) => {
          const { price, quantity } = item;
          let itemTotalPrice = price * quantity;
          totalAmount.total += itemTotalPrice;
          totalAmount.quantity += quantity;
          return totalAmount;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cardTotalAmount = total;
      state.cardTotalQuantity = quantity;
    },
  },
});
export const { actions, reducer } = shoppingCardSlice;
