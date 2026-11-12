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

- `src/index.ts`: public exports (components, their prop/variant types, `schemeVars`, `ColorScheme`)
- `src/components/<Name>/`: `Name.tsx`, `Name.css`, `Name.stories.tsx`, `index.ts`
- `src/styles/index.css`: entry. Google Fonts import → `tailwindcss` → `theme.css` (`fonts.css`, `colors.css`) → `components.css` (imports every `Name.css`)
- `src/utils/`: `tw()` (classnames + tailwind-merge), `schemeVars()`, `ColorScheme`
- `src/docs/Theming.mdx`: user-facing theming docs with a variable table per component
- `playground/playground.css`: library CSS + example `brand` scheme; loaded by the playground and Storybook

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

**Wrapped controls** (TextInput): the outer element carries `data-<name>`, the variables and all visuals, and is a Tailwind `group`. States come from the inner control: `focus-within:` for the ring, `has-disabled:` for disabled, `group-focus-within:` for icon color. `className`/`style`/`colorScheme` go on the wrapper; every other prop and `ref` go on the inner control.

**Labelled controls** (Checkbox, Radio): render the library `Label` with `htmlFor` pointing at the control (`useId()` unless an `id` is passed), sized to match the control. `label` is optional; without it, callers pass `aria-label`. RadioGroup passes `size` to its Radios through context. Their wrappers are block-level `flex w-fit`, not `inline-flex`: an inline wrapper sits on the text baseline, which moves when the check/dot indicator mounts.

**Variants** are styles, never colors, drawn from `solid | soft | outline | ghost`. A component supports only the ones that make sense (TextInput: `outline | soft | ghost`, no `solid`). Button shades:

| Variant | bg / hover          | text    | border        |
| ------- | ------------------- | ------- | ------------- |
| solid   | 600 / 700           | `white` | `transparent` |
| soft    | 100 / 200           | 900     | `transparent` |
| outline | `transparent` / 50  | 800     | 300           |
| ghost   | `transparent` / 100 | 800     | `transparent` |

**Sizes**: `sm | md | lg`, default `md`. Button padding x/y is spacing 3/1.5, 4/2, 5/2.5, with `text-sm` / `text-base` / `text-lg`. Form controls use the same padding-y, border and text sizes so they line up with Button in a row.

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
5. Add the component's variable table to `src/docs/Theming.mdx`.
6. Run `npm run lint:fix`, then the pre-commit checks (`lint`, `typecheck`, `test`) and `npm run build-storybook`.

## Tailwind gotchas

- Tailwind drops theme variables no class uses. Anything read at runtime (schemes, palettes picked by name) must be in `@theme static` or plain `:root`.
- The Google Fonts `@import url(...)` must stay the first line of `src/styles/index.css`. Placed anywhere else, it ends up after Tailwind's rules and browsers ignore it.
- Tailwind escapes class names in built CSS (`.bg-\(--_bg\)`): search output by declaration (`background-color:var(--_bg)`), not by class.

## Style

- Keep comments minimal: only what the code can't say.
