import { useId, type ReactNode } from "react";
import { RadioGroup as RadixRadioGroup } from "radix-ui";
import Label from "./Label.tsx";
import cn from "../lib/cn.ts";

export type RadioGroupVariant = "default" | string;
export type RadioGroupSize = "sm" | "md" | "lg";
export type RadioGroupView = "list" | "grid";

export interface RadioGroupOption {
  label?: ReactNode;
  value: string;
}

export interface RadioGroupProps extends RadixRadioGroup.RadioGroupProps {
  options: (RadioGroupOption | string)[];
  variant?: RadioGroupVariant;
  size?: RadioGroupSize;
  view?: RadioGroupView;
}

const RadioGroup = ({
  className,
  options,
  variant = "default",
  size = "md",
  view = "list",
  ...rest
}: RadioGroupProps) => {
  const groupId = useId();

  return (
    <RadixRadioGroup.Root
      className={cn("another-radio-group", className)}
      data-view={view}
      {...rest}
    >
      {options.map((option, index) => {
        const { value, label } =
          typeof option === "string"
            ? { value: option, label: option }
            : option;

        const itemId = `${groupId}-${index}`;

        return (
          <div key={value} className="another-radio-group-item">
            <RadixRadioGroup.Item
              className="another-radio"
              data-variant={variant}
              data-size={size}
              value={value}
              id={itemId}
            >
              <RadixRadioGroup.Indicator className="another-radio-indicator" />
            </RadixRadioGroup.Item>
            <Label
              className="font-sans font-normal"
              size={size}
              htmlFor={itemId}
            >
              {label}
            </Label>
          </div>
        );
      })}
    </RadixRadioGroup.Root>
  );
};

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
