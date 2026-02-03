import React from "react";
import classNames from "classnames";
import * as ProgressPrimitive from "@radix-ui/react-progress";

export type ProgressVariant = "default" | "primary" | "secondary" | "warning" | "danger" | "success";
export type ProgressSize = "small" | "medium" | "large";

export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  showValue?: boolean;
  label?: string;
  className?: string;
}

function Progress({
  value = 0,
  max = 100,
  variant = "primary",
  size = "medium",
  showValue = false,
  label,
  className,
  ...rest
}: ProgressProps) {
  const percentage = Math.round((value / max) * 100);

  const rootStyles = classNames(
    "relative overflow-hidden rounded-full bg-neutral-200",
    {
      "h-1": size === "small",
      "h-2": size === "medium",
      "h-3": size === "large",
    },
    className
  );

  const indicatorStyles = classNames(
    "h-full transition-transform duration-300 ease-out",
    {
      "bg-neutral-800": variant === "default",
      "bg-primary-500": variant === "primary",
      "bg-neutral-400": variant === "secondary",
      "bg-warning-500": variant === "warning",
      "bg-danger-500": variant === "danger",
      "bg-success-500": variant === "success",
    }
  );

  return (
    <div className="flex flex-col gap-1.5">
      {(label || showValue) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="font-medium text-neutral-700">{label}</span>}
          {showValue && <span className="text-neutral-600">{percentage}%</span>}
        </div>
      )}
      <ProgressPrimitive.Root
        value={value}
        max={max}
        className={rootStyles}
        {...rest}
      >
        <ProgressPrimitive.Indicator
          className={indicatorStyles}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
}

Progress.displayName = "Progress";

export default Progress;
