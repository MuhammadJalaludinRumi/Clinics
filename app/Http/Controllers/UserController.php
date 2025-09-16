<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Menu;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{

    public function index()
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => User::with('menus', 'role')->get(),
            'roles' => Role::all(),
            'menus' => Menu::select('id', 'title as name')->get(),
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        $user->role_id = $request->role_id;
        $user->save();

        return response()->json(['success' => true]);
    }

    public function updateMenus(Request $request, User $user)
    {
        $request->validate([
            'menu_ids' => 'array',
            'menu_ids.*' => 'exists:menus,id',
        ]);

        $menuIds = $request->menu_ids ?? [];

        $syncData = [];
        foreach ($menuIds as $id) {
            $syncData[$id] = ['allow' => true];
        }

        $user->menus()->sync($syncData);

        return response()->json(['success' => true]);
    }
}
