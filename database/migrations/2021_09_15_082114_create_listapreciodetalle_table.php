<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateListapreciodetalleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('listapreciodetalle', function (Blueprint $table) {
            $table->increments('idlistapreciodetalle');

            $table->integer('x_idusuario')->unsigned()->nullable();

            $table->integer('fkidlistaprecio')->unsigned();
            $table->integer('fkidproducto')->unsigned();
            $table->integer('fkidmoneda')->unsigned()->nullable();

            $table->decimal('preciobase', 24, 8)->default(0);
            $table->decimal('preciopivote', 24, 8)->default(0);
            $table->decimal('precioventa', 24, 8)->default(0);
            $table->integer('descuento')->default(0);
            $table->decimal('montodescuento', 24, 8)->default(0);

            $table->text('nota')->nullable();

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
        Schema::dropIfExists('listapreciodetalle');
    }
}
