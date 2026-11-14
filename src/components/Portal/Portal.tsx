import * as PortalPrimitive from "@radix-ui/react-portal";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";
import { schemeStyle, type ColorScheme } from "../../utils";

export interface PortalProps extends ComponentProps<
  typeof PortalPrimitive.Root
> {
  colorScheme?: ColorScheme;
  disabled?: boolean;
}

export function Portal({
  colorScheme,
  disabled = false,
  asChild = false,
  container,
  style,
  ...props
}: PortalProps) {
  // Portaled content can't inherit --scheme-* from where it's written, so it
  // takes the scheme itself.
  const shared = {
    "data-portal": "",
    style: schemeStyle(colorScheme, style),
  };

  if (disabled) {
    const Component = asChild ? Slot : "div";
    return <Component {...shared} {...props} />;
  }

  return (
    <PortalPrimitive.Root
      {...shared}
      asChild={asChild}
      container={container}
      {...props}
    />
  );
}
