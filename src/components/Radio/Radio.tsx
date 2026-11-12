import { DotFilledIcon } from "@radix-ui/react-icons";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import {
  createContext,
  useContext,
  useId,
  type ComponentProps,
  type ReactNode,
} from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";
import { Label } from "../Label";

export type RadioSize = "sm" | "md" | "lg";

const GroupContext = createContext<{ size: RadioSize; icon?: ReactNode }>({
  size: "md",
});

export interface RadioGroupProps extends ComponentProps<
  typeof RadioGroupPrimitive.Root
> {
  colorScheme?: ColorScheme;
  size?: RadioSize;
  icon?: ReactNode;
}

export function RadioGroup({
  colorScheme,
  size = "md",
  icon,
  className,
  style,
  ...props
}: RadioGroupProps) {
  return (
    <GroupContext value={{ size, icon }}>
      <RadioGroupPrimitive.Root
        data-radio-group
        style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
        className={tw(
          "flex flex-col gap-(--_group-gap) data-[orientation=horizontal]:flex-row",
          className,
        )}
        {...props}
      />
    </GroupContext>
  );
}

export interface RadioProps extends ComponentProps<
  typeof RadioGroupPrimitive.Item
> {
  label?: ReactNode;
  colorScheme?: ColorScheme;
  icon?: ReactNode;
}

export function Radio({
  label,
  colorScheme,
  icon,
  id,
  className,
  style,
  ...props
}: RadioProps) {
  const group = useContext(GroupContext);
  const size = group.size;
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div
      data-radio
      data-size={size}
      style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
      className={tw(
        "group flex w-fit items-center gap-(--_gap) has-disabled:opacity-50",
        className,
      )}
    >
      <RadioGroupPrimitive.Item
        id={inputId}
        className={tw(
          "inline-flex size-(--_box-size) shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors",
          "border-(--_border) bg-(--_bg) hover:border-(--_border-hover)",
          "data-[state=checked]:border-(--_checked-bg) data-[state=checked]:bg-(--_checked-bg)",
          "data-[state=checked]:hover:border-(--_checked-bg-hover) data-[state=checked]:hover:bg-(--_checked-bg-hover)",
          "outline-(--_focus-color) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid",
          "disabled:cursor-not-allowed disabled:hover:border-(--_border) disabled:data-[state=checked]:hover:border-(--_checked-bg) disabled:data-[state=checked]:hover:bg-(--_checked-bg)",
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator
          aria-hidden
          className="flex size-full scale-(--_indicator-scale) items-center justify-center text-(--_indicator) [&_svg]:size-full"
        >
          {icon ?? group.icon ?? (
            // Radix draws a small dot; enlarge it to ~40% of the circle.
            <DotFilledIcon className="scale-[1.333]" />
          )}
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
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
