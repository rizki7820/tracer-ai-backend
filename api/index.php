<?php

require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';

/*
|--------------------------------------------------------------------------
| Vercel Writable Directories
|--------------------------------------------------------------------------
*/

$storagePath = '/tmp/storage';
$bootstrapPath = '/tmp/bootstrap';

$directories = [
    $storagePath,
    $storagePath . '/app',
    $storagePath . '/framework',
    $storagePath . '/framework/cache',
    $storagePath . '/framework/sessions',
    $storagePath . '/framework/views',
    $storagePath . '/logs',

    $bootstrapPath,
    $bootstrapPath . '/cache',
];

foreach ($directories as $directory) {
    if (!is_dir($directory)) {
        mkdir($directory, 0755, true);
    }
}

/*
|--------------------------------------------------------------------------
| Redirect Laravel writable paths
|--------------------------------------------------------------------------
*/

$app->useStoragePath($storagePath);
$app->useBootstrapPath($bootstrapPath);

/*
|--------------------------------------------------------------------------
| Handle Request
|--------------------------------------------------------------------------
*/

$request = Illuminate\Http\Request::capture();

$app->handleRequest($request);
