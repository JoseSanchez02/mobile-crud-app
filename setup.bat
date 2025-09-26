@echo off
echo Setting up Mobile CRUD Application...

REM Backend Setup
echo Setting up Laravel Backend...
cd backend

REM Copy environment file
if not exist .env (
    copy env.example .env
    echo Created .env file
)

REM Install PHP dependencies
where composer >nul 2>nul
if %errorlevel% equ 0 (
    composer install
    echo Installed PHP dependencies
) else (
    echo Composer not found. Please install Composer first.
    exit /b 1
)

REM Generate app key
php artisan key:generate

REM Create storage link
php artisan storage:link

REM Run migrations
php artisan migrate

echo Backend setup complete!

REM Frontend Setup
echo Setting up React Native Frontend...
cd ..\frontend

REM Install Node dependencies
where npm >nul 2>nul
if %errorlevel% equ 0 (
    npm install
    echo Installed Node dependencies
) else (
    echo npm not found. Please install Node.js first.
    exit /b 1
)

echo Frontend setup complete!

echo.
echo Setup complete! To run the application:
echo.
echo Backend:
echo   cd backend ^&^& php artisan serve
echo.
echo Frontend:
echo   cd frontend ^&^& npm start
echo   Then run: npm run ios (for iOS) or npm run android (for Android)
echo.
echo Make sure to update the API_BASE_URL in frontend/src/services/api.js
echo if your backend is running on a different port or IP address.
pause
