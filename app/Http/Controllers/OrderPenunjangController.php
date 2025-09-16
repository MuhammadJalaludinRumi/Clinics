<?php

namespace App\Http\Controllers;

use App\Models\DaftarRegistrasi;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\OrderPenunjang;

class OrderPenunjangController extends Controller
{
    public function index()
    {
        $orders = OrderPenunjang::with(['daftar_registrasi', 'hasil']) // ✅ load hasil
            ->latest()
            ->get();

        return Inertia::render('Admin/Penunjang/Index', [
            'orders' => $orders,
        ]);
    }


    public function create($id)
    {
        $pasien = DaftarRegistrasi::findOrFail($id);

        return Inertia::render('Admin/Penunjang/Create', [
            'pasien' => $pasien
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'daftar_registrasi_id' => 'required|exists:daftar_registrasi,id',
            'jenis' => 'required|in:lab,radiologi,spirometri',
            'nama_pemeriksaan' => 'required|string'
        ]);

        OrderPenunjang::create($request->all());

        return redirect()->route('admin.penunjang.index')->with('success', 'Order Penunjang berhasil ditambahkan');
    }
}
