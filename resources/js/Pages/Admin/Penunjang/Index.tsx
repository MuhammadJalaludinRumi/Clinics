import React from "react";
import { Link, usePage } from "@inertiajs/react";
import AdminNavbar from "../Component/AdminNavbar";

interface DaftarRegistrasi {
    id: number;
    no_rm: string;
    name: string;
}

interface HasilPenunjang {
    hasil: string;
    tanggal: string;
}

interface Order {
    id: number;
    jenis: "lab" | "radiologi" | "spirometri";
    nama_pemeriksaan: string;
    status: string;
    hasil?: HasilPenunjang | null;
    daftar_registrasi: DaftarRegistrasi;
}

interface Props {
    orders: Order[];
}

export default function Index({ orders }: Props) {
    const { props } = usePage<PageProps>();
    const currentUser = props.auth.user;

    // Statistics untuk dashboard cards
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.hasil).length;
    const pendingOrders = totalOrders - completedOrders;
    const completionRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;

    const getJenisBadgeColor = (jenis: string) => {
        switch (jenis) {
            case 'lab':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'radiologi':
                return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'spirometri':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const getJenisColor = (jenis: string) => {
        switch (jenis) {
            case 'lab':
                return 'text-blue-600';
            case 'radiologi':
                return 'text-purple-600';
            case 'spirometri':
                return 'text-emerald-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <>
            <AdminNavbar currentUser={currentUser} />

            <div className="min-h-screen bg-gray-50">
                {/* Header Section */}
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex items-center justify-between mt-10">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Order Penunjang</h1>
                                <p className="mt-2 text-base text-gray-600">
                                    Sistem manajemen pemeriksaan penunjang medis
                                </p>
                            </div>
                            <div className="flex items-center space-x-6">
                                <div className="text-right">
                                    <div className="text-sm font-medium text-gray-500">Total Orders</div>
                                    <div className="text-2xl font-bold text-gray-900">{totalOrders}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                                    <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
                                    <p className="text-3xl font-bold text-emerald-600">{completedOrders}</p>
                                </div>
                                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
                                    <p className="text-3xl font-bold text-amber-600">{pendingOrders}</p>
                                </div>
                                <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Completion Rate</p>
                                    <p className="text-3xl font-bold text-indigo-600">{completionRate}%</p>
                                </div>
                                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Medical Orders</h2>
                                <div className="flex items-center space-x-2">
                                    <div className="text-sm text-gray-500">
                                        Showing {orders.length} orders
                                    </div>
                                </div>
                            </div>
                        </div>

                        {orders.length === 0 ? (
                            <div className="px-6 py-16">
                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Medical Orders</h3>
                                    <p className="text-gray-500 max-w-sm mx-auto">
                                        Medical orders will appear here once they are created and assigned.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-100">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Patient Information
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Examination Details
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Results
                                            </th>
                                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-11 h-11 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                                                                <span className="text-sm font-semibold text-blue-700">
                                                                    {order.daftar_registrasi?.name?.charAt(0)?.toUpperCase() || 'P'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-semibold text-gray-900">
                                                                {order.daftar_registrasi?.name || 'Unknown Patient'}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                Medical Record: {order.daftar_registrasi?.no_rm || 'N/A'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className={`w-3 h-3 rounded-full mr-3 ${getJenisColor(order.jenis).replace('text-', 'bg-')}`}></div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {order.nama_pemeriksaan}
                                                            </div>
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getJenisBadgeColor(order.jenis)}`}>
                                                                {order.jenis.charAt(0).toUpperCase() + order.jenis.slice(1)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${order.hasil
                                                        ? "bg-emerald-100 text-emerald-800"
                                                        : "bg-amber-100 text-amber-800"
                                                        }`}>
                                                        <div className={`w-2 h-2 rounded-full mr-2 ${order.hasil ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                                        {order.hasil ? "Completed" : "Pending"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {order.hasil ? (
                                                        <div className="max-w-xs">
                                                            <div className="text-sm text-gray-900 font-medium truncate mb-1">
                                                                {order.hasil.hasil}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {new Date(order.hasil.tanggal).toLocaleDateString('id-ID', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-gray-400 italic">Results pending</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <Link
                                                            href={route("admin.cppt.index", order.daftar_registrasi?.id)}
                                                            className="inline-flex items-center px-3 py-2 border border-emerald-200 text-xs font-medium rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-150"
                                                        >
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            CPPT
                                                        </Link>

                                                        {order.hasil ? (
                                                            <Link
                                                                href={route("admin.hasil-penunjang.edit", order.hasil?.id)}
                                                                className="inline-flex items-center px-3 py-2 border border-blue-200 text-xs font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
                                                            >
                                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                                Edit Results
                                                            </Link>
                                                        ) : (
                                                            <Link
                                                                href={route("admin.hasil-penunjang.create", order.id)}
                                                                className="inline-flex items-center px-3 py-2 border border-blue-200 text-xs font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
                                                            >
                                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                                </svg>
                                                                Input Results
                                                            </Link>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
