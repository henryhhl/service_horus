<?php

use App\Models\Comercio\Inventario\CiudadClasificacion;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CiudadClasificacionSeeder extends Seeder
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
            CiudadClasificacion::create( $d );
        }
    }
    public function _getdata() {

        $mytime = Carbon::now( 'America/La_paz' );
        
        return [
            [
                'codigo'      => '1',
                'descripcion' => 'Pais',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ],
            [
                'codigo'      => '2',
                'descripcion' => 'Departamento',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ],
            [
                'codigo'      => '3',
                'descripcion' => 'Provincia',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ],
        ];
    }
}
