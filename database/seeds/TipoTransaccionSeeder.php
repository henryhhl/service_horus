<?php

use App\Models\Comercio\Venta\TipoTransaccion;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class TipoTransaccionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = $this->_getdata();
        foreach ( $data as $key => $d ) {
            TipoTransaccion::create( $d );
        }
    }

    public function _getdata() {

        $mytime = Carbon::now( 'America/La_paz' );

        return [
            [
                'abreviatura' => 'ntaingre',
                'descripcion' => 'Nota Ingreso',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                "cantidadrealizada" => 0,
                "cantidadcancelada" => 0,
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'ntasali',
                'descripcion' => 'Nota Salida',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                "cantidadrealizada" => 0,
                "cantidadcancelada" => 0,
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'ntatrasp',
                'descripcion' => 'Nota Traspaso',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                "cantidadrealizada" => 0,
                "cantidadcancelada" => 0,
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'solcomp',
                'descripcion' => 'Solicitud Compra',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                "cantidadrealizada" => 0,
                "cantidadcancelada" => 0,
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'ordcomp',
                'descripcion' => 'Orden Compra',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                "cantidadrealizada" => 0,
                "cantidadcancelada" => 0,
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'ntacomp',
                'descripcion' => 'Nota Compra',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                "cantidadrealizada" => 0,
                "cantidadcancelada" => 0,
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'devcomp',
                'descripcion' => 'Devolución Compra',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                "cantidadrealizada" => 0,
                "cantidadcancelada" => 0,
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'ntavta',
                'descripcion' => 'Nota Venta',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                "cantidadrealizada" => 0,
                "cantidadcancelada" => 0,
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'devvta',
                'descripcion' => 'Devolución Venta',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                "cantidadrealizada" => 0,
                "cantidadcancelada" => 0,
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
        ];
    }
}
