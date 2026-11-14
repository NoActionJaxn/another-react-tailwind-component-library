import { Slot } from "@radix-ui/react-slot";
import type { HTMLAttributes } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { Container } from "../Container";

export type ErrorBlockVariant = "ghost" | "soft";
export interface ErrorBlockProps extends HTMLAttributes<HTMLElement> {
  variant?: ErrorBlockVariant;
  block?: boolean;
  colorScheme?: ColorScheme;
}

export function ErrorBlock({
  variant = "ghost",
  block = false,
  colorScheme,
  className,
  style,
  children,
  ...props
}: ErrorBlockProps) {
  return (
    <section
      data-error-block
      data-variant={variant}
      style={schemeStyle(colorScheme, style)}
      className={tw(
        "flex min-h-(--_min-height) items-center bg-(--_bg) py-(--_padding-y)",
        className,
      )}
      {...props}
    >
      <Container
        block={block}
        className="flex flex-col items-center gap-(--_gap) text-center"
      >
        {children}
      </Container>
    </section>
  );
}

export interface ErrorBlockPartProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export function ErrorBlockCode({
  asChild = false,
  className,
  ...props
}: ErrorBlockPartProps) {
  const Component = asChild ? Slot : "p";
  return (
    <Component
      data-error-block-code
      className={tw(
        "text-(length:--_code-font-size) leading-none font-(--_code-font-weight) tracking-tight text-(--_code-text) tabular-nums",
        className,
      )}
      {...props}
    />
  );
}

export function ErrorBlockMessage({
  asChild = false,
  className,
  ...props
}: ErrorBlockPartProps) {
  const Component = asChild ? Slot : "h1";
  return (
    <Component
      data-error-block-message
      className={tw(
        "text-(length:--_message-font-size) leading-tight font-(--_message-font-weight) tracking-tight text-balance text-(--_message-text)",
        className,
      )}
      {...props}
    />
  );
}

export function ErrorBlockDescription({
  asChild = false,
  className,
  ...props
}: ErrorBlockPartProps) {
  const Component = asChild ? Slot : "p";
  return (
    <Component
      data-error-block-description
      className={tw(
        "max-w-(--_description-max-width) text-(length:--_description-font-size) leading-relaxed text-pretty text-(--_description-text)",
        className,
      )}
      {...props}
    />
  );
}

export function ErrorBlockActions({
  asChild = false,
  className,
  ...props
}: ErrorBlockPartProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-error-block-actions
      className={tw(
        "mt-(--_actions-gap) flex flex-wrap items-center justify-center gap-(--_actions-item-gap)",
        className,
      )}
      {...props}
    />
  );
}
