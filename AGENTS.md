# AGENTS.md

Guidance for AI coding agents working in this repo.

## What this is

A React + TypeScript + Tailwind CSS component library, built with Vite and documented/tested via Storybook. Most interactive components wrap a Radix UI primitive (`radix-ui` package). Components ship a companion CSS file (Tailwind `@apply` rules under `@layer components`) rather than relying on inline utility classes for variant styling.

## Commands

```bash
npm run build             # tsc -b && vite build
npm test                  # vitest run
npm run lint               # eslint .
npm run lint:fix           # eslint . --fix
npm run format              # prettier --write .
npm run storybook           # Storybook dev server on :6006
npm run build-storybook      # Static Storybook build
npm run docker:preview       # Build the Storybook Docker image and run it at localhost:8080
```

Component tests run through Storybook's Vitest addon (real-browser mode via Playwright/Chromium, not jsdom), driven by the `test` project in `vite.config.ts`. Every `*.stories.tsx` file is auto-discovered and run as a test (rendering each story and running its `play` function, if any) — there's no separate `*.test.tsx` convention; add real assertions directly to a story's `play` function using `storybook/test`'s `within`/`userEvent`/`expect`/`screen`/`waitFor`/`fn` rather than creating a parallel test file. Every component has at least one story with a `play` function exercising real behavior, not just render-only smoke testing — match that when adding a new component/story.

A few patterns that came up repeatedly writing these (see the actual stories for full examples):

