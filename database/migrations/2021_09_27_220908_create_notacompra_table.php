<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotacompraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notacompra', function (Blueprint $table) {
            $table->increments('idnotacompra');
            
            $table->integer('fkidordencompra')->unsigned()->nullable();
            $table->integer('fkidsucursal')->unsigned();
            $table->integer('fkidalmacen')->unsigned();
            $table->integer('fkidconceptocompra')->unsigned();
            $table->integer('fkidproveedor')->unsigned();
            $table->integer('fkidmoneda')->unsigned();
            $table->integer('fkidtipotransaccion')->unsigned();

            $table->string('nrorefprov', 150)->nullable();
            $table->string('codigo', 150)->nullable();

            $table->decimal('impuesto', 24, 8)->default(0);
            $table->decimal('impuestototal', 24, 8)->default(0);
            $table->decimal('tipocambio', 24, 8)->default(0);
            $table->enum('tipomoneda', [ 'N', 'E' ])->default('N');

            $table->date('fechanotacompra');
            $table->date('fechavencimiento')->nullable();
            $table->integer('diascredito')->default(0);

            $table->integer('cantidadtotal')->default(0);
            $table->decimal('montosubtotal', 24, 8)->default(0);
            $table->decimal('descuento', 24, 8)->default(0);
            $table->decimal('montodescuento', 24, 8)->default(0);
            $table->decimal('montototal', 24, 8)->default(0);

            $table->decimal('fletes', 24, 8)->default(0);
            $table->decimal('internacion', 24, 8)->default(0);
            $table->decimal('otrosgastos', 24, 8)->default(0);
            $table->integer('nrocajastotal')->default(0);

            $table->decimal('volumentotal', 24, 8)->default(0);
            $table->decimal('pesototal', 24, 8)->default(0);

            $table->text('nota')->nullable();
            $table->enum('tipocompra', ['L', 'E'])->default('L');

            $table->enum('isdevolucioncompra', ['A', 'N'])->default('N');
            $table->enum('isordencompra', ['A', 'N'])->default('N');
            $table->enum('issolicitudcompra', ['A', 'N'])->default('N');

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
        Schema::dropIfExists('notacompra');
    }
}
