import { type HTMLAttributes } from "react";
import cn from "../lib/cn.ts";

export type BadgeVariant =
  "default" | "secondary" | "destructive" | "outline" | string;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const Badge = ({ className, variant = "default", ...rest }: BadgeProps) => {
  return (
    <span
      className={cn("another-badge", className)}
      data-variant={variant}
      {...rest}
    />
  );
};

Badge.displayName = "Badge";

export default Badge;
