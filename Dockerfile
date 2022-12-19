# syntax=docker/dockerfile:1

FROM node:16.17.0-alpine AS base

WORKDIR /app

FROM base as build
COPY . .
RUN npm install
RUN npm run build

FROM base AS final
COPY ["package.json", "package-lock.json*", "./"]
ENV NODE_ENV=production
RUN npm install
COPY --from=build /app/dist/ .

CMD npm run start:docker