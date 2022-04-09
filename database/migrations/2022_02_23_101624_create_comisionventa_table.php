<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateComisionventaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comisionventa', function (Blueprint $table) {
            $table->increments('idcomisionventa');

            $table->integer('x_idusuario')->unsigned()->nullable();

            $table->string('codigo', 150)->nullable();
            $table->string('descripcion', 250);
            $table->integer('valor')->default(0);

            $table->date('fecha');
            $table->time('hora');
            $table->enum('estado', ['A', 'N'])->default('A');
            $table->enum('isdelete', ['A', 'N'])->default('A');

            $table->longText('imagen')->nullable();
            $table->string('extension', 200)->nullable();

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
        Schema::dropIfExists('comisionventa');
    }
}
