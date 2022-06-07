<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDevolucionnotaventaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('devolucionnotaventa', function (Blueprint $table) {
            $table->increments('iddevolucionnotaventa');
            $table->integer('x_idusuario')->unsigned()->nullable();

            $table->integer('fkidnotaventa')->unsigned();
            $table->integer('fkidlistaprecio')->unsigned();
            $table->integer('fkidsucursal')->unsigned();
            $table->integer('fkidalmacen')->unsigned();
            $table->integer('fkidconceptoventa')->unsigned();
            $table->integer('fkidmoneda')->unsigned()->nullable(); 
            $table->integer('fkidcliente')->unsigned();
            $table->integer('fkidvendedor')->unsigned();
            $table->integer("fkidtipotransaccion")->unsigned();
            $table->integer("fkidtipopago")->unsigned();
            $table->integer('fkidusers')->unsigned()->nullable();

            $table->string('codigo', 150)->nullable();
            $table->text('nrofactura')->nullable();
            $table->date('fechadevolucionnotaventa');
            $table->date('fechanotaventa');
            $table->text('tiponotaventa')->nullable();
            $table->enum('esnotadevolucion', ['S', 'N'])->default('N');

            $table->decimal('tipocambio', 24, 8)->default(0);
            $table->decimal('montosubtotal', 24, 8)->default(0);
            $table->integer('descuento')->default(0);
            $table->decimal('montodescuento', 24, 8)->default(0);
            $table->decimal('montototal', 24, 8)->default(0);
            $table->integer('cantidadtotal')->default(0);

            $table->text('razonsocial')->nullable();
            $table->text('nit')->nullable();
            $table->text('glosa')->nullable();

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
        Schema::dropIfExists('devolucionnotaventa');
    }
}
