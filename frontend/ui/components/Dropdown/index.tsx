import { Button } from "@components/Buttons/Button";
import Popover from "@components/Popover/Popover";
import PopoverContent from "@components/Popover/PopoverContent";
import PopoverTrigger from "@components/Popover/PopoverTrigger";
import { cn } from "cn";
import { Check, Dot } from "lucide-react";
import { useState } from "react";

export interface DropdownProps<T extends string | number> {
  data: readonly T[] | T[];
  activeElement?: T;
  placeholder: string;
  onSelect?: (id: T) => void;
}

export const Dropdown = <T extends string | number>({
  data,
  activeElement,
  placeholder,
  onSelect,
}: DropdownProps<T>) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (item: T) => {
    onSelect?.(item);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            disabled={!data.length}
            variant="outline"
            className={cn(
              "justify-start text-left font-normal border-border hover:border-muted-foreground/40 bg-input w-full h-9 py-2",
              !activeElement && "text-muted-foreground",
            )}
          />
        }
      >
        <div className="flex flex-row justify-center gap-2">
          <Dot className="size-3.5 mt-0.5" />
          <span className="truncate leading-none pt-px select-none">
            {activeElement !== undefined ? activeElement : placeholder}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        anchorWidth
        className="max-h-50 overflow-y-auto"
      >
        <ul className="flex flex-col">
          {data.map((item) => {
            const isSelected = activeElement === item;
            return (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={cn(
                    "w-full cursor-pointer rounded-md px-2 py-1.5 text-left text-sm hover:bg-white/5 flex flex-row items-center justify-between",
                    isSelected && "bg-white/10",
                  )}
                >
                  {item}
                  {isSelected && <Check className="size-4" />}
                </button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
