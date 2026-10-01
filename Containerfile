ARG SEARXNG_VERSION=latest

FROM docker.io/library/node:22-alpine AS build
WORKDIR /theme
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM docker.io/searxng/searxng:${SEARXNG_VERSION}
COPY --chown=977:977 templates/ /usr/local/searxng/searx/templates/
COPY --chown=977:977 --from=build /theme/dist/electris/ /usr/local/searxng/searx/static/themes/simple/electris/
