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
        'fkidordencompra', 'fkidsucursal', 'fkidalmacen', 'fkidconceptocompra', 'fkidproveedor', 'fkidmoneda',
        'codigo', 'nrorefprov', 'impuesto', 'tipocambio', 'tipomoneda', 'fechanotacompra', 'fechavencimiento', 'diascredito',
        'cantidadtotal', 'montosubtotal', 'descuento', 'montodescuento', 'montototal', 'impuestototal',
        'fletes', 'internacion', 'otrosgastos', 'nrocajastotal', 'volumentotal', 'pesototal', 'nota', 'esingresado',
        'tipocompra', 'issolicitudcompra', 'isordencompra', 'isdevolucioncompra', 'iscompra', 'estado', 'fecha', 'hora', 'isdelete',
    ];

    public function notacompradetalle() {
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
                'notacompra.idnotacompra', 'notacompra.codigo', 'notacompra.nrorefprov', 'notacompra.tipocambio', 'notacompra.impuestototal',
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
                        ->where('notacompra.idnotacompra', '=', $search)
                        ->orWhere('notacompra.codigo', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('notacompra.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'notacompradetalle' => function( $query ) {
                $query
                    ->leftJoin('unidadmedidaproducto as unidmedprod', 'notacompradetalle.fkidunidadmedidaproducto', '=', 'unidmedprod.idunidadmedidaproducto')
                    ->leftJoin('unidadmedida as unidmed', 'unidmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('producto as prod', 'unidmedprod.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->select( 
                        'notacompradetalle.idnotacompradetalle', 'notacompradetalle.fkidnotacompra', 'notacompradetalle.fkidordencompradetalle',
                        'notacompradetalle.fkidunidadmedidaproducto', 'notacompradetalle.cantidad', 'notacompradetalle.cantidadsolicitada', 
                        'notacompradetalle.cantidadrecibida', 'notacompradetalle.cantidadfaltante','notacompradetalle.cantidadsobrante', 'notacompradetalle.nota',
                        'notacompradetalle.nrocajas', 'notacompradetalle.costounitario', 'notacompradetalle.costosubtotal', 
                        'notacompradetalle.peso', 'notacompradetalle.pesosubtotal', 'notacompradetalle.volumen', 'notacompradetalle.volumensubtotal',
                        'notacompradetalle.isdevolucioncompra', 'notacompradetalle.isordencompra', 'notacompradetalle.issolicitudcompra', 
                        'notacompradetalle.fechavencimiento', 'notacompradetalle.nrolote', 'notacompradetalle.nrofabrica', 'notacompradetalle.estado',
                        'unidmedprod.stock', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida', 'unidmedprod.codigo',
                        'prod.idproducto', 'prod.nombre', 
                        'ciud.idciudad', 'ciud.descripcion as ciudadorigen',
                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca'
                    )
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
                'notacompra.idnotacompra', 'notacompra.codigo', 'notacompra.nrorefprov', 'notacompra.tipocambio', 'notacompra.impuestototal',
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
                        ->where('notacompra.idnotacompra', '=', $search)
                        ->orWhere('notacompra.codigo', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('notacompra.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'notacompradetalle' => function( $query ) {
                $query
                    ->leftJoin('unidadmedidaproducto as unidmedprod', 'notacompradetalle.fkidunidadmedidaproducto', '=', 'unidmedprod.idunidadmedidaproducto')
                    ->leftJoin('unidadmedida as unidmed', 'unidmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('producto as prod', 'unidmedprod.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->select( 
                        'notacompradetalle.idnotacompradetalle', 'notacompradetalle.fkidnotacompra', 'notacompradetalle.fkidordencompradetalle',
                        'notacompradetalle.fkidunidadmedidaproducto', 'notacompradetalle.cantidad', 'notacompradetalle.cantidadsolicitada', 
                        'notacompradetalle.cantidadrecibida', 'notacompradetalle.cantidadfaltante','notacompradetalle.cantidadsobrante', 'notacompradetalle.nota',
                        'notacompradetalle.nrocajas', 'notacompradetalle.costounitario', 'notacompradetalle.costosubtotal', 
                        'notacompradetalle.peso', 'notacompradetalle.pesosubtotal', 'notacompradetalle.volumen', 'notacompradetalle.volumensubtotal',
                        'notacompradetalle.isdevolucioncompra', 'notacompradetalle.isordencompra', 'notacompradetalle.issolicitudcompra', 
                        'notacompradetalle.fechavencimiento', 'notacompradetalle.nrolote', 'notacompradetalle.nrofabrica', 'notacompradetalle.estado',
                        'unidmedprod.stock', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida', 'unidmedprod.codigo',
                        'prod.idproducto', 'prod.nombre', 
                        'ciud.idciudad', 'ciud.descripcion as ciudadorigen',
                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca'
                    )
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
        $fkidsucursal       = isset( $request->fkidsucursal )          ? $request->fkidsucursal : null;
        $fkidalmacen        = isset( $request->fkidalmacen )           ? $request->fkidalmacen : null;
        $fkidconceptocompra = isset( $request->fkidconceptocompra )    ? $request->fkidconceptocompra : null;
        $fkidproveedor      = isset( $request->fkidproveedor )         ? $request->fkidproveedor : null;
        $fkidmoneda         = isset( $request->fkidmoneda )            ? $request->fkidmoneda : null;
        $fkidordencompra    = isset( $request->fkidordencompra )   ? $request->fkidordencompra : null;

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
                'notacompra.idnotacompra', 'notacompra.codigo', 'notacompra.nrorefprov', 'notacompra.tipocambio', 'notacompra.impuestototal',
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
            ->with( [ 'notacompradetalle' => function( $query ) {
                $query
                    ->leftJoin('unidadmedidaproducto as unidmedprod', 'notacompradetalle.fkidunidadmedidaproducto', '=', 'unidmedprod.idunidadmedidaproducto')
                    ->leftJoin('unidadmedida as unidmed', 'unidmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('producto as prod', 'unidmedprod.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->select( 
                        'notacompradetalle.idnotacompradetalle', 'notacompradetalle.fkidnotacompra', 'notacompradetalle.fkidordencompradetalle',
                        'notacompradetalle.fkidunidadmedidaproducto', 'notacompradetalle.cantidad', 'notacompradetalle.cantidadsolicitada', 
                        'notacompradetalle.cantidadrecibida', 'notacompradetalle.cantidadfaltante','notacompradetalle.cantidadsobrante', 'notacompradetalle.nota',
                        'notacompradetalle.nrocajas', 'notacompradetalle.costounitario', 'notacompradetalle.costosubtotal', 
                        'notacompradetalle.peso', 'notacompradetalle.pesosubtotal', 'notacompradetalle.volumen', 'notacompradetalle.volumensubtotal',
                        'notacompradetalle.isdevolucioncompra', 'notacompradetalle.isordencompra', 'notacompradetalle.issolicitudcompra', 
                        'notacompradetalle.fechavencimiento', 'notacompradetalle.nrolote', 'notacompradetalle.nrofabrica', 'notacompradetalle.estado',
                        'unidmedprod.stock', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida', 'unidmedprod.codigo',
                        'prod.idproducto', 'prod.nombre', 
                        'ciud.idciudad', 'ciud.descripcion as ciudadorigen',
                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca'
                    )
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
        $query->where('idnotacompra', '=', $idnotacompra)->delete();
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
                'notacompra.idnotacompra', 'notacompra.codigo', 'notacompra.nrorefprov', 'notacompra.tipocambio', 'notacompra.impuestototal',
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
            ->with( [ 'notacompradetalle' => function( $query ) {
                $query
                    ->leftJoin('unidadmedidaproducto as unidmedprod', 'notacompradetalle.fkidunidadmedidaproducto', '=', 'unidmedprod.idunidadmedidaproducto')
                    ->leftJoin('unidadmedida as unidmed', 'unidmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('producto as prod', 'unidmedprod.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->select( 
                        'notacompradetalle.idnotacompradetalle', 'notacompradetalle.fkidnotacompra', 'notacompradetalle.fkidordencompradetalle',
                        'notacompradetalle.fkidunidadmedidaproducto', 'notacompradetalle.cantidad', 'notacompradetalle.cantidadsolicitada', 
                        'notacompradetalle.cantidadrecibida', 'notacompradetalle.cantidadfaltante','notacompradetalle.cantidadsobrante', 'notacompradetalle.nota',
                        'notacompradetalle.nrocajas', 'notacompradetalle.costounitario', 'notacompradetalle.costosubtotal', 
                        'notacompradetalle.peso', 'notacompradetalle.pesosubtotal', 'notacompradetalle.volumen', 'notacompradetalle.volumensubtotal',
                        'notacompradetalle.isdevolucioncompra', 'notacompradetalle.isordencompra', 'notacompradetalle.issolicitudcompra', 
                        'notacompradetalle.fechavencimiento', 'notacompradetalle.nrolote', 'notacompradetalle.nrofabrica', 'notacompradetalle.estado',
                        'unidmedprod.stock', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida', 'unidmedprod.codigo',
                        'prod.idproducto', 'prod.nombre', 
                        'ciud.idciudad', 'ciud.descripcion as ciudadorigen',
                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca'
                    )
                    ->orderBy('notacompradetalle.idnotacompradetalle');
            } ] )
            ->whereNull('notacompra.deleted_at')
            ->orderBy('notacompra.idnotacompra', 'DESC')
            ->first();
        
        return $notacompra;
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