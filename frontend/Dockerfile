FROM node:lts-alpine as build-stage
ARG REACT_APP_GRAPHQL_URI
ENV REACT_APP_GRAPHQL_URI=$REACT_APP_GRAPHQL_URI
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
