"use client";
import { setupListeners } from "@reduxjs/toolkit/query";
import { jobActions } from "@store/reducers/jobs";
import makeStore, { type AppStore } from "@store/store";
import type { FC, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Provider, useDispatch } from "react-redux";

interface IProps {
  readonly children: ReactNode;
}

export const StoreProvider: FC<IProps> = ({ children }) => {
  const storeRef = useRef<AppStore | null>(null);
  const initialStateRef = useRef<ReturnType<AppStore["getState"]> | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    initialStateRef.current = storeRef.current.getState();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      return setupListeners(storeRef.current.dispatch);
    }
  }, []);

  return (
    <Provider
      store={storeRef.current}
      serverState={initialStateRef.current ?? undefined}
    >
      <RootStoreProvider>{children}</RootStoreProvider>
    </Provider>
  );
};
export const RootStoreProvider: FC<IProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(jobActions.fetchJobs());
  }, [dispatch]);

  return children;
};
