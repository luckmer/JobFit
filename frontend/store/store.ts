import { configureStore } from "@reduxjs/toolkit";
import { batchDispatchMiddleware } from "redux-batched-actions";
import createSagaMiddleware from "redux-saga";
import { index } from "./reducers";
import saga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const makeStore = () => {
  const store = configureStore({
    reducer: index,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: false,
      }).concat([sagaMiddleware, batchDispatchMiddleware]),
  });

  sagaMiddleware.run(saga);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;

export default makeStore;
