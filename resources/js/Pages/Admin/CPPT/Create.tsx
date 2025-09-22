import { useForm } from "@inertiajs/react";
import { Link, usePage } from "@inertiajs/react";
import AdminNavbar from "../Component/AdminNavbar";

interface DaftarRegistrasi {
    id: number;
    no_rm: string;
    name: string;
}

interface Props {
    daftarRegistrasi: DaftarRegistrasi;
}

export default function Create({ daftarRegistrasi }: Props) {
    const { props } = usePage<PageProps>();
    const currentUser = props.auth.user;
    const { data, setData, post, processing, errors } = useForm({
        no_rm: daftarRegistrasi.no_rm || "",
        ppa: "",
        subjective: "",
        objective: "",
        assessment: "",
        plan: "",
        verified: "",
        integrasi: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("admin.cppt.store"));
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toLocaleString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <AdminNavbar currentUser={currentUser} />

            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 mt-10">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    Tambah CPPT
                                </h1>
                                <p className="mt-2 text-sm text-gray-600">
                                    Catatan Perkembangan Pasien Terintegrasi
                                </p>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                                    <p className="text-sm font-medium text-blue-700">
                                        {getCurrentDateTime()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Patient Information */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                Informasi Pasien
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Pasien
                                    </label>
                                    <div className="bg-gray-50 px-4 py-3 rounded-lg border">
                                        <p className="font-medium text-gray-900">
                                            {daftarRegistrasi.name}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        No. Rekam Medis
                                    </label>
                                    <div className="bg-gray-50 px-4 py-3 rounded-lg border">
                                        <p className="font-mono font-medium text-gray-900">
                                            {daftarRegistrasi.no_rm}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Medical Professional Information */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                Informasi Tenaga Kesehatan
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="ppa" className="block text-sm font-medium text-gray-700 mb-2">
                                        PPA (Pemberi Pelayanan Asuhan) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="ppa"
                                        type="text"
                                        value={data.ppa}
                                        onChange={(e) => setData("ppa", e.target.value)}
                                        placeholder="Nama dan profesi tenaga kesehatan"
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.ppa ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.ppa && (
                                        <p className="mt-1 text-sm text-red-600">{errors.ppa}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="verified" className="block text-sm font-medium text-gray-700 mb-2">
                                        Diverifikasi Oleh
                                    </label>
                                    <input
                                        id="verified"
                                        type="text"
                                        value={data.verified}
                                        onChange={(e) => setData("verified", e.target.value)}
                                        placeholder="Nama verifikator"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* SOAP Format */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                                Format SOAP
                            </h2>
                            <div className="space-y-6">
                                {/* Subjective */}
                                <div>
                                    <label htmlFor="subjective" className="block text-sm font-medium text-gray-700 mb-2">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">S</span>
                                        Subjective (Keluhan Pasien)
                                    </label>
                                    <textarea
                                        id="subjective"
                                        value={data.subjective}
                                        onChange={(e) => setData("subjective", e.target.value)}
                                        rows={4}
                                        placeholder="Masukkan keluhan subjektif pasien..."
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${errors.subjective ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.subjective && (
                                        <p className="mt-1 text-sm text-red-600">{errors.subjective}</p>
                                    )}
                                </div>

                                {/* Objective */}
                                <div>
                                    <label htmlFor="objective" className="block text-sm font-medium text-gray-700 mb-2">
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold mr-2">O</span>
                                        Objective (Pemeriksaan Objektif)
                                    </label>
                                    <textarea
                                        id="objective"
                                        value={data.objective}
                                        onChange={(e) => setData("objective", e.target.value)}
                                        rows={4}
                                        placeholder="Masukkan hasil pemeriksaan objektif..."
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${errors.objective ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.objective && (
                                        <p className="mt-1 text-sm text-red-600">{errors.objective}</p>
                                    )}
                                </div>

                                {/* Assessment */}
                                <div>
                                    <label htmlFor="assessment" className="block text-sm font-medium text-gray-700 mb-2">
                                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold mr-2">A</span>
                                        Assessment (Diagnosa/Masalah)
                                    </label>
                                    <textarea
                                        id="assessment"
                                        value={data.assessment}
                                        onChange={(e) => setData("assessment", e.target.value)}
                                        rows={4}
                                        placeholder="Masukkan diagnosa atau assessment..."
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${errors.assessment ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.assessment && (
                                        <p className="mt-1 text-sm text-red-600">{errors.assessment}</p>
                                    )}
                                </div>

                                {/* Plan */}
                                <div>
                                    <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-2">
                                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-semibold mr-2">P</span>
                                        Plan (Rencana Tindakan)
                                    </label>
                                    <textarea
                                        id="plan"
                                        value={data.plan}
                                        onChange={(e) => setData("plan", e.target.value)}
                                        rows={4}
                                        placeholder="Masukkan rencana tindakan dan terapi..."
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${errors.plan ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.plan && (
                                        <p className="mt-1 text-sm text-red-600">{errors.plan}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Integration Notes */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                Catatan Integrasi
                            </h2>
                            <div>
                                <label htmlFor="integrasi" className="block text-sm font-medium text-gray-700 mb-2">
                                    Integrasi Pelayanan
                                </label>
                                <input
                                    id="integrasi"
                                    type="text"
                                    value={data.integrasi}
                                    onChange={(e) => setData("integrasi", e.target.value)}
                                    placeholder="Catatan integrasi antar pelayanan..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex flex-col sm:flex-row gap-4 justify-end">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`inline-flex items-center justify-center px-8 py-3 border border-transparent text-sm font-medium rounded-lg text-white transition-colors duration-200 ${processing
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                                        }`}
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Simpan CPPT
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
