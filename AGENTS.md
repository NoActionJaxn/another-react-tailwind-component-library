# AGENTS.md

Guidance for AI coding agents working in this repo.

## What this is

A React + TypeScript + Tailwind CSS component library, built with Vite and documented/tested via Storybook. Components ship a companion CSS file (Tailwind `@apply` rules under `@layer components`) rather than relying on inline utility classes for variant styling.

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

## Repo layout

- `src/components/` — component implementations (`Button.tsx`, `ButtonGroup.tsx`, `TextInput.tsx`, `PasswordInput.tsx`, ...)
- `src/icons/` — small inline SVG icon components
- `src/lib/cn.ts` — `cn()` (classnames + tailwind-merge) and `cnWhitelisted()` helpers
- `src/stories/` — one `*.stories.tsx` per component, colocated by name (not colocated with the component file)
- `src/styles/` — `theme.css` (design tokens via `@theme`), `main.css` (entry, imports theme + components + tailwindcss), `components.css` (barrel import), `components/*.css` (per-component `@layer components` rules)
- `.storybook/` — Storybook configuration

## Conventions

**Components**

- Named export + `export default` for every component (see `Button.tsx`, `PasswordInput.tsx`).
- Set `Component.displayName`.
- Function components with a props destructure that supplies defaults, e.g. `size = "md"`, `variant = "default"`, spreading `...rest` onto the native element.
- Props interfaces extend the relevant native HTML attributes interface (`ButtonHTMLAttributes<HTMLButtonElement>`, etc.) and are named `<Component>Props`.
- Size and variant are exposed as `data-size` / `data-variant` attributes on the DOM node, not as Tailwind classes baked into the component — actual styling lives in the component's CSS file and targets `[data-variant="..."]` / `[data-size="..."]`.
- Every component's root class follows the `another-<kebab-name>` prefix (e.g. `another-button`). `cnWhitelisted` treats `another-` prefixed classes as always allowed.
- Use `cn(...)` from `src/lib/cn.ts` to merge conditional classes and caller-supplied `className`; don't hand-roll class concatenation.
- Prefer composition over new variants where reasonable (e.g. `PasswordInput` wraps `TextInput` + `Button` rather than reimplementing an input).

**Styling**

- New component styles go in their own file under `src/styles/components/<kebab-name>.css`, wrapped in `@layer components`, and imported from `src/styles/components.css`.
- Design tokens (fonts, color scales) belong in `src/styles/theme.css` under `@theme`, using Tailwind v4's CSS-first theme config. Prefer referencing existing `--color-default-*` tokens over introducing new raw colors.

**Stories**

- Add a `src/stories/<Component>.stories.tsx` for every new component, with a `Meta` (`title`, `component`, `parameters.docs.description`, `tags: ["autodocs"]`, `argTypes` describing each prop) and at least a default `Story`.
- `argTypes` descriptions are user-facing documentation — write them as full sentences.

**TypeScript / lint / format**

- Strict TS via `tsc -b`; keep exported prop types explicit (avoid `any`).
- ESLint flat config (`eslint.config.js`) with `typescript-eslint`, `react-hooks`, `react-refresh`, `eslint-plugin-storybook`, and Prettier integration (`prettier/prettier` is an ESLint error, not just a formatter warning). Run `npm run lint:fix` before considering a change done.
- Prettier config is default (`prettier.config.js` is empty) — don't add custom formatting options without discussion.

## Notes for agents

- This is a library, not an app: `index.html` / `src/main.tsx` exist only to host Storybook/dev preview, not a real product surface.
- There's no public `index.ts` barrel yet — components are imported by path (`../components/Button`). If adding one, check with the user first since it changes the package's public API shape.
- Keep new components consistent with `Button.tsx` and `TextInput.tsx` as the reference implementations for API shape and file layout.
