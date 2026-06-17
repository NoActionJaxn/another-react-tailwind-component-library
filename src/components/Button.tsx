import { cn } from "../util/cn";
import { Button as HeadlessButton } from "@headlessui/react";
import type { GlobalSizes, GlobalVariants } from "../types/globals";

export type ButtonVariant = GlobalVariants | 'ghost' | 'outline';
export type ButtonSize = GlobalSizes;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  rounded?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const Button = ({
  className,
  block = false,
  rounded = false,
  size = 'medium',
  type = 'button',
  variant = 'default',
  ...rest
}: ButtonProps) => {
  return (
    <HeadlessButton
      type={type}
      className={
        cn(
          className,
          'another-button',
          {
            // TW classes
            "w-full": block,
            "rounded-full": rounded,
            // Custom classes
            'small-button': size === 'small',
            'medium-button': size === 'medium',
            'large-button': size === 'large',
            'default-button': variant === 'default',
            'ghost-button': variant === 'ghost',
            'bordered-button': variant === 'outline',
            'primary-button': variant === 'primary',
            'secondary-button': variant === 'secondary',
            'success-button': variant === 'success',
            'warning-button': variant === 'warning',
            'danger-button': variant === 'danger',
            'info-button': variant === 'info',
          },
        )}
      {...rest}
    />
  );
};

Button.displayName = 'Button';

export default Button;
