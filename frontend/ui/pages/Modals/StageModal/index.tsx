"use client";
import { Button } from "@components/Buttons/Button";
import CalendarPicker from "@components/CalendarPicker";
import { Dialog } from "@components/Dialog/Dialog";
import { DialogContent } from "@components/Dialog/DialogContent";
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
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <Typography text="bodyBold">Move to {stage}</Typography>
              <Button
                variant="ghost"
                className="h-10 w-full sm:w-auto"
                onClick={handleCancel}
              >
                <X />
              </Button>
            </div>
            <Typography color="mutedForeground" text="small">
              {company}
            </Typography>
          </div>

          <div className="flex flex-col gap-2">
            <Typography text="smallBold" color="mutedForeground">
              Select date
            </Typography>
            <CalendarPicker
              onChange={setDate}
              placeholder="Pick a date"
              value={date}
            />
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="ghost"
              className="h-10 w-full sm:w-auto"
              onClick={handleCancel}
            >
              <Typography>Cancel</Typography>
            </Button>
            <Button
              variant="secondary"
              className="h-10 w-full sm:w-auto"
              onClick={handleApply}
              disabled={!date}
            >
              <Typography>Apply</Typography>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
