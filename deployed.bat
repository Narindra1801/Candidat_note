@echo off
echo ==========================================
echo Starting Note Candidat Application...
echo ==========================================

REM Launch the browser to the application URL
start http://localhost:8081

REM Build and run the Spring Boot application
mvn clean spring-boot:run

pause

pause
