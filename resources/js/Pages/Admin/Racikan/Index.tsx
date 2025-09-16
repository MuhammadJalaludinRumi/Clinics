interface Racikan {
  id: number;
  no_rm: string;
  nama: string;
  no: string;
  r_ke: string;
  kemasan: string;
  nama_obat: string;
  satuan: string;
  qty: number;
  aturan_pakai: string;
  keterangan: string;
  catatan: string;
  keterangan_racikan: string;
}

interface Props {
  racikans: Racikan[];
  no_rm: string;
}

export default function Index({ racikans, no_rm }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Daftar Obat Pasien - {no_rm}</h1>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Nama Obat</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Aturan Pakai</th>
            <th className="border p-2">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {racikans.map((r) => (
            <tr key={r.id}>
              <td className="border p-2">{r.nama_obat}</td>
              <td className="border p-2">{r.qty}</td>
              <td className="border p-2">{r.aturan_pakai}</td>
              <td className="border p-2">{r.keterangan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
