<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Racikan;
use Inertia\Inertia;

class ApotekController extends Controller
{
    public function index()
    {
        // eager-load harga terbaru lewat relasi obat.latestHarga
        $racikans = Racikan::with('obat.latestHarga')->latest()->get();

        // pastikan setiap model menyertakan accessor 'total_harga'
        $racikans->each(function ($r) {
            $r->append('total_harga');
        });

        return Inertia::render('Admin/Apotek/Index', [
            'racikans' => $racikans,
        ]);
    }
}
