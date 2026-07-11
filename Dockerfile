# syntax=docker/dockerfile:1

FROM node:24-bookworm-slim AS build
WORKDIR /app
# Older bundled npm versions (10.9.8, shipped with node:22) have a real bug
# validating bundleDependencies + optional platform packages during `npm ci`:
# strict-validates @tailwindcss/oxide-wasm32-wasi's floating @emnapi/* range
# even though that variant is never actually installed on this platform, and
# fails with a false "Missing from lock file" error whenever a newer @emnapi
# patch gets published upstream. Confirmed directly: `npx npm@10.9.8 ci`
# reproduces this locally against an untouched lockfile; `npx npm@11.6.1 ci`
# does not. node:24 (current Active LTS) bundles a fixed npm, and `npm
# install -g npm@latest` is kept as a second layer of insurance regardless of
# base image - no lockfile workaround needed either way.
COPY package.json package-lock.json ./
RUN npm install -g npm@latest && npm ci
COPY . .
RUN npm run build-storybook

FROM nginx:1.27-alpine AS serve
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ >/dev/null || exit 1
