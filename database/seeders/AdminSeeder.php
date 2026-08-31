<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@tracer.test'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password123'),
                'role' => 'admin',
            ]
        );

        $admin->assignRole('admin');
    }
}
