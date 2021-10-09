<?php

use App\Models\Comercio\Inventario\ProductoTipo;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ProductoTipoSeeder extends Seeder
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
            ProductoTipo::create( $d );
        }
    }
    
    public function _getdata() {

        $mytime = Carbon::now( 'America/La_paz' );
        
        return [
            [
                'abreviatura' => 'P',
                'descripcion' => 'Producto',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'S',
                'descripcion' => 'Servicio',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'MP',
                'descripcion' => 'Materia Prima',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'I',
                'descripcion' => 'Insumo',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
            [
                'abreviatura' => 'Sum',
                'descripcion' => 'Suministro',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
        ];
    }
    
}
