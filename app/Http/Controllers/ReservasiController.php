<?php

namespace App\Http\Controllers;

use App\Models\Reservasi;
use App\Models\DaftarRegistrasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReservasiController extends Controller
{
    // Form buat user
    public function create()
    {
        return Inertia::render('User/Reservasi/Create');
    }

    public function store(Request $request)
    {
        // Validasi berbeda untuk pasien baru dan lama
        if ($request->filled('name')) {
            // Pasien baru
            $request->validate([
                'nik'        => 'required|string|size:16',
                'name'       => 'required|string|max:255',
                'phone'      => 'required|string|max:20',
                'birth_date' => 'required|date',
                'complaint'  => 'required|string',
                'alamat'     => 'required|string|max:255',
            ]);
        } else {
            // Pasien lama
            $request->validate([
                'nik'        => 'required|string|size:16',
                'complaint'  => 'required|string',
            ]);

            // Ambil data pasien lama
            $existingPatient = DaftarRegistrasi::where('nik', $request->nik)->first();

            if (!$existingPatient) {
                return back()->withErrors(['nik' => 'NIK tidak ditemukan dalam database pasien.']);
            }

            // Set data dari pasien lama
            $request->merge([
                'name'       => $existingPatient->name,
                'phone'      => $existingPatient->phone,
                'birth_date' => $existingPatient->birth_date,
                'alamat'     => $existingPatient->alamat,
            ]);
        }

        // Generate nomor registrasi
        $today = now()->format('Ymd');
        $countToday = Reservasi::whereDate('created_at', now()->toDateString())->count() + 1;
        $regNo = "PARU-{$today}-" . str_pad($countToday, 3, '0', STR_PAD_LEFT);

        // Simpan reservasi
        $reservasi = Reservasi::create([
            'registration_no' => $regNo,
            'nik'             => $request->nik,
            'name'            => $request->name,
            'phone'           => $request->phone,
            'birth_date'      => date('Y-m-d', strtotime($request->birth_date)),
            'complaint'       => $request->complaint,
            'status'          => 'pending',
            'alamat'          => $request->alamat,
        ]);

        return Inertia::render('User/Reservasi/Success', [
            'reservasi' => $reservasi,
        ]);
    }

    // Admin lihat semua reservasi
    public function index()
    {
        $reservasi = Reservasi::latest()->get();
        return Inertia::render('Admin/Reservasi/Index', [
            'reservasi' => $reservasi,
        ]);
    }

    // Detail reservasi
    public function show($id)
    {
        $reservasi = Reservasi::findOrFail($id);
        return Inertia::render('Admin/Reservasi/Show', [
            'reservasi' => $reservasi,
        ]);
    }

    // Form approve - untuk PC di klinik
    public function approveForm()
    {
        return Inertia::render('Success/ApproveForm');
    }

    // Proses approve by registration_no - dijalankan dari PC klinik
    public function approveByCode(Request $request)
    {
        $request->validate([
            'registration_no' => 'required|string',
        ]);

        $reservasi = Reservasi::where('registration_no', $request->registration_no)->first();

        if (!$reservasi) {
            return back()->withErrors(['registration_no' => 'Nomor registrasi tidak ditemukan']);
        }

        // Jika sudah pernah approved
        if ($reservasi->status === 'approved') {
            return back()->withErrors(['registration_no' => 'Nomor registrasi ini sudah pernah digunakan']);
        }

        // Cek apakah pasien sudah pernah terdaftar
        $existingPatient = DaftarRegistrasi::where('nik', $reservasi->nik)->first();

        if ($existingPatient) {
            // PASIEN LAMA
            $reservasi->update(['status' => 'approved']);

            $queueNumber = DaftarRegistrasi::whereDate('created_at', now()->toDateString())->count() + 1;

            return Inertia::render('Success/Approved', [
                'reservasi'   => $reservasi,
                'message'     => 'Selamat datang kembali! Reservasi berhasil disetujui.',
                'queueNumber' => str_pad($queueNumber, 2, '0', STR_PAD_LEFT),
                'no_rm'       => $existingPatient->no_rm,
                'patient_type' => 'lama',
                'alamat'      => $existingPatient->alamat,
            ]);
        } else {
            // PASIEN BARU
            do {
                $noRm = 'RM' . mt_rand(100000, 999999);
            } while (DaftarRegistrasi::where('no_rm', $noRm)->exists());

            $registrasi = DaftarRegistrasi::create([
                'no_rm'      => $noRm,
                'nik'        => $reservasi->nik,
                'name'       => $reservasi->name,
                'phone'      => $reservasi->phone,
                'birth_date' => date('Y-m-d', strtotime($reservasi->birth_date)),
                'alamat'     => $reservasi->alamat,
            ]);

            $reservasi->update(['status' => 'approved']);

            $queueNumber = DaftarRegistrasi::whereDate('created_at', now()->toDateString())->count();

            return Inertia::render('Success/Approved', [
                'reservasi'   => $reservasi,
                'message'     => 'Selamat datang! Reservasi berhasil disetujui, nomor rekam medis baru telah dibuat.',
                'queueNumber' => str_pad($queueNumber, 2, '0', STR_PAD_LEFT),
                'no_rm'       => $noRm,
                'patient_type' => 'baru',
                'alamat'      => $registrasi->alamat,
            ]);
        }
    }

    // Cek NIK apakah sudah ada di daftar_registrasi (untuk pasien lama)
    public function checkNik($nik)
    {
        $exists = DaftarRegistrasi::where('nik', $nik)->exists();
        return response()->json(['exists' => $exists]);
    }

    // Hapus reservasi
    public function destroy($id)
    {
        $reservasi = Reservasi::findOrFail($id);
        $reservasi->delete();
        return back();
    }

    // Method tambahan untuk mendapatkan data pasien berdasarkan NIK
    public function getPatientData($nik)
    {
        $patient = DaftarRegistrasi::where('nik', $nik)->first();

        if ($patient) {
            return response()->json([
                'exists' => true,
                'data' => [
                    'name' => $patient->name,
                    'phone' => $patient->phone,
                    'birth_date' => date('Y-m-d', strtotime($patient->birth_date)),
                    'no_rm' => $patient->no_rm,
                    'alamat' => $patient->alamat,
                ]
            ]);
        }

        return response()->json(['exists' => false]);
    }
}
