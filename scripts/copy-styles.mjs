// Runs after both `tsc -p tsconfig.build.json` (declarations) and
// `vite build --config vite.lib.config.ts` (JS) have populated dist/.
//
// Does two things:
//  1. Copies the raw Tailwind source CSS (theme.css, components.css, and
//     each per-component CSS file) into dist/styles verbatim. These are NOT
//     pre-compiled - consumers run their own Tailwind v4 build over them,
//     which is why tailwindcss is a peer dependency rather than bundled.
//     main.css is intentionally excluded: it's this repo's own Storybook/dev
//     entry and imports the Tailwind engine itself, which must only happen
//     once, in the consumer's own root CSS.
//  2. Strips the .ts/.tsx extensions that `tsc`'s declaration emit leaves on
//     relative import specifiers (tsc only rewrites these under
//     node16/nodenext module resolution, which this project doesn't use for
//     its Storybook/dev build). A bare specifier like "./components/Button"
//     resolves correctly to Button.d.ts under any moduleResolution a
//     consumer might have, whereas the literal ".tsx" suffix that tsc emits
//     does not, since we don't ship .tsx source.

import { cpSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const srcStyles = join(rootDir, "src/styles");
const distStyles = join(rootDir, "dist/styles");
const distDir = join(rootDir, "dist");

cpSync(join(srcStyles, "theme.css"), join(distStyles, "theme.css"));
cpSync(join(srcStyles, "components.css"), join(distStyles, "components.css"));
cpSync(join(srcStyles, "components"), join(distStyles, "components"), {
  recursive: true,
});

const addSourceHint = (cssPath) => {
  const relativeToIndex = relative(dirname(cssPath), join(distDir, "index.js"));
  const contents = readFileSync(cssPath, "utf8");
  writeFileSync(
    cssPath,
    `@source "${relativeToIndex}";\n\n${contents}`,
  );
};

addSourceHint(join(distStyles, "components.css"));
for (const file of readdirSync(join(distStyles, "components"))) {
  addSourceHint(join(distStyles, "components", file));
}

const walk = (dir, files = []) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, files);
    } else if (entry.endsWith(".d.ts")) {
      files.push(full);
    }
  }
  return files;
};

for (const file of walk(distDir)) {
  const contents = readFileSync(file, "utf8");
  const fixed = contents.replace(
    /from "(\.[^"]+?)\.tsx?"/g,
    'from "$1"',
  );
  if (fixed !== contents) {
    writeFileSync(file, fixed);
  }
}

console.log("Copied styles and fixed declaration import extensions.");
