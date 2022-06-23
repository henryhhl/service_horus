<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlmacenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('almacen', function (Blueprint $table) {
            $table->increments('idalmacen');
            $table->integer('fkidsucursal')->unsigned();
            
            $table->string('codigo', 150)->nullable();
            $table->string('descripcion', 200);
            $table->string('direccion', 250)->nullable();
            $table->string('abreviatura', 50)->nullable();
            
            $table->longText('imagen')->nullable();
            $table->string('extension', 20)->nullable();

            $table->integer('cantidadtotalingresorealizada')->default(0);
            $table->integer('cantidadingresorealizada')->default(0);
            $table->integer('cantidadingresocancelado')->default(0);

            $table->integer('cantidadtotalproductoingresorealizada')->default(0);
            $table->integer('cantidadproductoingresorealizada')->default(0);
            $table->integer('cantidadproductoingresocancelado')->default(0);

            $table->integer('cantidadtotalsalidarealizada')->default(0);
            $table->integer('cantidadsalidarealizada')->default(0);
            $table->integer('cantidadsalidacancelado')->default(0);

            $table->integer('cantidadtotalproductosalidarealizada')->default(0);
            $table->integer('cantidadproductosalidarealizada')->default(0);
            $table->integer('cantidadproductosalidacancelado')->default(0);
            
            $table->integer('cantidadtotaltraspasorealizada')->default(0);
            $table->integer('cantidadtraspasorealizada')->default(0);
            $table->integer('cantidadtraspasocancelado')->default(0);

            $table->integer('cantidadtotalproductotraspasorealizada')->default(0);
            $table->integer('cantidadproductotraspasorealizada')->default(0);
            $table->integer('cantidadproductotraspasocancelado')->default(0);

            $table->integer('cantidadtotalventarealizada')->default(0);
            $table->integer('cantidadventarealizada')->default(0);
            $table->integer('cantidadventacancelado')->default(0);

            $table->integer('cantidadtotalproductoventarealizada')->default(0);
            $table->integer('cantidadproductoventarealizada')->default(0);
            $table->integer('cantidadproductoventacancelado')->default(0);

            $table->integer('cantidadtotaldevolucionventarealizada')->default(0);
            $table->integer('cantidaddevolucionventarealizada')->default(0);
            $table->integer('cantidaddevolucionventacancelado')->default(0);

            $table->integer('cantidadtotalproductodevolucionventarealizada')->default(0);
            $table->integer('cantidadproductodevolucionventarealizada')->default(0);
            $table->integer('cantidadproductodevolucionventacancelado')->default(0);

            $table->integer('cantidadtotalcomprarealizada')->default(0);
            $table->integer('cantidadcomprarealizada')->default(0);
            $table->integer('cantidadcompracancelado')->default(0);

            $table->integer('cantidadtotalproductocomprarealizada')->default(0);
            $table->integer('cantidadproductocomprarealizada')->default(0);
            $table->integer('cantidadproductocompracancelado')->default(0);

            $table->integer('cantidadtotaldevolucioncomprarealizada')->default(0);
            $table->integer('cantidaddevolucioncomprarealizada')->default(0);
            $table->integer('cantidaddevolucioncompracancelado')->default(0);

            $table->integer('cantidadtotalproductodevolucioncomprarealizada')->default(0);
            $table->integer('cantidadproductodevolucioncomprarealizada')->default(0);
            $table->integer('cantidadproductodevolucioncompracancelado')->default(0);

            $table->date('fecha');
            $table->time('hora');
            $table->enum('isdelete', ['A', 'N'])->default('A');
            $table->enum('estado', ['A', 'N'])->default('A');

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
        Schema::dropIfExists('almacen');
    }
}
