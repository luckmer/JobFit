"use client";
import { cva } from "class-variance-authority";

export const typography = cva("not-italic select-none", {
  variants: {
    text: {
      caption: "",
      custom: "",
    },
    color: {
      primary: "",
    },
    bold: {
      true: "font-bold",
    },
    medium: {
      true: "font-medium",
    },
    nowrap: {
      true: "whitespace-nowrap",
    },
    uppercase: {
      true: "uppercase",
    },
    capitalize: {
      true: "capitalize",
    },
    font: {
      default: "font-general",
    },
  },
  defaultVariants: {
    font: "default",
    text: "caption",
    color: "primary",
  },
});
