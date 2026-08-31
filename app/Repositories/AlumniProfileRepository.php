<?php

namespace App\Repositories;

use App\Interfaces\AlumniProfileRepositoryInterface;
use App\Models\AlumniProfile;
use Illuminate\Database\Eloquent\Collection;

class AlumniProfileRepository implements AlumniProfileRepositoryInterface
{
    /**
     * Get all alumni profiles.
     */
    public function getAll(): Collection
    {
        return AlumniProfile::with('user')->get();
    }

    /**
     * Create alumni profile.
     */
    public function create(array $data): AlumniProfile
    {
        return AlumniProfile::create($data);
    }

    /**
     * Update alumni profile.
     */
    public function update(AlumniProfile $profile, array $data): AlumniProfile
    {
        $profile->update($data);

        return $profile->fresh();
    }

    /**
     * Delete alumni profile.
     */
    public function delete(AlumniProfile $profile): bool
    {
        return $profile->delete();
    }

    /**
     * Find profile by ID.
     */
    public function findById(int $id): ?AlumniProfile
    {
        return AlumniProfile::with('user')->find($id);
    }

    /**
     * Find profile by User ID.
     */
    public function findByUserId(int $userId): ?AlumniProfile
    {
        return AlumniProfile::with('user')
            ->where('user_id', $userId)
            ->first();
    }
}
