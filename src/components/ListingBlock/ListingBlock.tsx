import { StarFilledIcon } from "@radix-ui/react-icons";
import { Slot } from "@radix-ui/react-slot";
import { useState, type HTMLAttributes, type ReactNode } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { Container } from "../Container";
import { Image } from "../Image";

export interface ListingBlockProps extends HTMLAttributes<HTMLElement> {
  block?: boolean;
  colorScheme?: ColorScheme;
}

/** The page section: the gallery and the details side by side. */
export function ListingBlock({
  block = false,
  colorScheme,
  className,
  style,
  children,
  ...props
}: ListingBlockProps) {
  return (
    <section
      data-listing-block
      style={schemeStyle(colorScheme, style)}
      className={tw("py-(--_padding-y) text-(--_text)", className)}
      {...props}
    >
      <Container
        block={block}
        className="grid gap-x-(--_gap) gap-y-(--_row-gap) md:grid-cols-2"
      >
        {children}
      </Container>
    </section>
  );
}

export interface ListingBlockImage {
  src: string;
  alt: string;
  thumbnail?: string;
}
export interface ListingBlockGalleryProps extends HTMLAttributes<HTMLDivElement> {
  images: ListingBlockImage[];
  defaultIndex?: number;
  aspectRatio?: string | number;
  thumbnailLabel?: (index: number, total: number) => string;
}

export function ListingBlockGallery({
  images,
  defaultIndex = 0,
  aspectRatio = "1 / 1",
  thumbnailLabel = (index, total) => `Show image ${index} of ${total}`,
  className,
  ...props
}: ListingBlockGalleryProps) {
  const [index, setIndex] = useState(defaultIndex);
  const current = images[Math.min(index, images.length - 1)];

  return (
    <div
      data-listing-block-gallery
      className={tw(
        "flex min-w-0 flex-col-reverse gap-(--_thumb-gap) md:flex-row",
        className,
      )}
      {...props}
    >
      {images.length > 1 && (
        // A row under the image on small screens, a column beside it from md.
        <div className="flex shrink-0 gap-(--_thumb-gap) overflow-auto p-1 md:-m-1 md:max-h-full md:flex-col">
          {images.map((image, i) => (
            <button
              key={i}
              type="button"
              aria-label={thumbnailLabel(i + 1, images.length)}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
              className="w-(--_thumb-size) shrink-0 cursor-pointer rounded-(--_radius) ring-(--_thumb-active) outline-(--_focus-color) transition-shadow focus-visible:outline-(length:--_focus-width) focus-visible:outline-offset-2 focus-visible:outline-solid aria-pressed:ring-2"
            >
              <Image
                src={image.thumbnail ?? image.src}
                alt=""
                variant="outline"
                aspectRatio="1 / 1"
                className="w-full bg-(--_image-bg)"
              />
            </button>
          ))}
        </div>
      )}
      {current && (
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          variant="outline"
          fit="contain"
          aspectRatio={aspectRatio}
          className="w-full min-w-0 flex-1 bg-(--_image-bg)"
        />
      )}
    </div>
  );
}

export interface ListingBlockPartProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export function ListingBlockDetails({
  asChild = false,
  className,
  ...props
}: ListingBlockPartProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-listing-block-details
      className={tw("flex min-w-0 flex-col gap-(--_details-gap)", className)}
      {...props}
    />
  );
}

export function ListingBlockTitle({
  asChild = false,
  className,
  ...props
}: ListingBlockPartProps) {
  const Component = asChild ? Slot : "h1";
  return (
    <Component
      data-listing-block-title
      className={tw(
        "text-(length:--_title-font-size) leading-tight font-(--_title-font-weight) tracking-tight text-balance text-(--_title-text)",
        className,
      )}
      {...props}
    />
  );
}

export interface ListingBlockRatingProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  count?: ReactNode;
  label?: (value: number, max: number) => string;
}

export function ListingBlockRating({
  value,
  max = 5,
  count,
  label = (value, max) => `Rated ${value} out of ${max}`,
  className,
  ...props
}: ListingBlockRatingProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const stars = Array.from({ length: max }, (_, i) => (
    <StarFilledIcon
      key={i}
      aria-hidden
      className="size-(--_star-size) shrink-0"
    />
  ));
  return (
    <div
      data-listing-block-rating
      className={tw("-mt-(--_rating-pull) flex items-center gap-2", className)}
      {...props}
    >
      <span
        role="img"
        aria-label={label(clamped, max)}
        className="relative flex"
      >
        <span className="flex text-(--_star-empty)">{stars}</span>
        {/* The filled stars, cut to the rating's width, so halves show too. */}
        <span
          className="absolute inset-y-0 start-0 flex overflow-hidden text-(--_star)"
          style={{ width: `${(clamped / max) * 100}%` }}
        >
          {stars}
        </span>
      </span>
      {count != null && (
        <span className="text-sm text-(--_muted-text)">{count}</span>
      )}
    </div>
  );
}

export interface ListingBlockPriceProps extends HTMLAttributes<HTMLDivElement> {
  price: ReactNode;
  originalPrice?: ReactNode;
  note?: ReactNode;
  originalPriceLabel?: string;
  priceLabel?: string;
}

export function ListingBlockPrice({
  price,
  originalPrice,
  note,
  originalPriceLabel = "Original price:",
  priceLabel = "Price:",
  className,
  ...props
}: ListingBlockPriceProps) {
  return (
    <div
      data-listing-block-price
      className={tw("flex flex-col gap-1", className)}
      {...props}
    >
      {originalPrice != null && (
        <del className="text-sm text-(--_muted-text)">
          <span className="sr-only">{originalPriceLabel} </span>
          {originalPrice}
        </del>
      )}
      <p className="text-(length:--_price-font-size) leading-tight font-(--_price-font-weight) text-(--_title-text)">
        <span className="sr-only">{priceLabel} </span>
        {price}
      </p>
      {note != null && <p className="text-sm text-(--_muted-text)">{note}</p>}
    </div>
  );
}

export interface ListingBlockSectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  title?: ReactNode;
}

export function ListingBlockSection({
  title,
  className,
  children,
  ...props
}: ListingBlockSectionProps) {
  return (
    <section
      data-listing-block-section
      className={tw(
        "mt-(--_section-gap) flex flex-col gap-2 text-sm text-(--_muted-text)",
        className,
      )}
      {...props}
    >
      {title != null && (
        <h2 className="text-base font-semibold text-(--_title-text)">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export function ListingBlockActions({
  asChild = false,
  className,
  ...props
}: ListingBlockPartProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-listing-block-actions
      // Buttons share the row equally and wrap on narrow screens.
      className={tw(
        "mt-(--_section-gap) flex flex-wrap gap-(--_actions-item-gap) *:flex-1 *:basis-40",
        className,
      )}
      {...props}
    />
  );
}
