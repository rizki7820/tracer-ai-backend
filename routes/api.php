<?php

use App\Http\Controllers\Api\V1\Auth\AuthController;
use App\Http\Controllers\Api\V1\Alumni\AlumniProfileController;
use Illuminate\Support\Facades\Route;
use App\Enums\RoleEnum;

Route::prefix('v1')->group(function () {
Route::prefix('auth')->group(function () {

    Route::post('/register', [AuthController::class, 'register']);

    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {

        Route::post('/logout', [AuthController::class, 'logout']);

        Route::get('/profile', [AuthController::class, 'profile']);

    });

    Route::middleware(['auth:sanctum','role:' . RoleEnum::Admin->value,])->group(function () {

        Route::get('/dashboard', function () {

            return response()->json([
                'message' => 'Welcome Admin'
            ]);

        });

    });


});

    Route::middleware(['auth:sanctum','role:' . \App\Enums\RoleEnum::Alumni->value,])->prefix('alumni')->group(function () {

        Route::post('/profile', [AlumniProfileController::class, 'store']);

        Route::get('/profile', [AlumniProfileController::class, 'show']);

        Route::put('/profile', [AlumniProfileController::class, 'update']);

        Route::delete('/profile', [AlumniProfileController::class, 'destroy']);

    });
});
