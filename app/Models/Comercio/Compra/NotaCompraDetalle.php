<?php

namespace App\Models\Comercio\Compra;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NotaCompraDetalle extends Model
{
    use SoftDeletes;

    protected $table      = 'notacompradetalle';
    protected $primaryKey = 'idnotacompradetalle';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A',  'isdelete' => 'A', 'cantidad' => 0, 'costounitario' => 0, 'costosubtotal' => 0,
        'cantidadsolicitada' => 0, 'cantidadrecibida' => 0, 'cantidadfaltante' => 0, 'cantidadsobrante' => 0,
        'nrocajas' => 0, 'peso' => 0, 'pesosubtotal' => 0, 'volumen' => 0, 'volumensubtotal' => 0, 'nota' => null,
        'isdevolucioncompra' => 'N', 'isordencompra' => 'N', 'issolicitudcompra' => 'N', 'fechavencimiento' => null, 'nrolote' => 0, 'nrofabrica' => 0,
    ];

    protected $fillable = [ 
        'fkidnotacompra', 'fkidalmacenunidadmedidaproducto', 'fkidunidadmedidaproducto', 'fkidordencompradetalle', 
        'cantidadsolicitada', 'cantidadrecibida', 'cantidadfaltante', 'cantidadsobrante', 'cantidad', 'costounitario', 'costosubtotal',
        'nrocajas', 'peso', 'pesosubtotal', 'volumen', 'volumensubtotal', 'nota', 'fechavencimiento', 'nrolote', 'nrofabrica',
        'isdevolucioncompra', 'isordencompra', 'issolicitudcompra', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function store( $query, $request, $detalle )
    {
        $fkidnotacompra = $detalle->fkidnotacompra;
        $fkidunidadmedidaproducto = $detalle->fkidunidadmedidaproducto;
        $fkidordencompradetalle = $detalle->fkidordencompradetalle;
        $fkidalmacenunidadmedidaproducto = $detalle->fkidalmacenunidadmedidaproducto;

        $nota = isset( $detalle->nota ) ? $detalle->nota : null;
        $fechavencimiento = isset( $detalle->fechavencimiento ) ? $detalle->fechavencimiento : null;

        $cantidad = isset( $detalle->cantidad ) ? $detalle->cantidad : 0;
        $cantidadsolicitada = is_numeric( $detalle->cantidadsolicitada ) ? $detalle->cantidadsolicitada : 0;
        $cantidadrecibida = is_numeric( $detalle->cantidadrecibida ) ? $detalle->cantidadrecibida : 0;
        $cantidadfaltante = is_numeric( $detalle->cantidadfaltante ) ? $detalle->cantidadfaltante : 0;
        $cantidadsobrante = is_numeric( $detalle->cantidadsobrante ) ? $detalle->cantidadsobrante : 0;

        $nrocajas = is_numeric( $detalle->nrocajas ) ? $detalle->nrocajas : 0;
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

        $ordencompra = $query->create( [
            'fkidnotacompra' => $fkidnotacompra,
            'fkidunidadmedidaproducto' => $fkidunidadmedidaproducto,
            'fkidordencompradetalle' => $fkidordencompradetalle,
            'fkidalmacenunidadmedidaproducto' => $fkidalmacenunidadmedidaproducto,

            'nota' => $nota,
            'fechavencimiento' => $fechavencimiento,

            'cantidad' => $cantidad,
            'cantidadsolicitada' => $cantidadsolicitada,
            'cantidadrecibida' => $cantidadrecibida,
            'cantidadfaltante' => $cantidadfaltante,
            'cantidadsobrante' => $cantidadsobrante,

            'nrocajas' => $nrocajas,
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

        return $ordencompra;
    }

}
