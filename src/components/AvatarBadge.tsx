import Avatar, { type AvatarProps } from "./Avatar.tsx";

export interface AvatarBadgeProps extends AvatarProps {
  count?: number;
}

const AvatarBadge = ({ count, ...rest }: AvatarBadgeProps) => {
  return (
    <span className="another-avatar-badge">
      <Avatar {...rest} />
      {typeof count === "number" && count > 0 && (
        <span className="another-avatar-badge-count">{count}</span>
      )}
    </span>
  );
};

AvatarBadge.displayName = "AvatarBadge";

export default AvatarBadge;
