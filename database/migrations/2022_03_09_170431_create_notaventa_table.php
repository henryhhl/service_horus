<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotaventaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notaventa', function (Blueprint $table) {
            $table->increments('idnotaventa');

            $table->integer('x_idusuario')->unsigned()->nullable();

            $table->integer('fkidsucursal')->unsigned();
            $table->integer('fkidalmacen')->unsigned();
            $table->integer('fkidvendedor')->unsigned();
            $table->integer('fkidcliente')->unsigned();
            $table->integer('fkidlistaprecio')->unsigned();
            $table->integer('fkidconceptoventa')->unsigned();
            $table->integer('fkidmoneda')->unsigned()->nullable();
            $table->integer('fkidusers')->unsigned()->nullable();
            $table->integer("fkidtipotransaccion")->unsigned();
            $table->integer("fkidtipopago")->unsigned();

            $table->integer('nrodebito')->default(0);
            $table->integer('nroventa')->default(0);
            $table->integer('nrocotizacion')->default(0);
            $table->decimal('tipocambio', 24, 8)->default(0);

            $table->string('codigo', 150)->nullable();
            $table->text('tipoventa')->nullable();
            $table->string('estadoproceso')->default('F');
            $table->date('fechaventa');
            $table->integer('diascredito')->nullable();
            $table->date('fechavencimiento')->nullable();

            $table->enum('facturar', ['S', 'N'])->default('N');
            $table->enum('esnotaentrega', ['S', 'N'])->default('N');
            $table->integer('nrofactura')->nullable();
            $table->text('razonsocial')->nullable();
            $table->text('nit')->nullable();
            $table->text('glosa')->nullable();

            $table->decimal('impuestoiva', 24, 8)->default(0);
            $table->decimal('montototalcobrado', 24, 8)->default(0);
            $table->decimal('montototaldeudamora', 24, 8)->nullable();
            $table->decimal('montototaldeudaactual', 24, 8)->nullable();
            $table->integer('descuentoacumulado')->nullable();
            $table->integer('porcentajerangodescuentoinicial')->nullable();
            $table->integer('porcentajerangodescuentofinal')->nullable();

            $table->decimal('montosubtotal', 24, 8)->default(0);
            $table->integer('descuento')->default(0);
            $table->decimal('montodescuento', 24, 8)->default(0);
            $table->decimal('montototal', 24, 8)->default(0);
            $table->integer('cantidadtotal')->default(0);

            $table->decimal('montoanticipo', 24, 8)->default(0);
            $table->enum('isdevolucionventa', ['A', 'N'])->default('N');

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
        Schema::dropIfExists('notaventa');
    }
}
