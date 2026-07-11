# syntax=docker/dockerfile:1

FROM node:24-bookworm-slim AS build
WORKDIR /app
# Both npm 10.9.8 (bundled with node:22) AND npm 12.0.1 (the actual current
# "latest") have a real bug validating bundleDependencies + optional platform
# packages during `npm ci`: they strict-validate @tailwindcss/oxide-wasm32-wasi's
# floating @emnapi/* range even though that variant is never actually installed
# on this platform, and fail with a false "Missing from lock file" error
# whenever a newer @emnapi patch gets published upstream. Confirmed directly by
# running each version locally against an untouched lockfile: `npx npm@10.9.8
# ci` and `npx npm@12.0.1 ci` both reproduce it; `npx npm@11 ci` does not.
# Pinning to the npm 11 line specifically - NOT `npm@latest`, which is what
# pulled in the still-broken 12.0.1 in the first place.
COPY package.json package-lock.json ./
RUN npm install -g npm@11 && npm ci
COPY . .
RUN npm run build-storybook

FROM nginx:1.27-alpine AS serve
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ >/dev/null || exit 1
