#FROM maven:3.3.9-jdk-8
#RUN mkdir -p /api
#WORKDIR /api
#ONBUILD ADD . /api
#ONBUILD RUN mvn clean install

FROM openjdk:8-jdk-alpine
COPY ./target/app-0.0.1-SNAPSHOT.jar /usr/app/
WORKDIR /usr/app
ENTRYPOINT ["java","-jar", "-Dspring.profiles.active=docker","app-0.0.1-SNAPSHOT.jar"]

#FROM openjdk:8-jdk-alpine as build
#WORKDIR /app
#
#COPY mvnw .
#COPY .mvn .mvn
#COPY app/pom.xml .
#RUN ./mvnw dependency:go-offline
#
#COPY app/src src
#RUN ./mvnw package -DskipTests
#RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)
#
#FROM openjdk:8-jre-alpine
#VOLUME /tmp
#ARG DEPENDENCY=/app/target/dependency
#COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
#COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
#COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
#ENTRYPOINT ["java","-cp","app:app/lib/*","com.mnomoko.app.CandyshopApplication"]
