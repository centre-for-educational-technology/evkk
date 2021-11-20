FROM node:16-alpine AS ui-builder
COPY ./ui /app
RUN cd /app && yarn install && yarn build

FROM node:16-alpine AS ui
RUN yarn global add serve@12.0.1
COPY --from=ui-builder /app/build /app/ui
EXPOSE 5000
CMD ["serve", "-s", "/app/ui"]
