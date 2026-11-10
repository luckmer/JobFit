import { Typography } from "@components/Typography";
import { ExternalLink } from "lucide-react";
import type { FC } from "react";

export interface IProps {
  title: string;
  location: string;
  company: string;
  link: string;
  salary?: string;
  applied: string;
  rank?: string;
  id: string;
}

export const Card: FC<IProps> = ({
  title,
  location,
  link,
  company,
  rank,
  id,
  salary,
}) => {
  return (
    <div className="group cursor-grab rounded-md border border-border bg-card px-3 py-2.5 text-left transition hover:border-muted-foreground/40 active:cursor-grabbing">
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1 text-[14px] font-semibold leading-snug">
          <Typography text="body">{title}</Typography>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open job posting"
          className="mt-0.5 shrink-0 text-faint hover:text-foreground"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
      <div className="mt-1 truncate text-xs text-muted-foreground">
        {company}
        <span className="text-s-teal"> · {location}</span>
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-[11px]">
        <Typography text="small" color="faint">
          #{id}
        </Typography>
        {rank && (
          <>
            <span className="h-1 w-1 rounded-full bg-s-blue" />
            <Typography text="small" color="faint">
              {rank}
            </Typography>
          </>
        )}
        <div className="ml-auto flex">
          <Typography text="small" color="faint">
            4d
          </Typography>
        </div>
      </div>
      {salary && (
        <div className="tabular mt-1.5">
          <Typography text="small">{salary}</Typography>
        </div>
      )}
    </div>
  );
};
