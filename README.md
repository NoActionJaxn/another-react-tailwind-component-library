# another-react-tailwind-component-library

React 19 components styled with Tailwind CSS 4 and built on
[Radix UI](https://www.radix-ui.com/primitives) primitives, so keyboard
navigation, focus management and ARIA come built in. Every component supports
color schemes, dark mode and per-component CSS variables.

## Components

- **Actions:** Button, ButtonGroup, IconButton, Toggle, ToggleGroup, Toolbar
- **Forms:** Checkbox, InputGroup, Label, NumberInput, OneTimeCodeInput,
  PasswordInput, PhoneInput, Radio, Select, Slider, Switch, TextInput
- **Navigation:** Anchor, Breadcrumb, ContextMenu, DropdownMenu, Menubar,
  NavigationMenu (collapses to a hamburger menu), Pagination, Tabs
- **Data display:** Accordion, Avatar, AvatarGroup, Badge, Collapsible, Image,
  Progress, Video
- **Typography:** Code, CodeBlock, OrderedList, Typography, UnorderedList
- **Feedback:** Alert, Banner, Toast
- **Overlays:** Backdrop, HoverCard, Popover, Tooltip
- **Dialogs:** AlertDialog, Dialog, Drawer
- **Containers:** AnimatedContainer, AspectRatio, Container, FlexContainer,
  GridContainer, MasonryContainer, ScrollArea, Separator
- **Cards:** ActionCard, Card, ListingCard, PriceCard, ProfileCard
- **Blocks** (page sections): Accolades, BottomBanner, CallToAction, Carousel,
  ErrorBlock, FaqBlock, Footer, FooterBar, Header, Hero, ImageGallery,
  ListingBlock, Sponsors
- **Utilities:** Portal, `tw()`, `schemeVars()`, `usePagination()`

## Install

Requires React 19 and Tailwind CSS 4.1 or later.

```sh
npm install another-react-tailwind-component-library
```

React, React DOM and Tailwind are peer dependencies. A few components need an
optional peer dependency and have their own entry point, so the main entry
never loads it:

| Components                    | Install                                          | Import from                                                                      |
| ----------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------- |
| Accolades, Sponsors, Carousel | `embla-carousel-react` `embla-carousel-autoplay` | `another-react-tailwind-component-library/accolades`, `…/sponsors`, `…/carousel` |
| PhoneInput                    | `libphonenumber-js`                              | `another-react-tailwind-component-library/phone-input`                           |

## Add the CSS

The library's stylesheet includes Tailwind, so it replaces
`@import "tailwindcss"` in your main CSS file. Keep it on the first line: it
loads the Roboto fonts, and browsers ignore a font `@import` after other rules.

```css
@import "another-react-tailwind-component-library/src/styles/index.css";
@source "../node_modules/another-react-tailwind-component-library/src";

/* Your own styles and overrides go after it. */
```

The `@source` path is relative to your CSS file.

## Use it

```tsx
import { Button, TextInput } from "another-react-tailwind-component-library";

export function SignUp() {
  return (
    <form className="flex items-end gap-2">
      <TextInput name="email" type="email" label="Email" />
      <Button type="submit">Sign up</Button>
    </form>
  );
}
```

Toast and Tooltip need `ToastProvider` (with a `ToastViewport`) and
`TooltipProvider` placed once near the root of the app.

Most components share the same styling props:

- `variant`: `solid`, `soft`, `outline` or `ghost`, depending on the component
- `size`: `sm`, `md` (default) or `lg`
- `colorScheme`: the palette; unset, it's inherited from the parent
- `className` and `style`: applied last, so they override anything

## Theming

Colors come from a **color scheme**: any `--color-<name>-50 … 950` set. The
library ships one, `default` (Tailwind's stone). There are three ways to change
the colors:

```css
/* 1. Replace the default scheme everywhere */
@theme static {
  --color-default-50: var(--color-slate-50);
  /* … */
  --color-default-950: var(--color-slate-950);
}

/* 2. Add a scheme, then use colorScheme="brand" or schemeVars("brand") */
@theme static {
  --color-brand-50: var(--color-sky-50);
  /* … */
  --color-brand-950: var(--color-sky-950);
}

/* 3. Override one component's variables, globally or for a section */
:root {
  --button-radius: 9999px;
}
```

Use `@theme static` (or `:root`) for schemes: plain `@theme` drops variables
that no class uses.

## Dark mode

Set `color-scheme` on `<html>` and give the page the scheme's colors:

```css
:root {
  color-scheme: light dark; /* follow the system; or just `dark` */
}
body {
  background: var(--scheme-0);
  color: var(--scheme-900);
}
```

Tailwind's `scheme-dark` / `scheme-light` classes work too, on `<html>` or on
one section. Each scheme step uses CSS `light-dark()` and mirrors the scale in
dark mode (50 ↔ 950), so custom schemes get dark mode with no extra setup.

If you build with Vite 8, its Lightning CSS minifier rewrites `light-dark()` in
a way that stops dark sections from working. Keep it native:

```ts
import { Features } from "lightningcss";

export default defineConfig({
  css: { lightningcss: { exclude: Features.LightDark } },
});
```

## Documentation

The Storybook docs cover every component with live controls, a props table
and its CSS variables, plus pages on usage patterns, theming and the hooks.
Each component page has a Light/Dark toggle.

```sh
npm run storybook
```

## Development

| Command                   | What it does                                                     |
| ------------------------- | ---------------------------------------------------------------- |
| `npm run storybook`       | Storybook docs on port 6006                                      |
| `npm run dev`             | Playground app (`playground/`)                                   |
| `npm test`                | Runs every story as a test in headless Chromium                  |
| `npm run lint`            | ESLint (zero warnings) and Prettier check; `lint:fix` fixes both |
| `npm run typecheck`       | TypeScript                                                       |
| `npm run build`           | Type-check and build the playground                              |
| `npm run build-storybook` | Static Storybook in `storybook-static/`                          |

Tests use Playwright's Chromium: `npx playwright install chromium`. A pre-commit
hook runs lint, typecheck and tests.

Each component lives in `src/components/<Name>/` as `Name.tsx`, `Name.css` (its
CSS variables), `Name.stories.tsx`, `Name.mdx` and `index.ts`. All docs text is
in `src/docs/i18n/locales/en.json`. See [CLAUDE.md](CLAUDE.md) for the full
conventions.
