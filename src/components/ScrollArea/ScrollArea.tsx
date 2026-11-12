import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";

export interface ScrollAreaProps extends ComponentProps<
  typeof ScrollAreaPrimitive.Root
> {
  colorScheme?: ColorScheme;
  /** Which custom scrollbars to render. */
  scrollbars?: "vertical" | "horizontal" | "both";
}

export function ScrollArea({
  colorScheme,
  scrollbars = "vertical",
  className,
  style,
  children,
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      data-scroll-area
      style={schemeStyle(colorScheme, style)}
      className={tw("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      {scrollbars !== "horizontal" && <ScrollBar orientation="vertical" />}
      {scrollbars !== "vertical" && <ScrollBar orientation="horizontal" />}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

export function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      orientation={orientation}
      className={tw(
        "flex touch-none p-0.5 transition-colors select-none data-[orientation=horizontal]:h-(--_size) data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-(--_size)",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-(--_thumb) transition-colors hover:bg-(--_thumb-hover)" />
    </ScrollAreaPrimitive.Scrollbar>
  );
}
