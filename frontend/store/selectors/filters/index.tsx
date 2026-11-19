import { createStoreSelectors } from "@store/helper";
import { store } from "@store/reducers/filters";

export const filtersSelector = createStoreSelectors(store);
