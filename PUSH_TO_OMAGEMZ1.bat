@echo off
echo ========================================
echo   Push to omagemz1/Rubies Repository
echo ========================================
echo.

cd /d "d:\rubies nextjs"

REM Check if .git exists, if not initialize
if not exist ".git" (
    echo Initializing Git repository...
    git init
    echo.
)

echo Adding all files...
git add .
echo.

echo Committing changes...
git commit -m "Initial commit: Rubies Expense Tracker with TypeScript and Calendar view"
echo.

echo Removing old remote if exists...
git remote remove origin 2>nul

echo Adding omagemz1/Rubies as remote...
git remote add origin https://github.com/omagemz1/Rubies.git

echo Setting branch to main...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo   Done! Check your repository at:
echo   https://github.com/omagemz1/Rubies
echo ========================================
echo.
pause
