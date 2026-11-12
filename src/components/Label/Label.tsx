import * as LabelPrimitive from "@radix-ui/react-label";
import type { ComponentProps } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";

export type LabelSize = "sm" | "md" | "lg";
export interface LabelProps extends ComponentProps<typeof LabelPrimitive.Root> {
  colorScheme?: ColorScheme;
  size?: LabelSize;
}

const sizes = {
  sm: "text-xs/none",
  md: "text-sm/none",
  lg: "text-base/none",
};

export function Label({
  colorScheme,
  size = "md",
  className,
  style,
  ...props
}: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-label
      data-size={size}
      style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
      className={tw(
        "font-(family-name:--_font-family) font-(--_font-weight) text-(--_text)",
        "has-disabled:cursor-not-allowed has-disabled:opacity-50",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
