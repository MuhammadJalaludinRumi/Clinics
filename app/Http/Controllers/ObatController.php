<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Obat;
use App\Models\ObatStock;
use App\Models\ObatHarga;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ObatController extends Controller
{
    public function index()
    {
        $obats = Obat::with(['stocks', 'hargas'])
            ->orderBy('id', 'desc') // biar urut terbaru
            ->paginate(7) // <= ini bikin paging, 7 data per halaman
            ->through(function ($obat) {
                // tambahkan accessor manual biar langsung ada di response
                return [
                    'id' => $obat->id,
                    'nama' => $obat->nama,
                    'total_qty' => $obat->total_qty,
                    'current_harga' => $obat->current_harga,
                ];
            });

        return Inertia::render('Admin/Obat/Index', [
            'obats' => $obats,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Obat/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => 'required|string|max:255',
            'qty_awal' => 'nullable|integer|min:0',
            'harga_awal' => 'nullable|integer|min:0',
        ]);

        // Simpan obat hanya dengan nama
        $obat = Obat::create([
            'nama' => $data['nama'],
        ]);

        // Kalau ada qty_awal, simpan ke tabel stok
        if (!empty($data['qty_awal'])) {
            $obat->stocks()->create([
                'jumlah' => $data['qty_awal'],
                'tanggal' => now()->toDateString(),
            ]);
        }

        // Kalau ada harga_awal, simpan ke tabel harga
        if (!empty($data['harga_awal'])) {
            $obat->hargas()->create([
                'harga_baru' => $data['harga_awal'],
                'tanggal' => now()->toDateString(),
            ]);
        }

        return redirect()->route('admin.obat.index')->with('success', 'Obat berhasil ditambahkan');
    }

    public function edit(Obat $obat)
    {
        return Inertia::render('Admin/Obat/Edit', [
            'obat' => $obat,
        ]);
    }

    public function update(Request $request, Obat $obat)
    {
        $data = $request->validate([
            'nama' => 'required|string|max:255',
            'qty_awal' => 'nullable|integer|min:0',
            'harga_awal' => 'nullable|integer|min:0',
        ]);

        $obat->update($data);
        return redirect()->route('admin.obat.index')->with('success', 'Obat berhasil diupdate');
    }

    public function updateHarga(Request $request, Obat $obat)
    {
        $data = $request->validate([
            'harga_baru' => 'required|numeric|min:0',
        ]);

        $obat->hargas()->create(['harga_baru' => $data['harga_baru']]);

        return redirect()->route('admin.obat.TambahHarga', $obat->id)
            ->with('success', 'Harga berhasil diperbarui');
    }

    public function tambahStok(Request $request, Obat $obat)
    {
        $data = $request->validate([
            'jumlah' => 'required|integer|min:1',
        ]);

        $obat->stocks()->create(['jumlah' => $data['jumlah']]);

        return redirect()->route('admin.obat.TambahStok', $obat->id)
            ->with('success', 'Stok berhasil ditambahkan');
    }

    public function editStok(Request $request, Obat $obat, $stockId)
    {
        $request->validate([
            'jumlah' => 'required|integer|min:0',
        ]);

        $stock = $obat->stocks()->findOrFail($stockId);
        $stock->update(['jumlah' => $request->jumlah]);

        return redirect()->route('admin.obat.TambahStok', $obat->id)
            ->with('success', 'Stok berhasil diubah');
    }

    public function import(Request $request)
    {
        $file = $request->file('file');

        // pakai package Laravel Excel atau parsing manual (misal dengan PhpSpreadsheet)
        $data = Excel::toArray([], $file)[0]; // sheet pertama

        foreach ($data as $index => $row) {
            if ($index == 0) continue; // skip header

            $nama  = $row[0]; // kolom A = nama
            $stock = $row[1]; // kolom B = stock
            $harga = $row[2]; // kolom C = harga

            // cek kalau obat sudah ada
            $obat = Obat::firstOrCreate(
                ['nama' => $nama],
                ['created_at' => now(), 'updated_at' => now()]
            );

            // masuk ke tabel stock
            if ($stock) {
                ObatStock::create([
                    'obat_id' => $obat->id,
                    'jumlah'  => $stock,
                    'tanggal' => now()->toDateString(), // histori pake date aja
                ]);
            }

            // masuk ke tabel harga
            if ($harga) {
                ObatHarga::create([
                    'obat_id' => $obat->id,
                    'harga_baru'   => $harga,
                    'tanggal' => now()->toDateString(),
                ]);
            }
        }

        return redirect()->back()->with('success', 'Import berhasil!');
    }
    public function destroy(Obat $obat)
    {
        $obat->delete();
        return redirect()->route('admin.obat.index')->with('success', 'Obat berhasil dihapus');
    }
}
