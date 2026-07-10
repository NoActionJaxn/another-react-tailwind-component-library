import { useId, type ReactNode } from "react";
import { Select as RadixSelect } from "radix-ui";
import Check from "../icons/Check.tsx";
import ChevronDown from "../icons/ChevronDown.tsx";
import ChevronUp from "../icons/ChevronUp.tsx";
import Label from "./Label.tsx";
import cn from "../lib/cn.ts";

export type SelectVariant = "default" | string;
export type SelectSize = "sm" | "md" | "lg";
export type SelectOrientation = "horizontal" | "vertical";

export interface SelectOption {
  label?: ReactNode;
  value: string;
}

export interface SelectProps extends RadixSelect.SelectProps {
  className?: string;
  id?: string;
  label?: ReactNode;
  options: (SelectOption | string)[];
  orientation?: SelectOrientation;
  placeholder?: ReactNode;
  size?: SelectSize;
  variant?: SelectVariant;
}

const Select = ({
  className,
  id,
  label,
  options,
  orientation = "vertical",
  placeholder = "Select an option",
  size = "md",
  variant = "default",
  ...rest
}: SelectProps) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className="another-select-group" data-orientation={orientation}>
      {label && (
        <Label size={size} htmlFor={selectId}>
          {label}
        </Label>
      )}
      <RadixSelect.Root {...rest}>
        <RadixSelect.Trigger
          id={selectId}
          className={cn("another-select-trigger", className)}
          data-variant={variant}
          data-size={size}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className="another-select-icon">
            <ChevronDown />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            className="another-select-content"
            data-variant={variant}
            position="popper"
            sideOffset={4}
          >
            <RadixSelect.ScrollUpButton className="another-select-scroll-button">
              <ChevronUp />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport className="another-select-viewport">
              {options.map((option) => {
                const { value, label: optionLabel } =
                  typeof option === "string"
                    ? { value: option, label: option }
                    : option;

                return (
                  <RadixSelect.Item
                    key={value}
                    value={value}
                    className="another-select-item"
                  >
                    <RadixSelect.ItemText>{optionLabel}</RadixSelect.ItemText>
                    <RadixSelect.ItemIndicator className="another-select-item-indicator">
                      <Check />
                    </RadixSelect.ItemIndicator>
                  </RadixSelect.Item>
                );
              })}
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton className="another-select-scroll-button">
              <ChevronDown />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
};

Select.displayName = "Select";

export default Select;
