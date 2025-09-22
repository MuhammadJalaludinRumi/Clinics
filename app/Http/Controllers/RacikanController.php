<?php

namespace App\Http\Controllers;

use App\Models\Racikan;
use App\Models\ObatStock;
use App\Models\Obat;
use App\Models\DaftarRegistrasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RacikanController extends Controller
{
    public function index($no_rm)
    {
        $racikans = Racikan::with([
            'obat.harga_baru' // relasi ke harga terbaru
        ])->where('no_rm', $no_rm)
            ->get();

        return Inertia::render('Admin/Racikan/Index', [
            'racikans' => $racikans
        ]);
    }

    // Controller
    public function create($no_rm)
    {

        $obatList = Obat::all(['id', 'nama']);
        $regis = DaftarRegistrasi::where('no_rm', $no_rm)->firstOrFail();

        return Inertia::render('Admin/Racikan/Create', [
            'daftarRegistrasi' => $regis,
            'obatList' => $obatList,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'no' => 'required|string',
            'r_ke' => 'nullable|integer',
            'kemasan' => 'nullable|string',
            'obat_id' => 'required|exists:obats,id',
            'satuan' => 'nullable|string',
            'qty' => 'required|integer|min:1',
            'aturan_pakai' => 'nullable|string',
            'keterangan' => 'nullable|string',
            'catatan' => 'nullable|string',
            'keterangan_racikan' => 'nullable|string',
        ]);

        Racikan::create($request->all());

        return redirect()->route('admin.cppt.index')
            ->with('success', 'Resep berhasil dibuat!');
    }
    public function markPaid($id)
    {
        $racikan = Racikan::with('obat')->findOrFail($id);
        $racikan->is_paid = true;
        $racikan->save();

        // Kurangi stok dari tabel obat_stocks
        if ($racikan->obat) {
            // Catat pengurangan stok
            ObatStock::create([
                'obat_id'    => $racikan->obat_id,
                'jumlah'     => -$racikan->qty, // kurangi stok
                'keterangan' => 'Pengurangan karena pembayaran racikan #' . $racikan->id,
            ]);
        }
    }
}
