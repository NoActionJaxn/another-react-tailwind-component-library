import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import {
  menuContent,
  menuIndicator,
  menuIndicatorItem,
  menuLabel,
  menuSeparator,
} from "../_menu/classes";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export type SelectVariant = "outline" | "soft" | "ghost";
export type SelectSize = "sm" | "md" | "lg";
export interface SelectTriggerProps extends ComponentProps<
  typeof SelectPrimitive.Trigger
> {
  variant?: SelectVariant;
  colorScheme?: ColorScheme;
  size?: SelectSize;
}

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function SelectTrigger({
  variant = "outline",
  colorScheme,
  size = "md",
  className,
  style,
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-select
      data-variant={variant}
      data-size={size}
      style={schemeStyle(colorScheme, style)}
      className={tw(
        "flex w-full min-w-0 cursor-pointer items-center justify-between gap-(--_gap) border text-left transition-colors",
        "rounded-(--_radius) px-(--_padding-x) py-(--_padding-y)",
        "font-(family-name:--_font-family) font-(--_font-weight)",
        "border-(--_border) bg-(--_bg) text-(--_text) data-placeholder:text-(--_placeholder)",
        "hover:border-(--_border-hover) hover:bg-(--_bg-hover)",
        "outline-(--_focus-color) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-(--_border) disabled:hover:bg-(--_bg)",
        "[&>span]:truncate",
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-[1.25em] shrink-0 opacity-70" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export interface SelectContentProps extends ComponentProps<
  typeof SelectPrimitive.Content
> {
  /** Content renders in a portal, so it can't inherit a scheme from the trigger's parents. */
  colorScheme?: ColorScheme;
}

const scrollButton =
  "flex cursor-default items-center justify-center py-1 [&_svg]:size-4";

export function SelectContent({
  colorScheme,
  position = "popper",
  sideOffset = 4,
  className,
  style,
  children,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-menu-content
        position={position}
        sideOffset={position === "popper" ? sideOffset : undefined}
        style={schemeStyle(colorScheme, style)}
        className={tw(
          menuContent,
          "max-h-(--radix-select-content-available-height) data-[side]:min-w-(--radix-select-trigger-width)",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className={scrollButton}>
          <ChevronUpIcon />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className={scrollButton}>
          <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={tw(menuIndicatorItem, className)}
      {...props}
    >
      <SelectPrimitive.ItemIndicator className={menuIndicator}>
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export function SelectLabel({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label className={tw(menuLabel, className)} {...props} />
  );
}

export function SelectSeparator({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={tw(menuSeparator, className)}
      {...props}
    />
  );
}
