FROM node AS build
WORKDIR /app
COPY package*.json .
RUN npm run npm:install
COPY . .
RUN npm run webpack:build:production

FROM nginxinc/nginx-unprivileged:mainline-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/conf.d/* /etc/nginx/conf.d
COPY ./nginx/snippets /etc/nginx/snippets
COPY ./nginx/mime.types /etc/nginx/mime.types
