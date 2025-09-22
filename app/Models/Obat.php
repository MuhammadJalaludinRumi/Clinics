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

    public function getTotalQtyAttribute()
    {
        return $this->qty_awal + $this->stocks()->sum('jumlah');
    }

    public function latestHarga()
    {
        return $this->hasOne(ObatHarga::class, 'obat_id')
            ->latestOfMany();
    }

    public function getHargaAttribute()
    {
        return $this->harga_baru;
    }

    public function racikans()
    {
        return $this->hasMany(Racikan::class);
    }
    public function getCurrentHargaAttribute()
    {
        return optional($this->latestHarga)->harga_baru ?? 0;
    }
}
