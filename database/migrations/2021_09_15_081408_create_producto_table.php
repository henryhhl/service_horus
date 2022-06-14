<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('producto', function (Blueprint $table) {
            $table->increments('idproducto');

            $table->integer('fkidciudadorigen')->unsigned();
            $table->integer('fkidcategoria')->unsigned();
            $table->integer('fkidproductomarca')->unsigned();
            $table->integer('fkidproductotipo')->unsigned();
            $table->integer('fkidproductogrupo')->unsigned();
            $table->integer('fkidproductosubgrupo')->unsigned();

            $table->integer('fkidunidadmedida')->unsigned();

            $table->decimal('valorequivalente', 24, 8)->default(0);
            $table->decimal('peso', 24, 8)->default(0);
            $table->decimal('volumen', 24, 8)->default(0);

            $table->string('codigo', 150)->nullable();
            $table->string('nombre', 250);
            $table->text('descripcion')->nullable();
            $table->string('abreviatura', 50)->nullable();

            $table->integer('stockactual')->default(0);
            $table->integer('nivel')->default(0);

            $table->integer('ingresos')->default(0);
            $table->integer('salidas')->default(0);
            $table->integer('traspasos')->default(0);
            $table->integer('solicitudcompra')->default(0);
            $table->integer('ordencompra')->default(0);
            $table->integer('notacompra')->default(0);
            $table->integer('devolucioncompra')->default(0);
            $table->integer('notaventa')->default(0);
            $table->integer('devolucionventa')->default(0);

            $table->decimal('costobase', 24, 8)->default(0);
            $table->integer('costodescuento')->default(0);
            $table->decimal('costomontodescuento', 24, 8)->default(0);
            $table->decimal('costounitario', 24, 8)->default(0);

            $table->decimal('costocif', 24, 8)->default(0);
            $table->decimal('costofob', 24, 8)->default(0);

            $table->longText('imagen')->nullable();
            $table->string('extension', 200)->nullable();

            $table->date('fecha');
            $table->time('hora');
            $table->enum('isventa', ['A', 'N'])->default('A');
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
        Schema::dropIfExists('producto');
    }
}
