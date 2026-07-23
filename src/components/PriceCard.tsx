import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import cn from "../lib/cn.ts";
import Typography from "./Typography.tsx";
import Check from "../icons/Check.tsx";

export type PriceCardVariant = "default" | "featured" | string;

export interface PriceCardProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  as?: ElementType;
  badge?: ReactNode;
  description?: ReactNode;
  features?: ReactNode[];
  footer?: ReactNode;
  name?: ReactNode;
  period?: ReactNode;
  price?: ReactNode;
  variant?: PriceCardVariant;
}

const PriceCard = ({
  as: Component = "article",
  badge,
  children,
  className,
  description,
  features,
  footer,
  name,
  period,
  price,
  variant = "default",
  ...rest
}: PriceCardProps) => {
  return (
    <Component
      className={cn("another-price-card", className)}
      data-variant={variant}
      {...rest}
    >
      {badge && <div className="another-price-card-badge">{badge}</div>}
      <div className="another-price-card-body">
        {name && (
          <Typography as="h3" font="accent" className="another-price-card-name">
            {name}
          </Typography>
        )}
        {(price || period) && (
          <div className="another-price-card-price">
            {price && (
              <span className="another-price-card-amount">{price}</span>
            )}
            {period && (
              <span className="another-price-card-period">{period}</span>
            )}
          </div>
        )}
        {description && (
          <Typography
            as="p"
            font="sans"
            className="another-price-card-description"
          >
            {description}
          </Typography>
        )}
        {features && features.length > 0 && (
          <ul className="another-price-card-features">
            {features.map((feature, index) => (
              <li className="another-price-card-feature" key={index}>
                <Check />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        {children}
      </div>
      {footer && <div className="another-price-card-footer">{footer}</div>}
    </Component>
  );
};

PriceCard.displayName = "PriceCard";

export default PriceCard;
