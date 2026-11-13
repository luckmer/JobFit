"use client";
import { Typography } from "@components/Typography";
import { AnimatePresence, motion } from "framer-motion";
import { type FC, useRef, useState } from "react";

interface IProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  loader?: boolean;
}

export const ExpandableButton: FC<IProps> = ({
  icon,
  label,
  onClick,
  loader = false,
}) => {
  const [open, setOpen] = useState(false);
  const justClicked = useRef(false);

  return (
    <motion.button
      layout
      onClick={() => {
        if (loader) return;
        justClicked.current = true;
        setOpen(false);
        onClick();
      }}
      aria-disabled={loader}
      aria-busy={loader}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onFocus={(e) => {
        if (justClicked.current) {
          justClicked.current = false;
          return;
        }
        if (e.currentTarget.matches(":focus-visible")) setOpen(true);
      }}
      onBlur={() => {
        justClicked.current = false;
        setOpen(false);
      }}
      aria-label={label}
      className="flex h-9 items-center rounded-lg px-2.5 hover:bg-white/5 cursor-pointer aria-disabled:opacity-70 aria-disabled:hover:bg-transparent"
    >
      <motion.span
        className="flex"
        animate={loader ? { rotate: 360 } : { rotate: 0 }}
        transition={
          loader
            ? { duration: 1, ease: "linear", repeat: Infinity }
            : { duration: 0.2 }
        }
      >
        {icon}
      </motion.span>
      <AnimatePresence initial={false}>
        {open && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden whitespace-nowrap text-sm"
          >
            <Typography text="caption" class="pl-2">
              {label}
            </Typography>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
