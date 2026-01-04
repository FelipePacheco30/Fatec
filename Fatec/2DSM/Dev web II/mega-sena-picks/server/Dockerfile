FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json tsconfig.json ./
COPY src ./src
COPY data ./data

RUN npm ci

EXPOSE 3001

CMD ["npm", "start"]
