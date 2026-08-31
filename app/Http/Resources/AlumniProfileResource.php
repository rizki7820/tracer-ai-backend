<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AlumniProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'user_id' => $this->user_id,

            'full_name' => $this->full_name,

            'nis' => $this->nis,

            'phone' => $this->phone,

            'graduation_year' => $this->graduation_year,

            'major' => $this->major,

            'city' => $this->city,

            'province' => $this->province,

            'bio' => $this->bio,

            'linkedin_url' => $this->linkedin_url,

            'github_url' => $this->github_url,

            'portfolio_url' => $this->portfolio_url,

            'avatar' => $this->avatar,

            'is_public' => $this->is_public,

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,

            'user' => [

                'id' => $this->user?->id,

                'name' => $this->user?->name,

                'email' => $this->user?->email,

            ],

        ];
    }
}
