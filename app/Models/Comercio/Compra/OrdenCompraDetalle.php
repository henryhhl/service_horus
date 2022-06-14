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
        'stockactual' => 0, 'cantidad' => 0, 'cantidadsolicitada' => 0, 'costobase' => 0, 'costounitario' => 0, 'costosubtotal' => 0,
        'descuento' => 0, 'montodescuento' => 0, 'peso' => 0, 'pesosubtotal' => 0, 'volumen' => 0, 'volumensubtotal' => 0, 'nota' => null,
        'fechasolicitada' => null, 'fechavencimiento' => null, 'issolicitudcompra' => 'N', 'iscompra' => 'N',
        'estado' => 'A',  'isdelete' => 'A', 'fkidsolicitudcompradetalle' => null, 'fkidsolicitudcompra' => null, 'x_idusuario' => null, 'fkidusers' => null,
    ];

    protected $fillable = [
        'fkidordencompra', 'fkidproducto', 'fkidsolicitudcompradetalle', 'fkidsolicitudcompra', 'fkidproveedor', 'fkidsucursal', 'fkidalmacen', 'fkidseccioninventario',
        'costobase', 'costounitario', 'costosubtotal', 'peso', 'pesosubtotal', 'stockactual', 'cantidad', 'cantidadsolicitada', 'descuento', 'montodescuento',
        'volumen', 'volumensubtotal', 'nota', 'fechasolicitada', 'fechavencimiento', 'iscompra', 'issolicitudcompra', 
        'isdelete', 'estado', 'fecha', 'hora', 'x_idusuario', 'fkidusers',
    ];

    public function getOrdenCompraDetalle( $query, $fkidordencompra ) {
        $ordencompradetalle = $query
            ->select( [
                'ordencompradetalle.idordencompradetalle', 'ordencompradetalle.fkidsolicitudcompradetalle', 'ordencompradetalle.fkidsolicitudcompra',
                'ordencompradetalle.stockactual', 'ordencompradetalle.cantidad', 'ordencompradetalle.cantidadsolicitada',
                'ordencompradetalle.costobase', 'ordencompradetalle.costounitario', 'ordencompradetalle.costosubtotal',
                'ordencompradetalle.descuento', 'ordencompradetalle.montodescuento',
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
        $fkidproducto = $detalle->fkidproducto;
        $fkidsolicitudcompradetalle = $detalle->fkidsolicitudcompradetalle;
        $fkidsolicitudcompra = $detalle->fkidsolicitudcompra;
        $fkidproveedor = $detalle->fkidproveedor;
        $fkidsucursal = $detalle->fkidsucursal;
        $fkidalmacen = $detalle->fkidalmacen;
        $fkidseccioninventario = $detalle->fkidseccioninventario;

        $nota = isset( $detalle->nota ) ? $detalle->nota : null;
        $fechasolicitada = isset( $detalle->fechasolicitada ) ? $detalle->fechasolicitada : null;
        $fechavencimiento = isset( $detalle->fechavencimiento ) ? $detalle->fechavencimiento : null;

        $stockactual = isset( $detalle->stockactual ) ? $detalle->stockactual : 0;
        $cantidad = isset( $detalle->cantidad ) ? $detalle->cantidad : 0;
        $cantidadsolicitada = is_numeric( $detalle->cantidadsolicitada ) ? $detalle->cantidadsolicitada : 0;

        $costobase = is_numeric( $detalle->costobase )  ? $detalle->costobase : 0;
        $costounitario = is_numeric( $detalle->costounitario )  ? $detalle->costounitario : 0;
        $costosubtotal = is_numeric( $detalle->costosubtotal )  ? $detalle->costosubtotal : 0;

        $descuento = is_numeric( $detalle->descuento )  ? $detalle->descuento : 0;
        $montodescuento = is_numeric( $detalle->montodescuento )  ? $detalle->montodescuento : 0;

        $peso = is_numeric( $detalle->peso )  ? $detalle->peso : 0;
        $pesosubtotal = is_numeric( $detalle->pesosubtotal )  ? $detalle->pesosubtotal : 0;

        $volumen = is_numeric( $detalle->volumen )  ? $detalle->volumen : 0;
        $volumensubtotal = is_numeric( $detalle->volumensubtotal )  ? $detalle->volumensubtotal : 0;
        
        $iscompra = $detalle->iscompra;
        $issolicitudcompra = $detalle->issolicitudcompra;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $ordencompradetalle = $query->create( [
            'fkidordencompra' => $fkidordencompra,
            'fkidproducto' => $fkidproducto,
            'fkidsolicitudcompradetalle' => $fkidsolicitudcompradetalle,
            'fkidsolicitudcompra' => $fkidsolicitudcompra,
            'fkidproveedor' => $fkidproveedor,
            'fkidsucursal' => $fkidsucursal,
            'fkidalmacen' => $fkidalmacen,
            'fkidseccioninventario' => $fkidseccioninventario,

            'nota' => $nota,
            'fechasolicitada' => $fechasolicitada,
            'fechavencimiento' => $fechavencimiento,

            'stockactual' => $stockactual,
            'cantidad' => $cantidad,
            'cantidadsolicitada' => $cantidadsolicitada,

            'descuento' => $descuento,
            'montodescuento' => $montodescuento,

            'costobase' => $costobase,
            'costounitario' => $costounitario,
            'costosubtotal' => $costosubtotal,

            'peso' => $peso,
            'pesosubtotal' => $pesosubtotal,

            'volumen' => $volumen,
            'volumensubtotal' => $volumensubtotal,

            'iscompra' => $iscompra,
            'issolicitudcompra' => $issolicitudcompra,

            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $ordencompradetalle;
    }

    public function upgrade( $query, $detalle ) {
        $idordencompradetalle = $detalle->idordencompradetalle;

        $fkidordencompra = $detalle->fkidordencompra;
        $fkidproducto = $detalle->fkidproducto;
        $fkidsolicitudcompradetalle = $detalle->fkidsolicitudcompradetalle;
        $fkidsolicitudcompra = $detalle->fkidsolicitudcompra;
        $fkidproveedor = $detalle->fkidproveedor;
        $fkidsucursal = $detalle->fkidsucursal;
        $fkidalmacen = $detalle->fkidalmacen;
        $fkidseccioninventario = $detalle->fkidseccioninventario;

        $nota = isset( $detalle->nota ) ? $detalle->nota : null;
        $fechasolicitada = isset( $detalle->fechasolicitada ) ? $detalle->fechasolicitada : null;
        $fechavencimiento = isset( $detalle->fechavencimiento ) ? $detalle->fechavencimiento : null;

        $stockactual = isset( $detalle->stockactual ) ? $detalle->stockactual : 0;
        $cantidad = isset( $detalle->cantidad ) ? $detalle->cantidad : 0;
        $cantidadsolicitada = is_numeric( $detalle->cantidadsolicitada ) ? $detalle->cantidadsolicitada : 0;

        $costobase = is_numeric( $detalle->costobase )  ? $detalle->costobase : 0;
        $costounitario = is_numeric( $detalle->costounitario )  ? $detalle->costounitario : 0;
        $costosubtotal = is_numeric( $detalle->costosubtotal )  ? $detalle->costosubtotal : 0;

        $descuento = is_numeric( $detalle->descuento )  ? $detalle->descuento : 0;
        $montodescuento = is_numeric( $detalle->montodescuento )  ? $detalle->montodescuento : 0;

        $peso = is_numeric( $detalle->peso )  ? $detalle->peso : 0;
        $pesosubtotal = is_numeric( $detalle->pesosubtotal )  ? $detalle->pesosubtotal : 0;

        $volumen = is_numeric( $detalle->volumen )  ? $detalle->volumen : 0;
        $volumensubtotal = is_numeric( $detalle->volumensubtotal )  ? $detalle->volumensubtotal : 0;

        $iscompra = $detalle->iscompra;
        $issolicitudcompra = $detalle->issolicitudcompra;

        $ordencompradetalle = $query->where( 'idordencompradetalle', '=', $idordencompradetalle )
            ->update( [
                'fkidordencompra' => $fkidordencompra,
                'fkidproducto' => $fkidproducto,
                'fkidsolicitudcompradetalle' => $fkidsolicitudcompradetalle,
                'fkidsolicitudcompra' => $fkidsolicitudcompra,
                'fkidproveedor' => $fkidproveedor,
                'fkidsucursal' => $fkidsucursal,
                'fkidalmacen' => $fkidalmacen,
                'fkidseccioninventario' => $fkidseccioninventario,

                'nota' => $nota,
                'fechasolicitada' => $fechasolicitada,
                'fechavencimiento' => $fechavencimiento,

                'stockactual' => $stockactual,
                'cantidad' => $cantidad,
                'cantidadsolicitada' => $cantidadsolicitada,

                'descuento' => $descuento,
                'montodescuento' => $montodescuento,

                'costobase' => $costobase,
                'costounitario' => $costounitario,
                'costosubtotal' => $costosubtotal,

                'peso' => $peso,
                'pesosubtotal' => $pesosubtotal,

                'volumen' => $volumen,
                'volumensubtotal' => $volumensubtotal,

                'iscompra' => $iscompra,
                'issolicitudcompra' => $issolicitudcompra,
            ] );

        return $ordencompradetalle;
    }

}
