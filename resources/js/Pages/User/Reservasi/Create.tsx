import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { User, Home,Phone, Calendar, FileText, CheckCircle, AlertCircle, Stethoscope } from "lucide-react";

export default function Create() {
    const [isNew, setIsNew] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post, errors } = useForm({
        nik: "",
        name: "",
        phone: "",
        birth_date: "",
        alamat: "",
        complaint: "",
    });

    const verifyNik = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/reservasi/check-nik/${data.nik}`);
            const json = await res.json();
            if (json.exists) {
                setIsVerified(true);
            } else {
                alert("NIK tidak ditemukan, silakan daftar sebagai pasien baru.");
            }
        } catch (err) {
            console.error(err);
            alert("Terjadi kesalahan saat memverifikasi NIK.");
        } finally {
            setIsLoading(false);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post("/reservasi");
    };

    const resetForm = () => {
        setIsNew(null);
        setIsVerified(false);
        setData({
            nik: "",
            name: "",
            phone: "",
            birth_date: "",
            alamat: "",
            complaint: "",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-4 px-4 sm:py-8 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <Stethoscope className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Reservasi Poli Paru
                    </h1>
                    <p className="text-gray-600 max-w-md mx-auto">
                        Sistem reservasi online untuk memudahkan pendaftaran konsultasi poli paru
                    </p>
                </div>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    {/* Progress Indicator */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                        <div className="flex items-center justify-between text-white text-sm">
                            <div className={`flex items-center space-x-2 ${isNew === null ? 'opacity-100' : 'opacity-60'}`}>
                                <div className={`w-2 h-2 rounded-full ${isNew === null ? 'bg-white' : 'bg-blue-300'}`}></div>
                                <span>Pilih Jenis Pasien</span>
                            </div>
                            <div className={`flex items-center space-x-2 ${isNew !== null && (!isNew ? !isVerified : true) ? 'opacity-100' : 'opacity-60'}`}>
                                <div className={`w-2 h-2 rounded-full ${isNew !== null && (!isNew ? !isVerified : true) ? 'bg-white' : 'bg-blue-300'}`}></div>
                                <span>{isNew ? 'Data Pasien' : 'Verifikasi'}</span>
                            </div>
                            <div className={`flex items-center space-x-2 ${(isNew || isVerified) ? 'opacity-100' : 'opacity-60'}`}>
                                <div className={`w-2 h-2 rounded-full ${(isNew || isVerified) ? 'bg-white' : 'bg-blue-300'}`}></div>
                                <span>Konfirmasi</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-8">
                        {/* Step 1: Pilih Jenis Pasien */}
                        {isNew === null && (
                            <div className="text-center space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                        Pilih Jenis Pasien
                                    </h2>
                                    <p className="text-gray-600">
                                        Apakah Anda sudah pernah berobat di poli paru sebelumnya?
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                                    <button
                                        onClick={() => setIsNew(true)}
                                        className="group relative p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        <User className="w-8 h-8 mx-auto mb-3" />
                                        <h3 className="font-semibold text-lg mb-1">Pasien Baru</h3>
                                        <p className="text-blue-100 text-sm">
                                            Belum pernah berobat
                                        </p>
                                    </button>

                                    <button
                                        onClick={() => setIsNew(false)}
                                        className="group relative p-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        <CheckCircle className="w-8 h-8 mx-auto mb-3" />
                                        <h3 className="font-semibold text-lg mb-1">Pasien Lama</h3>
                                        <p className="text-green-100 text-sm">
                                            Sudah pernah berobat
                                        </p>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Form Section */}
                        {isNew !== null && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {isNew ? 'Data Pasien Baru' : 'Verifikasi Pasien Lama'}
                                    </h2>
                                    <button
                                        onClick={resetForm}
                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                    >
                                        Kembali
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {isNew ? (
                                        // Pasien Baru Form
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="sm:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        NIK (Nomor Induk Kependudukan)
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="Masukkan 16 digit NIK"
                                                            value={data.nik}
                                                            onChange={(e) => setData("nik", e.target.value)}
                                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                            maxLength={16}
                                                        />
                                                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                    </div>
                                                    {errors.nik && (
                                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                                            <AlertCircle className="w-4 h-4 mr-1" />
                                                            {errors.nik}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Nama Lengkap
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="Masukkan nama lengkap sesuai KTP"
                                                            value={data.name}
                                                            onChange={(e) => setData("name", e.target.value)}
                                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                        />
                                                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                    </div>
                                                    {errors.name && (
                                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                                            <AlertCircle className="w-4 h-4 mr-1" />
                                                            {errors.name}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Alamat
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="Masukkan alamat lengkap"
                                                            value={data.alamat}
                                                            onChange={(e) => setData("alamat", e.target.value)}
                                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                        />
                                                        <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                    </div>
                                                    {errors.alamat && (
                                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                                            <AlertCircle className="w-4 h-4 mr-1" />
                                                            {errors.alamat}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Nomor HP */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Nomor HP
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="tel"
                                                            placeholder="08xxxxxxxxxx"
                                                            value={data.phone}
                                                            onChange={(e) => setData("phone", e.target.value)}
                                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                        />
                                                        <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                    </div>
                                                    {errors.phone && (
                                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                                            <AlertCircle className="w-4 h-4 mr-1" />
                                                            {errors.phone}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Tanggal Lahir
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="date"
                                                            value={data.birth_date}
                                                            onChange={(e) => setData("birth_date", e.target.value)}
                                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                        />
                                                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                    </div>
                                                    {errors.birth_date && (
                                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                                            <AlertCircle className="w-4 h-4 mr-1" />
                                                            {errors.birth_date}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Keluhan Utama
                                                </label>
                                                <div className="relative">
                                                    <textarea
                                                        placeholder="Deskripsikan keluhan atau gejala yang Anda rasakan..."
                                                        value={data.complaint}
                                                        onChange={(e) => setData("complaint", e.target.value)}
                                                        rows={4}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                                    />
                                                    <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                </div>
                                                {errors.complaint && (
                                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                                        <AlertCircle className="w-4 h-4 mr-1" />
                                                        {errors.complaint}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        // Pasien Lama Form
                                        <div className="space-y-6">
                                            {!isVerified ? (
                                                <div className="text-center space-y-4">
                                                    <div className="bg-blue-50 rounded-lg p-6">
                                                        <CheckCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                            Verifikasi Data Pasien
                                                        </h3>
                                                        <p className="text-gray-600 mb-6">
                                                            Masukkan NIK untuk mencari data pasien yang sudah terdaftar
                                                        </p>

                                                        <div className="max-w-md mx-auto space-y-4">
                                                            <div className="relative">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Masukkan 16 digit NIK"
                                                                    value={data.nik}
                                                                    onChange={(e) => setData("nik", e.target.value)}
                                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                                    maxLength={16}
                                                                />
                                                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                            </div>

                                                            <button
                                                                type="button"
                                                                onClick={verifyNik}
                                                                disabled={isLoading || !data.nik}
                                                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                                                            >
                                                                {isLoading ? (
                                                                    <div className="flex items-center justify-center">
                                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                                        Memverifikasi...
                                                                    </div>
                                                                ) : (
                                                                    'Cek NIK'
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                                        <div className="flex items-center">
                                                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                                            <span className="text-green-800 font-medium">
                                                                NIK terverifikasi! Data pasien ditemukan.
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Keluhan Utama
                                                        </label>
                                                        <div className="relative">
                                                            <textarea
                                                                placeholder="Deskripsikan keluhan atau gejala yang Anda rasakan saat ini..."
                                                                value={data.complaint}
                                                                onChange={(e) => setData("complaint", e.target.value)}
                                                                rows={4}
                                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                                            />
                                                            <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                        </div>
                                                        {errors.complaint && (
                                                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                                {errors.complaint}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    {(isNew || isVerified) && (
                                        <div className="pt-6 border-t border-gray-200">
                                            <button
                                                type="submit"
                                                onClick={submit}
                                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
                                            >
                                                Konfirmasi Reservasi
                                            </button>
                                            <p className="text-center text-sm text-gray-500 mt-3">
                                                Dengan melanjutkan, Anda menyetujui syarat dan ketentuan yang berlaku
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>Sistem Reservasi Poli Paru - Rumah Sakit</p>
                    <p>Hubungi: (021) xxx-xxxx | Email: info@hospital.com</p>
                </div>
            </div>
        </div>
    );
}
