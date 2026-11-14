import * as OneTimePasswordField from "@radix-ui/react-one-time-password-field";
import { useId, type ComponentProps, type ReactNode } from "react";
import { hasContent, schemeVars, tw, type ColorScheme } from "../../utils";
import { Label } from "../Label";

export type OneTimeCodeInputVariant = "outline" | "soft" | "ghost";
export type OneTimeCodeInputSize = "sm" | "md" | "lg";
export type OneTimeCodeInputLabelPlacement = "top" | "left";
export interface OneTimeCodeInputProps extends Omit<
  ComponentProps<typeof OneTimePasswordField.Root>,
  "type" | "children"
> {
  length?: number;
  variant?: OneTimeCodeInputVariant;
  size?: OneTimeCodeInputSize;
  colorScheme?: ColorScheme;
  masked?: boolean;
  block?: boolean;
  label?: ReactNode;
  labelPlacement?: OneTimeCodeInputLabelPlacement;
  required?: boolean;
  cellLabel?: (position: number, length: number) => string;
}

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const cell =
  "min-w-0 w-(--_cell-width) rounded-(--_radius) border border-(--_border) bg-(--_bg) py-(--_padding-y) text-center font-(family-name:--_font-family) font-(--_font-weight) text-(--_text) transition-colors placeholder:text-(--_placeholder) hover:border-(--_border-hover) hover:bg-(--_bg-hover) outline-(--_focus-color) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-(--_border) disabled:hover:bg-(--_bg)";

const defaultCellLabel = (position: number, length: number) =>
  `Character ${position} of ${length}`;

export function OneTimeCodeInput({
  length = 6,
  variant = "outline",
  size = "md",
  colorScheme,
  masked = false,
  block = false,
  label,
  labelPlacement = "top",
  required = false,
  cellLabel = defaultCellLabel,
  id,
  className,
  style,
  ...props
}: OneTimeCodeInputProps) {
  const autoId = useId();
  const firstId = id ?? autoId;
  const labelId = `${firstId}-label`;
  const withLabel = hasContent(label);
  const schemeStyle = colorScheme
    ? { ...schemeVars(colorScheme), ...style }
    : style;

  const field = (
    <OneTimePasswordField.Root
      data-one-time-code-input
      data-variant={variant}
      data-size={size}
      type={masked ? "password" : "text"}
      aria-labelledby={withLabel ? labelId : undefined}
      style={withLabel ? undefined : schemeStyle}
      className={tw(
        "flex w-fit gap-(--_cell-gap)",
        block && "w-full *:flex-1",
        !withLabel && className,
      )}
      {...props}
    >
      {Array.from({ length }, (_, index) => (
        <OneTimePasswordField.Input
          key={index}
          index={index}
          id={index === 0 ? firstId : undefined}
          data-text-input
          data-variant={variant}
          data-size={size}
          aria-label={cellLabel(index + 1, length)}
          aria-required={required || undefined}
          className={tw(cell, sizes[size])}
        />
      ))}
      <OneTimePasswordField.HiddenInput />
    </OneTimePasswordField.Root>
  );

  if (!withLabel) return field;

  return (
    <div
      data-one-time-code-input-field
      style={schemeStyle}
      className={tw(
        "group/field flex w-fit gap-(--_label-gap)",
        labelPlacement === "left" ? "items-center" : "flex-col",
        block && "w-full",
        className,
      )}
    >
      {/* The star is visual only: each cell's aria-required tells assistive tech. */}
      <Label
        id={labelId}
        htmlFor={firstId}
        size={size}
        className={tw(
          "cursor-pointer",
          props.disabled && "cursor-not-allowed opacity-50",
          labelPlacement === "left" && "w-(--_label-width) shrink-0",
        )}
      >
        {label}
        {required && (
          <span aria-hidden className="ms-0.5 text-(--_required)">
            *
          </span>
        )}
      </Label>
      {field}
    </div>
  );
}
