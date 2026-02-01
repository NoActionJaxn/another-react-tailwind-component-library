import classNames from "classnames";
import type React from "react";

export type TextSize = 'small' | 'medium' | 'large';
export type TextVariant = 'sans' | 'serif' | 'mono' | 'display';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode | React.ReactNode[];
  size?: TextSize;
  variant?: TextVariant;
  as?: React.ElementType;
}

function Text({ 
  as: Component = 'span',
  children, 
  className,
  size = 'medium', 
  variant = 'sans', 
  ...rest 
}: TextProps) {

  const baseStyles = "leading-normal text-dark";

  const sizeStyles = classNames({
    'text-xs sm:text-sm md:text-base lg:text-lg': size === 'small',
    'text-sm sm:text-base md:text-lg lg:text-xl': size === 'medium',
    'text-base sm:text-lg md:text-xl lg:text-2xl': size === 'large',
  });

  const variantStyles = classNames({
    'font-sans': variant === 'sans',
    'font-serif': variant === 'serif',
    'font-mono': variant === 'mono',
    'font-display': variant === 'display',
  });

  return (
    <Component className={classNames(baseStyles, sizeStyles, variantStyles, className)} {...rest}>
      {children}
    </Component>
  );
}

Text.displayName = 'Text';

export default Text;
