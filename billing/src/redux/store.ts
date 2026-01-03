import { combineReducers } from "redux";
import navigationReducer from "./navigationReducer.ts";
import policyReducer from "./policyReducre.ts";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  navigationReducer,
  policyReducer,
});

const store = configureStore({
  reducer: rootReducer,
  
});

export default store;