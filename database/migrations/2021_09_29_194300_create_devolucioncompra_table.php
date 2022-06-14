<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDevolucioncompraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('devolucioncompra', function (Blueprint $table) {
            $table->increments('iddevolucioncompra');
            
            $table->integer('fkidnotacompra')->unsigned()->nullable();
            $table->integer('fkidsucursal')->unsigned();
            $table->integer('fkidalmacen')->unsigned();
            $table->integer('fkidconceptocompra')->unsigned();
            $table->integer('fkidproveedor')->unsigned();
            $table->integer('fkidmoneda')->unsigned();
            $table->integer('fkidtipotransaccion')->unsigned();

            $table->string('codigo', 150)->nullable();
            $table->text('nrofactura')->nullable();

            $table->decimal('tipocambio', 24, 8)->default(0);
            $table->enum('tipocompra', ['L', 'E'])->default('L');
            $table->enum('tipomoneda', [ 'N', 'E' ])->default('N');

            $table->date('fechadevolucioncompra');

            $table->integer('cantidadtotal')->default(0);
            $table->decimal('montosubtotal', 24, 8)->default(0);
            $table->decimal('descuento', 24, 8)->default(0);
            $table->decimal('montodescuento', 24, 8)->default(0);
            $table->decimal('montototal', 24, 8)->default(0);

            $table->text('nota')->nullable();

            $table->enum('isnotacompra', ['A', 'N'])->default('N');
            $table->enum('isordencompra', ['A', 'N'])->default('N');
            $table->enum('issolicitudcompra', ['A', 'N'])->default('N');

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
        Schema::dropIfExists('devolucioncompra');
    }
}
