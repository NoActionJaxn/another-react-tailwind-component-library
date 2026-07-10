import { type HTMLAttributes } from "react";
import cn from "../lib/cn.ts";

export type TypographyFont = "sans" | "sans-serif" | "mono" | "accent";
export type TypographyElement =
  "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: TypographyElement;
  font?: TypographyFont;
}

const Typography = ({
  as: Component = "span",
  className,
  font = "sans",
  ...rest
}: TypographyProps) => {
  return (
    <Component
      className={cn("another-typography", className)}
      data-font={font}
      {...rest}
    />
  );
};

Typography.displayName = "Typography";

export default Typography;
