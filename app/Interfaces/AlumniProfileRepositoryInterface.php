<?php

namespace App\Interfaces;

use App\Models\AlumniProfile;

interface AlumniProfileRepositoryInterface
{
    public function create(array $data): AlumniProfile;

    public function update(AlumniProfile $profile, array $data): AlumniProfile;

    public function delete(AlumniProfile $profile): bool;

    public function findById(int $id): ?AlumniProfile;

    public function findByUserId(int $userId): ?AlumniProfile;

    public function getAll();
}
