import React, { useState } from 'react';
import AdminNavbar from "../Component/AdminNavbar";
import { useForm, usePage, Link, router } from '@inertiajs/react';
import {
    Search,
    Package,
    Calendar,
    User,
    Filter,
    Eye,
    Edit,
    Trash2,
    Pill,
    FileText,
    Clock,
    Hash,
    Clipboard,
    Check,
    X,
    MapPin,
    Phone,
    Mail,
    Activity,
    AlertCircle,
} from 'lucide-react';

interface Obat {
    id: number;
    nama_obat: string;
}

interface Racikan {
    id: number;
    no_rm: string;
    nama: string;
    no: string;
    r_ke: string;
    kemasan: string;
    obat?: Obat;
    satuan: string;
    qty: number;
    aturan_pakai: string;
    keterangan: string;
    catatan: string;
    keterangan_racikan: string;
    created_at?: string;
    updated_at?: string;
}

interface Props {
    racikans: Racikan[];
}

interface StatCardProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    value: number;
    color: string;
}

interface RacikanCardProps {
    racikan: Racikan;
    onViewDetail: (racikan: Racikan) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

interface TableRowProps {
    racikan: Racikan;
    onViewDetail: (racikan: Racikan) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const ApotekIndex: React.FC<Props> = ({ racikans = [] }) => {
    const { props } = usePage<PageProps>();
    const currentUser = props.auth.user;
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterKemasan, setFilterKemasan] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const [selectedRacikan, setSelectedRacikan] = useState<Racikan | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter racikans berdasarkan search dan filter
    const filteredRacikans = racikans.filter(racikan => {
        const matchesSearch =
            racikan.no_rm?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            racikan.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            racikan.obat?.nama_obat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            racikan.no?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterKemasan === 'all' || racikan.kemasan?.toLowerCase() === filterKemasan.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    const handleViewDetail = (racikan: Racikan) => {
        setSelectedRacikan(racikan);
        setIsModalOpen(true);
    };

    const handleMarkAsPaid = () => {
        if (selectedRacikan) {
            router.post(route("admin.racikans.markPaid", selectedRacikan.id), {});
            console.log('Mark as paid:', selectedRacikan.id);
            setIsModalOpen(false);
        }
    };

    const handleEdit = (id: number): void => {
        console.log('Edit racikan:', id);
        // router.visit(`/admin/racikans/${id}/edit`);
    };

    const handleDelete = (id: number): void => {
        if (confirm('Apakah Anda yakin ingin menghapus racikan ini?')) {
            console.log('Delete racikan:', id);
            // router.delete(`/admin/racikans/${id}`);
        }
    };

    const handleGudang = (): void => {
        console.log('Navigate to gudang');
        // router.visit('/admin/obat');
    };

    const handleCreate = (): void => {
        console.log('Navigate to create');
        // router.visit('/admin/obat/create');
    };

    // Get unique kemasan for filter
    const uniqueKemasan = [...new Set(racikans.map(r => r.kemasan).filter(Boolean))];

    const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, color }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
                </div>
                <div className={`p-3 rounded-xl ${color}`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>
        </div>
    );

    const RacikanCard: React.FC<RacikanCardProps> = ({ racikan, onViewDetail, onEdit, onDelete }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Pill className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                                {racikan.obat?.nama || 'Nama obat tidak tersedia'}
                            </h3>
                            <p className="text-sm text-gray-500">No: {racikan.no}</p>
                        </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        {racikan.kemasan}
                    </span>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                        <Hash className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">No RM:</span>
                        <span className="font-medium text-gray-900">{racikan.no_rm}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Pasien:</span>
                        <span className="font-medium text-gray-900">{racikan.nama}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">R ke:</span>
                        <span className="font-medium text-gray-900">{racikan.r_ke}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <Clipboard className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Qty:</span>
                        <span className="font-medium text-gray-900">{racikan.qty} {racikan.satuan}</span>
                    </div>
                </div>

                {racikan.aturan_pakai && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex items-start space-x-2">
                            <Clock className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-green-800">Aturan Pakai</p>
                                <p className="text-sm text-green-700">{racikan.aturan_pakai}</p>
                            </div>
                        </div>
                    </div>
                )}

                {racikan.keterangan_racikan && (
                    <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <div className="flex items-start space-x-2">
                            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-amber-800">Keterangan Racikan</p>
                                <p className="text-sm text-amber-700">{racikan.keterangan_racikan}</p>
                            </div>
                        </div>
                    </div>
                )}

                {(racikan.keterangan || racikan.catatan) && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-start space-x-2">
                            <FileText className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-gray-800">Catatan</p>
                                <p className="text-sm text-gray-600">{racikan.keterangan || racikan.catatan}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-end space-x-2 mt-6 pt-4 border-t border-gray-100">
                    <button
                        onClick={() => onViewDetail(racikan)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Lihat detail"
                    >
                        <Eye className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onEdit(racikan.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit racikan"
                    >
                        <Edit className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onDelete(racikan.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus racikan"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    const TableRow: React.FC<TableRowProps> = ({ racikan, onViewDetail, onEdit, onDelete }) => (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
                {racikan.is_paid ? (
                    <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full border border-green-200 flex items-center space-x-1">
                        <Check className="h-3 w-3" />
                        <span>Lunas</span>
                    </span>
                ) : (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded-full border border-gray-200">
                        Belum
                    </span>
                )}
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Pill className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">
                            {racikan.obat?.nama || 'Nama obat tidak tersedia'}
                        </div>
                        <div className="text-sm text-gray-500">No: {racikan.no}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{racikan.no_rm}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{racikan.nama}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {racikan.obat?.current_harga
                    ? `Rp ${(racikan.qty * racikan.obat.current_harga).toLocaleString("id-ID")}`
                    : "-"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{racikan.qty} {racikan.satuan}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    {racikan.kemasan}
                </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{racikan.aturan_pakai}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                    <button
                        onClick={() => onViewDetail(racikan)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Lihat detail"
                    >
                        <Eye className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onEdit(racikan.id)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Edit racikan"
                    >
                        <Edit className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onDelete(racikan.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Hapus racikan"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </td>
        </tr >
    );

    // Statistics
    const totalRacikans = racikans.length;
    const totalQty = racikans.reduce((sum, r) => sum + Number(r.qty || 0), 0);
    const uniquePatients = new Set(racikans.map(r => r.nama).filter(Boolean)).size;
    const uniqueObat = new Set(racikans.map(r => r.obat?.nama).filter(Boolean)).size;

    return (
        <>
            <AdminNavbar currentUser={currentUser} />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-3 mb-2 mt-10">
                            <div className="p-2 bg-blue-600 rounded-xl">
                                <Package className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Manajemen Racikan Apotek</h1>
                                <p className="text-gray-600">Kelola data racikan obat dan resep pasien</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            icon={Package}
                            title="Total Racikan"
                            value={totalRacikans}
                            color="bg-blue-600"
                        />
                        <StatCard
                            icon={Pill}
                            title="Jenis Obat"
                            value={uniqueObat}
                            color="bg-green-600"
                        />
                        <StatCard
                            icon={User}
                            title="Total Pasien"
                            value={uniquePatients}
                            color="bg-purple-600"
                        />
                        <StatCard
                            icon={Clipboard}
                            title="Total Qty"
                            value={totalQty}
                            color="bg-orange-600"
                        />
                    </div>

                    {/* Controls */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
                                {/* Search */}
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari No RM, nama pasien, atau obat..."
                                        className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                {/* Filter */}
                                <div className="relative">
                                    <select
                                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={filterKemasan}
                                        onChange={(e) => setFilterKemasan(e.target.value)}
                                    >
                                        <option value="all">Semua Kemasan</option>
                                        {uniqueKemasan.map(kemasan => (
                                            <option key={kemasan} value={kemasan}>{kemasan}</option>
                                        ))}
                                    </select>
                                    <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                {/* View Toggle */}
                                <div className="flex bg-gray-100 rounded-lg p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                                    >
                                        <Package className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('table')}
                                        className={`p-2 rounded ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                                    >
                                        <FileText className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Gudang button */}
                                <button
                                    onClick={handleGudang}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                                >
                                    <Package className="h-4 w-4" />
                                    <span>Gudang Obat</span>
                                </button>

                                {/* Add Button */}
                                <button
                                    onClick={handleCreate}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                                >
                                    <span>Tambah Racikan</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    {filteredRacikans.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada data racikan</h3>
                            <p className="text-gray-500 mb-6">Belum ada racikan yang sesuai dengan pencarian Anda.</p>
                            <button
                                onClick={handleCreate}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Tambah Racikan Pertama
                            </button>
                        </div>
                    ) : viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredRacikans.map((racikan) => (
                                <RacikanCard
                                    key={racikan.id}
                                    racikan={racikan}
                                    onViewDetail={handleViewDetail}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Obat
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                No RM
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Pasien
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                R Ke
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Qty
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Kemasan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aturan Pakai
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredRacikans.map((racikan) => (
                                            <TableRow
                                                key={racikan.id}
                                                racikan={racikan}
                                                onViewDetail={handleViewDetail}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Enhanced Modal */}
                    {isModalOpen && selectedRacikan && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                                onClick={() => setIsModalOpen(false)}
                            ></div>
                            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                                {/* Header */}
                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 rounded-t-2xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                                                <Pill className="h-8 w-8 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-white">Detail Racikan</h2>
                                                <p className="text-blue-100">Informasi lengkap resep obat</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                                        >
                                            <X className="h-6 w-6 text-white" />
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-6">
                                    {/* Obat Info */}
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="p-2 bg-blue-600 rounded-lg">
                                                <Pill className="h-5 w-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-blue-900">Informasi Obat</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-blue-600 font-medium">Nama Obat</p>
                                                <p className="text-lg font-semibold text-blue-900">{selectedRacikan.obat?.nama || 'Tidak tersedia'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-blue-600 font-medium">Nomor</p>
                                                <p className="text-lg font-semibold text-blue-900">{selectedRacikan.no}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Patient Info */}
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="p-2 bg-green-600 rounded-lg">
                                                <User className="h-5 w-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-green-900">Informasi Pasien</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-green-600 font-medium">Nama Pasien</p>
                                                <p className="text-lg font-semibold text-green-900">{selectedRacikan.nama}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-green-600 font-medium">No. Rekam Medis</p>
                                                <p className="text-lg font-semibold text-green-900">{selectedRacikan.no_rm}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Prescription Details */}
                                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-5 border border-purple-100">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="p-2 bg-purple-600 rounded-lg">
                                                <Package className="h-5 w-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-purple-900">Detail Resep</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-purple-600 font-medium">R Ke</p>
                                                <p className="text-lg font-semibold text-purple-900">{selectedRacikan.r_ke}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-purple-600 font-medium">Kemasan</p>
                                                <span className="inline-block px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-medium">
                                                    {selectedRacikan.kemasan}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-purple-600 font-medium">Jumlah</p>
                                                <p className="text-lg font-semibold text-purple-900">{selectedRacikan.qty} {selectedRacikan.satuan}</p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-purple-600 font-medium">Total Harga</p>
                                                <p className="text-lg font-bold text-purple-900">
                                                    Rp {selectedRacikan.total_harga?.toLocaleString('id-ID') || 0}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Usage Instructions */}
                                    {selectedRacikan.aturan_pakai && (
                                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <div className="p-2 bg-orange-500 rounded-lg">
                                                    <Clock className="h-5 w-5 text-white" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-orange-900">Aturan Pakai</h3>
                                            </div>
                                            <div className="bg-orange-100 rounded-lg p-4">
                                                <p className="text-orange-800 font-medium">{selectedRacikan.aturan_pakai}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Additional Notes */}
                                    <div className="space-y-4">
                                        {selectedRacikan.keterangan_racikan && (
                                            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
                                                <div className="flex items-start space-x-3">
                                                    <div className="p-2 bg-yellow-500 rounded-lg mt-0.5">
                                                        <AlertCircle className="h-4 w-4 text-white" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-yellow-900 mb-1">Keterangan Racikan</h4>
                                                        <p className="text-yellow-800">{selectedRacikan.keterangan_racikan}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {(selectedRacikan.keterangan || selectedRacikan.catatan) && (
                                            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-200">
                                                <div className="flex items-start space-x-3">
                                                    <div className="p-2 bg-gray-500 rounded-lg mt-0.5">
                                                        <FileText className="h-4 w-4 text-white" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-900 mb-1">Catatan Tambahan</h4>
                                                        <p className="text-gray-700">{selectedRacikan.keterangan || selectedRacikan.catatan}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Timestamp */}
                                    {selectedRacikan.created_at && (
                                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                            <div className="flex items-center justify-between text-sm text-gray-600">
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>Dibuat: {new Date(selectedRacikan.created_at).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}</span>
                                                </div>
                                                {selectedRacikan.updated_at && selectedRacikan.updated_at !== selectedRacikan.created_at && (
                                                    <div className="flex items-center space-x-2">
                                                        <Clock className="h-4 w-4" />
                                                        <span>Diperbarui: {new Date(selectedRacikan.updated_at).toLocaleDateString('id-ID', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Footer Actions */}
                                <div className="bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => setIsModalOpen(false)}
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors"
                                            >
                                                Tutup
                                            </button>

                                            {selectedRacikan.is_paid ? (
                                                <span className="inline-flex items-center px-4 py-2.5 rounded-lg bg-green-100 text-green-800 font-medium">
                                                    <Check className="h-4 w-4 mr-2" />
                                                    Sudah Dibayar
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={handleMarkAsPaid}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center space-x-2"
                                                >
                                                    <Check className="h-4 w-4" />
                                                    <span>Tandai Sudah Dibayar</span>
                                                </button>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ApotekIndex;
