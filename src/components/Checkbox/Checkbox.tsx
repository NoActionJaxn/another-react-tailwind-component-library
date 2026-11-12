import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon } from "@radix-ui/react-icons";
import { useId, type ComponentProps, type ReactNode } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";
import { Label } from "../Label";

export type CheckboxSize = "sm" | "md" | "lg";
export interface CheckboxProps extends ComponentProps<
  typeof CheckboxPrimitive.Root
> {
  label?: ReactNode;
  colorScheme?: ColorScheme;
  size?: CheckboxSize;
  icon?: ReactNode;
  indeterminateIcon?: ReactNode;
}

export function Checkbox({
  label,
  colorScheme,
  size = "md",
  icon = <CheckIcon />,
  indeterminateIcon = <MinusIcon />,
  id,
  className,
  style,
  ...props
}: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div
      data-checkbox
      data-size={size}
      style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
      className={tw(
        "group flex w-fit items-center gap-(--_gap) has-disabled:opacity-50",
        className,
      )}
    >
      <CheckboxPrimitive.Root
        id={inputId}
        className={tw(
          "group/box inline-flex size-(--_box-size) shrink-0 cursor-pointer items-center justify-center border transition-colors",
          "rounded-(--_radius) border-(--_border) bg-(--_bg) text-(--_indicator) hover:border-(--_border-hover)",
          "data-[state=checked]:border-(--_checked-bg) data-[state=checked]:bg-(--_checked-bg)",
          "data-[state=indeterminate]:border-(--_checked-bg) data-[state=indeterminate]:bg-(--_checked-bg)",
          "data-[state=checked]:hover:border-(--_checked-bg-hover) data-[state=checked]:hover:bg-(--_checked-bg-hover)",
          "data-[state=indeterminate]:hover:border-(--_checked-bg-hover) data-[state=indeterminate]:hover:bg-(--_checked-bg-hover)",
          "outline-(--_focus-color) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid",
          "disabled:cursor-not-allowed disabled:hover:border-(--_border) disabled:data-[state=checked]:hover:border-(--_checked-bg) disabled:data-[state=checked]:hover:bg-(--_checked-bg)",
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex size-full scale-(--_indicator-scale) items-center justify-center [&_svg]:size-full">
          <span
            aria-hidden
            className="flex size-full items-center justify-center group-data-[state=indeterminate]/box:hidden"
          >
            {icon}
          </span>
          <span
            aria-hidden
            className="hidden size-full items-center justify-center group-data-[state=indeterminate]/box:flex"
          >
            {indeterminateIcon}
          </span>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
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
