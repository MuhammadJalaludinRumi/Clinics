import {
    Plus,
    CheckCircle,
    FileText,
    Search,
    Calendar,
    Users,
    Zap,
    ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

interface QuickAction {
    title: string;
    description: string;
    icon: any;
    color: keyof typeof colorClasses;
    badge?: string | null;
    action: string;
    onClick?: () => void;
}

const colorClasses = {
    green: {
        bg: "bg-green-50 hover:bg-green-100",
        icon: "bg-green-500",
        text: "text-green-600",
        badge: "bg-green-100 text-green-700"
    },
    blue: {
        bg: "bg-blue-50 hover:bg-blue-100",
        icon: "bg-blue-500",
        text: "text-blue-600",
        badge: "bg-blue-100 text-blue-700"
    },
    purple: {
        bg: "bg-purple-50 hover:bg-purple-100",
        icon: "bg-purple-500",
        text: "text-purple-600",
        badge: "bg-purple-100 text-purple-700"
    },
    orange: {
        bg: "bg-orange-50 hover:bg-orange-100",
        icon: "bg-orange-500",
        text: "text-orange-600",
        badge: "bg-orange-100 text-orange-700"
    },
    indigo: {
        bg: "bg-indigo-50 hover:bg-indigo-100",
        icon: "bg-indigo-500",
        text: "text-indigo-600",
        badge: "bg-indigo-100 text-indigo-700"
    },
    red: {
        bg: "bg-red-50 hover:bg-red-100",
        icon: "bg-red-500",
        text: "text-red-600",
        badge: "bg-red-100 text-red-700"
    },
    default: {
        bg: "bg-gray-50 hover:bg-gray-100",
        icon: "bg-gray-500",
        text: "text-gray-600",
        badge: "bg-gray-100 text-gray-700"
    }
};

export default function QuickActionsSection() {
    const quickActions: QuickAction[] = [
        {
            title: "Approve Reservasi",
            description: "Setujui reservasi yang menunggu",
            icon: CheckCircle,
            color: "green",
            badge: "12 Pending",
            action: "approve",
            onClick: () => alert("Go to Approve Reservasi")
        },
        {
            title: "Tambah Pasien Baru",
            description: "Daftarkan pasien walk-in",
            icon: Plus,
            color: "blue",
            action: "add-patient",
            onClick: () => alert("Tambah Pasien Baru")
        },
        {
            title: "Cari Pasien",
            description: "Cari data pasien & riwayat",
            icon: Search,
            color: "purple",
            action: "search",
            onClick: () => alert("Cari Pasien")
        },
        {
            title: "Jadwal Dokter",
            description: "Atur jadwal praktek",
            icon: Calendar,
            color: "orange",
            action: "schedule",
            onClick: () => alert("Jadwal Dokter")
        },
        {
            title: "Laporan Harian",
            description: "Generate laporan hari ini",
            icon: FileText,
            color: "indigo",
            badge: "Ready",
            action: "report",
            onClick: () => alert("Laporan Harian")
        },
        {
            title: "Manajemen User",
            description: "Kelola akses staff",
            icon: Users,
            color: "red",
            action: "users",
            onClick: () => alert("Manajemen User")
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
                            <p className="text-sm text-gray-500">Aksi cepat untuk tugas harian</p>
                        </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                        <span>Lihat Semua</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => {
                        const colors = colorClasses[action.color] ?? colorClasses.default;
                        const IconComponent = action.icon;

                        return (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={action.onClick}
                                className={`${colors.bg} rounded-lg p-4 text-left transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-sm group`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`${colors.icon} p-2 rounded-lg`}>
                                        <IconComponent className="w-5 h-5 text-white" />
                                    </div>
                                    {action.badge && (
                                        <span className={`${colors.badge} px-2 py-1 rounded-full text-xs font-medium`}>
                                            {action.badge}
                                        </span>
                                    )}
                                </div>

                                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-800">
                                    {action.title}
                                </h3>
                                <p className="text-sm text-gray-600 group-hover:text-gray-700">
                                    {action.description}
                                </p>

                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                                    <span className={`text-sm font-medium ${colors.text}`}>
                                        Klik untuk akses
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Shortcut Keys Helper */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>💡 Tips: Gunakan keyboard shortcuts untuk akses lebih cepat</span>
                        <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1">
                                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl</kbd>
                                <span>+</span>
                                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">A</kbd>
                                <span>Approve</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl</kbd>
                                <span>+</span>
                                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">S</kbd>
                                <span>Search</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
