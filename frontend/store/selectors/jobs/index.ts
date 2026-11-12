import { createStoreSelectors } from "@store/helper";
import { store } from "@store/reducers/jobs";

export const jobsSelector = createStoreSelectors(store);
