import { cn } from "../util/cn";
import Button, { type ButtonProps } from "./Button";
import type { TextInputProps } from "./TextInput";
import TextInput from "./TextInput";

export interface TextInputWithButtonProps extends Omit<TextInputProps, 'appendElement'> {
  buttonProps?: ButtonProps;
}

const TextInputWithButton = ({ className, buttonProps, size = "medium", ...rest }: TextInputWithButtonProps) => {
  return (
    <TextInput
      className={cn(
        {
          "pr-1": size === "small" || size === "medium",
          "pr-2": size === "large",
        },
        className
      )}
      appendElement={
        <Button
          className={cn("h-full py-0 m-0", {
            "text-xs": size === "small",
            "text-sm": size === "medium",
            "text-base": size === "large",
          })}
          size={buttonProps?.size ?? size}
          {...buttonProps}
        />
      }
      size={size}
      {...rest}
    />
  )
}

TextInputWithButton.displayName = "InputWithButton";

export default TextInputWithButton;
