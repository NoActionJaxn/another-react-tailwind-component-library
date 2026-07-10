# AGENTS.md

Guidance for AI coding agents working in this repo.

## What this is

A React + TypeScript + Tailwind CSS component library, built with Vite and documented/tested via Storybook. Most interactive components wrap a Radix UI primitive (`radix-ui` package). Components ship a companion CSS file (Tailwind `@apply` rules under `@layer components`) rather than relying on inline utility classes for variant styling.

## Commands

```bash
npm run dev              # Vite dev server
npm run build             # tsc -b && vite build
npm run lint               # eslint .
npm run lint:fix           # eslint . --fix
npm run format              # prettier --write .
npm run storybook           # Storybook dev server on :6006
npm run build-storybook      # Static Storybook build
```

There is no standalone `npm test`; component tests run through Storybook's Vitest addon (browser mode via Playwright/Chromium), driven by the `test` project in `vite.config.ts`. Run `npx vitest` to execute it.

A Husky `pre-commit` hook runs `lint-staged` (`eslint --fix` + `prettier --write`) on staged `js,jsx,ts,tsx,json,css,md` files. Don't bypass it with `--no-verify`.

**Verifying a change**: `npx tsc -b` (typecheck) plus `npx storybook build` (production build) is the reliable way to confirm a component/story actually works — see "Dev server pitfalls" below for why the live `storybook dev` process can lie to you.

## Repo layout

- `src/components/` — component implementations. Current set: `Anchor`, `Avatar`, `Button`, `ButtonGroup`, `Checkbox`, `CheckboxGroup`, `Container`, `FlexContainer`, `GridContainer`, `Label`, `PasswordInput`, `RadioGroup`, `Secure`, `Select`, `Slider`, `Switch`, `TextInput`, `Typography`.
- `src/icons/` — small inline SVG icon components (`Check`, `ChevronDown`, `ChevronUp`, `EyeOpen`, `EyeClosed`). SVGs generally hardcode `fill`/`stroke` colors rather than using `currentColor` — a known pre-existing limitation, not something to silently "fix" as a drive-by.
- `src/lib/cn.ts` — `cn()` (classnames + tailwind-merge) and `cnWhitelisted()` helpers
- `src/stories/` — one `*.stories.tsx` per component, colocated by name (not colocated with the component file)
- `src/styles/` — `theme.css` (design tokens via `@theme`), `main.css` (entry point — see import order note below), `components.css` (barrel import, alphabetically ordered), `components/*.css` (per-component `@layer components` rules)
- `.storybook/` — Storybook configuration

### `main.css` import order matters

```css
@import url("...google fonts...");
@import "tailwindcss";
@import "./theme.css";
@import "./components.css";
```

`"tailwindcss"` must be imported **before** `theme.css`/`components.css`. Tailwind v4 establishes its `@layer theme, base, components, utilities;` order from wherever it's first referenced; importing our own `@layer components` rules before that declaration can cause Preflight's `base` layer (which zeroes out button/input padding, border, background) to win over our component styles despite lower specificity. A single bundled `storybook build` tends to resolve this correctly regardless of order, but the `storybook dev` / Vite dev server, which splits CSS into separately-injected modules for HMR, does not — it's the more literal, dev-mode-only failure mode. If everything suddenly renders unstyled (transparent backgrounds, zero padding) in dev but `storybook build` looks fine, check this first.

## Conventions

**Components**

- Named export + `export default` for every component (see `Button.tsx`, `PasswordInput.tsx`).
- Set `Component.displayName`.
- Function components with a props destructure that supplies defaults, e.g. `size = "md"`, `variant = "default"`, spreading `...rest` onto the native element or Radix primitive.
- Props interfaces extend the relevant native HTML attributes interface (`ButtonHTMLAttributes<HTMLButtonElement>`, etc.) **or**, for Radix-backed components, the Radix primitive's own props type — see "Wrapping a Radix primitive" below. Interfaces are named `<Component>Props`.
- Size and variant are exposed as `data-size` / `data-variant` attributes on the DOM node, not as Tailwind classes baked into the component — actual styling lives in the component's CSS file and targets `[data-variant="..."]` / `[data-size="..."]`. Same treatment for other enum-like state: `data-view`, `data-orientation`, `data-reverse`, `data-font`, `data-columns`, `data-direction`.
- Every component's root class follows the `another-<kebab-name>` prefix (e.g. `another-button`). `cnWhitelisted` treats `another-` prefixed classes as always allowed.
- Use `cn(...)` from `src/lib/cn.ts` to merge conditional classes and caller-supplied `className`; don't hand-roll class concatenation.
- Prefer composition over new variants where reasonable (e.g. `PasswordInput` wraps `TextInput` + `Button`, `CheckboxGroup` wraps `Checkbox`, `GridContainer`/`FlexContainer` wrap `Container`, rather than reimplementing).

