"use client";
import { cva } from "class-variance-authority";

export const buttonCva = cva("cursor-pointer", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
