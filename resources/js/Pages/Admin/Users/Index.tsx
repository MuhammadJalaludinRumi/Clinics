import { useForm, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import AdminNavbar from "../Component/AdminNavbar";

interface User {
    id: number;
    name: string;
    email: string;
    role?: { id: number; name: string };
    menus?: { id: number; name?: string; menu?: string }[];
    created_at?: string;
    last_login?: string;
}

interface Role {
    id: number;
    name: string;
    description?: string;
}

interface Menu {
    id: number;
    name?: string;
    menu?: string;
    icon?: string;
}

interface Props {
    users: User[];
    roles: Role[];
    menus: Menu[];
}

export default function Index({ users, roles, menus }: Props) {
    const { props } = usePage<any>();
    const currentUser = props.auth.user;
    const { data, setData, post, processing } = useForm<{ role_id: number | null }>({
        role_id: null,
    });

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedMenus, setSelectedMenus] = useState<number[]>([]);
    const [isSavingMenus, setIsSavingMenus] = useState(false);
    const [roleModalUser, setRoleModalUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Modal functions
    const openRoleModal = (user: User) => {
        setRoleModalUser(user);
        setData("role_id", user.role?.id ?? null);
    };

    const closeRoleModal = () => {
        setRoleModalUser(null);
        setData("role_id", null);
    };

    const saveRole = () => {
        if (!roleModalUser || !data.role_id) return;
        post(route("admin.users.updateRole", roleModalUser.id), {
            onSuccess: () => {
                closeRoleModal();
                router.reload({ only: ["users"] });
            },
        });
    };

    const openMenuModal = (user: User) => {
        setSelectedUser(user);
        setSelectedMenus(user.menus?.map((m) => Number(m.id)) || []);
    };

    const closeMenuModal = () => {
        setSelectedUser(null);
        setSelectedMenus([]);
    };

    const toggleMenu = (menuId: number) => {
        setSelectedMenus((prev) =>
            prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]
        );
    };

    const saveMenus = () => {
        if (!selectedUser) return;
        router.post(route("admin.users.updateMenus", selectedUser.id), {
            menu_ids: selectedMenus,
        }, {
            preserveScroll: true,
            onStart: () => setIsSavingMenus(true),
            onFinish: () => setIsSavingMenus(false),
            onSuccess: () => {
                closeMenuModal();
                router.reload({ only: ["users"] });
            },
        });
    };

    const getRoleColor = (roleName?: string) => {
        if (!roleName) return "bg-gray-100 text-gray-800";
        switch (roleName.toLowerCase()) {
            case "admin": return "bg-red-100 text-red-800";
            case "manager": return "bg-blue-100 text-blue-800";
            case "user": return "bg-green-100 text-green-800";
            default: return "bg-purple-100 text-purple-800";
        }
    };

    return (
        <>
            <AdminNavbar currentUser={currentUser} />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="sm:flex sm:items-center sm:justify-between mt-10">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                                <p className="mt-2 text-sm text-gray-600">
                                    Manage user roles and permissions across the system
                                </p>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    {users.length} Total Users
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-6">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                                        Search Users
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="search"
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Search by name, email, or role..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-end">
                                    <div className="text-sm text-gray-500">
                                        {filteredUsers.length} of {users.length} users shown
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Users Table */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Menu Access
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                            <span className="text-sm font-medium text-gray-700">
                                                                {user.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {user.email}
                                                        </div>
                                                        <div className="text-xs text-gray-400">
                                                            ID: {user.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role?.name)}`}>
                                                    {user.role?.name || "No Role"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {user.menus?.length ? (
                                                        <div>
                                                            <span className="text-sm font-medium">
                                                                {user.menus.length} menu{user.menus.length !== 1 ? 's' : ''}
                                                            </span>
                                                            <div className="text-xs text-gray-500 mt-1">
                                                                {user.menus.slice(0, 2).map(m => m.name || m.menu).join(', ')}
                                                                {user.menus.length > 2 && ` +${user.menus.length - 2} more`}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-gray-500">No menu access</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => openRoleModal(user)}
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                                                    >
                                                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                        Role
                                                    </button>
                                                    <button
                                                        onClick={() => openMenuModal(user)}
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
                                                    >
                                                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                                        </svg>
                                                        Menus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredUsers.length === 0 && (
                            <div className="text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m2.2-2h11.6" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {searchTerm ? 'Try adjusting your search criteria.' : 'No users available at the moment.'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Role Change Modal */}
                    {roleModalUser && (
                        <div className="fixed inset-0 z-50 overflow-y-auto">
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeRoleModal}></div>

                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                                    Change Role
                                                </h3>
                                                <div className="mb-4">
                                                    <div className="bg-gray-50 rounded-lg p-3">
                                                        <p className="text-sm text-gray-600">User:</p>
                                                        <p className="text-lg font-medium text-gray-900">{roleModalUser.name}</p>
                                                        <p className="text-sm text-gray-500">{roleModalUser.email}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Select New Role
                                                    </label>
                                                    <select
                                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                                        value={data.role_id ?? ""}
                                                        onChange={(e) => setData("role_id", Number(e.target.value))}
                                                    >
                                                        <option value="">Select a role...</option>
                                                        {roles.map((role) => (
                                                            <option key={role.id} value={role.id}>
                                                                {role.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            onClick={saveRole}
                                            disabled={processing || !data.role_id}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {processing ? (
                                                <div className="flex items-center">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Saving...
                                                </div>
                                            ) : (
                                                'Save Changes'
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={closeRoleModal}
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Menu Management Modal */}
                    {selectedUser && (
                        <div className="fixed inset-0 z-50 overflow-y-auto">
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeMenuModal}></div>

                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                                </svg>
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                                    Manage Menu Access
                                                </h3>

                                                <div className="mb-6">
                                                    <div className="bg-gray-50 rounded-lg p-3">
                                                        <p className="text-sm text-gray-600">User:</p>
                                                        <p className="text-lg font-medium text-gray-900">{selectedUser.name}</p>
                                                        <p className="text-sm text-gray-500">{selectedUser.email}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium text-gray-700 mb-3">
                                                        Select accessible menus ({selectedMenus.length} selected):
                                                    </p>
                                                    <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md">
                                                        <div className="divide-y divide-gray-200">
                                                            {menus.map((menu) => (
                                                                <label key={menu.id} className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                                        checked={selectedMenus.includes(menu.id)}
                                                                        onChange={() => toggleMenu(menu.id)}
                                                                    />
                                                                    <div className="ml-3">
                                                                        <span className="text-sm font-medium text-gray-900">
                                                                            {menu.name ?? menu.menu ?? "Unnamed menu"}
                                                                        </span>
                                                                    </div>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            onClick={saveMenus}
                                            disabled={isSavingMenus}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSavingMenus ? (
                                                <div className="flex items-center">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Saving...
                                                </div>
                                            ) : (
                                                'Save Changes'
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={closeMenuModal}
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
