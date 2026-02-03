import type { ReactNode } from "react";
import classNames from "classnames";
import { Slot } from "@radix-ui/react-slot";
import AspectRatio from "./AspectRatio";
import Heading from "./Heading";
import Text from "./Text";

export type CardVariant = "default" | "bordered" | "elevated";

export interface CardProps {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
  variant?: CardVariant;
  image?: {
    src: string;
    alt: string;
    ratio?: number;
  };
  title?: string;
  description?: string;
  actions?: ReactNode;
}

function Card({
  children,
  className,
  asChild = false,
  variant = "default",
  image,
  title,
  description,
  actions,
}: CardProps) {
  const Component = asChild ? Slot : "div";

  const baseStyles = "block overflow-hidden rounded-xl bg-white";

  const variantStyles = classNames({
    "border border-neutral-200": variant === "default" || variant === "bordered",
    "shadow-lg": variant === "elevated",
  });

  const cardStyles = classNames(baseStyles, variantStyles, className);

  // If children are provided, render them directly (custom content mode)
  if (children) {
    return (
      <Component className={cardStyles}>
        {children}
      </Component>
    );
  }

  // Otherwise render the structured card with image, title, description, actions
  return (
    <Component className={cardStyles}>
      {image && (
        <AspectRatio ratio={image.ratio ?? 16 / 9} className="rounded-none">
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
          />
        </AspectRatio>
      )}
      <div className="p-4">
        {title && (
          <Heading level={3} size="medium" variant="sans" className="mb-1">
            {title}
          </Heading>
        )}
        {description && (
          <Text size="small" className="text-neutral-600">
            {description}
          </Text>
        )}
        {actions && (
          <div className="mt-4 flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </Component>
  );
}

// Sub-components for custom card composition
function CardImage({
  src,
  alt,
  ratio = 16 / 9,
  className,
}: {
  src: string;
  alt: string;
  ratio?: number;
  className?: string;
}) {
  return (
    <AspectRatio ratio={ratio} className={classNames("rounded-none", className)}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />
    </AspectRatio>
  );
}

function CardContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={classNames("p-4", className)}>
      {children}
    </div>
  );
}

function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Heading level={3} size="medium" variant="sans" className={classNames("mb-1", className)}>
      {children}
    </Heading>
  );
}

function CardDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Text size="small" className={classNames("text-neutral-600", className)}>
      {children}
    </Text>
  );
}

function CardActions({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={classNames("mt-4 flex items-center gap-2", className)}>
      {children}
    </div>
  );
}

CardImage.displayName = "Card.Image";
CardContent.displayName = "Card.Content";
CardTitle.displayName = "Card.Title";
CardDescription.displayName = "Card.Description";
CardActions.displayName = "Card.Actions";

Card.Image = CardImage;
Card.Content = CardContent;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Actions = CardActions;

Card.displayName = "Card";

export default Card;
