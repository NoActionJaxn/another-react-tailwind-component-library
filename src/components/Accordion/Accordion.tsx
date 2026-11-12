import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";

export type AccordionProps = ComponentProps<typeof AccordionPrimitive.Root> & {
  colorScheme?: ColorScheme;
};

export function Accordion({
  colorScheme,
  className,
  style,
  ...props
}: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      data-accordion
      style={schemeStyle(colorScheme, style)}
      className={tw("w-full text-(--_text)", className)}
      {...props}
    />
  );
}

export function AccordionItem({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={tw("border-b border-(--_border)", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={tw(
          "group flex flex-1 cursor-pointer items-center justify-between gap-4 py-(--_padding-y) text-left font-(--_font-weight) outline-(--_focus-color) hover:underline focus-visible:outline-2 focus-visible:outline-solid disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-(--_duration) group-data-[state=open]:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-accordion-content
      className="overflow-hidden text-sm text-(--_content-text)"
      {...props}
    >
      <div className={tw("pb-(--_padding-y)", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
