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
            ], // 1

            [
                'fkidciudadclasificacion' => 1,
                'abreviatura' => 'BR',
                'descripcion' => 'Brasil',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 2
            
            [
                'fkidciudadclasificacion' => 1,
                'abreviatura' => 'AR',
                'descripcion' => 'Argentina',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 3

            [
                'fkidciudadclasificacion' => 1,
                'abreviatura' => 'C',
                'descripcion' => 'China',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 4

            [
                'fkidciudadclasificacion' => 1,
                'abreviatura' => 'J',
                'descripcion' => 'Japón',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 5

            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 1,
                'abreviatura' => 'SC',
                'descripcion' => 'Santa Cruz',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 6
            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 1,
                'abreviatura' => 'CO',
                'descripcion' => 'Cochabamba',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 7
            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 1,
                'abreviatura' => 'LP',
                'descripcion' => 'La Paz',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 8
            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 1,
                'abreviatura' => 'B',
                'descripcion' => 'Beni',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 9
            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 1,
                'abreviatura' => 'P',
                'descripcion' => 'Pando',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 10
            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 1,
                'abreviatura' => 'C',
                'descripcion' => 'Chuquisaca',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 11
            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 1,
                'abreviatura' => 'T',
                'descripcion' => 'Tarija',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 12
            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 1,
                'abreviatura' => 'P',
                'descripcion' => 'Potosi',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 13
            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 1,
                'abreviatura' => 'O',
                'descripcion' => 'Oruro',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 14

            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 2,
                'abreviatura' => 'SP',
                'descripcion' => 'Sao Paulo',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 15
            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 2,
                'abreviatura' => 'RJ',
                'descripcion' => 'Rio de Janeiro',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 16
            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 2,
                'abreviatura' => 'B',
                'descripcion' => 'Brasilia',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 17

            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 3,
                'abreviatura' => 'BA',
                'descripcion' => 'Buenos Aires',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 18
            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 3,
                'abreviatura' => 'S',
                'descripcion' => 'Salta',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 19
            [
                'fkidciudadclasificacion' => 2,
                'fkidciudadpadre' => 3,
                'abreviatura' => 'C',
                'descripcion' => 'Córdoba',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'estado'      => 'A',
            ], // 20
            


        ];
    }
    
}
