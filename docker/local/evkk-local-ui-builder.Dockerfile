FROM node:16-alpine
WORKDIR /app
EXPOSE 3000
CMD yarn install ; yarn start