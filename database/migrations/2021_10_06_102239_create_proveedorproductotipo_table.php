<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProveedorproductotipoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proveedorproductotipo', function (Blueprint $table) {
            $table->increments('idproveedorproductotipo');
            
            $table->integer('fkidproveedor')->unsigned();
            $table->integer('fkidproductotipo')->unsigned();

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
        Schema::dropIfExists('proveedorproductotipo');
    }
}
