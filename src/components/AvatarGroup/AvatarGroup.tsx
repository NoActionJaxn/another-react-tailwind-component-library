import { Children, type HTMLAttributes } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { Avatar, AvatarFallback, type AvatarSize } from "../Avatar";
import { AvatarGroupContext } from "../Avatar/context";

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  max?: number;
  total?: number;
  overflowLabel?: (count: number) => string;
  colorScheme?: ColorScheme;
}

/**
 * Overlapping Avatars. With max, the rest collapse into a "+N" avatar; total
 * counts people whose avatars weren't passed (e.g. only the first few loaded).
 */
export function AvatarGroup({
  size = "md",
  max,
  total,
  overflowLabel = (count) => `${count} more`,
  colorScheme,
  role = "group",
  className,
  style,
  children,
  ...props
}: AvatarGroupProps) {
  const avatars = Children.toArray(children);
  const shown =
    max != null && max >= 1 && avatars.length > max
      ? // Room for the "+N" avatar within max.
        avatars.slice(0, Math.max(1, max - 1))
      : avatars;
  const overflow = Math.max(0, (total ?? avatars.length) - shown.length);

  return (
    <AvatarGroupContext value={{ size }}>
      <div
        data-avatar-group
        data-size={size}
        role={role}
        style={schemeStyle(colorScheme, style)}
        className={tw("flex items-center", className)}
        {...props}
      >
        {shown}
        {overflow > 0 && (
          <Avatar
            data-avatar-group-overflow
            role="img"
            aria-label={overflowLabel(overflow)}
          >
            <AvatarFallback aria-hidden className="tabular-nums">
              +{overflow}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </AvatarGroupContext>
  );
}
