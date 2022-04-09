<?php

use App\Models\Comercio\Venta\Sucursal;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class SucursalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = $this->_getdata();
        foreach ($data as $key => $d) {
            Sucursal::create($d);
        }
    }

    public function _getdata() {

        $mytime = Carbon::now( 'America/La_paz' );

        return [
            [
                'descripcion' => 'CENTRAL',
                'direccion'   => 'Av. Santa Cruz, Segundo anillo.',
                'fkidciudad'  => '1',
                'fkidciudadpais'  => '6',
                'fkidunionsucursal' => '1',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'A',
                'estado'      => 'A',
            ],
        ];
    }
}
