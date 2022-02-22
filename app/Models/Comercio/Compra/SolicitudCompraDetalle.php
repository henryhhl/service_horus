<?php

namespace App\Models\Comercio\Compra;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SolicitudCompraDetalle extends Model
{
    use SoftDeletes;

    protected $table      = 'solicitudcompradetalle';
    protected $primaryKey = 'idsolicitudcompradetalle';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'estado' => 'A',  'isdelete' => 'A', 'costounitario' => 0, 'costosubtotal' => 0,
        'stockactual' => 0, 'cantidadpendiente' => 0, 'cantidadsolicitada' => 0, 'nota' => null,
        'isordencompra' => 'N', 'fechasolicitada' => null, 'fechafinalizada' => null,
    ];

    protected $fillable = [
        'fkidsolicitudcompra', 'fkidunidadmedidaproducto', 'costounitario', 'costosubtotal',
        'stockactual', 'cantidadpendiente', 'cantidadsolicitada', 'nota', 'fechasolicitada', 'fechafinalizada',
        'isordencompra', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function getSolicitudCompraDetalle( $query, $fkidsolicitudcompra ) {
        $solicitudcompradetalle = $query
            ->select( [
                'solicitudcompradetalle.idsolicitudcompradetalle', 'solicitudcompradetalle.stockactual',
                'solicitudcompradetalle.cantidadpendiente', 'solicitudcompradetalle.cantidadsolicitada',
                'solicitudcompradetalle.costounitario', 'solicitudcompradetalle.costosubtotal',
                'solicitudcompradetalle.nota', 'solicitudcompradetalle.fechasolicitada', 'solicitudcompradetalle.fechafinalizada',
                'solicitudcompradetalle.fecha', 'solicitudcompradetalle.hora', 'solicitudcompradetalle.estado',
            ] )
            ->where('solicitudcompradetalle.fkidsolicitudcompra', '=', $fkidsolicitudcompra)
            ->whereNull('solicitudcompradetalle.deleted_at')
            ->orderBy('solicitudcompradetalle.idsolicitudcompradetalle')
            ->get();

        return $solicitudcompradetalle;
    }

    public function store( $query, $request, $detalle )
    {
        $fkidsolicitudcompra = $detalle->fkidsolicitudcompra;
        $fkidunidadmedidaproducto = $detalle->fkidunidadmedidaproducto;

        $nota = isset( $detalle->nota ) ? $detalle->nota : null;
        $fechasolicitada = isset( $detalle->fechasolicitada ) ? $detalle->fechasolicitada : null;
        $fechafinalizada = isset( $detalle->fechafinalizada ) ? $detalle->fechafinalizada : null;

        $stockactual = is_numeric( $detalle->stockactual ) ? $detalle->stockactual : 0;
        $cantidadpendiente = isset( $detalle->cantidadpendiente ) ? $detalle->cantidadpendiente : 0;
        $cantidadsolicitada = is_numeric( $detalle->cantidadsolicitada ) ? $detalle->cantidadsolicitada : 0;

        $costounitario = is_numeric( $detalle->costounitario )  ? $detalle->costounitario : 0;
        $costosubtotal = is_numeric( $detalle->costosubtotal )  ? $detalle->costosubtotal : 0;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $notaingresodetalle = $query->create( [
            'fkidsolicitudcompra' => $fkidsolicitudcompra,
            'fkidunidadmedidaproducto' => $fkidunidadmedidaproducto,

            'nota' => $nota,
            'fechasolicitada' => $fechasolicitada,
            'fechafinalizada' => $fechafinalizada,

            'stockactual' => $stockactual,
            'cantidadpendiente' => $cantidadpendiente,
            'cantidadsolicitada' => $cantidadsolicitada,

            'costounitario' => $costounitario,
            'costosubtotal' => $costosubtotal,

            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $notaingresodetalle;
    }

}
