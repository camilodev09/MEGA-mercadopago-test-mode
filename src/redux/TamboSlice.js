import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  userInfo: null,
};

export const tamboSlice = createSlice({
  name: "tambo",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.productData.find(
        (item) => item.id === action.payload.id
      );

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },

    deleteItem: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item.id !== action.payload
      );
    },

    resetCart: (state) => {
      state.productData = [];
    },

    incrementQuantity: (state, action) => {
      const prod = state.productData.find(
        (item) => item.id === action.payload.id
      );

      if (prod) {
        prod.quantity++;
      }
    },

    decrementQuantity: (state, action) => {
      const prod = state.productData.find(
        (item) => item.id === action.payload.id
      );

      if (prod.quantity === 1) {
        prod.quantity = 1;
      } else {
        prod.quantity--;
      }
    },

    //----User Connection through Firebase-----//
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },

    removeUser: (state, action) => {
      state.userInfo = null;
    },
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  decrementQuantity,
  incrementQuantity,
  addUser,
  removeUser,
} = tamboSlice.actions;
export default tamboSlice.reducer;
