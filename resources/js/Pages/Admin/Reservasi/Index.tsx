import { router, Link, usePage } from '@inertiajs/react';
import AdminNavbar from "../Component/AdminNavbar";
import { useState } from 'react';

interface Reservation {
    id: number;
    registration_no: string;
    name: string;
    visit_date: string;
    status: 'pending' | 'approved' | 'cancelled';
}

interface Props {
    reservasi: Reservation[];
}

export default function Index({ reservasi }: Props) {

    const { props } = usePage<PageProps>();
    const currentUser = props.auth.user;
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({});

    const approve = async (id: number) => {
        setLoading(prev => ({ ...prev, [id]: true }));
        try {
            router.put(`/admin/reservasi/${id}/approve`);
        } finally {
            setLoading(prev => ({ ...prev, [id]: false }));
        }
    };

    const remove = async (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus reservasi ini?')) {
            setLoading(prev => ({ ...prev, [id]: true }));
            try {
                router.delete(`/admin/reservasi/${id}`);
            } finally {
                setLoading(prev => ({ ...prev, [id]: false }));
            }
        }
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            approved: 'bg-green-100 text-green-800 border-green-200',
            cancelled: 'bg-red-100 text-red-800 border-red-200'
        };

        const statusLabels = {
            pending: 'Menunggu',
            approved: 'Disetujui',
            cancelled: 'Dibatalkan'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status as keyof typeof statusStyles] || statusStyles.pending}`}>
                {statusLabels[status as keyof typeof statusLabels] || status}
            </span>
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <AdminNavbar currentUser={currentUser} />

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Manajemen Reservasi</h1>
                                <p className="mt-2 text-sm text-gray-600">
                                    Kelola semua reservasi yang masuk dari pengunjung
                                </p>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                                        {reservasi.filter(r => r.status === 'pending').length} Menunggu
                                    </span>
                                    <span className="flex items-center">
                                        <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                                        {reservasi.filter(r => r.status === 'approved').length} Disetujui
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Container */}
                    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                        {/* Desktop Table View */}
                        <div className="hidden lg:block">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            No
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nomor Registrasi
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama Pengunjung
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {reservasi.map((r, i) => (
                                        <tr key={r.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {i + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                                                    {r.registration_no}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{r.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(r.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    {r.status === 'pending' && (
                                                        <button
                                                            onClick={() => approve(r.id)}
                                                            disabled={loading[r.id]}
                                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                                                        >
                                                            {loading[r.id] ? (
                                                                <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                            ) : (
                                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                            Setujui
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => remove(r.id)}
                                                        disabled={loading[r.id]}
                                                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                                                    >
                                                        {loading[r.id] ? (
                                                            <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        )}
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="lg:hidden">
                            <div className="divide-y divide-gray-200">
                                {reservasi.map((r, i) => (
                                    <div key={r.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-sm font-medium text-blue-800">{i + 1}</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900">{r.name}</h3>
                                                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                                                        {r.registration_no}
                                                    </span>
                                                </div>
                                            </div>
                                            {getStatusBadge(r.status)}
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                                            {r.status === 'pending' && (
                                                <button
                                                    onClick={() => approve(r.id)}
                                                    disabled={loading[r.id]}
                                                    className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                                                >
                                                    {loading[r.id] ? (
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                    Setujui Reservasi
                                                </button>
                                            )}
                                            <button
                                                onClick={() => remove(r.id)}
                                                disabled={loading[r.id]}
                                                className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                                            >
                                                {loading[r.id] ? (
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                )}
                                                Hapus Reservasi
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Empty State */}
                        {reservasi.length === 0 && (
                            <div className="text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada reservasi</h3>
                                <p className="mt-1 text-sm text-gray-500">Belum ada reservasi yang masuk saat ini.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
