<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('producto', function (Blueprint $table) {
            $table->increments('idproducto');

            $table->integer('fkidciudadorigen')->unsigned();
            $table->integer('fkidcategoria')->unsigned();
            $table->integer('fkidproductomarca')->unsigned();
            $table->integer('fkidproductotipo')->unsigned();
            $table->integer('fkidproductogrupo')->unsigned();
            $table->integer('fkidproductosubgrupo')->unsigned();
            
            $table->string('codigo', 150)->nullable();
            $table->string('nombre', 250);
            $table->text('descripcion')->nullable();
            $table->string('abreviatura', 50)->nullable();

            // $table->decimal('costo', 24, 8)->default(0);
            $table->integer('stockactual')->default(0);
            $table->integer('nivel')->default(0);

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
        Schema::dropIfExists('producto');
    }
}
