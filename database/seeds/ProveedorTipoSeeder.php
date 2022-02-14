<?php

use App\Models\Comercio\Compra\ProveedorTipo;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ProveedorTipoSeeder extends Seeder
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
            ProveedorTipo::create( $d );
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
            ],
            [
                'descripcion' => 'Mayorista',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
                'isdelete'    => 'A',
            ],
            [
                'descripcion' => 'Minorista',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
                'isdelete'    => 'A',
            ],
        ];
    }

}
