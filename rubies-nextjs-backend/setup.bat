@echo off
echo ========================================
echo  Rubies Backend - Setup Script
echo ========================================
echo.

echo [1/3] Installing dependencies...
call npm install

echo.
echo [2/3] Creating .env file...
if not exist .env (
    copy .env.example .env
    echo .env file created! Please update with your credentials.
) else (
    echo .env file already exists.
)

echo.
echo [3/3] Setup complete!
echo.
echo ========================================
echo  Next Steps:
echo ========================================
echo 1. Edit .env file with your MongoDB credentials
echo 2. Run: npm run dev
echo ========================================
pause
