import { createSlice } from "@reduxjs/toolkit";
import { PayloadType } from "@store/helper";

export const uiStore = "uiStore";

export type IUiState = {};

export const defaultState: IUiState = {};

export const store = createSlice({
  name: uiStore,
  initialState: defaultState,
  reducers: {},
});

export const uiReducers = store.reducer;
export const uiActions = store.actions;
export type PayloadTypes = PayloadType<typeof uiActions>;
