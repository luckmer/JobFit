import { createSlice } from "@reduxjs/toolkit";

export const uiStore = "uiStore";

export type IUiState = {};

export const defaultState: IUiState = {};

export const store = createSlice({
  name: uiStore,
  initialState: defaultState,
  reducers: {},
});

export const reducers = store.reducer;
export const actions = store.actions;
