<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Role;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }


    public function menus()
    {
        return $this->belongsToMany(Menu::class, 'menu_user')
            ->withPivot('allow')
            ->withTimestamps();
    }

    // override menu spesifik per user
    public function overrideMenus()
    {
        return $this->belongsToMany(Menu::class, 'menu_user')
            ->withPivot('allow');
    }

    public function effectiveMenus()
    {
        $roleMenus = $this->role
            ? $this->role->menus()->pluck('menus.id')->toArray()
            : [];

        $overrides = $this->overrideMenus()->get();

        foreach ($overrides as $menu) {
            if ($menu->pivot->allow) {
                $roleMenus[] = $menu->id;
            } else {
                $roleMenus = array_diff($roleMenus, [$menu->id]);
            }
        }

        return Menu::whereIn('id', $roleMenus)->get();
    }
}
