import * as TogglePrimitive from "@radix-ui/react-toggle";
import type { ComponentProps } from "react";
import { schemeStyle, type ColorScheme } from "../../utils";
import {
  toggleClassName,
  type ToggleSize,
  type ToggleVariant,
} from "./classes";

export interface ToggleProps extends ComponentProps<
  typeof TogglePrimitive.Root
> {
  variant?: ToggleVariant;
  colorScheme?: ColorScheme;
  size?: ToggleSize;
}

export function Toggle({
  variant = "ghost",
  colorScheme,
  size = "md",
  className,
  style,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive.Root
      data-toggle
      data-variant={variant}
      data-size={size}
      style={schemeStyle(colorScheme, style)}
      className={toggleClassName(size, className)}
      {...props}
    />
  );
}
