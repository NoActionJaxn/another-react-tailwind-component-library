# CLAUDE.md

React 19 + Tailwind CSS v4 component library, built with Vite and documented in Storybook 10.

## Commands

- `npm run storybook`: Storybook on port 6006 in docs mode (`--docs`: docs pages only, no canvas/addon panels)
- `npm run dev`: playground app (`playground/`)
- `npm run build`: type-check + build the playground
- `npm test`: runs every story as a test in headless Chromium (Storybook Vitest addon + Playwright)
- `npm run lint`: ESLint (zero warnings allowed) + `prettier --check`. `npm run lint:fix` fixes both.
- `npm run format`: Prettier only (default style; Tailwind classes sorted, including inside `tw()`)
- `npm run typecheck`, `npm run build-storybook`

A Husky pre-commit hook (`.husky/pre-commit`) runs `lint`, `typecheck` and `test`; any error or warning blocks the commit. Run `npm run lint:fix` before committing, and fix issues rather than using `--no-verify`.

Tests are stories: add `play` functions to stories for interaction tests rather than separate test files. Chromium was installed with `npx playwright install chromium` (no `--with-deps`, which needs root).

## Layout

- `src/index.ts`: public exports (components, their prop/variant types, `tw`, `schemeVars`, `schemeStyle`, `ColorScheme`)
- `src/components/<Name>/`: `Name.tsx`, `Name.css`, `Name.stories.tsx`, `Name.mdx` (docs page), `index.ts`
- `src/styles/index.css`: entry. Google Fonts import → `tailwindcss` → `theme.css` (`fonts.css`, `colors.css`) → `components.css` (imports every `Name.css`)
- `src/accolades.ts`: separate entry for Accolades. Components that need an optional peer dependency (Embla: `embla-carousel-react`, `embla-carousel-autoplay`, listed in `peerDependenciesMeta` as optional and installed as dev dependencies) get their own entry and are never exported from `src/index.ts`.
- `src/utils/`: `tw()` (classnames + tailwind-merge), `schemeVars()`, `schemeStyle(colorScheme, style)`, `ColorScheme`
- `src/components/_menu/`, `src/components/_dialog/`: internal shared styles (not exported). `_menu` (`--menu-*`) styles DropdownMenu, ContextMenu, Menubar and Select dropdowns; `_dialog` (`--dialog-*`) styles Dialog and AlertDialog. `Toggle/classes.ts` styles Toggle, ToggleGroupItem and Toolbar buttons. `Code/useCopy.ts` is the clipboard hook shared by Code and CodeBlock.
- `src/docs/<locale>/*.mdx`: general docs pages (`GettingStarted`, `Theming`, `Tw`)
- Storybook sections (story `title` prefix; order set by `storySort` in `.storybook/preview.tsx`): `Components/`, `Containers/` (Container, FlexContainer, GridContainer), `Blocks/` (Accolades, Card, Hero), `Dialogs/` (Dialog, AlertDialog), `Utilities/` (docs pages). New components go under `Components/` unless they fit another section.
- `src/docs/blocks/`: `ComponentDocs` (layout of every component page) and `CssVariables` (variable tables read from the component CSS)
- `src/docs/i18n/`: docs localization. `locales/<locale>.json` holds every docs string; `index.ts` exports `m` (typed strings for the active locale), `docsParameters`, `docsArgTypes` and `format`
- `playground/playground.css`: library CSS + example `brand` scheme; loaded by the playground and Storybook

## Docs localization

All Storybook documentation text comes from `src/docs/i18n/locales/<locale>.json`, never from code: component descriptions, prop descriptions, story content (button text, labels, placeholders, aria-labels) and control labels. Only English exists today.

