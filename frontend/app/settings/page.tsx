"use client";

import type { OpencodeModelsResponse } from "@interfaces/opencode/types";
import Settings from "@pages/Settings";
import { opencodeActions } from "@store/reducers/opencode";
import { opencodeSelector } from "@store/selectors/opencode";
import { useDispatch, useSelector } from "react-redux";

const SettingsRoot = () => {
  const models = useSelector(opencodeSelector.models);
  const activeModel = useSelector(opencodeSelector.activeModel);
  const dispatch = useDispatch();

  const onSelectModel = (newModel: OpencodeModelsResponse) => {
    dispatch(opencodeActions.setModel({ newModel, activeModel }));
  };

  return (
    <Settings
      models={models}
      activeModel={activeModel}
      onSelectModel={onSelectModel}
    />
  );
};

export default SettingsRoot;
