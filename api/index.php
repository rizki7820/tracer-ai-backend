<?php

// 1. Alihkan folder storage bawaan Laravel ke folder /tmp Vercel yang writable
$storagePath = '/tmp/storage/framework';
if (!is_dir($storagePath . '/views')) {
    mkdir($storagePath . '/views', 0755, true);
}
if (!is_dir($storagePath . '/cache')) {
    mkdir($storagePath . '/cache', 0755, true);
}
if (!is_dir($storagePath . '/sessions')) {
    mkdir($storagePath . '/sessions', 0755, true);
}

// 2. Set environment variabel agar Laravel tahu foldernya dipindah
$_ENV['APP_STORAGE'] = '/tmp/storage';
$_ENV['VIEW_COMPILED_PATH'] = '/tmp/storage/framework/views';

// 3. Panggil core aplikasi Laravel
require __DIR__ . '/../public/index.php';
