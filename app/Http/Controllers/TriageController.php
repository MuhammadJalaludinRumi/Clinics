<?php

namespace App\Http\Controllers;

use App\Models\Triage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TriageController extends Controller
{

    public function index()
    {
        $triages = \App\Models\Triage::with('daftarRegistrasi')->latest()->get();

        return Inertia::render('Admin/Triage/Index', [
            'triages' => $triages
        ]);
    }

    public function create($patientId)
    {
        return Inertia::render('Admin/Triage/Create', [
            'patientId' => $patientId,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'daftar_registrasi_id' => 'required|exists:daftar_registrasi,id', // ✅ ganti ini
            'systolic' => 'required|integer',
            'diastolic' => 'required|integer',
            'heart_rate' => 'required|integer',
            'resp_rate' => 'required|integer',
            'temperature' => 'required|numeric',
            'spo2' => 'required|integer',
            'level' => 'required|string',
        ]);

        Triage::create($data);

        return redirect()
            ->route('admin.cppt.index')
            ->with('success', 'Data triage berhasil disimpan.');
    }

    public function show($id)
    {
        $triage = \App\Models\Triage::with('daftarRegistrasi')->findOrFail($id);

        return Inertia::render('Admin/Triage/Show', [
            'triage' => $triage
        ]);
    }
}
