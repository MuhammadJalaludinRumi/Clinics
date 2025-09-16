<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'menus' => $user->effectiveMenus()->map(function ($menu) {
                        return [
                            'id' => $menu->id,
                            'title' => $menu->title,
                            'url' => $menu->url,
                            'icon' => $menu->icon,
                        ];
                    }),
                ] : null,
            ],
        ]);
    }
}
