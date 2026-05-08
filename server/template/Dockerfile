FROM eclipse-temurin:21-jdk AS builder
WORKDIR /workspace
COPY . .
RUN ./gradlew :template:bootJar

FROM eclipse-temurin:21-jre
WORKDIR /app
RUN rm -f /etc/apt/apt.conf.d/docker-clean
RUN --mount=type=cache,target=/var/cache/apt apt-get update && apt-get install -y texlive-full \
    && apt-get clean && rm -f /etc/apt/apt.conf.d/docker-clean && rm -rf /var/lib/apt/lists/*
COPY --from=builder /workspace/template/build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]