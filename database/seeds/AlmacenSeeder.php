<?php

use App\Models\Comercio\Inventario\Almacen;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class AlmacenSeeder extends Seeder
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
            Almacen::create($d);
        }
    }

    public function _getdata() {

        $mytime = Carbon::now( 'America/La_paz' );
        
        return [
            [
                'descripcion'  => 'PRINCIPAL',
                'direccion'    => 'Planta baja',
                'fkidsucursal' => 1,
                'fecha'        => $mytime->toDateString(),
                'hora'         => $mytime->toTimeString(),
                'isdelete'     => 'A',
                'estado'       => 'A',
            ],
        ];
    }
    
}