- Radix content that renders into a portal (`Dialog`, `AlertDialog`, `Select`, `Navigation`'s dropdowns) lives outside `canvasElement` — query it with `screen` (whole-document), not `within(canvasElement)`.
- Radix's `Presence`-based unmount (dialog/alertdialog closing) waits for the CSS exit transition before actually removing the element — assert with `waitFor(() => expect(...).not.toBeInTheDocument())`, not a synchronous assertion, or it'll fail on a still-mounted-but-closing element.
- A JSX boolean attribute like `aria-hidden={someBoolean}` renders literally as `aria-hidden="false"` (not an absent attribute) — `toHaveAttribute("aria-hidden", "false")`, not `not.toHaveAttribute("aria-hidden")`.
- An element with no accessible role/name (a decorative `Separator`, an icon-only button with no `aria-label`) can't be queried via `getByRole` — fall back to the element's own class (`canvasElement.querySelector(".another-x")`) or, if there's exactly one candidate in the story, an unfiltered `getByRole` without a `name` filter.

**Real-browser testing requires Playwright's system dependencies** (`sudo npx playwright install-deps`) — without them, `npx vitest run` fails with `chrome-headless-shell: error while loading shared libraries: libnspr4.so`. Also note: `vite.config.ts`'s `optimizeDeps.include` explicitly lists `aria-query`, `lz-string`, and `pretty-format` — these are deep transitive CJS dependencies (via Storybook's test setup file, not our own source) that Vite's dependency scanner never discovers on its own, since nothing in the app's normal entry graph imports them. Without pre-bundling them explicitly, the browser gets served the raw CJS file and fails with `SyntaxError: The requested module '...' does not provide an export named 'X'`. If a _new_ test failure looks like that (not an assertion failure, a module/import error), add the missing package to that list before assuming the test itself is wrong. Separately, `@storybook/addon-vitest` keeps its own dependency cache at `node_modules/.cache/storybook` (distinct from Vite's own `node_modules/.vite`) — if you see a bizarre "Cannot read properties of null (reading 'useCallback')" or similar cross-file test pollution, clear both before assuming it's a real bug.

A Husky `pre-commit` hook runs `lint-staged` (`eslint --fix` + `prettier --write`) on staged `js,jsx,ts,tsx,json,css,md` files, then runs the full test suite (`npm test`) and blocks the commit if any test fails. Don't bypass it with `--no-verify`.

**Verifying a change**: `npx tsc -b` (typecheck) plus `npx storybook build` (production build) is the reliable way to confirm a component _compiles_ — see "Dev server pitfalls" below for why the live `storybook dev` process can lie to you about styling. Neither of those catches genuine runtime errors (a bad default-export interop, a component that throws on render) since building never actually executes React rendering. For anything wrapping a new third-party dependency, also load the story in a real browser (headless Chromium is fine) and check the console before calling it done — see the `Pagination`/`react-paginate` case below.

## Repo layout

- `src/components/` — component implementations. Current set: `Accolades`, `Accordion`, `AlertDialog`, `Anchor`, `Avatar`, `BlogPost`, `Button`, `ButtonGroup`, `Checkbox`, `CheckboxGroup`, `Collapsible`, `Container`, `Dialog`, `FlexContainer`, `Footer`, `GridContainer`, `Header`, `Hero`, `Label`, `ListCard`, `Navigation`, `Pagination`, `PasswordInput`, `PostCard`, `ProfileCard`, `ProfilePage`, `Progress`, `RadioGroup`, `Recents`, `Secure`, `Select`, `Separator`, `Slider`, `Switch`, `TextInput`, `Typography`.
- `src/icons/` — small inline SVG icon components (`Check`, `ChevronDown`, `ChevronUp`, `Close`, `EyeOpen`, `EyeClosed`, `Menu`). Use Tailwind's `fill-current`/`stroke-current` (whichever the icon actually draws with) on the `<svg>` or the specific element that had a hardcoded fill/stroke, so the icon inherits its color from the surrounding text color instead of a fixed hex value. All SVG attributes must be camelCase JSX props (`strokeWidth`, `strokeLinecap`, `strokeLinejoin`, `fillRule`, `clipRule`) — the kebab-case HTML attribute form silently fails as a React prop and logs "Invalid DOM property" at runtime, which `tsc`/`build` won't catch since neither renders the component (see "Verifying a change" above).
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

**Wrapping a non-Radix third-party library**

- `Pagination` wraps `react-paginate` (a UMD-bundled package: `module.exports = { __esModule: true, default: <Component> }`). Default-import interop for that shape is bundler-dependent — it broke specifically under the Vite dev server (`Element type is invalid... Check the render method of Pagination`) despite `tsc -b` and `storybook build` both passing clean, because neither of those actually renders the component. The fix is to unwrap defensively regardless of how the bundler resolves it: `const ReactPaginate = (ReactPaginateImport as unknown as { default?: typeof ReactPaginateImport }).default ?? ReactPaginateImport;`. Apply the same defensive unwrap to any future default-imported UMD/CJS dependency rather than trusting a bare `import X from "pkg"`.
- Prefer using our own components for anything a third-party library lets you fully replace, and only delegate to the library for the part that's genuinely hard to reimplement. `Pagination` renders its own `Button` for Previous/Next (driving the page state directly) and only hands the numbered-page/ellipsis logic to `react-paginate`, hiding its built-in prev/next (`previousClassName`/`nextClassName` set to `"hidden"`) rather than trying to reskin them.
- `Pagination.tsx` is a generic component (`Pagination<T>`). Storybook's `Meta`/`StoryObj` typing collapses a generic's type parameter to `unknown` and requires every `Story` to supply `args` satisfying the (non-generic-aware) required props, even when the story only uses a custom `render` and ignores args entirely. Fix by giving `meta` itself a placeholder `args` (e.g. `{ items: [...], renderItem: () => null }`) so individual stories don't need to redeclare it.

**Prop patterns established across components**

- `label?: ReactNode` — render the shared `Label` component internally, wired to the control via `htmlFor`/`id`, generating an id with `useId()` when the caller doesn't pass one (`Checkbox`, `TextInput`, `Select`).
- `orientation?: "horizontal" | "vertical"` — layout of a control relative to its label, applied as `data-orientation` on a dedicated `*-group` wrapper div (`TextInput`, `Select`). Default varies by component; pick whichever reads naturally for that control.
- `reverse?: boolean` — flips flex order via `data-reverse="true"` + `flex-row-reverse`, for controls where the "label before or after" question matters more than a full orientation axis (`Checkbox`, `Switch`).
- `options: (string | { value: string; label?: ReactNode })[]` plus `view?: "list" | "grid"` — auto-generate items from a flat array (`RadioGroup`, `CheckboxGroup`). Grid view uses static, literal Tailwind responsive classes (`sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`), never dynamically interpolated class strings — Tailwind's scanner only detects classes that appear literally in source.
- `as?: ElementType` / a literal tag-name union — polymorphic root element (`Typography`, `Anchor`, `Container` and its wrappers).
- Container-query components (`Container`, `GridContainer`, `FlexContainer`) use `@container` + Tailwind v4's `@xs`/`@sm`/`@md`/... variants instead of viewport media queries, so nested layout responds to the container's own width. Props like `GridContainer`'s `columns` (1–9) are implemented as **static, fully-enumerated CSS rules** keyed by `[data-columns="1"]` through `[data-columns="9"]` in `grid-container.css` — again because Tailwind can't scan a dynamically-built class string at runtime.
- When a group component's own CSS needs both an "item wrapper" class and a "list of items" container class, name them distinctly (e.g. `Checkbox`'s own internal `another-checkbox-group` wrapper — a single checkbox + its label — vs. `CheckboxGroup`'s `another-checkbox-group-list` — the container of many checkboxes). Reusing a name for two different scopes causes real collisions.
- Watch for prop names that collide with a native HTML attribute of a _different_ type than what you want. `title` (native: plain string, tooltip) and `role` (native: `AriaRole` enum) are the two that have bitten us so far — `PostCard`'s `title?: ReactNode` and `ProfileCard`'s `role?: ReactNode` both needed `Omit<HTMLAttributes<HTMLElement>, "title">` / `"role"` on their props interface to compile.
- The card family (`PostCard`, `ProfileCard`, `ListCard`) shares one slot-based shape: `image`/`cover`, a heading slot, `meta`, a body-copy slot, `footer`, all rendered via `Typography` internally (`as="h3"`/`as="p"` with `font="accent"`/`"sans"`), plus `as`/`variant`. Each is a distinct component/file rather than one configurable "Card" — pick a name describing what it's _for_ (a post, a profile, a list row), not its layout, and add new cards the same way rather than growing one component's prop surface indefinitely.

**Styling**

- New component styles go in their own file under `src/styles/components/<kebab-name>.css`, wrapped in `@layer components`, and imported from `src/styles/components.css` (keep that barrel file alphabetically ordered).
- Design tokens (fonts, color scales) belong in `src/styles/theme.css` under `@theme`, using Tailwind v4's CSS-first theme config. Prefer referencing existing `--color-default-*` tokens over introducing new raw colors.
- Interactive control minimum sizing: text-style inputs and triggers (`TextInput`, `Select`) use `min-w-xs` so they don't collapse to content width.
- **Dark mode**: `theme.css` inverts the `--color-default-*` scale under a `:root[data-theme="dark"]` block, sitting as a sibling right after `@theme` — it cannot be nested inside `@theme` itself (Tailwind v4 hard-errors: "`@theme` blocks must only contain custom properties or `@keyframes`"). Since every component keys off `--color-default-*` only, this is the only place dark mode logic lives; components never need their own `dark:` variants. It's opt-in via the attribute only, deliberately not tied to `prefers-color-scheme` — see the README's "Dark mode" section for why. Storybook previews it via `.storybook/preview.tsx`'s `withThemeByDataAttribute` decorator (from `@storybook/addon-themes`, toggling the same attribute, defaulting to dark) and `.storybook/preview.css` (sets the preview canvas's own background to `--color-default-50`, since that's a docs-site-only concern and isn't shipped in `main.css`).

