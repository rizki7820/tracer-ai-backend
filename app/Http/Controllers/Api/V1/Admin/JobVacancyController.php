<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobVacancyResource;
use App\Models\Company;
use App\Models\JobVacancy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobVacancyController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $jobs = JobVacancy::query()->with('company')->latest()->paginate($request->integer('per_page', 15));

        return $this->success([
            'data' => JobVacancyResource::collection($jobs->items()),
            'meta' => [
                'current_page' => $jobs->currentPage(),
                'last_page' => $jobs->lastPage(),
                'total' => $jobs->total(),
            ],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'company_id' => ['nullable', 'exists:companies,id'],
            'company_name' => ['required_without:company_id', 'string', 'max:255'],
            'position' => ['required', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:100'],
            'major' => ['nullable', 'string', 'max:100'],
            'salary_min' => ['nullable', 'string', 'max:100'],
            'salary_max' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'requirements' => ['nullable', 'array'],
            'skills' => ['nullable', 'array'],
            'apply_url' => ['nullable', 'string', 'max:500'],
            'deadline' => ['nullable', 'date'],
            'status' => ['nullable', 'in:draft,published,closed'],
        ]);

        $companyId = $data['company_id'] ?? Company::create([
            'name' => $data['company_name'],
            'source' => 'manual',
        ])->id;

        $job = JobVacancy::create([
            ...$data,
            'company_id' => $companyId,
            'status' => $data['status'] ?? 'published',
            'source' => 'manual',
            'published_at' => now(),
        ]);

        return $this->success(new JobVacancyResource($job->load('company')), 'Lowongan berhasil dibuat.', 201);
    }

    public function show(JobVacancy $jobVacancy): JsonResponse
    {
        return $this->success(new JobVacancyResource($jobVacancy->load('company')));
    }

    public function update(Request $request, JobVacancy $jobVacancy): JsonResponse
    {
        $data = $request->validate([
            'position' => ['sometimes', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:100'],
            'major' => ['nullable', 'string', 'max:100'],
            'salary_min' => ['nullable', 'string', 'max:100'],
            'salary_max' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'requirements' => ['nullable', 'array'],
            'skills' => ['nullable', 'array'],
            'apply_url' => ['nullable', 'string', 'max:500'],
            'deadline' => ['nullable', 'date'],
            'status' => ['nullable', 'in:draft,published,closed'],
        ]);

        $jobVacancy->update($data);

        return $this->success(new JobVacancyResource($jobVacancy->load('company')), 'Lowongan berhasil diperbarui.');
    }

    public function destroy(JobVacancy $jobVacancy): JsonResponse
    {
        $jobVacancy->delete();

        return $this->success(null, 'Lowongan berhasil dihapus.');
    }
}
