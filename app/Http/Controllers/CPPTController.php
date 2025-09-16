<?php

namespace App\Http\Controllers;

use App\Models\CPPT;
use App\Models\DaftarRegistrasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CPPTController extends Controller
{
    public function index()
    {
        $cppts = CPPT::latest()->get();

        return Inertia::render('Admin/CPPT/Index', [
            'cppts' => $cppts,
        ]);
    }

    public function create(DaftarRegistrasi $daftarRegistrasi)
    {
        return Inertia::render('Admin/CPPT/Create', [
            'daftarRegistrasi' => $daftarRegistrasi,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'no_rm' => 'required',
            'ppa' => 'required',
            'subjective' => 'nullable|string',
            'objective' => 'nullable|string',
            'assessment' => 'nullable|string',
            'plan' => 'nullable|string',
            'verified' => 'nullable|string',
            'integrasi' => 'nullable|string',
        ]);

        $data['tanggal_jam'] = now();

        CPPT::create($data);

        return redirect()->route('admin.cppt.index')->with('success', 'CPPT berhasil disimpan');
    }

    public function show($id)
    {
        $cppt = CPPT::findOrFail($id);

        return Inertia::render('Admin/CPPT/Show', [
            'cppt' => $cppt,
        ]);
    }
}
