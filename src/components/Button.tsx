import React from "react";
import classNames from "classnames";
import { Slot } from "@radix-ui/react-slot";

export type ButtonVariant = "default" | "primary" | "secondary" | "warning" | "danger" | "success" | "ghost";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  block?: boolean;
  rounded?: boolean;
  square?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

function Button({
  asChild,
  children,
  className,
  block = false,
  rounded = false,
  square = false,
  size = "medium",
  variant = "default",
  type = "button",
  ...rest
}: React.PropsWithChildren<ButtonProps>) {
  const Component = asChild ? Slot : 'button';
  const componentProps = asChild ? rest : { type, ...rest };

  const baseStyles = "inline-flex items-center justify-center cursor-pointer transition-colors duration-200 font-medium select-none focus:ring-4 focus:ring-offset-0 disabled:cursor-default disabled:opacity-50";

  const fontStyles = "font-sans font-normal tracking-normal";

  const sizeStyles = classNames(
    square ? {
      "text-sm": size === "small",
      "text-base": size === "medium",
      "text-lg": size === "large",
    } : rounded ? {
      "px-4.5 gap-1.5 text-sm": size === "small",
      "px-5.5 gap-2 text-base": size === "medium",
      "px-6.5 gap-3 text-lg": size === "large",
    } : {
      "px-4 gap-1.5 text-sm": size === "small",
      "px-5 gap-2 text-base": size === "medium",
      "px-6 gap-3 text-lg": size === "large",
    },
    {
      "h-7": size === "small",
      "h-9": size === "medium",
      "h-11": size === "large",
    },
    {
      "aspect-square": square,
    }
  );

  const blockStyles = classNames("sm:w-auto w-full", {
    "w-full grow": block,
  });

  const cornerRadius = classNames({
    "rounded-md": !rounded,
    "rounded-full": rounded,
  });

  const variantStyles = classNames({
    "bg-neutral-800 text-light": variant === "default",
    "bg-primary-500 text-light": variant === "primary",
    "bg-neutral-100 text-dark": variant === "secondary",
    "bg-warning-500 text-light": variant === "warning",
    "bg-danger-500 text-light": variant === "danger",
    "bg-success-500 text-light": variant === "success",
    "bg-transparent text-dark": variant === "ghost",
  });

  const borderStyles = classNames("border", {
    "border-transparent": ["default", "primary", "warning", "danger", "success", "ghost"].includes(variant),
    "border border-neutral-400": variant === "secondary",
  });

  const focusedStyles = classNames("focus:outline-none focus:ring-4", {
    "focus:ring-neutral-800/50": variant === "default",
    "focus:ring-primary-500/50": variant === "primary",
    "focus:ring-neutral-400/50": variant === "secondary",
    "focus:ring-warning-500/50": variant === "warning",
    "focus:ring-danger-500/50": variant === "danger",
    "focus:ring-success-500/50": variant === "success",
    "focus:ring-neutral-300/50": variant === "ghost",
  });

  const hoverStyles = classNames({
    "hover:bg-neutral-900": variant === "default",
    "hover:bg-primary-600": variant === "primary",
    "hover:bg-neutral-200": variant === "secondary" || variant === "ghost",
    "hover:bg-warning-600": variant === "warning",
    "hover:bg-danger-600": variant === "danger",
    "hover:bg-success-600": variant === "success",
  });

  const disabled = classNames("disabled:opacity-50 disabled:cursor-default", {
    "disabled:hover:bg-neutral-800": variant === "default",
    "disabled:hover:bg-primary-600": variant === "primary",
    "disabled:hover:bg-neutral-600": variant === "secondary",
    "disabled:hover:bg-warning-600": variant === "warning",
    "disabled:hover:bg-danger-600": variant === "danger",
    "disabled:hover:bg-success-600": variant === "success",
    "disabled:hover:bg-transparent": variant === "ghost",
  });

  return (
    <Component
      className={
        classNames(
          baseStyles,
          blockStyles,
          cornerRadius,
          fontStyles,
          hoverStyles,
          disabled,
          focusedStyles,
          sizeStyles,
          variantStyles,
          borderStyles,
          className
        )}
      {...componentProps}>
      {children}
    </Component>
  );
}

Button.displayName = "Button";

export default Button;
