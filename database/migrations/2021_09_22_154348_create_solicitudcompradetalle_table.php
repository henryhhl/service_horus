<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSolicitudcompradetalleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('solicitudcompradetalle', function (Blueprint $table) {
            $table->increments('idsolicitudcompradetalle');
            
            $table->integer('fkidsolicitudcompra')->unsigned();
            $table->integer('fkidunidadmedidaproducto')->unsigned();

            $table->integer('stockactual')->default(0);
            $table->integer('cantidadpendiente')->default(0);
            $table->integer('cantidadsolicitada')->default(0);

            $table->decimal('costounitario', 24, 8)->default(0);
            $table->decimal('costosubtotal', 24, 8)->default(0);

            $table->text('nota')->nullable();
            $table->enum('isordencompra', ['A', 'N'])->default('N');
            $table->date('fechasolicitada')->nullable();
            $table->date('fechafinalizada')->nullable();

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
        Schema::dropIfExists('solicitudcompradetalle');
    }
}
