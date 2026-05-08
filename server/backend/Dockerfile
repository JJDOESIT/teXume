FROM eclipse-temurin:21-jdk AS builder
WORKDIR /workspace
COPY . .
RUN ./gradlew :backend:bootJar

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /workspace/backend/build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]