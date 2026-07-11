# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS build
WORKDIR /app
# Alpine's musl libc trips up npm's platform detection for @tailwindcss/oxide's optional
# native binaries, causing it to fall back to installing every platform variant (including
# the wasm32-wasi one, whose floating @emnapi/* range then resolves to a version not pinned
# in the lockfile) and failing `npm ci` with a false "Missing from lock file" error. A glibc
# base image avoids that detection path entirely.
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build-storybook

FROM nginx:1.27-alpine AS serve
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ >/dev/null || exit 1
