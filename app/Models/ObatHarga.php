<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ObatHarga extends Model
{
    protected $fillable = ['obat_id', 'harga_baru'];

    public function obat()
    {
        return $this->belongsTo(Obat::class);
    }
}
