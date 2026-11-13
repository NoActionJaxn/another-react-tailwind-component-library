import { Slot } from "@radix-ui/react-slot";
import type { HTMLAttributes } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  colorScheme?: ColorScheme;
  asChild?: boolean;
  block?: boolean;
}

export function Container({
  colorScheme,
  asChild = false,
  block = false,
  className,
  style,
  ...props
}: ContainerProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-container
      style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
      className={tw(
        "mx-auto w-full max-w-(--_max-width) px-(--_padding-x)",
        block && "max-w-none",
        className,
      )}
      {...props}
    />
  );
}
