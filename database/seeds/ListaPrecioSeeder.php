<?php

use App\Models\Comercio\Venta\ListaPrecio;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ListaPrecioSeeder extends Seeder
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
            ListaPrecio::create( $d );
        }
    }

    public function _getdata() {

        $mytime = Carbon::now( 'America/La_paz' );

        return [
            [
                'codigo' => 'LP1',
                'abreviatura' => 'LP1',
                'descripcion' => 'Lista de Precios Nro. 1',
                'tipocambio'  => 6.96,
                'fechalistaprecio' => $mytime->toDateString(),
                'fechainicio' => null,
                'fechafinal'  => null,
                'accion'      => 'I',
                'fijoporcentaje' => 'P',
                'valor'       => 0,
                'nota'        => null,
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
        ];
    }

}
