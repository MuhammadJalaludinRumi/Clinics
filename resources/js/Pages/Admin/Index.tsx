import AdminNavbar from "./Component/AdminNavbar";


import React from 'react';
import { Activity, Settings } from 'lucide-react';
export default function AdminDashboard() {

    return (
        <>
            <AdminNavbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center px-4">
                <div className="text-center max-w-4xl">
                    {/* Title */}
                    <div className="mb-16">
                        <h1 className="text-5xl font-bold text-slate-800 mb-3 tracking-tight">
                            IMUR'S Clinic
                        </h1>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </div>

                    {/* Menu Cards */}
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        {/* Rekam Medis Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group border border-slate-200 min-w-52">
                            <div className="flex flex-col items-center">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg mb-5 group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 shadow-md">
                                    <Activity className="w-6 h-6 text-white" strokeWidth={2} />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800 leading-relaxed">
                                    Rekam Medis dan Pelayanan
                                </h3>
                                <p className="text-slate-500 text-xs mt-2 font-medium">
                                    Kelola data pasien dan layanan medis
                                </p>
                            </div>
                        </div>

                        {/* Manajemen Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group border border-slate-200 min-w-64">
                            <div className="flex flex-col items-center">
                                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 rounded-xl mb-6 group-hover:from-emerald-600 group-hover:to-emerald-700 transition-all duration-300 shadow-lg">
                                    <Settings className="w-7 h-7 text-white" strokeWidth={2} />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-800 leading-relaxed">
                                    Manajemen
                                </h3>
                                <p className="text-slate-500 text-sm mt-2 font-medium">
                                    Administrasi dan pengaturan sistem
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
