<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('racikans', function (Blueprint $table) {
            $table->id();
            $table->string('no')->nullable(); // nomor urut
            $table->string('r_ke')->nullable();
            $table->string('kemasan')->nullable();
            $table->string('nama_obat');
            $table->string('satuan')->nullable();
            $table->string('qty')->nullable();
            $table->string('aturan_pakai')->nullable();
            $table->string('keterangan')->nullable();
            $table->string('catatan')->nullable();
            $table->text('keterangan_racikan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('racikans');
    }
};

