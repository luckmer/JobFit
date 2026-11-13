"use client";
import { Button } from "@components/Buttons/Button";
import CalendarPicker from "@components/CalendarPicker";
import { Dialog } from "@components/Dialog/Dialog";
import { DialogContent } from "@components/Dialog/DialogContent";
import { DialogHeader } from "@components/Dialog/DialogHeader";
import { Typography } from "@components/Typography";
import type { ColumnId } from "@interfaces/overview/types";
import { X } from "lucide-react";
import { type FC, useState } from "react";

export interface IProps {
  onClickCancel: () => void;
  onClickApply: (date: string) => void;
  onOpenChange: (status: boolean) => void;
  open: boolean;
  stage: ColumnId;
  company: string;
}

export const StageModal: FC<IProps> = ({
  stage,
  open,
  onOpenChange,
  onClickCancel,
  onClickApply,
  company,
}) => {
  const [date, setDate] = useState<string | undefined>(undefined);

  const handleClose = () => {
    setDate(undefined);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onClickCancel();
    handleClose();
  };

  const handleApply = () => {
    if (!date) return;
    onClickApply(date);
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="border-none shadow-2xl">
        <DialogHeader>
          <section className="flex shrink-0 flex-row items-center justify-between space-y-1.5 border-b border-border px-6 py-4 text-center">
            <Typography text="bodyBold" class="mb-0!">
              Move to {stage}
            </Typography>
            <Button
              variant="ghost"
              className="h-fit sm:w-auto p-0!"
              onClick={handleCancel}
            >
              <X />
            </Button>
          </section>
        </DialogHeader>

        <div className="flex w-full flex-col gap-6  px-6 py-4">
          <div className="flex flex-col gap-2">
            <Typography color="mutedForeground" text="small">
              {company}
            </Typography>
          </div>

          <div className="flex flex-col gap-2 ">
            <Typography text="smallBold" color="mutedForeground">
              Select date
            </Typography>
            <CalendarPicker
              onChange={setDate}
              placeholder="Pick a date"
              value={date}
            />
          </div>
        </div>
        <section className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border bg-card px-6 py-4">
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" onClick={handleCancel}>
              <Typography>Cancel</Typography>
            </Button>
            <Button onClick={handleApply} disabled={!date}>
              <Typography>Save application</Typography>
            </Button>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};
