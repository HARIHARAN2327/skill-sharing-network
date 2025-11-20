# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy Maven wrapper and pom.xml first to leverage Docker cache
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw mvnw.cmd ./

# Download dependencies (will be cached if pom.xml doesn't change)
RUN ./mvnw -B -q -DskipTests dependency:go-offline || mvn -B -q -DskipTests dependency:go-offline

# Copy the rest of the project
COPY src src

# Build the jar
RUN ./mvnw -B -DskipTests clean package || mvn -B -DskipTests clean package

# Runtime stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy built jar from previous stage
COPY --from=build /app/target/*.jar app.jar

# Render provides PORT env var; Spring Boot already uses server.port=${PORT:8080}
EXPOSE 8080

ENTRYPOINT ["java","-jar","/app/app.jar"]
