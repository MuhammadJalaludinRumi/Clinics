<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuUserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('menu_user')->insert([
            [
                'user_id' => 1,
                'menu_id' => 1,
                'allow'   => true,
            ],
            [
                'user_id' => 1,
                'menu_id' => 2,
                'allow'   => false,
            ],
        ]);
    }
}
