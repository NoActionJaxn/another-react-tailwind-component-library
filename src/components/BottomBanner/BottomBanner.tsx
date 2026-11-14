import { Cross2Icon } from "@radix-ui/react-icons";
import { Presence } from "@radix-ui/react-presence";
import { Slot } from "@radix-ui/react-slot";
import { useContext, useId, useState, type HTMLAttributes } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { Container } from "../Container";
import { IconButton } from "../IconButton";
import { BottomBannerContext } from "./context";

export type BottomBannerVariant = "solid" | "soft" | "outline";
export interface BottomBannerProps extends HTMLAttributes<HTMLElement> {
  variant?: BottomBannerVariant;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  storageKey?: string;
  fixed?: boolean;
  block?: boolean;
  dismissLabel?: string;
  colorScheme?: ColorScheme;
}

// Storage can be missing or blocked (private mode, sandboxed frames).
function wasDismissed(key: string | undefined) {
  if (!key || typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(key) === "dismissed";
  } catch {
    return false;
  }
}

function rememberDismissed(key: string | undefined) {
  if (!key) return;
  try {
    window.localStorage.setItem(key, "dismissed");
  } catch {
    // Not remembered: it shows again next time.
  }
}

/**
 * A full-width strip along the bottom of the screen, such as a newsletter
 * sign-up, with a dismiss button. It slides in and out.
 */
export function BottomBanner({
  variant = "solid",
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  storageKey,
  fixed = true,
  block = false,
  dismissLabel = "Dismiss",
  colorScheme,
  className,
  style,
  children,
  ...props
}: BottomBannerProps) {
  const [openState, setOpenState] = useState(
    () => defaultOpen && !wasDismissed(storageKey),
  );
  const open = openProp ?? openState;
  const titleId = useId();

  function dismiss() {
    rememberDismissed(storageKey);
    setOpenState(false);
    onOpenChange?.(false);
  }

  return (
    <Presence present={open}>
      <BottomBannerContext value={titleId}>
        <section
          data-bottom-banner
          data-variant={variant}
          data-state={open ? "open" : "closed"}
          aria-labelledby={titleId}
          style={schemeStyle(colorScheme, style)}
          className={tw(
            "border-t border-(--_border) bg-(--_bg) py-(--_padding-y) text-(--_text) shadow-(--_shadow)",
            fixed ? "fixed inset-x-0 bottom-0 z-(--_z-index)" : "relative",
            className,
          )}
          {...props}
        >
          <Container block={block}>
            {/* Text, then the actions: side by side from md, stacked below.
                The end padding keeps clear of the dismiss button. */}
            <div className="flex min-w-0 flex-col gap-(--_gap) pe-(--_dismiss-room) md:flex-row md:items-center">
              {children}
            </div>
          </Container>
          <IconButton
            variant="ghost"
            size="sm"
            aria-label={dismissLabel}
            onClick={dismiss}
            className="absolute end-(--_dismiss-inset) top-(--_dismiss-inset)"
          >
            <Cross2Icon aria-hidden />
          </IconButton>
        </section>
      </BottomBannerContext>
    </Presence>
  );
}

export interface BottomBannerPartProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export function BottomBannerContent({
  asChild = false,
  className,
  ...props
}: BottomBannerPartProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-bottom-banner-content
      className={tw("flex min-w-0 flex-1 flex-col gap-1", className)}
      {...props}
    />
  );
}

export function BottomBannerTitle({
  asChild = false,
  className,
  ...props
}: BottomBannerPartProps) {
  const titleId = useContext(BottomBannerContext);
  const Component = asChild ? Slot : "h2";
  return (
    <Component
      id={titleId}
      data-bottom-banner-title
      className={tw(
        "text-(length:--_title-font-size) leading-snug font-(--_title-font-weight) text-(--_title-text)",
        className,
      )}
      {...props}
    />
  );
}

export function BottomBannerDescription({
  asChild = false,
  className,
  ...props
}: BottomBannerPartProps) {
  const Component = asChild ? Slot : "p";
  return (
    <Component
      data-bottom-banner-description
      className={tw(
        "text-sm leading-relaxed text-pretty text-(--_description-text)",
        className,
      )}
      {...props}
    />
  );
}

export function BottomBannerActions({
  asChild = false,
  className,
  ...props
}: BottomBannerPartProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-bottom-banner-actions
      className={tw(
        "flex w-full flex-wrap items-center gap-(--_actions-item-gap) md:w-auto md:shrink-0",
        className,
      )}
      {...props}
    />
  );
}
