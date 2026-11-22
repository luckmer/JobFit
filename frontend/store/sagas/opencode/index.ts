import { getActiveModelApi, getModelsApi, setModelApi } from "@api/opencode";
import type { NewModelPayload } from "@interfaces/opencode/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { opencodeActions, type PayloadTypes } from "@store/reducers/opencode";
import { all, call, put, takeEvery, takeLatest } from "typed-redux-saga";

export function* fetchModels() {
  const data = yield* call(getModelsApi);
  yield* put(opencodeActions.setModels(data ?? []));
}

export function* fetchActiveModel() {
  try {
    const activeModel = yield* call(getActiveModelApi);
    yield* put(opencodeActions.setActiveModel(activeModel));
  } catch (err) {
    console.error(err);
  }
}

export function* setModel(action: PayloadAction<PayloadTypes["setModel"]>) {
  try {
    const payload: NewModelPayload = {
      id: action.payload.newModel.id,
      provider_id: action.payload.activeModel.provider_id,
    };

    const activeModel = yield* call(setModelApi, payload);
    yield* put(opencodeActions.setActiveModel(activeModel));
  } catch (err) {
    yield* put(opencodeActions.setActiveModel(action.payload.activeModel));
    console.error(err);
  }
}

export function* fetchModelsSaga() {
  yield* takeLatest(opencodeActions.fetchModels, fetchModels);
}

export function* fetchActiveModelSaga() {
  yield* takeLatest(opencodeActions.fetchActiveModel, fetchActiveModel);
}

export function* setModelSaga() {
  yield* takeEvery(opencodeActions.setModel, setModel);
}

export function* opencodeRootSaga() {
  yield all([fetchModelsSaga(), fetchActiveModelSaga(), setModelSaga()]);
}
