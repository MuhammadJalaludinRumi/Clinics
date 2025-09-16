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
        // database/migrations/xxxx_create_hasil_penunjang_table.php
        Schema::create('hasil_penunjang', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->text('hasil')->nullable(); // fleksibel, bisa json
            $table->timestamp('tanggal')->useCurrent();

            $table->foreign('order_id')->references('id')->on('orders_penunjang')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_penunjang');
    }
};
