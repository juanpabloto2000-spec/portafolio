@echo off
title Cloudflare Worker Deploy - Dynamind Studios
cd /d c:\proyectos\Dynamind

echo ========================================================
echo   VERIFICANDO AUTENTICACION EN CLOUDFLARE...
echo ========================================================
echo.

call npx wrangler whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] No se detecto sesion activa en Cloudflare.
    echo [*] Abriendo el navegador para autorizar Wrangler...
    echo.
    call npx wrangler login
    echo.
)

echo ========================================================
echo   PUBLICANDO SUITE AEO Y AUDIO NEURONAL EN CLOUDFLARE...
echo ========================================================
echo.
call npx wrangler deploy
echo.

if %errorlevel% equ 0 (
    echo ========================================================
    echo   DEPLOY EXITOSO! Ya puedes auditar en isitagentready.com
    echo ========================================================
) else (
    echo ========================================================
    echo   HUBO UN PROBLEMA EN EL DEPLOY. REVISA EL MENSAJE ARRIBA.
    echo ========================================================
)

echo.
pause
