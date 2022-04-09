<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProveedorcargoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proveedorcargo', function (Blueprint $table) {
            $table->increments('idproveedorcargo');

            $table->string('codigo', 150)->nullable();
            $table->string('descripcion', 200);
            $table->string('abreviatura', 50)->nullable();

            $table->longText('imagen')->nullable();
            $table->string('extension', 200)->nullable();

            $table->date('fecha');
            $table->time('hora');
            $table->enum('estado', ['A', 'N'])->default('A');
            $table->enum('isdelete', ['A', 'N'])->default('A');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('proveedorcargo');
    }
}
