import { useForm, usePage, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminNavbar from "../Component/AdminNavbar";

interface PageProps {
    auth: {
        user: any;
    };
}

interface Menu {
    id: number;
    title: string;
    url: string;
    icon: string;
    roles: { id: number; name: string }[];
    created_at?: string;
    updated_at?: string;
}

interface Role {
    id: number;
    name: string;
    description?: string;
}

export default function MenuManagement() {
    const { props } = usePage<PageProps>();
    const currentUser = props.auth.user;
    const { menus, roles }: { menus: Menu[], roles: Role[] } = usePage().props as any;

    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState<string>("");
    const form = useForm({
        title: '',
        url: '',
        icon: '',
        roles: [] as number[],
    });

    const roleForm = useForm({
        roles: [] as number[],
    });

    // Filter menus based on search term and selected role
    const filteredMenus = menus.filter(menu => {
        const matchesSearch = menu.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            menu.url.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === "" ||
                          menu.roles.some(role => role.id.toString() === selectedRole);
        return matchesSearch && matchesRole;
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route('admin.menus.store'), {
            onSuccess: () => {
                form.reset();
                setShowAddForm(false);
                router.reload({ only: ['menus'] });
            }
        });
    };

    const handleDelete = (menuId: number) => {
        if (confirm('Are you sure you want to delete this menu?')) {
            router.delete(route('admin.menus.destroy', menuId), {
                onSuccess: () => {
                    router.reload({ only: ['menus'] });
                }
            });
        }
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                            <div className="sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Menu Management</h1>
                                    <p className="text-lg text-slate-600">
                                        Configure navigation menus and role-based access control
                                    </p>
                                </div>
                                <div className="mt-6 sm:mt-0 flex items-center space-x-4">
                                    <div className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium border border-slate-200">
                                        <svg className="h-5 w-5 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                        {menus.length} Total Menus
                                    </div>
                                    <button
                                        onClick={() => setShowAddForm(!showAddForm)}
                                        className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                    >
                                        <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add New Menu
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add Menu Form */}
                    {showAddForm && (
                        <div className="mb-8">
                            <div className="bg-white shadow-lg rounded-2xl border border-slate-200">
                                <div className="px-8 py-8">
                                    <div className="flex items-center mb-6">
                                        <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center mr-4">
                                            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900">
                                            Add New Menu Item
                                        </h3>
                                    </div>
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                                                    Menu Title
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
                                            </div>
                                            <div>
                                                <label htmlFor="url" className="block text-sm font-semibold text-slate-700 mb-2">
                                                    URL Path
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
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="icon" className="block text-sm font-semibold text-slate-700 mb-2">
                                                Icon
                                            </label>
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
                                            <div className="mt-3 flex items-center space-x-2">
                                                <span className="text-sm text-slate-600">Custom icon name:</span>
                                                <input
                                                    type="text"
                                                    placeholder="Enter custom icon name"
                                                    value={form.data.icon}
                                                    onChange={e => form.setData('icon', e.target.value)}
                                                    className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-lg border border-slate-200">
                                                    {getIconElement(form.data.icon)}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                                                Visible to Roles
                                            </label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {roles.map((role) => (
                                                    <label key={role.id} className="relative flex items-center p-4 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors duration-200 cursor-pointer">
                                                        <input
                                                            id={`role-${role.id}`}
                                                            type="checkbox"
                                                            value={role.id}
                                                            checked={form.data.roles.includes(role.id)}
                                                            onChange={e => {
                                                                const id = role.id;
                                                                const roles = form.data.roles.includes(id)
                                                                    ? form.data.roles.filter((r: number) => r !== id)
                                                                    : [...form.data.roles, id];
                                                                form.setData('roles', roles);
                                                            }}
                                                            className="h-5 w-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                                        />
                                                        <div className="ml-3">
                                                            <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium border ${getRoleColor(role.name)}`}>
                                                                {role.name}
                                                            </span>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                                            <button
                                                type="button"
                                                onClick={() => setShowAddForm(false)}
                                                className="px-6 py-3 border border-slate-300 rounded-xl shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={form.processing}
                                                className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                            >
                                                {form.processing ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                        Adding...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                        Add Menu
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Search and Filters */}
                    <div className="mb-8">
                        <div className="bg-white shadow-sm rounded-2xl border border-slate-200 p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2">
                                    <label htmlFor="search" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Search Menus
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="search"
                                            className="block w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            placeholder="Search by title or URL..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="role-filter" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Filter by Role
                                    </label>
                                    <select
                                        id="role-filter"
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value)}
                                        className="block w-full px-4 py-3 text-base border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200"
                                    >
                                        <option value="">All Roles</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id.toString()}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-slate-500 bg-slate-50 px-4 py-2 rounded-lg">
                                Showing {filteredMenus.length} of {menus.length} menus
                            </div>
                        </div>
                    </div>

                    {/* Menus Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredMenus.map((menu) => (
                            <div key={menu.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center border border-blue-200">
                                                <div className="text-blue-600">
                                                    {getIconElement(menu.icon)}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900">
                                                    {menu.title}
                                                </h3>
                                                <p className="text-sm text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded-md">
                                                    {menu.url}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Accessible Roles</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {menu.roles.length > 0 ? (
                                                menu.roles.map((role) => (
                                                    <span
                                                        key={role.id}
                                                        className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${getRoleColor(role.name)}`}
                                                    >
                                                        {role.name}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-sm text-slate-400 italic">No roles assigned</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex space-x-2 pt-4 border-t border-slate-100">
                                        <Link
                                            href={route('admin.menus.edit', menu.id)}
                                            className="flex-1 inline-flex items-center justify-center px-3 py-2.5 border border-blue-300 text-sm font-medium rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                        >
                                            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(menu.id)}
                                            className="flex-1 inline-flex items-center justify-center px-3 py-2.5 border border-red-300 text-sm font-medium rounded-xl text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                                        >
                                            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredMenus.length === 0 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12">
                            <div className="text-center">
                                <div className="mx-auto h-20 w-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                                    <svg className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">No menus found</h3>
                                <p className="text-slate-500 mb-6">
                                    {searchTerm || selectedRole ? 'Try adjusting your search criteria.' : 'Get started by adding a new menu item.'}
                                </p>
                                {!searchTerm && !selectedRole && (
                                    <button
                                        onClick={() => setShowAddForm(true)}
                                        className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                    >
                                        <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add Your First Menu
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
