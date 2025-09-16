<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('cppts', function (Blueprint $table) {
            $table->id();
            $table->string('no_rm'); // foreign key ke reservasi
            $table->dateTime('tanggal_jam'); // waktu pencatatan
            $table->string('ppa'); // profesi pemberi asuhan
            $table->text('subjective')->nullable(); // S
            $table->text('objective')->nullable(); // O
            $table->text('assessment')->nullable(); // A
            $table->text('plan')->nullable(); // P
            $table->boolean('verified')->default(false); // verifikasi DPJP
            $table->text('integrasi')->nullable(); // integrasi data
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('cppts');
    }
};
