<?php

namespace App\Models\Comercio\Inventario;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NotaIngresoDetalle extends Model
{
    use SoftDeletes;

    protected $table      = 'notaingresodetalle';
    protected $primaryKey = 'idnotaingresodetalle';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'stockactualanterior' => 0, 'cantidad' => 0, 'nrocajas' => 0, 'costobase' => 0, 'costounitario' => 0, 'costosubtotal' => 0, 'costopromedio' => 0,
        'descuento' => 0, 'montodescuento' => 0, 'peso' => 0, 'pesosubtotal' => 0, 'volumen' => 0, 'volumensubtotal' => 0,
        'nota' => null, 'fechavencimiento' => null, 'nrolote' => 0, 'nrofabrica' => 0,
        'fkidusers' => null, 'x_idusuario' =>null, 'estado' => 'A',  'isdelete' => 'A',
    ];

    protected $fillable = [ 
        'fkidnotaingreso', 'fkidalmacenproductodetalle', 'fkidproducto', 'fkidsucursal', 'fkidalmacen',
        'stockactualanterior', 'cantidad', 'nrocajas', 'costobase', 'costounitario', 'costosubtotal', 'costopromedio',
        'descuento', 'montodescuento', 'peso', 'pesosubtotal', 'volumen', 'volumensubtotal',
        'nota', 'fechavencimiento', 'nrolote', 'nrofabrica',
        'fkidusers', 'x_idusuario', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function getNotaIngresoDetalle( $query, $fkidnotaingreso ) {
        $notaingresodetalle = $query
            ->select( [
                'notaingresodetalle.idnotaingresodetalle', 'notaingresodetalle.fkidnotaingreso', 'notaingresodetalle.fkidalmacenproductodetalle', 
                'notaingresodetalle.fkidproducto', 'notaingresodetalle.fkidsucursal', 'notaingresodetalle.fkidalmacen',
                'notaingresodetalle.stockactualanterior', 'notaingresodetalle.cantidad', 'notaingresodetalle.nrocajas', 
                'notaingresodetalle.costobase', 'notaingresodetalle.costounitario', 'notaingresodetalle.costosubtotal', 'notaingresodetalle.costopromedio',
                'notaingresodetalle.descuento', 'notaingresodetalle.montodescuento', 
                'notaingresodetalle.peso', 'notaingresodetalle.pesosubtotal', 'notaingresodetalle.volumen', 'notaingresodetalle.volumensubtotal',
                'notaingresodetalle.nota', 'notaingresodetalle.fechavencimiento', 
                'notaingresodetalle.nrolote', 'notaingresodetalle.nrofabrica',
            ] )
            ->where('notaingresodetalle.fkidnotaingreso', '=', $fkidnotaingreso)
            ->whereNull('notaingresodetalle.deleted_at')
            ->orderBy('notaingresodetalle.idnotaingresodetalle')
            ->get();

        return $notaingresodetalle;
    }

    public function store( $query, $request, $detalle )
    {
        $fkidalmacenproductodetalle = $detalle->fkidalmacenproductodetalle;
        $fkidnotaingreso = $detalle->fkidnotaingreso;
        $fkidsucursal = $detalle->fkidsucursal;
        $fkidalmacen = $detalle->fkidalmacen;
        $fkidproducto = $detalle->fkidproducto;

        $nota = isset( $detalle->nota ) ? $detalle->nota : null;
        $fechavencimiento = isset( $detalle->fechavencimiento ) ? $detalle->fechavencimiento : null;

        $stockactualanterior = is_numeric( $detalle->stockactualanterior ) ? $detalle->stockactualanterior : 0;
        $cantidad = is_numeric( $detalle->cantidad ) ? $detalle->cantidad : 0;

        $costobase = is_numeric( $detalle->costobase ) ? $detalle->costobase : 0;
        $costounitario = is_numeric( $detalle->costounitario ) ? $detalle->costounitario : 0;
        $costosubtotal = is_numeric( $detalle->costosubtotal ) ? $detalle->costosubtotal : 0;
        $costopromedio = is_numeric( $detalle->costopromedio ) ? $detalle->costopromedio : 0;

        $descuento = is_numeric( $detalle->descuento ) ? $detalle->descuento : 0;
        $montodescuento = is_numeric( $detalle->montodescuento ) ? $detalle->montodescuento : 0;

        $nrocajas = is_numeric( $detalle->nrocajas ) ? $detalle->nrocajas : 0;
        $peso = is_numeric( $detalle->peso ) ? $detalle->peso : 0;
        $pesosubtotal = is_numeric( $detalle->pesosubtotal )  ? $detalle->pesosubtotal : 0;
        $volumen = is_numeric( $detalle->volumen ) ? $detalle->volumen : 0;
        $volumensubtotal = is_numeric( $detalle->volumensubtotal ) ? $detalle->volumensubtotal : 0;

        $nrolote = is_numeric( $detalle->nrolote ) ? $detalle->nrolote : 0;
        $nrofabrica = is_numeric( $detalle->nrofabrica ) ? $detalle->nrofabrica : 0;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $notaingresodetalle = $query->create( [
            'fkidalmacenproductodetalle' => $fkidalmacenproductodetalle,
            'fkidnotaingreso' => $fkidnotaingreso,
            'fkidsucursal' => $fkidsucursal,
            'fkidalmacen' => $fkidalmacen,
            'fkidproducto' => $fkidproducto,

            'nota' => $nota,
            'fechavencimiento' => $fechavencimiento,

            'stockactualanterior' => $stockactualanterior,
            'cantidad' => $cantidad,

            'costobase' => $costobase,
            'costounitario' => $costounitario,
            'costosubtotal' => $costosubtotal,
            'costopromedio' => $costopromedio,

            'descuento' => $descuento,
            'montodescuento' => $montodescuento,

            'nrocajas' => $nrocajas,
            'peso' => $peso,
            'pesosubtotal' => $pesosubtotal,
            'volumen' => $volumen,
            'volumensubtotal' => $volumensubtotal,
            'nrolote' => $nrolote,
            'nrofabrica' => $nrofabrica,

            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $notaingresodetalle;
    }

    public function upgrade( $query, $detalle )
    {
        $idnotaingresodetalle = $detalle->idnotaingresodetalle;

        $fkidalmacenproductodetalle = $detalle->fkidalmacenproductodetalle;
        $fkidnotaingreso = $detalle->fkidnotaingreso;
        $fkidsucursal = $detalle->fkidsucursal;
        $fkidalmacen = $detalle->fkidalmacen;
        $fkidproducto = $detalle->fkidproducto;

        $nota = isset( $detalle->nota ) ? $detalle->nota : null;
        $fechavencimiento = isset( $detalle->fechavencimiento ) ? $detalle->fechavencimiento : null;

        $stockactualanterior = is_numeric( $detalle->stockactualanterior ) ? $detalle->stockactualanterior : 0;
        $cantidad = is_numeric( $detalle->cantidad ) ? $detalle->cantidad : 0;

        $costobase = is_numeric( $detalle->costobase ) ? $detalle->costobase : 0;
        $costounitario = is_numeric( $detalle->costounitario ) ? $detalle->costounitario : 0;
        $costosubtotal = is_numeric( $detalle->costosubtotal ) ? $detalle->costosubtotal : 0;
        $costopromedio = is_numeric( $detalle->costopromedio ) ? $detalle->costopromedio : 0;

        $descuento = is_numeric( $detalle->descuento ) ? $detalle->descuento : 0;
        $montodescuento = is_numeric( $detalle->montodescuento ) ? $detalle->montodescuento : 0;

        $nrocajas = is_numeric( $detalle->nrocajas ) ? $detalle->nrocajas : 0;
        $peso = is_numeric( $detalle->peso ) ? $detalle->peso : 0;
        $pesosubtotal = is_numeric( $detalle->pesosubtotal )  ? $detalle->pesosubtotal : 0;
        $volumen = is_numeric( $detalle->volumen ) ? $detalle->volumen : 0;
        $volumensubtotal = is_numeric( $detalle->volumensubtotal ) ? $detalle->volumensubtotal : 0;

        $nrolote = is_numeric( $detalle->nrolote ) ? $detalle->nrolote : 0;
        $nrofabrica = is_numeric( $detalle->nrofabrica ) ? $detalle->nrofabrica : 0;

        $notaingresodetalle = $query->where( 'idnotaingresodetalle', '=', $idnotaingresodetalle )
            ->update( [
                'fkidalmacenproductodetalle' => $fkidalmacenproductodetalle,
                'fkidnotaingreso' => $fkidnotaingreso,
                'fkidsucursal' => $fkidsucursal,
                'fkidalmacen' => $fkidalmacen,
                'fkidproducto' => $fkidproducto,

                'nota' => $nota,
                'fechavencimiento' => $fechavencimiento,

                'stockactualanterior' => $stockactualanterior,
                'cantidad' => $cantidad,

                'costobase' => $costobase,
                'costounitario' => $costounitario,
                'costosubtotal' => $costosubtotal,
                'costopromedio' => $costopromedio,

                'descuento' => $descuento,
                'montodescuento' => $montodescuento,

                'nrocajas' => $nrocajas,
                'peso' => $peso,
                'pesosubtotal' => $pesosubtotal,
                'volumen' => $volumen,
                'volumensubtotal' => $volumensubtotal,
                'nrolote' => $nrolote,
                'nrofabrica' => $nrofabrica,
            ] );

        return $notaingresodetalle;
    }

    public function remove( $query, $idnotaingresodetalle )
    {
        return $query->where('idnotaingresodetalle', '=', $idnotaingresodetalle)->delete();
    }

}
