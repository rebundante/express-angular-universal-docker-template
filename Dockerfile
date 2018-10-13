FROM node:latest

WORKDIR /usr/src/app
COPY ./dist/server.js .
COPY ./dist/browser ./dist/browser
COPY ./dist/server ./dist/server
CMD node server.js
EXPOSE 80