import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import * as PasswordToggleField from "@radix-ui/react-password-toggle-field";
import { useId, useState, type ReactNode } from "react";
import { InputField, type InputFieldProps } from "../TextInput/InputField";

export type PasswordInputAutoComplete = "current-password" | "new-password";
export interface PasswordInputProps extends Omit<
  InputFieldProps,
  "type" | "autoComplete"
> {
  autoComplete?: PasswordInputAutoComplete;
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  visibleIcon?: ReactNode;
  hiddenIcon?: ReactNode;
  showLabel?: string;
  hideLabel?: string;
  hideToggle?: boolean;
}

const toggle =
  "-me-(--_toggle-inset) flex size-(--_toggle-size) shrink-0 cursor-pointer items-center justify-center rounded-xs text-(--_icon) transition-colors hover:bg-(--_toggle-bg-hover) hover:text-(--_icon-focus) focus-visible:bg-(--_toggle-bg-hover) focus-visible:text-(--_icon-focus) focus-visible:outline-none disabled:cursor-not-allowed disabled:hover:bg-transparent [&_svg]:size-(--_toggle-icon-size)";

export function PasswordInput({
  autoComplete = "current-password",
  visible: visibleProp,
  defaultVisible = false,
  onVisibilityChange,
  visibleIcon,
  hiddenIcon,
  showLabel = "Show password",
  hideLabel = "Hide password",
  hideToggle = false,
  id,
  ...props
}: PasswordInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [visibleState, setVisibleState] = useState(defaultVisible);
  const visible = visibleProp ?? visibleState;

  return (
    <PasswordToggleField.Root
      id={inputId}
      visible={visible}
      onVisibilityChange={(next) => {
        setVisibleState(next);
        onVisibilityChange?.(next);
      }}
    >
      <InputField
        inputAs={PasswordToggleField.Input}
        boxData="password-input"
        id={inputId}
        autoComplete={autoComplete}
        trailing={
          !hideToggle && (
            // Radix gives the toggle the input's id unless it has its own.
            <PasswordToggleField.Toggle
              id={`${inputId}-toggle`}
              aria-label={visible ? hideLabel : showLabel}
              disabled={props.disabled}
              className={toggle}
            >
              {visible
                ? (visibleIcon ?? <EyeOpenIcon aria-hidden />)
                : (hiddenIcon ?? <EyeClosedIcon aria-hidden />)}
            </PasswordToggleField.Toggle>
          )
        }
        {...props}
      />
    </PasswordToggleField.Root>
  );
}
