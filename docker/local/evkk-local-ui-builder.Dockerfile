FROM node:16-alpine
WORKDIR /app
RUN yarn install --verbose
EXPOSE 3000
CMD ["yarn", "start"]
