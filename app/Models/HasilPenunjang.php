<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HasilPenunjang extends Model
{
    protected $table = 'hasil_penunjang';
    protected $fillable = ['order_id', 'hasil', 'tanggal'];

    public function order()
    {
        return $this->belongsTo(OrderPenunjang::class, 'order_id');
    }
}
