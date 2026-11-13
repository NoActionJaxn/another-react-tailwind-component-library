import type { ReactNode } from "react";
import { tw } from "../../utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  type AvatarProps,
} from "../Avatar";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  type CardProps,
} from "../Card";

export interface ProfileCardProps extends Omit<CardProps, "title"> {
  name: ReactNode;
  subtitle?: ReactNode;
  avatarSrc?: string;
  avatarAlt?: string;
  avatarFallback?: ReactNode;
  avatarProps?: Omit<AvatarProps, "children">;
  actions?: ReactNode;
}

function initials(name: ReactNode) {
  if (typeof name !== "string") return null;
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export function ProfileCard({
  name,
  subtitle,
  avatarSrc,
  avatarAlt = "",
  avatarFallback,
  avatarProps,
  actions,
  className,
  children,
  ...props
}: ProfileCardProps) {
  return (
    <Card
      data-profile-card
      className={tw("w-full items-center text-center", className)}
      {...props}
    >
      <div className="px-(--_inner-padding) first:pt-(--_inner-padding)">
        <Avatar
          size="lg"
          {...avatarProps}
          className={tw(
            "size-(--_avatar-size) text-(length:--_avatar-font-size)",
            avatarProps?.className,
          )}
        >
          <AvatarImage src={avatarSrc} alt={avatarAlt} />
          <AvatarFallback>{avatarFallback ?? initials(name)}</AvatarFallback>
        </Avatar>
      </div>
      <CardHeader asChild>
        <h3>{name}</h3>
      </CardHeader>
      {subtitle != null && <CardDescription>{subtitle}</CardDescription>}
      {children != null && (
        <CardDescription className="text-(--_bio-text)">
          {children}
        </CardDescription>
      )}
      {actions != null && (
        <CardFooter className="self-stretch px-(--_inner-padding) last:pb-(--_inner-padding) [&>*]:flex-1">
          {actions}
        </CardFooter>
      )}
    </Card>
  );
}
