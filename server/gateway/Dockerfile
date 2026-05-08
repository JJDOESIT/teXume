FROM eclipse-temurin:21-jdk AS builder
WORKDIR /workspace
COPY . .
RUN ./gradlew :gateway:bootJar

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /workspace/gateway/build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]