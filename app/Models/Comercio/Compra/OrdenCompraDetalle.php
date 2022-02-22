<?php

namespace App\Models\Comercio\Compra;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrdenCompraDetalle extends Model
{
    use SoftDeletes;

    protected $table      = 'ordencompradetalle';
    protected $primaryKey = 'idordencompradetalle';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'estado' => 'A',  'isdelete' => 'A', 'fkidsolicitudcompradetalle' => null,
        'cantidad' => 0, 'cantidadsolicitada' => 0, 'costounitario' => 0, 'costosubtotal' => 0,
        'peso' => 0, 'pesosubtotal' => 0, 'volumen' => 0, 'volumensubtotal' => 0, 'nota' => null,
        'fechasolicitada' => null, 'fechavencimiento' => null,
        'issolicitudcompra' => 'N', 'iscompra' => 'N',
    ];

    protected $fillable = [
        'fkidordencompra', 'fkidunidadmedidaproducto', 'fkidsolicitudcompradetalle', 'costounitario', 'costosubtotal',
        'peso', 'pesosubtotal', 'cantidad', 'cantidadsolicitada', 'volumen', 'volumensubtotal',
        'nota', 'fechasolicitada', 'fechavencimiento', 'iscompra', 'issolicitudcompra', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function getOrdenCompraDetalle( $query, $fkidordencompra ) {
        $ordencompradetalle = $query
            ->select( [
                'ordencompradetalle.idordencompradetalle', 'ordencompradetalle.cantidad', 'ordencompradetalle.cantidadsolicitada',
                'ordencompradetalle.costounitario', 'ordencompradetalle.costosubtotal',
                'ordencompradetalle.peso', 'ordencompradetalle.pesosubtotal',
                'ordencompradetalle.volumen', 'ordencompradetalle.volumensubtotal',
                'ordencompradetalle.nota', 'ordencompradetalle.fechavencimiento',
                'ordencompradetalle.fecha', 'ordencompradetalle.hora', 'ordencompradetalle.estado',
            ] )
            ->where('ordencompradetalle.fkidordencompra', '=', $fkidordencompra)
            ->whereNull('ordencompradetalle.deleted_at')
            ->orderBy('ordencompradetalle.idordencompradetalle')
            ->get();

        return $ordencompradetalle;
    }

    public function store( $query, $request, $detalle )
    {
        $fkidordencompra = $detalle->fkidordencompra;
        $fkidunidadmedidaproducto = $detalle->fkidunidadmedidaproducto;
        $fkidsolicitudcompradetalle = $detalle->fkidsolicitudcompradetalle;

        $nota = isset( $detalle->nota ) ? $detalle->nota : null;
        $fechasolicitada = isset( $detalle->fechasolicitada ) ? $detalle->fechasolicitada : null;
        $fechavencimiento = isset( $detalle->fechavencimiento ) ? $detalle->fechavencimiento : null;

        $cantidad = isset( $detalle->cantidad ) ? $detalle->cantidad : 0;
        $cantidadsolicitada = is_numeric( $detalle->cantidadsolicitada ) ? $detalle->cantidadsolicitada : 0;

        $costounitario = is_numeric( $detalle->costounitario )  ? $detalle->costounitario : 0;
        $costosubtotal = is_numeric( $detalle->costosubtotal )  ? $detalle->costosubtotal : 0;

        $peso = is_numeric( $detalle->peso )  ? $detalle->peso : 0;
        $pesosubtotal = is_numeric( $detalle->pesosubtotal )  ? $detalle->pesosubtotal : 0;

        $volumen = is_numeric( $detalle->volumen )  ? $detalle->volumen : 0;
        $volumensubtotal = is_numeric( $detalle->volumensubtotal )  ? $detalle->volumensubtotal : 0;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $ordencompra = $query->create( [
            'fkidordencompra' => $fkidordencompra,
            'fkidunidadmedidaproducto' => $fkidunidadmedidaproducto,
            'fkidsolicitudcompradetalle' => $fkidsolicitudcompradetalle,

            'nota' => $nota,
            'fechasolicitada' => $fechasolicitada,
            'fechavencimiento' => $fechavencimiento,

            'cantidad' => $cantidad,
            'cantidadsolicitada' => $cantidadsolicitada,

            'costounitario' => $costounitario,
            'costosubtotal' => $costosubtotal,

            'peso' => $peso,
            'pesosubtotal' => $pesosubtotal,

            'volumen' => $volumen,
            'volumensubtotal' => $volumensubtotal,

            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $ordencompra;
    }

}
