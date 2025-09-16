import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import AdminNavbar from "../Component/AdminNavbar";
interface DaftarRegistrasi {
    id: number;
    no_rm: string;
    nik: string;
    name: string;
    phone: string;
    birth_date: string;
    alamat: string;
}

interface Props {
    DaftarRegistrasi: DaftarRegistrasi[];
}

export default function Index({ DaftarRegistrasi }: Props) {
    const { props } = usePage<PageProps>();
    const currentUser = props.auth.user;

    const [search, setSearch] = useState("");

    const filtered = DaftarRegistrasi.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.no_rm.toLowerCase().includes(search.toLowerCase()) ||
        item.nik.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <AdminNavbar currentUser={currentUser} />
            <div className="p-6 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Daftar Registrasi Pasien</h1>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Cari nama / No RM / NIK..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-lg p-2 w-full mb-4"
                />

                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3 border">No</th>
                                <th className="p-3 border">No RM</th>
                                <th className="p-3 border">Nama</th>
                                <th className="p-3 border">NIK</th>
                                <th className="p-3 border">Telp</th>
                                <th className="p-3 border">Tanggal Lahir</th>
                                <th className="p-3 border">Alamat</th>
                                <th className="p-3 border">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length > 0 ? (
                                filtered.map((item, idx) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="p-3 border">{idx + 1}</td>
                                        <td className="p-3 border">{item.no_rm}</td>
                                        <td className="p-3 border">{item.name}</td>
                                        <td className="p-3 border">{item.nik}</td>
                                        <td className="p-3 border">{item.phone}</td>
                                        <td className="p-3 border">{item.birth_date}</td>
                                        <td className="p-3 border">{item.alamat}</td>
                                        <td className="p-3 border">
                                            <Link
                                                href={route("admin.triage.create", item.id)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Triage
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="text-center p-4 text-gray-500">
                                        Tidak ada data pasien
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
