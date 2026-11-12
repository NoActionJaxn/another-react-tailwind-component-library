import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";

export interface NavigationMenuProps extends ComponentProps<
  typeof NavigationMenuPrimitive.Root
> {
  colorScheme?: ColorScheme;
}

/** Renders the viewport that holds open content below the list. */
export function NavigationMenu({
  colorScheme,
  className,
  style,
  children,
  ...props
}: NavigationMenuProps) {
  return (
    <NavigationMenuPrimitive.Root
      data-navigation-menu
      style={schemeStyle(colorScheme, style)}
      className={tw(
        "relative z-10 flex max-w-max flex-1 items-center justify-center text-(--_text)",
        className,
      )}
      {...props}
    >
      {children}
      <div className="absolute top-full left-0 flex justify-center">
        <NavigationMenuPrimitive.Viewport className="relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-(--radix-navigation-menu-viewport-width) origin-top overflow-hidden rounded-(--_radius) border border-(--_border) bg-(--_bg) shadow-(--_shadow)" />
      </div>
    </NavigationMenuPrimitive.Root>
  );
}

export function NavigationMenuList({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      className={tw(
        "flex flex-1 list-none items-center justify-center gap-1",
        className,
      )}
      {...props}
    />
  );
}

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      className={tw(
        "group inline-flex cursor-pointer items-center gap-1 rounded-(--_item-radius) px-3 py-2 text-sm font-medium outline-(--_focus-color) transition-colors hover:bg-(--_item-hover-bg) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid data-[state=open]:bg-(--_item-hover-bg)",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        aria-hidden
        className="size-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      className={tw("absolute top-0 left-0 w-max p-2", className)}
      {...props}
    />
  );
}

export function NavigationMenuLink({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      className={tw(
        "block cursor-pointer rounded-(--_item-radius) px-3 py-2 text-sm font-medium outline-(--_focus-color) transition-colors hover:bg-(--_item-hover-bg) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid data-active:font-semibold",
        className,
      )}
      {...props}
    />
  );
}
