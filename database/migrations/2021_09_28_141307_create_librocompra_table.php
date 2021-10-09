<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLibrocompraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('librocompra', function (Blueprint $table) {
            $table->increments('idlibrocompra');

            $table->integer('fkidnotacompra')->unsigned();

            $table->string('nrofactura', 150)->nullable();
            $table->string('nombrerazonsocial', 250);
            $table->string('nitproveedor', 200);

            $table->text('nroautorizacion');
            $table->string('codigocontrol', 50);
            $table->date('fechafactura');

            $table->enum('tipocompra', ['L', 'E'])->default('L');

            $table->integer('cantidadtotal')->default(0);
            $table->decimal('montosubtotal', 24, 8)->default(0);
            $table->decimal('descuento', 24, 8)->default(0);
            $table->decimal('montodescuento', 24, 8)->default(0);
            $table->decimal('montototal', 24, 8)->default(0);
            
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
        Schema::dropIfExists('librocompra');
    }
}
