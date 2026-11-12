import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";
import * as Primitive from "@radix-ui/react-menubar";
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

export const MenubarMenu = Primitive.Menu;
export const MenubarGroup = Primitive.Group;
export const MenubarRadioGroup = Primitive.RadioGroup;
export const MenubarSub = Primitive.Sub;

export function Menubar({
  colorScheme,
  className,
  style,
  ...props
}: ComponentProps<typeof Primitive.Root> & { colorScheme?: ColorScheme }) {
  return (
    <Primitive.Root
      data-menubar
      style={schemeStyle(colorScheme, style)}
      className={tw(
        "flex w-fit items-center gap-1 rounded-(--_radius) border border-(--_border) bg-(--_bg) p-1",
        className,
      )}
      {...props}
    />
  );
}

export function MenubarTrigger({
  className,
  ...props
}: ComponentProps<typeof Primitive.Trigger>) {
  return (
    <Primitive.Trigger
      className={tw(
        "flex cursor-pointer items-center rounded-(--_trigger-radius) px-3 py-1.5 text-sm font-medium text-(--_text) outline-none select-none data-highlighted:bg-(--_trigger-active-bg) data-[state=open]:bg-(--_trigger-active-bg)",
        className,
      )}
      {...props}
    />
  );
}

export interface MenubarContentProps extends ComponentProps<
  typeof Primitive.Content
> {
  /** Content renders in a portal, so it can't inherit a scheme from the trigger's parents. */
  colorScheme?: ColorScheme;
}

export function MenubarContent({
  colorScheme,
  sideOffset = 4,
  className,
  style,
  ...props
}: MenubarContentProps) {
  return (
    <Primitive.Portal>
      <Primitive.Content
        data-menu-content
        sideOffset={sideOffset}
        style={schemeStyle(colorScheme, style)}
        className={tw(menuContent, className)}
        {...props}
      />
    </Primitive.Portal>
  );
}

export function MenubarItem({
  className,
  ...props
}: ComponentProps<typeof Primitive.Item>) {
  return <Primitive.Item className={tw(menuItem, className)} {...props} />;
}

export function MenubarCheckboxItem({
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

export function MenubarRadioItem({
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

export function MenubarLabel({
  className,
  ...props
}: ComponentProps<typeof Primitive.Label>) {
  return <Primitive.Label className={tw(menuLabel, className)} {...props} />;
}

export function MenubarSeparator({
  className,
  ...props
}: ComponentProps<typeof Primitive.Separator>) {
  return (
    <Primitive.Separator className={tw(menuSeparator, className)} {...props} />
  );
}

export function MenubarShortcut({
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

export function MenubarSubTrigger({
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

export function MenubarSubContent({
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
