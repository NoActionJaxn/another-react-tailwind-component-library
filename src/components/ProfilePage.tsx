import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import Container from "./Container.tsx";
import cn from "../lib/cn.ts";

export type ProfilePageVariant = "default" | string;

export interface ProfilePageProps extends Omit<
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
  variant?: ProfilePageVariant;
}

const ProfilePage = ({
  as = "article",
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
}: ProfilePageProps) => {
  return (
    <Container
      as={as}
      className={cn("another-profile-page", className)}
      data-variant={variant}
      {...rest}
    >
      {cover && <div className="another-profile-page-cover">{cover}</div>}
      <div className="another-profile-page-header">
        {avatar && <div className="another-profile-page-avatar">{avatar}</div>}
        <div className="another-profile-page-identity">
          {name && (
            <h1 className="another-profile-page-name font-accent">{name}</h1>
          )}
          {role && <p className="another-profile-page-role">{role}</p>}
        </div>
        {footer && <div className="another-profile-page-actions">{footer}</div>}
      </div>
      {meta && <div className="another-profile-page-meta">{meta}</div>}
      {bio && <p className="another-profile-page-bio">{bio}</p>}
      {children && <div className="another-profile-page-body">{children}</div>}
    </Container>
  );
};

ProfilePage.displayName = "ProfilePage";

export default ProfilePage;
