import * as SwitchPrimitive from "@radix-ui/react-switch";
import { useId, type ComponentProps, type ReactNode } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { Label } from "../Label";

export type SwitchSize = "sm" | "md" | "lg";
export interface SwitchProps extends ComponentProps<
  typeof SwitchPrimitive.Root
> {
  /** Rendered with Label. Without it, pass `aria-label`. */
  label?: ReactNode;
  colorScheme?: ColorScheme;
  size?: SwitchSize;
}

export function Switch({
  label,
  colorScheme,
  size = "md",
  id,
  className,
  style,
  ...props
}: SwitchProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div
      data-switch
      data-size={size}
      style={schemeStyle(colorScheme, style)}
      className={tw(
        "group flex w-fit items-center gap-(--_gap) has-disabled:opacity-50",
        className,
      )}
    >
      <SwitchPrimitive.Root
        id={inputId}
        className="inline-flex h-(--_height) w-(--_width) shrink-0 cursor-pointer items-center rounded-full border-(length:--_border-width) border-(--_border) bg-(--_track) p-[2px] outline-(--_focus-color) transition-colors focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid disabled:cursor-not-allowed data-[state=checked]:border-(--_border-checked) data-[state=checked]:bg-(--_track-checked)"
        {...props}
      >
        <SwitchPrimitive.Thumb className="pointer-events-none block size-(--_thumb-size) rounded-full bg-(--_thumb) shadow-sm transition-transform data-[state=checked]:translate-x-(--_thumb-travel)" />
      </SwitchPrimitive.Root>
      {label != null && (
        <Label
          htmlFor={inputId}
          size={size}
          className="cursor-pointer group-has-disabled:cursor-not-allowed"
        >
          {label}
        </Label>
      )}
    </div>
  );
}
