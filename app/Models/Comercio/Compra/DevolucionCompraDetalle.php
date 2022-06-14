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
        'fkidnotacompra' => null, 'fkidnotacompradetalle' => null, 'fkidordencompra' => null, 'fkidordencompradetalle' => null,
        'fkidsolicitudcompra' => null, 'fkidsolicitudcompradetalle' => null,
        'estado' => 'A',  'isdelete' => 'A', 'cantidad' => 0, 'costobase' => 0, 'costounitario' => 0, 'costosubtotal' => 0,
        'cantidadcomprada' => 0, 'fechavencimiento' => null, 'nrolote' => 0, 'nrofabrica' => 0, 'descuento' => 0, 'montodescuento' => 0,
        'peso' => 0, 'pesosubtotal' => 0, 'volumen' => 0, 'volumensubtotal' => 0, 'nota' => null,
        'isnotacompra' => 'N', 'isordencompra' => 'N', 'issolicitudcompra' => 'N',
    ];

    protected $fillable = [ 
        'fkiddevolucioncompra', 'fkidalmacenproductodetalle', 'fkidproducto', 'fkidnotacompra', 'fkidnotacompradetalle',
        'fkidordencompra', 'fkidordencompradetalle', 'fkidsolicitudcompra', 'fkidsolicitudcompradetalle', 
        'fkidsucursal', 'fkidalmacen', 'fkidproveedor', 'fkidseccioninventario',
        'cantidadcomprada', 'cantidad', 'costobase', 'costounitario', 'costosubtotal', 'descuento', 'montodescuento',
        'peso', 'pesosubtotal', 'volumen', 'volumensubtotal', 'nota', 'fechavencimiento', 'nrolote', 'nrofabrica',
        'isnotacompra', 'isordencompra', 'issolicitudcompra', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function getDevolucionCompraDetalle( $query, $fkiddevolucioncompra ) {
        $arraydevolucioncompradetalle = $query
            ->select( [
                'devolucioncompradetalle.fkiddevolucioncompra', 'devolucioncompradetalle.fkidalmacenproductodetalle', 'devolucioncompradetalle.fkidproducto', 
                'devolucioncompradetalle.fkidnotacompra', 'devolucioncompradetalle.fkidnotacompradetalle', 'devolucioncompradetalle.iddevolucioncompradetalle',
                'devolucioncompradetalle.fkidordencompra', 'devolucioncompradetalle.fkidordencompradetalle', 
                'devolucioncompradetalle.fkidsolicitudcompra', 'devolucioncompradetalle.fkidsolicitudcompradetalle', 
                'devolucioncompradetalle.fkidsucursal', 'devolucioncompradetalle.fkidalmacen', 'devolucioncompradetalle.fkidproveedor', 'devolucioncompradetalle.fkidseccioninventario',
                'devolucioncompradetalle.cantidadcomprada', 'devolucioncompradetalle.cantidad', 
                'devolucioncompradetalle.costobase', 'devolucioncompradetalle.costounitario', 'devolucioncompradetalle.costosubtotal', 
                'devolucioncompradetalle.descuento', 'devolucioncompradetalle.montodescuento',
                'devolucioncompradetalle.peso', 'devolucioncompradetalle.pesosubtotal', 
                'devolucioncompradetalle.volumen', 'devolucioncompradetalle.volumensubtotal', 
                'devolucioncompradetalle.nota', 'devolucioncompradetalle.fechavencimiento', 'devolucioncompradetalle.nrolote', 'devolucioncompradetalle.nrofabrica',
                'devolucioncompradetalle.isnotacompra', 'devolucioncompradetalle.isordencompra', 'devolucioncompradetalle.issolicitudcompra', 
            ] )
            ->where('devolucioncompradetalle.fkiddevolucioncompra', '=', $fkiddevolucioncompra)
            ->whereNull('devolucioncompradetalle.deleted_at')
            ->orderBy('devolucioncompradetalle.iddevolucioncompradetalle')
            ->get();

        return $arraydevolucioncompradetalle;
    }

    public function store( $query, $request, $detalle )
    {
        $fkiddevolucioncompra = $detalle->fkiddevolucioncompra;
        $fkidproducto = $detalle->fkidproducto;
        $fkidalmacenproductodetalle = $detalle->fkidalmacenproductodetalle;
        
        $fkidnotacompra = $detalle->fkidnotacompra;
        $fkidnotacompradetalle = $detalle->fkidnotacompradetalle;

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

        $isnotacompra = isset( $detalle->isnotacompra ) ? $detalle->isnotacompra : "N";
        $isordencompra = isset( $detalle->isordencompra ) ? $detalle->isordencompra : "N";
        $issolicitudcompra = isset( $detalle->issolicitudcompra ) ? $detalle->issolicitudcompra : "N";

        $cantidad = isset( $detalle->cantidad ) ? $detalle->cantidad : 0;
        $cantidadcomprada = is_numeric( $detalle->cantidadcomprada ) ? $detalle->cantidadcomprada : 0;

        $nrolote = is_numeric( $detalle->nrolote ) ? $detalle->nrolote : 0;
        $nrofabrica = is_numeric( $detalle->nrofabrica ) ? $detalle->nrofabrica : 0;

        $costobase = is_numeric( $detalle->costobase )  ? $detalle->costobase : 0;
        $costounitario = is_numeric( $detalle->costounitario )  ? $detalle->costounitario : 0;
        $costosubtotal = is_numeric( $detalle->costosubtotal )  ? $detalle->costosubtotal : 0;

        $descuento = is_numeric( $detalle->descuento )  ? $detalle->descuento : 0;
        $montodescuento = is_numeric( $detalle->montodescuento )  ? $detalle->montodescuento : 0;

        $peso = is_numeric( $detalle->peso )  ? $detalle->peso : 0;
        $pesosubtotal = is_numeric( $detalle->pesosubtotal )  ? $detalle->pesosubtotal : 0;

        $volumen = is_numeric( $detalle->volumen )  ? $detalle->volumen : 0;
        $volumensubtotal = is_numeric( $detalle->volumensubtotal )  ? $detalle->volumensubtotal : 0;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $devolucioncompradetalle = $query->create( [
            'fkiddevolucioncompra' => $fkiddevolucioncompra,
            'fkidproducto' => $fkidproducto,
            'fkidalmacenproductodetalle' => $fkidalmacenproductodetalle,

            'fkidnotacompra' => $fkidnotacompra,
            'fkidnotacompradetalle' => $fkidnotacompradetalle,
            
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
            'cantidadcomprada' => $cantidadcomprada,

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

            'isnotacompra' => $isnotacompra,
            'isordencompra' => $isordencompra,
            'issolicitudcompra' => $issolicitudcompra,

            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $devolucioncompradetalle;
    }

    public function upgrade( $query, $detalle )
    {
        $iddevolucioncompradetalle = $detalle->iddevolucioncompradetalle;
        $fkiddevolucioncompra = $detalle->fkiddevolucioncompra;
        $fkidproducto = $detalle->fkidproducto;
        $fkidalmacenproductodetalle = $detalle->fkidalmacenproductodetalle;
        
        $fkidnotacompra = $detalle->fkidnotacompra;
        $fkidnotacompradetalle = $detalle->fkidnotacompradetalle;

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

        $isnotacompra = isset( $detalle->isnotacompra ) ? $detalle->isnotacompra : "N";
        $isordencompra = isset( $detalle->isordencompra ) ? $detalle->isordencompra : "N";
        $issolicitudcompra = isset( $detalle->issolicitudcompra ) ? $detalle->issolicitudcompra : "N";

        $cantidad = isset( $detalle->cantidad ) ? $detalle->cantidad : 0;
        $cantidadcomprada = is_numeric( $detalle->cantidadcomprada ) ? $detalle->cantidadcomprada : 0;

        $nrolote = is_numeric( $detalle->nrolote ) ? $detalle->nrolote : 0;
        $nrofabrica = is_numeric( $detalle->nrofabrica ) ? $detalle->nrofabrica : 0;

        $costobase = is_numeric( $detalle->costobase )  ? $detalle->costobase : 0;
        $costounitario = is_numeric( $detalle->costounitario )  ? $detalle->costounitario : 0;
        $costosubtotal = is_numeric( $detalle->costosubtotal )  ? $detalle->costosubtotal : 0;

        $descuento = is_numeric( $detalle->descuento )  ? $detalle->descuento : 0;
        $montodescuento = is_numeric( $detalle->montodescuento )  ? $detalle->montodescuento : 0;

        $peso = is_numeric( $detalle->peso )  ? $detalle->peso : 0;
        $pesosubtotal = is_numeric( $detalle->pesosubtotal )  ? $detalle->pesosubtotal : 0;

        $volumen = is_numeric( $detalle->volumen )  ? $detalle->volumen : 0;
        $volumensubtotal = is_numeric( $detalle->volumensubtotal )  ? $detalle->volumensubtotal : 0;

        $devolucioncompradetalle = $query->where('iddevolucioncompradetalle', '=', $iddevolucioncompradetalle)->update( [
            'fkiddevolucioncompra' => $fkiddevolucioncompra,
            'fkidproducto' => $fkidproducto,
            'fkidalmacenproductodetalle' => $fkidalmacenproductodetalle,

            'fkidnotacompra' => $fkidnotacompra,
            'fkidnotacompradetalle' => $fkidnotacompradetalle,
            
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
            'cantidadcomprada' => $cantidadcomprada,

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

            'isnotacompra' => $isnotacompra,
            'isordencompra' => $isordencompra,
            'issolicitudcompra' => $issolicitudcompra,
        ] );

        return $devolucioncompradetalle;
    }

}
