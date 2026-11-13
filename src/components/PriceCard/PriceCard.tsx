import type { ReactNode } from "react";
import { tw } from "../../utils";
import { Badge, type BadgeProps } from "../Badge";
import { Button, type ButtonProps } from "../Button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  type CardProps,
} from "../Card";

export interface PriceCardProps extends Omit<CardProps, "title"> {
  title: ReactNode;
  badge?: ReactNode;
  badgeProps?: Omit<BadgeProps, "children">;
  price: ReactNode;
  unit?: ReactNode;
  buttonLabel: ReactNode;
  buttonProps?: Omit<ButtonProps, "children" | "block">;
}

export function PriceCard({
  title,
  badge,
  badgeProps,
  price,
  unit,
  buttonLabel,
  buttonProps,
  className,
  children,
  ...props
}: PriceCardProps) {
  return (
    <Card data-price-card className={tw("w-full", className)} {...props}>
      <CardHeader className="flex items-start justify-between gap-3">
        <h3>{title}</h3>
        {badge != null && (
          <Badge variant="soft" {...badgeProps}>
            {badge}
          </Badge>
        )}
      </CardHeader>
      <p className="flex items-baseline gap-1 px-(--_inner-padding)">
        <span className="text-(length:--_price-font-size) leading-none font-(--_price-font-weight) tracking-tight text-(--_price-text)">
          {price}
        </span>
        {unit != null && (
          <span className="text-(length:--_unit-font-size) text-(--_unit-text)">
            /{unit}
          </span>
        )}
      </p>
      {children != null && <CardDescription>{children}</CardDescription>}
      {/* Full padding (CardFooter defaults to half) so the button lines up with the text. */}
      <CardFooter className="px-(--_inner-padding) last:pb-(--_inner-padding)">
        <Button {...buttonProps} block>
          {buttonLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