**Stories**

- Add a `src/stories/<Component>.stories.tsx` for every new component, with a `Meta` (`title`, `component`, `parameters.docs.description`, `tags: ["autodocs"]`, `argTypes` describing each prop) and at least a default `Story`.
- `title` is `Components/<ComponentName>` for most components — a flat group, no further sub-categorization. Three exceptions get their own top-level group instead: `Dialog`/`AlertDialog` use `Dialogs/<Name>`, card-shaped components use `Cards/<Name>` (`PostCard`, `ProfileCard`, `ListCard`), and full page layouts use `Pages/<Name>` (`BlogPost`, `ProfilePage`). Plain utility functions (`src/lib/*.ts`, not components) use `Utilities/<functionName>` and go in `src/stories/`, same as component stories, with a small local demo component rendering the input/output rather than the utility itself (see `Cn.stories.tsx`). `preview.tsx`'s `storySort` orders the groups Docs, Components, Dialogs, Cards, Pages, Utilities, alphabetical within each.
- `argTypes` descriptions are user-facing documentation — write them as full sentences.
- `main.ts` sets `docs.docsMode: true`, so the sidebar shows one entry per component (its autodocs page) rather than an expandable folder of individual story names — every story variant still renders, just embedded inline on that single page instead of requiring separate navigation. Don't rely on individual stories being independently reachable in the sidebar when writing docs/examples that link to a specific one.
- For container-query components, demonstrate the responsive behavior with a resizable wrapper (`className="resize-x overflow-auto"` around the story content) rather than only a fixed-size box — see `Container.stories.tsx` / `GridContainer.stories.tsx` / `FlexContainer.stories.tsx`.

**TypeScript / lint / format**

