<?php

namespace App\Http\Controllers\Api\V1\Alumni;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApplicationResource;
use App\Models\Application;
use App\Models\JobVacancy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ApplicationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $applications = Application::query()
            ->with('jobVacancy.company')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return $this->success(ApplicationResource::collection($applications));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'job_vacancy_id' => ['required', Rule::exists('job_vacancies', 'id')],
            'cover_letter' => ['nullable', 'string'],
            'resume_id' => ['nullable', Rule::exists('resumes', 'id')],
        ]);

        $job = JobVacancy::findOrFail($data['job_vacancy_id']);

        $alreadyApplied = Application::query()
            ->where('user_id', $request->user()->id)
            ->where('job_vacancy_id', $job->id)
            ->exists();

        if ($alreadyApplied) {
            return $this->error('Anda sudah melamar pekerjaan ini.', null, 422);
        }

        $application = Application::create([
            'user_id' => $request->user()->id,
            'job_vacancy_id' => $job->id,
            'resume_id' => $data['resume_id'] ?? null,
            'cover_letter' => $data['cover_letter'] ?? null,
            'status' => 'submitted',
        ]);

        return $this->success(
            new ApplicationResource($application->load('jobVacancy.company')),
            'Lamaran berhasil dikirim.',
            201
        );
    }
}
