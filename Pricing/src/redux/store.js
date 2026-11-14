import { configureStore } from "@reduxjs/toolkit";
import premiumReducer from "./premiumCalSlice";

export const store = configureStore({
  reducer: {
    premium: premiumReducer,
  },
});
