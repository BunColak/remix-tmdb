FROM node:lts-alpine

WORKDIR /usr/share/app

RUN npm i -g pnpm
COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm i --unsafe-perm

COPY ./ ./

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]