<?php

namespace App\Http\Controllers;

use App\Models\DaftarRegistrasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DaftarRegistrasiController extends Controller
{
    public function index()
    {
        $DaftarRegistrasi = DaftarRegistrasi::all();
        return Inertia::render('Admin/DaftarRegistrasi/Index', [
            'DaftarRegistrasi' => $DaftarRegistrasi
        ]);
    }
}
