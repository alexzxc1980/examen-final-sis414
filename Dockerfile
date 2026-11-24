FROM node:24-alpine AS frontend
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm ci --no-audit --no-fund
COPY frontend/ ./
RUN npm run build

FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src src
COPY --from=frontend /frontend/dist/vSIAF_FE/browser/ src/main/resources/static/
RUN mvn -B -ntp package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/asignacion-activos-1.0.0.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
