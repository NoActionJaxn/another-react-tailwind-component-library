import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import { tw } from "../../utils";
import { Card, CardImage, type CardImageProps, type CardProps } from "../Card";

export interface ActionCardProps extends Omit<CardProps, "onClick"> {
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  children?: ReactNode;
}

/**
 * A clickable Card: a link with `href`, otherwise a button that calls `onClick`.
 * With `asChild`, the child (e.g. a router Link) becomes the card.
 */
export function ActionCard({
  href,
  target,
  rel,
  onClick,
  asChild = false,
  onKeyDown,
  className,
  children,
  ...props
}: ActionCardProps) {
  const classes = tw(
    "cursor-pointer transition-[box-shadow,border-color,background-color] hover:border-(--_border-hover) hover:bg-(--_bg-hover) hover:shadow-(--_hover-shadow)",
    "outline-(--_focus-color) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid",
    className,
  );

  if (asChild || href) {
    return (
      <Card
        asChild
        data-action-card
        className={classes}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <a href={href} target={target} rel={rel}>
            {children}
          </a>
        )}
      </Card>
    );
  }

  // A <button> may only hold inline content, so the action variant is a div with button semantics.
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  }

  return (
    <Card
      data-action-card
      role="button"
      tabIndex={0}
      className={classes}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </Card>
  );
}

/** A CardImage that zooms when the whole card is hovered or focused. */
export function ActionCardImage(props: CardImageProps) {
  return <CardImage zoomOnHover {...props} />;
}
