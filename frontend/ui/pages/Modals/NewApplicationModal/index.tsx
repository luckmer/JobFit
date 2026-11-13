import { Button } from "@components/Buttons/Button";
import CalendarPicker from "@components/CalendarPicker";
import { Dialog } from "@components/Dialog/Dialog";
import { DialogContent } from "@components/Dialog/DialogContent";
import { DialogHeader } from "@components/Dialog/DialogHeader";
import { Dropdown } from "@components/Dropdown";
import { Input } from "@components/Input";
import { Typography } from "@components/Typography";
import type { ColumnId } from "@interfaces/overview/types";
import { COLUMN_IDS } from "@static/constatns";
import { cn } from "cn";
import { X } from "lucide-react";
import { type FC, useState } from "react";

export type IProps = {
  open: boolean;
  onOpenChange: (status: boolean) => void;
};

export const NewApplicationModal: FC<IProps> = ({ onOpenChange, open }) => {
  const [selectedStage, setSelectedStage] = useState<ColumnId>("new");

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="flex max-h-[85vh] flex-col border-none p-0! shadow-2xl">
        <DialogHeader>
          <section className="flex shrink-0 flex-row items-center justify-between space-y-1.5 border-b border-border px-6 py-4 text-center ">
            <Typography text="bodyBold" class="mb-0! sm:text-left!">
              New application
            </Typography>
            <Button
              variant="ghost"
              className=" h-fit p-0!"
              onClick={handleClose}
            >
              <X />
            </Button>
          </section>
        </DialogHeader>
        <section className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Typography text="tiny" uppercase color="mutedForeground">
                company
              </Typography>
              <Input placeholder="Google" />
            </div>
            <div className="space-y-1">
              <Typography text="tiny" uppercase color="mutedForeground">
                job title
              </Typography>
              <Input placeholder="Senior Frontend Engineer" />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Typography text="tiny" uppercase color="mutedForeground">
                Posting url
              </Typography>
              <Input placeholder="https://..." />
            </div>
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Typography text="tiny" uppercase color="mutedForeground">
              Job description or posting URL
            </Typography>
            <textarea
              placeholder="Paste the full job description..."
              className={cn(
                "min-h-20 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
              )}
            />
          </div>
          <div className="grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Typography text="tiny" uppercase color="mutedForeground">
                Salary range
              </Typography>
              <Input placeholder="12 000 - 16 000 net B2B" />
            </div>
            <div className="space-y-1">
              <Typography text="tiny" uppercase color="mutedForeground">
                Location / work arrangement
              </Typography>
              <Input placeholder="Warsaw - hybrid, 2 remote days/week" />
            </div>
            <div className="space-y-1">
              <Typography text="tiny" uppercase color="mutedForeground">
                Employment type
              </Typography>
              <Input placeholder="Full time" />
            </div>
            <div className="space-y-1">
              <Typography text="tiny" uppercase color="mutedForeground">
                Application date
              </Typography>
              <div className="flex h-9.25">
                <CalendarPicker
                  onChange={() => {}}
                  placeholder="Select date"
                  value=""
                />
              </div>
            </div>
            <div className="space-y-1 ">
              <Typography text="tiny" uppercase color="mutedForeground">
                Follow-up date
              </Typography>
              <div className="flex h-9.25">
                <CalendarPicker
                  onChange={() => {}}
                  placeholder="Select date"
                  value=""
                />
              </div>
            </div>
            <div className="space-y-1 ">
              <Typography text="tiny" uppercase color="mutedForeground">
                Follow-up date
              </Typography>
              <div className="flex h-9.25">
                <Dropdown
                  placeholder="Select stage"
                  data={COLUMN_IDS}
                  activeElement={selectedStage}
                  onSelect={setSelectedStage}
                />
              </div>
            </div>
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Typography text="tiny" uppercase color="mutedForeground">
              Notes
            </Typography>
            <textarea
              placeholder="Where you found the role, conversations, salary expectations..."
              className={cn(
                "min-h-20 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
              )}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
            <div className="flex flex-row gap-2 items-center">
              <Typography text="small" uppercase color="faint">
                resume
              </Typography>
              <Typography color="mutedForeground">· 0 available</Typography>
            </div>
            <Button variant="outline" disabled>
              <Typography text="small">Analyze & suggest resume</Typography>
            </Button>
          </div>
        </section>
        <section className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border bg-card px-6 py-4">
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button>Save application</Button>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};
