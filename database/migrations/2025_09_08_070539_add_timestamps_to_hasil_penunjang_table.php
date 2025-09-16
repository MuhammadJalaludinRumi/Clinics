<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hasil_penunjang', function (Blueprint $table) {
            if (!Schema::hasColumn('hasil_penunjang', 'created_at') && !Schema::hasColumn('hasil_penunjang', 'updated_at')) {
                $table->timestamps(); // ✅ nambah created_at & updated_at
            }
        });
    }

    public function down(): void
    {
        Schema::table('hasil_penunjang', function (Blueprint $table) {
            $table->dropTimestamps(); // ✅ hapus created_at & updated_at kalau rollback
        });
    }
};
