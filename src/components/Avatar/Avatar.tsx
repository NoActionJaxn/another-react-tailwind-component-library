import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { Badge, type BadgeProps } from "../Badge";

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
        "relative inline-flex size-(--_size) shrink-0 align-middle select-none",
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
      className={tw("size-full rounded-(--_radius) object-cover", className)}
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
        "flex size-full items-center justify-center rounded-(--_radius) bg-(--_bg) leading-none font-(--_font-weight) text-(--_text)",
        className,
      )}
      {...props}
    />
  );
}

export type AvatarBadgePosition =
  "top-end" | "bottom-end" | "top-start" | "bottom-start";
export interface AvatarBadgeProps extends BadgeProps {
  position?: AvatarBadgePosition;
}

/** A dot with no children, or a small Badge (e.g. a count) with children. */
export function AvatarBadge({
  position = "bottom-end",
  size = "sm",
  children,
  className,
  ...props
}: AvatarBadgeProps) {
  const dot = children == null || children === false;
  return (
    <Badge
      data-avatar-badge
      data-position={position}
      size={size}
      className={tw(
        "absolute ring-(length:--_ring-width) ring-(--_ring)",
        dot && "size-(--_badge-dot-size) p-0",
        className,
      )}
      {...props}
    >
      {children}
    </Badge>
  );
}
