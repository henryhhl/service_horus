<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotatraspasoproductodetalleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notatraspasoproductodetalle', function (Blueprint $table) {
            $table->increments('idnotatraspasoproductodetalle');
            $table->integer('x_idusuario')->unsigned()->nullable();
            $table->integer('fkidusers')->unsigned()->nullable();

            $table->integer('fkidnotatraspasoproducto')->unsigned();
            $table->integer('fkidalmacenproductodetalle')->unsigned();
            $table->integer('fkidproducto')->unsigned();
            $table->integer('fkidsucursalingreso')->unsigned();
            $table->integer('fkidsucursalsalida')->unsigned();
            $table->integer('fkidalmaceningreso')->unsigned();
            $table->integer('fkidalmacensalida')->unsigned();

            $table->integer('stockactualanterior')->default(0);
            $table->integer('cantidad')->default(0);
            $table->integer('nrocajas')->default(0);

            $table->decimal('costobase', 24, 8)->default(0);
            $table->decimal('costounitarioingreso', 24, 8)->default(0);
            $table->decimal('costounitariosalida', 24, 8)->default(0);
            $table->decimal('costosubtotalingreso', 24, 8)->default(0);
            $table->decimal('costosubtotalsalida', 24, 8)->default(0);

            $table->integer('descuento')->default(0);
            $table->decimal('montodescuento', 24, 8)->default(0);

            $table->decimal('peso', 24, 8)->default(0);
            $table->decimal('pesosubtotal', 24, 8)->default(0);

            $table->decimal('volumen', 24, 8)->default(0);
            $table->decimal('volumensubtotal', 24, 8)->default(0);

            $table->text('nota')->nullable();
            $table->date('fechavencimiento')->nullable();
            $table->decimal('nrolote', 24, 8)->default(0);
            $table->decimal('nrofabrica', 24, 8)->default(0);

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
        Schema::dropIfExists('notatraspasoproductodetalle');
    }
}
