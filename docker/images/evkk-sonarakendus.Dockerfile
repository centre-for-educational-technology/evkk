FROM node:16-alpine
COPY ./sonarakendus/ /app/
RUN npm install --global http-server@13.0.2
EXPOSE 5001
CMD ["http-server", "/app", "-p", "5001"]