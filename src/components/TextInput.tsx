import React from "react";
import classNames from "classnames";
import * as LabelPrimitive from "@radix-ui/react-label";

export type TextInputVariant = "default" | "primary" | "secondary" | "warning" | "danger" | "success";
export type TextInputSize = "small" | "medium" | "large";
export type TextInputLabelPosition = "top" | "bottom" | "left" | "right";

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: TextInputVariant;
  size?: TextInputSize;
  label?: string;
  labelPosition?: TextInputLabelPosition;
  prependElement?: React.ReactNode;
  appendElement?: React.ReactNode;
  containerClassName?: string;
}

function TextInput({
  variant = "default",
  size = "medium",
  label,
  labelPosition = "top",
  prependElement,
  appendElement,
  className,
  containerClassName,
  disabled,
  id,
  ...rest
}: TextInputProps) {
  const wrapperStyles = classNames({
    "flex flex-col gap-1.5": labelPosition === "top" || labelPosition === "bottom",
    "flex flex-row items-center gap-3": labelPosition === "left" || labelPosition === "right",
  });

  const labelStyles = classNames(
    "text-sm font-medium leading-none",
    {
      "cursor-pointer": !disabled,
      "cursor-default opacity-50": disabled,
    }
  );

  const containerStyles = classNames(
    "group inline-flex items-stretch rounded-md transition-colors duration-200",
    "focus-within:ring-4 focus-within:ring-offset-0",
    {
      "focus-within:ring-neutral-800/50": variant === "default",
      "focus-within:ring-primary-500/50": variant === "primary",
      "focus-within:ring-neutral-400/50": variant === "secondary",
      "focus-within:ring-warning-500/50": variant === "warning",
      "focus-within:ring-danger-500/50": variant === "danger",
      "focus-within:ring-success-500/50": variant === "success",
    },
    {
      "opacity-50": disabled,
    },
    {
      "flex-1": labelPosition === "left" || labelPosition === "right",
    },
    containerClassName
  );

  const inputBaseStyles = classNames(
    "flex-1 min-w-0 bg-transparent outline-none border transition-colors duration-200",
    "placeholder:text-neutral-400",
    "disabled:cursor-default"
  );

  const inputSizeStyles = classNames({
    "px-3 h-7 text-sm": size === "small",
    "px-4 h-9 text-base": size === "medium",
    "px-5 h-11 text-lg": size === "large",
  });

  const inputVariantStyles = classNames({
    "border-neutral-400 text-dark": true,
    "group-focus-within:border-neutral-800": variant === "default",
    "group-focus-within:border-primary-500": variant === "primary",
    "group-focus-within:border-neutral-400": variant === "secondary",
    "group-focus-within:border-warning-500": variant === "warning",
    "group-focus-within:border-danger-500": variant === "danger",
    "group-focus-within:border-success-500": variant === "success",
  });

  const inputRadiusStyles = classNames({
    "rounded-l-md": !prependElement,
    "rounded-l-none border-l-0": prependElement,
    "rounded-r-md": !appendElement,
    "rounded-r-none border-r-0": appendElement,
  });

  const prependStyles = classNames(
    "[&>button]:rounded-r-none",
    "[&>button]:focus:ring-0 [&>button]:focus:ring-offset-0",
    "[&>button]:rounded-l-md"
  );

  const appendStyles = classNames(
    "[&>button]:rounded-l-none",
    "[&>button]:focus:ring-0 [&>button]:focus:ring-offset-0",
    "[&>button]:rounded-r-md"
  );

  const inputContainer = (
    <div className={containerStyles}>
      {prependElement && (
        <div className={prependStyles}>
          {prependElement}
        </div>
      )}
      <input
        id={id}
        className={classNames(
          inputBaseStyles,
          inputSizeStyles,
          inputVariantStyles,
          inputRadiusStyles,
          className
        )}
        disabled={disabled}
        {...rest}
      />
      {appendElement && (
        <div className={appendStyles}>
          {appendElement}
        </div>
      )}
    </div>
  );

  if (!label) {
    return inputContainer;
  }

  const labelElement = (
    <LabelPrimitive.Root
      htmlFor={id}
      className={labelStyles}
    >
      {label}
    </LabelPrimitive.Root>
  );

  return (
    <div className={wrapperStyles}>
      {(labelPosition === "top" || labelPosition === "left") && labelElement}
      {inputContainer}
      {(labelPosition === "bottom" || labelPosition === "right") && labelElement}
    </div>
  );
}

TextInput.displayName = "TextInput";

export default TextInput;
