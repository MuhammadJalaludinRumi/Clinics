<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('racikans', function (Blueprint $table) {
            $table->string('no_rm')->nullable()->after('id');
            $table->string('nama')->nullable()->after('no_rm');
        });
    }

    public function down()
    {
        Schema::table('racikans', function (Blueprint $table) {
            $table->dropColumn(['no_rm', 'nama']);
        });
    }
};
