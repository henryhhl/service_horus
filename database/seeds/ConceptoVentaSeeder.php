<?php

use App\Models\Comercio\Venta\ConceptoVenta;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ConceptoVentaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ( $this->_getdata() as $data ) {
            ConceptoVenta::create( $data );
        }
    }

    public function _getdata() {

        $mytime = Carbon::now( 'America/La_paz' );

        return [
            [
                'descripcion' => 'Ninguno',
                'x_idusuario' => null,
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
                'isdelete'    => 'N',
            ],
        ];
    }
}
