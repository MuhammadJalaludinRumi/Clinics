import { useState } from "react";
import {
    Bell,
    Menu,
    Activity,
    Settings,
    LogOut,
} from "lucide-react";
import Sidebar from "./Sidebar";

interface User {
    name: string;
    role: string;
    avatar: string;
}

interface Notification {
    id: number;
    text: string;
    time: string;
}

export default function AdminNavbar() {
    const [currentUser] = useState<User>({
        name: "Dr. Sarah Wijaya",
        role: "Dokter Poli Paru",
        avatar:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [notifications] = useState<Notification[]>([
        { id: 1, text: "3 reservasi baru menunggu persetujuan", time: "5 menit lalu" },
        { id: 2, text: "Pasien Ahmad Fauzi telah check-in", time: "15 menit lalu" },
        { id: 3, text: "Sistem backup berhasil", time: "1 jam lalu" },
    ]);

    return (
        <>
            <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Left Side: Hamburger + Logo */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 text-gray-600 hover:text-gray-900"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <Activity className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Poli Paru Admin</h1>
                                    <p className="text-sm text-gray-500">Sistem Manajemen Klinik</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Notification, Profile */}
                        <div className="flex items-center space-x-4">
                            {/* Notifications */}
                            <div className="relative">
                                <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                        {notifications.length}
                                    </span>
                                </button>
                            </div>

                            {/* Profile */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex items-center p-1 rounded-full hover:ring-2 hover:ring-blue-500 transition"
                                >
                                    <img
                                        src={currentUser.avatar}
                                        alt={currentUser.name}
                                        className="w-9 h-9 rounded-full object-cover"
                                    />
                                </button>

                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                        <div className="px-4 py-3 border-b border-gray-200">
                                            <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                                            <p className="text-sm text-gray-500">{currentUser.role}</p>
                                        </div>
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                            <Settings className="w-4 h-4" />
                                            <span>Pengaturan</span>
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                                            <LogOut className="w-4 h-4" />
                                            <span>Keluar</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </>
    );
}
