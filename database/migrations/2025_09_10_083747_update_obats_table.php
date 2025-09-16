<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('obats', function (Blueprint $table) {
            $table->integer('qty_awal')->default(0)->change();
            $table->decimal('harga_awal', 12, 2)->default(0)->change();
        });
    }

    public function down(): void
    {
        Schema::table('obats', function (Blueprint $table) {
            $table->integer('qty_awal')->nullable()->change();
            $table->decimal('harga_awal', 12, 2)->nullable()->change();
        });
    }
};
