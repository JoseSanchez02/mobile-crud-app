# Mobile CRUD Application - Setup Instructions

## Overview

This is a complete mobile CRUD application built with React Native frontend and Laravel backend, featuring image support and a modern financial app-inspired design.

## Prerequisites

### For Backend (Laravel)
- PHP 8.1 or higher
- Composer
- SQLite (included with PHP)

### For Frontend (React Native)
- Node.js LTS
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Quick Setup

### Option 1: Automated Setup (Recommended)

**For Windows:**
```bash
setup.bat
```

**For macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

## Backend Setup (Laravel)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Copy environment file:
   ```bash
   cp env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Create storage link for file uploads:
   ```bash
   php artisan storage:link
   ```

6. Run database migrations:
   ```bash
   php artisan migrate
   ```

7. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

The backend API will be available at `http://localhost:8000`

## Frontend Setup (React Native)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. For iOS development (macOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

4. Start the Metro bundler:
   ```bash
   npm start
   ```

5. Run the app:
   - For iOS: `npm run ios`
   - For Android: `npm run android`

## Configuration

### Backend Configuration

The backend uses SQLite database by default. The configuration is in `backend/.env`:

```env
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

### Frontend Configuration

Update the API base URL in `frontend/src/services/api.js` if your backend is running on a different address:

```javascript
const API_BASE_URL = 'http://YOUR_IP_ADDRESS:8000/api';
```

For Android emulator, use `http://10.0.2.2:8000/api`
For iOS simulator, use `http://localhost:8000/api`

## Features

### ✅ Implemented Features

1. **CRUD Operations**
   - Create new records with title, description, and image
   - Read/View all records in a list
   - Update existing records
   - Delete records with confirmation

2. **Image Support**
   - Take photos with camera
   - Select images from gallery
   - Image preview in record list and forms
   - Image upload to backend storage

3. **Modern UI/UX**
   - Financial app-inspired design
   - Dark blue (#002539) and light gray (#f3f5f5) color scheme
   - Clean, modern interface
   - Responsive design
   - Loading states and error handling

4. **Security Features**
   - Input validation and sanitization
   - File upload restrictions (image types only, size limits)
   - CORS configuration
   - SQL injection protection (Eloquent ORM)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/records` | Get all records |
| POST | `/api/records` | Create new record |
| GET | `/api/records/{id}` | Get specific record |
| PUT | `/api/records/{id}` | Update record |
| DELETE | `/api/records/{id}` | Delete record |

## Project Structure

```
mobile-crud-app/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   └── Models/
│   ├── config/
│   ├── database/
│   ├── routes/
│   └── storage/
├── frontend/               # React Native App
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── services/
│   │   └── utils/
│   ├── android/
│   └── ios/
├── README.md
├── SETUP_INSTRUCTIONS.md
├── setup.sh
└── setup.bat
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`

2. **iOS build issues**: Clean build folder in Xcode (Product → Clean Build Folder)

3. **Android build issues**: Clean project with `cd android && ./gradlew clean`

4. **API connection issues**: Check if backend is running and verify the API URL

5. **Image picker issues**: Ensure camera and storage permissions are granted

### Permissions

The app requires the following permissions:

**Android:**
- Camera
- Read/Write External Storage

**iOS:**
- Camera Usage
- Photo Library Usage

## Development Notes

- The app uses React Native Paper for UI components
- Image handling is done with react-native-image-picker
- Navigation is implemented with React Navigation
- State management is handled with React hooks
- API communication uses Axios
- File uploads use FormData for multipart requests

## Testing

To test the application:

1. Start the backend server
2. Run the React Native app
3. Test all CRUD operations
4. Test image selection from camera and gallery
5. Verify data persistence across app restarts

## Production Considerations

For production deployment:

1. Update API URLs to production endpoints
2. Implement proper authentication
3. Add input validation on both frontend and backend
4. Set up proper error logging
5. Configure HTTPS for secure communication
6. Implement proper image optimization and CDN
7. Add unit and integration tests