- Strict TS via `tsc -b`; keep exported prop types explicit (avoid `any`).
- ESLint flat config (`eslint.config.js`) with `typescript-eslint`, `react-hooks`, `react-refresh`, `eslint-plugin-storybook`, and Prettier integration (`prettier/prettier` is an ESLint error, not just a formatter warning). Run `npm run lint:fix` before considering a change done.
- Prettier config is default (`prettier.config.js` is empty) — don't add custom formatting options without discussion.

## Dev server pitfalls (read before reporting "it's broken")

The first two failure modes below look like real bugs but aren't — both are specific to the long-running `storybook dev` process, and neither reproduces in `npx storybook build`. The third one _is_ a real bug, but `tsc -b`/`storybook build` won't have caught it either, for a different reason:

1. **Everything suddenly unstyled** (transparent backgrounds, zero padding/border, but no console errors) — check `main.css`'s import order first (see above). If that's already correct, the dev server's Vite dependency/CSS graph has likely gone stale after many CSS files were added/edited across a long session; restart it (`storybook dev -p 6006`) and hard-refresh the browser tab.
2. **A brand-new component/story's Tailwind classes don't apply at all**, while older, already-compiled classes on the same page render fine — Tailwind's dev-mode content scanner can miss a file that didn't exist when the dev server started. Restart the dev server; this does not affect `storybook build`, which always does a full scan.
3. **A story renders nothing / throws "Element type is invalid" or similar** — this is not dev-server staleness, it's a genuine runtime error, most often a default-export interop mismatch with a newly-added third-party dependency (see the `react-paginate` note above). `tsc -b` and `storybook build` both pass in this case because neither one renders the component; you only find out by loading the story and checking the console.

When diagnosing any of these, don't guess from a screenshot alone — check actual computed styles or the browser console (`getComputedStyle` via a quick script, or the dev server's own log for `Vite [console.error]` lines) before concluding the code itself is wrong, and before concluding it's _right_.

## Deployment and the staging environment

Storybook is deployed as a static site to a single Oracle Cloud VM, behind Cloudflare. The VM also hosts other, unrelated projects, so this project doesn't own ports 80/443 itself — a shared Caddy reverse proxy (`/opt/edge`, not part of this repo) owns those ports and routes by hostname to each project's containers over a shared external Docker network (`edge`). Two environments of this project share that network:

- `main` branch → `storybook` service (production, `another-react-tailwind-component-library.com`), via `.github/workflows/deploy-storybook.yml`.
- `staging` branch → `storybook-staging` service (`staging.another-react-tailwind-component-library.com`), via `.github/workflows/deploy-storybook-staging.yml`.

Each workflow only runs `docker compose pull/up -d <its own service>` inside `/opt/storybook` on the VM, so deploying one never restarts the other.

`nginx/nginx.conf` inside this repo's image is plain HTTP only (no TLS, no per-hostname logic) — it doesn't know or care which domain it's being reached as. Caddy owns the domain-to-container mapping and terminates TLS one hop up, so `main` and `staging` run the exact same nginx config with no divergence between branches. (Older history: this used to differ per branch, with the container terminating TLS itself and `main`'s nginx doing the staging reverse-proxy hop, guarded by a `.gitattributes` `merge=binary` rule forcing a manual conflict on any cross-branch merge of this file — both are gone now that the two branches' copies are identical.)

Also watch `server_names_hash_bucket_size` if this pattern is ever reintroduced with per-hostname nginx logic — nginx's default (64 bytes) is too small for long domain names and it refuses to start entirely rather than erroring gracefully.

## Notes for agents

- This is a library, not an app: there's no `index.html`/`src/main.tsx` app shell (removed as unused Vite-template leftovers) and no `dev`/`preview` npm scripts. Storybook is the only dev/preview surface (`.storybook/preview.tsx` imports `main.css` directly, independent of any app entry). `npm run build` produces the publishable package (`tsc -p tsconfig.build.json` + `vite build --config vite.lib.config.ts` + `scripts/copy-styles.mjs`) — see `vite.lib.config.ts` and `tsconfig.build.json`, which are separate from the Storybook/dev `vite.config.ts`.
- `src/index.ts` is the public API barrel (every component + its prop types, re-exported). Keep it in sync when adding or renaming a component's exports.
- Keep new components consistent with existing reference implementations for API shape and file layout: `Button.tsx`/`TextInput.tsx` for plain HTML-element components, `Checkbox.tsx`/`RadioGroup.tsx`/`Select.tsx` for Radix-backed components with a `label` prop, `CheckboxGroup.tsx` for options-array/group components, `Container.tsx`/`GridContainer.tsx` for container-query components, `PostCard.tsx` for slot-based card components, and `Pagination.tsx` for components wrapping a non-Radix third-party library.
