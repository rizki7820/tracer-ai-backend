<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobVacancyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'position' => $this->position,
            'slug' => $this->slug,
            'company' => $this->company?->name,
            'company_logo' => $this->company?->logo,
            'location' => $this->location,
            'type' => $this->type,
            'major' => $this->major,
            'salary_min' => $this->salary_min,
            'salary_max' => $this->salary_max,
            'description' => $this->description,
            'requirements' => $this->requirements,
            'skills' => $this->skills,
            'apply_url' => $this->apply_url,
            'deadline' => $this->deadline,
            'status' => $this->status,
            'source' => $this->source,
            'published_at' => $this->published_at,
            'created_at' => $this->created_at,
        ];
    }
}
