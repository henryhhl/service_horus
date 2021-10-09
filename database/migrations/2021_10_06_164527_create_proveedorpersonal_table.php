<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProveedorpersonalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proveedorpersonal', function (Blueprint $table) {
            $table->increments('idproveedorpersonal');
            $table->integer('fkidproveedor')->unsigned();
            $table->integer('fkidproveedorcargo')->unsigned();
            
            $table->string('codigo', 150)->nullable();
            $table->string('nombre', 200);
            $table->string('apellido', 300);

            $table->string('telefono', 50)->nullable();
            $table->string('celular', 50)->nullable();
            $table->string('email', 300)->nullable();

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
        Schema::dropIfExists('proveedorpersonal');
    }
}
