FROM maven
WORKDIR /backend
COPY ./ /backend
RUN mvn install
CMD mvn spring-boot:run
EXPOSE 8080
