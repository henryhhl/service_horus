<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSolicitudcompraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('solicitudcompra', function (Blueprint $table) {
            $table->increments('idsolicitudcompra');
            
            $table->integer('fkidsucursal')->unsigned();
            $table->integer('fkidalmacen')->unsigned();
            $table->integer('fkidconceptocompra')->unsigned();
            $table->integer('fkidseccioninventario')->unsigned();
            $table->integer('fkidproveedor')->unsigned();
            $table->integer('fkidmoneda')->unsigned();

            $table->string('codigo', 150)->nullable();
            $table->decimal('tipocambio', 24, 8)->default(0);
            $table->date('fechasolicitada');
            $table->date('fechafinalizada')->nullable();

            $table->integer('cantidadpendientetotal')->default(0);
            $table->integer('cantidadsolicitadatotal')->default(0);
            $table->decimal('montototal', 24, 8)->default(0);

            $table->text('nota')->nullable();
            $table->enum('tiposolicitud', ['L', 'E'])->default('L');
            $table->enum('isordencompra', ['A', 'N'])->default('N');

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
        Schema::dropIfExists('solicitudcompra');
    }
}
