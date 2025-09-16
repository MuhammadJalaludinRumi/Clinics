export default function Success({ reservasi }: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
                <h1 className="text-2xl font-bold text-green-600 mb-4">Reservasi Berhasil!</h1>
                <p className="text-lg">Nomor Registrasi Anda:</p>
                <p className="text-3xl font-mono font-bold mt-2">{reservasi.registration_no}</p>
                <p className="mt-4">Harap tunjukkan nomor ini saat datang ke klinik.</p>
            </div>
        </div>
    );
}
