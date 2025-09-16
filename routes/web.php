<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservasiController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TriageController;
use App\Http\Controllers\CPPTController;
use App\Http\Controllers\HasilPenunjangController;
use App\Http\Controllers\daftarRegistrasiController;
use App\Http\Controllers\RacikanController;
use App\Http\Controllers\OrderPenunjangController;
use App\Http\Controllers\ObatController;
use App\Http\Controllers\ApotekController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// User (buat reservasi)
Route::get('/reservasi', [ReservasiController::class, 'create'])->name('reservasi.create');
Route::post('/reservasi', [ReservasiController::class, 'store'])->name('reservasi.store');

// Cek NIK pasien lama
Route::get('/reservasi/check-nik/{nik}', [ReservasiController::class, 'checkNik'])->name('reservasi.checkNik');

// Success & Approve
Route::prefix('success')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/approve', [ReservasiController::class, 'approveForm'])->name('reservasi.approve.form');
    Route::post('/approve', [ReservasiController::class, 'approveByCode'])->name('reservasi.approve.code');
});

// Semua route admin
Route::prefix('admin')->middleware(['auth', 'verified'])->name('admin.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Index');
    })->name('index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //DaftarRegistrasi Routes
    Route::prefix('daftarRegistrasi')->name('daftarRegistrasi.')->group(function () {
        Route::get('/', [daftarRegistrasiController::class, 'index'])
            ->name('index');
    });

    Route::middleware(['auth', 'role:admin'])->group(function () {
        //Menu Management Routes
        Route::get('/menus', [MenuController::class, 'index'])->name('menus.index');
        Route::get('/menus/{menu}/edit', [MenuController::class, 'edit'])->name('menus.edit');
        Route::post('/menus', [MenuController::class, 'store'])->name('menus.store');
        Route::put('/menus/{menu}', [MenuController::class, 'update'])->name('menus.update');
        Route::delete('/menus/{menu}', [MenuController::class, 'destroy'])->name('menus.destroy');

        //Users Management
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::post('/users/{user}/roles', [UserController::class, 'updateRole'])->name('users.updateRole');
        Route::post('/users/{user}/menus', [UserController::class, 'updateMenus'])->name('users.updateMenus');
    });


    Route::middleware(['auth', 'role:dokter'])->group(function () {
        // Reservasi Routes
        Route::get('/reservasi', [ReservasiController::class, 'index'])->name('reservasi.index');
        Route::get('/reservasi/{id}', [ReservasiController::class, 'show'])->name('reservasi.show');
        Route::delete('/reservasi/{id}', [ReservasiController::class, 'destroy'])->name('reservasi.destroy');
        // CPPT Routes
        Route::prefix('cppt')->name('cppt.')->group(function () {
            Route::get('/', [\App\Http\Controllers\CPPTController::class, 'index'])->name('index');
            Route::get('/create/{daftarRegistrasi}', [\App\Http\Controllers\CPPTController::class, 'create'])->name('create');
            Route::post('/store', [\App\Http\Controllers\CPPTController::class, 'store'])->name('store');
            Route::get('/{id}', [\App\Http\Controllers\CPPTController::class, 'show'])->name('show');
        });
        // Racikan Routes
        Route::prefix('racikans')->name('racikans.')->group(function () {
            Route::get('/create/{no_rm}', [\App\Http\Controllers\RacikanController::class, 'create'])->name('create');
            Route::post('/store', [\App\Http\Controllers\RacikanController::class, 'store'])->name('store');
            Route::post('/{id}/mark-paid', [RacikanController::class, 'markPaid'])
                ->name('markPaid');
        });
        //Triage Routes
        Route::prefix('triage')->name('triage.')->group(function () {
            Route::get('/', [TriageController::class, 'index'])->name('index');
            Route::get('/create/{daftarRegistrasi}', [TriageController::class, 'create'])->name('create');
            Route::post('/store', [TriageController::class, 'store'])->name('store');
            Route::get('/{id}', [TriageController::class, 'show'])->name('show');
        });
        // Hasil penunjang
        Route::prefix('hasil-penunjang')->name('hasil-penunjang.')->group(function () {
            Route::get('/create/{order}', [HasilPenunjangController::class, 'create'])->name('create');
            Route::post('/', [HasilPenunjangController::class, 'store'])->name('store');
            Route::get('/{hasil}/edit', [HasilPenunjangController::class, 'edit'])->name('edit');
            Route::put('/{hasil}', [HasilPenunjangController::class, 'update'])->name('update');
        });

        // Order penunjang
        Route::prefix('penunjang')->group(function () {
            Route::get('/', [OrderPenunjangController::class, 'index'])->name('penunjang.index');
            Route::get('/create/{id}', [OrderPenunjangController::class, 'create'])->name('penunjang.create');
            Route::post('/', [OrderPenunjangController::class, 'store'])->name('penunjang.store');
        });
    });


    Route::middleware(['auth', 'role:dokter'])->group(function () {
        Route::prefix('/obat')->name('obat.')->group(function () {
            Route::get('/', [ObatController::class, 'index'])->name('index');
            Route::get('/create', [ObatController::class, 'create'])->name('create');
            Route::post('/', [ObatController::class, 'store'])->name('store');
            Route::get('/{obat}/edit', [ObatController::class, 'edit'])->name('edit');
            Route::put('/{obat}', [ObatController::class, 'update'])->name('update');
            Route::delete('/{obat}', [ObatController::class, 'destroy'])->name('destroy');

            // halaman baru
            Route::get('/{obat}/tambah-stok', function (App\Models\Obat $obat) {
                $obat->load('stocks');
                return Inertia::render('Admin/Obat/TambahStok', ['obat' => $obat]);
            })->name('TambahStok');

            Route::post('/{obat}/tambah-stok', [ObatController::class, 'tambahStok'])->name('tambahStok');
            Route::put('/{obat}/edit-stok/{stock}', [ObatController::class, 'editStok'])->name('editStok');

            Route::get('/{obat}/tambah-harga', function (App\Models\Obat $obat) {
                $obat->load('hargas');
                return Inertia::render('Admin/Obat/TambahHarga', ['obat' => $obat]);
            })->name('TambahHarga');

            Route::post('/{obat}/tambah-harga', [ObatController::class, 'updateHarga'])->name('updateHarga');
            Route::post('/import', [ObatController::class, 'import'])->name('import');
        });
        // Apotek Routes
        Route::get('/apotek', [ApotekController::class, 'index'])->name('apotek.index');
    });
});


require __DIR__ . '/auth.php';
