ARG YARN_VERSION=4.2.2

from node:18-bullseye
WORKDIR /usr/src/app

RUN apt-get update \
    && apt-get install -y git \
    && rm -rf /var/lib/apt/lists/*

RUN git config --global --add safe.directory /usr/src/app

COPY ./package.json ./yarn.lock ./
COPY .yarnrc.yml ./.yarnrc.yml
COPY yarn.lock ./yarn.lock
COPY .yarn ./.yarn

RUN npm install -g corepack@latest \
    && corepack enable \
    && corepack prepare yarn@$YARN_VERSION --activate \
    && yarn set version $YARN_VERSION \
    && corepack yarn --version

# RUN yarn

EXPOSE 3333

ENTRYPOINT ["npm", "run", "dev"]
