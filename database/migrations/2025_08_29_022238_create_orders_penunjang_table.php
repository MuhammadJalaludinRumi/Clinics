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
        // database/migrations/xxxx_create_orders_penunjang_table.php
        Schema::create('orders_penunjang', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('daftar_registrasi_id'); // pasien
            $table->enum('jenis', ['lab', 'radiologi', 'spirometri']);
            $table->string('nama_pemeriksaan');
            $table->enum('status', ['ordered', 'selesai'])->default('ordered');
            $table->timestamps();

            $table->foreign('daftar_registrasi_id')->references('id')->on('daftar_registrasi')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders_penunjang');
    }
};
