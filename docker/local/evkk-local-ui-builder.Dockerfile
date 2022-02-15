FROM node:16-alpine
WORKDIR /app
#RUN yarn install --verbose
RUN mkdir -p /app-cache/
EXPOSE 3000
CMD yarn install --network-timeout=1000000 --modules-folder /app-cache/ ; yarn start --modules-folder /app-cache/
