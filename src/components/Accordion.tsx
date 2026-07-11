import { type ReactNode } from "react";
import { Accordion as RadixAccordion } from "radix-ui";
import ChevronDown from "../icons/ChevronDown.tsx";
import cn from "../lib/cn.ts";

export type AccordionVariant = "default" | string;

export interface AccordionItem {
  content: ReactNode;
  disabled?: boolean;
  title: ReactNode;
  value?: string;
}

export interface AccordionProps {
  className?: string;
  defaultValue?: string | string[];
  items?: AccordionItem[];
  multiple?: boolean;
  onValueChange?: (value: string | string[]) => void;
  value?: string | string[];
  variant?: AccordionVariant;
}

const Accordion = ({
  className,
  defaultValue,
  items = [],
  multiple = false,
  onValueChange,
  value,
  variant = "default",
}: AccordionProps) => {
  const rootProps = multiple
    ? {
        type: "multiple" as const,
        defaultValue: defaultValue as string[] | undefined,
        value: value as string[] | undefined,
        onValueChange: onValueChange as ((value: string[]) => void) | undefined,
      }
    : {
        type: "single" as const,
        collapsible: true,
        defaultValue: defaultValue as string | undefined,
        value: value as string | undefined,
        onValueChange: onValueChange as ((value: string) => void) | undefined,
      };

  return (
    <RadixAccordion.Root
      {...rootProps}
      className={cn("another-accordion", className)}
      data-variant={variant}
    >
      {items.map((item, index) => {
        const itemValue = item.value ?? String(index);

        return (
          <RadixAccordion.Item
            key={itemValue}
            value={itemValue}
            disabled={item.disabled}
            className="another-accordion-item"
          >
            <RadixAccordion.Header className="another-accordion-header">
              <RadixAccordion.Trigger className="another-accordion-trigger">
                <span>{item.title}</span>
                <span className="another-accordion-icon">
                  <ChevronDown />
                </span>
              </RadixAccordion.Trigger>
            </RadixAccordion.Header>
            <RadixAccordion.Content className="another-accordion-content">
              <div className="another-accordion-content-inner">
                {item.content}
              </div>
            </RadixAccordion.Content>
          </RadixAccordion.Item>
        );
      })}
    </RadixAccordion.Root>
  );
};

Accordion.displayName = "Accordion";

export default Accordion;
