<?php

// Menghubungkan ke autoloader bawaan Composer
require __DIR__ . '/../vendor/autoload.php';

// Menjalankan aplikasi Laravel
$app = require_once __DIR__ . '/../bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
