<?php

namespace App\Models\Comercio\Compra;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class NotaCompra extends Model
{
    use SoftDeletes;

    protected $table      = 'notacompra';
    protected $primaryKey = 'idnotacompra';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'estado' => 'A', 'isdelete' => 'A', 'fkidordencompra' => null,
        'codigo' => null, 'nrorefprov' => null, 'impuesto' => 0, 'tipocambio' => 0, 'tipomoneda' => 'N',
        'fechavencimiento' => null, 'diascredito' => 0, 'esingresado' => 'N', 'impuestototal' => 0,
        'cantidadtotal' => 0, 'montosubtotal' => 0, 'descuento' => 0, 'montodescuento' => 0, 'montototal' => 0,
        'fletes' => 0, 'internacion' => 0, 'otrosgastos' => 0, 'nrocajastotal' => 0, 'volumentotal' => 0, 'pesototal' => 0,
        'nota' => null, 'tipocompra' => 'L', 'issolicitudcompra' => 'N', 'isordencompra' => 'N', 'isdevolucioncompra' => 'N'
    ];

    protected $fillable = [
        'fkidordencompra', 'fkidsucursal', 'fkidalmacen', 'fkidconceptocompra', 'fkidproveedor', 'fkidmoneda', 'fkidtipotransaccion',
        'codigo', 'nrorefprov', 'impuesto', 'tipocambio', 'tipomoneda', 'fechanotacompra', 'fechavencimiento', 'diascredito',
        'cantidadtotal', 'montosubtotal', 'descuento', 'montodescuento', 'montototal', 'impuestototal',
        'fletes', 'internacion', 'otrosgastos', 'nrocajastotal', 'volumentotal', 'pesototal', 'nota', 'esingresado',
        'tipocompra', 'issolicitudcompra', 'isordencompra', 'isdevolucioncompra', 'iscompra', 'estado', 'fecha', 'hora', 'isdelete',
    ];

    public function arraynotacompradetalle() {
        return $this->hasMany(
            'App\Models\Comercio\Compra\NotaCompraDetalle',
            'fkidnotacompra',
            'idnotacompra'
        );
    }

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'notacompra.idnotacompra';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $notacompra = $query
            ->leftJoin('librocompra as libcomp', 'notacompra.idnotacompra', '=', 'libcomp.fkidnotacompra')
            ->leftJoin('sucursal as sucu', 'notacompra.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'notacompra.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptocompra as concepcomp', 'notacompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
            ->leftJoin('proveedor as prov', 'notacompra.fkidproveedor', '=', 'prov.idproveedor')
            ->leftJoin('moneda as mon', 'notacompra.fkidmoneda', '=', 'mon.idmoneda')
            ->leftJoin('ordencompra as ordcomp', 'notacompra.fkidordencompra', '=', 'ordcomp.idordencompra')
            ->select( [
                'notacompra.idnotacompra', 'notacompra.codigo', 'notacompra.nrorefprov', 'notacompra.tipocambio', 'notacompra.impuestototal', 'notacompra.fkidtipotransaccion',
                'notacompra.tipomoneda', 'notacompra.impuesto', 'notacompra.fechanotacompra', 'notacompra.fechavencimiento', 'notacompra.diascredito',
                'notacompra.cantidadtotal', 'notacompra.montosubtotal', 'notacompra.descuento', 'notacompra.montodescuento', 'notacompra.montototal',
                'notacompra.fletes', 'notacompra.internacion', 'notacompra.otrosgastos', 'notacompra.nrocajastotal',
                'notacompra.volumentotal', 'notacompra.pesototal', 'notacompra.esingresado', 'notacompra.nota', 'notacompra.fkidordencompra',
                'notacompra.tipocompra', 'notacompra.isdevolucioncompra', 'notacompra.isordencompra', 'notacompra.issolicitudcompra',
                'notacompra.fkidsucursal', 'sucu.descripcion as sucursal',
                'notacompra.fkidalmacen', 'alm.descripcion as almacen',
                'notacompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                'notacompra.fkidproveedor', 'prov.nombre as proveedor',
                'notacompra.fkidmoneda', 'mon.descripcion as moneda',
                'notacompra.estado', 'notacompra.isdelete', 'notacompra.fecha', 'notacompra.hora',
                'libcomp.fechafactura', 'libcomp.nrofactura', 'libcomp.nombrerazonsocial', 'libcomp.nitproveedor',
                'libcomp.nroautorizacion', 'libcomp.codigocontrol'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('notacompra.idnotacompra', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('notacompra.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'arraynotacompradetalle' => function( $query ) {
                $query
                    ->leftJoin('sucursal as suc', 'notacompradetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'notacompradetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('seccioninventario as seccinv', 'notacompradetalle.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
                    ->leftJoin('proveedor as provdor', 'notacompradetalle.fkidproveedor', '=', 'provdor.idproveedor')
                    ->leftJoin('producto as prod', 'notacompradetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'notacompradetalle.idnotacompradetalle', 'notacompradetalle.fkidnotacompra', 'notacompradetalle.fkidordencompra', 'notacompradetalle.fkidordencompradetalle',
                        'notacompradetalle.fkidsolicitudcompra', 'notacompradetalle.fkidsolicitudcompradetalle', 'notacompradetalle.cantidad', 'notacompradetalle.cantidadsolicitada',
                        'notacompradetalle.cantidadrecibida', 'notacompradetalle.cantidadfaltante','notacompradetalle.cantidadsobrante', 'notacompradetalle.nota',
                        'notacompradetalle.nrocajas', 'notacompradetalle.costobase', 'notacompradetalle.costounitario', 'notacompradetalle.costosubtotal',
                        'notacompradetalle.peso', 'notacompradetalle.pesosubtotal', 'notacompradetalle.volumen', 'notacompradetalle.volumensubtotal', 'notacompradetalle.montodescuento',
                        'notacompradetalle.isdevolucioncompra', 'notacompradetalle.isordencompra', 'notacompradetalle.issolicitudcompra', 'notacompradetalle.descuento', 
                        'notacompradetalle.fechavencimiento', 'notacompradetalle.nrolote', 'notacompradetalle.nrofabrica', 'notacompradetalle.estado', 'notacompradetalle.fkidalmacenproductodetalle',

                        'notacompradetalle.fkidsucursal', 'suc.descripcion as sucursal',
                        'notacompradetalle.fkidalmacen', 'alm.descripcion as almacen',
                        'notacompradetalle.fkidseccioninventario', 'seccinv.descripcion as seccioninventario',
                        'notacompradetalle.fkidproveedor', 'provdor.nombre as proveedor', 'provdor.nit as nitproveedor',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'notacompradetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',

                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',
                    ] )
                    ->orderBy('notacompradetalle.idnotacompradetalle');
            } ] )
            ->whereNull( 'notacompra.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $notacompra;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'notacompra.idnotacompra';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $notacompra = $query
            ->leftJoin('librocompra as libcomp', 'notacompra.idnotacompra', '=', 'libcomp.fkidnotacompra')
            ->leftJoin('sucursal as sucu', 'notacompra.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'notacompra.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptocompra as concepcomp', 'notacompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
            ->leftJoin('proveedor as prov', 'notacompra.fkidproveedor', '=', 'prov.idproveedor')
            ->leftJoin('moneda as mon', 'notacompra.fkidmoneda', '=', 'mon.idmoneda')
            ->leftJoin('ordencompra as ordcomp', 'notacompra.fkidordencompra', '=', 'ordcomp.idordencompra')
            ->select( [
                'notacompra.idnotacompra', 'notacompra.codigo', 'notacompra.nrorefprov', 'notacompra.tipocambio', 'notacompra.impuestototal', 'notacompra.fkidtipotransaccion',
                'notacompra.tipomoneda', 'notacompra.impuesto', 'notacompra.fechanotacompra', 'notacompra.fechavencimiento', 'notacompra.diascredito',
                'notacompra.cantidadtotal', 'notacompra.montosubtotal', 'notacompra.descuento', 'notacompra.montodescuento', 'notacompra.montototal',
                'notacompra.fletes', 'notacompra.internacion', 'notacompra.otrosgastos', 'notacompra.nrocajastotal',
                'notacompra.volumentotal', 'notacompra.pesototal', 'notacompra.esingresado', 'notacompra.nota', 'notacompra.fkidordencompra',
                'notacompra.tipocompra', 'notacompra.isdevolucioncompra', 'notacompra.isordencompra', 'notacompra.issolicitudcompra',
                'notacompra.fkidsucursal', 'sucu.descripcion as sucursal',
                'notacompra.fkidalmacen', 'alm.descripcion as almacen',
                'notacompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                'notacompra.fkidproveedor', 'prov.nombre as proveedor',
                'notacompra.fkidmoneda', 'mon.descripcion as moneda',
                'notacompra.estado', 'notacompra.isdelete', 'notacompra.fecha', 'notacompra.hora',
                'libcomp.fechafactura', 'libcomp.nrofactura', 'libcomp.nombrerazonsocial', 'libcomp.nitproveedor',
                'libcomp.nroautorizacion', 'libcomp.codigocontrol'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('notacompra.idnotacompra', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('notacompra.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'arraynotacompradetalle' => function( $query ) {
                $query
                    ->leftJoin('sucursal as suc', 'notacompradetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'notacompradetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('seccioninventario as seccinv', 'notacompradetalle.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
                    ->leftJoin('proveedor as provdor', 'notacompradetalle.fkidproveedor', '=', 'provdor.idproveedor')
                    ->leftJoin('producto as prod', 'notacompradetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'notacompradetalle.idnotacompradetalle', 'notacompradetalle.fkidnotacompra', 'notacompradetalle.fkidordencompra', 'notacompradetalle.fkidordencompradetalle',
                        'notacompradetalle.fkidsolicitudcompra', 'notacompradetalle.fkidsolicitudcompradetalle', 'notacompradetalle.cantidad', 'notacompradetalle.cantidadsolicitada',
                        'notacompradetalle.cantidadrecibida', 'notacompradetalle.cantidadfaltante','notacompradetalle.cantidadsobrante', 'notacompradetalle.nota',
                        'notacompradetalle.nrocajas', 'notacompradetalle.costobase', 'notacompradetalle.costounitario', 'notacompradetalle.costosubtotal',
                        'notacompradetalle.peso', 'notacompradetalle.pesosubtotal', 'notacompradetalle.volumen', 'notacompradetalle.volumensubtotal', 'notacompradetalle.montodescuento',
                        'notacompradetalle.isdevolucioncompra', 'notacompradetalle.isordencompra', 'notacompradetalle.issolicitudcompra', 'notacompradetalle.descuento', 
                        'notacompradetalle.fechavencimiento', 'notacompradetalle.nrolote', 'notacompradetalle.nrofabrica', 'notacompradetalle.estado', 'notacompradetalle.fkidalmacenproductodetalle',

                        'notacompradetalle.fkidsucursal', 'suc.descripcion as sucursal',
                        'notacompradetalle.fkidalmacen', 'alm.descripcion as almacen',
                        'notacompradetalle.fkidseccioninventario', 'seccinv.descripcion as seccioninventario',
                        'notacompradetalle.fkidproveedor', 'provdor.nombre as proveedor', 'provdor.nit as nitproveedor',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'notacompradetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',

                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',
                    ] )
                    ->orderBy('notacompradetalle.idnotacompradetalle');
            } ] )
            ->whereNull( 'notacompra.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $notacompra;
    }

    public function newID( )
    {
        $notacompra = DB::table('notacompra')
            ->select('notacompra.idnotacompra')
            ->orderBy('notacompra.idnotacompra', 'DESC')
            ->first();

        return ( is_null( $notacompra ) ) ? 1 : intval( $notacompra->idnotacompra ) + 1;
    }

    public function store( $query, $request )
    {
        $fkidsucursal       = isset( $request->fkidsucursal )        ? $request->fkidsucursal : null;
        $fkidalmacen        = isset( $request->fkidalmacen )         ? $request->fkidalmacen : null;
        $fkidconceptocompra = isset( $request->fkidconceptocompra )  ? $request->fkidconceptocompra : null;
        $fkidproveedor      = isset( $request->fkidproveedor )       ? $request->fkidproveedor : null;
        $fkidmoneda         = isset( $request->fkidmoneda )          ? $request->fkidmoneda : null;
        $fkidordencompra    = isset( $request->fkidordencompra )   ? $request->fkidordencompra : null;
        $fkidtipotransaccion = isset( $request->fkidtipotransaccion ) ? $request->fkidtipotransaccion : null;

        $nrorefprov  = isset( $request->nrorefprov )  ? $request->nrorefprov : null;
        $codigo      = isset( $request->codigo )      ? $request->codigo : null;
        $tipocambio  = isset( $request->tipocambio )  ? $request->tipocambio : null;
        $tipomoneda  = isset( $request->tipomoneda )  ? $request->tipomoneda : null;
        $impuesto    = isset( $request->impuesto )    ? $request->impuesto : null;

        $diascredito      = isset( $request->diascredito )      ? $request->diascredito : null;
        $fechanotacompra  = isset( $request->fechanotacompra )  ? $request->fechanotacompra : null;
        $fechavencimiento = isset( $request->fechavencimiento ) ? $request->fechavencimiento : null;

        $cantidadtotal   = isset( $request->cantidadtotal ) ? $request->cantidadtotal : null;
        $montosubtotal   = isset( $request->montosubtotal ) ? $request->montosubtotal : null;
        $descuento       = isset( $request->descuento ) ? $request->descuento : null;
        $montodescuento  = isset( $request->montodescuento ) ? $request->montodescuento : null;
        $montototal      = isset( $request->montototal ) ? $request->montototal : null;
        $impuestototal   = isset( $request->impuestototal ) ? $request->impuestototal : null;

        $fletes      = isset( $request->fletes ) ? $request->fletes : null;
        $internacion = isset( $request->internacion ) ? $request->internacion : null;
        $otrosgastos = isset( $request->otrosgastos ) ? $request->otrosgastos : null;
        $nrocajastotal = isset( $request->nrocajastotal ) ? $request->nrocajastotal : null;
        $volumentotal = isset( $request->volumentotal ) ? $request->volumentotal : null;
        $pesototal = isset( $request->pesototal ) ? $request->pesototal : null;

        $isdevolucioncompra = isset( $request->isdevolucioncompra ) ? $request->isdevolucioncompra : "N";
        $isordencompra = isset( $request->isordencompra ) ? $request->isordencompra : "N";
        $issolicitudcompra = isset( $request->issolicitudcompra ) ? $request->issolicitudcompra : "N";

        $nota            = isset( $request->nota ) ? $request->nota : null;
        $tipocompra   = isset( $request->tipocompra ) ? $request->tipocompra : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $notacompra = $query->create( [
            'fkidsucursal' => $fkidsucursal,
            'fkidalmacen'  => $fkidalmacen,
            'fkidconceptocompra' => $fkidconceptocompra,
            'fkidproveedor' => $fkidproveedor,
            'fkidmoneda'    => $fkidmoneda,
            'fkidordencompra' => $fkidordencompra,
            'fkidtipotransaccion' => $fkidtipotransaccion,

            'nrorefprov' => $nrorefprov,
            'codigo'     => $codigo,
            'tipocambio' => $tipocambio,
            'tipomoneda' => $tipomoneda,
            'impuesto'   => $impuesto,

            'diascredito'       => $diascredito,
            'fechanotacompra' => $fechanotacompra,
            'fechavencimiento' => $fechavencimiento,

            'cantidadtotal' => $cantidadtotal,
            'montototal'    => $montototal,
            'impuestototal' => $impuestototal,
            'montosubtotal' => $montosubtotal,
            'descuento' => $descuento,
            'montodescuento' => $montodescuento,

            'fletes'      => $fletes,
            'internacion' => $internacion,
            'otrosgastos' => $otrosgastos,
            'nrocajastotal' => $nrocajastotal,
            'volumentotal' => $volumentotal,
            'pesototal' => $pesototal,

            'isdevolucioncompra' => $isdevolucioncompra,
            'isordencompra' => $isordencompra,
            'issolicitudcompra' => $issolicitudcompra,

            'nota'       => $nota,
            'tipocompra' => $tipocompra,

            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $notacompra;
    }

    public function show( $query, $idnotacompra ) {

        $notacompra = $query
            ->leftJoin('librocompra as libcomp', 'notacompra.idnotacompra', '=', 'libcomp.fkidnotacompra')
            ->leftJoin('sucursal as sucu', 'notacompra.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'notacompra.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptocompra as concepcomp', 'notacompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
            ->leftJoin('proveedor as prov', 'notacompra.fkidproveedor', '=', 'prov.idproveedor')
            ->leftJoin('moneda as mon', 'notacompra.fkidmoneda', '=', 'mon.idmoneda')
            ->leftJoin('ordencompra as ordcomp', 'notacompra.fkidordencompra', '=', 'ordcomp.idordencompra')
            ->select( [
                'notacompra.idnotacompra', 'notacompra.codigo', 'notacompra.nrorefprov', 'notacompra.tipocambio', 'notacompra.impuestototal', 'notacompra.fkidtipotransaccion',
                'notacompra.tipomoneda', 'notacompra.impuesto', 'notacompra.fechanotacompra', 'notacompra.fechavencimiento', 'notacompra.diascredito',
                'notacompra.cantidadtotal', 'notacompra.montosubtotal', 'notacompra.descuento', 'notacompra.montodescuento', 'notacompra.montototal',
                'notacompra.fletes', 'notacompra.internacion', 'notacompra.otrosgastos', 'notacompra.nrocajastotal',
                'notacompra.volumentotal', 'notacompra.pesototal', 'notacompra.esingresado', 'notacompra.nota', 'notacompra.fkidordencompra',
                'notacompra.tipocompra', 'notacompra.isdevolucioncompra', 'notacompra.isordencompra', 'notacompra.issolicitudcompra',
                'notacompra.fkidsucursal', 'sucu.descripcion as sucursal',
                'notacompra.fkidalmacen', 'alm.descripcion as almacen',
                'notacompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                'notacompra.fkidproveedor', 'prov.nombre as proveedor',
                'notacompra.fkidmoneda', 'mon.descripcion as moneda',
                'notacompra.estado', 'notacompra.isdelete', 'notacompra.fecha', 'notacompra.hora',
                'libcomp.fechafactura', 'libcomp.nrofactura', 'libcomp.nombrerazonsocial', 'libcomp.nitproveedor',
                'libcomp.nroautorizacion', 'libcomp.codigocontrol'
            ] )
            ->where( 'notacompra.idnotacompra', '=', $idnotacompra )
            ->with( [ 'arraynotacompradetalle' => function( $query ) {
                $query
                    ->leftJoin('sucursal as suc', 'notacompradetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'notacompradetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('seccioninventario as seccinv', 'notacompradetalle.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
                    ->leftJoin('proveedor as provdor', 'notacompradetalle.fkidproveedor', '=', 'provdor.idproveedor')
                    ->leftJoin('producto as prod', 'notacompradetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'notacompradetalle.idnotacompradetalle', 'notacompradetalle.fkidnotacompra', 'notacompradetalle.fkidordencompra', 'notacompradetalle.fkidordencompradetalle',
                        'notacompradetalle.fkidsolicitudcompra', 'notacompradetalle.fkidsolicitudcompradetalle', 'notacompradetalle.cantidad', 'notacompradetalle.cantidadsolicitada',
                        'notacompradetalle.cantidadrecibida', 'notacompradetalle.cantidadfaltante','notacompradetalle.cantidadsobrante', 'notacompradetalle.nota',
                        'notacompradetalle.nrocajas', 'notacompradetalle.costobase', 'notacompradetalle.costounitario', 'notacompradetalle.costosubtotal',
                        'notacompradetalle.peso', 'notacompradetalle.pesosubtotal', 'notacompradetalle.volumen', 'notacompradetalle.volumensubtotal', 'notacompradetalle.montodescuento',
                        'notacompradetalle.isdevolucioncompra', 'notacompradetalle.isordencompra', 'notacompradetalle.issolicitudcompra', 'notacompradetalle.descuento', 
                        'notacompradetalle.fechavencimiento', 'notacompradetalle.nrolote', 'notacompradetalle.nrofabrica', 'notacompradetalle.estado', 'notacompradetalle.fkidalmacenproductodetalle',

                        'notacompradetalle.fkidsucursal', 'suc.descripcion as sucursal',
                        'notacompradetalle.fkidalmacen', 'alm.descripcion as almacen',
                        'notacompradetalle.fkidseccioninventario', 'seccinv.descripcion as seccioninventario',
                        'notacompradetalle.fkidproveedor', 'provdor.nombre as proveedor', 'provdor.nit as nitproveedor',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'notacompradetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',

                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',
                    ] )
                    ->orderBy('notacompradetalle.idnotacompradetalle');
            } ] )
            ->whereNull('notacompra.deleted_at')
            ->orderBy('notacompra.idnotacompra', 'DESC')
            ->first();

        return $notacompra;
    }

    public function scopeEnable( $query, $request )
    {
        $idnotacompra = $request->idnotacompra;
        $query->where('idnotacompra', '=', $idnotacompra)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idnotacompra = $request->idnotacompra;
        $query->where('idnotacompra', '=', $idnotacompra)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idnotacompra = $request->idnotacompra;
        return $query->where('idnotacompra', '=', $idnotacompra)->delete();
    }

    public function searchByID( $query, $idnotacompra ) {
        $notacompra = $query
            ->leftJoin('librocompra as libcomp', 'notacompra.idnotacompra', '=', 'libcomp.fkidnotacompra')
            ->leftJoin('sucursal as sucu', 'notacompra.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'notacompra.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptocompra as concepcomp', 'notacompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
            ->leftJoin('proveedor as prov', 'notacompra.fkidproveedor', '=', 'prov.idproveedor')
            ->leftJoin('moneda as mon', 'notacompra.fkidmoneda', '=', 'mon.idmoneda')
            ->leftJoin('ordencompra as ordcomp', 'notacompra.fkidordencompra', '=', 'ordcomp.idordencompra')
            ->select( [
                'notacompra.idnotacompra', 'notacompra.codigo', 'notacompra.nrorefprov', 'notacompra.tipocambio', 'notacompra.impuestototal', 'notacompra.fkidtipotransaccion',
                'notacompra.tipomoneda', 'notacompra.impuesto', 'notacompra.fechanotacompra', 'notacompra.fechavencimiento', 'notacompra.diascredito',
                'notacompra.cantidadtotal', 'notacompra.montosubtotal', 'notacompra.descuento', 'notacompra.montodescuento', 'notacompra.montototal',
                'notacompra.fletes', 'notacompra.internacion', 'notacompra.otrosgastos', 'notacompra.nrocajastotal',
                'notacompra.volumentotal', 'notacompra.pesototal', 'notacompra.esingresado', 'notacompra.nota', 'notacompra.fkidordencompra',
                'notacompra.tipocompra', 'notacompra.isdevolucioncompra', 'notacompra.isordencompra', 'notacompra.issolicitudcompra',
                'notacompra.fkidsucursal', 'sucu.descripcion as sucursal',
                'notacompra.fkidalmacen', 'alm.descripcion as almacen',
                'notacompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                'notacompra.fkidproveedor', 'prov.nombre as proveedor',
                'notacompra.fkidmoneda', 'mon.descripcion as moneda',
                'notacompra.estado', 'notacompra.isdelete', 'notacompra.fecha', 'notacompra.hora',
                'libcomp.fechafactura', 'libcomp.nrofactura', 'libcomp.nombrerazonsocial', 'libcomp.nitproveedor',
                'libcomp.nroautorizacion', 'libcomp.codigocontrol'
            ] )
            ->where( 'notacompra.idnotacompra', '=', $idnotacompra )
            ->with( [ 'arraynotacompradetalle' => function( $query ) {
                $query
                    ->leftJoin('sucursal as suc', 'notacompradetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'notacompradetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('seccioninventario as seccinv', 'notacompradetalle.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
                    ->leftJoin('proveedor as provdor', 'notacompradetalle.fkidproveedor', '=', 'provdor.idproveedor')
                    ->leftJoin('producto as prod', 'notacompradetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'notacompradetalle.idnotacompradetalle', 'notacompradetalle.fkidnotacompra', 'notacompradetalle.fkidordencompra', 'notacompradetalle.fkidordencompradetalle',
                        'notacompradetalle.fkidsolicitudcompra', 'notacompradetalle.fkidsolicitudcompradetalle', 'notacompradetalle.cantidad', 'notacompradetalle.cantidadsolicitada',
                        'notacompradetalle.cantidadrecibida', 'notacompradetalle.cantidadfaltante','notacompradetalle.cantidadsobrante', 'notacompradetalle.nota',
                        'notacompradetalle.nrocajas', 'notacompradetalle.costobase', 'notacompradetalle.costounitario', 'notacompradetalle.costosubtotal',
                        'notacompradetalle.peso', 'notacompradetalle.pesosubtotal', 'notacompradetalle.volumen', 'notacompradetalle.volumensubtotal', 'notacompradetalle.montodescuento',
                        'notacompradetalle.isdevolucioncompra', 'notacompradetalle.isordencompra', 'notacompradetalle.issolicitudcompra', 'notacompradetalle.descuento', 
                        'notacompradetalle.fechavencimiento', 'notacompradetalle.nrolote', 'notacompradetalle.nrofabrica', 'notacompradetalle.estado', 'notacompradetalle.fkidalmacenproductodetalle',

                        'notacompradetalle.fkidsucursal', 'suc.descripcion as sucursal',
                        'notacompradetalle.fkidalmacen', 'alm.descripcion as almacen',
                        'notacompradetalle.fkidseccioninventario', 'seccinv.descripcion as seccioninventario',
                        'notacompradetalle.fkidproveedor', 'provdor.nombre as proveedor', 'provdor.nit as nitproveedor',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'notacompradetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',

                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',
                    ] )
                    ->orderBy('notacompradetalle.idnotacompradetalle');
            } ] )
            ->whereNull('notacompra.deleted_at')
            ->orderBy('notacompra.idnotacompra', 'DESC')
            ->first();

        return $notacompra;
    }

    public function existsOrdenCompra( $query, $fkidordencompra ) {
        $notacompra = $query
            ->where('notacompra.fkidordencompra', '=', $fkidordencompra)
            ->whereNull('notacompra.deleted_at')
            ->orderBy('notacompra.idnotacompra')
            ->get();

        return ( sizeof( $notacompra ) > 0 );
    }

    public function tieneProveedor( $query, $idproveedor ) {

        $notacompra = $query
            ->where( 'notacompra.fkidproveedor', '=', $idproveedor )
            ->whereNull('notacompra.deleted_at')
            ->get();

        return ( sizeof( $notacompra ) > 0 );
    }

    public function tieneConceptoCompra( $query, $idconceptocompra ) {

        $notacompra = $query
            ->where( 'notacompra.fkidconceptocompra', '=', $idconceptocompra )
            ->whereNull('notacompra.deleted_at')
            ->get();

        return ( sizeof( $notacompra ) > 0 );
    }

}
