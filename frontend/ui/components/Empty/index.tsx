import { Typography } from "@components/Typography";
import { Ghost } from "lucide-react";
import type { FC } from "react";

export type IProps = {
  title: string;
  description: string;
};

export const Empty: FC<IProps> = ({ title, description }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted">
        <Ghost className="size-7 text-muted-foreground" />
      </div>
      <Typography text="h3" medium>
        {title}
      </Typography>
      <Typography color="mutedForeground" class="max-w-sm leading-5!">
        {description}
      </Typography>
    </div>
  );
};
