<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClienteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cliente', function (Blueprint $table) {
            $table->increments('idcliente');
            
            $table->integer('fkidciudad')->unsigned();
            $table->integer('fkidclientetipo')->unsigned();
            $table->integer('fkidciudadclasificacion')->unsigned();
            $table->integer('fkidlistaprecio')->unsigned();
            $table->integer('fkidconceptoventa')->unsigned();
            $table->integer('fkidsucursal')->unsigned();

            $table->string('codigo', 150)->nullable();
            $table->string('nombre', 150);
            $table->string('apellido', 250);
            $table->string('razonsocial', 300)->nullable();

            $table->string('nit', 100)->nullable();
            $table->text('email')->nullable();
            $table->text('casilla')->nullable();
            $table->text('fax')->nullable();
            $table->text('contacto')->nullable();
            $table->text('direccion')->nullable();
            
            $table->integer('diascredito')->default(0);
            $table->decimal('limitecredito', 24, 8)->default(0);

            $table->longText('imagen')->nullable();
            $table->string('extension', 20)->nullable();
            $table->enum("tipopersoneria",["N","J", "S"])->default("S");

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
        Schema::dropIfExists('cliente');
    }
}
