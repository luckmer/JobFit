import { Typography } from "@components/Typography";
import type { FC, ReactNode } from "react";

export type IProps = {
  children: ReactNode;
  title: string;
};

const SettingsCard: FC<IProps> = ({ children, title }) => {
  return (
    <div className="py-[17px] px-[18px] h-fit border border-border bg-card rounded-[6px] max-w-[720px] w-full">
      <div className="flex mb-[15px]">
        <Typography text="tiny" class="text-[11px]!" bold>
          {title}
        </Typography>
      </div>
      {children}
    </div>
  );
};

export default SettingsCard;
