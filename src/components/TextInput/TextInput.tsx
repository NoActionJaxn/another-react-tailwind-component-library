import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";

const types = ["text", "email", "search", "url"] as const;

export type TextInputType = (typeof types)[number];
export type TextInputVariant = "outline" | "soft" | "ghost";
export type TextInputSize = "sm" | "md" | "lg";
export interface TextInputProps extends Omit<
  ComponentProps<"input">,
  "type" | "size"
> {
  type?: TextInputType;
  variant?: TextInputVariant;
  colorScheme?: ColorScheme;
  size?: TextInputSize;
  prependElement?: ReactNode;
  appendElement?: ReactNode;
  block?: boolean;
}

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const slot =
  "flex shrink-0 items-center text-(--_icon) transition-colors group-focus-within:text-(--_icon-focus) [&_svg]:size-[1.25em]";

// Clicking the padding or an icon focuses the input, so the wrapper acts as one field.
function focusInput(e: MouseEvent<HTMLDivElement>) {
  const target = e.target as Element;
  if (target.closest("input, button, a, select, textarea")) return;
  e.preventDefault();
  e.currentTarget.querySelector("input")?.focus();
}

export function TextInput({
  type = "text",
  variant = "outline",
  colorScheme,
  size = "md",
  prependElement,
  appendElement,
  block = false,
  className,
  style,
  ...props
}: TextInputProps) {
  return (
    <div
      data-text-input
      data-variant={variant}
      data-size={size}
      style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
      onMouseDown={focusInput}
      className={tw(
        "group inline-flex min-w-0 cursor-text items-center border transition-colors",
        "gap-(--_gap) rounded-(--_radius) px-(--_padding-x)",
        "font-(family-name:--_font-family) font-(--_font-weight)",
        "border-(--_border) bg-(--_bg) text-(--_text)",
        "hover:border-(--_border-hover) hover:bg-(--_bg-hover)",
        "outline-(--_focus-color) focus-within:outline-(length:--_focus-width) focus-within:outline-offset-(--_focus-offset) focus-within:outline-solid",
        "has-disabled:cursor-not-allowed has-disabled:opacity-50 has-disabled:hover:border-(--_border) has-disabled:hover:bg-(--_bg)",
        sizes[size],
        block && "flex w-full",
        className,
      )}
    >
      {prependElement != null && (
        <span data-slot="prepend" className={slot}>
          {prependElement}
        </span>
      )}
      <input
        // Guards against other types passed from untyped code.
        type={types.includes(type) ? type : "text"}
        className="min-w-0 flex-1 bg-transparent py-(--_padding-y) outline-none group-has-disabled:cursor-not-allowed placeholder:text-(--_placeholder)"
        {...props}
      />
      {appendElement != null && (
        <span data-slot="append" className={slot}>
          {appendElement}
        </span>
      )}
    </div>
  );
}
