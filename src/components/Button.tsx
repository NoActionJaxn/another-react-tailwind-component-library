import { Slot } from "@radix-ui/react-slot";
import classNames from "classnames";
import type React from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "warning" | "danger" | "ghost";
type ButtonSize = "small" | "medium" | "large";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, Slottable {
  asChild?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

function Button({ asChild, children, className, size = "medium", variant = "primary", type = "button", ...rest }: React.PropsWithChildren<ButtonProps>) {
  const Component = asChild ? Slot : 'button';
  const componentProps = asChild ? rest : { type, ...rest };

  const base = classNames("inline-flex items-center justify-center rounded-full cursor-pointer");

  const buttonSize = classNames({
    "h-7 px-3 text-sm": size === "small",
    "h-9 px-5 text-base": size === "medium",
    "h-11 px-7 text-lg": size === "large",
  });

  const buttonVariants = classNames({
    "bg-primary-600 text-white": variant === "primary",
    "bg-secondary-600 text-white": variant === "secondary",
    "bg-tertiary-600 text-white": variant === "tertiary",
    "bg-warning-600 text-white": variant === "warning",
    "bg-danger-600 text-white": variant === "danger",
    "bg-neutral-600 text-white": variant === "ghost",
  });

  const focused = classNames("focus:outline-none focus:ring-2 focus:ring-offset-2", {
    "focus:ring-primary-500": variant === "primary",
    "focus:ring-secondary-500": variant === "secondary",
    "focus:ring-tertiary-500": variant === "tertiary",
    "focus:ring-warning-500": variant === "warning",
    "focus:ring-danger-500": variant === "danger",
    "focus:ring-neutral-500": variant === "ghost",
  });

  const hover = classNames({
    "hover:bg-primary-500": variant === "primary",
    "hover:bg-secondary-500": variant === "secondary",
    "hover:bg-tertiary-500": variant === "tertiary",
    "hover:bg-warning-500": variant === "warning",
    "hover:bg-danger-500": variant === "danger",
    "hover:bg-neutral-500": variant === "ghost",
  })

  const disabled = classNames("disabled:opacity-50 disabled:cursor-not-allowed");

  return (
    <Component className={classNames(base, hover, disabled, focused, buttonSize, buttonVariants, className)} {...componentProps}>
      {children}
    </Component>
  );
}

Button.displayName = "Button";

export default Button;
