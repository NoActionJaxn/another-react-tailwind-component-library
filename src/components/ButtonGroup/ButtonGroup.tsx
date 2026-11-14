import type { HTMLAttributes } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";
import type { ButtonSize, ButtonVariant } from "../Button";
import { ButtonGroupContext } from "../Button/context";

export type ButtonGroupOrientation = "horizontal" | "vertical";
export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: ButtonGroupOrientation;
  variant?: ButtonVariant;
  size?: ButtonSize;
  colorScheme?: ColorScheme;
}

// Only the outer corners stay rounded.
const orientations = {
  horizontal: "flex-row *:not-first:rounded-s-none *:not-last:rounded-e-none",
  vertical: "flex-col *:not-first:rounded-t-none *:not-last:rounded-b-none",
};

// Outline buttons overlap by a border width so their borders don't double; the
// hovered or focused one sits on top. Other variants don't overlap: a hovered
// button would cover its neighbour's divider.
const overlaps = {
  horizontal: "*:not-first:-ms-(--_overlap)",
  vertical: "*:not-first:-mt-(--_overlap)",
};

// solid and soft buttons have no visible border, so a divider separates them.
const dividers = {
  horizontal: "*:not-first:border-s-(--_divider)",
  vertical: "*:not-first:border-t-(--_divider)",
};

export function ButtonGroup({
  orientation = "horizontal",
  variant,
  size,
  colorScheme,
  className,
  style,
  ...props
}: ButtonGroupProps) {
  const divided = variant === "solid" || variant === "soft" || !variant;
  return (
    <ButtonGroupContext value={{ variant, size }}>
      <div
        data-button-group
        data-orientation={orientation}
        role="group"
        style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
        className={tw(
          "inline-flex *:relative *:hover:z-10 *:focus:z-20",
          orientations[orientation],
          variant === "outline" && overlaps[orientation],
          divided && dividers[orientation],
          className,
        )}
        {...props}
      />
    </ButtonGroupContext>
  );
}
