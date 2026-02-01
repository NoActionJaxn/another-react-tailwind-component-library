import classNames from "classnames";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import ChevronIcon from "../icons/ChevronIcon";

export type AccordionType = "single" | "multiple";

export interface AccordionItem {
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: AccordionType;
  defaultValue?: string | string[];
  collapsible?: boolean;
  className?: string;
}

function Accordion({
  items,
  type = "single",
  defaultValue,
  collapsible = true,
  className,
}: AccordionProps) {
  const rootProps = type === "single"
    ? {
      type: "single" as const,
      defaultValue: defaultValue as string | undefined,
      collapsible,
    }
    : {
      type: "multiple" as const,
      defaultValue: defaultValue as string[] | undefined,
    };

  const rootStyles = classNames(
    "w-full divide-y divide-neutral-200 rounded-md border border-neutral-200",
    className
  );

  const itemStyles = "group/item overflow-hidden first:rounded-t-md last:rounded-b-md";

  const triggerStyles = `
    group flex flex-1 items-center justify-between px-4 py-3 text-left transition-colors cursor-pointer
    hover:bg-neutral-100 focus:outline-none focus:ring-4 focus:ring-primary-500/50 focus:ring-inset
    disabled:cursor-not-allowed disabled:opacity-50
    data-[state=open]:bg-neutral-50
    group-first/item:rounded-t-md group-last/item:group-data-[state=closed]:rounded-b-md
  `;

  const contentStyles = "overflow-hidden text-sm data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up";

  const chevronStyles = "h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 group-data-[state=open]:rotate-180";

  return (
    <AccordionPrimitive.Root className={rootStyles} {...rootProps}>
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className={itemStyles}
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className={triggerStyles}>
              {item.title}
              <ChevronIcon className={chevronStyles} />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content
            className={contentStyles}
          >
            <div className="px-4 py-3 bg-neutral-50/50">
              {item.content}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

Accordion.displayName = "Accordion";

export default Accordion;