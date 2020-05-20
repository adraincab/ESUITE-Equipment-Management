FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install -g typescript
RUN npm install

COPY . /usr/src/app

EXPOSE 3000
EXPOSE 6379

CMD ["redis-server"]
CMD ["npm", "run", "serve"]
