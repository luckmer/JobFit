import type {
  OpencodeActiveModelResponse,
  OpencodeModelsResponse,
} from "@interfaces/opencode/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PayloadType } from "@store/helper";

export const opencodeStore = "llmStore";

export type OpencodeState = {
  models: OpencodeModelsResponse[];
  activeModel: OpencodeActiveModelResponse;
};

export const defaultActiveModel: OpencodeActiveModelResponse = {
  provider_id: "opencode",
  model_id: "deepseek-v4.1-flash-free",
};

export const defaultState: OpencodeState = {
  models: [],
  activeModel: defaultActiveModel,
};

export const store = createSlice({
  name: opencodeStore,
  initialState: defaultState,
  reducers: {
    setModels(state, action: PayloadAction<OpencodeModelsResponse[]>) {
      state.models = action.payload;
      return state;
    },
    setModel(
      state,
      _: PayloadAction<{
        activeModel: OpencodeActiveModelResponse;
        newModel: OpencodeModelsResponse;
      }>,
    ) {
      return state;
    },
    setActiveModel(state, action: PayloadAction<OpencodeActiveModelResponse>) {
      state.activeModel = action.payload;
      return state;
    },

    fetchModels(state) {
      return state;
    },
    fetchActiveModel(state) {
      return state;
    },
  },
});

export const opencodeReducers = store.reducer;
export const opencodeActions = store.actions;
export type PayloadTypes = PayloadType<typeof opencodeActions>;
