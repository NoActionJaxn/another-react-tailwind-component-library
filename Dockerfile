# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /app
# node:22-alpine ships npm 10.9.8, which mishandles bundleDependencies in lockfileVersion 3
# packages (e.g. @tailwindcss/oxide-wasm32-wasi's bundled @emnapi/*), failing `npm ci` with
# false "Missing from lock file" errors. Upgrading npm first avoids that bug.
RUN npm install -g npm@latest
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build-storybook

FROM nginx:1.27-alpine AS serve
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ >/dev/null || exit 1
