import * as SeparatorPrimitive from "@radix-ui/react-separator";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";

export interface SeparatorProps extends ComponentProps<
  typeof SeparatorPrimitive.Root
> {
  colorScheme?: ColorScheme;
}

export function Separator({
  colorScheme,
  decorative = true,
  className,
  style,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-separator
      decorative={decorative}
      style={schemeStyle(colorScheme, style)}
      className={tw(
        "shrink-0 bg-(--_color) data-[orientation=horizontal]:h-(--_size) data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-(--_size) data-[orientation=vertical]:self-stretch",
        className,
      )}
      {...props}
    />
  );
}
