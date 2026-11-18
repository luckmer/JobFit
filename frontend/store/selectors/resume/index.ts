import { createStoreSelectors } from "@store/helper";
import { store } from "@store/reducers/resume";

export const resumeSelector = createStoreSelectors(store);
