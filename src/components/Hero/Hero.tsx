import { Slot } from "@radix-ui/react-slot";
import type { HTMLAttributes } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";
import { Container } from "../Container";
import { Image, type ImageProps } from "../Image";

export type HeroVariant = "soft" | "ghost";
export interface HeroProps extends HTMLAttributes<HTMLElement> {
  full?: boolean;
  variant?: HeroVariant;
  colorScheme?: ColorScheme;
}

export function Hero({
  full = false,
  variant = "ghost",
  colorScheme,
  className,
  style,
  children,
  ...props
}: HeroProps) {
  return (
    <section
      data-hero
      data-layout={full ? "full" : "split"}
      data-variant={variant}
      style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
      className={tw(
        "group/hero relative isolate flex min-h-(--_min-height) items-center overflow-hidden bg-(--_bg) py-(--_padding-y)",
        className,
      )}
      {...props}
    >
      <Container
        className={tw(
          "grid items-center gap-(--_gap)",
          full ? "justify-items-center text-center" : "md:grid-cols-2",
        )}
      >
        {children}
      </Container>
    </section>
  );
}

export interface HeroPartProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export function HeroContent({
  asChild = false,
  className,
  ...props
}: HeroPartProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-hero-content
      className={tw(
        "flex max-w-(--_content-max-width) flex-col gap-(--_content-gap) group-data-[layout=full]/hero:items-center",
        className,
      )}
      {...props}
    />
  );
}

export function HeroTitle({
  asChild = false,
  className,
  ...props
}: HeroPartProps) {
  const Component = asChild ? Slot : "h1";
  return (
    <Component
      data-hero-title
      className={tw(
        "text-(length:--_title-font-size) leading-tight font-(--_title-font-weight) tracking-tight text-balance text-(--_title-text)",
        className,
      )}
      {...props}
    />
  );
}

export function HeroDescription({
  asChild = false,
  className,
  ...props
}: HeroPartProps) {
  const Component = asChild ? Slot : "p";
  return (
    <Component
      data-hero-description
      className={tw(
        "text-(length:--_description-font-size) leading-relaxed text-pretty text-(--_description-text)",
        className,
      )}
      {...props}
    />
  );
}

export function HeroActions({
  asChild = false,
  className,
  ...props
}: HeroPartProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-hero-actions
      className={tw(
        "mt-(--_actions-gap) flex flex-wrap items-center gap-(--_actions-item-gap) group-data-[layout=full]/hero:justify-center",
        className,
      )}
      {...props}
    />
  );
}

export function HeroImage({ className, ...props }: ImageProps) {
  return (
    <Image
      data-hero-image
      className={tw(
        "max-h-(--_image-max-height) w-full",
        "group-data-[layout=full]/hero:absolute group-data-[layout=full]/hero:inset-0 group-data-[layout=full]/hero:-z-10 group-data-[layout=full]/hero:size-full group-data-[layout=full]/hero:max-h-none group-data-[layout=full]/hero:rounded-none group-data-[layout=full]/hero:border-0",
        className,
      )}
      {...props}
    />
  );
}
