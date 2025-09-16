import { Link } from "@inertiajs/react";

interface CPPT {
  id: number;
  no_rm: string;
  tanggal_jam: string;
  ppa: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  verified: string;
  integrasi: string;
}

interface Props {
  cppt: CPPT;
}

export default function Show({ cppt }: Props) {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Detail CPPT</h1>

      <div className="space-y-2">
        <p><b>No RM:</b> {cppt.no_rm}</p>
        <p><b>Tanggal:</b> {cppt.tanggal_jam}</p>
        <p><b>PPA:</b> {cppt.ppa}</p>
        <p><b>Subjective:</b> {cppt.subjective}</p>
        <p><b>Objective:</b> {cppt.objective}</p>
        <p><b>Assessment:</b> {cppt.assessment}</p>
        <p><b>Plan:</b> {cppt.plan}</p>
        <p><b>Verified:</b> {cppt.verified}</p>
        <p><b>Integrasi:</b> {cppt.integrasi}</p>
      </div>

      <Link
        href={route("admin.cppt.index")}
        className="mt-4 inline-block bg-gray-600 text-white px-4 py-2 rounded"
      >
        Kembali
      </Link>
    </div>
  );
}
