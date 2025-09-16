<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ObatStock extends Model
{
    protected $fillable = ['obat_id', 'jumlah'];

    public function obat()
    {
        return $this->belongsTo(Obat::class);
    }
}
