import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import Container from "./Container.tsx";
import cn from "../lib/cn.ts";

export type PricingVariant = "default" | string;

export interface PricingProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  as?: ElementType;
  description?: ReactNode;
  eyebrow?: ReactNode;
  title?: ReactNode;
  variant?: PricingVariant;
}

const Pricing = ({
  as = "section",
  children,
  className,
  description,
  eyebrow,
  title,
  variant = "default",
  ...rest
}: PricingProps) => {
  return (
    <Container
      as={as}
      className={cn("another-pricing", className)}
      data-variant={variant}
      {...rest}
    >
      {(eyebrow || title || description) && (
        <div className="another-pricing-header">
          {eyebrow && <p className="another-pricing-eyebrow">{eyebrow}</p>}
          {title && (
            <h2 className="another-pricing-title font-accent">{title}</h2>
          )}
          {description && (
            <p className="another-pricing-description">{description}</p>
          )}
        </div>
      )}
      <div className="another-pricing-grid">{children}</div>
    </Container>
  );
};

Pricing.displayName = "Pricing";

export default Pricing;
