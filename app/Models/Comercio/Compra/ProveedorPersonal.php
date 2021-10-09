<?php

namespace App\Models\Comercio\Compra;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProveedorPersonal extends Model
{
    use SoftDeletes;

    protected $table      = 'proveedorpersonal';
    protected $primaryKey = 'idproveedorpersonal';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A',  'isdelete' => 'A', 
        'codigo' => null, 'celular' => null, 'telefono' => null, 'email' => null,
        'imagen' => null, 'extension' => null,
    ];

    protected $fillable = [ 
        'fkidproveedorcargo', 'fkidproveedor', 'codigo', 'nombre', 'apellido',
        'celular', 'telefono', 'email', 'imagen', 'extension',
        'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function store( $query, $request, $detalle )
    {
        $fkidproveedor = $detalle->fkidproveedor;
        $fkidproveedorcargo  = $detalle->fkidproveedorcargo;

        $codigo    = isset( $detalle->codigo ) ? $detalle->codigo : null;
        $nombre    = isset( $detalle->nombre ) ? $detalle->nombre : null;
        $apellido  = isset( $detalle->apellido ) ? $detalle->apellido : null;
        $celular   = isset( $detalle->celular ) ? $detalle->celular : null;
        $telefono  = isset( $detalle->telefono ) ? $detalle->telefono : null;
        $email     = isset( $detalle->email ) ? $detalle->email : null;
        $imagen    = isset( $detalle->imagen ) ? $detalle->imagen : null;
        $extension = isset( $detalle->extension ) ? $detalle->extension : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $proveedorpersonal = $query->create( [
            'fkidproveedor'      => $fkidproveedor,
            'fkidproveedorcargo' => $fkidproveedorcargo,

            'codigo' => $codigo,
            'nombre' => $nombre,
            'apellido' => $apellido,
            'celular' => $celular,
            'telefono' => $telefono,
            'email' => $email,
            'imagen' => $imagen,
            'extension' => $extension,
            
            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $proveedorpersonal;
    }

    public function upgrade( $query, $detalle )
    {
        $idproveedorpersonal = $detalle->idproveedorpersonal;

        $fkidproveedor = $detalle->fkidproveedor;
        $fkidproveedorcargo  = $detalle->fkidproveedorcargo;

        $codigo    = isset( $detalle->codigo ) ? $detalle->codigo : null;
        $nombre    = isset( $detalle->nombre ) ? $detalle->nombre : null;
        $apellido  = isset( $detalle->apellido ) ? $detalle->apellido : null;
        $celular   = isset( $detalle->celular ) ? $detalle->celular : null;
        $telefono  = isset( $detalle->telefono ) ? $detalle->telefono : null;
        $email     = isset( $detalle->email ) ? $detalle->email : null;
        $imagen    = isset( $detalle->imagen ) ? $detalle->imagen : null;
        $extension = isset( $detalle->extension ) ? $detalle->extension : null;

        $proveedorpersonal = $query->where( 'idproveedorpersonal', '=', $idproveedorpersonal )
            ->update( [
                'fkidproveedor' => $fkidproveedor,
                'fkidproveedorcargo'  => $fkidproveedorcargo,

                'codigo' => $codigo,
                'nombre' => $nombre,
                'apellido' => $apellido,
                'celular' => $celular,
                'telefono' => $telefono,
                'email' => $email,
                'imagen' => $imagen,
                'extension' => $extension,

            ] );

        return $proveedorpersonal;
    }

    public function remove( $query, $idproveedorpersonal )
    {
        $query->where('idproveedorpersonal', '=', $idproveedorpersonal)->delete();
    }

}
