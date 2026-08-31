<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\JobVacancy;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class JobVacancySeeder extends Seeder
{
    public function run(): void
    {
        $companies = [
            ['name' => 'PT Telkom Indonesia', 'city' => 'Bandung', 'industry' => 'Telekomunikasi', 'website' => 'https://www.telkom.co.id/'],
            ['name' => 'PT Astra Digital', 'city' => 'Jakarta', 'industry' => 'Teknologi', 'website' => 'https://www.astra.co.id/'],
            ['name' => 'PT Kreatif Digital Nusantara', 'city' => 'Yogyakarta', 'industry' => 'Kreatif', 'website' => '#'],
            ['name' => 'PT Nusantara Teknologi', 'city' => 'Surabaya', 'industry' => 'Teknologi', 'website' => '#'],
            ['name' => 'PT Telkom Akses', 'city' => 'Banjarmasin', 'industry' => 'Telekomunikasi', 'website' => 'https://www.telkomakses.co.id/'],
            ['name' => 'PT Digital Solusi Indonesia', 'city' => 'Jakarta', 'industry' => 'Teknologi', 'website' => '#'],
        ];

        $companyModels = collect($companies)->map(fn ($c) => Company::firstOrCreate(
            ['name' => $c['name']],
            [
                 'slug' => Str::slug($c['name']) . '-' . Str::random(5),
                'city' => $c['city'],
                'industry' => $c['industry'],
                'website' => $c['website'],
                'source' => 'manual',
            ]
        ));

        $jobs = [
            [
                'slug' => Str::slug('Frontend Developer') . '-' . Str::random(5),
                'position' => 'Frontend Developer',
                'company' => 'PT Telkom Indonesia',
                'location' => 'Bandung',
                'type' => 'Full Time',
                'major' => 'RPL',
                'salary_min' => 'Rp5.000.000',
                'salary_max' => 'Rp8.000.000',
                'description' => 'Mengembangkan dan memelihara antarmuka aplikasi web menggunakan teknologi frontend modern.',
                'requirements' => [
                    'Lulusan SMK/D3/S1 bidang teknologi informasi atau relevan',
                    'Memahami HTML, CSS, dan JavaScript',
                    'Memahami React menjadi nilai tambah',
                    'Mampu bekerja secara individu maupun dalam tim',
                ],
                'skills' => ['HTML', 'CSS', 'JavaScript', 'React'],
                'deadline' => now()->addDays(30),
            ],
            [
                'position' => 'Junior Web Developer',
                'company' => 'PT Astra Digital',
                'location' => 'Jakarta',
                'type' => 'Full Time',
                'major' => 'RPL',
                'salary_min' => 'Rp4.500.000',
                'salary_max' => 'Rp7.000.000',
                'description' => 'Membantu tim developer dalam membangun, mengembangkan, dan melakukan maintenance aplikasi berbasis web.',
                'requirements' => [
                    'Memahami dasar pemrograman web',
                    'Menguasai HTML, CSS, dan JavaScript',
                    'Memahami database menjadi nilai tambah',
                    'Memiliki kemampuan problem solving yang baik',
                ],
                'skills' => ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
                'deadline' => now()->addDays(35),
            ],
            [
                'position' => 'UI/UX Designer',
                'company' => 'PT Kreatif Digital Nusantara',
                'location' => 'Yogyakarta',
                'type' => 'Full Time',
                'major' => 'Multimedia',
                'salary_min' => 'Rp4.000.000',
                'salary_max' => 'Rp6.500.000',
                'description' => 'Merancang pengalaman pengguna dan antarmuka digital untuk berbagai produk aplikasi dan website.',
                'requirements' => [
                    'Memahami prinsip UI/UX',
                    'Menguasai Figma',
                    'Memiliki portfolio desain',
                    'Memahami design thinking',
                ],
                'skills' => ['Figma', 'UI Design', 'UX Design', 'Prototype'],
                'deadline' => now()->addDays(40),
            ],
            [
                'position' => 'Network Technician',
                'company' => 'PT Nusantara Teknologi',
                'location' => 'Surabaya',
                'type' => 'Full Time',
                'major' => 'TKJ',
                'salary_min' => 'Rp4.000.000',
                'salary_max' => 'Rp6.000.000',
                'description' => 'Melakukan instalasi, konfigurasi, monitoring, dan troubleshooting jaringan perusahaan.',
                'requirements' => [
                    'Lulusan SMK jurusan TKJ atau relevan',
                    'Memahami dasar jaringan (routing, switching)',
                    'Memiliki sertifikasi CCNA menjadi nilai tambah',
                    'Bersedia melakukan tugas lapangan',
                ],
                'skills' => ['Networking', 'Mikrotik', 'Cisco', 'Troubleshooting'],
                'deadline' => now()->addDays(25),
            ],
            [
                'position' => 'IT Support',
                'company' => 'PT Telkom Akses',
                'location' => 'Banjarmasin',
                'type' => 'Full Time',
                'major' => 'TKJ',
                'salary_min' => 'Rp3.800.000',
                'salary_max' => 'Rp5.500.000',
                'description' => 'Menangani permintaan dukungan teknis, instalasi perangkat, dan pemeliharaan infrastruktur IT kantor.',
                'requirements' => [
                    'Lulusan SMK TKJ/RPL',
                    'Memahami troubleshooting hardware & software',
                    'Komunikatif dan senang membantu pengguna',
                ],
                'skills' => ['Troubleshooting', 'Hardware', 'Networking'],
                'deadline' => now()->addDays(20),
            ],
            [
                'position' => 'Backend Developer',
                'company' => 'PT Digital Solusi Indonesia',
                'location' => 'Jakarta',
                'type' => 'Remote',
                'major' => 'RPL',
                'salary_min' => 'Rp5.500.000',
                'salary_max' => 'Rp9.000.000',
                'description' => 'Membangun dan memelihara REST API serta logika bisnis aplikasi menggunakan Laravel.',
                'requirements' => [
                    'Menguasai PHP dan Laravel',
                    'Memahami database relasional (MySQL/PostgreSQL)',
                    'Memahami konsep REST API',
                ],
                'skills' => ['PHP', 'Laravel', 'MySQL', 'REST API'],
                'deadline' => now()->addDays(45),
            ],
        ];

        foreach ($jobs as $job) {
            $company = $companyModels->firstWhere('name', $job['company']);

            JobVacancy::firstOrCreate(
                ['position' => $job['position'], 'company_id' => $company->id],
                [
                     'slug' => $job['slug'] ?? Str::slug($job['position']) . '-' . Str::random(5),
                    'location' => $job['location'],
                    'type' => $job['type'],
                    'major' => $job['major'],
                    'salary_min' => $job['salary_min'],
                    'salary_max' => $job['salary_max'],
                    'description' => $job['description'],
                    'requirements' => $job['requirements'],
                    'skills' => $job['skills'],
                    'deadline' => $job['deadline'],
                    'status' => 'published',
                    'source' => 'manual',
                    'published_at' => now(),
                ]
            );
        }
    }
}
