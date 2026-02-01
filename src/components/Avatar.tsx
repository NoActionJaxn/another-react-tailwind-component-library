import classNames from "classnames";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

export type AvatarSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export interface AvatarProps extends AvatarPrimitive.AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
  className?: string;
}

function Avatar({
  src,
  alt = 'Avatar',
  fallback,
  size = 'medium',
  className,
  ...rest
}: AvatarProps) {
  const baseStyles = "inline-block rounded-full overflow-hidden bg-light";
  
  const sizeStyles = classNames({
    'size-8 text-sm': size === 'x-small',
    'size-10 text-lg': size === 'small',
    'size-14 text-xl': size === 'medium',
    'size-20 text-3xl': size === 'large',
    'size-28 text-5xl': size === 'x-large',
  });

  const rootStyles = classNames(
    baseStyles,
    sizeStyles,
    className
  );

  const imageStyles = "h-full w-full object-cover";

  const fallbackStyles = "flex h-full w-full items-center justify-center rounded-full bg-dark font-medium text-light"

  const getFallbackInitials = () => {
    return !!fallback
      ? fallback
      : alt
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
  };

  return (
    <AvatarPrimitive.Root className={rootStyles} {...rest}>
      <AvatarPrimitive.Image
        src={src}
        alt={alt}
        className={imageStyles}
      />
      <AvatarPrimitive.Fallback className={fallbackStyles} delayMs={600}>
        {getFallbackInitials()}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

Avatar.displayName = "Avatar";

export default Avatar;
