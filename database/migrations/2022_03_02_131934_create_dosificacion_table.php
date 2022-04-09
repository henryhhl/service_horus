<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDosificacionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dosificacion', function (Blueprint $table) {
            $table->increments('iddosificacion');

            $table->integer('x_idusuario')->unsigned()->nullable();
            $table->integer('fkidsucursal')->unsigned();
            $table->integer('fkidactividadeconomica')->unsigned();

            $table->string('codigo', 150)->nullable();
            $table->text('descripcion');
            $table->string('abreviatura', 50)->nullable();

            $table->enum('tiposucursal', ['M', 'S'])->default('S');
            $table->enum('tipodosificacion', ['A', 'M'])->default('A');
            $table->enum('tipoempresa', ['N', 'J'])->default('N');
            $table->text('nit');
            $table->text('nroautorizacion');

            $table->text("llave");
            $table->text("lugaremision");
            $table->integer("numerocorrelativo")->default(0);
            $table->text("direccionfiscal");
            $table->text("telefonofiscal");

            $table->integer("numfacturainicial")->default(0);
            $table->integer("numfacturasiguiente")->default(0);

            $table->date("fechaactivacion");
            $table->date("fechalimiteemision");

            $table->integer("rangofacturainicial")->default(0);
            $table->integer("rangofacturafinal")->default(0);

            $table->date('fecha');
            $table->time('hora');
            $table->enum('estado', ['A', 'N'])->default('A');
            $table->enum('isdelete', ['A', 'N'])->default('A');

            $table->longText('imagen')->nullable();
            $table->string('extension', 200)->nullable();

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
        Schema::dropIfExists('dosificacion');
    }
}
