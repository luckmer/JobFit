"use client";
import { Button } from "@components/Buttons/Button";
import { Calendar } from "@components/DayPicker/Calendar";
import Popover from "@components/Popover/Popover";
import PopoverContent from "@components/Popover/PopoverContent";
import PopoverTrigger from "@components/Popover/PopoverTrigger";
import { cn } from "cn";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type FC, useState } from "react";

export interface IProps {
  value?: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export const CalendarPicker: FC<IProps> = ({
  value,
  placeholder,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const date = value ? parseISO(value) : undefined;

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange(format(date, "yyyy-MM-dd"));
    } else {
      onChange("");
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal border-border hover:border-muted-foreground/40 bg-input w-full h-fit py-2",
              !date && "text-muted-foreground",
            )}
          />
        }
      >
        <div className="flex flex-row justify-center gap-2">
          <CalendarIcon className="size-3.5 mt-0.5" />
          <span className="truncate leading-none pt-px select-none ">
            {date ? format(date, "PPP") : placeholder}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarPicker;
