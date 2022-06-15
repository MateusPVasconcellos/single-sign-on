FROM node:16-slim AS dependencies

WORKDIR /app

COPY package.json .

RUN yarn install

#############################################################################

FROM node:16-slim AS service

# Create directory granting permissions
RUN mkdir -p /app
RUN chown node /app
WORKDIR /app

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

EXPOSE 3000

FROM service as production

ENV NODE_PATH=./gc

RUN yarn build

USER node
