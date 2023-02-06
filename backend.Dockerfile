FROM node:lts-alpine as base

WORKDIR /oko-wallet
COPY ./package.json ./yarn.lock /oko-wallet/

FROM base as dependencies

COPY ./apps/backend/package.json ./apps/backend/yarn.lock /oko-wallet/apps/backend/
COPY ./libs/backend-types/yarn.lock ./libs/backend-types/package.json /oko-wallet/libs/backend-types/
RUN yarn && yarn install:libs-be && yarn install:backend

FROM base as build

COPY ./apps/backend /oko-wallet/apps/backend
COPY ./libs/backend-types /oko-wallet/libs/backend-types
COPY --from=dependencies /oko-wallet/node_modules /oko-wallet/node_modules
COPY --from=dependencies /oko-wallet/apps/backend/node_modules /oko-wallet/apps/backend/node_modules
COPY --from=dependencies /oko-wallet/libs/backend-types/node_modules /oko-wallet/libs/backend-types/node_modules
RUN yarn ts:be && yarn build:backend

FROM base as deploy

COPY --from=build /oko-wallet/node_modules /oko-wallet/node_modules
COPY --from=build /oko-wallet/apps/backend /oko-wallet/apps/backend
COPY --from=build /oko-wallet/libs/backend-types /oko-wallet/libs/backend-types
CMD [ "yarn", "backend" ]
