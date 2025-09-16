import { X } from "lucide-react";
import * as LucideIcons from "lucide-react"; // import semua icon
import { usePage } from "@inertiajs/react";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { auth } = usePage().props;
    const menus = auth?.user?.menus || [];

    if (!menus.length) return null; // ga ada menu buat user

    return (
        <div
            className={`fixed inset-0 z-40 transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-30"
                onClick={onClose}
            ></div>

            {/* Sidebar Content */}
            <div className="relative bg-white w-64 h-full shadow-lg p-4">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>

                <h2 className="text-lg font-bold text-gray-900 mb-6">Menu</h2>
                <div className="space-y-2">
                    {menus.map((menu: any, index: number) => {
                        const Icon = LucideIcons[menu.icon] || LucideIcons.Settings; // fallback icon
                        return (
                            <button
                                key={index}
                                className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                                onClick={() => window.location.href = menu.url} // bisa diganti Link Inertia
                            >
                                <Icon className="w-5 h-5" />
                                <span>{menu.title}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
