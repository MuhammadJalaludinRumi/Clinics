<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderPenunjang extends Model
{
    protected $table = 'orders_penunjang';
    protected $fillable = ['daftar_registrasi_id', 'jenis', 'nama_pemeriksaan', 'status'];

    public function hasil()
    {
        return $this->hasOne(HasilPenunjang::class, 'order_id');
    }

    public function daftar_registrasi()
    {
        return $this->belongsTo(DaftarRegistrasi::class);
    }
}
