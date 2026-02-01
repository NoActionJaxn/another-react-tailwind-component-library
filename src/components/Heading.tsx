import classNames from "classnames";
import type React from "react";

export type HeadingSize = 'small' | 'medium' | 'large' | 'xl' | '2xl';
export type HeadingVariant = 'sans' | 'serif' | 'mono' | 'display';
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode | React.ReactNode[];
  size?: HeadingSize;
  variant?: HeadingVariant;
  level?: HeadingLevel;
}

function Heading({
  children,
  className,
  size = 'medium',
  variant = 'display',
  level = 1,
  ...rest
}: HeadingProps) {

  const renderComponentLevel = () => {
    switch (level) {
      case 2:
        return 'h2';
      case 3:
        return 'h3';
      case 4:
        return 'h4';
      case 5:
        return 'h5';
      case 6:
        return 'h6';
      case 1:
      default:
        return 'h1';
    }
  };

  const Component = renderComponentLevel();

  const baseStyles = "leading-normal text-dark";

  const sizeStyles = classNames({
    'text-base sm:text-lg md:text-xl lg:text-2xl': size === 'small',
    'text-xl sm:text-xl md:text-2xl lg:text-3xl': size === 'medium',
    'text-2xl sm:text-2xl md:text-3xl lg:text-4xl': size === 'large',
    'text-3xl sm:text-3xl md:text-4xl lg:text-5xl': size === 'xl',
    'text-4xl sm:text-4xl md:text-5xl lg:text-6xl': size === '2xl',
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

Heading.displayName = 'Heading';

export default Heading;