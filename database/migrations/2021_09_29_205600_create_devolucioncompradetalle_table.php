<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDevolucioncompradetalleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('devolucioncompradetalle', function (Blueprint $table) {
            $table->increments('iddevolucioncompradetalle');
            
            $table->integer('fkiddevolucioncompra')->unsigned();
            $table->integer('fkidalmacenunidadmedidaproducto')->unsigned()->nullable();
            $table->integer('fkidunidadmedidaproducto')->unsigned();
            $table->integer('fkidnotacompradetalle')->unsigned()->nullable();

            $table->integer('cantidadcomprada')->default(0);
            $table->integer('cantidad')->default(0);

            $table->decimal('costounitario', 24, 8)->default(0);
            $table->decimal('costosubtotal', 24, 8)->default(0);

            $table->decimal('peso', 24, 8)->default(0);
            $table->decimal('pesosubtotal', 24, 8)->default(0);

            $table->decimal('volumen', 24, 8)->default(0);
            $table->decimal('volumensubtotal', 24, 8)->default(0);

            $table->text('nota')->nullable();

            $table->date('fechavencimiento')->nullable();
            $table->decimal('nrolote', 24, 8)->default(0);
            $table->decimal('nrofabrica', 24, 8)->default(0);
            
            $table->enum('isnotacompra', ['A', 'N'])->default('N');
            $table->enum('isordencompra', ['A', 'N'])->default('N');
            $table->enum('issolicitudcompra', ['A', 'N'])->default('N');
            
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
        Schema::dropIfExists('devolucioncompradetalle');
    }
}
