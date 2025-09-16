<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CPPT extends Model
{
    protected $table = 'cppts';

    protected $fillable = [
        'no_rm',
        'tanggal_jam',
        'ppa',
        'subjective',
        'objective',
        'assessment',
        'plan',
        'verified',
        'integrasi',
    ];
}


