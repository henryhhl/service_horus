<?php

use App\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ( $this->_getdata() as $data ) {
            User::create( $data );
        }
    }
    public function _getdata() {
        $mytime = new Carbon( "America/La_Paz" );
        return [
            [
                "nombre" => "Admin",
                "apellido" => "",
                "email" => "admin@gmail.com",

                "fkidgrupousuario" => 1,

                "login" => "admin",
                "password" => bcrypt( "123456admin" ),

                "x_idusuario" => null,

                "x_fecha" => $mytime->toDateString(),
                "x_hora"  => $mytime->toTimeString(),

                "isdelete" => "N",
                "estado"   => "A",
            ]
        ];
    }
}
