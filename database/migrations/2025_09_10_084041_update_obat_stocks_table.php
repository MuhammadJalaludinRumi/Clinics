<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('obat_hargas', function (Blueprint $table) {
            // Kalau mau pecahan (12 digit total, 2 digit di belakang koma)
            $table->decimal('harga_baru', 12, 2)->default(0)->change();
        });

        Schema::table('obat_stocks', function (Blueprint $table) {
            $table->integer('jumlah')->default(0)->change();
        });
    }

    public function down(): void
    {
        Schema::table('obat_hargas', function (Blueprint $table) {
            $table->decimal('harga_baru', 12, 2)->nullable()->change();
        });

        Schema::table('obat_stocks', function (Blueprint $table) {
            $table->integer('jumlah')->nullable()->change();
        });
    }
};
