import type { ReactNode } from "react";
import classNames from "classnames";
import Container from "./Container";
import Heading from "./Heading";
import Text from "./Text";

export type HeroAlignment = "left" | "center" | "right";
export type HeroSize = "small" | "medium" | "large";

export interface HeroProps {
  children?: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  image?: {
    src: string;
    alt: string;
    position?: "left" | "right" | "background";
  };
  alignment?: HeroAlignment;
  size?: HeroSize;
  contained?: boolean;
}

function Hero({
  children,
  className,
  title,
  subtitle,
  actions,
  image,
  alignment = "center",
  size = "medium",
  contained = true,
}: HeroProps) {
  const sizeStyles = classNames({
    "py-12 md:py-16": size === "small",
    "py-16 md:py-24": size === "medium",
    "py-24 md:py-32": size === "large",
  });

  const alignmentStyles = classNames({
    "text-left items-start": alignment === "left",
    "text-center items-center": alignment === "center",
    "text-right items-end": alignment === "right",
  });

  const hasBackgroundImage = image?.position === "background";
  const hasSideImage = image && image.position !== "background";

  const backgroundStyles = hasBackgroundImage
    ? "relative bg-cover bg-center bg-no-repeat"
    : "";

  const content = children ?? (
    <div className={classNames("flex flex-col gap-4", alignmentStyles)}>
      {title && (
        <Heading level={1} size="2xl">
          {title}
        </Heading>
      )}
      {subtitle && (
        <Text size="large" className="text-neutral-600 max-w-2xl">
          {subtitle}
        </Text>
      )}
      {actions && (
        <div className={classNames(
          "flex flex-wrap gap-3 mt-2",
          {
            "justify-start": alignment === "left",
            "justify-center": alignment === "center",
            "justify-end": alignment === "right",
          }
        )}>
          {actions}
        </div>
      )}
    </div>
  );

  const innerContent = hasSideImage ? (
    <div className={classNames(
      "flex flex-col gap-8 lg:gap-12",
      {
        "lg:flex-row lg:items-center": image.position === "right",
        "lg:flex-row-reverse lg:items-center": image.position === "left",
      }
    )}>
      <div className="flex-1">
        {content}
      </div>
      <div className="flex-1">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-auto rounded-xl object-cover"
        />
      </div>
    </div>
  ) : (
    content
  );

  const heroContent = contained ? (
    <Container innerClassName="px-4 sm:px-6 lg:px-8">
      {innerContent}
    </Container>
  ) : (
    <div className="px-4 sm:px-6 lg:px-8">
      {innerContent}
    </div>
  );

  if (hasBackgroundImage) {
    return (
      <section
        className={classNames(sizeStyles, backgroundStyles, className)}
        style={{ backgroundImage: `url(${image.src})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-white [&_h1]:text-white [&_p]:text-white/90">
          {heroContent}
        </div>
      </section>
    );
  }

  return (
    <section className={classNames(sizeStyles, className)}>
      {heroContent}
    </section>
  );
}

Hero.displayName = "Hero";

export default Hero;
