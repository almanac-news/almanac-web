FROM node:5-onbuild

RUN npm run compile

EXPOSE 3000