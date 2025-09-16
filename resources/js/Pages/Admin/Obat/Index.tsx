import { Link, useForm, usePage } from "@inertiajs/react";
import AdminNavbar from "../Component/AdminNavbar";
import axios from "axios";

interface Obat {
    id: number;
    nama: string;
    total_qty: number;
    current_harga: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedObats {
    data: Obat[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface Props {
    obats: PaginatedObats;
}

export default function Index({ obats }: Props) {
    const { props } = usePage<PageProps>();
    const currentUser = props.auth.user;
    const { delete: destroy } = useForm();
    const { data, setData, post, processing, errors } = useForm({
        file: null as File | null,
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("admin.obat.import"), {
            forceFormData: true,
        });
    };

    const PaginationComponent = ({ paginationData }: { paginationData: PaginatedObats }) => {
        if (paginationData.last_page <= 1) return null;

        return (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-sm p-6 mt-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Info */}
                    <div className="text-sm text-slate-600">
                        Menampilkan <span className="font-medium text-slate-800">{paginationData.from}</span> sampai{' '}
                        <span className="font-medium text-slate-800">{paginationData.to}</span> dari{' '}
                        <span className="font-medium text-slate-800">{paginationData.total}</span> obat
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center space-x-2">
                        {/* Previous Button */}
                        {paginationData.prev_page_url ? (
                            <Link
                                href={paginationData.prev_page_url}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                preserveState
                                preserveScroll
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Sebelumnya
                            </Link>
                        ) : (
                            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded-lg cursor-not-allowed">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Sebelumnya
                            </span>
                        )}

                        {/* Page Numbers */}
                        <div className="hidden sm:flex items-center space-x-1">
                            {paginationData.links
                                .filter(link => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
                                .map((link, index) => {
                                    if (link.label === '...') {
                                        return (
                                            <span key={index} className="px-3 py-2 text-sm text-slate-500">
                                                ...
                                            </span>
                                        );
                                    }

                                    return link.url ? (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                                link.active
                                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                                                    : 'text-slate-700 hover:bg-slate-100 focus:ring-2 focus:ring-blue-500'
                                            }`}
                                            preserveState
                                            preserveScroll
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <span
                                            key={index}
                                            className="px-3 py-2 text-sm font-medium text-slate-400 cursor-not-allowed"
                                        >
                                            {link.label}
                                        </span>
                                    );
                                })}
                        </div>

                        {/* Mobile Page Info */}
                        <div className="sm:hidden">
                            <span className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg">
                                {paginationData.current_page} dari {paginationData.last_page}
                            </span>
                        </div>

                        {/* Next Button */}
                        {paginationData.next_page_url ? (
                            <Link
                                href={paginationData.next_page_url}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                preserveState
                                preserveScroll
                            >
                                Selanjutnya
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        ) : (
                            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded-lg cursor-not-allowed">
                                Selanjutnya
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // Calculate stats from all data, not just current page
    const allObats = obats.data; // For current page display
    const totalObats = obats.total;
    const totalStok = allObats.reduce((sum, obat) => sum + obat.total_qty, 0);
    const stokRendah = allObats.filter(obat => obat.total_qty < 10).length;

    return (
        <>
            <AdminNavbar currentUser={currentUser} />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-10">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                                    Inventaris Obat
                                </h1>
                                <p className="mt-2 text-slate-600">
                                    Kelola data obat dan stok farmasi
                                </p>
                            </div>
                            <div className="flex items-center justify-between mb-6 gap-4">
                                {/* Form Import */}
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-2"
                                >
                                    <input
                                        type="file"
                                        onChange={(e) => setData("file", e.target.files?.[0] || null)}
                                        className="text-sm text-gray-600
                       file:mr-3 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-medium
                       file:bg-blue-50 file:text-blue-600
                       hover:file:bg-blue-100"
                                    />
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`px-4 py-2 rounded-lg font-medium text-white transition-all duration-200 shadow-md ${processing
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                                            }`}
                                    >
                                        {processing ? "Importing..." : "Import"}
                                    </button>
                                </form>

                                {/* Tambah Obat Baru */}
                                <Link
                                    href={route("admin.obat.create")}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    Tambah Obat Baru
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Total Obat</p>
                                    <p className="text-2xl font-bold text-slate-800">{totalObats}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-100 rounded-xl">
                                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Total Stok (Halaman ini)</p>
                                    <p className="text-2xl font-bold text-slate-800">
                                        {totalStok.toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-amber-100 rounded-xl">
                                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Stok Rendah (Halaman ini)</p>
                                    <p className="text-2xl font-bold text-slate-800">
                                        {stokRendah}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Table */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200">
                                        <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider">
                                            Nama Obat
                                        </th>
                                        <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider">
                                            Stok
                                        </th>
                                        <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider">
                                            Harga
                                        </th>
                                        <th className="text-center py-4 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {allObats.map((obat, index) => (
                                        <tr
                                            key={obat.id}
                                            className="hover:bg-blue-50/30 transition-colors duration-150"
                                        >
                                            <td className="py-4 px-6 text-slate-600 font-medium">
                                                #{obat.id.toString().padStart(3, '0')}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="font-semibold text-slate-800">
                                                    {obat.nama}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${obat.total_qty < 10
                                                        ? 'bg-red-100 text-red-700'
                                                        : obat.total_qty < 50
                                                            ? 'bg-amber-100 text-amber-700'
                                                            : 'bg-emerald-100 text-emerald-700'
                                                        }`}>
                                                        {obat.total_qty.toLocaleString('id-ID')} unit
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 font-semibold text-slate-800">
                                                {formatCurrency(obat.current_harga)}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-wrap items-center justify-center gap-2">
                                                    <Link
                                                        href={route("admin.obat.edit", obat.id)}
                                                        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors duration-150"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        Edit
                                                    </Link>

                                                    <Link
                                                        href={route("admin.obat.TambahStok", obat.id)}
                                                        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-150"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                        Stok
                                                    </Link>

                                                    <Link
                                                        href={route("admin.obat.TambahHarga", obat.id)}
                                                        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors duration-150"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                        </svg>
                                                        Harga
                                                    </Link>

                                                    <button
                                                        onClick={() =>
                                                            destroy(route("admin.obat.destroy", obat.id))
                                                        }
                                                        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-150"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {allObats.length === 0 && (
                            <div className="text-center py-12">
                                <div className="w-24 h-24 mx-auto mb-4 text-slate-300">
                                    <svg fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                                    Belum Ada Data Obat
                                </h3>
                                <p className="text-slate-600 mb-4">
                                    Mulai tambahkan obat untuk mengelola inventaris farmasi
                                </p>
                                <Link
                                    href={route("admin.obat.create")}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Tambah Obat Pertama
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Pagination Component */}
                    <PaginationComponent paginationData={obats} />
                </div>
            </div>
        </>
    );
}
