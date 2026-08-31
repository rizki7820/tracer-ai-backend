<?php

namespace Database\Seeders;

use App\Models\Scholarship;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ScholarshipSeeder extends Seeder
{
    public function run(): void
    {
        $scholarships = [
            [
                'title' => 'Beasiswa LPDP Reguler',
                'provider' => 'Lembaga Pengelola Dana Pendidikan (LPDP)',
                'level' => 'S2',
                'field' => 'Semua Bidang',
                'location' => 'Dalam & Luar Negeri',
                'funding_type' => 'Penuh',
                'description' => 'Beasiswa penuh dari pemerintah untuk jenjang magister di dalam maupun luar negeri, mencakup biaya kuliah, hidup, dan tunjangan buku.',
                'requirements' => [
                    'WNI dengan IPK minimal 3.00',
                    'Memiliki Letter of Acceptance (LoA) atau sedang proses seleksi kampus tujuan',
                    'Sertifikat bahasa asing sesuai ketentuan',
                ],
                'benefits' => ['Biaya kuliah penuh', 'Biaya hidup bulanan', 'Tiket keberangkatan', 'Dana penelitian'],
                'registration_url' => 'https://lpdp.kemenkeu.go.id/',
                'deadline' => now()->addMonths(2),
            ],
            [
                'title' => 'Beasiswa Djarum Plus',
                'provider' => 'Djarum Foundation',
                'level' => 'S1',
                'field' => 'Semua Bidang',
                'location' => 'Dalam Negeri',
                'funding_type' => 'Parsial',
                'description' => 'Beasiswa untuk mahasiswa S1 aktif semester 4 dengan pembinaan soft skill dan jaringan alumni luas.',
                'requirements' => [
                    'Mahasiswa aktif semester 4',
                    'IPK minimal 3.00',
                    'Aktif berorganisasi',
                ],
                'benefits' => ['Uang saku bulanan', 'Pelatihan soft skill', 'Jaringan Beswan Djarum'],
                'registration_url' => 'https://djarumbeasiswaplus.org/',
                'deadline' => now()->addMonths(3),
            ],
            [
                'title' => 'Beasiswa KIP Kuliah',
                'provider' => 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
                'level' => 'S1',
                'field' => 'Semua Bidang',
                'location' => 'Dalam Negeri',
                'funding_type' => 'Penuh',
                'description' => 'Bantuan biaya pendidikan bagi lulusan SMA/SMK sederajat dari keluarga kurang mampu secara ekonomi namun berprestasi.',
                'requirements' => [
                    'Lulusan SMA/SMK/sederajat tahun berjalan atau 2 tahun sebelumnya',
                    'Berasal dari keluarga kurang mampu (terdaftar DTKS atau setara)',
                    'Diterima di perguruan tinggi negeri/swasta terakreditasi',
                ],
                'benefits' => ['Biaya kuliah penuh hingga lulus', 'Uang saku bulanan'],
                'registration_url' => 'https://kip-kuliah.kemdikbud.go.id/',
                'deadline' => now()->addMonths(4),
            ],
            [
                'title' => 'Beasiswa Unggulan Kemdikbud',
                'provider' => 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
                'level' => 'S1',
                'field' => 'Semua Bidang',
                'location' => 'Dalam Negeri',
                'funding_type' => 'Penuh',
                'description' => 'Beasiswa bagi lulusan terbaik untuk melanjutkan pendidikan di perguruan tinggi dalam negeri.',
                'requirements' => [
                    'Lulusan terbaik satuan pendidikan',
                    'Diterima di perguruan tinggi tujuan',
                    'Memiliki prestasi akademik/non-akademik',
                ],
                'benefits' => ['Biaya kuliah', 'Biaya hidup bulanan', 'Biaya buku'],
                'registration_url' => 'https://beasiswaunggulan.kemdikbud.go.id/',
                'deadline' => now()->addMonths(2)->addDays(15),
            ],
        ];

        foreach ($scholarships as $s) {
            Scholarship::firstOrCreate(
                ['title' => $s['title']],
                [...$s,'slug' => Str::slug($s['title']), 'status' => 'published', 'source' => 'manual', 'published_at' => now()]
            );
        }
    }
}
