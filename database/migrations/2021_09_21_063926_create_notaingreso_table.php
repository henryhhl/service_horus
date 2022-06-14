<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotaingresoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notaingreso', function (Blueprint $table) {
            $table->increments('idnotaingreso');
            $table->integer('x_idusuario')->unsigned()->nullable();
            $table->integer('fkidusers')->unsigned()->nullable();

            $table->integer('fkidsucursal')->unsigned();
            $table->integer('fkidalmacen')->unsigned();
            $table->integer('fkidconceptoinventario')->unsigned();
            $table->integer('fkidmoneda')->unsigned();
            $table->integer('fkidtipotransaccion')->unsigned();

            $table->string('codigo', 150)->nullable();
            $table->text('nro')->nullable();
            $table->text('nromanual')->nullable();
            $table->date('fechanotaingreso');
            $table->decimal('tipocambio', 24, 8)->default(0);

            $table->integer('cantidadtotal')->default(0);
            $table->decimal('montototal', 24, 8)->default(0);

            $table->decimal('volumentotal', 24, 8)->default(0);
            $table->decimal('pesototal', 24, 8)->default(0);
            $table->decimal('nrocajastotal', 24, 8)->default(0);

            $table->text('nota')->nullable();
            $table->enum('actualizarcostos', ['A', 'N'])->default('N');
            $table->enum('esnotaingreso', ['A', 'N'])->default('N');
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
        Schema::dropIfExists('notaingreso');
    }
}
