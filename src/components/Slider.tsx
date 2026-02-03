import React from "react";
import classNames from "classnames";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as LabelPrimitive from "@radix-ui/react-label";

export type SliderVariant = "default" | "primary" | "secondary" | "warning" | "danger" | "success";
export type SliderSize = "small" | "medium" | "large";
export type SliderLabelPosition = "vertical" | "horizontal";

export interface SliderProps extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, 'size'> {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  variant?: SliderVariant;
  size?: SliderSize;
  label?: string;
  labelPosition?: SliderLabelPosition;
  showValue?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

function Slider({
  value,
  defaultValue = [50],
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  variant = "primary",
  size = "medium",
  label,
  labelPosition = "vertical",
  showValue = false,
  disabled,
  id,
  name,
  className,
  ...rest
}: SliderProps) {
  const sliderId = id || React.useId();
  const [internalValue, setInternalValue] = React.useState(value || defaultValue);
  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue: number[]) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const wrapperStyles = classNames({
    "flex flex-col gap-2": labelPosition === "vertical",
    "flex flex-row items-center gap-4": labelPosition === "horizontal",
  });

  const labelStyles = classNames(
    "text-sm font-medium leading-none",
    {
      "cursor-default": true,
      "opacity-50": disabled,
    }
  );

  const trackStyles = classNames(
    "relative grow rounded-full bg-neutral-200",
    {
      "h-1": size === "small",
      "h-2": size === "medium",
      "h-3": size === "large",
    }
  );

  const rangeStyles = classNames(
    "absolute h-full rounded-full",
    {
      "bg-neutral-800": variant === "default",
      "bg-primary-500": variant === "primary",
      "bg-neutral-400": variant === "secondary",
      "bg-warning-500": variant === "warning",
      "bg-danger-500": variant === "danger",
      "bg-success-500": variant === "success",
    }
  );

  const thumbStyles = classNames(
    "block rounded-full bg-white border-2 shadow-md transition-colors",
    "focus:outline-none focus:ring-4 focus:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-50",
    {
      "border-neutral-800 focus:ring-neutral-800/50": variant === "default",
      "border-primary-500 focus:ring-primary-500/50": variant === "primary",
      "border-neutral-400 focus:ring-neutral-400/50": variant === "secondary",
      "border-warning-500 focus:ring-warning-500/50": variant === "warning",
      "border-danger-500 focus:ring-danger-500/50": variant === "danger",
      "border-success-500 focus:ring-success-500/50": variant === "success",
    },
    {
      "h-3 w-3": size === "small",
      "h-4 w-4": size === "medium",
      "h-5 w-5": size === "large",
    }
  );

  const labelElement = label && (
    <div className="flex items-center justify-between gap-2">
      <LabelPrimitive.Root htmlFor={sliderId} className={labelStyles}>
        {label}
      </LabelPrimitive.Root>
      {showValue && (
        <span className={classNames("text-sm text-neutral-600", { "opacity-50": disabled })}>
          {currentValue.join(" - ")}
        </span>
      )}
    </div>
  );

  const sliderElement = (
    <SliderPrimitive.Root
      id={sliderId}
      value={currentValue}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      onValueCommit={onValueCommit}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      name={name}
      className={classNames(
        "relative flex w-full touch-none select-none items-center",
        { "opacity-50 cursor-not-allowed": disabled },
        className
      )}
      {...rest}
    >
      <SliderPrimitive.Track className={trackStyles}>
        <SliderPrimitive.Range className={rangeStyles} />
      </SliderPrimitive.Track>
      {currentValue.map((_, index) => (
        <SliderPrimitive.Thumb key={index} className={thumbStyles} />
      ))}
    </SliderPrimitive.Root>
  );

  if (!label) {
    return sliderElement;
  }

  return (
    <div className={wrapperStyles}>
      {labelElement}
      {sliderElement}
    </div>
  );
}

Slider.displayName = "Slider";

export default Slider;
