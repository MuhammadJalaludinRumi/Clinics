export default function Approved({ reservasi, message, queueNumber }) {
  return (
    <div className="max-w-md mx-auto mt-12 bg-green-50 p-6 rounded-lg shadow text-center">
      <h1 className="text-2xl font-bold text-green-700 mb-4">✅ {message}</h1>
      <p className="text-lg">
        Nomor Registrasi: <strong>{reservasi.registration_no}</strong>
      </p>
      <p className="mt-2">Atas nama: {reservasi.name}</p>

      {/* Tambahan nomor antrian */}
      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <p className="text-xl font-bold text-gray-700">
          Nomor Antrian Anda:
        </p>
        <p className="text-4xl font-extrabold text-green-600">{queueNumber}</p>
      </div>
    </div>
  );
}