**Wrapping a Radix primitive**

- Import as `import { X as RadixX } from "radix-ui"`. The `radix-ui` package re-exports each primitive as a namespace (`import * as reactX from '@radix-ui/react-x'; export { reactX as X };`) — it does **not** top-level export prop types like `XProps`. Reference the props type through the namespace (`RadixX.XProps`, e.g. `RadixCheckbox.CheckboxProps`), not via `import { type XProps } from "radix-ui"` (that import will fail — see `Checkbox.tsx`, `RadioGroup.tsx`, `Select.tsx`, `Switch.tsx`, `Slider.tsx`, `Avatar.tsx`).
- Don't assume which DOM element a Radix primitive renders. `Checkbox.Root`/`RadioGroup.Item`/`Switch.Root` render a `<button>`, not an `<input>` — extend their own `XProps` (which is based on `PrimitiveButtonProps`), not `InputHTMLAttributes`.
- Radix `Indicator` components (Checkbox/Radio) only mount into the DOM when checked by default. If the indicator's child is an icon with no explicit size, it can force layout growth via the flexbox "automatic minimum size" quirk (a flex item's content can override an explicit `width`/`height` unless `min-w-0 min-h-0` is also set). Give icons an explicit size via a descendant selector keyed off `data-size` on the root (see `checkbox.css`, `radio-group.css`), and set `min-w-0 min-h-0` on every flex level between the root and the icon.
- `Slot`/`Slot.Root` (also from `radix-ui`) backs the `asChild` pattern (see `Button.tsx`) for merging props onto a single child instead of introducing a wrapper element. `Typography`/`Anchor` instead use a plain `as` prop (a union of literal tag-name strings) rendered directly as `<Component>` — simpler, but means the prop's tag options must avoid ones with conflicting native attribute types (e.g. don't mix `"button"` into a tag union typed against `AnchorHTMLAttributes`, since `type` is incompatible between the two).

**Prop patterns established across components**

- `label?: ReactNode` — render the shared `Label` component internally, wired to the control via `htmlFor`/`id`, generating an id with `useId()` when the caller doesn't pass one (`Checkbox`, `TextInput`, `Select`).
- `orientation?: "horizontal" | "vertical"` — layout of a control relative to its label, applied as `data-orientation` on a dedicated `*-group` wrapper div (`TextInput`, `Select`). Default varies by component; pick whichever reads naturally for that control.
- `reverse?: boolean` — flips flex order via `data-reverse="true"` + `flex-row-reverse`, for controls where the "label before or after" question matters more than a full orientation axis (`Checkbox`, `Switch`).
- `options: (string | { value: string; label?: ReactNode })[]` plus `view?: "list" | "grid"` — auto-generate items from a flat array (`RadioGroup`, `CheckboxGroup`). Grid view uses static, literal Tailwind responsive classes (`sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`), never dynamically interpolated class strings — Tailwind's scanner only detects classes that appear literally in source.
- `as?: ElementType` / a literal tag-name union — polymorphic root element (`Typography`, `Anchor`, `Container` and its wrappers).
- Container-query components (`Container`, `GridContainer`, `FlexContainer`) use `@container` + Tailwind v4's `@xs`/`@sm`/`@md`/... variants instead of viewport media queries, so nested layout responds to the container's own width. Props like `GridContainer`'s `columns` (1–9) are implemented as **static, fully-enumerated CSS rules** keyed by `[data-columns="1"]` through `[data-columns="9"]` in `grid-container.css` — again because Tailwind can't scan a dynamically-built class string at runtime.
- When a group component's own CSS needs both an "item wrapper" class and a "list of items" container class, name them distinctly (e.g. `Checkbox`'s own internal `another-checkbox-group` wrapper — a single checkbox + its label — vs. `CheckboxGroup`'s `another-checkbox-group-list` — the container of many checkboxes). Reusing a name for two different scopes causes real collisions.

