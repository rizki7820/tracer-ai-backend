<?php

use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/api/v1/jobs', function () {
    return response()->json([
        'debug' => 'WEB ROUTE KENA',
        'message' => 'Request /api/v1/jobs berhasil sampai Laravel'
    ]);
});


/*
|--------------------------------------------------------------------------
| Auth (Login / Register)
|--------------------------------------------------------------------------
*/

Route::get('/login', function () {
    return view('welcome');
});

Route::get('/register', function () {
    return view('welcome');
});


/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

Route::get('/dashboard-page', function () {
    return redirect('/alumni');
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
        return view('admin.alumni');
    });


    Route::get('/tracer-study', function () {
        return view('admin.tracer-study');
    });


    Route::get('/perusahaan', function () {
        return view('admin.perusahaan');
    });

    Route::get('/kampus', function () {
        return view('admin.kampus');
    });


    Route::get('/laporan', function () {
        return view('admin.reports');
    });


    Route::get('/notifications', function () {
        return view('admin.dashboard');
    });

    Route::get('/lowongan', function () {
        return view('admin.lowongan');
    });

    Route::get('/beasiswa', function () {
        return view('admin.beasiswa');
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
        return view('alumni.alumnikampus');
    });

    Route::get('/beasiswa', function () {
        return view('alumni.alumnibeasiswa');
    });

    Route::get('/lowongan', function () {
        return view('alumni.alumnilowongan');
    });
});
