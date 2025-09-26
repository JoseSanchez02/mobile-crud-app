#!/bin/bash

echo "Setting up Mobile CRUD Application..."

# Backend Setup
echo "Setting up Laravel Backend..."
cd backend

# Copy environment file
if [ ! -f .env ]; then
    cp env.example .env
    echo "Created .env file"
fi

# Install PHP dependencies
if command -v composer &> /dev/null; then
    composer install
    echo "Installed PHP dependencies"
else
    echo "Composer not found. Please install Composer first."
    exit 1
fi

# Generate app key
php artisan key:generate

# Create storage link
php artisan storage:link

# Run migrations
php artisan migrate

echo "Backend setup complete!"

# Frontend Setup
echo "Setting up React Native Frontend..."
cd ../frontend

# Install Node dependencies
if command -v npm &> /dev/null; then
    npm install
    echo "Installed Node dependencies"
else
    echo "npm not found. Please install Node.js first."
    exit 1
fi

# iOS setup
if [ -d "ios" ]; then
    cd ios
    if command -v pod &> /dev/null; then
        pod install
        echo "Installed iOS dependencies"
    else
        echo "CocoaPods not found. Please install CocoaPods for iOS development."
    fi
    cd ..
fi

echo "Frontend setup complete!"

echo ""
echo "Setup complete! To run the application:"
echo ""
echo "Backend:"
echo "  cd backend && php artisan serve"
echo ""
echo "Frontend:"
echo "  cd frontend && npm start"
echo "  Then run: npm run ios (for iOS) or npm run android (for Android)"
echo ""
echo "Make sure to update the API_BASE_URL in frontend/src/services/api.js"
echo "if your backend is running on a different port or IP address."
