import React from "react";
import classNames from "classnames";
import * as LabelPrimitive from "@radix-ui/react-label";

export type TextAreaVariant = "default" | "primary" | "secondary" | "warning" | "danger" | "success";
export type TextAreaSize = "small" | "medium" | "large";
export type TextAreaLabelPosition = "top" | "bottom" | "left" | "right";

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  variant?: TextAreaVariant;
  size?: TextAreaSize;
  label?: string;
  labelPosition?: TextAreaLabelPosition;
  prependElement?: React.ReactNode;
  appendElement?: React.ReactNode;
  containerClassName?: string;
}

function TextArea({
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
}: TextAreaProps) {
  const wrapperStyles = classNames({
    "flex flex-col gap-1.5": labelPosition === "top" || labelPosition === "bottom",
    "flex flex-row items-start gap-3": labelPosition === "left" || labelPosition === "right",
  });

  const labelStyles = classNames(
    "text-sm font-medium leading-none",
    {
      "cursor-pointer": !disabled,
      "cursor-default opacity-50": disabled,
      "pt-2": labelPosition === "left" || labelPosition === "right",
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

  const textareaBaseStyles = classNames(
    "flex-1 min-w-0 bg-transparent outline-none border transition-colors duration-200 resize-y",
    "placeholder:text-neutral-400",
    "disabled:cursor-default"
  );

  const textareaSizeStyles = classNames({
    "px-3 py-1.5 text-sm min-h-20": size === "small",
    "px-4 py-2 text-base min-h-24": size === "medium",
    "px-5 py-2.5 text-lg min-h-32": size === "large",
  });

  const textareaVariantStyles = classNames({
    "border-neutral-400 text-dark": true,
    "group-focus-within:border-neutral-800": variant === "default",
    "group-focus-within:border-primary-500": variant === "primary",
    "group-focus-within:border-neutral-400": variant === "secondary",
    "group-focus-within:border-warning-500": variant === "warning",
    "group-focus-within:border-danger-500": variant === "danger",
    "group-focus-within:border-success-500": variant === "success",
  });

  const textareaRadiusStyles = classNames({
    "rounded-l-md": !prependElement,
    "rounded-l-none border-l-0": prependElement,
    "rounded-r-md": !appendElement,
    "rounded-r-none border-r-0": appendElement,
  });

  const elementBaseStyles = classNames(
    "flex items-start justify-center border border-neutral-400 bg-neutral-50 text-neutral-500",
    "transition-colors duration-200",
    {
      "group-focus-within:border-neutral-800": variant === "default",
      "group-focus-within:border-primary-500": variant === "primary",
      "group-focus-within:border-neutral-400": variant === "secondary",
      "group-focus-within:border-warning-500": variant === "warning",
      "group-focus-within:border-danger-500": variant === "danger",
      "group-focus-within:border-success-500": variant === "success",
    }
  );

  const elementSizeStyles = classNames({
    "px-2 pt-1.5": size === "small",
    "px-3 pt-2": size === "medium",
    "px-4 pt-2.5": size === "large",
  });

  const prependStyles = classNames(
    elementBaseStyles,
    elementSizeStyles,
    "rounded-l-md border-r-0"
  );

  const appendStyles = classNames(
    elementBaseStyles,
    elementSizeStyles,
    "rounded-r-md border-l-0"
  );

  const textareaContainer = (
    <div className={containerStyles}>
      {prependElement && (
        <div className={prependStyles}>
          {prependElement}
        </div>
      )}
      <textarea
        id={id}
        className={classNames(
          textareaBaseStyles,
          textareaSizeStyles,
          textareaVariantStyles,
          textareaRadiusStyles,
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
    return textareaContainer;
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
      {textareaContainer}
      {(labelPosition === "bottom" || labelPosition === "right") && labelElement}
    </div>
  );
}

TextArea.displayName = "TextArea";

export default TextArea;
