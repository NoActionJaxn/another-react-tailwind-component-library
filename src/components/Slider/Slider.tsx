import * as SliderPrimitive from "@radix-ui/react-slider";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";

export type SliderSize = "sm" | "md" | "lg";
export interface SliderProps extends ComponentProps<
  typeof SliderPrimitive.Root
> {
  colorScheme?: ColorScheme;
  size?: SliderSize;
}

/** Renders one thumb per value; `aria-label` names every thumb. */
export function Slider({
  colorScheme,
  size = "md",
  value,
  defaultValue,
  min = 0,
  "aria-label": ariaLabel,
  className,
  style,
  ...props
}: SliderProps) {
  const thumbs = (value ?? defaultValue ?? [min]).length;
  return (
    <SliderPrimitive.Root
      data-slider
      data-size={size}
      value={value}
      defaultValue={defaultValue}
      min={min}
      style={schemeStyle(colorScheme, style)}
      className={tw(
        "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative grow overflow-hidden rounded-full bg-(--_track) data-[orientation=horizontal]:h-(--_track-size) data-[orientation=vertical]:w-(--_track-size)">
        <SliderPrimitive.Range className="absolute bg-(--_range) data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbs }, (_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          aria-label={ariaLabel}
          className="block size-(--_thumb-size) cursor-grab rounded-full border-2 border-(--_thumb-border) bg-(--_thumb-bg) shadow-sm outline-(--_focus-color) transition-colors focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid active:cursor-grabbing data-disabled:cursor-not-allowed"
        />
      ))}
    </SliderPrimitive.Root>
  );
}
