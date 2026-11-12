import * as ProgressPrimitive from "@radix-ui/react-progress";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";

export type ProgressSize = "sm" | "md" | "lg";
export interface ProgressProps extends ComponentProps<
  typeof ProgressPrimitive.Root
> {
  colorScheme?: ColorScheme;
  size?: ProgressSize;
}

export function Progress({
  colorScheme,
  size = "md",
  value,
  max = 100,
  className,
  style,
  ...props
}: ProgressProps) {
  const percent =
    value == null ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <ProgressPrimitive.Root
      data-progress
      data-size={size}
      value={value}
      max={max}
      style={schemeStyle(colorScheme, style)}
      className={tw(
        "relative h-(--_height) w-full overflow-hidden rounded-(--_radius) bg-(--_track)",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="size-full bg-(--_fill) transition-transform duration-300"
        style={{ transform: `translateX(-${100 - percent}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
