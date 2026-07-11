# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS build
WORKDIR /app
# npm's automatic platform detection is unreliable in this build environment: it
# ambiguously considers @tailwindcss/oxide's foreign wasm32-wasi fallback variant
# alongside the real native binary, which makes `npm ci` strict-validate that
# variant's own dependency subtree too. Its floating @emnapi/* range can then fail
# with a false "Missing from lock file" error any time a newer patch is published
# upstream - flaky, and unrelated to whether the lockfile is actually stale.
# Passing the platform explicitly removes the ambiguity so npm never considers the
# wasm32 variant at all. Confirmed this alone fixes it, with no lockfile changes.
COPY package.json package-lock.json ./
RUN npm ci --os=linux --cpu=x64 --libc=glibc
COPY . .
RUN npm run build-storybook

FROM nginx:1.27-alpine AS serve
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ >/dev/null || exit 1
