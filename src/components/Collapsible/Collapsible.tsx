import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import type { ComponentProps } from "react";

/** Unstyled: style the trigger and content yourself. Content animates its height. */
export const Collapsible = CollapsiblePrimitive.Root;
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

export function CollapsibleContent(
  props: ComponentProps<typeof CollapsiblePrimitive.Content>,
) {
  return <CollapsiblePrimitive.Content data-collapsible-content {...props} />;
}
