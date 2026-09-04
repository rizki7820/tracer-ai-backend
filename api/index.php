<?php

require __DIR__ . '/../vendor/autoload.php';

echo "AUTOLOAD OK";
exit;

$app = require_once __DIR__ . '/../bootstrap/app.php';

$app->handleRequest(
    Illuminate\Http\Request::capture()
);
