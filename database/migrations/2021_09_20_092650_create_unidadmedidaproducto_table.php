<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUnidadmedidaproductoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unidadmedidaproducto', function (Blueprint $table) {
            $table->increments('idunidadmedidaproducto');
            
            $table->integer('fkidunidadmedida')->unsigned();
            $table->integer('fkidproducto')->unsigned();
            
            $table->string('codigo', 150)->nullable();

            $table->decimal('peso', 24, 8)->default(0);
            $table->decimal('volumen', 24, 8)->default(0);
            
            $table->integer('stock')->default(0);
            
            $table->decimal('costo', 24, 8)->default(0);
            $table->integer('costodescuento')->default(0);
            $table->decimal('costomontodescuento', 24, 8)->default(0);
            $table->decimal('costounitario', 24, 8)->default(0);

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
        Schema::dropIfExists('unidadmedidaproducto');
    }
}
