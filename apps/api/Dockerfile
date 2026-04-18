FROM node:20-alpine AS development

RUN apk add --no-cache bash netcat-openbsd

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run prisma:generate

RUN npm run build:api

RUN $(npm bin)/tsc prisma/seed.ts; exit 0

FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci --production && npm cache clean --force

COPY . .

COPY --from=development /usr/app/dist ./dist
COPY --from=development /usr/app/prisma ./prisma

RUN echo "before running entrypoint"

CMD ["./apps/api/entrypoint.sh"]
