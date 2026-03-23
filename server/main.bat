@echo off

call gradlew clean build

@REM start cmd /k gradlew :gateway:bootRun
@REM start cmd /k gradlew :backend:bootRun
@REM start cmd /k gradlew :template:bootRun