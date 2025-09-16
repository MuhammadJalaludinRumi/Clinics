<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SidebarController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $menus = $user->role->menus()->get();

        return Inertia::render('Dashboard', [
            'menus' => $menus,
        ]);
    }
}
