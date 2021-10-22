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
