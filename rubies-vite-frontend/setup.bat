@echo off
echo ========================================
echo  Rubies Frontend - Setup Script
echo ========================================
echo.

echo [1/3] Installing dependencies...
call npm install

echo.
echo [2/3] Creating .env file...
if not exist .env (
    copy .env.example .env
    echo .env file created!
) else (
    echo .env file already exists.
)

echo.
echo [3/3] Setup complete!
echo.
echo ========================================
echo  Next Steps:
echo ========================================
echo 1. Make sure backend is running
echo 2. Run: npm run dev
echo 3. Open: http://localhost:5173
echo ========================================
pause
