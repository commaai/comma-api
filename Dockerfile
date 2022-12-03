FROM node:16-bullseye AS build

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install --immutable --immutable-cache --check-cache

COPY . /app/
RUN yarn docs


FROM nginx:1.22

COPY --from=build /app/index.html /app/openapi.yaml /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
