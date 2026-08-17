<?php

use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return view('welcome');
});


/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

Route::get('/dashboard-page', function () {
    return view('dashboard');
});


/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

Route::prefix('admin-page')->group(function () {

    // Dashboard
    Route::get('/', function () {
        return view('admin.dashboard');
    });


    // Profile
    Route::get('/profile', function () {
        return view('admin.profile');
    });


    // Settings
    Route::get('/settings', function () {
        return view('admin.settings');
    });


    // Placeholder halaman berikutnya
    Route::get('/alumni', function () {
        return view('admin.dashboard');
    });


    Route::get('/tracer-study', function () {
        return view('admin.dashboard');
    });


    Route::get('/perusahaan', function () {
        return view('admin.dashboard');
    });

    Route::get('/kampus', function () {
        return view('admin.dashboard');
    });


    Route::get('/laporan', function () {
        return view('admin.dashboard');
    });


    Route::get('/notifications', function () {
        return view('admin.dashboard');
    });
});


/*
|--------------------------------------------------------------------------
| User Alumni
|--------------------------------------------------------------------------
*/

Route::prefix('alumni')->group(function () {
    // Dashboard Alumni
    Route::get('/', function () {
        return view('alumni.dashboard');
    });

    // Profile Alumni
    Route::get('/profile', function () {
        return view('alumni.alumniprofile');
    });

    // Tracer Study Alumni
    Route::get('/tracer-study', function () {
        return view('alumni.usertracer-study');
    });

    // Settings Alumni
    Route::get('/settings', function () {
        return view('alumni.alumnisettings');
    });

    Route::get('/notifications', function () {
        return view('alumni.dashboard');
    });

    Route::get('/kampus', function () {
        return view('alumni.dashboard');
    });

    Route::get('/beasiswa', function () {
        return view('alumni.dashboard');
    });

    Route::get('/lowongan', function () {
        return view('alumni.dashboard');
    });
});
