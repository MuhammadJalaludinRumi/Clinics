<?php

namespace App\Http\Controllers;

use App\Models\OrderPenunjang;
use App\Models\HasilPenunjang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HasilPenunjangController extends Controller
{
    public function create(OrderPenunjang $order)
    {
        return Inertia::render('Admin/HasilPenunjang/Create', [
            'order' => $order->load('daftar_registrasi')
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders_penunjang,id',
            'hasil' => 'required|string',
            'tanggal' => 'required|date',
        ]);

        $order = OrderPenunjang::with('hasil')->findOrFail($validated['order_id']);

        // kalau sudah ada hasil, redirect ke edit
        if ($order->hasil) {
            return redirect()->route('hasil-penunjang.edit', $order->hasil->id);
        }

        // update status order jadi selesai
        $order->update(['status' => 'selesai']);

        // simpan hasil penunjang
        HasilPenunjang::create($validated);

        return redirect()->route('admin.penunjang.index')
            ->with('success', 'Hasil penunjang berhasil disimpan.');
    }

    public function edit(HasilPenunjang $hasil)
    {
        return Inertia::render('Admin/HasilPenunjang/Edit', [
            'hasil' => $hasil->load('order.daftar_registrasi')
        ]);
    }

    public function update(Request $request, HasilPenunjang $hasil)
    {
        $validated = $request->validate([
            'hasil' => 'required|string',
            'tanggal' => 'required|date',
        ]);

        $hasil->update($validated);

        return redirect()->route('admin.penunjang.index')
            ->with('success', 'Hasil penunjang berhasil diperbarui.');
    }
}
