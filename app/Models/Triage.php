<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Triage extends Model
{
    use HasFactory;

    protected $fillable = [
        'daftar_registrasi_id',
        'systolic',
        'diastolic',
        'heart_rate',
        'resp_rate',
        'temperature',
        'spo2',
        'level',
    ];

    public function daftarRegistrasi()
    {
        return $this->belongsTo(DaftarRegistrasi::class, 'daftar_registrasi_id');
    }
}
