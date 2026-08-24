@echo off
title Subir Portafolio Dynamind Studios a GitHub
color 0A
cd /d "%~dp0"

echo ======================================================
echo    SUBIENDO PORTAFOLIO DYNAMIND STUDIOS A GITHUB
echo ======================================================
echo.

set /p MSG="Ingresa el mensaje de cambio (o presiona ENTER para auto): "
if "%MSG%"=="" set MSG=Actualizacion del portafolio %date% %time%

echo.
echo [1/3] Preparando archivos...
git add .

echo [2/3] Guardando version...
git commit -m "%MSG%"

echo [3/3] Subiendo a GitHub...
git push origin main

echo.
echo ======================================================
echo    PORTAFOLIO SUBIDO EXITOSAMENTE
echo ======================================================
echo.
pause
