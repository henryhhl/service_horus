<?php

use App\Models\Comercio\Venta\TipoPago;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class TipoPagoSeeder extends Seeder
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
            TipoPago::create( $d );
        }
    }

    public function _getdata() {

        $mytime = Carbon::now( 'America/La_paz' );

        return [
            [
                'abreviatura' => 'ctado',
                'descripcion' => 'Contado',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'cred',
                'descripcion' => 'Crédito',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
        ];
    }
}
