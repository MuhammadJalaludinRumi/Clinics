import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import AdminNavbar from "../Component/AdminNavbar";

interface HasilPenunjang {
    id: number;
    hasil: string;
    tanggal: string;
    order: {
        id: number;
        daftar_registrasi: {
            no_rm: string;
            name: string;
        };
    };
}

interface PageProps {
    auth: { user: any };
    hasil: HasilPenunjang;
}

export default function Edit() {
    const { props } = usePage<PageProps>();
    const { hasil, auth } = props;
    const currentUser = auth.user;

    const { data, setData, put, processing, errors } = useForm({
        hasil: hasil.hasil,
        tanggal: hasil.tanggal,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("admin.hasil-penunjang.update", hasil.id));
    };

    return (
        <>
            <AdminNavbar currentUser={currentUser} />

            <div className="p-6 max-w-xl mx-auto">
                <h1 className="text-xl font-bold mb-4">
                    Edit Hasil Penunjang - {hasil.order.daftar_registrasi.name} ({hasil.order.daftar_registrasi.no_rm})
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Hasil</label>
                        <textarea
                            value={data.hasil}
                            onChange={(e) => setData("hasil", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.hasil && <div className="text-red-600 text-sm">{errors.hasil}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Tanggal</label>
                        <input
                            type="date"
                            value={data.tanggal}
                            onChange={(e) => setData("tanggal", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.tanggal && <div className="text-red-600 text-sm">{errors.tanggal}</div>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Simpan Perubahan
                    </button>
                </form>
            </div>
        </>
    );
}
