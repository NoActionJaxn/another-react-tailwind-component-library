import { cn } from "../util/cn";
import type { GlobalSizes } from "../types/globals";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof HTMLElementTagNameMap;
  size?: GlobalSizes | 'extra-small' | 'extra-large';
}

export interface TitleProps extends Omit<TextProps, 'as'> {
  as?: 'default' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  bold?: boolean;
}

const Title = ({
  as = 'default',
  bold = false,
  className,
  size = 'medium',
  ...rest
}: TitleProps) => {
  const Component = as === 'default' ? 'h2' : as;
  return (
    <Component
      className={
        cn(
          'font-title font-semibold',
          {
            "font-black": bold,
          },
          {
            "text-7xl": size === "extra-large",
            "text-4xl": size === "large",
            "text-2xl": size === "medium",
            "text-lg": size === "small",
            "text-sm": size === "extra-small",
          },
          className,
        )}
      {...rest}
    />
  );
};

const Text = ({
  as: Component = 'span',
  className,
  size = 'medium',
  ...rest
}: TextProps) => {
  return (
    <Component
      className={
        cn(
          'font-text font-normal',
          {
            "text-2xl": size === "extra-large",
            "text-xl": size === "large",
            "text-lg": size === "medium",
            "text-base": size === "small",
            "text-sm": size === "extra-small",
          },
          className,
        )}
      {...rest}
    />
  );
};

const Typography = {
  Text,
  Title,
};

Title.displayName = 'Title';
Text.displayName = 'Text';

export default Typography;