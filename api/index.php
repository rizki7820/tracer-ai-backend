<?php

require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';

echo "BOOTSTRAP OK";
exit;

$app->handleRequest(
    Illuminate\Http\Request::capture()
);
