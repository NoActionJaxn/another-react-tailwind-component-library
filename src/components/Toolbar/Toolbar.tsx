import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { createContext, useContext, type ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { toggleClassName, type ToggleSize } from "../Toggle/classes";

const SizeContext = createContext<ToggleSize>("sm");

export type ToolbarProps = ComponentProps<typeof ToolbarPrimitive.Root> & {
  colorScheme?: ColorScheme;
  size?: ToggleSize;
};

export function Toolbar({
  colorScheme,
  size = "sm",
  className,
  style,
  ...props
}: ToolbarProps) {
  return (
    <SizeContext value={size}>
      <ToolbarPrimitive.Root
        data-toolbar
        style={schemeStyle(colorScheme, style)}
        className={tw(
          "flex w-fit items-center gap-1 rounded-(--_radius) border border-(--_border) bg-(--_bg) p-1 data-[orientation=vertical]:flex-col",
          className,
        )}
        {...props}
      />
    </SizeContext>
  );
}

export function ToolbarButton({
  className,
  ...props
}: ComponentProps<typeof ToolbarPrimitive.Button>) {
  const size = useContext(SizeContext);
  return (
    <ToolbarPrimitive.Button
      data-toggle
      data-variant="ghost"
      data-size={size}
      className={toggleClassName(size, className)}
      {...props}
    />
  );
}

export function ToolbarLink({
  className,
  ...props
}: ComponentProps<typeof ToolbarPrimitive.Link>) {
  return (
    <ToolbarPrimitive.Link
      className={tw(
        "px-2 text-sm text-(--_link-text) underline-offset-4 hover:underline",
        className,
      )}
      {...props}
    />
  );
}

export function ToolbarSeparator({
  className,
  ...props
}: ComponentProps<typeof ToolbarPrimitive.Separator>) {
  return (
    <ToolbarPrimitive.Separator
      className={tw(
        "mx-1 w-px self-stretch bg-(--_separator) data-[orientation=vertical]:mx-0 data-[orientation=vertical]:my-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-auto",
        className,
      )}
      {...props}
    />
  );
}

export function ToolbarToggleGroup({
  className,
  ...props
}: ComponentProps<typeof ToolbarPrimitive.ToggleGroup>) {
  return (
    <ToolbarPrimitive.ToggleGroup
      className={tw("flex items-center gap-1", className)}
      {...props}
    />
  );
}

export function ToolbarToggleItem({
  className,
  ...props
}: ComponentProps<typeof ToolbarPrimitive.ToggleItem>) {
  const size = useContext(SizeContext);
  return (
    <ToolbarPrimitive.ToggleItem
      data-toggle
      data-variant="ghost"
      data-size={size}
      className={toggleClassName(size, className)}
      {...props}
    />
  );
}
