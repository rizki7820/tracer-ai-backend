<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class AuthLoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_and_login_with_same_credentials(): void
    {
        Role::create(['name' => 'alumni']);

        $registerResponse = $this->postJson('/api/v1/auth/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'alumni',
        ]);

        $registerResponse->assertCreated();

        $loginResponse = $this->postJson('/api/v1/auth/login', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        $loginResponse->assertOk();
        $loginResponse->assertJsonPath('data.user.email', 'test@example.com');
        $loginResponse->assertJsonPath('data.token', fn($token) => !empty($token));
    }
}
