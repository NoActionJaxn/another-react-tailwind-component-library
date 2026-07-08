import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react";
import { cn } from "../lib/cn";
import { Button, type ButtonProps } from "./Button";

export interface ButtonGroupProps extends Pick<
  ButtonProps,
  "block" | "icon" | "size" | "variant"
> {
  children: ReactElement<ButtonProps> | ReactElement<ButtonProps>[];
  className?: string;
}

export const ButtonGroup = ({
  block = false,
  children,
  className = "",
  icon = false,
  size = "md",
  variant = "default",
}: ButtonGroupProps) => {
  const childArray = Children.toArray(children).filter(
    (child): child is ReactElement<ButtonProps> =>
      isValidElement<ButtonProps>(child) && child.type === Button,
  );

  return (
    <div className={cn("another-button-group", className)}>
      {childArray.map((child, index) => {
        return cloneElement(child, {
          block,
          icon,
          size,
          variant,
          key: child.key ?? index,
          ...child.props,
        });
      })}
    </div>
  );
};

export default ButtonGroup;
