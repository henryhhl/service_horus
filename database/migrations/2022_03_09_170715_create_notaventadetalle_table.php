<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotaventadetalleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notaventadetalle', function (Blueprint $table) {
            $table->increments('idnotaventadetalle');

            $table->integer('x_idusuario')->unsigned()->nullable();

            $table->integer('fkidnotaventa')->unsigned();
            $table->integer('fkidunidadmedidaproducto')->unsigned();
            $table->integer('fkidalmacenunidadmedidaproducto')->unsigned();
            $table->integer('fkidalmacen')->unsigned();
            $table->integer('fkidlistapreciodetalle')->unsigned();
            $table->integer('fkidvendedor')->unsigned();

            $table->integer('cantidad')->default(0);
            $table->integer('cantidadsolicitada')->default(0);
            $table->decimal('preciounitario', 24, 8)->default(0);
            $table->decimal('preciounitariosubtotal', 24, 8)->default(0);

            $table->integer('descuento')->default(0);
            $table->decimal('montodescuento', 24, 8)->default(0);

            $table->text('nota')->nullable();
            $table->string('estadoproceso')->default('F');
            $table->string('tipoentrega')->nullable();

            $table->enum('isdevolucionventa', ['A', 'N'])->default('N');

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
        Schema::dropIfExists('notaventadetalle');
    }
}