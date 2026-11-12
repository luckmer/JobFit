import { Button } from "@components/Buttons/Button";
import { Dialog } from "@components/Dialog/Dialog";
import { DialogContent } from "@components/Dialog/DialogContent";
import { Typography } from "@components/Typography";
import { X } from "lucide-react";
import type { FC } from "react";

export type IProps = {
  open: boolean;
  onOpenChange: (status: boolean) => void;
};

export const NewApplicationModal: FC<IProps> = ({ onOpenChange, open }) => {
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="border-none shadow-2xl">
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <Typography text="bodyBold">soon</Typography>
              <Button
                variant="ghost"
                className="h-10 w-full sm:w-auto"
                onClick={() => {}}
              >
                <X />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
