<?php

use App\Models\Comercio\Inventario\Ciudad;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CiudadSeeder extends Seeder
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
            Ciudad::create( $d );
        }
    }

    public function _getdata() {

        $mytime = Carbon::now( 'America/La_paz' );
        
        return [
            [
                'fkidciudadclasificacion' => 1,
                'abreviatura' => 'BO',
                'descripcion' => 'Bolivia',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ],
            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 1,
                'abreviatura' => 'SC',
                'descripcion' => 'Santa Cruz',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ],
            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 1,
                'abreviatura' => 'CO',
                'descripcion' => 'Cochabamba',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ],
            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 1,
                'abreviatura' => 'LP',
                'descripcion' => 'La Paz',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ],
            
            [
                'fkidciudadclasificacion' => 1,
                'abreviatura' => 'BR',
                'descripcion' => 'Brasil',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ],
            [
                'fkidciudadclasificacion' => 1,
                'abreviatura' => 'AR',
                'descripcion' => 'Argentina',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ],
        ];
    }
    
}
