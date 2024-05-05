import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";

//in this file we manage the store of the application
//and manage all the slices we already created

const store = configureStore({
  //the reducer can be a single reducer as well as a map of reducers when we have multiple slices
  //here the name up to us. but the value must be the reducer of the slice we created
  reducer: { ui: uiSlice, cart: cartSlice },
});

//we need to provide the store to application, so it can use it in the indes.js file in the root
export default store;
