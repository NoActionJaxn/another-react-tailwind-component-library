import type { ElementType, HTMLAttributes } from "react";
import { cn } from "../util/cn";
import type { GlobalSizes } from "../types/globals";

export type TypographySizes = '2xs' | GlobalSizes | '2xl';
export type TypographyHeaders = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: TypographySizes;
}

export type MonospaceProps = TextProps;

export interface TitleProps extends Omit<TextProps, 'as'> {
  as?: ElementType;
}

const Text = ({ as: Component = 'span', size = "md", className, ...rest }: TextProps) => (
  <Component
    className={
      cn(
        'font-another-text font-normal tracking-wide text-dark',
        {
          "text-another-text-2xs": size === "2xs",
          "text-another-text-xs": size === "xs",
          "text-another-text-sm": size === "sm",
          "text-another-text-md": size === "md",
          "text-another-text-lg": size === "lg",
          "text-another-text-xl": size === "xl",
          "text-another-text-2xl": size === "2xl"
        },
        className
      )}
    {...rest}
  />
);

const Monospace = ({ as: Component = 'code', size = "md", className, ...rest }: MonospaceProps) => (
  <Component
    className={
      cn(
        'font-another-mono font-normal tracking-wide text-dark',
        {
          "text-another-text-2xs": size === "2xs",
          "text-another-text-xs": size === "xs",
          "text-another-text-sm": size === "sm",
          "text-another-text-md": size === "md",
          "text-another-text-lg": size === "lg",
          "text-another-text-xl": size === "xl",
          "text-another-text-2xl": size === "2xl"
        },
        className
      )}
    {...rest}
  />
);

const Title = ({ as: Component = 'h1', className, size = "md", ...rest }: TitleProps) => (
  <Component
    className={
      cn(
        'font-another-title font-semibold tracking-normal text-dark',
        {
          "text-another-title-2xs": size === "2xs",
          "text-another-title-xs": size === "xs",
          "text-another-title-sm": size === "sm",
          "text-another-title-md": size === "md",
          "text-another-title-lg": size === "lg",
          "text-another-title-xl": size === "xl",
          "text-another-title-2xl": size === "2xl"
        },
        className
      )}
    {...rest}
  />
);

Title.displayName = 'Title';
Text.displayName = 'Text';

const Typography = {
  Monospace,
  Text,
  Title,
};

export default Typography;
