import { useState } from "react";
import TextInput, { type TextInputProps } from "./TextInput";
import Button from "./Button";
import EyeClosed from "../icons/EyeClosed";
import EyeOpen from "../icons/EyeOpen";
import cn from "../lib/cn";

export interface PasswordInputProps extends Omit<
  TextInputProps,
  "type" | "appendElement"
> {
  disableShowPassword?: boolean;
}

const PasswordInput = ({
  disableShowPassword = false,
  size = "md",
  variant = "default",
  ...rest
}: PasswordInputProps) => {
  const [show, setShow] = useState<boolean>(false);

  const handleSetShow = (value: boolean) => {
    return setShow(() => value);
  };

  return (
    <TextInput
      size={size}
      variant={variant}
      type={show ? "text" : "password"}
      appendElement={
        !disableShowPassword ? (
          <Button
            className={cn({
              "p-0.5 h-6": size === "sm",
              "p-1 h-8": size === "md",
              "p-1.5 h-10": size === "lg",
            })}
            variant="ghost"
            aria-label="Show password"
            onMouseDown={() => handleSetShow(true)}
            onMouseUp={() => handleSetShow(false)}
            size={size}
            icon
          >
            {show ? <EyeOpen /> : <EyeClosed />}
          </Button>
        ) : (
          <></>
        )
      }
      {...rest}
    />
  );
};

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
