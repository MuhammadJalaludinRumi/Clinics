<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('daftar_registrasi', function (Blueprint $table) {
            $table->id();
            $table->string('no_rm')->unique(); // generate baru kalau pasien pertama kali
            $table->string('nik');
            $table->string('name');
            $table->string('phone');
            $table->date('birth_date');
            $table->string('alamat');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daftar_registrasi');
    }
};
