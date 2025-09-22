<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $fillable = ['title', 'url', 'icon'];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'menu_role');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'menu_user')
            ->withPivot('allow');
    }
}
