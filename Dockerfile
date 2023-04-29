FROM node:16.12-alpine
RUN apk add --no-cache gcompat
WORKDIR /app

#ENV REDIS_SENTINELS '[{ "host": "localhost", "port": 26379 }]'
#ENV REDIS_SENTINEL_MASTER_NAME mymaster

COPY ["package.json", "package-lock.json*", "./"]
RUN npm i
COPY . .

CMD ["npm", "start"]
