<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservasi extends Model
{
    protected $table = 'reservasi';
    protected $fillable = [
        'no_rm',
        'registration_no',
        'nik',
        'name',
        'phone',
        'birth_date',
        'complaint',
        'status',
        'alamat'
    ];
    protected $casts = [
        'birth_date' => 'date:Y-m-d',
    ];
}
