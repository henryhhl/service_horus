<?php

use App\Models\Comercio\Inventario\ProductoSubGrupo;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ProductoSubGrupoSeeder extends Seeder
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
            ProductoSubGrupo::create( $d );
        }
    }

    public function _getdata() {

        $mytime = Carbon::now( 'America/La_paz' );
        
        return [
            [
                'descripcion' => 'Reten 1mmx2mmx3mm',
                'fkidproductogrupo' => 1,
                'fecha'       => $mytime->toDateString(),
                'hora'        => $mytime->toTimeString(),
                'isdelete'    => 'N',
                'estado'      => 'A',
            ],
        ];
    }
    
}
