<?php

use App\Models\Comercio\Compra\ConceptoCompra;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ConceptoCompraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ( $this->_getdata() as $data ) {
            ConceptoCompra::create( $data );
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
                'isdelete'    => 'A',
            ],
        ];
    }
}
