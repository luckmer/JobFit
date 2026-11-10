"use client";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

export const Tooltip = ({ ...props }: TooltipPrimitive.Root.Props) => {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
};
