import storage from "redux-persist/lib/storage";

export const persistFilters = {
  key: "filters",
  storage,
  whitelist: ["resumes"],
};
