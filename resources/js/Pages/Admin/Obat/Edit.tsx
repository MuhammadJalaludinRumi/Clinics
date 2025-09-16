import { useForm, Link, usePage } from "@inertiajs/react";
import AdminNavbar from "../Component/AdminNavbar";
import { ArrowLeft, Save, X } from "lucide-react";

interface Obat {
    id: number;
    nama: string;
}

export default function Edit({ obat }: { obat: Obat }) {
    const { props } = usePage<PageProps>();
    const currentUser = props.auth.user;

    const { data, setData, put, processing, errors } = useForm({
        nama: obat.nama,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route("admin.obat.update", obat.id));
    }

    return (
        <>
            <AdminNavbar currentUser={currentUser} />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center mb-4">
                            <Link
                                href={route("admin.obat.index")}
                                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Kembali ke Daftar Obat
                            </Link>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Obat</h1>
                        <p className="text-gray-600">Perbarui informasi obat di bawah ini</p>
                    </div>

                    {/* Main Form Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
                            <h2 className="text-xl font-semibold text-white">Informasi Obat</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Nama Obat */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nama Obat
                                </label>
                                <input
                                    type="text"
                                    value={data.nama}
                                    onChange={(e) => setData("nama", e.target.value)}
                                    className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.nama
                                            ? "border-red-300 focus:border-red-500"
                                            : "border-gray-300 focus:border-blue-500"
                                    }`}
                                    placeholder="Masukkan nama obat"
                                />
                                {errors.nama && (
                                    <div className="mt-2 text-sm text-red-600 flex items-center">
                                        <X className="w-4 h-4 mr-1" />
                                        {errors.nama}
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-5 h-5 mr-2" />
                                    {processing ? "Menyimpan..." : "Update Obat"}
                                </button>

                                <Link
                                    href={route("admin.obat.index")}
                                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                                >
                                    <X className="w-5 h-5 mr-2" />
                                    Batal
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Info Card */}
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-blue-800">
                                    <strong>Tips:</strong> Pastikan semua informasi yang dimasukkan sudah benar sebelum menyimpan perubahan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
