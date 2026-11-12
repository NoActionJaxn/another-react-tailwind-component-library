import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";

/** Wrap the app (or a section) once; sets shared open delays. */
export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export interface TooltipContentProps extends ComponentProps<
  typeof TooltipPrimitive.Content
> {
  /** Content renders in a portal, so it can't inherit a scheme from the trigger's parents. */
  colorScheme?: ColorScheme;
  showArrow?: boolean;
}

export function TooltipContent({
  colorScheme,
  showArrow = true,
  sideOffset = 4,
  className,
  style,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-tooltip-content
        sideOffset={sideOffset}
        style={schemeStyle(colorScheme, style)}
        className={tw(
          "z-50 max-w-xs rounded-(--_radius) bg-(--_bg) px-(--_padding-x) py-(--_padding-y) text-xs text-(--_text)",
          className,
        )}
        {...props}
      >
        {children}
        {showArrow && <TooltipPrimitive.Arrow className="fill-(--_bg)" />}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
