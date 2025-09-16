<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('triages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('daftar_registrasi_id')->constrained('daftar_registrasi')->onDelete('cascade'); // ✅ relasi
            $table->integer('systolic');
            $table->integer('diastolic');
            $table->integer('heart_rate');
            $table->integer('resp_rate');
            $table->decimal('temperature', 4, 1);
            $table->integer('spo2');
            $table->string('level'); // Hijau, Kuning, Merah
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('triages');
    }
};
