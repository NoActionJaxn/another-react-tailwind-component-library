import { useContext, type ComponentProps, type ReactNode } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { ListContext } from "./context";

export type ListSize = "sm" | "md" | "lg";
export type UnorderedListMarker = "disc" | "circle" | "square" | "none";
export type OrderedListMarker =
  | "decimal"
  | "decimal-leading-zero"
  | "lower-alpha"
  | "upper-alpha"
  | "lower-roman"
  | "upper-roman";

interface SharedListProps {
  size?: ListSize;
  colorScheme?: ColorScheme;
}

export interface UnorderedListProps
  extends SharedListProps, ComponentProps<"ul"> {
  marker?: UnorderedListMarker;
  icon?: ReactNode;
}

export interface OrderedListProps
  extends SharedListProps, ComponentProps<"ol"> {
  marker?: OrderedListMarker;
}

export interface ListItemProps extends ComponentProps<"li"> {
  icon?: ReactNode;
}

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const markers = {
  disc: "list-disc",
  circle: "list-[circle]",
  square: "list-[square]",
  none: "list-none",
  decimal: "list-decimal",
  "decimal-leading-zero": "list-[decimal-leading-zero]",
  "lower-alpha": "list-[lower-alpha]",
  "upper-alpha": "list-[upper-alpha]",
  "lower-roman": "list-[lower-roman]",
  "upper-roman": "list-[upper-roman]",
};

const list =
  "ps-(--_indent) leading-(--_line-height) text-(--_text) marker:text-(--_marker) [&>li+li]:mt-(--_gap)";

export function UnorderedList({
  marker = "disc",
  icon,
  size: sizeProp,
  colorScheme,
  className,
  style,
  children,
  ...props
}: UnorderedListProps) {
  // Nested lists take the parent's size unless they set one.
  const parent = useContext(ListContext);
  const size = sizeProp ?? parent.size ?? "md";
  const withIcon = icon != null;
  return (
    <ListContext value={{ size, icon }}>
      <ul
        data-list
        data-size={size}
        style={schemeStyle(colorScheme, style)}
        className={tw(
          list,
          sizes[size],
          withIcon ? "list-none ps-0" : markers[marker],
          marker === "none" && "ps-0",
          className,
        )}
        {...props}
      >
        {children}
      </ul>
    </ListContext>
  );
}

export function OrderedList({
  marker = "decimal",
  size: sizeProp,
  colorScheme,
  className,
  style,
  children,
  ...props
}: OrderedListProps) {
  const parent = useContext(ListContext);
  const size = sizeProp ?? parent.size ?? "md";
  return (
    <ListContext value={{ size }}>
      <ol
        data-list
        data-size={size}
        style={schemeStyle(colorScheme, style)}
        className={tw(list, sizes[size], markers[marker], className)}
        {...props}
      >
        {children}
      </ol>
    </ListContext>
  );
}

export function ListItem({
  icon: iconProp,
  className,
  children,
  ...props
}: ListItemProps) {
  const context = useContext(ListContext);
  const icon = iconProp ?? context.icon;

  if (icon == null) {
    return (
      <li
        data-list-item
        className={tw("ps-(--_marker-gap)", className)}
        {...props}
      >
        {children}
      </li>
    );
  }

  // The icon replaces the marker: a one-line-high box keeps it on the first line.
  return (
    <li
      data-list-item
      className={tw("flex list-none gap-(--_icon-gap)", className)}
      {...props}
    >
      <span
        aria-hidden
        className="flex h-lh shrink-0 items-center text-(--_marker) [&_svg]:size-(--_icon-size)"
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </li>
  );
}
