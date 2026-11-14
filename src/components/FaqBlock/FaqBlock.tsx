import { Slot } from "@radix-ui/react-slot";
import { useId, type HTMLAttributes, type ReactNode } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../Accordion";
import { Container } from "../Container";

export type FaqBlockVariant = "ghost" | "soft";
export type FaqBlockLayout = "stacked" | "split";
export interface FaqBlockProps extends HTMLAttributes<HTMLElement> {
  variant?: FaqBlockVariant;
  layout?: FaqBlockLayout;
  block?: boolean;
  colorScheme?: ColorScheme;
}

export function FaqBlock({
  variant = "ghost",
  layout = "stacked",
  block = false,
  colorScheme,
  className,
  style,
  children,
  ...props
}: FaqBlockProps) {
  return (
    <section
      data-faq-block
      data-variant={variant}
      data-layout={layout}
      style={schemeStyle(colorScheme, style)}
      className={tw(
        "group/faq bg-(--_bg) py-(--_padding-y) text-(--_text)",
        className,
      )}
      {...props}
    >
      <Container
        block={block}
        className={tw(
          "grid gap-(--_gap)",
          layout === "split"
            ? "items-start md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
            : "justify-items-center",
        )}
      >
        {children}
      </Container>
    </section>
  );
}

export interface FaqBlockPartProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export function FaqBlockHeader({
  asChild = false,
  className,
  ...props
}: FaqBlockPartProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-faq-block-header
      className={tw(
        "flex max-w-(--_header-max-width) flex-col gap-(--_header-gap) group-data-[layout=stacked]/faq:items-center group-data-[layout=stacked]/faq:text-center",
        className,
      )}
      {...props}
    />
  );
}

export function FaqBlockTitle({
  asChild = false,
  className,
  ...props
}: FaqBlockPartProps) {
  const Component = asChild ? Slot : "h2";
  return (
    <Component
      data-faq-block-title
      className={tw(
        "text-(length:--_title-font-size) leading-tight font-(--_title-font-weight) tracking-tight text-balance text-(--_title-text)",
        className,
      )}
      {...props}
    />
  );
}

export function FaqBlockDescription({
  asChild = false,
  className,
  ...props
}: FaqBlockPartProps) {
  const Component = asChild ? Slot : "p";
  return (
    <Component
      data-faq-block-description
      className={tw(
        "text-(length:--_description-font-size) leading-relaxed text-pretty text-(--_description-text)",
        className,
      )}
      {...props}
    />
  );
}

export interface FaqBlockListProps extends HTMLAttributes<HTMLDivElement> {
  multiple?: boolean;
  defaultValue?: string[];
}

/** The questions: an Accordion. One answer is open at a time unless multiple is set. */
export function FaqBlockList({
  multiple = false,
  defaultValue,
  className,
  dir,
  ...props
}: FaqBlockListProps) {
  const shared = {
    "data-faq-block-list": "",
    dir: dir as "ltr" | "rtl" | undefined,
    className: tw("w-full max-w-(--_list-max-width) border-t", className),
    ...props,
  };
  return multiple ? (
    <Accordion type="multiple" defaultValue={defaultValue} {...shared} />
  ) : (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultValue?.[0]}
      {...shared}
    />
  );
}

export interface FaqBlockItemProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  question: ReactNode;
  value?: string;
}

export function FaqBlockItem({
  question,
  value,
  children,
  ...props
}: FaqBlockItemProps) {
  const autoValue = useId();
  return (
    <AccordionItem data-faq-block-item value={value ?? autoValue} {...props}>
      <AccordionTrigger className="text-(length:--_question-font-size)">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-(length:--_answer-font-size) leading-relaxed text-pretty">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

export function FaqBlockFooter({
  asChild = false,
  className,
  ...props
}: FaqBlockPartProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-faq-block-footer
      className={tw(
        "text-sm text-(--_description-text) group-data-[layout=stacked]/faq:text-center group-data-[layout=split]/faq:md:col-start-2",
        className,
      )}
      {...props}
    />
  );
}
