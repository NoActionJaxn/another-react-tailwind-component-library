import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import type { MouseEvent, ReactNode } from "react";
import { InputField, type InputFieldProps } from "../TextInput/InputField";

export interface NumberInputProps extends Omit<InputFieldProps, "type"> {
  incrementIcon?: ReactNode;
  decrementIcon?: ReactNode;
  incrementLabel?: string;
  decrementLabel?: string;
  hideSteppers?: boolean;
}

// Steps like the browser's own spinner (respecting min, max and step), then
// fires an input event so React's onChange runs.
function step(event: MouseEvent<HTMLButtonElement>, direction: 1 | -1) {
  const input = event.currentTarget
    .closest("[data-text-input]")
    ?.querySelector("input");
  if (!input || input.disabled || input.readOnly) return;
  try {
    if (direction === 1) input.stepUp();
    else input.stepDown();
  } catch {
    // step="any" can't be stepped natively: fall back to steps of 1.
    input.value = String((Number(input.value) || 0) + direction);
  }
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.focus();
}

const stepper =
  "flex h-1/2 w-(--_stepper-width) cursor-pointer items-center justify-center rounded-xs text-(--_icon) transition-colors hover:bg-(--_stepper-bg-hover) hover:text-(--_icon-focus) disabled:cursor-not-allowed disabled:hover:bg-transparent [&_svg]:size-(--_stepper-icon-size)";

export function NumberInput({
  incrementIcon,
  decrementIcon,
  incrementLabel = "Increase",
  decrementLabel = "Decrease",
  hideSteppers = false,
  ...props
}: NumberInputProps) {
  return (
    <InputField
      type="number"
      boxData="number-input"
      // Hides the browser's spinner; the steppers below replace it.
      inputClassName="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      trailing={
        !hideSteppers && (
          // Out of the tab order: the input already steps with the arrow keys.
          <span className="-me-(--_stepper-inset) flex h-(--_stepper-height) shrink-0 flex-col">
            <button
              type="button"
              tabIndex={-1}
              aria-label={incrementLabel}
              disabled={props.disabled}
              onClick={(event) => step(event, 1)}
              className={stepper}
            >
              {incrementIcon ?? <ChevronUpIcon aria-hidden />}
            </button>
            <button
              type="button"
              tabIndex={-1}
              aria-label={decrementLabel}
              disabled={props.disabled}
              onClick={(event) => step(event, -1)}
              className={stepper}
            >
              {decrementIcon ?? <ChevronDownIcon aria-hidden />}
            </button>
          </span>
        )
      }
      {...props}
    />
  );
}
