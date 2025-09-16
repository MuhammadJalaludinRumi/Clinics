<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = ['name'];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'menu_role');
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function menus()
    {
        return $this->belongsToMany(Menu::class, 'menu_role')
            ->withPivot('allow')
            ->withTimestamps()
            ->select('menus.id', 'menus.title', 'menus.url', 'menus.icon');
    }
}
