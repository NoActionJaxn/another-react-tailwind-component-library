import { Slot } from "@radix-ui/react-slot";
import type { HTMLAttributes } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { Container } from "../Container";

export type CallToActionVariant = "soft" | "solid" | "outline" | "ghost";
export type CallToActionLayout = "centered" | "split";
export interface CallToActionProps extends HTMLAttributes<HTMLElement> {
  variant?: CallToActionVariant;
  layout?: CallToActionLayout;
  fullBleed?: boolean;
  block?: boolean;
  colorScheme?: ColorScheme;
}

const surface = "border border-(--_border) bg-(--_bg)";

export function CallToAction({
  variant = "soft",
  layout = "centered",
  fullBleed = false,
  block = false,
  colorScheme,
  className,
  style,
  children,
  ...props
}: CallToActionProps) {
  return (
    <section
      data-call-to-action
      data-variant={variant}
      data-layout={layout}
      style={schemeStyle(colorScheme, style)}
      className={tw(
        "group/cta py-(--_padding-y)",
        fullBleed && [surface, "border-x-0"],
        className,
      )}
      {...props}
    >
      <Container block={block}>
        {/* Without fullBleed, the colored panel sits inside the container. */}
        <div
          data-call-to-action-panel
          className={tw(
            "grid items-center gap-(--_gap)",
            layout === "split"
              ? "md:grid-cols-[1fr_auto]"
              : "justify-items-center text-center",
            !fullBleed && [surface, "rounded-(--_radius) p-(--_padding)"],
          )}
        >
          {children}
        </div>
      </Container>
    </section>
  );
}

export interface CallToActionPartProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export function CallToActionContent({
  asChild = false,
  className,
  ...props
}: CallToActionPartProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-call-to-action-content
      className={tw(
        "flex max-w-(--_content-max-width) flex-col gap-(--_content-gap) group-data-[layout=centered]/cta:items-center",
        className,
      )}
      {...props}
    />
  );
}

export function CallToActionTitle({
  asChild = false,
  className,
  ...props
}: CallToActionPartProps) {
  const Component = asChild ? Slot : "h2";
  return (
    <Component
      data-call-to-action-title
      className={tw(
        "text-(length:--_title-font-size) leading-tight font-(--_title-font-weight) tracking-tight text-balance text-(--_title-text)",
        className,
      )}
      {...props}
    />
  );
}

export function CallToActionDescription({
  asChild = false,
  className,
  ...props
}: CallToActionPartProps) {
  const Component = asChild ? Slot : "p";
  return (
    <Component
      data-call-to-action-description
      className={tw(
        "text-(length:--_description-font-size) leading-relaxed text-pretty text-(--_description-text)",
        className,
      )}
      {...props}
    />
  );
}

export function CallToActionActions({
  asChild = false,
  className,
  ...props
}: CallToActionPartProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-call-to-action-actions
      className={tw(
        "flex flex-wrap items-center gap-(--_actions-item-gap) group-data-[layout=centered]/cta:justify-center",
        className,
      )}
      {...props}
    />
  );
}
