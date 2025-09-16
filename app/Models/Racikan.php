<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Racikan extends Model
{
    protected $table = 'racikans';

    protected $fillable = [
        'no_rm',
        'nama',
        'no',
        'r_ke',
        'kemasan',
        'obat_id',
        'nama_obat',
        'satuan',
        'qty',
        'aturan_pakai',
        'keterangan',
        'catatan',
        'keterangan_racikan',
        'is_paid',
    ];

    protected $casts = [
        'is_paid' => 'boolean',
    ];

    public function obat()
    {
        return $this->belongsTo(Obat::class, 'obat_id');
    }
}
