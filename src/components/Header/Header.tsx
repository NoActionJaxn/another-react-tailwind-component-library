import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Slot } from "@radix-ui/react-slot";
import { useRef, type HTMLAttributes } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { Container } from "../Container";
import { MenuHostContext } from "../NavigationMenu/context";
import { TextInput, type TextInputProps } from "../TextInput";

export type HeaderVariant = "outline" | "soft" | "solid" | "ghost";
export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  variant?: HeaderVariant;
  sticky?: boolean;
  block?: boolean;
  colorScheme?: ColorScheme;
}

/**
 * The site header: HeaderLogo and HeaderSearch at the start, HeaderNav (a
 * NavigationMenu and, say, an Avatar) at the end. When the menu collapses to
 * its hamburger panel and opens, the panel fills the screen under the header.
 */
export function Header({
  variant = "outline",
  sticky = false,
  block = false,
  colorScheme,
  className,
  style,
  children,
  ...props
}: HeaderProps) {
  const ref = useRef<HTMLElement>(null);
  return (
    <MenuHostContext value={ref}>
      <header
        ref={ref}
        data-header
        data-variant={variant}
        style={schemeStyle(colorScheme, style)}
        className={tw(
          "z-(--_z-index) border-b border-(--_border) bg-(--_bg) text-(--_text)",
          sticky && "sticky top-0",
          className,
        )}
        {...props}
      >
        <Container
          block={block}
          className="flex h-(--_height) items-center gap-(--_gap)"
        >
          {children}
        </Container>
      </header>
    </MenuHostContext>
  );
}

export interface HeaderPartProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export function HeaderLogo({
  asChild = false,
  className,
  ...props
}: HeaderPartProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-header-logo
      className={tw(
        "flex shrink-0 items-center gap-2 text-lg font-bold text-(--_title-text)",
        className,
      )}
      {...props}
    />
  );
}

export type HeaderSearchProps = Omit<TextInputProps, "type">;

/** A search field after the logo; it takes the free space up to a max width. */
export function HeaderSearch({
  prependElement = <MagnifyingGlassIcon aria-hidden />,
  "aria-label": ariaLabel = "Search",
  size = "sm",
  className,
  ...props
}: HeaderSearchProps) {
  return (
    <div
      data-header-search
      role="search"
      className={tw("min-w-0 flex-1 md:max-w-(--_search-max-width)", className)}
    >
      <TextInput
        type="search"
        block
        size={size}
        aria-label={ariaLabel}
        prependElement={prependElement}
        {...props}
      />
    </div>
  );
}

export function HeaderNav({
  asChild = false,
  className,
  ...props
}: HeaderPartProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-header-nav
      className={tw(
        "ms-auto flex shrink-0 items-center gap-(--_nav-gap)",
        className,
      )}
      {...props}
    />
  );
}
