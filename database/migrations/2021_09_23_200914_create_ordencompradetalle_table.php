<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdencompradetalleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ordencompradetalle', function (Blueprint $table) {
            $table->increments('idordencompradetalle');
            
            $table->integer('fkidordencompra')->unsigned();
            $table->integer('fkidunidadmedidaproducto')->unsigned();
            $table->integer('fkidsolicitudcompradetalle')->unsigned()->nullable();

            $table->integer('cantidad')->default(0);
            $table->integer('cantidadsolicitada')->default(0);

            $table->decimal('costounitario', 24, 8)->default(0);
            $table->decimal('costosubtotal', 24, 8)->default(0);

            $table->decimal('peso', 24, 8)->default(0);
            $table->decimal('pesosubtotal', 24, 8)->default(0);

            $table->decimal('volumen', 24, 8)->default(0);
            $table->decimal('volumensubtotal', 24, 8)->default(0);

            $table->text('nota')->nullable();
            $table->date('fechasolicitada')->nullable();
            $table->date('fechavencimiento')->nullable();
            
            $table->enum('iscompra', ['A', 'N'])->default('N');
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
        Schema::dropIfExists('ordencompradetalle');
    }
}