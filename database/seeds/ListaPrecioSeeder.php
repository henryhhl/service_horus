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
                'abreviatura' => 'LP1',
                'nombre'      => 'Lista de Precios Nro. 1',
                'tipocambio'  => 6.96,
                'fechainicio' => '2016-10-06',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
        ];
    }
    
}
