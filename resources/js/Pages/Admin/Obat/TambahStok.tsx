import React from "react";
import { useForm, router, usePage } from "@inertiajs/react";
import AdminNavbar from "../Component/AdminNavbar";


import {
    PlusIcon,
    PencilIcon,
    CalendarIcon,
    CubeIcon, // ganti PackageIcon dengan CubeIcon
} from "@heroicons/react/24/outline";

interface Stock {
    id: number;
    jumlah: number;
    created_at: string;
}

interface Props {
    obat: {
        id: number;
        nama: string;
        stocks: Stock[];
    };
}

export default function UpdateStok({ obat }: Props) {
    const { props } = usePage<PageProps>();
    const currentUser = props.auth.user;
    const { data, setData, post, processing, errors, reset } = useForm({
        jumlah: "",
    });

    // Hitung total stok
    const totalStok = obat.stocks.reduce((total, stock) => total + stock.jumlah, 0);

    // Submit tambah stok
    const submitTambah = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.jumlah || parseInt(data.jumlah) <= 0) return;

        post(route("admin.obat.tambahStok", obat.id), {
            onSuccess: () => reset(),
        });
    };

    // Edit stok lama
    const editStok = (stockId: number, currentJumlah: number) => {
        const newJumlah = prompt(
            `Edit Stok (saat ini: ${currentJumlah})\nMasukkan jumlah baru:`
        );

        if (!newJumlah) return;

        const parsedJumlah = parseInt(newJumlah, 10);
        if (isNaN(parsedJumlah) || parsedJumlah < 0) {
            alert("Masukkan angka valid (tidak boleh negatif)!");
            return;
        }

        if (
            confirm(
                `Ubah stok dari ${currentJumlah} menjadi ${parsedJumlah}?\n\nPerubahan ini akan mempengaruhi total stok.`
            )
        ) {
            router.put(
                route("admin.obat.editStok", [obat.id, stockId]),
                { jumlah: parsedJumlah },
                {
                    preserveScroll: true,
                    onError: (errors) => {
                        alert(
                            "Gagal mengupdate stok: " +
                            Object.values(errors).join(", ")
                        );
                    },
                }
            );
        }
    };

    return (
        <>
            <AdminNavbar currentUser={currentUser} />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 mt-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <CubeIcon className="h-8 w-8 text-blue-600" />
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        Manajemen Stok
                                    </h1>
                                    <p className="text-lg text-gray-600 font-medium">
                                        {obat.nama}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">
                                    Total Stok Tersedia
                                </p>
                                <p className="text-3xl font-bold text-green-600">
                                    {totalStok.toLocaleString("id-ID")}
                                </p>
                                <p className="text-xs text-gray-400">unit</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Form Tambah Stok */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center space-x-2 mb-4">
                                    <PlusIcon className="h-5 w-5 text-blue-600" />
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Tambah Stok Baru
                                    </h2>
                                </div>

                                <form onSubmit={submitTambah} className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="jumlah"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Jumlah Stok
                                        </label>
                                        <input
                                            id="jumlah"
                                            type="number"
                                            min={1}
                                            value={data.jumlah}
                                            onChange={(e) =>
                                                setData("jumlah", e.target.value)
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Masukkan jumlah stok"
                                        />
                                        {errors.jumlah && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.jumlah}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={
                                            processing ||
                                            !data.jumlah ||
                                            parseInt(data.jumlah) <= 0
                                        }
                                        className="w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        {processing ? (
                                            <div className="flex items-center">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Memproses...
                                            </div>
                                        ) : (
                                            <>
                                                <PlusIcon className="h-4 w-4 mr-2" />
                                                Tambah Stok
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Riwayat Stok */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-2">
                                        <CalendarIcon className="h-5 w-5 text-gray-600" />
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Riwayat Stok
                                        </h2>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {obat.stocks.length} entri riwayat stok
                                    </p>
                                </div>

                                {obat.stocks.length === 0 ? (
                                    <div className="p-6 text-center">
                                        <CubeIcon className="mx-auto h-12 w-12 text-gray-400" />
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                                            Belum ada riwayat stok
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Tambahkan stok pertama untuk memulai.
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
                                                        Jumlah
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Aksi
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {obat.stocks
                                                    .sort(
                                                        (a, b) =>
                                                            new Date(
                                                                b.created_at
                                                            ).getTime() -
                                                            new Date(
                                                                a.created_at
                                                            ).getTime()
                                                    )
                                                    .map((stock, index) => (
                                                        <tr
                                                            key={stock.id}
                                                            className={
                                                                index === 0
                                                                    ? "bg-blue-50"
                                                                    : "hover:bg-gray-50"
                                                            }
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                <div className="flex items-center">
                                                                    {index === 0 && (
                                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                                                                            Terbaru
                                                                        </span>
                                                                    )}
                                                                    {new Date(
                                                                        stock.created_at
                                                                    ).toLocaleDateString(
                                                                        "id-ID",
                                                                        {
                                                                            day: "2-digit",
                                                                            month: "short",
                                                                            year: "numeric",
                                                                        }
                                                                    )}
                                                                </div>
                                                                <div className="text-xs text-gray-500">
                                                                    {new Date(
                                                                        stock.created_at
                                                                    ).toLocaleTimeString(
                                                                        "id-ID",
                                                                        {
                                                                            hour: "2-digit",
                                                                            minute: "2-digit",
                                                                        }
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className="text-sm font-medium text-gray-900">
                                                                    {stock.jumlah.toLocaleString(
                                                                        "id-ID"
                                                                    )}
                                                                </span>
                                                                <span className="text-xs text-gray-500 ml-1">
                                                                    unit
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <button
                                                                    onClick={() =>
                                                                        editStok(
                                                                            stock.id,
                                                                            stock.jumlah
                                                                        )
                                                                    }
                                                                    className="inline-flex items-center px-3 py-1 rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                                                                >
                                                                    <PencilIcon className="h-4 w-4 mr-1" />
                                                                    Edit
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
