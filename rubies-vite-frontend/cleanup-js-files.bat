@echo off
echo Deleting duplicate JavaScript files...
del /F /Q "src\App.jsx"
del /F /Q "src\main.jsx"
del /F /Q "src\store.js"
del /F /Q "src\components\AddTransactionModal.jsx"
del /F /Q "src\components\ConfirmModal.jsx"
del /F /Q "src\components\TransactionTable.jsx"
del /F /Q "src\features\transactionsSlice.js"
del /F /Q "src\services\api.js"
del /F /Q "src\pages\Dashboard.jsx"
echo Done! All duplicate JavaScript files have been deleted.
echo Your project now runs purely on TypeScript.
pause
