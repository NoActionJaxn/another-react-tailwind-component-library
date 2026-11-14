import { ChevronRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Slot } from "@radix-ui/react-slot";
import {
  Children,
  Fragment,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { Anchor, type AnchorProps } from "../Anchor";

export type BreadcrumbSize = "sm" | "md" | "lg";
export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  size?: BreadcrumbSize;
  separator?: ReactNode;
  maxItems?: number;
  expandLabel?: string;
  colorScheme?: ColorScheme;
}

const sizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function Breadcrumb({
  size = "md",
  separator,
  maxItems,
  expandLabel = "Show all breadcrumbs",
  colorScheme,
  "aria-label": ariaLabel = "Breadcrumb",
  className,
  style,
  children,
  ...props
}: BreadcrumbProps) {
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  // The expand button disappears: move focus to the first item it revealed.
  useEffect(() => {
    if (!expanded) return;
    listRef.current
      ?.querySelectorAll("[data-breadcrumb-item]")[1]
      ?.querySelector<HTMLElement>("a, button, [tabindex]")
      ?.focus();
  }, [expanded]);
  const items = Children.toArray(children);
  // Collapsed: the first item, an expand button, then the last maxItems - 1.
  const collapse =
    !expanded && maxItems != null && maxItems > 1 && items.length > maxItems;
  const shown: ReactNode[] = collapse
    ? [
        items[0],
        <li key="ellipsis" className="flex items-center">
          <button
            type="button"
            aria-label={expandLabel}
            onClick={() => setExpanded(true)}
            className="flex cursor-pointer items-center rounded-(--_radius) px-1 text-(--_text) outline-(--_focus-color) transition-colors hover:bg-(--_ellipsis-bg-hover) hover:text-(--_current) focus:outline-(length:--_focus-width) focus:outline-solid"
          >
            <DotsHorizontalIcon aria-hidden />
          </button>
        </li>,
        ...items.slice(items.length - (maxItems - 1)),
      ]
    : items;

  return (
    <nav
      data-breadcrumb
      data-size={size}
      aria-label={ariaLabel}
      style={schemeStyle(colorScheme, style)}
      className={className}
      {...props}
    >
      <ol
        ref={listRef}
        className={tw(
          "flex flex-wrap items-center gap-(--_gap) text-(--_text)",
          sizes[size],
        )}
      >
        {shown.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && (
              <li
                role="presentation"
                aria-hidden
                className="flex items-center text-(--_separator) [&_svg]:size-(--_separator-size) rtl:[&_svg]:-scale-x-100"
              >
                {separator ?? <ChevronRightIcon />}
              </li>
            )}
            {item}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

export function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-breadcrumb-item
      className={tw("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

export function BreadcrumbLink({ underline = "hover", ...props }: AnchorProps) {
  return <Anchor underline={underline} {...props} />;
}

export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
}

export function BreadcrumbPage({
  asChild = false,
  className,
  ...props
}: BreadcrumbPageProps) {
  const Component = asChild ? Slot : "span";
  return (
    <Component
      data-breadcrumb-page
      aria-current="page"
      className={tw(
        "font-(--_current-font-weight) text-(--_current)",
        className,
      )}
      {...props}
    />
  );
}
