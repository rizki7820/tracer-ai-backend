<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class JuriSeeder extends Seeder
{
    /**
     * Akun demo untuk juri lomba.
     * Kredensial harus sama persis dengan yang ada di aksesjuri.txt.
     */
    public function run(): void
    {
        $accounts = [
            [
                'name' => 'Juri Admin',
                'email' => 'juri.admin@tracer-demo.test',
                'password' => 'XMF8z7auHRv2',
                'role' => 'admin',
            ],
            [
                'name' => 'Juri Perusahaan',
                'email' => 'juri.perusahaan@tracer-demo.test',
                'password' => 'zs3yPNttOf7l',
                'role' => 'company',
            ],
            [
                'name' => 'Juri Alumni',
                'email' => 'juri.alumni@tracer-demo.test',
                'password' => '25Gqt2Qivmw6',
                'role' => 'alumni',
            ],
        ];

        foreach ($accounts as $account) {
            $user = User::updateOrCreate(
                ['email' => $account['email']],
                [
                    'name' => $account['name'],
                    'password' => Hash::make($account['password']),
                    'role' => $account['role'],
                ]
            );

            // Sinkronkan role Spatie permission juga, biar middleware
            // berbasis permission (kalau ada) tetap jalan.
            $user->syncRoles([$account['role']]);
        }
    }
}
