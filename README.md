# Mobile CRUD Application

A mobile application that performs CRUD operations (create, read, update, delete records) with image support.

## Architecture

- **Frontend**: React Native
- **Backend**: Laravel
- **Database**: SQLite

## Features

- Create, read, update, and delete records
- Each record includes title, description, and image
- Camera and gallery image selection
- Clean, modern UI inspired by financial apps
- Color scheme: Dark Blue (#002539) and Light Gray (#f3f5f5)

## Project Structure

```
mobile-crud-app/
├── backend/          # Laravel API
├── frontend/         # React Native App
└── README.md
```

## Setup Instructions

### Backend (Laravel)

1. Navigate to backend directory
2. Install dependencies: `composer install`
3. Copy `.env.example` to `.env` and configure
4. Generate app key: `php artisan key:generate`
5. Run migrations: `php artisan migrate`
6. Start server: `php artisan serve`

### Frontend (React Native)

1. Navigate to frontend directory
2. Install dependencies: `npm install`
3. For iOS: `cd ios && pod install && cd ..`
4. Run on iOS: `npx react-native run-ios`
5. Run on Android: `npx react-native run-android`

## API Endpoints

- `GET /api/records` - Get all records
- `POST /api/records` - Create new record
- `GET /api/records/{id}` - Get specific record
- `PUT /api/records/{id}` - Update record
- `DELETE /api/records/{id}` - Delete record

## Security Features

- Input validation and sanitization
- File upload restrictions
- CORS configuration
- Basic authentication ready for extension