**Styling**

- New component styles go in their own file under `src/styles/components/<kebab-name>.css`, wrapped in `@layer components`, and imported from `src/styles/components.css` (keep that barrel file alphabetically ordered).
- Design tokens (fonts, color scales) belong in `src/styles/theme.css` under `@theme`, using Tailwind v4's CSS-first theme config. Prefer referencing existing `--color-default-*` tokens over introducing new raw colors.
- Interactive control minimum sizing: text-style inputs and triggers (`TextInput`, `Select`) use `min-w-xs` so they don't collapse to content width.

**Stories**

- Add a `src/stories/<Component>.stories.tsx` for every new component, with a `Meta` (`title`, `component`, `parameters.docs.description`, `tags: ["autodocs"]`, `argTypes` describing each prop) and at least a default `Story`.
- `title` uses a two-level hierarchy grouping related components, not a flat name: `Forms/Inputs`, `Forms/Options`, `Forms/Buttons`, `Forms/Text`, `Forms/Sliders`, `Ui/Avatar`, `Ui/Secure`, `Ui/Typography`, `Ui/Anchor`, `Ui/Containers`. Pick an existing group before inventing a new one.
- `argTypes` descriptions are user-facing documentation — write them as full sentences.
- For container-query components, demonstrate the responsive behavior with a resizable wrapper (`className="resize-x overflow-auto"` around the story content) rather than only a fixed-size box — see `Container.stories.tsx` / `GridContainer.stories.tsx` / `FlexContainer.stories.tsx`.

**TypeScript / lint / format**

- Strict TS via `tsc -b`; keep exported prop types explicit (avoid `any`).
- ESLint flat config (`eslint.config.js`) with `typescript-eslint`, `react-hooks`, `react-refresh`, `eslint-plugin-storybook`, and Prettier integration (`prettier/prettier` is an ESLint error, not just a formatter warning). Run `npm run lint:fix` before considering a change done.
- Prettier config is default (`prettier.config.js` is empty) — don't add custom formatting options without discussion.

## Dev server pitfalls (read before reporting "it's broken")

Two failure modes look like real bugs but aren't — both are specific to the long-running `storybook dev` process, and neither reproduces in `npx storybook build`:

1. **Everything suddenly unstyled** (transparent backgrounds, zero padding/border, but no console errors) — check `main.css`'s import order first (see above). If that's already correct, the dev server's Vite dependency/CSS graph has likely gone stale after many CSS files were added/edited across a long session; restart it (`storybook dev -p 6006`) and hard-refresh the browser tab.
2. **A brand-new component/story's Tailwind classes don't apply at all**, while older, already-compiled classes on the same page render fine — Tailwind's dev-mode content scanner can miss a file that didn't exist when the dev server started. Restart the dev server; this does not affect `storybook build`, which always does a full scan.

When diagnosing either, don't guess from a screenshot alone — check actual computed styles (`getComputedStyle` via a quick script, or the dev server's own log for `Vite [console.error]` lines) before concluding the code itself is wrong.

## Notes for agents

- This is a library, not an app: `index.html` / `src/main.tsx` exist only to host Storybook/dev preview, not a real product surface.
- There's no public `index.ts` barrel yet — components are imported by path (`../components/Button`). If adding one, check with the user first since it changes the package's public API shape.
- Keep new components consistent with existing reference implementations for API shape and file layout: `Button.tsx`/`TextInput.tsx` for plain HTML-element components, `Checkbox.tsx`/`RadioGroup.tsx`/`Select.tsx` for Radix-backed components with a `label` prop, `CheckboxGroup.tsx` for options-array/group components, and `Container.tsx`/`GridContainer.tsx` for container-query components.
