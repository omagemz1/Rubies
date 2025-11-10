@echo off
echo ========================================
echo  Rubies Expense Tracker
echo  Complete Installation Script
echo ========================================
echo.

echo This will install both backend and frontend
echo Press any key to continue or Ctrl+C to cancel...
pause >nul

echo.
echo ========================================
echo  [1/2] Installing Backend
echo ========================================
cd rubies-nextjs-backend
call npm install
if not exist .env (
    copy .env.example .env
    echo Backend .env created!
)
cd ..

echo.
echo ========================================
echo  [2/2] Installing Frontend
echo ========================================
cd rubies-vite-frontend
call npm install
if not exist .env (
    copy .env.example .env
    echo Frontend .env created!
)
cd ..

echo.
echo ========================================
echo  Installation Complete!
echo ========================================
echo.
echo MongoDB Configuration:
echo   Database: Rubies
echo   Collection: data
echo   Connection: mongodb+srv://admin:admin123@cluster0.q6532uz.mongodb.net/Rubies
echo.
echo ========================================
echo  To Run the Application:
echo ========================================
echo.
echo 1. Open Terminal 1 - Start Backend:
echo    cd rubies-nextjs-backend
echo    npm run dev
echo.
echo 2. Open Terminal 2 - Start Frontend:
echo    cd rubies-vite-frontend
echo    npm run dev
echo.
echo 3. Open Browser:
echo    http://localhost:5173
echo.
echo ========================================
echo  Quick Start Commands:
echo ========================================
echo Backend:  cd rubies-nextjs-backend ^&^& npm run dev
echo Frontend: cd rubies-vite-frontend ^&^& npm run dev
echo.
echo See SETUP_GUIDE.md for detailed instructions
echo ========================================
pause
