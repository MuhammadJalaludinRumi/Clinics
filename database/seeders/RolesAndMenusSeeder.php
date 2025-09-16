<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Menu;

class RolesAndMenusSeeder extends Seeder
{
    public function run()
    {
        // Roles
        $admin = Role::create(['name' => 'admin']);
        $user = Role::create(['name' => 'user']);
        $dokter = Role::create(['name' => 'dokter']);
        $apotek = Role::create(['name' => 'apotek']);
        $approval = Role::create(['name' => 'approval']);

        // Menus
        $menus = [
            ['title' => 'Dashboard', 'url' => '/dashboard', 'icon' => 'Settings'],
            ['title' => 'Triage', 'url' => '/triage', 'icon' => 'Stethoscope'],
            ['title' => 'CPPT', 'url' => '/cppt', 'icon' => 'Calendar'],
            ['title' => 'Laboratorium', 'url' => '/lab', 'icon' => 'Shield'],
            ['title' => 'Laporan', 'url' => '/laporan', 'icon' => 'FileText'],
            ['title' => 'Pengaturan', 'url' => '/settings', 'icon' => 'Settings'],
        ];

        foreach ($menus as $menuData) {
            $menu = Menu::create($menuData);

            // Assign semua menu ke admin
            $admin->menus()->attach($menu);

            // Assign beberapa menu ke role lain (contoh)
            if (in_array($menuData['title'], ['Dashboard', 'Triage'])) {
                $dokter->menus()->attach($menu);
            }
            if ($menuData['title'] === 'Dashboard') {
                $user->menus()->attach($menu);
            }
        }
    }
}
