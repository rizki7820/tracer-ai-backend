<?php

use App\Http\Controllers\Api\V1\Auth\AuthController;
use App\Http\Controllers\Api\V1\Alumni\AlumniProfileController;
use App\Http\Controllers\Api\V1\Alumni\ApplicationController;
use App\Http\Controllers\Api\V1\Public\JobVacancyController;
use App\Http\Controllers\Api\V1\Public\ScholarshipController;
use App\Http\Controllers\Api\V1\Admin\JobVacancyController as AdminJobVacancyController;
use App\Http\Controllers\Api\V1\Admin\ScholarshipController as AdminScholarshipController;
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

        Route::middleware(['auth:sanctum', 'role:' . RoleEnum::Admin->value,])->group(function () {

            Route::get('/dashboard', function () {

                return response()->json([
                    'message' => 'Welcome Admin'
                ]);
            });
        });
    });

    // ================================
    // ALUMNI: PROFILE & APPLICATIONS
    // ================================

    Route::middleware(['auth:sanctum', 'role:' . RoleEnum::Alumni->value,])->prefix('alumni')->group(function () {

        Route::post('/profile', [AlumniProfileController::class, 'store']);

        Route::get('/profile', [AlumniProfileController::class, 'show']);

        Route::put('/profile', [AlumniProfileController::class, 'update']);

        Route::delete('/profile', [AlumniProfileController::class, 'destroy']);

        Route::get('/applications', [ApplicationController::class, 'index']);

        Route::post('/applications', [ApplicationController::class, 'store']);

    });

    // ================================
    // PUBLIC: JOB VACANCIES & SCHOLARSHIPS
    // ================================

    Route::prefix('jobs')->group(function () {
        Route::get('/', [JobVacancyController::class, 'index']);
        Route::get('/{slug}', [JobVacancyController::class, 'show']);
    });

    Route::prefix('scholarships')->group(function () {
        Route::get('/', [ScholarshipController::class, 'index']);
        Route::get('/{slug}', [ScholarshipController::class, 'show']);
    });

    // ================================
    // ADMIN: MANAGE JOB VACANCIES & SCHOLARSHIPS
    // ================================

    Route::middleware(['auth:sanctum', 'role:' . RoleEnum::Admin->value])->prefix('admin')->group(function () {

        Route::apiResource('jobs', AdminJobVacancyController::class)->parameters(['jobs' => 'jobVacancy']);

        Route::apiResource('scholarships', AdminScholarshipController::class);

    });

});
