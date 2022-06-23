<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVendedorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendedor', function (Blueprint $table) {
            $table->increments('idvendedor');

            $table->integer('x_idusuario')->unsigned()->nullable();
            $table->integer('fkidciudadpais')->unsigned();
            $table->integer('fkidciudad')->unsigned();
            $table->integer('fkidcomisionventa')->unsigned();

            $table->string('codigo', 150)->nullable();
            $table->string('ci', 100);
            $table->string('nombre', 150);
            $table->string('apellido', 250);
            $table->text('direccion')->nullable();

            $table->text('fax')->nullable();
            $table->text('telefono')->nullable();
            $table->text('celular')->nullable();
            $table->text('email')->nullable();
            $table->date('fechanacimiento')->nullable();

            $table->integer('cantidadtotalventarealizada')->default(0);
            $table->integer('cantidadventarealizada')->default(0);
            $table->integer('cantidadventacancelada')->default(0);

            $table->integer('cantidadtotalproductoventarealizada')->default(0);
            $table->integer('cantidadproductoventarealizada')->default(0);
            $table->integer('cantidadproductoventacancelada')->default(0);

            $table->integer('cantidadtotaldevolucionventarealizada')->default(0);
            $table->integer('cantidaddevolucionventarealizada')->default(0);
            $table->integer('cantidaddevolucionventacancelada')->default(0);

            $table->integer('cantidadtotalproductodevolucionventarealizada')->default(0);
            $table->integer('cantidadproductodevolucionventarealizada')->default(0);
            $table->integer('cantidadproductodevolucionventacancelada')->default(0);

            $table->enum('genero', ['M', 'F', 'N'])->default('N');
            $table->enum('estadocivil', ['S', 'C', 'D', 'V', 'N'])->default('N');

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
        Schema::dropIfExists('vendedor');
    }
}
