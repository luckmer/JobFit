"use client";
import { Typography } from "@components/Typography";
import { cn } from "cn";
import { ArrowDownWideNarrow } from "lucide-react";
import type { FC } from "react";

const DOT_COLORS = {
  new: "bg-faint",
  ranked: "bg-s-blue",
  applied: "bg-primary",
  screening: "bg-s-amber",
  techInterview: "bg-s-purple",
  finalRound: "bg-s-purple",
  offer: "bg-s-teal",
  rejected: "bg-s-red",
  skipped: "bg-faint",
} as const;

export type IProps = {
  title: string;
  total: string;
  color: keyof typeof DOT_COLORS;
};

export const ColumnHeader: FC<IProps> = ({ title, total, color }) => {
  return (
    <div className="flex h-11 shrink-0 items-center gap-2 px-3 border-b border-b-active">
      <span className={cn(DOT_COLORS[color], "h-1.5 w-1.5 rounded-full")} />
      <Typography
        uppercase
        text="tiny"
        class="font-semibold tracking-[0.14em]! text-[11px]!"
      >
        {title}
      </Typography>
      <Typography
        uppercase
        text="tiny"
        color="mutedForeground"
        class="font-semibold text-[11px]!"
      >
        {total}
      </Typography>
      <ArrowDownWideNarrow
        size={14}
        className="ml-auto text-faint transition-colors hover:text-foreground"
      />
    </div>
  );
};
