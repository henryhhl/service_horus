<?php

namespace App\Models\Comercio\Compra;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProveedorProductoTipo extends Model
{
    use SoftDeletes;

    protected $table      = 'proveedorproductotipo';
    protected $primaryKey = 'idproveedorproductotipo';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A',  'isdelete' => 'A', 
    ];

    protected $fillable = [ 
        'fkidproveedor', 'fkidproductotipo', 
        'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function store( $query, $request, $detalle )
    {
        $fkidproveedor = $detalle->fkidproveedor;
        $fkidproductotipo  = $detalle->fkidproductotipo;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $proveedorproductotipo = $query->create( [
            'fkidproveedor' => $fkidproveedor,
            'fkidproductotipo'  => $fkidproductotipo,
            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $proveedorproductotipo;
    }

    public function upgrade( $query, $detalle )
    {
        $idproveedorproductotipo = $detalle->idproveedorproductotipo;

        $fkidproveedor = $detalle->fkidproveedor;
        $fkidproductotipo  = $detalle->fkidproductotipo;

        $proveedorproductotipo = $query->where( 'idproveedorproductotipo', '=', $idproveedorproductotipo )
            ->update( [
                'fkidproveedor' => $fkidproveedor,
                'fkidproductotipo'  => $fkidproductotipo,
            ] );

        return $proveedorproductotipo;
    }

    public function remove( $query, $idproveedorproductotipo )
    {
        $query->where('idproveedorproductotipo', '=', $idproveedorproductotipo)->delete();
    }
    
}
