<?php

namespace App\Models\Comercio\Compra;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DevolucionCompraDetalle extends Model
{
    use SoftDeletes;

    protected $table      = 'devolucioncompradetalle';
    protected $primaryKey = 'iddevolucioncompradetalle';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A',  'isdelete' => 'A', 'cantidad' => 0, 'costounitario' => 0, 'costosubtotal' => 0,
        'cantidadcomprada' => 0, 'fechavencimiento' => null, 'nrolote' => 0, 'nrofabrica' => 0, 
        'peso' => 0, 'pesosubtotal' => 0, 'volumen' => 0, 'volumensubtotal' => 0, 'nota' => null,
        'isnotacompra' => 'N', 'isordencompra' => 'N', 'issolicitudcompra' => 'N',
    ];

    protected $fillable = [ 
        'fkiddevolucioncompra', 'fkidalmacenunidadmedidaproducto', 'fkidunidadmedidaproducto', 'fkidnotacompradetalle', 
        'cantidadcomprada', 'cantidad', 'costounitario', 'costosubtotal',
        'peso', 'pesosubtotal', 'volumen', 'volumensubtotal', 'nota', 'fechavencimiento', 'nrolote', 'nrofabrica',
        'isnotacompra', 'isordencompra', 'issolicitudcompra', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function store( $query, $request, $detalle )
    {
        $fkiddevolucioncompra = $detalle->fkiddevolucioncompra;
        $fkidunidadmedidaproducto = $detalle->fkidunidadmedidaproducto;
        $fkidnotacompradetalle = $detalle->fkidnotacompradetalle;
        $fkidalmacenunidadmedidaproducto = $detalle->fkidalmacenunidadmedidaproducto;

        $nota = isset( $detalle->nota ) ? $detalle->nota : null;
        $fechavencimiento = isset( $detalle->fechavencimiento ) ? $detalle->fechavencimiento : null;

        $cantidad = isset( $detalle->cantidad ) ? $detalle->cantidad : 0;
        $cantidadcomprada = is_numeric( $detalle->cantidadcomprada ) ? $detalle->cantidadcomprada : 0;

        $nrolote = is_numeric( $detalle->nrolote ) ? $detalle->nrolote : 0;
        $nrofabrica = is_numeric( $detalle->nrofabrica ) ? $detalle->nrofabrica : 0;

        $costounitario = is_numeric( $detalle->costounitario )  ? $detalle->costounitario : 0;
        $costosubtotal = is_numeric( $detalle->costosubtotal )  ? $detalle->costosubtotal : 0;

        $peso = is_numeric( $detalle->peso )  ? $detalle->peso : 0;
        $pesosubtotal = is_numeric( $detalle->pesosubtotal )  ? $detalle->pesosubtotal : 0;

        $volumen = is_numeric( $detalle->volumen )  ? $detalle->volumen : 0;
        $volumensubtotal = is_numeric( $detalle->volumensubtotal )  ? $detalle->volumensubtotal : 0;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $devolucioncompradetalle = $query->create( [
            'fkiddevolucioncompra' => $fkiddevolucioncompra,
            'fkidunidadmedidaproducto' => $fkidunidadmedidaproducto,
            'fkidnotacompradetalle' => $fkidnotacompradetalle,
            'fkidalmacenunidadmedidaproducto' => $fkidalmacenunidadmedidaproducto,

            'nota' => $nota,
            'fechavencimiento' => $fechavencimiento,

            'cantidad' => $cantidad,
            'cantidadcomprada' => $cantidadcomprada,

            'nrolote' => $nrolote,
            'nrofabrica' => $nrofabrica,

            'costounitario' => $costounitario,
            'costosubtotal' => $costosubtotal,

            'peso' => $peso,
            'pesosubtotal' => $pesosubtotal,

            'volumen' => $volumen,
            'volumensubtotal' => $volumensubtotal,

            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $devolucioncompradetalle;
    }
}
