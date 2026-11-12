import { Slot } from "@radix-ui/react-slot";
import type { HTMLAttributes } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";

export type TypographyFont = "sans" | "serif" | "mono";
export type TypographySize = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export interface TypographyProps extends HTMLAttributes<HTMLSpanElement> {
  font?: TypographyFont;
  size?: TypographySize;
  colorScheme?: ColorScheme;
  asChild?: boolean;
}

const fonts = {
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
};

export function Typography({
  font = "sans",
  size = "md",
  colorScheme,
  asChild = false,
  className,
  style,
  ...props
}: TypographyProps) {
  const Component = asChild ? Slot : "span";
  return (
    <Component
      data-typography
      data-size={size}
      data-font={font}
      style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
      className={tw(
        "text-(length:--_font-size) leading-(--_line-height) text-(--_text)",
        fonts[font],
        className,
      )}
      {...props}
    />
  );
}
