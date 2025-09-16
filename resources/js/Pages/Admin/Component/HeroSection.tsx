import { Calendar, Clock, Users, TrendingUp } from "lucide-react";

// ==== Types ====
interface User {
    name: string;
    role: string;
    avatar: string;
}

interface HeroSectionProps {
    currentUser: User;
}

export default function HeroSection({ currentUser }: HeroSectionProps) {
    const currentTime = new Date().toLocaleString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-xl p-8 mb-8 text-white overflow-hidden relative pt-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-white rounded-full"></div>
                <div className="absolute top-16 -right-8 w-20 h-20 bg-white rounded-full"></div>
                <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white rounded-full"></div>
            </div>

            <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Main Content */}
                    <div className="flex-1 mb-6 lg:mb-0">
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-blue-100 text-sm font-medium">SISTEM AKTIF</span>
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                            Selamat Datang, {currentUser.name.split(" ")[0]}! 👋
                        </h1>

                        <p className="text-blue-100 text-lg mb-4">
                            {currentUser.role} - Poli Paru RS Sejahtera
                        </p>

                        <div className="flex items-center space-x-2 text-blue-100">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{currentTime}</span>
                        </div>
                    </div>

                    {/* Quick Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:ml-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center space-x-3">
                                <div className="bg-green-400 p-2 rounded-lg">
                                    <Calendar className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">8</p>
                                    <p className="text-blue-100 text-sm">Hari Ini</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center space-x-3">
                                <div className="bg-yellow-400 p-2 rounded-lg">
                                    <Clock className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">12</p>
                                    <p className="text-blue-100 text-sm">Menunggu</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center space-x-3">
                                <div className="bg-purple-400 p-2 rounded-lg">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">45</p>
                                    <p className="text-blue-100 text-sm">Total</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center space-x-3">
                                <div className="bg-red-400 p-2 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">+15%</p>
                                    <p className="text-blue-100 text-sm">Bulan Ini</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-white/20">
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-white/20">
                        📋 Lihat Jadwal Hari Ini
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-white/20">
                        ⚡ Approve Reservasi Cepat
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-white/20">
                        📊 Laporan Minggu Ini
                    </button>
                </div>
            </div>
        </div>
    );
}
