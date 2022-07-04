<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDevolucionnotaventadetalleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('devolucionnotaventadetalle', function (Blueprint $table) {
            $table->increments('iddevolucionnotaventadetalle');
            $table->integer('x_idusuario')->unsigned()->nullable();

            $table->integer('fkiddevolucionnotaventa')->unsigned();
            $table->integer('fkidnotaventadetalle')->unsigned();
            $table->integer('fkidproducto')->unsigned();
            $table->integer('fkidproductotipo')->unsigned();
            $table->integer('fkidproductomarca')->unsigned();

            $table->integer('fkidalmacenproductodetalle')->unsigned();
            $table->integer('fkidalmacen')->unsigned();

            $table->integer('fkidlistaprecio')->unsigned();
            $table->integer('fkidlistapreciodetalle')->unsigned();

            $table->integer('fkidvendedor')->unsigned();
            $table->integer('fkidcliente')->unsigned();
            $table->integer('fkidsucursal')->unsigned();

            $table->integer('cantidadvendida')->default(0);
            $table->integer('cantidad')->default(0);

            $table->decimal('preciounitario', 24, 8)->default(0);
            $table->decimal('preciosubtotal', 24, 8)->default(0);

            $table->decimal('nrolote', 24, 8)->default(0);
            $table->decimal('nrofabrica', 24, 8)->default(0);
            $table->date('fechavencimiento')->nullable();
            $table->text('nota')->nullable();

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
        Schema::dropIfExists('devolucionnotaventadetalle');
    }
}
