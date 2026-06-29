import { cn } from "../util/cn";
import { Button as HeadlessButton } from "@headlessui/react";
import type { GlobalSizes, GlobalVariants } from "../types/globals";
import Typography from "./Typography";

export type ButtonVariant = GlobalVariants;
export type ButtonSize = GlobalSizes;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  icon?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant | 'ghost' | 'link';
}

const Button = ({
  block = false,
  children,
  className,
  disabled = false,
  icon = false,
  size = 'md',
  type = 'button',
  variant = 'default',
  ...rest
}: ButtonProps) => (
  <HeadlessButton
    className={
      cn(
        'inline-flex items-center justify-center gap-2 cursor-pointer rounded-sm',
        {
          'w-full grow': block,
          'aspect-square overflow-hidden': icon && !block,
          'opacity-80 cursor-default': disabled,
        },
        {
          'another-button-size-xs': size === 'xs',
          'another-button-size-sm': size === 'sm',
          'another-button-size-md': size === 'md',
          'another-button-size-lg': size === 'lg',
          'another-button-size-xl': size === 'xl',
        },
        {
          'another-button-variant-default': variant === 'default',
          'another-button-variant-primary': variant === 'primary',
          'another-button-variant-secondary': variant === 'secondary',
          'another-button-variant-success': variant === 'success',
          'another-button-variant-warning': variant === 'warning',
          'another-button-variant-danger': variant === 'danger',
          'another-button-variant-info': variant === 'info',
          'another-button-variant-ghost': variant === 'ghost',
          'p-0 h-0 text-primary-dark hover:text-primary underline underline-offset-2': variant === 'link'
        },
        icon && 'p-0',
        className
      )}
    disabled={disabled}
    type={type}
    {...rest}
  >
    <Typography.Text
      className={
        cn(
          'font-another-button text-inherit leading-0',
          {
            'font-semibold': variant !== 'link'
          }
        )}
      size={size}
    >
      {children}
    </Typography.Text>
  </HeadlessButton>
);

Button.displayName = 'Button';

export default Button;
