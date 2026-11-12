export const menuContent =
  "z-50 min-w-32 overflow-hidden border border-(--_border) bg-(--_bg) p-(--_padding) text-sm text-(--_text) shadow-(--_shadow) rounded-(--_radius)";

export const menuItem =
  "relative flex cursor-pointer items-center gap-2 rounded-(--_item-radius) px-(--_item-padding-x) py-(--_item-padding-y) outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-(--_item-highlight-bg) data-[state=open]:bg-(--_item-highlight-bg) [&_svg]:size-4 [&_svg]:shrink-0";

/** Checkbox/radio items leave room for the indicator on the left. */
export const menuIndicatorItem = `${menuItem} pl-8`;

export const menuIndicator =
  "absolute left-2 flex size-4 items-center justify-center";

export const menuLabel =
  "px-(--_item-padding-x) py-(--_item-padding-y) text-xs font-semibold text-(--_label-text)";

export const menuSeparator = "-mx-(--_padding) my-1 h-px bg-(--_separator)";
