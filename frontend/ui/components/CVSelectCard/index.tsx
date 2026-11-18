import { Typography } from "@components/Typography";
import { FileText } from "lucide-react";
import { type FC, useMemo } from "react";

export type IProps = {
  filename: string;
  title: string;
  category: string;
  skills: string[];
  onClick: () => void;
};

const CVSelectCard: FC<IProps> = ({
  filename,
  category,
  skills,
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
      onClick={onClick}
      className="flex w-full cursor-pointer flex-row items-center gap-3 rounded border border-border bg-item px-3 py-2.5 text-left transition-colors hover:bg-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
      <FileText size={16} className="min-w-6 min-h-6 text-muted-foreground" />
      <div className="flex flex-col gap-0.5">
        <Typography class="w-full text-[14px]! leading-[20px]!" truncate left>
          {title}
        </Typography>
        <Typography
          text="small"
          class="w-full text-[11px]!"
          color="mutedForeground"
          truncate
        >
          {category} · {filename}
        </Typography>
        <div className="flex flex-wrap items-center gap-1 mt-1">
          {skills.slice(0, 5).map((skill) => (
            <Typography
              text="tiny"
              color="faint"
              class="text-[11px]!"
              key={skill}
            >
              {skill}
            </Typography>
          ))}
          {hasMoreSkills && (
            <Typography text="tiny" color="faint" class="px-1 text-[11px]!">
              +{remainingSkills} more
            </Typography>
          )}
        </div>
      </div>
    </button>
  );
};

export default CVSelectCard;
