<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateActividadeconomicaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('actividadeconomica', function (Blueprint $table) {
            $table->increments('idactividadeconomica');

            $table->integer('x_idusuario')->unsigned()->nullable();

            $table->string('codigo', 150)->nullable();
            $table->text('descripcion');
            $table->string('abreviatura', 50)->nullable();

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
        Schema::dropIfExists('actividadeconomica');
    }
}
