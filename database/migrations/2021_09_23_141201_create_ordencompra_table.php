<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdencompraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ordencompra', function (Blueprint $table) {
            $table->increments('idordencompra');
            $table->integer('x_idusuario')->unsigned()->nullable();
            $table->integer('fkidusers')->unsigned()->nullable();
            
            $table->integer('fkidsolicitudcompra')->unsigned()->nullable();
            $table->integer('fkidsucursal')->unsigned();
            $table->integer('fkidalmacen')->unsigned();
            $table->integer('fkidconceptocompra')->unsigned();
            $table->integer('fkidseccioninventario')->unsigned();
            $table->integer('fkidproveedor')->unsigned();
            $table->integer('fkidmoneda')->unsigned();
            $table->integer("fkidtipotransaccion")->unsigned();

            $table->string('nrofactura', 150)->nullable();

            $table->string('codigo', 150)->nullable();
            $table->decimal('tipocambio', 24, 8)->default(0);

            $table->date('fechasolicitada');
            $table->date('fechavencimiento')->nullable();
            $table->integer('diasplazo')->default(0);

            $table->integer('cantidadtotal')->default(0);
            $table->decimal('montosubtotal', 24, 8)->default(0);
            $table->decimal('montototal', 24, 8)->default(0);

            $table->decimal('descuento', 24, 8)->default(0);
            $table->decimal('montodescuento', 24, 8)->default(0);

            $table->decimal('fletes', 24, 8)->default(0);
            $table->decimal('internacion', 24, 8)->default(0);
            $table->decimal('otrosgastos', 24, 8)->default(0);

            $table->text('nota')->nullable();
            $table->enum('tiposolicitud', ['L', 'E'])->default('L');
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
        Schema::dropIfExists('ordencompra');
    }
}
