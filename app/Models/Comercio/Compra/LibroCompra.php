<?php

namespace App\Models\Comercio\Compra;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LibroCompra extends Model
{
    use SoftDeletes;

    protected $table      = 'librocompra';
    protected $primaryKey = 'idlibrocompra';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A',  'isdelete' => 'A', 'nrofactura' => null, 'nroautorizacion' => "0", 'tipocompra' => 'L',
        'cantidadtotal' => 0, 'montosubtotal' => 0, 'descuento' => 0, 'montodescuento' => 0, 'montototal' => 0,
    ];

    protected $fillable = [ 
        'fkidnotacompra', 'nrofactura', 'nombrerazonsocial', 'nitproveedor', 'nroautorizacion', 'codigocontrol',
        'cantidadtotal', 'montosubtotal', 'descuento', 'montodescuento', 'montototal',
        'fechafactura', 'tipocompra', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function store( $query, $request )
    {
        $fkidnotacompra = $request->fkidnotacompra;

        $fechafactura = isset( $request->fechafactura ) ? $request->fechafactura : null;
        $tipocompra = isset( $request->tipocompra ) ? $request->tipocompra : null;
        $nombrerazonsocial = isset( $request->nombrerazonsocial ) ? $request->nombrerazonsocial : null;
        $nitproveedor = isset( $request->nitproveedor ) ? $request->nitproveedor : "0";
        $nroautorizacion = isset( $request->nroautorizacion ) ? $request->nroautorizacion : null;
        $codigocontrol = isset( $request->codigocontrol ) ? $request->codigocontrol : null;

        $cantidadtotal = isset( $request->cantidadtotal ) ? $request->cantidadtotal : 0;
        $montosubtotal = is_numeric( $request->montosubtotal )  ? $request->montosubtotal : 0;
        $descuento = is_numeric( $request->descuento )  ? $request->descuento : 0;
        $montodescuento = is_numeric( $request->montodescuento )  ? $request->montodescuento : 0;
        $montototal = is_numeric( $request->montototal )  ? $request->montototal : 0;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $librocompra = $query->create( [
            'fkidnotacompra' => $fkidnotacompra,

            'fechafactura' => $fechafactura,
            'tipocompra' => $tipocompra,
            'nombrerazonsocial' => $nombrerazonsocial,
            'nitproveedor' => $nitproveedor,
            'nroautorizacion' => $nroautorizacion,
            'codigocontrol' => $codigocontrol,

            'cantidadtotal' => $cantidadtotal,
            'montosubtotal' => $montosubtotal,
            'descuento' => $descuento,
            'montodescuento' => $montodescuento,
            'montototal' => $montototal,

            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $librocompra;
    }
}
