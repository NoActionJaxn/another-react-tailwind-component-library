import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";

export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export interface HoverCardContentProps extends ComponentProps<
  typeof HoverCardPrimitive.Content
> {
  colorScheme?: ColorScheme;
}

export function HoverCardContent({
  colorScheme,
  sideOffset = 4,
  className,
  style,
  ...props
}: HoverCardContentProps) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        data-hover-card-content
        sideOffset={sideOffset}
        style={schemeStyle(colorScheme, style)}
        className={tw(
          "z-50 w-(--_width) max-w-[calc(100vw-2rem)] rounded-(--_radius) border border-(--_border) bg-(--_bg) p-(--_padding) text-sm text-(--_text) shadow-(--_shadow) outline-none",
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}
