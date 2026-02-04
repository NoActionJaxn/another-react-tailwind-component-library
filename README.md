# React Tailwind Component Library

A React component library built with Radix UI primitives and Tailwind CSS v4.

## Installation

```bash
npm install another-react-tailwind-component-library tailwindcss@^4.0.0
```

## Setup

Import the reference theme into your CSS file:

```css
/* app.css */
@import "tailwindcss";
@import "another-react-tailwind-component-library/theme.css";
```

Or copy the contents of `theme.css` and customize the CSS variables to match your design system.

## Usage

```tsx
import { Button, Card, Hero, Carousel } from 'another-react-tailwind-component-library';

function App() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}
```

## Customizing the Theme

The `theme.css` file exports CSS variables using Tailwind CSS v4's `@theme` directive. You can override any of these variables in your own CSS:

```css
@import "tailwindcss";
@import "another-react-tailwind-component-library/theme.css";

@theme {
  --color-primary: #your-primary-color;
  --color-primary-hover: #your-primary-hover-color;
}```

See `theme.css` for the full list of available CSS variables.

## Components

- **Button** - Primary, secondary, and ghost variants with multiple sizes
- **Card** - Flexible card with image, heading, text, and actions
- **Anchor** - Styled links with underline options and external link support
- **Container** - Responsive container with customizable max-width
- **Hero** - Hero sections with image positioning options
- **Carousel** - Content carousel with autoplay, dots, and arrow navigation
- **Accordion** - Collapsible content sections
- **Avatar** - User avatars with fallback support
- **Heading** - Typography component for headings
- **Text** - Typography component for body text
- **CheckboxField** - Checkbox input with label

## License

MIT