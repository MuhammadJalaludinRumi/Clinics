<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::with('roles')->get();
        $roles = Role::all();

        return Inertia::render('Admin/Menus/Index', [
            'menus' => $menus,
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:255',
            'roles' => 'nullable|array',
            'roles.*' => 'exists:roles,id',
        ]);

        $menu = Menu::create($request->only('title', 'url', 'icon'));
        $menu->roles()->sync($request->roles ?? []);

        return redirect()->back()->with('success', 'Menu created!');
    }

    public function edit(Menu $menu)
    {

        $menu->load('roles');
        $roles = Role::all();

        return Inertia::render('Admin/Menus/Edit', [
            'menu' => $menu,
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, Menu $menu)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:255',
            'roles' => 'nullable|array',
            'roles.*' => 'exists:roles,id',
        ]);

        $menu->update($request->only('title', 'url', 'icon'));
        $menu->roles()->sync($request->roles ?? []);
        return redirect()->route('admin.menus.index')->with('success', 'Menu updated!');
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();
        return redirect()->back()->with('success', 'Menu deleted!');
    }
}
