import { useForm } from "@inertiajs/react";

export default function ApproveForm() {
  const { data, setData, post, errors } = useForm({ registration_no: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post("/success/approve");
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">Masukkan Nomor Registrasi</h1>
      <form onSubmit={submit}>
        <input
          type="text"
          value={data.registration_no}
          onChange={(e) => setData("registration_no", e.target.value)}
          placeholder="Contoh: PARU-20250825-001"
          className="w-full border rounded px-3 py-2 mb-2"
        />
        {errors.registration_no && (
          <p className="text-red-600 text-sm">{errors.registration_no}</p>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Approve
        </button>
      </form>
    </div>
  );
}
