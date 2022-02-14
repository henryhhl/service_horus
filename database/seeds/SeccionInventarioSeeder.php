<?php

use App\Models\Comercio\Inventario\SeccionInventario;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class SeccionInventarioSeeder extends Seeder
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
            SeccionInventario::create( $d );
        }
    }

    public function _getdata() {

        $mytime = Carbon::now( 'America/La_paz' );

        return [
            [
                'descripcion' => 'Ninguno',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
                'isdelete'    => 'N',
            ],
            [
                'descripcion' => 'Comercial',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
                'isdelete'    => 'A',
            ],
            [
                'descripcion' => 'Taller',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
                'isdelete'    => 'A',
            ],
        ];
    }
}
