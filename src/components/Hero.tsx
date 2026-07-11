import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import Container from "./Container.tsx";
import cn from "../lib/cn.ts";

export type HeroVariant = "default" | string;

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  actions?: ReactNode;
  as?: ElementType;
  background?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  title?: ReactNode;
  variant?: HeroVariant;
}

const Hero = ({
  actions,
  as = "section",
  background,
  children,
  className,
  description,
  eyebrow,
  title,
  variant = "default",
  ...rest
}: HeroProps) => {
  return (
    <Container
      as={as}
      className={cn("another-hero", className)}
      data-variant={variant}
      {...rest}
    >
      {background && (
        <div className="another-hero-background">{background}</div>
      )}
      <div className="another-hero-inner">
        <div className="another-hero-content">
          {eyebrow && <p className="another-hero-eyebrow">{eyebrow}</p>}
          {title && <h1 className="another-hero-title font-accent">{title}</h1>}
          {description && (
            <p className="another-hero-description">{description}</p>
          )}
          {actions && <div className="another-hero-actions">{actions}</div>}
          {children}
        </div>
      </div>
    </Container>
  );
};

Hero.displayName = "Hero";

export default Hero;
