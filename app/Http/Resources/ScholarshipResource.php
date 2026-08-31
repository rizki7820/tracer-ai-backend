<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScholarshipResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'provider' => $this->provider,
            'logo' => $this->logo,
            'level' => $this->level,
            'field' => $this->field,
            'location' => $this->location,
            'funding_type' => $this->funding_type,
            'description' => $this->description,
            'requirements' => $this->requirements,
            'benefits' => $this->benefits,
            'registration_url' => $this->registration_url,
            'deadline' => $this->deadline,
            'status' => $this->status,
            'source' => $this->source,
            'published_at' => $this->published_at,
            'created_at' => $this->created_at,
        ];
    }
}
