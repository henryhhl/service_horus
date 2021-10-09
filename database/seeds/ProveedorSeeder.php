<?php

use App\Models\Comercio\Compra\Proveedor;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ProveedorSeeder extends Seeder
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
            Proveedor::create( $d );
        }
    }

    public function _getdata() {

        $mytime = Carbon::now( 'America/La_paz' );
        
        return [
            [
                'fkidciudadpais'     => 1,
                'fkidciudad'         => 2,
                'fkidproveedortipo'  => 1,
                'fkidproveedorgrupo' => 2,
                'tipopersoneria'     => 'J',
                'nroorden'  => '0',
                'nombre'    => 'BATEBOL S.A.',
                'direccion' => 'Parque industrial, manzano 4',
                'nit'       => '990838900993',
                'telefono'  => '3094789',
                'celular'   => '78925673',
                'fax'       => '829389249',
                'email'     => 'batebol@gmail.com',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ],
        ];
    }
    
}
