@echo off
echo ========================================
echo   Push Rubies Project to GitHub
echo ========================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit: Rubies Expense Tracker with TypeScript and Calendar"
    git branch -M main
)

echo.
echo Adding remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/omagemz/rubies-expense-tracker.git

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo   Done! Check your repository at:
echo   https://github.com/omagemz/rubies-expense-tracker
echo ========================================
pause
