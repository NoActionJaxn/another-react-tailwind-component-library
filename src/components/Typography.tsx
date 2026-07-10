import { type HTMLAttributes } from "react";
import { Slot } from "radix-ui";
import cn from "../lib/cn.ts";

export type TypographyFont = "sans" | "sans-serif" | "mono" | "accent";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  font?: TypographyFont;
}

const Typography = ({
  asChild = false,
  className,
  font = "sans",
  ...rest
}: TypographyProps) => {
  const Component = asChild ? Slot.Root : "span";

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
