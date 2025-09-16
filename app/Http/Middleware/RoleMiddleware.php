<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle($request, Closure $next, $role)
    {
        $user = $request->user();

        // Kalau superuser, bypass semua role
        if ($user && $user->is_superuser) {
            return $next($request);
        }

        // Kalau bukan superuser, cek role seperti biasa
        if (!$user || !$user->role || $user->role->name !== $role) {
            abort(403, 'Unauthorized');
        }

        return $next($request);
    }
}
