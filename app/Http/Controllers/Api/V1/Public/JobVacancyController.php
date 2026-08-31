<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobVacancyResource;
use App\Models\JobVacancy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobVacancyController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = JobVacancy::query()->with('company')->published();

        if ($request->filled('search')) {
            $keyword = $request->string('search');
            $query->where(function ($q) use ($keyword) {
                $q->where('position', 'like', "%{$keyword}%")
                    ->orWhereHas('company', fn ($c) => $c->where('name', 'like', "%{$keyword}%"));
            });
        }

        if ($request->filled('major') && $request->input('major') !== 'Semua Jurusan') {
            $query->where('major', $request->input('major'));
        }

        if ($request->filled('type') && $request->input('type') !== 'Semua Jenis') {
            $query->where('type', $request->input('type'));
        }

        if ($request->filled('location') && $request->input('location') !== 'Semua Lokasi') {
            $query->where('location', $request->input('location'));
        }

        $jobs = $query->latest('published_at')->paginate($request->integer('per_page', 12));

        return $this->success([
            'data' => JobVacancyResource::collection($jobs->items()),
            'meta' => [
                'current_page' => $jobs->currentPage(),
                'last_page' => $jobs->lastPage(),
                'total' => $jobs->total(),
            ],
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $job = JobVacancy::query()->with('company')->where('slug', $slug)->firstOrFail();

        return $this->success(new JobVacancyResource($job));
    }
}
