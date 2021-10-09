<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateListaprecioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('listaprecio', function (Blueprint $table) {
            $table->increments('idlistaprecio');
            
            $table->string('codigo', 150)->nullable();
            $table->string('nombre', 250);

            $table->string('abreviatura', 50)->nullable();
            $table->decimal('tipocambio', 24, 8)->default(0);

            $table->date('fechainicio');
            $table->date('fechafinal')->nullable();
            $table->text('nota')->nullable();

            $table->longText('imagen')->nullable();
            $table->string('extension', 20)->nullable();

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
        Schema::dropIfExists('listaprecio');
    }
}
