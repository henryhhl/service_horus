<?php

use App\Models\Comercio\Inventario\Categoria;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
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
            Categoria::create( $d );
        }
    }

    public function _getdata() {

        $mytime = Carbon::now( 'America/La_paz' );
        
        return [
            [
                'descripcion' => 'Ninguno',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
            [
                'descripcion' => 'Bateria',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'A',
                'estado'      => 'A',
            ],
            [
                'descripcion' => 'Motor',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'A',
                'estado'      => 'A',
            ],
            [
                'descripcion' => 'Goma',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'A',
                'estado'      => 'A',
            ],
        ];
    }

}
