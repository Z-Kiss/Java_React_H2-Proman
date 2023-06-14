FROM node:alpine3.18
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend /frontend
RUN npm run build

FROM maven:3-eclipse-temurin-20-alpine
WORKDIR /app
COPY backend /app
COPY --from=0 /frontend/build /app/src/main/resources/static
RUN mvn clean install
CMD java -jar target/backend-0.0.1-SNAPSHOT.jar




