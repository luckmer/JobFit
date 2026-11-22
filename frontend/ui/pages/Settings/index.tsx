"use client";

import SettingsCard from "@components/Cards/SettingsCard";
import { Dropdown } from "@components/Dropdown";
import { Typography } from "@components/Typography";
import type {
  OpencodeActiveModelResponse,
  OpencodeModelsResponse,
} from "@interfaces/opencode/types";
import { type FC, useCallback, useMemo } from "react";

export type IProps = {
  models: OpencodeModelsResponse[];
  activeModel: OpencodeActiveModelResponse;
  onSelectModel: (model: OpencodeModelsResponse) => void;
};

const Setting: FC<IProps> = ({ models, activeModel, onSelectModel }) => {
  const modelsName = useMemo(() => models.map((model) => model.name), [models]);

  const modelNameToModels = useMemo(
    () =>
      models.reduce<Record<string, OpencodeModelsResponse>>((acc, model) => {
        acc[model.name] = model;
        return acc;
      }, {}),
    [models],
  );

  const modelIdToModels = useMemo(
    () =>
      models.reduce<Record<string, OpencodeModelsResponse>>((acc, model) => {
        acc[model.id] = model;
        return acc;
      }, {}),
    [models],
  );

  const model = useMemo(
    () => modelIdToModels[activeModel.model_id],
    [activeModel.model_id, modelIdToModels],
  );

  const handleSelectModel = useCallback(
    (option: string) => {
      const data = modelNameToModels[option];
      if (!data) return;
      onSelectModel(data);
    },
    [modelNameToModels, onSelectModel],
  );

  return (
    <main className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <section className="flex shrink-0 flex-wrap items-end justify-between gap-4 border-b border-border px-6 py-5">
        <div>
          <Typography text="h3" medium class="leading-6.75!">
            Settings
          </Typography>
        </div>
      </section>
      <section className="min-h-0 flex-1 overflow-y-auto p-6 justify-center flex">
        <SettingsCard title="Models">
          <div className="flex flex-row gap-4">
            <div className="w-full flex">
              <Dropdown
                data={modelsName}
                placeholder="Select model"
                onSelect={handleSelectModel}
                activeElement={model?.name}
              />
            </div>
            {/* <div className="w-full flex">
              <Dropdown
                data={model?.reasoning_efforts ?? []}
                placeholder="Select model"
                activeElement={undefined}
              />
            </div> */}
          </div>
        </SettingsCard>
      </section>
    </main>
  );
};

export default Setting;
