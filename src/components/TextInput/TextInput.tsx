import {
  useId,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import { hasContent, schemeVars, tw, type ColorScheme } from "../../utils";
import { Label } from "../Label";

const types = ["text", "email", "search", "url"] as const;

export type TextInputType = (typeof types)[number];
export type TextInputVariant = "outline" | "soft" | "ghost";
export type TextInputSize = "sm" | "md" | "lg";
export type TextInputLabelPlacement = "top" | "left" | "border";
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
  label?: ReactNode;
  labelPlacement?: TextInputLabelPlacement;
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
  label,
  labelPlacement = "top",
  id,
  className,
  style,
  ...props
}: TextInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const withLabel = hasContent(label);
  const onBorder = withLabel && labelPlacement === "border";
  const schemeStyle = colorScheme
    ? { ...schemeVars(colorScheme), ...style }
    : style;

  // The star is visual only: the input's own required attribute tells assistive tech.
  const labelElement = withLabel && (
    <Label
      htmlFor={inputId}
      size={onBorder ? (size === "lg" ? "md" : "sm") : size}
      className={tw(
        "cursor-pointer",
        onBorder
          ? "absolute start-(--_label-inset) top-0 -translate-y-1/2 bg-(image:--_label-bg) px-1 text-(--_label-text)"
          : "group-has-disabled/field:cursor-not-allowed group-has-disabled/field:opacity-50",
        labelPlacement === "left" && "w-(--_label-width) shrink-0",
      )}
    >
      {label}
      {props.required && (
        <span aria-hidden className="ms-0.5 text-(--_required)">
          *
        </span>
      )}
    </Label>
  );

  const box = (
    <div
      data-text-input
      data-variant={variant}
      data-size={size}
      style={withLabel ? undefined : schemeStyle}
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
        onBorder && "relative",
        withLabel && labelPlacement === "left" && "flex-1",
        !withLabel && className,
      )}
    >
      {onBorder && labelElement}
      {prependElement != null && (
        <span data-slot="prepend" className={slot}>
          {prependElement}
        </span>
      )}
      <input
        // Guards against other types passed from untyped code.
        type={types.includes(type) ? type : "text"}
        className="min-w-0 flex-1 bg-transparent py-(--_padding-y) outline-none group-has-disabled:cursor-not-allowed placeholder:text-(--_placeholder)"
        id={inputId}
        {...props}
      />
      {appendElement != null && (
        <span data-slot="append" className={slot}>
          {appendElement}
        </span>
      )}
    </div>
  );

  if (!withLabel) return box;

  return (
    <div
      data-text-input-field
      data-label-placement={labelPlacement}
      style={schemeStyle}
      className={tw(
        "group/field inline-flex",
        labelPlacement === "left" ? "items-center" : "flex-col",
        onBorder ? "pt-(--_label-overlap)" : "gap-(--_label-gap)",
        block && "flex w-full",
        className,
      )}
    >
      {!onBorder && labelElement}
      {box}
    </div>
  );
}
