import { Slot } from "@radix-ui/react-slot";
import type { HTMLAttributes } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";
import { Image, type ImageProps } from "../Image";

export type CardVariant = "outline" | "soft" | "ghost";
export type CardSize = "sm" | "md" | "lg";
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
  colorScheme?: ColorScheme;
}

export function Card({
  variant = "outline",
  size = "md",
  colorScheme,
  className,
  style,
  ...props
}: CardProps) {
  return (
    <div
      data-card
      data-variant={variant}
      data-size={size}
      style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
      className={tw(
        "flex flex-col gap-(--_gap) overflow-hidden p-(--_container-padding)",
        "rounded-(--_radius) border-(length:--_border-width) border-(--_border) bg-(--_bg) text-(--_text) shadow-(--_shadow)",
        className,
      )}
      {...props}
    />
  );
}

export interface CardImageProps extends ImageProps {
  asChild?: boolean;
}

export function CardImage({
  asChild = false,
  className,
  ...props
}: CardImageProps) {
  const Component = asChild ? Slot : Image;
  return (
    <Component
      data-card-image
      className={tw(
        "block aspect-(--_image-aspect-ratio) w-full rounded-(--_image-radius) border-0",
        className,
      )}
      {...props}
    />
  );
}

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export function CardHeader({
  asChild = false,
  className,
  ...props
}: CardSectionProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-card-header
      className={tw(
        "px-(--_inner-padding) text-(length:--_header-font-size) leading-snug font-(--_header-font-weight) text-(--_header-text) first:pt-(--_inner-padding) last:pb-(--_inner-padding)",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  asChild = false,
  className,
  ...props
}: CardSectionProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-card-description
      className={tw(
        "px-(--_inner-padding) text-(length:--_description-font-size) leading-normal text-(--_description-text) first:pt-(--_inner-padding) last:pb-(--_inner-padding)",
        className,
      )}
      {...props}
    />
  );
}

export function CardFooter({
  asChild = false,
  className,
  ...props
}: CardSectionProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-card-footer
      className={tw(
        "flex flex-wrap items-center gap-(--_footer-gap) px-(--_half-padding) first:pt-(--_half-padding) last:pb-(--_half-padding)",
        className,
      )}
      {...props}
    />
  );
}
