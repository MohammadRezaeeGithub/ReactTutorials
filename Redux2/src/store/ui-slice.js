import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartVisible = !state.cartVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.status,
        message: action.payload.status,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
