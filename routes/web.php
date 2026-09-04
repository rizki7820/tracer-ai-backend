<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;


/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return redirect('/login');
});


Route::fallback(function (Request $request) {
    return response()->json([
        'method'       => $request->method(),
        'path'         => $request->path(),
        'full_url'     => $request->fullUrl(),
        'request_uri'  => $_SERVER['REQUEST_URI'] ?? null,
        'path_info'    => $_SERVER['PATH_INFO'] ?? null,
        'script_name'  => $_SERVER['SCRIPT_NAME'] ?? null,
        'query_string' => $_SERVER['QUERY_STRING'] ?? null,
    ], 404);
});

Route::get('/debug-routes', function () {
    $routes = collect(\Illuminate\Support\Facades\Route::getRoutes())->map(function ($route) {
        return [
            'method' => implode('|', $route->methods()),
            'uri'    => $route->uri(),
        ];
    })->values();

    return response()->json($routes);
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
