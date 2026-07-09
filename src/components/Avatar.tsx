import { type ReactNode } from "react";
import { Avatar as RadixAvatar } from "radix-ui";
import cn from "../lib/cn.ts";

export type AvatarVariant = "default" | string;
export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends RadixAvatar.AvatarProps {
  alt?: string;
  fallback?: ReactNode;
  fallbackDelay?: number;
  size?: AvatarSize;
  src?: string;
  variant?: AvatarVariant;
}

const Avatar = ({
  alt = "",
  className,
  fallback,
  fallbackDelay = 600,
  size = "md",
  src,
  variant = "default",
  ...rest
}: AvatarProps) => {
  return (
    <RadixAvatar.Root
      className={cn("another-avatar", className)}
      data-variant={variant}
      data-size={size}
      {...rest}
    >
      {src && (
        <RadixAvatar.Image
          className="another-avatar-image"
          src={src}
          alt={alt}
        />
      )}
      <RadixAvatar.Fallback
        className="another-avatar-fallback"
        delayMs={src ? fallbackDelay : 0}
      >
        {fallback}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

Avatar.displayName = "Avatar";

export default Avatar;
