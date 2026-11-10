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
import Link from "next/link";
import type { FC } from "react";

const data = [
  { href: "/", name: "Overview", icon: LayoutDashboard },
  { href: "/applications", name: "Applications", icon: SquareKanban },
  { href: "/resumes", name: "My resumes", icon: FileText },
  { href: "/matcher", name: "AI Resume Matcher", icon: ScanSearch },
  { href: "/assistant", name: "Career Assistant", icon: Bot },
  { href: "/statistics", name: "Statistics", icon: ChartColumnDecreasing },
  { href: "/settings", name: "Settings", icon: Settings },
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
      <nav className="flex-1 space-y-0.5 px-2 py-2">
        {data.map(({ href, name, icon: Icon }) => {
          const isActive = href === activeRoot;
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded px-2.5 py-2 transition-colors",
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
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
