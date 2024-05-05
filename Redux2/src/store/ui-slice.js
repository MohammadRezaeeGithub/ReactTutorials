import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartVisible: false, notification: null },
  reducers: {
    toggle(state) {
      //we can mutate the state here because using reduxjs/toolkit
      //makes sure that it will transform to imutable code using third party plugins libraries
      state.cartVisible = !state.cartVisible;
    },
    //we show the notification using the react redux now with adding a state for that in the store.
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.status,
        message: action.payload.status,
      };
    },
  },
});

//we also export the actions beacuse we need to dispatch these actions
export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
