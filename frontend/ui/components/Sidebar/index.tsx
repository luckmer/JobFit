import { Typography } from "@components/Typography";
import { cn } from "cn";
import {
  Bot,
  ChartColumnDecreasing,
  FileText,
  LayoutDashboard,
  ScanSearch,
  Settings,
  Sparkles,
  SquareKanban,
} from "lucide-react";
import type { FC } from "react";

const data = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Applications", icon: SquareKanban },
  { name: "My resumes", icon: FileText },
  { name: "AI Resume Matcher", icon: ScanSearch },
  { name: "Career Assistant", icon: Bot },
  { name: "Statistics", icon: ChartColumnDecreasing },
  { name: "Settings", icon: Settings },
];

export interface IProps {
  activeRoot: string;
}

export const Sidebar: FC<IProps> = ({ activeRoot }) => {
  return (
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-border bg-sidebar md:flex">
      <section className="flex h-14 items-center gap-2 px-4">
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
            <Sparkles className="size-3.5 text-primary-foreground" />
          </div>
          <Typography>JobFit</Typography>
        </div>
      </section>
      <section className="flex-1 space-y-0.5 px-2 py-2">
        {data.map(({ name, icon: Icon }) => {
          const isActive = name === activeRoot;
          return (
            <div
              key={name}
              className={cn(
                "flex items-center gap-2.5 rounded px-2.5 py-2 transition-colors cursor-pointer",
                isActive ? "bg-active" : "hover:bg-hover",
              )}
            >
              <Icon
                className={cn(
                  "size-4",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              />
              <Typography color={isActive ? "primary" : "mutedForeground"}>
                {name}
              </Typography>
            </div>
          );
        })}
      </section>
    </aside>
  );
};
