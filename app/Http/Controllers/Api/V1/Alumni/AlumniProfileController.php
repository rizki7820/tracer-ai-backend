<?php

namespace App\Http\Controllers\Api\V1\Alumni;

use App\Http\Controllers\Controller;
use App\Http\Requests\Alumni\StoreAlumniProfileRequest;
use App\Http\Requests\Alumni\UpdateAlumniProfileRequest;
use App\Http\Resources\AlumniProfileResource;
use App\Services\AlumniProfileService;
use Illuminate\Http\JsonResponse;

class AlumniProfileController extends Controller
{
    public function __construct(
        protected AlumniProfileService $service
    ) {}

    public function store(StoreAlumniProfileRequest $request): JsonResponse
    {
        $profile = $this->service->create(
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Profile created successfully.',
            'data' => new AlumniProfileResource($profile)
        ], 201);
    }

    public function show(): JsonResponse
    {
        $profile = $this->service->profile();

        return response()->json([
            'success' => true,
            'message' => 'Profile retrieved successfully.',
            'data' => $profile
                ? new AlumniProfileResource($profile)
                : null
        ]);
    }

    public function update(UpdateAlumniProfileRequest $request): JsonResponse
    {
        $profile = $this->service->update(
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully.',
            'data' => new AlumniProfileResource($profile)
        ]);
    }

    public function destroy(): JsonResponse
    {
        $this->service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Profile deleted successfully.'
        ]);
    }
}
