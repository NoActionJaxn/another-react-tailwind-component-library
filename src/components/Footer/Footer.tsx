import { Slot } from "@radix-ui/react-slot";
import {
  useContext,
  useId,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { Container } from "../Container";
import { IconButton } from "../IconButton";
import { FooterContext } from "./context";

export type FooterVariant = "solid" | "soft" | "outline" | "ghost";
export interface FooterProps extends HTMLAttributes<HTMLElement> {
  variant?: FooterVariant;
  block?: boolean;
  colorScheme?: ColorScheme;
}

function FooterRoot({
  variant = "solid",
  block = false,
  colorScheme,
  className,
  containerClassName,
  style,
  children,
  ...props
}: FooterProps & { containerClassName?: string }) {
  return (
    <footer
      data-footer
      data-variant={variant}
      style={schemeStyle(colorScheme, style)}
      className={tw(
        "border-t border-(--_border) bg-(--_bg) text-(--_text)",
        className,
      )}
      {...props}
    >
      <Container block={block} className={containerClassName}>
        {children}
      </Container>
    </footer>
  );
}

/** The full footer: a FooterMain row of brand and link columns, then a FooterBar. */
export function Footer(props: FooterProps) {
  return (
    <FooterContext value={true}>
      <FooterRoot containerClassName="py-(--_padding-y)" {...props} />
    </FooterContext>
  );
}

export interface FooterPartProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export function FooterMain({
  asChild = false,
  className,
  ...props
}: FooterPartProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-footer-main
      className={tw(
        "flex flex-wrap gap-x-(--_gap) gap-y-(--_row-gap)",
        className,
      )}
      {...props}
    />
  );
}

export function FooterBrand({
  asChild = false,
  className,
  ...props
}: FooterPartProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-footer-brand
      // Full width on small screens; beside the columns, taking the spare room, from md.
      className={tw(
        "flex w-full flex-col items-start gap-(--_brand-gap) md:me-auto md:w-auto md:max-w-(--_brand-max-width) md:flex-1",
        className,
      )}
      {...props}
    />
  );
}

export function FooterDescription({
  asChild = false,
  className,
  ...props
}: FooterPartProps) {
  const Component = asChild ? Slot : "p";
  return (
    <Component
      data-footer-description
      className={tw(
        "text-sm leading-relaxed text-pretty text-(--_muted-text)",
        className,
      )}
      {...props}
    />
  );
}

export interface FooterColumnProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  title: ReactNode;
}

export function FooterColumn({
  title,
  className,
  children,
  ...props
}: FooterColumnProps) {
  const titleId = useId();
  return (
    <section
      data-footer-column
      aria-labelledby={titleId}
      className={tw(
        "flex min-w-(--_column-min-width) flex-col gap-(--_column-gap)",
        className,
      )}
      {...props}
    >
      <h2
        id={titleId}
        className="text-base font-(--_title-font-weight) text-(--_title-text)"
      >
        {title}
      </h2>
      <ul className="flex flex-col gap-(--_link-gap) text-sm">{children}</ul>
    </section>
  );
}

export interface FooterLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}

export function FooterLink({
  asChild = false,
  className,
  ...props
}: FooterLinkProps) {
  const Component = asChild ? Slot : "a";
  return (
    <li>
      <Component
        data-footer-link
        className={tw(
          "rounded-(--_radius) text-(--_link) underline-offset-4 outline-(--_focus-color) transition-colors hover:text-(--_link-hover) hover:underline focus:outline-(length:--_focus-width) focus:outline-solid",
          className,
        )}
        {...props}
      />
    </li>
  );
}

/** Text with no link, such as an address, in a FooterColumn. */
export function FooterText({
  className,
  ...props
}: HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      data-footer-text
      className={tw("text-(--_muted-text)", className)}
      {...props}
    />
  );
}

/**
 * The bottom row: text at the start, FooterSocials at the end. Inside a Footer
 * it's the row under a divider; on its own it's a complete, compact footer.
 */
export function FooterBar({ className, children, ...props }: FooterProps) {
  const inFooter = useContext(FooterContext);
  const row = (
    <div
      data-footer-bar
      className={tw(
        "flex flex-wrap items-center justify-between gap-x-(--_gap) gap-y-3 text-sm text-(--_muted-text)",
        inFooter &&
          "mt-(--_bar-gap) border-t border-(--_divider) pt-(--_bar-padding-y)",
        inFooter && className,
      )}
    >
      {children}
    </div>
  );
  if (inFooter) return row;
  return (
    <FooterRoot
      containerClassName="py-(--_bar-padding-y)"
      className={className}
      {...props}
    >
      {row}
    </FooterRoot>
  );
}

export interface FooterSocialsProps extends HTMLAttributes<HTMLUListElement> {
  "aria-label"?: string;
}

export function FooterSocials({
  "aria-label": ariaLabel = "Social media",
  className,
  ...props
}: FooterSocialsProps) {
  return (
    <ul
      data-footer-socials
      aria-label={ariaLabel}
      className={tw("-mx-2 flex flex-wrap items-center gap-1", className)}
      {...props}
    />
  );
}

export interface FooterSocialLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Required: names the link, since only the icon shows. */
  "aria-label": string;
  icon: ReactNode;
}

export function FooterSocialLink({
  icon,
  className,
  ...props
}: FooterSocialLinkProps) {
  return (
    <li>
      <IconButton
        asChild
        variant="ghost"
        size="sm"
        round
        aria-label={props["aria-label"]}
        className={className}
      >
        <a {...props}>{icon}</a>
      </IconButton>
    </li>
  );
}
