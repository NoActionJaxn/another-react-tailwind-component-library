import { type ReactNode } from "react";
import { Tooltip as RadixTooltip } from "radix-ui";
import cn from "../lib/cn.ts";

export type TooltipVariant = "default" | string;

export interface TooltipProps extends RadixTooltip.TooltipProps {
  children: ReactNode;
  className?: string;
  delayDuration?: number;
  trigger: ReactNode;
  variant?: TooltipVariant;
}

const Tooltip = ({
  children,
  className,
  delayDuration = 200,
  trigger,
  variant = "default",
  ...rest
}: TooltipProps) => {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root {...rest}>
        <RadixTooltip.Trigger asChild>{trigger}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className={cn("another-tooltip-content", className)}
            data-variant={variant}
            sideOffset={6}
          >
            {children}
            <RadixTooltip.Arrow className="another-tooltip-arrow" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

Tooltip.displayName = "Tooltip";

export default Tooltip;
