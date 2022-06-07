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
        'fkidsolicitudcompra' => null, 'fkidsolicitudcompradetalle' => null, 'fkidordencompra' => null, 'fkidordencompradetalle' => null,
        'estado' => 'A',  'isdelete' => 'A', 'cantidad' => 0, 'costounitario' => 0, 'costosubtotal' => 0, 'fkidproveedor' => 0,
        'cantidadsolicitada' => 0, 'cantidadrecibida' => 0, 'cantidadfaltante' => 0, 'cantidadsobrante' => 0, 'descuento' => 0, 'montodescuento' => 0,
        'nrocajas' => 0, 'peso' => 0, 'pesosubtotal' => 0, 'volumen' => 0, 'volumensubtotal' => 0, 'nota' => null,
        'isdevolucioncompra' => 'N', 'isordencompra' => 'N', 'issolicitudcompra' => 'N', 'fechavencimiento' => null, 'nrolote' => 0, 'nrofabrica' => 0,
    ];

    protected $fillable = [
        'fkidnotacompra', 'fkidalmacenproductodetalle', 'fkidproducto', 'fkidordencompra', 'fkidordencompradetalle', 'fkidsolicitudcompra', 'fkidsolicitudcompradetalle',
        'fkidsucursal', 'fkidalmacen', 'fkidseccioninventario', 'fkidproveedor', 'costobase', 'descuento', 'montodescuento',
        'cantidadsolicitada', 'cantidadrecibida', 'cantidadfaltante', 'cantidadsobrante', 'cantidad', 'costounitario', 'costosubtotal',
        'nrocajas', 'peso', 'pesosubtotal', 'volumen', 'volumensubtotal', 'nota', 'fechavencimiento', 'nrolote', 'nrofabrica',
        'isdevolucioncompra', 'isordencompra', 'issolicitudcompra', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function getCompraDetalle( $query, $idnotacompra ) {
        $compra = $query
            ->select( [
                'notacompradetalle.idnotacompradetalle', 'notacompradetalle.cantidad', 'notacompradetalle.nrocajas',
                'notacompradetalle.costounitario', 'notacompradetalle.costosubtotal', 'notacompradetalle.costobase',
                'notacompradetalle.descuento', 'notacompradetalle.montodescuento',
                'notacompradetalle.peso', 'notacompradetalle.pesosubtotal',
                'notacompradetalle.volumen', 'notacompradetalle.volumensubtotal',
                'notacompradetalle.nota', 'notacompradetalle.fechavencimiento',
                'notacompradetalle.nrolote', 'notacompradetalle.nrofabrica',
                'notacompradetalle.fecha', 'notacompradetalle.hora', 'notacompradetalle.estado',
                'notacompradetalle.fkidalmacenproductodetalle', 'notacompradetalle.fkidproducto',
                'notacompradetalle.fkidordencompra', 'notacompradetalle.fkidordencompradetalle',
                'notacompradetalle.fkidsolicitudcompra', 'notacompradetalle.fkidsolicitudcompradetalle',
                'notacompradetalle.fkidsucursal', 'notacompradetalle.fkidalmacen', 'notacompradetalle.fkidseccioninventario', 'notacompradetalle.fkidproveedor',
            ] )
            ->where('notacompradetalle.fkidnotacompra', '=', $idnotacompra)
            ->whereNull('notacompradetalle.deleted_at')
            ->orderBy('notacompradetalle.idnotacompradetalle')
            ->get();

        return $compra;
    }

    public function store( $query, $request, $detalle )
    {
        $fkidnotacompra = $detalle->fkidnotacompra;
        $fkidproducto = $detalle->fkidproducto;
        $fkidalmacenproductodetalle = $detalle->fkidalmacenproductodetalle;

        $fkidordencompra = $detalle->fkidordencompra;
        $fkidordencompradetalle = $detalle->fkidordencompradetalle;

        $fkidsolicitudcompra = $detalle->fkidsolicitudcompra;
        $fkidsolicitudcompradetalle = $detalle->fkidsolicitudcompradetalle;

        $fkidsucursal = $detalle->fkidsucursal;
        $fkidalmacen = $detalle->fkidalmacen;
        $fkidseccioninventario = $detalle->fkidseccioninventario;
        $fkidproveedor = $detalle->fkidproveedor;

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

        $costobase = is_numeric( $detalle->costobase )  ? $detalle->costobase : 0;
        $costounitario = is_numeric( $detalle->costounitario )  ? $detalle->costounitario : 0;
        $costosubtotal = is_numeric( $detalle->costosubtotal )  ? $detalle->costosubtotal : 0;

        $peso = is_numeric( $detalle->peso )  ? $detalle->peso : 0;
        $pesosubtotal = is_numeric( $detalle->pesosubtotal )  ? $detalle->pesosubtotal : 0;

        $descuento = is_numeric( $detalle->descuento )  ? $detalle->descuento : 0;
        $montodescuento = is_numeric( $detalle->montodescuento )  ? $detalle->montodescuento : 0;

        $volumen = is_numeric( $detalle->volumen )  ? $detalle->volumen : 0;
        $volumensubtotal = is_numeric( $detalle->volumensubtotal )  ? $detalle->volumensubtotal : 0;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $notacompradetalle = $query->create( [
            'fkidnotacompra' => $fkidnotacompra,
            'fkidproducto' => $fkidproducto,
            'fkidalmacenproductodetalle' => $fkidalmacenproductodetalle,

            'fkidordencompra' => $fkidordencompra,
            'fkidordencompradetalle' => $fkidordencompradetalle,

            'fkidsolicitudcompra' => $fkidsolicitudcompra,
            'fkidsolicitudcompradetalle' => $fkidsolicitudcompradetalle,

            'fkidsucursal' => $fkidsucursal,
            'fkidalmacen' => $fkidalmacen,
            'fkidseccioninventario' => $fkidseccioninventario,
            'fkidproveedor' => $fkidproveedor,

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

            'costobase' => $costobase,
            'costounitario' => $costounitario,
            'costosubtotal' => $costosubtotal,

            'descuento' => $descuento,
            'montodescuento' => $montodescuento,

            'peso' => $peso,
            'pesosubtotal' => $pesosubtotal,

            'volumen' => $volumen,
            'volumensubtotal' => $volumensubtotal,

            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $notacompradetalle;
    }

    public function upgrade( $query, $request, $detalle )
    {
        $idnotacompradetalle = $detalle->idnotacompradetalle;
        $fkidnotacompra = $detalle->fkidnotacompra;
        $fkidproducto = $detalle->fkidproducto;
        $fkidalmacenproductodetalle = $detalle->fkidalmacenproductodetalle;

        $fkidordencompra = $detalle->fkidordencompra;
        $fkidordencompradetalle = $detalle->fkidordencompradetalle;

        $fkidsolicitudcompra = $detalle->fkidsolicitudcompra;
        $fkidsolicitudcompradetalle = $detalle->fkidsolicitudcompradetalle;

        $fkidsucursal = $detalle->fkidsucursal;
        $fkidalmacen = $detalle->fkidalmacen;
        $fkidseccioninventario = $detalle->fkidseccioninventario;
        $fkidproveedor = $detalle->fkidproveedor;

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

        $costobase = is_numeric( $detalle->costobase )  ? $detalle->costobase : 0;
        $costounitario = is_numeric( $detalle->costounitario )  ? $detalle->costounitario : 0;
        $costosubtotal = is_numeric( $detalle->costosubtotal )  ? $detalle->costosubtotal : 0;

        $peso = is_numeric( $detalle->peso )  ? $detalle->peso : 0;
        $pesosubtotal = is_numeric( $detalle->pesosubtotal )  ? $detalle->pesosubtotal : 0;

        $descuento = is_numeric( $detalle->descuento )  ? $detalle->descuento : 0;
        $montodescuento = is_numeric( $detalle->montodescuento )  ? $detalle->montodescuento : 0;

        $volumen = is_numeric( $detalle->volumen )  ? $detalle->volumen : 0;
        $volumensubtotal = is_numeric( $detalle->volumensubtotal )  ? $detalle->volumensubtotal : 0;

        $notacompradetalle = $query->where( 'idnotacompradetalle', '=', $idnotacompradetalle )->update( [
            'fkidnotacompra' => $fkidnotacompra,
            'fkidproducto' => $fkidproducto,
            'fkidalmacenproductodetalle' => $fkidalmacenproductodetalle,

            'fkidordencompra' => $fkidordencompra,
            'fkidordencompradetalle' => $fkidordencompradetalle,

            'fkidsolicitudcompra' => $fkidsolicitudcompra,
            'fkidsolicitudcompradetalle' => $fkidsolicitudcompradetalle,

            'fkidsucursal' => $fkidsucursal,
            'fkidalmacen' => $fkidalmacen,
            'fkidseccioninventario' => $fkidseccioninventario,
            'fkidproveedor' => $fkidproveedor,

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

            'costobase' => $costobase,
            'costounitario' => $costounitario,
            'costosubtotal' => $costosubtotal,

            'descuento' => $descuento,
            'montodescuento' => $montodescuento,

            'peso' => $peso,
            'pesosubtotal' => $pesosubtotal,

            'volumen' => $volumen,
            'volumensubtotal' => $volumensubtotal,
        ] );

        return $notacompradetalle;
    }

}
