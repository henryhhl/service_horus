<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProveedorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proveedor', function (Blueprint $table) {
            $table->increments('idproveedor');
            $table->integer('fkidciudadpais')->unsigned();
            $table->integer('fkidciudad')->unsigned();
            $table->integer('fkidproveedortipo')->unsigned();
            $table->integer('fkidproveedorgrupo')->unsigned();
            
            $table->string('codigo', 150)->nullable();
            $table->string('nombre', 250);
            $table->string('direccion', 250)->nullable();
            $table->string('nit', 200)->nullable();

            $table->text('telefono')->nullable();
            $table->text('celular')->nullable();
            $table->text('fax')->nullable();
            $table->longText('contacto')->nullable();
            $table->string('email', 300)->nullable();
            $table->longText('sitioweb')->nullable();
            $table->longText('nroorden')->default('0')->nullable();

            $table->integer('cantidadtotalsolicitudcomprarealizada')->default(0);
            $table->integer('cantidadsolicitudcomprarealizada')->default(0);
            $table->integer('cantidadsolicitudcompracancelada')->default(0);

            $table->integer('cantidadtotalproductosolicitudcomprarealizada')->default(0);
            $table->integer('cantidadproductosolicitudcomprarealizada')->default(0);
            $table->integer('cantidadproductosolicitudcompracancelada')->default(0);

            $table->integer('cantidadtotalordencomprarealizada')->default(0);
            $table->integer('cantidadordencomprarealizada')->default(0);
            $table->integer('cantidadordencompracancelada')->default(0);

            $table->integer('cantidadtotalproductoordencomprarealizada')->default(0);
            $table->integer('cantidadproductoordencomprarealizada')->default(0);
            $table->integer('cantidadproductoordencompracancelada')->default(0);

            $table->integer('cantidadtotalcomprarealizada')->default(0);
            $table->integer('cantidadcomprarealizada')->default(0);
            $table->integer('cantidadcompracancelada')->default(0);

            $table->integer('cantidadtotalproductocomprarealizada')->default(0);
            $table->integer('cantidadproductocomprarealizada')->default(0);
            $table->integer('cantidadproductocompracancelada')->default(0);
            
            $table->integer('cantidadtotaldevolucioncomprarealizada')->default(0);
            $table->integer('cantidaddevolucioncomprarealizada')->default(0);
            $table->integer('cantidaddevolucioncompracancelada')->default(0);

            $table->integer('cantidadtotalproductodevolucioncomprarealizada')->default(0);
            $table->integer('cantidadproductodevolucioncomprarealizada')->default(0);
            $table->integer('cantidadproductodevolucioncompracancelada')->default(0);

            $table->longText('diascredito')->default('0')->nullable();
            $table->longText('formadepago')->nullable();
            $table->enum('tipopersoneria', ['J', 'N'])->default('N');

            $table->longText('imagen')->nullable();
            $table->string('extension', 20)->nullable();

            $table->date('fechaalta')->nullable();
            $table->date('fechabaja')->nullable();

            $table->date('fecha');
            $table->time('hora');
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
        Schema::dropIfExists('proveedor');
    }
}
