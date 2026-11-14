import type { HTMLAttributes } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";
import { ButtonGroupContext } from "../Button/context";
import { InputGroupContext } from "./context";

export type InputGroupSize = "sm" | "md" | "lg";
export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  size?: InputGroupSize;
  colorScheme?: ColorScheme;
  block?: boolean;
}

/** Joins TextInput, NumberInput, SelectTrigger, Button and IconButton into one control. */
export function InputGroup({
  size,
  colorScheme,
  block = false,
  className,
  style,
  ...props
}: InputGroupProps) {
  return (
    <InputGroupContext value={{ size }}>
      <ButtonGroupContext value={{ size }}>
        <div
          data-input-group
          role="group"
          style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
          className={tw(
            "inline-flex flex-row items-stretch *:relative *:shrink-0 *:focus-within:z-20 *:hover:z-10 *:focus:z-20",
            // Text inputs take the free space; number inputs, selects and buttons keep their width.
            "[&>[data-select]]:w-auto [&>[data-text-input]:not([data-number-input])]:min-w-0 [&>[data-text-input]:not([data-number-input])]:flex-1 [&>[data-text-input]:not([data-number-input])]:shrink",
            // Only the outer corners stay rounded. Neighbours overlap by a border
            // width so borders don't double; the hovered or focused one sits on top.
            "*:not-first:-ms-(--_overlap) *:not-first:rounded-s-none *:not-last:rounded-e-none",
            block && "flex w-full",
            className,
          )}
          {...props}
        />
      </ButtonGroupContext>
    </InputGroupContext>
  );
}
