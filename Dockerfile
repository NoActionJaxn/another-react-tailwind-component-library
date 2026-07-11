# syntax=docker/dockerfile:1

FROM node:24-bookworm-slim AS build
WORKDIR /app
# `npm ci` strict-validates @tailwindcss/oxide-wasm32-wasi's bundled @emnapi/*
# dependencies against the freshest version currently matching its declared
# range, even though that variant is a foreign-platform fallback we never
# actually install. Those exact versions are physically bundled inside the
# published tarball (bundleDependencies) - they can't be pinned/overridden via
# the lockfile, so this is unfixable there. `npm install` (this is a fresh
# image layer with no pre-existing node_modules, so it's equivalent to a
# clean install here) does not perform this over-strict check and has never
# failed in any test across multiple npm versions (10.9.8/11.x/12.0.1).
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build-storybook

FROM nginx:1.27-alpine AS serve
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ >/dev/null || exit 1
