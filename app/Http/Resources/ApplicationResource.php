<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'cover_letter' => $this->cover_letter,
            'job_vacancy' => new JobVacancyResource($this->whenLoaded('jobVacancy')),
            'created_at' => $this->created_at,
        ];
    }
}
