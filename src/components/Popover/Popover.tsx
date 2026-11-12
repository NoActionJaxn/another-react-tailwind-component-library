import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;

export interface PopoverContentProps extends ComponentProps<
  typeof PopoverPrimitive.Content
> {
  colorScheme?: ColorScheme;
}

export function PopoverContent({
  colorScheme,
  sideOffset = 4,
  className,
  style,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-popover-content
        sideOffset={sideOffset}
        style={schemeStyle(colorScheme, style)}
        className={tw(
          "z-50 w-(--_width) max-w-[calc(100vw-2rem)] rounded-(--_radius) border border-(--_border) bg-(--_bg) p-(--_padding) text-sm text-(--_text) shadow-(--_shadow) outline-none",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}
