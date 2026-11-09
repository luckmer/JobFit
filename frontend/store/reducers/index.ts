import { combineReducers } from "@reduxjs/toolkit";
import { reducers as uiReducers, uiStore } from "./ui";

export const index = combineReducers({
  [uiStore]: uiReducers,
});
