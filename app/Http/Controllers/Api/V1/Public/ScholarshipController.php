<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\ScholarshipResource;
use App\Models\Scholarship;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ScholarshipController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Scholarship::query()->published();

        if ($request->filled('search')) {
            $keyword = $request->string('search');
            $query->where(function ($q) use ($keyword) {
                $q->where('title', 'like', "%{$keyword}%")
                    ->orWhere('provider', 'like', "%{$keyword}%");
            });
        }

        if ($request->filled('level') && $request->input('level') !== 'Semua Jenjang') {
            $query->where('level', $request->input('level'));
        }

        if ($request->filled('funding_type') && $request->input('funding_type') !== 'Semua Jenis') {
            $query->where('funding_type', $request->input('funding_type'));
        }

        $scholarships = $query->latest('published_at')->paginate($request->integer('per_page', 12));

        return $this->success([
            'data' => ScholarshipResource::collection($scholarships->items()),
            'meta' => [
                'current_page' => $scholarships->currentPage(),
                'last_page' => $scholarships->lastPage(),
                'total' => $scholarships->total(),
            ],
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $scholarship = Scholarship::query()->where('slug', $slug)->firstOrFail();

        return $this->success(new ScholarshipResource($scholarship));
    }
}
