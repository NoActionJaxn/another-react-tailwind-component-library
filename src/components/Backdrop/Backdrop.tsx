import { Presence } from "@radix-ui/react-presence";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";

export interface BackdropProps extends ComponentProps<"div"> {
  open?: boolean;
  blur?: boolean;
  contained?: boolean;
  colorScheme?: ColorScheme;
  asChild?: boolean;
}

export function Backdrop({
  open = true,
  blur = false,
  contained = false,
  colorScheme,
  asChild = false,
  className,
  style,
  ...props
}: BackdropProps) {
  const Component = asChild ? Slot : "div";
  // Presence keeps it mounted until the fade-out ends. Radix overlays that
  // render it with asChild pass their own data-state, which wins.
  return (
    <Presence present={open}>
      <Component
        data-backdrop
        data-state={open ? "open" : "closed"}
        aria-hidden
        style={schemeStyle(colorScheme, style)}
        className={tw(
          "inset-0 z-(--_z-index) bg-(--_bg)",
          contained ? "absolute" : "fixed",
          blur && "backdrop-blur-(--_blur)",
          className,
        )}
        {...props}
      />
    </Presence>
  );
}
