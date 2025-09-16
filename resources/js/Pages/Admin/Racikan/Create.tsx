import { useForm, usePage } from "@inertiajs/react";
import AdminNavbar from "../Component/AdminNavbar";
import {
    UserIcon,
    DocumentTextIcon,
    BeakerIcon,
    InformationCircleIcon,
    CheckCircleIcon,
    XMarkIcon,
    ClipboardDocumentListIcon,
    CalendarDaysIcon
} from "@heroicons/react/24/outline";

interface ObatOption {
    id: number;
    nama: string;
}

interface DaftarRegistrasi {
    no_rm: string;
    name: string;
}

interface Props {
    daftarRegistrasi: DaftarRegistrasi;
    obatList: ObatOption[];
}

export default function Create({ daftarRegistrasi, obatList = [] }: Props) {
    const { props } = usePage();
    const currentUser = props.auth.user;

    const { data, setData, post, processing, errors } = useForm({
        no_rm: daftarRegistrasi.no_rm,
        nama: daftarRegistrasi.name,
        no: "",
        r_ke: "",
        kemasan: "",
        obat_id: "",
        satuan: "",
        qty: 1,
        aturan_pakai: "",
        keterangan: "",
        catatan: "",
        keterangan_racikan: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("admin.racikans.store"));
    };

    const kemasanOptions = [
        "Tablet", "Kapsul", "Sirup", "Suspensi", "Injeksi",
        "Salep", "Krim", "Tetes", "Inhaler", "Patch"
    ];

    const satuanOptions = [
        "mg", "ml", "gram", "unit", "IU", "tablet", "kapsul", "sendok"
    ];

    const aturanPakaiTemplates = [
        "1 x sehari 1 tablet",
        "2 x sehari 1 tablet",
        "3 x sehari 1 tablet",
        "1 x sehari 1 sendok teh",
        "2 x sehari 1 sendok teh",
        "3 x sehari 1 sendok teh",
        "Bila perlu (prn)",
        "Sebelum tidur"
    ];

    return (
        <>
            <AdminNavbar currentUser={currentUser} />

            <div className="min-h-screen bg-gray-50">
                <div className="pt-16 pb-8">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Header Section */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <ClipboardDocumentListIcon className="h-8 w-8 text-blue-600" />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900">Formulir Resep Obat</h1>
                                            <p className="text-sm text-gray-600 mt-1">Sistem Informasi Apotek</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <CalendarDaysIcon className="h-5 w-5 mr-2" />
                                        {new Date().toLocaleDateString('id-ID', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Patient Information */}
                            <div className="px-6 py-4 bg-gray-50">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <UserIcon className="h-6 w-6 text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-500">Informasi Pasien</p>
                                        <p className="text-lg font-semibold text-gray-900">{daftarRegistrasi.name}</p>
                                        <p className="text-sm text-gray-600">No. RM: {daftarRegistrasi.no_rm}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Prescription Details */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <DocumentTextIcon className="h-5 w-5 text-gray-600" />
                                        <h2 className="text-lg font-semibold text-gray-900">Detail Resep</h2>
                                    </div>
                                </div>
                                <div className="px-6 py-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nomor Resep <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.no}
                                                onChange={(e) => setData("no", e.target.value)}
                                                className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.no ? "border-red-300 text-red-900" : "border-gray-300"
                                                    }`}
                                                placeholder="Contoh: R001/2024"
                                            />
                                            {errors.no && (
                                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                                    <XMarkIcon className="h-4 w-4 mr-1" />
                                                    {errors.no}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                R ke-
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={data.r_ke}
                                                onChange={(e) => setData("r_ke", e.target.value)}
                                                className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.r_ke ? "border-red-300 text-red-900" : "border-gray-300"
                                                    }`}
                                                placeholder="1"
                                            />
                                            {errors.r_ke && (
                                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                                    <XMarkIcon className="h-4 w-4 mr-1" />
                                                    {errors.r_ke}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Medicine Information */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <BeakerIcon className="h-5 w-5 text-gray-600" />
                                        <h2 className="text-lg font-semibold text-gray-900">Informasi Obat</h2>
                                    </div>
                                </div>
                                <div className="px-6 py-6 space-y-6">

                                    {/* Medicine Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pilih Obat <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.obat_id}
                                            onChange={(e) => setData("obat_id", e.target.value)}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.obat_id ? "border-red-300 text-red-900" : "border-gray-300"
                                                }`}
                                        >
                                            <option value="">-- Pilih Obat --</option>
                                            {obatList.map((obat) => (
                                                <option key={obat.id} value={obat.id}>
                                                    {obat?.nama}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.obat_id && (
                                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                                <XMarkIcon className="h-4 w-4 mr-1" />
                                                {errors.obat_id}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Kemasan
                                            </label>
                                            <select
                                                value={data.kemasan}
                                                onChange={(e) => setData("kemasan", e.target.value)}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            >
                                                <option value="">Pilih Kemasan</option>
                                                {kemasanOptions.map((kemasan) => (
                                                    <option key={kemasan} value={kemasan}>
                                                        {kemasan}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Satuan
                                            </label>
                                            <select
                                                value={data.satuan}
                                                onChange={(e) => setData("satuan", e.target.value)}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            >
                                                <option value="">Pilih Satuan</option>
                                                {satuanOptions.map((satuan) => (
                                                    <option key={satuan} value={satuan}>
                                                        {satuan}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Jumlah
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={data.qty}
                                                onChange={(e) => setData("qty", Number(e.target.value))}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Usage Instructions */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Aturan Pakai
                                        </label>
                                        <input
                                            type="text"
                                            value={data.aturan_pakai}
                                            onChange={(e) => setData("aturan_pakai", e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Contoh: 3x sehari 1 tablet sesudah makan"
                                        />
                                        <div className="mt-3">
                                            <p className="text-xs text-gray-500 mb-2">Template umum:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {aturanPakaiTemplates.map((template) => (
                                                    <button
                                                        key={template}
                                                        type="button"
                                                        onClick={() => setData("aturan_pakai", template)}
                                                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    >
                                                        {template}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <InformationCircleIcon className="h-5 w-5 text-gray-600" />
                                        <h2 className="text-lg font-semibold text-gray-900">Informasi Tambahan</h2>
                                    </div>
                                </div>
                                <div className="px-6 py-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Keterangan
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={data.keterangan}
                                                onChange={(e) => setData("keterangan", e.target.value)}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                                                placeholder="Keterangan umum..."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Catatan Khusus
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={data.catatan}
                                                onChange={(e) => setData("catatan", e.target.value)}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                                                placeholder="Catatan untuk pasien..."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Keterangan Racikan
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={data.keterangan_racikan}
                                                onChange={(e) => setData("keterangan_racikan", e.target.value)}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                                                placeholder="Detail racikan..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4">
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <XMarkIcon className="h-4 w-4 mr-2" />
                                        Batal
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${processing
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700"
                                            }`}
                                    >
                                        {processing ? (
                                            <>
                                                <div className="animate-spin -ml-1 mr-3 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                                Menyimpan...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircleIcon className="h-4 w-4 mr-2" />
                                                Simpan Resep
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
