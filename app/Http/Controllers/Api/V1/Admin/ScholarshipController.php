<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ScholarshipResource;
use App\Models\Scholarship;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ScholarshipController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $scholarships = Scholarship::query()->latest()->paginate($request->integer('per_page', 15));

        return $this->success([
            'data' => ScholarshipResource::collection($scholarships->items()),
            'meta' => [
                'current_page' => $scholarships->currentPage(),
                'last_page' => $scholarships->lastPage(),
                'total' => $scholarships->total(),
            ],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'provider' => ['required', 'string', 'max:255'],
            'logo' => ['nullable', 'string', 'max:500'],
            'level' => ['nullable', 'string', 'max:100'],
            'field' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'funding_type' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'requirements' => ['nullable', 'array'],
            'benefits' => ['nullable', 'array'],
            'registration_url' => ['nullable', 'string', 'max:500'],
            'deadline' => ['nullable', 'date'],
            'status' => ['nullable', 'in:draft,published,closed'],
        ]);

        $scholarship = Scholarship::create([
            ...$data,
            'status' => $data['status'] ?? 'published',
            'source' => 'manual',
            'published_at' => now(),
        ]);

        return $this->success(new ScholarshipResource($scholarship), 'Beasiswa berhasil dibuat.', 201);
    }

    public function show(Scholarship $scholarship): JsonResponse
    {
        return $this->success(new ScholarshipResource($scholarship));
    }

    public function update(Request $request, Scholarship $scholarship): JsonResponse
    {
        $data = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'provider' => ['sometimes', 'string', 'max:255'],
            'logo' => ['nullable', 'string', 'max:500'],
            'level' => ['nullable', 'string', 'max:100'],
            'field' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'funding_type' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'requirements' => ['nullable', 'array'],
            'benefits' => ['nullable', 'array'],
            'registration_url' => ['nullable', 'string', 'max:500'],
            'deadline' => ['nullable', 'date'],
            'status' => ['nullable', 'in:draft,published,closed'],
        ]);

        $scholarship->update($data);

        return $this->success(new ScholarshipResource($scholarship), 'Beasiswa berhasil diperbarui.');
    }

    public function destroy(Scholarship $scholarship): JsonResponse
    {
        $scholarship->delete();

        return $this->success(null, 'Beasiswa berhasil dihapus.');
    }
}
