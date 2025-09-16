<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Obat extends Model
{
    protected $fillable = ['nama', 'qty_awal', 'harga_awal'];

    public function stocks()
    {
        return $this->hasMany(ObatStock::class);
    }

    public function hargas()
    {
        return $this->hasMany(ObatHarga::class);
    }

    // stok aktif = stok awal + semua tambahan
    public function getTotalQtyAttribute()
    {
        return $this->qty_awal + $this->stocks()->sum('jumlah');
    }

    // harga aktif = harga terakhir, fallback ke harga_awal
    public function getCurrentHargaAttribute()
    {
        return $this->hargas()->latest()->value('harga_baru') ?? $this->harga_awal;
    }
    public function racikans()
    {
        return $this->hasMany(Racikan::class);
    }
}
