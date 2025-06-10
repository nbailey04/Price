@echo off
REM Start Docker Compose in detached mode
docker-compose up -d

REM Wait some seconds for the frontend to be ready
timeout /t 10 /nobreak > nul

REM Open the frontend URL in default browser (adjust port if needed)
start http://localhost:3000
