<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function __construct(
        protected AuthService $authService
    ) {}

    public function register(Request $request): JsonResponse
    {
        $data = $request->json()->all() ?: $request->all();

        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
            'role' => ['required', new Enum(RoleEnum::class)],
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $result = $this->authService->register($validator->validated());

        return $this->success(
            $result,
            'Register berhasil.',
            201
        );
    }

    public function login(Request $request): JsonResponse
    {
        $data = $request->json()->all() ?: $request->all();

        $validator = Validator::make($data, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $result = $this->authService->login($validator->validated());

        return $this->success(
            $result,
            'Login berhasil.'
        );
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return $this->success(
            null,
            'Logout berhasil.'
        );
    }

    public function profile(Request $request): JsonResponse
    {
        return $this->success(
            $request->user()
        );
    }
}
