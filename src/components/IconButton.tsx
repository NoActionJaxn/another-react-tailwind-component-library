import { cn } from "../util/cn";
import { Button as HeadlessButton } from "@headlessui/react";
import type { ButtonProps } from "./Button";

export type IconButtonProps = Omit<ButtonProps, 'block'>;

const IconButton = ({
  className,
  rounded = false,
  size = 'medium',
  type = 'button',
  variant = 'default',
  ...rest
}: IconButtonProps) => {
  return (
    <HeadlessButton
      type={type}
      className={
        cn(
          className,
          'another-button icon-button',
          {
            "rounded-full": rounded,
            'small-button': size === 'small',
            'medium-button': size === 'medium',
            'large-button': size === 'large',
            'default-button': variant === 'default',
            'ghost-button': variant === 'ghost',
            'bordered-button': variant === 'outline',
            'link-button': variant === 'link',
            'primary-button': variant === 'primary',
            'secondary-button': variant === 'secondary',
            'success-button': variant === 'success',
            'warning-button': variant === 'warning',
            'danger-button': variant === 'danger',
            'info-button': variant === 'info',
          }
        )}
      {...rest}
    />
  );
};

IconButton.displayName = 'IconButton';

export default IconButton;
