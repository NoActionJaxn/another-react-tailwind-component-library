import { Slot } from "@radix-ui/react-slot";
import type { HTMLAttributes } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  colorScheme?: ColorScheme;
  asChild?: boolean;
}

export function Container({
  size = "lg",
  colorScheme,
  asChild = false,
  className,
  style,
  ...props
}: ContainerProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-container
      data-size={size}
      style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
      className={tw(
        "mx-auto w-full max-w-(--_max-width) px-(--_padding-x)",
        className,
      )}
      {...props}
    />
  );
}
