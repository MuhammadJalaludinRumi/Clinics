import { useForm, Link, usePage } from "@inertiajs/react";
import AdminNavbar from "../Component/AdminNavbar";

export default function Create() {
    const { props } = usePage<PageProps>();
    const currentUser = props.auth.user;
    const { data, setData, post, processing, errors } = useForm({
        nama: "",
        qty_awal: 0,
        harga_awal: 0,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route("admin.obat.store"));
    }

    const formatRupiah = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    };

    return (
        <>
            <AdminNavbar currentUser={currentUser} />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2 mt-10">
                            <Link
                                href={route("admin.obat.index")}
                                className="hover:text-blue-600 transition-colors"
                            >
                                Data Obat
                            </Link>
                            <span>/</span>
                            <span className="text-gray-900">Tambah Obat</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Tambah Obat Baru</h1>
                        <p className="text-gray-600 mt-2">Lengkapi form di bawah untuk menambahkan obat baru ke dalam sistem</p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-900">Informasi Obat</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Nama Obat Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Nama Obat
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nama}
                                    onChange={(e) => setData("nama", e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                        errors.nama
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    placeholder="Masukkan nama obat"
                                />
                                {errors.nama && (
                                    <div className="flex items-center space-x-1 text-red-600 text-sm">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <span>{errors.nama}</span>
                                    </div>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Qty Awal Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Kuantitas Awal
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.qty_awal}
                                            onChange={(e) => setData("qty_awal", Number(e.target.value))}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                                errors.qty_awal
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                            placeholder="0"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 text-sm">pcs</span>
                                        </div>
                                    </div>
                                    {errors.qty_awal && (
                                        <div className="flex items-center space-x-1 text-red-600 text-sm">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{errors.qty_awal}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Harga Awal Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Harga per Unit
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 text-sm">Rp</span>
                                        </div>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.harga_awal}
                                            onChange={(e) => setData("harga_awal", Number(e.target.value))}
                                            className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                                errors.harga_awal
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                            placeholder="0"
                                        />
                                    </div>
                                    {data.harga_awal > 0 && (
                                        <p className="text-sm text-gray-600">
                                            {formatRupiah(data.harga_awal)}
                                        </p>
                                    )}
                                    {errors.harga_awal && (
                                        <div className="flex items-center space-x-1 text-red-600 text-sm">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{errors.harga_awal}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Summary Card */}
                            {(data.qty_awal > 0 && data.harga_awal > 0) && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-blue-900 mb-2">Ringkasan</h3>
                                    <div className="text-sm text-blue-800 space-y-1">
                                        <p>Total nilai inventory: <span className="font-semibold">{formatRupiah(data.qty_awal * data.harga_awal)}</span></p>
                                        <p>Kuantitas: {data.qty_awal} unit × {formatRupiah(data.harga_awal)} per unit</p>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white transition-all duration-200 ${
                                        processing
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm hover:shadow-md'
                                    }`}
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Simpan Obat
                                        </>
                                    )}
                                </button>

                                <Link
                                    href={route("admin.obat.index")}
                                    className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Batal
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Help Text */}
                    <div className="mt-6 bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-1">Tips Pengisian Form</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Pastikan nama obat sesuai dengan kemasan asli</li>
                                    <li>• Kuantitas awal adalah jumlah stok yang akan dimasukkan ke sistem</li>
                                    <li>• Harga per unit adalah harga satuan obat</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
