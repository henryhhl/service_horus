<?php

use App\Models\Comercio\Venta\UnionSucursal;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UnionSucursalSeeder extends Seeder
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
            UnionSucursal::create( $d );
        }
    }

    public function _getdata() {

        $mytime = Carbon::now( 'America/La_paz' );
        
        return [
            [
                'descripcion' => 'Horus S.R.L.',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'A',
                'estado'      => 'A',
            ],
        ];
    }

}
