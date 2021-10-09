<?php

use App\Models\Comercio\Inventario\ProductoMarca;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ProductoMarcaSeeder extends Seeder
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
            ProductoMarca::create( $d );
        }
    }

    public function _getdata() {

        $mytime = Carbon::now( 'America/La_paz' );
        
        return [
            [
                'descripcion' => 'Volta',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'A',
                'estado'      => 'A',
            ],
            [
                'descripcion' => 'Toyota',
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'A',
                'estado'      => 'A',
            ],
        ];
    }
    
}
