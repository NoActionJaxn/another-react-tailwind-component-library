import type { ReactNode } from "react";
import { hasContent, tw } from "../../utils";
import { Badge, type BadgeProps } from "../Badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  type CardProps,
} from "../Card";

export interface ListingCardProps extends Omit<CardProps, "title"> {
  title: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  badge?: ReactNode;
  badgeProps?: Omit<BadgeProps, "children">;
  price?: ReactNode;
  unit?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}

export function ListingCard({
  title,
  imageSrc,
  imageAlt = "",
  badge,
  badgeProps,
  price,
  unit,
  subtitle,
  actions,
  className,
  children,
  ...props
}: ListingCardProps) {
  return (
    <Card data-listing-card className={tw("w-full", className)} {...props}>
      {hasContent(imageSrc) && (
        <div className="relative">
          <CardImage src={imageSrc} alt={imageAlt} />
          {hasContent(badge) && (
            <Badge
              variant="soft"
              {...badgeProps}
              className={tw(
                "absolute top-(--_badge-inset) left-(--_badge-inset) shadow-sm",
                badgeProps?.className,
              )}
            >
              {badge}
            </Badge>
          )}
        </div>
      )}
      <CardHeader className="flex items-baseline justify-between gap-3">
        <h3 className="min-w-0">{title}</h3>
        {hasContent(price) && (
          <span className="shrink-0 text-(length:--_price-font-size) font-(--_price-font-weight) whitespace-nowrap text-(--_price-text)">
            {price}
            {hasContent(unit) && (
              <span className="text-(length:--_unit-font-size) font-normal text-(--_unit-text)">
                {" "}
                /{unit}
              </span>
            )}
          </span>
        )}
      </CardHeader>
      {hasContent(subtitle) && <CardDescription>{subtitle}</CardDescription>}
      {children != null && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 px-(--_inner-padding) text-(length:--_details-font-size) text-(--_details-text) last:pb-(--_inner-padding)">
          {children}
        </div>
      )}
      {actions != null && (
        // Full padding (CardFooter defaults to half) so the buttons line up with the text.
        <CardFooter className="px-(--_inner-padding) last:pb-(--_inner-padding)">
          {actions}
        </CardFooter>
      )}
    </Card>
  );
}
