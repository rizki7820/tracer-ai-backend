<?php

namespace App\Services;

use App\Interfaces\AlumniProfileRepositoryInterface;
use App\Models\AlumniProfile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AlumniProfileService
{
    public function __construct(
        protected AlumniProfileRepositoryInterface $repository
    ) {}

    public function create(array $data): AlumniProfile
    {
        return DB::transaction(function () use ($data) {

            $exists = $this->repository
                ->findByUserId(Auth::id());

            if ($exists) {

                abort(409, 'Alumni profile already exists.');

            }

            $data['user_id'] = Auth::id();

            return $this->repository->create($data);

        });
    }

    public function update(array $data): AlumniProfile
    {
        return DB::transaction(function () use ($data) {

            $profile = $this->repository
                ->findByUserId(Auth::id());

            abort_if(!$profile, 404, 'Profile not found.');

            return $this->repository->update($profile, $data);

        });
    }

    public function profile(): ?AlumniProfile
    {
        return $this->repository
            ->findByUserId(Auth::id());
    }

    public function delete(): bool
    {
        return DB::transaction(function () {

            $profile = $this->repository
                ->findByUserId(Auth::id());

            abort_if(!$profile, 404);

            return $this->repository->delete($profile);

        });
    }
}
