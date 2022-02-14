<?php

namespace App\Models\Comercio\Compra;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProveedorProducto extends Model
{
    use SoftDeletes;

    protected $table      = 'proveedorproducto';
    protected $primaryKey = 'idproveedorproducto';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'costounitario' => 0, 'stock' => 0,
        'estado' => 'A',  'isdelete' => 'A',
    ];

    protected $fillable = [
        'fkidproveedor', 'fkidproducto', 'costounitario', 'stock',
        'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function existProd( $query, $idproducto, $idproveedor ) {

        $proveedorproducto = $query
            ->where( 'fkidproveedor', '=', $idproveedor )
            ->where( 'fkidproducto', '=', $idproducto )
            ->whereNull( 'deleted_at' )
            ->get();

        return ( sizeof( $proveedorproducto ) > 0 );
    }

    public function firstProvProd( $query, $idproducto, $idproveedor ) {

        $proveedorproducto = $query
            ->where( 'fkidproveedor', '=', $idproveedor )
            ->where( 'fkidproducto', '=', $idproducto )
            ->whereNull( 'deleted_at' )
            ->first();

        return $proveedorproducto;
    }

    public function store( $query, $request, $detalle )
    {
        $fkidproveedor = $detalle->fkidproveedor;
        $fkidproducto  = $detalle->fkidproducto;
        $costounitario = $detalle->costounitario;
        $stock  = $detalle->stock;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $proveedorproducto = $query->create( [
            'fkidproveedor' => $fkidproveedor,
            'fkidproducto'  => $fkidproducto,
            'costounitario' => $costounitario,
            'stock'  => $stock,
            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $proveedorproducto;
    }

    public function upgrade( $query, $detalle )
    {
        $idproveedorproducto = $detalle->idproveedorproducto;

        $fkidproveedor = $detalle->fkidproveedor;
        $fkidproducto  = $detalle->fkidproducto;
        $costounitario = $detalle->costounitario;
        $stock  = $detalle->stock;

        $proveedorproducto = $query->where( 'idproveedorproducto', '=', $idproveedorproducto )
            ->update( [
                'fkidproveedor' => $fkidproveedor,
                'fkidproducto'  => $fkidproducto,
                'costounitario' => $costounitario,
                'stock'  => $stock,
            ] );

        return $proveedorproducto;
    }

    public function remove( $query, $idproveedorproducto )
    {
        $query->where('idproveedorproducto', '=', $idproveedorproducto)->delete();
    }

}
