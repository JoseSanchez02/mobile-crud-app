<?php

/**
 * Simple API test script for Laravel backend
 * Run this after setting up the backend to verify everything works
 */

require_once 'vendor/autoload.php';

use Illuminate\Http\Request;
use App\Http\Controllers\RecordController;
use App\Models\Record;

echo "Testing Laravel Backend API...\n\n";

// Test 1: Check if Record model exists
echo "1. Testing Record model...\n";
try {
    $record = new Record();
    echo "   ✓ Record model instantiated successfully\n";
} catch (Exception $e) {
    echo "   ✗ Error: " . $e->getMessage() . "\n";
}

// Test 2: Check database connection
echo "\n2. Testing database connection...\n";
try {
    $records = Record::all();
    echo "   ✓ Database connection successful\n";
    echo "   ✓ Found " . count($records) . " records in database\n";
} catch (Exception $e) {
    echo "   ✗ Database error: " . $e->getMessage() . "\n";
}

// Test 3: Test API endpoints (simulate)
echo "\n3. Testing API endpoints...\n";
try {
    $controller = new RecordController();
    echo "   ✓ RecordController instantiated successfully\n";
    
    // Test index method
    $response = $controller->index();
    $data = json_decode($response->getContent(), true);
    if ($data['success']) {
        echo "   ✓ GET /api/records endpoint working\n";
    } else {
        echo "   ✗ GET /api/records endpoint failed\n";
    }
} catch (Exception $e) {
    echo "   ✗ Controller error: " . $e->getMessage() . "\n";
}

echo "\nBackend API test completed!\n";
echo "If all tests passed, your Laravel backend is ready.\n";
echo "Start the server with: php artisan serve\n";
