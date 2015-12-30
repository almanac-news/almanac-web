FROM node:5

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY . /usr/src/app
RUN npm rebuild node-sass

EXPOSE 3000

CMD [ "npm", "start" ]
