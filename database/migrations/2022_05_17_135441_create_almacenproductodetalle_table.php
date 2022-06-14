<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlmacenproductodetalleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('almacenproductodetalle', function (Blueprint $table) {
            $table->increments('idalmacenproductodetalle');
            
            $table->integer('fkidproducto')->unsigned();
            $table->integer('fkidalmacen')->unsigned();

            $table->integer('stockactual')->default(0);
            $table->integer('stockminimo')->default(0);
            $table->integer('stockmaximo')->default(0);
            
            $table->integer('ingresos')->default(0);
            $table->integer('salidas')->default(0);
            $table->integer('traspasos')->default(0);
            $table->integer('ventas')->default(0);
            $table->integer('devolucionventas')->default(0);
            $table->integer('compras')->default(0);
            $table->integer('devolucioncompras')->default(0);

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
        Schema::dropIfExists('almacenproductodetalle');
    }
}
