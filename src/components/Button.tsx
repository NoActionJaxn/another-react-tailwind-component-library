import { cn } from "../util/cn";
import { Button as HeadlessButton } from "@headlessui/react";
import type { GlobalSizes, GlobalVariants } from "../types/globals";

export type ButtonVariant = GlobalVariants | 'ghost' | 'outline' | 'link';
export type ButtonSize = GlobalSizes;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  icon?: boolean;
  rounded?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const Button = ({
  className,
  block = false,
  icon = false,
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
          'rounded outline-0 font-button font-semibold cursor-pointer border-transparent border-2 ring-4 ring-transparent transition-colors duration-200',
          icon ? ({
            'text-base size-10': size === 'small',
            'text-lg size-9': size === 'medium',
            'text-xl size-8': size === 'large',
          }) : ({
            'text-base px-2.5 py-1': size === 'small',
            'text-lg px-3 py-1': size === 'medium',
            'text-xl px-3.5 py-1.5': size === 'large',
          }),
          {
            'inline-block': !icon,
            'aspect-square inline-flex items-center justify-center': icon,
            'w-full grow': block,
            'rounded-full': rounded,
            'px-1 py-0': variant === 'link',
            'w-min': variant === 'link' && block
          },
          {
            'bg-button-default-background hover:bg-button-default-background-hover text-button-default-text focus:ring-button-default-ring': variant === 'default',
            'bg-button-primary-background hover:bg-button-primary-background-hover text-button-primary-text focus:ring-button-primary-ring': variant === 'primary',
            'bg-button-secondary-background hover:bg-button-secondary-background-hover text-button-secondary-text focus:ring-button-secondary-ring': variant === 'secondary',
            'bg-button-success-background hover:bg-button-success-background-hover text-button-success-text focus:ring-button-success-ring': variant === 'success',
            'bg-button-warning-background hover:bg-button-warning-background-hover text-button-warning-text focus:ring-button-warning-ring': variant === 'warning',
            'bg-button-danger-background hover:bg-button-danger-background-hover text-button-danger-text focus:ring-button-danger-ring': variant === 'danger',
            'bg-button-info-background hover:bg-button-info-background-hover text-button-info-text focus:ring-button-info-ring': variant === 'info',
            'bg-button-ghost-background hover:bg-button-ghost-background-hover text-button-ghost-text focus:ring-button-ghost-ring': variant === 'ghost',
            'bg-button-outline-background hover:bg-button-outline-background-hover text-button-outline-text border-2 border-button-outline-hover focus:ring-button-primary-ring': variant === 'outline',
            'bg-button-link-background text-button-link-text hover:text-button-link-text-hover underline focus:ring-button-link-ring': variant === 'link',
          },
          className,
        )}
      {...rest}
    />
  );
};

Button.displayName = 'Button';

export default Button;
