import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";

export interface TabsProps extends ComponentProps<typeof TabsPrimitive.Root> {
  colorScheme?: ColorScheme;
}

export function Tabs({ colorScheme, className, style, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-tabs
      style={schemeStyle(colorScheme, style)}
      className={tw(
        "flex flex-col gap-(--_gap) data-[orientation=vertical]:flex-row",
        className,
      )}
      {...props}
    />
  );
}

export function TabsList({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={tw(
        "inline-flex w-fit items-center gap-1 rounded-(--_list-radius) bg-(--_list-bg) p-(--_list-padding) data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={tw(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-(--_trigger-radius) px-3 py-1.5 text-sm font-medium text-(--_trigger-text) outline-(--_focus-color) transition-colors hover:text-(--_trigger-active-text) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid disabled:cursor-not-allowed disabled:opacity-50 data-[state=active]:bg-(--_trigger-active-bg) data-[state=active]:text-(--_trigger-active-text) data-[state=active]:shadow-sm [&_svg]:size-4",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={tw(
        "text-sm outline-(--_focus-color) focus-visible:outline-2 focus-visible:outline-solid",
        className,
      )}
      {...props}
    />
  );
}
