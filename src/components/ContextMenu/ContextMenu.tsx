import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";
import * as Primitive from "@radix-ui/react-context-menu";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import {
  menuContent,
  menuIndicator,
  menuIndicatorItem,
  menuItem,
  menuLabel,
  menuSeparator,
} from "../_menu/classes";

export const ContextMenu = Primitive.Root;
export const ContextMenuTrigger = Primitive.Trigger;
export const ContextMenuGroup = Primitive.Group;
export const ContextMenuRadioGroup = Primitive.RadioGroup;
export const ContextMenuSub = Primitive.Sub;

export interface ContextMenuContentProps extends ComponentProps<
  typeof Primitive.Content
> {
  /** Content renders in a portal, so it can't inherit a scheme from the trigger's parents. */
  colorScheme?: ColorScheme;
}

export function ContextMenuContent({
  colorScheme,
  className,
  style,
  ...props
}: ContextMenuContentProps) {
  return (
    <Primitive.Portal>
      <Primitive.Content
        data-menu-content
        style={schemeStyle(colorScheme, style)}
        className={tw(menuContent, className)}
        {...props}
      />
    </Primitive.Portal>
  );
}

export function ContextMenuItem({
  className,
  ...props
}: ComponentProps<typeof Primitive.Item>) {
  return <Primitive.Item className={tw(menuItem, className)} {...props} />;
}

export function ContextMenuCheckboxItem({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.CheckboxItem>) {
  return (
    <Primitive.CheckboxItem
      className={tw(menuIndicatorItem, className)}
      {...props}
    >
      <Primitive.ItemIndicator className={menuIndicator}>
        <CheckIcon />
      </Primitive.ItemIndicator>
      {children}
    </Primitive.CheckboxItem>
  );
}

export function ContextMenuRadioItem({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.RadioItem>) {
  return (
    <Primitive.RadioItem
      className={tw(menuIndicatorItem, className)}
      {...props}
    >
      <Primitive.ItemIndicator className={menuIndicator}>
        <DotFilledIcon />
      </Primitive.ItemIndicator>
      {children}
    </Primitive.RadioItem>
  );
}

export function ContextMenuLabel({
  className,
  ...props
}: ComponentProps<typeof Primitive.Label>) {
  return <Primitive.Label className={tw(menuLabel, className)} {...props} />;
}

export function ContextMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof Primitive.Separator>) {
  return (
    <Primitive.Separator className={tw(menuSeparator, className)} {...props} />
  );
}

export function ContextMenuShortcut({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={tw("ml-auto pl-4 text-xs text-(--_label-text)", className)}
      {...props}
    />
  );
}

export function ContextMenuSubTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.SubTrigger>) {
  return (
    <Primitive.SubTrigger className={tw(menuItem, className)} {...props}>
      {children}
      <ChevronRightIcon className="ml-auto" />
    </Primitive.SubTrigger>
  );
}

export function ContextMenuSubContent({
  colorScheme,
  className,
  style,
  ...props
}: ComponentProps<typeof Primitive.SubContent> & {
  colorScheme?: ColorScheme;
}) {
  return (
    <Primitive.Portal>
      <Primitive.SubContent
        data-menu-content
        style={schemeStyle(colorScheme, style)}
        className={tw(menuContent, className)}
        {...props}
      />
    </Primitive.Portal>
  );
}
