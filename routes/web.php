<?php

use App\Http\Controllers\DashboardRMEController;
use App\Http\Controllers\PendaftaranPasienController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome/Main', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix("rme")->group(function () {
    Route::get('/', [DashboardRMEController::class, "index"])->name("rme.index");
    Route::prefix("pendaftaran")->group(function () {
        Route::get("/", [PendaftaranPasienController::class, "index"])->name("rme.pendaftaran.index");
        Route::post("/", [PendaftaranPasienController::class, "store"])->name("rme.pendaftaran.store");
        Route::get("/cetak", [PendaftaranPasienController::class, "cetak"])->name("rme.pendaftaran.cetak");
        Route::get("/cetak/{id}", [PendaftaranPasienController::class, "cetak"])->name("rme.pendaftaran.cetak");
        Route::get("/show/{id}", [PendaftaranPasienController::class, "show"])->name("rme.pendaftaran.show");
    });
});
require __DIR__ . '/auth.php';
