import { Slot } from "@radix-ui/react-slot";
import type { HTMLAttributes } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";

export type BadgeVariant = "solid" | "soft" | "outline";
export type BadgeSize = "sm" | "md" | "lg";
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  colorScheme?: ColorScheme;
  asChild?: boolean;
}

const sizes = {
  sm: "text-xs",
  md: "text-xs",
  lg: "text-sm",
};

export function Badge({
  variant = "solid",
  size = "md",
  colorScheme,
  asChild = false,
  className,
  style,
  ...props
}: BadgeProps) {
  const Component = asChild ? Slot : "span";
  return (
    <Component
      data-badge
      data-variant={variant}
      data-size={size}
      style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
      className={tw(
        "inline-flex items-center justify-center border whitespace-nowrap",
        "rounded-(--_radius) px-(--_padding-x) py-(--_padding-y) font-(--_font-weight)",
        "border-(--_border) bg-(--_bg) text-(--_text)",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
