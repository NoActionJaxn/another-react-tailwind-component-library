import React from "react";
import classNames from "classnames";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as LabelPrimitive from "@radix-ui/react-label";
import ChevronIcon from "../icons/ChevronIcon";

export type SelectVariant = "default" | "primary" | "secondary" | "warning" | "danger" | "success";
export type SelectSize = "small" | "medium" | "large";
export type SelectLabelPosition = "vertical" | "horizontal";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, 'size'> {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  variant?: SelectVariant;
  size?: SelectSize;
  label?: string;
  labelPosition?: SelectLabelPosition;
  disabled?: boolean;
  id?: string;
  className?: string;
}

function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select an option",
  variant = "default",
  size = "medium",
  label,
  labelPosition = "vertical",
  disabled,
  id,
  className,
  ...rest
}: SelectProps) {
  const selectId = id || React.useId();

  const wrapperStyles = classNames({
    "flex flex-col gap-1.5": labelPosition === "vertical",
    "flex flex-row items-center gap-3": labelPosition === "horizontal",
  });

  const labelStyles = classNames(
    "text-sm font-medium leading-none",
    {
      "cursor-pointer": !disabled,
      "cursor-default opacity-50": disabled,
    }
  );

  const triggerStyles = classNames(
    "inline-flex items-center justify-between gap-2 rounded-md border bg-white transition-colors duration-200",
    "focus:outline-none focus:ring-4 focus:ring-offset-0",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[placeholder]:text-neutral-400",
    {
      "border-neutral-300 hover:border-neutral-400 focus:border-neutral-800 focus:ring-neutral-800/50": variant === "default",
      "border-primary-300 hover:border-primary-400 focus:border-primary-500 focus:ring-primary-500/50": variant === "primary",
      "border-neutral-300 hover:border-neutral-400 focus:border-neutral-400 focus:ring-neutral-400/50": variant === "secondary",
      "border-warning-300 hover:border-warning-400 focus:border-warning-500 focus:ring-warning-500/50": variant === "warning",
      "border-danger-300 hover:border-danger-400 focus:border-danger-500 focus:ring-danger-500/50": variant === "danger",
      "border-success-300 hover:border-success-400 focus:border-success-500 focus:ring-success-500/50": variant === "success",
    },
    {
      "px-2.5 h-7 text-sm": size === "small",
      "px-3 h-9 text-base": size === "medium",
      "px-4 h-11 text-lg": size === "large",
    },
    className
  );

  const contentStyles = classNames(
    "overflow-hidden bg-white rounded-md border border-neutral-200 shadow-lg",
    "w-[var(--radix-select-trigger-width)]",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
  );

  const viewportStyles = "p-1";

  const itemStyles = classNames(
    "relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none",
    "focus:bg-neutral-100",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
  );

  const labelElement = label && (
    <LabelPrimitive.Root htmlFor={selectId} className={labelStyles}>
      {label}
    </LabelPrimitive.Root>
  );

  const selectElement = (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      {...rest}
    >
      <SelectPrimitive.Trigger id={selectId} className={triggerStyles}>
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <ChevronIcon className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className={contentStyles} position="popper" sideOffset={4}>
          <SelectPrimitive.Viewport className={viewportStyles}>
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={itemStyles}
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );

  if (!label) {
    return selectElement;
  }

  return (
    <div className={wrapperStyles}>
      {labelElement}
      {selectElement}
    </div>
  );
}

Select.displayName = "Select";

export default Select;
