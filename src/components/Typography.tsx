import { cn } from "../util/cn";
import type { GlobalSizes } from "../types/globals";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof HTMLElementTagNameMap;
  size?: GlobalSizes | 'extra-small' | 'extra-large';
}

export interface TitleProps extends Omit<TextProps, 'as'> {
  as?: 'default' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Title = ({
  as = 'default',
  className,
  size = 'medium',
  ...rest
}: TitleProps) => {
  const Component = as === 'default' ? 'h2' : as;
  return (
    <Component
      className={
        cn(
          className,
          'another-title',
          {
            'another-small-title': size === 'small',
            'another-medium-title': size === 'medium',
            'another-large-title': size === 'large',
            'another-extra-small-title': size === 'extra-small',
            'another-extra-large-title': size === 'extra-large',  
          }
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
          className,
          'another-text',
          {
            'another-extra-small-text': size === 'extra-small',
            'another-small-text': size === 'small',
            'another-medium-text': size === 'medium',
            'another-large-text': size === 'large',
            'another-extra-large-text': size === 'extra-large',
          }
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