import { Skeleton } from "@components/Skeleton";
import { Typography } from "@components/Typography";
import { format, parseISO } from "date-fns";
import { FileText } from "lucide-react";
import { type FC, useMemo } from "react";

export type IProps = {
  filename: string;
  title: string;
  category: string;
  updated_at: string;
  isDefault: boolean;
  created_at: string;
  skills: string[];
  onClick: () => void;
};

export const CvCard: FC<IProps> = ({
  onClick,
  filename,
  title,
  category,
  created_at,
  updated_at,
  skills,
  isDefault,
}) => {
  const hasMoreSkills = useMemo(() => {
    return skills.length > 5;
  }, [skills]);

  const remainingSkills = useMemo(() => {
    return skills.slice(5).length;
  }, [skills]);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full min-w-0 cursor-pointer flex-col rounded-lg border border-border bg-card text-sm shadow-sm transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/15 text-primary">
          <FileText size={16} />
        </div>
      </div>
      <div className="flex w-full min-w-0 flex-col items-start px-4 pb-4">
        {isDefault ? (
          <Skeleton className="h-[20px] w-full" />
        ) : (
          <Typography
            class="block w-full min-w-0 text-[14px]! leading-[20px]!"
            truncate
            left
          >
            {title}
          </Typography>
        )}
        <div className="mt-1 w-full min-w-0 overflow-hidden">
          {isDefault ? (
            <Skeleton className="h-[11px] w-full" />
          ) : (
            <Typography
              left
              text="small"
              class="block w-full text-[11px]!"
              color="faint"
              truncate
            >
              {filename}
            </Typography>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1 px-4 pb-4">
        {isDefault ? (
          <Skeleton className="h-5.5 w-full" />
        ) : (
          skills.slice(0, 5).map((skill) => (
            <div
              key={skill}
              className="rounded border border-border px-1.5 py-0.5 text-[10px] font-normal text-muted-foreground"
            >
              <Typography text="tiny">{skill}</Typography>
            </div>
          ))
        )}
        {hasMoreSkills && (
          <Typography text="tiny" color="faint" class="px-1 text-[11px]!">
            +{remainingSkills} more
          </Typography>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-3">
        {isDefault ? (
          <Skeleton className="h-[11px] w-[20%]" />
        ) : (
          <Typography text="small" color="mutedForeground">
            {category}
          </Typography>
        )}
        {isDefault ? (
          <Skeleton className="h-[11px] w-[20%]" />
        ) : (
          <Typography text="small" color="faint" class="text-[11px]!">
            No score
          </Typography>
        )}
      </div>
      <div className="flex flex-wrap justify-between gap-2 px-4 pb-3 ">
        {isDefault ? (
          <Skeleton className="h-[11px] w-[20%]" />
        ) : (
          <Typography text="tiny" color="faint" class="text-[11px]!">
            Updated {format(parseISO(updated_at), "yyyy-MM-dd")}
          </Typography>
        )}
        {isDefault ? (
          <Skeleton className="h-[11px] w-[20%]" />
        ) : (
          <Typography text="tiny" color="faint" class="text-[11px]!">
            Created {format(parseISO(created_at), "yyyy-MM-dd")}
          </Typography>
        )}
      </div>
    </button>
  );
};
