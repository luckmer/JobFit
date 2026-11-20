import { Skeleton } from "@components/Skeleton";
import { Typography } from "@components/Typography";
import { cn } from "cn";
import { CheckCircle2, FileText } from "lucide-react";
import { type FC, useMemo } from "react";

export type IProps = {
  filename: string;
  title: string;
  category: string;
  isDefault: boolean;
  skills: string[];
  isSelected: boolean;
  onClick: () => void;
};

const CVSelectCard: FC<IProps> = ({
  filename,
  category,
  skills,
  isDefault,
  isSelected,
  title,
  onClick,
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
      disabled={isDefault}
      aria-pressed={isSelected}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        onClick();
      }}
      className={cn(
        "relative flex w-full flex-row items-center gap-3 rounded border px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        isDefault
          ? "pointer-events-none cursor-default border-dashed border-border/60 bg-item/40"
          : "cursor-pointer bg-item hover:bg-hover",
        !isDefault && (isSelected ? "border-primary" : "border-border"),
      )}
    >
      <FileText size={16} className="min-w-6 min-h-6 text-muted-foreground" />
      <div className="flex flex-col gap-0.5 w-full overflow-hidden">
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
        {isDefault ? (
          <Skeleton className="h-3.5 w-full" />
        ) : (
          <Typography
            text="small"
            class="w-full text-[11px]!"
            color="mutedForeground"
            truncate
          >
            {category} · {filename}
          </Typography>
        )}
        <div className="flex flex-wrap items-center gap-1 mt-1">
          {isDefault ? (
            <Skeleton className="h-[12px] w-full" />
          ) : (
            skills.slice(0, 5).map((skill) => (
              <Typography
                text="tiny"
                color="faint"
                class="text-[11px]!"
                key={skill}
              >
                {skill}
              </Typography>
            ))
          )}
          {hasMoreSkills && (
            <Typography text="tiny" color="faint" class="px-1 text-[11px]!">
              +{remainingSkills} more
            </Typography>
          )}
        </div>
      </div>
      {isSelected && !isDefault && (
        <CheckCircle2
          size={18}
          className="absolute right-2 top-2 shrink-0 text-primary"
          aria-label="Selected"
        />
      )}
    </button>
  );
};

export default CVSelectCard;
