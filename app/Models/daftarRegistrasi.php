<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DaftarRegistrasi extends Model
{
    use HasFactory;

    // Nama tabel (opsional kalau pakai konvensi plural)
    protected $table = 'daftar_registrasi';

    // Kolom yang bisa diisi mass assignment
    protected $fillable = [
        'no_rm',
        'nik',
        'name',
        'phone',
        'birth_date',
        'alamat',
        'registration_no',
    ];

    protected $casts = [
        'birth_date' => 'date:Y-m-d',
    ];

}
