FROM maven:3.8.3-openjdk-11-slim as backend
WORKDIR /backend
COPY ./ /backend
RUN mvn dependency:copy-dependencies
CMD mvn spring-boot:run
EXPOSE 8080

## Stage 3: Create the final Docker image
#FROM adoptopenjdk:11-jre-hotspot
#WORKDIR /proman
#COPY --from=frontend /proman/frontend/build ./frontend
#COPY --from=backend /proman/backend/target/*.jar ./backend.jar
#EXPOSE 8080
#CMD ["java", "-jar", "backend.jar"]
