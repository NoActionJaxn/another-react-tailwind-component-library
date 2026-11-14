import { Slot } from "@radix-ui/react-slot";
import { useContext, type ComponentProps } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";
import { ButtonGroupContext } from "./context";

export type ButtonVariant = "solid" | "soft" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  colorScheme?: ColorScheme;
  size?: ButtonSize;
  asChild?: boolean;
  block?: boolean;
}

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function Button({
  variant: variantProp,
  colorScheme,
  size: sizeProp,
  asChild = false,
  block = false,
  type,
  disabled,
  onClick,
  tabIndex,
  className,
  style,
  ...props
}: ButtonProps) {
  // Inside a ButtonGroup, the group's variant and size are the defaults.
  const group = useContext(ButtonGroupContext);
  const variant = variantProp ?? group?.variant ?? "solid";
  const size = sizeProp ?? group?.size ?? "md";
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
        "inline-flex cursor-pointer items-center justify-center gap-(--_gap) border transition-colors",
        "rounded-(--_radius) px-(--_padding-x) py-(--_padding-y)",
        "font-(family-name:--_font-family) font-(--_font-weight) [text-transform:var(--_text-transform)]",
        "border-(--_border) bg-(--_bg) text-(--_text) hover:bg-(--_bg-hover)",
        "outline-(--_focus-color) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-(--_bg)",
        "aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:bg-(--_bg)",
        sizes[size],
        block && "flex w-full",
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
