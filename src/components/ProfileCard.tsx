import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import cn from "../lib/cn.ts";
import Typography from "./Typography.tsx";

export type ProfileCardVariant = "default" | string;

export interface ProfileCardProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title" | "role"
> {
  as?: ElementType;
  avatar?: ReactNode;
  bio?: ReactNode;
  cover?: ReactNode;
  footer?: ReactNode;
  meta?: ReactNode;
  name?: ReactNode;
  role?: ReactNode;
  variant?: ProfileCardVariant;
}

const ProfileCard = ({
  as: Component = "article",
  avatar,
  bio,
  children,
  className,
  cover,
  footer,
  meta,
  name,
  role,
  variant = "default",
  ...rest
}: ProfileCardProps) => {
  return (
    <Component
      className={cn("another-profile-card", className)}
      data-variant={variant}
      {...rest}
    >
      {cover && <div className="another-profile-card-cover">{cover}</div>}
      <div className="another-profile-card-body">
        {avatar && <div className="another-profile-card-avatar">{avatar}</div>}
        {name && (
          <Typography
            as="h3"
            font="accent"
            className="another-profile-card-name"
          >
            {name}
          </Typography>
        )}
        {role && (
          <Typography as="p" font="sans" className="another-profile-card-role">
            {role}
          </Typography>
        )}
        {bio && (
          <Typography as="p" font="sans" className="another-profile-card-bio">
            {bio}
          </Typography>
        )}
        {meta && <div className="another-profile-card-meta">{meta}</div>}
        {children}
      </div>
      {footer && <div className="another-profile-card-footer">{footer}</div>}
    </Component>
  );
};

ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
