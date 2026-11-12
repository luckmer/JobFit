"use client";

import { ExpandableButton } from "@components/Buttons/ExpandableButton";
import { FLOATING_TOOLBAR_KEYS } from "@interfaces/constants/enums";
import { Clock12, Plus, RefreshCw } from "lucide-react";
import type { FC } from "react";

export type IProps = {
  onClickToolbarAction: (key: FLOATING_TOOLBAR_KEYS) => void;
  isLoadingJobs: boolean;
};

export const FloatingToolbar: FC<IProps> = ({
  isLoadingJobs,
  onClickToolbarAction,
}) => {
  return (
    <div className="absolute bottom-10 left-1/2 z-50 w-fit -translate-x-1/2 pointer-events-auto flex items-center gap-2 rounded-xl border border-border bg-sidebar/95 p-1.5 shadow-lg backdrop-blur">
      <div className="flex items-center gap-2 rounded-lg border border-border p-0.5">
        <ExpandableButton
          onClick={() => {}}
          icon={<Clock12 size={16} />}
          label="Soon"
        />
        <ExpandableButton
          onClick={() => {}}
          icon={<Clock12 size={16} />}
          label="Soon"
        />
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-border p-0.5">
        <ExpandableButton
          onClick={() => onClickToolbarAction(FLOATING_TOOLBAR_KEYS.ADD)}
          icon={<Plus size={16} />}
          label="Add"
        />
        <ExpandableButton
          loader={isLoadingJobs}
          onClick={() => onClickToolbarAction(FLOATING_TOOLBAR_KEYS.RELOAD)}
          icon={<RefreshCw size={16} />}
          label="Refresh"
        />
      </div>
    </div>
  );
};
