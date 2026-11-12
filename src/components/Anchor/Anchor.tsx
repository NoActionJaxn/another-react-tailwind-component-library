import { Slot } from "@radix-ui/react-slot";
import type { AnchorHTMLAttributes } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";

export type AnchorUnderline = "always" | "hover" | "none";
export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  underline?: AnchorUnderline;
  colorScheme?: ColorScheme;
  asChild?: boolean;
}

const underlines = {
  always: "underline",
  hover: "no-underline hover:underline",
  none: "no-underline",
};

export function Anchor({
  underline = "always",
  colorScheme,
  asChild = false,
  className,
  style,
  ...props
}: AnchorProps) {
  const Component = asChild ? Slot : "a";
  return (
    <Component
      data-anchor
      data-underline={underline}
      style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
      className={tw(
        "cursor-pointer rounded-(--_radius) font-(--_font-weight) text-(--_text) transition-colors hover:text-(--_text-hover)",
        "decoration-(--_decoration) underline-offset-(--_underline-offset) hover:decoration-(--_decoration-hover)",
        "outline-(--_focus-color) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid",
        underlines[underline],
        className,
      )}
      {...props}
    />
  );
}
