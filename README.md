# another-react-tailwind-component-library

React 19 components styled with Tailwind CSS 4 and built on
[Radix UI](https://www.radix-ui.com/primitives) primitives, so keyboard
navigation, focus management and ARIA come built in. Every component supports
color schemes and per-component CSS variables.

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

The package is private on GitHub Packages. To install it, ask the maintainer
for read access to the package, then create a GitHub personal access token
(classic) with the `read:packages` scope and add an `.npmrc` next to your app's
`package.json`:

```ini
@noactionjaxn:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Set `GITHUB_TOKEN` in your shell, CI and hosting provider (for example Vercel)
rather than writing the token into the file.

```sh
npm install @noactionjaxn/another-react-tailwind-component-library
```

React, React DOM and Tailwind are peer dependencies. A few components need an
optional peer dependency and have their own entry point, so the main entry
never loads it:

| Components                    | Install                                          | Import from                                                                                    |
| ----------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Accolades, Sponsors, Carousel | `embla-carousel-react` `embla-carousel-autoplay` | `@noactionjaxn/another-react-tailwind-component-library/accolades`, `…/sponsors`, `…/carousel` |
| PhoneInput                    | `libphonenumber-js`                              | `@noactionjaxn/another-react-tailwind-component-library/phone-input`                           |

## Add the CSS

The library's stylesheet includes Tailwind, so it replaces
`@import "tailwindcss"` in your main CSS file. Keep it on the first line: it
loads the Roboto fonts, and browsers ignore a font `@import` after other rules.

```css
@import "@noactionjaxn/another-react-tailwind-component-library/styles.css";

/* Your own styles and overrides go after it. */
```

It also points Tailwind at the library's components, so no `@source` line is
needed.

## Use it

```tsx
import {
  Button,
  TextInput,
} from "@noactionjaxn/another-react-tailwind-component-library";

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
  --button-radius: var(--radius-4xl);
}
```

Use `@theme static` (or `:root`) for schemes: plain `@theme` drops variables
that no class uses.

## Documentation

The Storybook docs cover every component with live controls, a props table
and its CSS variables, plus pages on usage patterns, theming and the hooks.

```sh
npm run storybook
```

## Releasing

```sh
npm version patch --no-git-tag-version   # or minor / major
```

Commit the bump and push to `main`. On every push to `main`,
`.github/workflows/publish.yml` checks whether `package.json`'s version is
already on GitHub Packages. If it isn't, the workflow publishes it with its own
token and tags the commit `vX.Y.Z`. Pushes that don't change the version publish
nothing.

To publish by hand instead, log in with a classic token that has the
`write:packages` scope, then run `npm publish` (it runs lint, typecheck and
`build:lib` first):

```sh
npm login --scope=@noactionjaxn --auth-type=legacy --registry=https://npm.pkg.github.com
```

The package is private. A package's visibility is set when it's first
published: one published by hand with a personal token starts private, but one
created by the workflow would copy this public repository's visibility. So the
first version was published by hand, and the workflow only publishes later
versions. It needs this repository listed under the package's **Package
settings → Manage Actions access** with the **Write** role.

Give people install access under **Package settings → Manage access** (role
**Read**). Never change the package's visibility to public: that can't be
undone.

## Deploying Storybook

The Storybook site deploys to Vercel. `vercel.json` sets the build command
(`npm run build-storybook`) and output folder (`storybook-static`), so importing
the GitHub repository into Vercel with the default settings is enough.

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
