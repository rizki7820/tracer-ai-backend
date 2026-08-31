<?php

namespace App\Services;

use App\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Resources\UserResource;
use App\Enums\RoleEnum;

class AuthService
{
    public function __construct(
        protected UserRepositoryInterface $userRepository
    ) {}

    public function register(array $data)
    {
        $data['password'] = Hash::make($data['password']);

        $role = RoleEnum::from($data['role']);


        unset($data['role']);

        $user = $this->userRepository->create($data);

        $user->assignRole($role->value);

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => new UserResource($user),
            'token' => $token
        ];
    }

    public function login(array $data)
    {
        $user = $this->userRepository->findByEmail(trim($data['email']));

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => new UserResource($user),
            'token' => $token
        ];
    }
}
