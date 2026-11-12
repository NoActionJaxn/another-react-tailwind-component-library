import { tw } from "../../utils";

export type ToggleVariant = "ghost" | "outline";
export type ToggleSize = "sm" | "md" | "lg";

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

/** Shared by Toggle, ToggleGroupItem and Toolbar buttons (all render `data-toggle`). */
export function toggleClassName(size: ToggleSize, className?: string) {
  return tw(
    "inline-flex cursor-pointer items-center justify-center gap-2 border transition-colors",
    "rounded-(--_radius) px-(--_padding-x) py-(--_padding-y) font-(--_font-weight)",
    "border-(--_border) bg-(--_bg) text-(--_text) hover:bg-(--_bg-hover)",
    "data-[state=on]:bg-(--_on-bg) data-[state=on]:text-(--_on-text)",
    "outline-(--_focus-color) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-(--_bg) [&_svg]:size-[1.25em]",
    sizes[size],
    className,
  );
}
