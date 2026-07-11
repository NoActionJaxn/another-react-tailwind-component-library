import { type ReactNode } from "react";
import { Collapsible as RadixCollapsible } from "radix-ui";
import ChevronDown from "../icons/ChevronDown.tsx";
import cn from "../lib/cn.ts";

export type CollapsibleVariant = "default" | string;

export interface CollapsibleProps extends Omit<
  RadixCollapsible.CollapsibleProps,
  "title"
> {
  className?: string;
  title?: ReactNode;
  variant?: CollapsibleVariant;
}

const Collapsible = ({
  children,
  className,
  title,
  variant = "default",
  ...rest
}: CollapsibleProps) => {
  return (
    <RadixCollapsible.Root
      className={cn("another-collapsible", className)}
      data-variant={variant}
      {...rest}
    >
      <RadixCollapsible.Trigger className="another-collapsible-trigger">
        <span>{title}</span>
        <span className="another-collapsible-icon">
          <ChevronDown />
        </span>
      </RadixCollapsible.Trigger>
      <RadixCollapsible.Content className="another-collapsible-content">
        <div className="another-collapsible-content-inner">{children}</div>
      </RadixCollapsible.Content>
    </RadixCollapsible.Root>
  );
};

Collapsible.displayName = "Collapsible";

export default Collapsible;
