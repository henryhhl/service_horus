<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotaingresodetalleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notaingresodetalle', function (Blueprint $table) {
            $table->increments('idnotaingresodetalle');
            
            $table->integer('fkidnotaingreso')->unsigned();
            $table->integer('fkidalmacenunidadmedidaproducto')->unsigned();

            $table->integer('cantidad')->default(0);
            $table->decimal('costounitario', 24, 8)->default(0);
            $table->decimal('costototal', 24, 8)->default(0);
            $table->integer('nrocajas')->default(0);

            $table->decimal('peso', 24, 8)->default(0);
            $table->decimal('pesosubtotal', 24, 8)->default(0);

            $table->decimal('volumen', 24, 8)->default(0);
            $table->decimal('volumensubtotal', 24, 8)->default(0);

            $table->date('fechavencimiento')->nullable();
            $table->decimal('nrolote', 24, 8)->default(0);
            $table->decimal('nrofabrica', 24, 8)->default(0);

            $table->decimal('precio', 24, 8)->default(0);

            $table->text('nota')->nullable();
            $table->enum('esingresado', ['A', 'N'])->default('N');

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
        Schema::dropIfExists('notaingresodetalle');
    }
}
