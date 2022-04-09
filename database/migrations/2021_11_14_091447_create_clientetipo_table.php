<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientetipoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clientetipo', function (Blueprint $table) {
            $table->increments('idclientetipo');

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
        Schema::dropIfExists('clientetipo');
    }
}
