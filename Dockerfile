# build environment
FROM node:16.14.0-stretch-slim as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY yarn.lock /app/yarn.lock
COPY package.json /app/package.json

RUN yarn --network-timeout 100000

RUN echo "building..."
COPY . /app

ARG NODE_ENV
ARG VITE_HASURA_WS_ENDPOINT
ARG VITE_HASURA_GRAPHQL_ENDPOINT
ARG VITE_GRAPHQL_PLUS_SERVER_URL
ARG VITE_CUBEJS_MYSQL_API_URL
ARG VITE_CUBEJS_PG_API_URL

ENV NODE_ENV $NODE_ENV
ENV VITE_HASURA_WS_ENDPOINT $VITE_HASURA_WS_ENDPOINT
ENV VITE_HASURA_GRAPHQL_ENDPOINT $VITE_HASURA_GRAPHQL_ENDPOINT
ENV VITE_GRAPHQL_PLUS_SERVER_URL $VITE_GRAPHQL_PLUS_SERVER_URL

ENV VITE_CUBEJS_MYSQL_API_URL $VITE_CUBEJS_MYSQL_API_URL
ENV VITE_CUBEJS_PG_API_URL $VITE_CUBEJS_PG_API_URL

RUN yarn run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]