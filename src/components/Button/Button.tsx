import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";

export type ButtonVariant = "solid" | "soft" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  colorScheme?: ColorScheme;
  size?: ButtonSize;
  asChild?: boolean;
}

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function Button({
  variant = "solid",
  colorScheme,
  size = "md",
  asChild = false,
  type,
  disabled,
  onClick,
  tabIndex,
  className,
  style,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  // Links etc. can't be `disabled`: use aria-disabled and block clicks/focus instead.
  const childDisabled = asChild && disabled;
  return (
    <Comp
      data-button
      data-variant={variant}
      data-size={size}
      type={asChild ? type : (type ?? "button")}
      style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
      className={tw(
        "inline-flex cursor-pointer items-center justify-center border transition-colors",
        "rounded-(--_radius) px-(--_padding-x) py-(--_padding-y)",
        "font-(family-name:--_font-family) font-(--_font-weight) [text-transform:var(--_text-transform)]",
        "border-(--_border) bg-(--_bg) text-(--_text) hover:bg-(--_bg-hover)",
        "outline-(--_focus-color) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-(--_bg)",
        "aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:bg-(--_bg)",
        sizes[size],
        className,
      )}
      {...props}
      disabled={asChild ? undefined : disabled}
      aria-disabled={childDisabled || props["aria-disabled"]}
      tabIndex={childDisabled ? -1 : tabIndex}
      onClick={childDisabled ? (e) => e.preventDefault() : onClick}
    />
  );
}
