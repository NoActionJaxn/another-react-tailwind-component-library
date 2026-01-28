import React from "react";
import classNames from "classnames";
import Button, { type ButtonProps } from "./Button";

export interface ButtonGroupProps extends Omit<ButtonProps, "asChild" | "children"> {
  children: React.ReactNode;
}

function ButtonGroup({
  children,
  className,
  block,
  rounded,
  size,
  variant,
  ...rest
}: ButtonGroupProps) {
  const inheritedProps: Omit<ButtonProps, "asChild"> = {
    block,
    size,
    variant,
    ...rest,
  };

  const childArray = React.Children.toArray(children).filter(
    (child): child is React.ReactElement =>
      React.isValidElement(child) && child.type === Button
  );

  const validChildren = childArray.map((child) => {
    const childProps = child.props as ButtonProps;

    return React.cloneElement(child as React.ReactElement<ButtonProps>, {
      ...inheritedProps,
      ...childProps,
      rounded: false,
    });
  });

  const baseStyles = "inline-flex justify-center gap-px";

  const blockStyles = classNames({
    "w-full": block,
  });

  const roundingStyles = rounded
    ? "[&>*]:rounded-none [&>*:first-child]:rounded-l-full [&>*:last-child]:rounded-r-full [&>*:only-child]:rounded-full"
    : "[&>*]:rounded-none [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md [&>*:only-child]:rounded-md";

  const focusStyles = "[&>*:focus]:-z-[1] [&>*]:relative";

  return (
    <div
      className={classNames(baseStyles, blockStyles, roundingStyles, focusStyles, className)}
      role="group"
    >
      {validChildren}
    </div>
  );
}

ButtonGroup.displayName = "ButtonGroup";

export default ButtonGroup;
