import {
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
} from "react";
import { cn } from "../lib/cn";

export type ButtonVariant = "default" | "outline" | "ghost" | "link" | string;
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  block?: boolean;
  icon?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export const Button = ({
  asChild = false,
  children,
  className = "",
  block = false,
  icon = false,
  size = "md",
  type = "button",
  variant = "default",
  ...rest
}: ButtonProps) => {
  const sharedProps = {
    className: cn(
      "another-button",
      {
        "aspect-square px-0": icon && variant !== "link" && !block,
        "w-full grow": block && variant !== "link",
      },
      className,
    ),
    "data-variant": variant,
    "data-size": size,
    type,
    ...rest,
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement, sharedProps);
  }

  return <button {...sharedProps}>{children}</button>;
};

Button.displayName = "Button";

export default Button;
