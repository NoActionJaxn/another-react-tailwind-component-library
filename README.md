# another-react-tailwind-component-library

A React + Tailwind CSS v4 component library built on [Radix Primitives](https://www.radix-ui.com/primitives), styled with container queries so components adapt to the space they're given rather than the screen they assume.

## Install

This package is published to GitHub Packages, not the public npm registry - installing it requires a bit more setup than a normal `npm install`, even though it's a public package: GitHub Packages requires authentication for every install, regardless of visibility.

1. Add a `.npmrc` to your project (or `~/.npmrc` for a global default) telling npm where to resolve the `@noactionjaxn` scope from:

   ```
   @noactionjaxn:registry=https://npm.pkg.github.com
   ```

2. Authenticate to GitHub Packages. Create a [personal access token](https://github.com/settings/tokens) with at least `read:packages` scope, then either add it to the same `.npmrc`:

   ```
   //npm.pkg.github.com/:_authToken=YOUR_TOKEN
   ```

   or set it as an environment variable and reference it instead (safer - keeps the token out of a file that might get committed):

   ```
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```

3. Install as usual:

   ```sh
   npm install @noactionjaxn/another-react-tailwind-component-library
   ```

This library has three peer dependencies your project needs to already have:

- `react` and `react-dom` (`^19.0.0`)
- `tailwindcss` (`^4.0.0`)

`react-paginate` is also an **optional** peer dependency - only needed if you use the `Pagination` component. If you use `Pagination` without installing it, you'll get a clear error telling you to install it, instead of a broken build.

## Usage

```tsx
import {
  Button,
  Dialog,
} from "@noactionjaxn/another-react-tailwind-component-library";

function Example() {
  return (
    <Dialog trigger={<Button>Open</Button>} title="Hello">
      Dialog content.
    </Dialog>
  );
}
```

Component styles are shipped as raw Tailwind source (`@apply`/`@layer`/`@theme`), not pre-compiled CSS - your own Tailwind build processes them, same as the rest of your app. This is why `tailwindcss` is a peer dependency rather than bundled: it lets every component share your project's Tailwind config instead of shipping a second, disconnected copy of Tailwind.

## Styling

Add these imports to your project's main CSS file, alongside your own `@import "tailwindcss";`:

```css
@import "tailwindcss";
@import "@noactionjaxn/another-react-tailwind-component-library/styles/theme.css";
@import "@noactionjaxn/another-react-tailwind-component-library/styles/components.css";
```

- **`styles/theme.css`** - the default design tokens (color scale, font family names). Optional - skip it if you're bringing your own theme (see below).
- **`styles/components.css`** - every component's styles in one file.

`theme.css` sets font _names_ (`--font-sans: "Roboto Flex", sans-serif;`, etc.) but doesn't load the font files - a stylesheet nested inside your build isn't a valid place for a font `@import` (imports must be first in a stylesheet, and yours won't be, once it's inlined after your own `@import "tailwindcss";`). Load the actual fonts from your HTML `<head>` instead:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto+Flex:opsz,wght,XOPQ,XTRA,YOPQ,YTDE,YTFI,YTLC,YTUC@8..144,100..1000,96,468,79,-203,738,514,712&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&display=swap"
  rel="stylesheet"
/>
```

Skip this if you're bringing your own theme with your own fonts.

### Dark mode

Set `data-theme="dark"` on `<html>` (or any ancestor) to switch every component to dark mode - `theme.css` inverts the same `--color-default-*` scale under that attribute, so nothing else needs to change.

```html
<html data-theme="dark"></html>
```

This is opt-in only - deliberately **not** tied to `prefers-color-scheme`. A component library shouldn't guess your app's intended theme from OS preference, since your app may have its own theme system that should take priority; toggle the attribute yourself (e.g. from a theme switcher, or by reading `prefers-color-scheme` in your own app code if you want that behavior).

If you're bringing your own theme (see below), `theme.css`'s dark variant isn't imported either - define your own `:root[data-theme="dark"] { ... }` block re-declaring the same 11 `--color-default-*` tokens to support dark mode with your palette.

### Import a single component's styles

If you only use a handful of components, import just what you need instead of `components.css`:

```css
@import "tailwindcss";
@import "@noactionjaxn/another-react-tailwind-component-library/styles/theme.css";
@import "@noactionjaxn/another-react-tailwind-component-library/styles/components/button.css";
@import "@noactionjaxn/another-react-tailwind-component-library/styles/components/dialog.css";
```

Each component's stylesheet is named after its component, kebab-cased (e.g. `Button` -> `button.css`, `AlertDialog` -> `alert-dialog.css`).

### Bring your own theme

Component styles reference token names (`text-default-950`, `font-sans`, etc.), not hardcoded values. To use your own palette instead of the default one, skip `theme.css` and define your own `@theme` block with the same token names before importing component styles.

**You need to define all 11 `--color-default-*` shades (50 through 950) and all 4 `--font-*` names.** Tailwind errors on a utility class like `border-default-200` if `--color-default-200` isn't defined anywhere - there's no partial fallback to the shipped defaults once you stop importing `theme.css`.

```css
@import "tailwindcss";

@theme {
  --color-default-50: var(--color-slate-50);
  --color-default-100: var(--color-slate-100);
  --color-default-200: var(--color-slate-200);
  --color-default-300: var(--color-slate-300);
  --color-default-400: var(--color-slate-400);
  --color-default-500: var(--color-slate-500);
  --color-default-600: var(--color-slate-600);
  --color-default-700: var(--color-slate-700);
  --color-default-800: var(--color-slate-800);
  --color-default-900: var(--color-slate-900);
  --color-default-950: var(--color-slate-950);
  --font-sans: "Inter", sans-serif;
  --font-serif: "Inter", serif;
  --font-mono: "Inter", monospace;
  --font-accent: "Inter", sans-serif;
}

@import "@noactionjaxn/another-react-tailwind-component-library/styles/components.css";
```

## Full component reference

Every component, prop, and variant is documented with live examples in Storybook, hosted at [another-react-tailwind-component-library.com](https://another-react-tailwind-component-library.com). Storybook defaults to dark mode - use the theme toggle in the toolbar to switch to light.

You can also run it yourself with `npm run storybook`.

Run `npm run docker:preview` to build the same static Storybook site into a Docker image and serve it locally at `http://localhost:8080`, matching how it's deployed in production.
