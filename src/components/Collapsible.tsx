import React from "react";
import classNames from "classnames";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import ChevronIcon from "../icons/ChevronIcon";

export interface CollapsibleProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
}

function Collapsible({
  title,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  disabled,
  className,
}: CollapsibleProps) {
  return (
    <CollapsiblePrimitive.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      disabled={disabled}
      className={classNames("w-full", className)}
    >
      <CollapsiblePrimitive.Trigger
        className={classNames(
          "group flex w-full items-center justify-between rounded-md px-4 py-3",
          "bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200",
          "text-left font-medium text-neutral-900",
          "focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        <span>{title}</span>
        <ChevronIcon
          className={classNames(
            "h-4 w-4 text-neutral-500 transition-transform duration-300 ease-out",
            "group-data-[state=open]:rotate-180"
          )}
        />
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content
        className={classNames(
          "overflow-hidden",
          "data-[state=open]:animate-collapsible-down",
          "data-[state=closed]:animate-collapsible-up"
        )}
      >
        <div className="px-4 py-3 text-neutral-700">
          {children}
        </div>
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
}

Collapsible.displayName = "Collapsible";

export default Collapsible;
