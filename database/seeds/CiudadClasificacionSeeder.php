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
                'codigo'      => 'P',
                'descripcion' => 'Pais',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ],
            [
                'codigo'      => 'D',
                'descripcion' => 'Departamento',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ],
            [
                'codigo'      => 'E',
                'descripcion' => 'Estado',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ],
            [
                'codigo'      => 'P',
                'descripcion' => 'Provincia',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ],
        ];
    }
}
