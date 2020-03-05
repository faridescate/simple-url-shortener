FROM node:12.16.1-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn --production --pure-lockfile

COPY . /app/

EXPOSE 80

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && yarn migrate && node src/index.js
