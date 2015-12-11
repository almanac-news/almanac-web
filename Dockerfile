FROM node:5-onbuild

RUN npm run deploy

EXPOSE 3000