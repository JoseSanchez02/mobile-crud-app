<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class RecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $records = Record::orderBy('created_at', 'desc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $records
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        }

        $record = Record::create([
            'title' => $request->title,
            'description' => $request->description,
            'image_path' => $imagePath,
        ]);

        return response()->json([
            'success' => true,
            'data' => $record,
            'message' => 'Record created successfully'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Record $record): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $record
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Record $record): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = [
            'title' => $request->title,
            'description' => $request->description,
        ];

        // Handle image update
        if ($request->hasFile('image')) {
            // Delete old image
            if ($record->image_path) {
                Storage::disk('public')->delete($record->image_path);
            }
            $data['image_path'] = $request->file('image')->store('images', 'public');
        }

        $record->update($data);

        return response()->json([
            'success' => true,
            'data' => $record,
            'message' => 'Record updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Record $record): JsonResponse
    {
        // Delete image file
        if ($record->image_path) {
            Storage::disk('public')->delete($record->image_path);
        }

        $record->delete();

        return response()->json([
            'success' => true,
            'message' => 'Record deleted successfully'
        ]);
    }
}
