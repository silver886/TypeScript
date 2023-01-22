###########################################################################
# Build base image
###########################################################################
FROM node:18-alpine AS base

COPY . /var/workdir/

WORKDIR /var/workdir/

RUN wget -qO /usr/local/bin/pnpm 'https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64' \
    && chmod +x /usr/local/bin/pnpm

RUN pnpm install --frozen-lockfile

###########################################################################
# Build linter image
###########################################################################
FROM base AS linter

RUN pnpm lint

###########################################################################
# Build unit test image
###########################################################################
FROM base AS test

RUN pnpm test

###########################################################################
# Build bundle image
###########################################################################
FROM base

RUN pnpm bundle
