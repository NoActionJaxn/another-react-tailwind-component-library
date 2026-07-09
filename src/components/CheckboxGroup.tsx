import { useId, useState, type ReactNode } from "react";
import Checkbox, {
  type CheckboxSize,
  type CheckboxVariant,
} from "./Checkbox.tsx";
import cn from "../lib/cn.ts";

export type CheckboxGroupView = "list" | "grid";

export interface CheckboxGroupOption {
  label?: ReactNode;
  value: string;
}

export interface CheckboxGroupProps {
  className?: string;
  defaultValue?: string[];
  disabled?: boolean;
  name?: string;
  onValueChange?: (value: string[]) => void;
  options: (CheckboxGroupOption | string)[];
  size?: CheckboxSize;
  value?: string[];
  variant?: CheckboxVariant;
  view?: CheckboxGroupView;
}

const CheckboxGroup = ({
  className,
  defaultValue = [],
  disabled = false,
  name,
  onValueChange,
  options,
  size = "md",
  value,
  variant = "default",
  view = "list",
}: CheckboxGroupProps) => {
  const groupId = useId();
  const [uncontrolledValue, setUncontrolledValue] =
    useState<string[]>(defaultValue);
  const selectedValues = value ?? uncontrolledValue;

  const handleCheckedChange = (optionValue: string, checked: boolean) => {
    const next = checked
      ? [...selectedValues, optionValue]
      : selectedValues.filter((selected) => selected !== optionValue);

    if (value === undefined) {
      setUncontrolledValue(next);
    }

    onValueChange?.(next);
  };

  return (
    <div
      className={cn("another-checkbox-group-list", className)}
      data-view={view}
    >
      {options.map((option, index) => {
        const { value: optionValue, label } =
          typeof option === "string"
            ? { value: option, label: option }
            : option;
        const itemId = `${groupId}-${index}`;

        return (
          <Checkbox
            key={optionValue}
            id={itemId}
            name={name}
            value={optionValue}
            label={label}
            variant={variant}
            size={size}
            disabled={disabled}
            checked={selectedValues.includes(optionValue)}
            onCheckedChange={(checked) =>
              handleCheckedChange(optionValue, checked === true)
            }
          />
        );
      })}
    </div>
  );
};

CheckboxGroup.displayName = "CheckboxGroup";

export default CheckboxGroup;
