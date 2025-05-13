###########################################################################
# Build base image
###########################################################################
FROM node:22-alpine AS base

COPY ./ /var/workdir/
COPY .npmrc /usr/local/etc/npmrc

WORKDIR /var/workdir/

ENV PNPM_VERSION=10.10.0
ENV PNPM_HOME=/usr/local/bin
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$(mktemp)" SHELL="$(which sh)" sh -s --

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
