import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type ButtonVariant = "default" | "outline" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  icon?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export const Button = ({
  children,
  className = "",
  block = false,
  icon = false,
  size = "md",
  type = "button",
  variant = "default",
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "another-button",
        {
          "aspect-square px-0": icon && variant !== "link" && !block,
          "w-full grow": block && variant !== "link",
        },
        className,
      )}
      data-variant={variant}
      data-size={size}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
