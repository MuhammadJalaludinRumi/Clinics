import React from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import AdminNavbar from "../Component/AdminNavbar";


import {
    CurrencyDollarIcon,
    ClockIcon,
    ArrowTrendingUpIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";

interface Harga {
    id: number;
    harga_baru: number;
    created_at: string;
}

interface Props {
    obat: {
        id: number;
        nama: string;
        hargas: Harga[];
    };
}

export default function UpdateHarga({ obat }: Props) {
    const { props } = usePage<PageProps>();
    const currentUser = props.auth.user;
    const { data, setData, post, processing, errors, reset } = useForm({
        harga_baru: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.harga_baru || parseFloat(data.harga_baru) < 0) return;

        post(route("admin.obat.updateHarga", obat.id), {
            onSuccess: () => {
                reset();
            }
        });
    };

    const rupiah = (n: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(n);

    // Hitung perubahan harga
    const getHargaChange = () => {
        if (obat.hargas.length < 2) return null;
        const latest = obat.hargas[obat.hargas.length - 1];
        const previous = obat.hargas[obat.hargas.length - 2];
        const change = latest.harga_baru - previous.harga_baru;
        const changePercent = ((change / previous.harga_baru) * 100).toFixed(1);
        return { change, changePercent };
    };

    const hargaChange = getHargaChange();
    const currentPrice = obat.hargas.length > 0 ? obat.hargas[obat.hargas.length - 1].harga_baru : 0;

    return (
        <>
            <AdminNavbar currentUser={currentUser} />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 mt-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        Manajemen Harga
                                    </h1>
                                    <p className="text-lg text-gray-600 font-medium">
                                        {obat.nama}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Harga Saat Ini</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {rupiah(currentPrice)}
                                </p>
                                {hargaChange && (
                                    <div className={`flex items-center justify-end mt-1 ${hargaChange.change >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        <ArrowTrendingUpIcon
                                            className={`h-4 w-4 mr-1 ${hargaChange.change < 0 ? "rotate-180" : ""}`}
                                        />

                                        <span className="text-xs font-medium">
                                            {hargaChange.change >= 0 ? '+' : ''}{rupiah(hargaChange.change)}
                                            ({hargaChange.change >= 0 ? '+' : ''}{hargaChange.changePercent}%)
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Form Update Harga */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center space-x-2 mb-4">
                                    <PencilSquareIcon className="h-5 w-5 text-green-600" />
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Update Harga
                                    </h2>
                                </div>

                                <form onSubmit={submit} className="space-y-4">
                                    <div>
                                        <label htmlFor="harga_baru" className="block text-sm font-medium text-gray-700 mb-2">
                                            Harga Baru (Rp)
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">Rp</span>
                                            </div>
                                            <input
                                                id="harga_baru"
                                                type="number"
                                                min={0}
                                                step="100"
                                                value={data.harga_baru}
                                                onChange={(e) => setData("harga_baru", e.target.value)}
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                                placeholder="0"
                                            />
                                        </div>
                                        {errors.harga_baru && (
                                            <p className="mt-1 text-sm text-red-600">{errors.harga_baru}</p>
                                        )}

                                        {/* Preview harga yang akan diset */}
                                        {data.harga_baru && parseFloat(data.harga_baru) > 0 && (
                                            <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                                                <p className="text-xs text-green-600">Preview:</p>
                                                <p className="text-sm font-medium text-green-700">
                                                    {rupiah(parseFloat(data.harga_baru))}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing || !data.harga_baru || parseFloat(data.harga_baru) < 0}
                                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <div className="flex items-center">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Memproses...
                                            </div>
                                        ) : (
                                            <>
                                                <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                                                Update Harga
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Riwayat Harga */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-2">
                                        <ClockIcon className="h-5 w-5 text-gray-600" />
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Riwayat Harga
                                        </h2>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {obat.hargas.length} perubahan harga
                                    </p>
                                </div>

                                <div className="overflow-hidden">
                                    {obat.hargas.length === 0 ? (
                                        <div className="p-6 text-center">
                                            <CurrencyDollarIcon className="mx-auto h-12 w-12 text-gray-400" />
                                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                                Belum ada riwayat harga
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Set harga pertama untuk memulai.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Tanggal
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Harga
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Perubahan
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {obat.hargas
                                                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                                                        .map((harga, index) => {
                                                            const sortedHargas = [...obat.hargas].sort((a, b) =>
                                                                new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                                                            );
                                                            const currentIndex = sortedHargas.findIndex(h => h.id === harga.id);
                                                            const previousHarga = currentIndex > 0 ? sortedHargas[currentIndex - 1] : null;
                                                            const change = previousHarga ? harga.harga_baru - previousHarga.harga_baru : null;

                                                            return (
                                                                <tr key={harga.id} className={index === 0 ? "bg-green-50" : "hover:bg-gray-50"}>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                        <div className="flex items-center">
                                                                            {index === 0 && (
                                                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                                                                                    Terbaru
                                                                                </span>
                                                                            )}
                                                                            {new Date(harga.created_at).toLocaleDateString("id-ID", {
                                                                                day: '2-digit',
                                                                                month: 'short',
                                                                                year: 'numeric'
                                                                            })}
                                                                        </div>
                                                                        <div className="text-xs text-gray-500">
                                                                            {new Date(harga.created_at).toLocaleTimeString("id-ID", {
                                                                                hour: '2-digit',
                                                                                minute: '2-digit'
                                                                            })}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <span className="text-sm font-medium text-gray-900">
                                                                            {rupiah(harga.harga_baru)}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                        {change !== null ? (
                                                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${change > 0
                                                                                ? 'bg-green-100 text-green-800'
                                                                                : change < 0
                                                                                    ? 'bg-red-100 text-red-800'
                                                                                    : 'bg-gray-100 text-gray-800'
                                                                                }`}>
                                                                                {change > 0 && <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />}
                                                                                {change < 0 && <ArrowTrendingUpIcon className="h-3 w-3 mr-1 rotate-180" />}
                                                                                {change >= 0 ? '+' : ''}{rupiah(change)}
                                                                            </span>
                                                                        ) : (
                                                                            <span className="text-gray-400 text-xs">
                                                                                Harga awal
                                                                            </span>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
