import { createStoreSelectors } from "@store/helper";
import { store } from "@store/reducers/opencode";

export const opencodeSelector = createStoreSelectors(store);
