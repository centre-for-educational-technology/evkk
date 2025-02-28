FROM openjdk:11-jdk-stretch AS backend-builder
COPY . /app
WORKDIR /app
RUN ./gradlew clean bootJar --no-daemon

FROM openjdk:11-jre-stretch AS backend
COPY --from=backend-builder /app/dist /app
