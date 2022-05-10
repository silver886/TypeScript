###########################################################################
# Build development base image
###########################################################################
FROM node:16-alpine AS dev-base

COPY . /var/workdir/

WORKDIR /var/workdir/

RUN wget -O- https://get.pnpm.io/v6.14.js | node - add --global pnpm@6

RUN pnpm install --frozen-lockfile

###########################################################################
# Build linter image
###########################################################################
FROM dev-base AS dev-linter

RUN pnpm lint

###########################################################################
# Build unit test image
###########################################################################
FROM dev-base AS dev-test

RUN pnpm test

###########################################################################
# Build bundle image
###########################################################################
FROM dev-base

RUN pnpm bundle
