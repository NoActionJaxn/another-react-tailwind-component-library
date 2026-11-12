import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { createContext, useContext, type ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import {
  toggleClassName,
  type ToggleSize,
  type ToggleVariant,
} from "../Toggle/classes";

const GroupContext = createContext<{
  variant: ToggleVariant;
  size: ToggleSize;
}>({
  variant: "ghost",
  size: "md",
});

export type ToggleGroupProps = ComponentProps<
  typeof ToggleGroupPrimitive.Root
> & {
  /** Applied to every item. Items use the Toggle variables. */
  variant?: ToggleVariant;
  size?: ToggleSize;
  colorScheme?: ColorScheme;
};

export function ToggleGroup({
  variant = "ghost",
  size = "md",
  colorScheme,
  className,
  style,
  ...props
}: ToggleGroupProps) {
  return (
    <GroupContext value={{ variant, size }}>
      <ToggleGroupPrimitive.Root
        style={schemeStyle(colorScheme, style)}
        className={tw(
          "flex w-fit items-center gap-1 data-[orientation=vertical]:flex-col",
          className,
        )}
        {...props}
      />
    </GroupContext>
  );
}

export function ToggleGroupItem({
  className,
  ...props
}: ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  const { variant, size } = useContext(GroupContext);
  return (
    <ToggleGroupPrimitive.Item
      data-toggle
      data-variant={variant}
      data-size={size}
      className={toggleClassName(size, className)}
      {...props}
    />
  );
}