- Stories: `parameters: docsParameters("Name", { layout: "centered" })`, `argTypes: docsArgTypes("Name", [common props], { … })`, and text via `m.components.Name.story.*` / `m.common.*`. Shared prop texts live in `common.props`; list them in `docsArgTypes`' second argument (`"size"`, or `{ "aria-label": "ariaLabel" }`). Component-specific `props` override common ones.
- Keep the story meta a plain object literal: Storybook indexes it statically, so `const meta = helper({...})` breaks indexing. Only property values may be calls. For the same reason story names can't be localized.
- No JSDoc prop descriptions in component source; the locale file is the single source.
- Component pages: `Name.mdx` is only `<Meta of={Stories} />` + `<ComponentDocs component="Name" css={[css]} sharedCss={[…]} />` with CSS imported via `?raw`; it holds no prose, so it isn't per locale. Stories don't use the `autodocs` tag (the MDX page replaces it).
- CSS variable tables are generated from `--_x: var(--public, default)` declarations, grouped by `data-size` / `data-variant` selectors. Descriptions come from `docs.cssVariables.suffixes` (keyed by the name ending, e.g. `bg-hover`), overridden per component by `components.Name.cssVariables` (full name or ending). A new variable ending needs a `suffixes` entry; shared files need a `docs.cssVariables.parts` label.
- Radix roots re-exported as is have no docgen props: list their main props (`open`, `onOpenChange`, …) in `docsArgTypes` so the props table isn't empty.
- General docs pages: one MDX per locale in `src/docs/<locale>/`; a missing page falls back to `en/`. Missing JSON keys fall back to English.
- Build another language: add `locales/<locale>.json` (partial is fine) and optionally `src/docs/<locale>/`, then `STORYBOOK_LOCALE=<locale> npm run build-storybook -- -o storybook-static/<locale>`.
- Text a component renders itself (e.g. a close button's aria-label) is library text, not docs text: expose it as a prop with an English default.

## Design tokens

- **Fonts** (`fonts.css`): Roboto / Roboto Serif / Roboto Mono replace Tailwind's `font-sans` / `font-serif` / `font-mono`.
- **Color schemes:** a scheme is any `--color-<name>-50 … 950` set. The library ships only `default` (stone), in `colors.css` with `@theme static`.
- **Active scheme:** components read `--scheme-50 … 950`. `:root` points it at `default`; the `colorScheme` prop or `schemeVars(name)` repoints it on an element, and children inherit.
- **Everything else** (radius, spacing, font weights) comes from Tailwind's own theme variables: `--radius-md`, `--spacing`, `--font-weight-semibold`.

## Component recipe (Button is the reference)

**`Name.css`**: all styling decisions live here, inside `@layer components`, keyed on data attributes:

```css
[data-name] {
  --_radius: var(--name-radius, var(--radius-md));
}
[data-name][data-size="md"] {
  --_padding-x: var(--name-md-padding-x, calc(var(--spacing) * 4));
}
[data-name][data-variant="solid"] {
  --_bg: var(--name-solid-bg, var(--scheme-600));
}
```

- Public overrides: `--<name>-<prop>`, `--<name>-<size>-<prop>`, `--<name>-<variant>-<prop>`.
- Private `--_*` variables are resolved on the component's own element, so defaults follow the nearest `--scheme-*`. Never set the public variables' defaults on `:root`.

**`Name.tsx`**:

- Render `data-name`, `data-variant={variant}`, `data-size={size}`.
- Classes only reference private variables: `bg-(--_bg)`, `px-(--_padding-x)`, `rounded-(--_radius)`. Size classes in the TSX are limited to things that aren't themed yet (currently `text-*`).
- Accept `colorScheme` and merge `schemeVars(colorScheme)` before the user's `style`.
- Build classes with `tw()` and pass the user's `className` last.
- Export `<Name>Props` plus union types (`<Name>Variant`, `<Name>Size`) and re-export them from `index.ts` and `src/index.ts`.

**Radix primitives**: every component except Button/TextInput wraps a Radix primitive. Compound components export one part per Radix part (`Dialog`, `DialogTrigger`, `DialogContent`, …); parts with no styling are re-exported as is (`export const Dialog = DialogPrimitive.Root`). Shared class strings live in a separate `.ts` file, not the component file (react-refresh only allows component exports there). Reuse library components inside others rather than restyling: AlertDialog Action/Cancel and ToastAction render `Button`; labelled controls render `Label`; Select's trigger mirrors TextInput's variables and sizes.

**Portals**: Dialog, AlertDialog, Popover, HoverCard, Tooltip, menus and Select render content in a portal, so it can't inherit `--scheme-*` or variable overrides from the trigger's parents. Their content parts take `colorScheme` and apply it with `schemeStyle()`, and render their own `data-*` attribute so their variables resolve on the content.

**Wrapped controls** (TextInput): the outer element carries `data-<name>`, the variables and all visuals, and is a Tailwind `group`. States come from the inner control: `focus-within:` for the ring, `has-disabled:` for disabled, `group-focus-within:` for icon color. `className`/`style`/`colorScheme` go on the wrapper; every other prop and `ref` go on the inner control.

**Labelled controls** (Checkbox, Radio, Switch): render the library `Label` with `htmlFor` pointing at the control (`useId()` unless an `id` is passed), sized to match the control. `label` is optional; without it, callers pass `aria-label`. RadioGroup passes `size` to its Radios through context (ToggleGroup and Toolbar do the same for their items). Their wrappers are block-level `flex w-fit`, not `inline-flex`: an inline wrapper sits on the text baseline, which moves when the check/dot indicator mounts.

**Variants** are styles, never colors, drawn from `solid | soft | outline | ghost`. A component supports only the ones that make sense (TextInput: `outline | soft | ghost`, no `solid`). Button shades:

| Variant | bg / hover          | text    | border        |
| ------- | ------------------- | ------- | ------------- |
| solid   | 600 / 700           | `white` | `transparent` |
| soft    | 100 / 200           | 900     | `transparent` |
| outline | `transparent` / 50  | 800     | 300           |
| ghost   | `transparent` / 100 | 800     | `transparent` |

**Sizes**: `sm | md | lg`, default `md`. Typography is the exception: `xxs … xxl` (`md` = `text-base`), themed via `--typography-<size>-font-size` / `-line-height`. Button padding x/y is spacing 3/1.5, 4/2, 5/2.5, with `text-sm` / `text-base` / `text-lg`. Form controls use the same padding-y, border and text sizes so they line up with Button in a row.

**Responsive (no `size`)**: Container, FlexContainer, GridContainer and Hero adapt to the window instead of taking `size`. Their CSS sets base values on `[data-name]`, then overrides them in `@media (width >= --theme(--breakpoint-md)) { [data-name] { … } }` blocks, with public names `--<name>-<breakpoint>-<prop>`. The docs tables group these by breakpoint.

**Borders**: if any variant has a border, every variant gets `border` (1px), `transparent` when unused, so switching variants never shifts layout. Visible borders use a light shade (`--scheme-300`), not the text color. Exception: Checkbox and Radio borders default to `--scheme-500`, because the border is the only sign of an unchecked control and WCAG requires 3:1 contrast for it (300 is about 1.5:1).

**States** (interactive components):

- `cursor-pointer`; `transition-colors`
- Hover: `hover:bg-(--_bg-hover)`
- Focus: a solid outline on any focus (`focus:`, so clicks show it too), from `--_focus-color` (default `--scheme-400`), `--_focus-width` (4px) and `--_focus-offset` (0px). All components use the same defaults. Set the outline color without a state prefix (`outline-(--_focus-color)`) so `transition-colors` has nothing to animate; prefixing it causes a flash from the text color on focus.
- Disabled: `cursor-not-allowed opacity-50`, and hover keeps the base background. Style both `disabled:` and `aria-disabled:`. With `asChild`, `disabled` becomes `aria-disabled` + `tabIndex={-1}` + a click that is prevented, since links etc. have no `disabled`.

**Contrast**: text/background pairs must meet WCAG AA for the default scheme.

## Adding a component

1. Create the four files in `src/components/<Name>/` following the recipe.
2. Import `Name.css` in `src/styles/components.css`.
3. Export from `src/index.ts`.
4. Stories: a single `Default` story with controls for `variant`, `size` and `colorScheme` (add more only when asked).
5. Add the component's entry (description, props, story strings, any `cssVariables` overrides) to `src/docs/i18n/locales/en.json`, and a `Name.mdx` page using `ComponentDocs`.
6. Run `npm run lint:fix`, then the pre-commit checks (`lint`, `typecheck`, `test`) and `npm run build-storybook`.

## Tailwind gotchas

- Tailwind drops theme variables no class uses. Anything read at runtime (schemes, palettes picked by name) must be in `@theme static` or plain `:root`.
- The Google Fonts `@import url(...)` must stay the first line of `src/styles/index.css`. Placed anywhere else, it ends up after Tailwind's rules and browsers ignore it.
- Tailwind escapes class names in built CSS (`.bg-\(--_bg\)`): search output by declaration (`background-color:var(--_bg)`), not by class.
- Inside `[...]` arbitrary values Tailwind turns `_` into a space, which breaks `var(--_x)` (e.g. in `calc()`). Do the math in the component CSS as a `--_*` variable and use the `(--_x)` syntax instead.

## Style

- Keep comments minimal: only what the code can't say.
