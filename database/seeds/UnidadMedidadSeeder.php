<?php

use App\Models\Comercio\Inventario\UnidadMedida;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UnidadMedidadSeeder extends Seeder
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
            UnidadMedida::create( $d );
        }
    }

    public function _getdata() {

        $mytime = Carbon::now( 'America/La_paz' );
        
        return [
            [
                'abreviatura' => 'U',
                'descripcion' => 'Unidad',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'A',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'Kg',
                'descripcion' => 'Kilogramos',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'A',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'gr',
                'descripcion' => 'Gramo',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'A',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'L',
                'descripcion' => 'Litro',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'A',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'm',
                'descripcion' => 'Metro',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'A',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'cm',
                'descripcion' => 'Centimetro',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'A',
                'estado'      => 'A',
            ],
        ];
    }

}
