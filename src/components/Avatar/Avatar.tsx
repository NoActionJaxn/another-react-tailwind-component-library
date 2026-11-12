import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";

export type AvatarSize = "sm" | "md" | "lg";
export interface AvatarProps extends ComponentProps<
  typeof AvatarPrimitive.Root
> {
  colorScheme?: ColorScheme;
  size?: AvatarSize;
}

const sizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function Avatar({
  colorScheme,
  size = "md",
  className,
  style,
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-avatar
      data-size={size}
      style={schemeStyle(colorScheme, style)}
      className={tw(
        "relative inline-flex size-(--_size) shrink-0 overflow-hidden rounded-(--_radius) align-middle select-none",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function AvatarImage({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      className={tw("size-full object-cover", className)}
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className={tw(
        "flex size-full items-center justify-center bg-(--_bg) leading-none font-(--_font-weight) text-(--_text)",
        className,
      )}
      {...props}
    />
  );
}
