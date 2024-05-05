import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    //here the action provides the extra information which we need here.
    //it contains the information we pass when we call it
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      //here the item we want to add is put as payload by reactRedux
      const newItem = action.payload;
      //check if the item already exists in the cart
      const existingItem = state.items.find((item) => item.id === newItem.id);

      //no matter if we have the existing item, we add the total quantity to the cart
      state.totalQuantity++;

      state.changed = true;

      //if it doesn't exist, we push it
      //it was not good to push an item to the existing state but reduxjs/toolkit manage all those things
      //and we can directly push the item into the state
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        //beacuse we use redux toolkit, we can directly manipulate the state.
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      //we pass the id when we call this function and redux toolkit put it as payload
      const id = action.payload;
      //finding the item in the cart (array)
      const existingItem = state.items.find((item) => item.id === id);

      //no matter what we decrease the quantity
      state.totalQuantity--;

      state.changed = true;

      //check if the quantity is equal to one, then we need to remove it completely
      if (existingItem.quantity === 1) {
        //we keep all the items. except the items that has the same id
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

//we also export the actions beacuse we need to dispatch these actions
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
