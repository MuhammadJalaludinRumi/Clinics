import { useForm, usePage, Link } from '@inertiajs/react';
import { useState } from 'react';
import AdminNavbar from '../Component/AdminNavbar';

interface PageProps {
    auth: {
        user: any;
    };
}

interface EditMenuProps {
    menu: any;
}

export default function EditMenu({ menu }: EditMenuProps) {
    const { props } = usePage<PageProps>();
    const currentUser = props.auth.user;
    const { roles }: any = usePage().props; // semua role tersedia

    const form = useForm({
        title: menu.title || '',
        url: menu.url || '',
        icon: menu.icon || '',
        roles: (menu.roles || []).map((r: any) => r.id),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(route('admin.menus.update', menu.id)); // route update
    };

    const getRoleColor = (roleName: string) => {
        switch (roleName.toLowerCase()) {
            case 'admin': return 'bg-red-50 text-red-700 border-red-200';
            case 'manager': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'user': return 'bg-green-50 text-green-700 border-green-200';
            default: return 'bg-purple-50 text-purple-700 border-purple-200';
        }
    };

    const getIconElement = (iconName: string | null) => {
        if (!iconName) {
            return (
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        }

        const iconClass = "h-5 w-5";

        switch (iconName.toLowerCase()) {
            case 'home':
            case 'dashboard':
                return (
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                );
            case 'user':
                return (
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                );
            case 'users':
                return (
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                );
            case 'settings':
                return (
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                );
            case 'menu':
            case 'list':
                return (
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                );
            case 'file':
                return (
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                );
            case 'folder':
                return (
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                );
            case 'chart':
            case 'analytics':
                return (
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                );
            case 'bell':
            case 'notification':
                return (
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5h5l-5-5v3H9v4h6v3z" />
                    </svg>
                );
            case 'lock':
            case 'security':
                return (
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                );
            case 'mail':
            case 'email':
                return (
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                );
            case 'calendar':
                return (
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                );
            case 'clock':
            case 'time':
                return (
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'search':
                return (
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                );
            default:
                return (
                    <svg className={iconClass + " text-gray-400"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                );
        }
    };

    const iconOptions = [
        { name: 'home', label: 'Home' },
        { name: 'dashboard', label: 'Dashboard' },
        { name: 'user', label: 'User' },
        { name: 'users', label: 'Users' },
        { name: 'settings', label: 'Settings' },
        { name: 'menu', label: 'Menu' },
        { name: 'file', label: 'File' },
        { name: 'folder', label: 'Folder' },
        { name: 'chart', label: 'Chart' },
        { name: 'bell', label: 'Bell' },
        { name: 'lock', label: 'Lock' },
        { name: 'mail', label: 'Mail' },
        { name: 'calendar', label: 'Calendar' },
        { name: 'clock', label: 'Clock' },
        { name: 'search', label: 'Search' },
    ];

    return (
        <>
            <AdminNavbar currentUser={currentUser} />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                <li className="inline-flex items-center">
                                    <Link href={route('admin.menus.index')} className="inline-flex items-center text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
                                        <svg className="mr-2.5 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                        </svg>
                                        Menu Management
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="w-3 h-3 text-slate-400 mx-1" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                        </svg>
                                        <span className="ml-1 text-sm font-medium text-slate-500 md:ml-2">Edit Menu</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border border-blue-300">
                                        <div className="text-blue-600">
                                            {getIconElement(menu.icon)}
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-slate-900">Edit Menu</h1>
                                        <p className="text-lg text-slate-600 mt-1">
                                            Modify menu item details and permissions
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <div className="inline-flex items-center px-4 py-2 rounded-xl bg-blue-50 text-blue-700 font-medium border border-blue-200">
                                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Editing Mode
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
                        <div className="px-8 py-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Basic Information */}
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                                        <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center mr-3">
                                            <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        Basic Information
                                    </h3>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                                                Menu Title *
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                required
                                                placeholder="e.g., Dashboard, Users, Settings"
                                                value={form.data.title}
                                                onChange={e => form.setData('title', e.target.value)}
                                                className="block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-400 transition-all duration-200"
                                            />
                                            {form.errors.title && (
                                                <p className="mt-2 text-sm text-red-600">{form.errors.title}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="url" className="block text-sm font-semibold text-slate-700 mb-2">
                                                URL Path *
                                            </label>
                                            <input
                                                type="text"
                                                id="url"
                                                required
                                                placeholder="e.g., /dashboard, /users, /settings"
                                                value={form.data.url}
                                                onChange={e => form.setData('url', e.target.value)}
                                                className="block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-400 transition-all duration-200"
                                            />
                                            {form.errors.url && (
                                                <p className="mt-2 text-sm text-red-600">{form.errors.url}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Icon Selection */}
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                                        <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center mr-3">
                                            <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </div>
                                        Icon Selection
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-3">
                                            {iconOptions.map((option) => (
                                                <button
                                                    key={option.name}
                                                    type="button"
                                                    onClick={() => form.setData('icon', option.name)}
                                                    className={`relative flex items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
                                                        form.data.icon === option.name
                                                            ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-md'
                                                            : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700'
                                                    }`}
                                                    title={option.label}
                                                >
                                                    {getIconElement(option.name)}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">
                                                Custom Icon:
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter custom icon name"
                                                value={form.data.icon}
                                                onChange={e => form.setData('icon', e.target.value)}
                                                className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <div className="flex items-center justify-center w-12 h-12 bg-slate-100 rounded-lg border border-slate-200">
                                                {getIconElement(form.data.icon)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Role Permissions */}
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                                        <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center mr-3">
                                            <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                        </div>
                                        Access Permissions
                                    </h3>
                                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                        <p className="text-sm text-slate-600 mb-4">
                                            Select which user roles can access this menu item. At least one role must be selected.
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {roles.map((role: any) => (
                                                <label key={role.id} className="relative flex items-center p-4 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors duration-200 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        value={role.id}
                                                        checked={form.data.roles.includes(role.id)}
                                                        onChange={e => {
                                                            const id = role.id;
                                                            const newRoles = form.data.roles.includes(id)
                                                                ? form.data.roles.filter((r: number) => r !== id)
                                                                : [...form.data.roles, id];
                                                            form.setData('roles', newRoles);
                                                        }}
                                                        className="h-5 w-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                                    />
                                                    <div className="ml-3">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium border ${getRoleColor(role.name)}`}>
                                                            {role.name}
                                                        </span>
                                                        {role.description && (
                                                            <p className="text-xs text-slate-500 mt-1">{role.description}</p>
                                                        )}
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                        {form.errors.roles && (
                                            <p className="mt-3 text-sm text-red-600">{form.errors.roles}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                                    <Link
                                        href={route('admin.menus.index')}
                                        className="inline-flex items-center px-6 py-3 border border-slate-300 rounded-xl shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                    >
                                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        {form.processing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Saving Changes...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
