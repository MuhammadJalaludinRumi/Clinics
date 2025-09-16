import { useState } from "react";
import AdminNavbar from "../Component/AdminNavbar";
import { Link, usePage } from "@inertiajs/react";

interface CPPT {
    id: number;
    no_rm: string;
    tanggal_jam: string;
    ppa: string;
    subjective?: string;
    objective?: string;
    assessment?: string;
    plan?: string;
    verified?: string;
    integrasi?: string;
}

interface Props {
    cppts: CPPT[];
}

export default function Index({ cppts }: Props) {
    const { props } = usePage<PageProps>();
    const currentUser = props.auth.user;
    const [selectedCPPT, setSelectedCPPT] = useState<CPPT | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    // Calculate pagination
    const totalPages = Math.ceil(cppts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = cppts.slice(startIndex, endIndex);

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };
    const formatDateTime = (dateTimeStr: string) => {
        try {
            const date = new Date(dateTimeStr);
            return {
                date: date.toLocaleDateString('id-ID', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),
                time: date.toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };
        } catch {
            return {
                date: dateTimeStr.split(' ')[0] || dateTimeStr,
                time: dateTimeStr.split(' ')[1] || ''
            };
        }
    };

    const getRecentBadge = (dateTimeStr: string) => {
        try {
            const date = new Date(dateTimeStr);
            const now = new Date();
            const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

            if (diffHours < 24) {
                return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Hari ini</span>;
            } else if (diffHours < 48) {
                return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Kemarin</span>;
            }
        } catch {
            // Fallback for invalid dates
        }
        return null;
    };

    return (
        <>
            <AdminNavbar currentUser={currentUser} />
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 mt-10">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    Daftar CPPT
                                </h1>
                                <p className="mt-2 text-sm text-gray-600">
                                    Catatan Perkembangan Pasien Terintegrasi - Semua Pasien
                                </p>
                            </div>
                            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2">
                                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                                    <span className="text-sm font-medium text-blue-700">
                                        Total CPPT: {cppts.length}
                                    </span>
                                </div>
                                <div className="bg-green-50 px-4 py-2 rounded-lg">
                                    <span className="text-sm font-medium text-green-700">
                                        Halaman {currentPage} dari {totalPages}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Cards View (Hidden on larger screens) */}
                    <div className="block lg:hidden space-y-4 mb-6">
                        {currentItems.map((cppt) => {
                            const dateTime = formatDateTime(cppt.tanggal_jam);
                            return (
                                <div key={cppt.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold text-gray-900">
                                                        RM: {cppt.no_rm}
                                                    </h3>
                                                    {getRecentBadge(cppt.tanggal_jam)}
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    PPA: {cppt.ppa}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Tanggal:</span>
                                                    <p className="font-medium text-gray-900">{dateTime.date}</p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Waktu:</span>
                                                    <p className="font-medium text-gray-900">{dateTime.time}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedCPPT(cppt)}
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                            >
                                                <span className="inline-flex items-center"> ... </span>
                                            </button>
                                            <Link
                                                href={route("admin.racikans.create", cppt.no_rm)}
                                                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                            >
                                                <span className="inline-flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                                    </svg>
                                                    Obat
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop Table View (Hidden on mobile) */}
                    <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                No. RM
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8l-2-2m0 0l-2-2m2 2l-2-2m0 0V9a4 4 0 118 0v6.28l-2.2-2.2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Tanggal & Waktu
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                PPA
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentItems.map((cppt) => {
                                        const dateTime = formatDateTime(cppt.tanggal_jam);
                                        return (
                                            <tr key={cppt.id} className="hover:bg-gray-50 transition-colors duration-200">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="bg-blue-100 rounded-lg p-2 mr-3">
                                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {cppt.no_rm}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {dateTime.date}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {dateTime.time}
                                                            </div>
                                                        </div>
                                                        <div className="ml-3">
                                                            {getRecentBadge(cppt.tanggal_jam)}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="bg-green-100 rounded-lg p-2 mr-3">
                                                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                        </div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {cppt.ppa}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <button
                                                            onClick={() => setSelectedCPPT(cppt)}
                                                            className="inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                                        >
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                            Detail
                                                        </button>
                                                        <Link
                                                            href={route("admin.racikans.create", cppt.no_rm)}
                                                            className="inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                                                        >
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                                            </svg>
                                                            Obat
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {selectedCPPT && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white max-w-lg w-full rounded-lg shadow-lg p-6 relative">
                                <button
                                    onClick={() => setSelectedCPPT(null)}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>

                                <h2 className="text-xl font-bold mb-4">Detail CPPT</h2>
                                <div className="space-y-2 text-sm">
                                    <p><b>No RM:</b> {selectedCPPT.no_rm}</p>
                                    <p><b>Tanggal:</b> {selectedCPPT.tanggal_jam}</p>
                                    <p><b>PPA:</b> {selectedCPPT.ppa}</p>
                                    <p><b>Subjective:</b> {selectedCPPT.subjective}</p>
                                    <p><b>Objective:</b> {selectedCPPT.objective}</p>
                                    <p><b>Assessment:</b> {selectedCPPT.assessment}</p>
                                    <p><b>Plan:</b> {selectedCPPT.plan}</p>
                                    <p><b>Verified:</b> {selectedCPPT.verified}</p>
                                    <p><b>Integrasi:</b> {selectedCPPT.integrasi}</p>
                                </div>

                                <div className="mt-4 text-right">
                                    <button
                                        onClick={() => setSelectedCPPT(null)}
                                        className="bg-gray-600 text-white px-4 py-2 rounded"
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-sm text-gray-700">
                                    Menampilkan <span className="font-medium">{startIndex + 1}</span> sampai{' '}
                                    <span className="font-medium">{Math.min(endIndex, cppts.length)}</span> dari{' '}
                                    <span className="font-medium">{cppts.length}</span> hasil
                                </div>

                                <div className="flex items-center space-x-1">
                                    {/* Previous Button */}
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${currentPage === 1
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                            }`}
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Previous
                                    </button>

                                    {/* Page Numbers */}
                                    <div className="hidden sm:flex items-center space-x-1">
                                        {getPageNumbers().map((page, index) => (
                                            <div key={index}>
                                                {page === '...' ? (
                                                    <span className="px-3 py-2 text-sm text-gray-500">...</span>
                                                ) : (
                                                    <button
                                                        onClick={() => setCurrentPage(page as number)}
                                                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${currentPage === page
                                                            ? 'bg-blue-600 text-white'
                                                            : 'text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Mobile Page Info */}
                                    <div className="sm:hidden bg-gray-50 px-3 py-2 rounded-md">
                                        <span className="text-sm font-medium text-gray-700">
                                            {currentPage} / {totalPages}
                                        </span>
                                    </div>

                                    {/* Next Button */}
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${currentPage === totalPages
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                            }`}
                                    >
                                        Next
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {cppts.length === 0 && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Belum ada data CPPT
                            </h3>
                            <p className="text-gray-500">
                                Data CPPT akan muncul di sini setelah tenaga medis membuat catatan
                            </p>
                        </div>
                    )}

                    {/* Stats Cards */}
                    {cppts.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center">
                                    <div className="bg-blue-100 rounded-lg p-3">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{cppts.length}</h3>
                                        <p className="text-sm text-gray-600">Total CPPT</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center">
                                    <div className="bg-green-100 rounded-lg p-3">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {new Set(cppts.map(c => c.no_rm)).size}
                                        </h3>
                                        <p className="text-sm text-gray-600">Pasien Unik</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center">
                                    <div className="bg-purple-100 rounded-lg p-3">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {new Set(cppts.map(c => c.ppa)).size}
                                        </h3>
                                        <p className="text-sm text-gray-600">PPA Aktif</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center">
                                    <div className="bg-orange-100 rounded-lg p-3">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{totalPages}</h3>
                                        <p className="text-sm text-gray-600">Total Halaman</p>
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
