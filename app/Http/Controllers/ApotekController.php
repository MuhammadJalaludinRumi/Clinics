<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Racikan;
use Inertia\Inertia;

class ApotekController extends Controller
{
    public function index()
    {
        $racikans = Racikan::with('obat')->latest()->get();

        return Inertia::render('Admin/Apotek/Index', [
            'racikans' => $racikans
        ]);
    }
}
