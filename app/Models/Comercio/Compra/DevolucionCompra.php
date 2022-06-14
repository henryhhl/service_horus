<?php

namespace App\Models\Comercio\Compra;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class DevolucionCompra extends Model
{
    use SoftDeletes;

    protected $table      = 'devolucioncompra';
    protected $primaryKey = 'iddevolucioncompra';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'estado' => 'A', 'isdelete' => 'A', 'fkidnotacompra' => null,
        'codigo' => null, 'nrofactura' => null, 'tipocambio' => 0, 'tipomoneda' => 'N',
        'cantidadtotal' => 0, 'montosubtotal' => 0, 'descuento' => 0, 'montodescuento' => 0, 'montototal' => 0,
        'nota' => null, 'tipocompra' => 'L', 'issolicitudcompra' => 'N', 'isordencompra' => 'N', 'isnotacompra' => 'N'
    ];

    protected $fillable = [
        'fkidnotacompra', 'fkidsucursal', 'fkidalmacen', 'fkidconceptocompra', 'fkidproveedor', 'fkidmoneda', 'fkidtipotransaccion',
        'codigo', 'nrofactura', 'tipocambio', 'tipomoneda', 'fechadevolucioncompra',
        'cantidadtotal', 'montosubtotal', 'descuento', 'montodescuento', 'montototal', 'nota',
        'tipocompra', 'issolicitudcompra', 'isordencompra', 'isnotacompra', 'estado', 'fecha', 'hora', 'isdelete',
    ];

    public function arraydevolucioncompradetalle() {
        return $this->hasMany(
            'App\Models\Comercio\Compra\DevolucionCompraDetalle',
            'fkiddevolucioncompra',
            'iddevolucioncompra'
        );
    }

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'devolucioncompra.iddevolucioncompra';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $devolucioncompra = $query
            ->leftJoin('sucursal as sucu', 'devolucioncompra.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'devolucioncompra.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptocompra as concepcomp', 'devolucioncompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
            ->leftJoin('proveedor as prov', 'devolucioncompra.fkidproveedor', '=', 'prov.idproveedor')
            ->leftJoin('moneda as mon', 'devolucioncompra.fkidmoneda', '=', 'mon.idmoneda')
            ->leftJoin('notacompra as notcomp', 'devolucioncompra.fkidnotacompra', '=', 'notcomp.idnotacompra')
            ->select( [
                'devolucioncompra.iddevolucioncompra', 'devolucioncompra.codigo', 'devolucioncompra.tipocambio', 'devolucioncompra.nrofactura',
                'devolucioncompra.tipomoneda', 'devolucioncompra.fechadevolucioncompra', 'devolucioncompra.tipocompra',
                'devolucioncompra.cantidadtotal', 'devolucioncompra.montosubtotal', 'devolucioncompra.descuento', 'devolucioncompra.montodescuento',
                'devolucioncompra.montototal', 'devolucioncompra.nota', 'devolucioncompra.fkidnotacompra',
                'devolucioncompra.isordencompra', 'devolucioncompra.isnotacompra', 'devolucioncompra.issolicitudcompra',
                'devolucioncompra.fkidsucursal', 'sucu.descripcion as sucursal',
                'devolucioncompra.fkidalmacen', 'alm.descripcion as almacen',
                'devolucioncompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                'devolucioncompra.fkidproveedor', 'prov.nombre as proveedor',
                'devolucioncompra.fkidmoneda', 'mon.descripcion as moneda',
                'devolucioncompra.estado', 'devolucioncompra.isdelete', 'devolucioncompra.fecha', 'devolucioncompra.hora',
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('devolucioncompra.iddevolucioncompra', '=', $search)
                        ->orWhere('devolucioncompra.codigo', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('devolucioncompra.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'arraydevolucioncompradetalle' => function( $query ) {
                $query

                    ->leftJoin('sucursal as suc', 'devolucioncompradetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'devolucioncompradetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('seccioninventario as seccinv', 'devolucioncompradetalle.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
                    ->leftJoin('proveedor as provdor', 'devolucioncompradetalle.fkidproveedor', '=', 'provdor.idproveedor')
                    ->leftJoin('producto as prod', 'devolucioncompradetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [

                        'devolucioncompradetalle.iddevolucioncompradetalle', 'devolucioncompradetalle.fkiddevolucioncompra', 'devolucioncompradetalle.fkidalmacenproductodetalle', 
                        'devolucioncompradetalle.fkidproducto', 'devolucioncompradetalle.fkidnotacompra', 'devolucioncompradetalle.fkidnotacompradetalle',
                        'devolucioncompradetalle.fkidordencompra', 'devolucioncompradetalle.fkidordencompradetalle', 
                        'devolucioncompradetalle.fkidsolicitudcompra', 'devolucioncompradetalle.fkidsolicitudcompradetalle', 
                        'devolucioncompradetalle.cantidadcomprada', 'devolucioncompradetalle.cantidad', 
                        'devolucioncompradetalle.costobase', 'devolucioncompradetalle.costounitario', 'devolucioncompradetalle.costosubtotal', 
                        'devolucioncompradetalle.descuento', 'devolucioncompradetalle.montodescuento',
                        'devolucioncompradetalle.peso', 'devolucioncompradetalle.pesosubtotal', 
                        'devolucioncompradetalle.volumen', 'devolucioncompradetalle.volumensubtotal', 
                        'devolucioncompradetalle.nota', 'devolucioncompradetalle.fechavencimiento', 'devolucioncompradetalle.nrolote', 'devolucioncompradetalle.nrofabrica',
                        'devolucioncompradetalle.isnotacompra', 'devolucioncompradetalle.isordencompra', 'devolucioncompradetalle.issolicitudcompra',

                        'devolucioncompradetalle.fkidsucursal', 'suc.descripcion as sucursal',
                        'devolucioncompradetalle.fkidalmacen', 'alm.descripcion as almacen',
                        'devolucioncompradetalle.fkidseccioninventario', 'seccinv.descripcion as seccioninventario',
                        'devolucioncompradetalle.fkidproveedor', 'provdor.nombre as proveedor', 'provdor.nit as nitproveedor',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'devolucioncompradetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',
                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',

                    ] )
                    ->orderBy('devolucioncompradetalle.iddevolucioncompradetalle');
            } ] )
            ->whereNull( 'devolucioncompra.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $devolucioncompra;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'devolucioncompra.iddevolucioncompra';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $devolucioncompra = $query
            ->leftJoin('sucursal as sucu', 'devolucioncompra.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'devolucioncompra.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptocompra as concepcomp', 'devolucioncompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
            ->leftJoin('proveedor as prov', 'devolucioncompra.fkidproveedor', '=', 'prov.idproveedor')
            ->leftJoin('moneda as mon', 'devolucioncompra.fkidmoneda', '=', 'mon.idmoneda')
            ->leftJoin('notacompra as notcomp', 'devolucioncompra.fkidnotacompra', '=', 'notcomp.idnotacompra')
            ->select( [
                'devolucioncompra.iddevolucioncompra', 'devolucioncompra.codigo', 'devolucioncompra.tipocambio', 'devolucioncompra.nrofactura',
                'devolucioncompra.tipomoneda', 'devolucioncompra.fechadevolucioncompra', 'devolucioncompra.tipocompra',
                'devolucioncompra.cantidadtotal', 'devolucioncompra.montosubtotal', 'devolucioncompra.descuento', 'devolucioncompra.montodescuento',
                'devolucioncompra.montototal', 'devolucioncompra.nota', 'devolucioncompra.fkidnotacompra',
                'devolucioncompra.isordencompra', 'devolucioncompra.isnotacompra', 'devolucioncompra.issolicitudcompra',
                'devolucioncompra.fkidsucursal', 'sucu.descripcion as sucursal',
                'devolucioncompra.fkidalmacen', 'alm.descripcion as almacen',
                'devolucioncompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                'devolucioncompra.fkidproveedor', 'prov.nombre as proveedor',
                'devolucioncompra.fkidmoneda', 'mon.descripcion as moneda',
                'devolucioncompra.estado', 'devolucioncompra.isdelete', 'devolucioncompra.fecha', 'devolucioncompra.hora',
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('devolucioncompra.iddevolucioncompra', '=', $search)
                        ->orWhere('devolucioncompra.codigo', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('devolucioncompra.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'arraydevolucioncompradetalle' => function( $query ) {
                $query

                    ->leftJoin('sucursal as suc', 'devolucioncompradetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'devolucioncompradetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('seccioninventario as seccinv', 'devolucioncompradetalle.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
                    ->leftJoin('proveedor as provdor', 'devolucioncompradetalle.fkidproveedor', '=', 'provdor.idproveedor')
                    ->leftJoin('producto as prod', 'devolucioncompradetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [

                        'devolucioncompradetalle.iddevolucioncompradetalle', 'devolucioncompradetalle.fkiddevolucioncompra', 'devolucioncompradetalle.fkidalmacenproductodetalle', 
                        'devolucioncompradetalle.fkidproducto', 'devolucioncompradetalle.fkidnotacompra', 'devolucioncompradetalle.fkidnotacompradetalle',
                        'devolucioncompradetalle.fkidordencompra', 'devolucioncompradetalle.fkidordencompradetalle', 
                        'devolucioncompradetalle.fkidsolicitudcompra', 'devolucioncompradetalle.fkidsolicitudcompradetalle', 
                        'devolucioncompradetalle.cantidadcomprada', 'devolucioncompradetalle.cantidad', 
                        'devolucioncompradetalle.costobase', 'devolucioncompradetalle.costounitario', 'devolucioncompradetalle.costosubtotal', 
                        'devolucioncompradetalle.descuento', 'devolucioncompradetalle.montodescuento',
                        'devolucioncompradetalle.peso', 'devolucioncompradetalle.pesosubtotal', 
                        'devolucioncompradetalle.volumen', 'devolucioncompradetalle.volumensubtotal', 
                        'devolucioncompradetalle.nota', 'devolucioncompradetalle.fechavencimiento', 'devolucioncompradetalle.nrolote', 'devolucioncompradetalle.nrofabrica',
                        'devolucioncompradetalle.isnotacompra', 'devolucioncompradetalle.isordencompra', 'devolucioncompradetalle.issolicitudcompra',

                        'devolucioncompradetalle.fkidsucursal', 'suc.descripcion as sucursal',
                        'devolucioncompradetalle.fkidalmacen', 'alm.descripcion as almacen',
                        'devolucioncompradetalle.fkidseccioninventario', 'seccinv.descripcion as seccioninventario',
                        'devolucioncompradetalle.fkidproveedor', 'provdor.nombre as proveedor', 'provdor.nit as nitproveedor',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'devolucioncompradetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',
                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',

                    ] )
                    ->orderBy('devolucioncompradetalle.iddevolucioncompradetalle');
            } ] )
            ->whereNull( 'devolucioncompra.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $devolucioncompra;
    }

    public function newID( )
    {
        $devolucioncompra = DB::table('devolucioncompra')
            ->select('devolucioncompra.iddevolucioncompra')
            ->orderBy('devolucioncompra.iddevolucioncompra', 'DESC')
            ->first();

        return ( is_null( $devolucioncompra ) ) ? 1 : intval( $devolucioncompra->iddevolucioncompra ) + 1;
    }

    public function store( $query, $request )
    {
        $fkidsucursal       = isset( $request->fkidsucursal )          ? $request->fkidsucursal : null;
        $fkidalmacen        = isset( $request->fkidalmacen )           ? $request->fkidalmacen : null;
        $fkidconceptocompra = isset( $request->fkidconceptocompra )    ? $request->fkidconceptocompra : null;
        $fkidproveedor      = isset( $request->fkidproveedor )         ? $request->fkidproveedor : null;
        $fkidmoneda         = isset( $request->fkidmoneda )            ? $request->fkidmoneda : null;
        $fkidnotacompra    = isset( $request->fkidnotacompra )   ? $request->fkidnotacompra : null;
        $fkidtipotransaccion = isset( $request->fkidtipotransaccion )   ? $request->fkidtipotransaccion : null;

        $codigo      = isset( $request->codigo )      ? $request->codigo : null;
        $nrofactura  = isset( $request->nrofactura )  ? $request->nrofactura : null;
        $tipocambio  = isset( $request->tipocambio )  ? $request->tipocambio : null;
        $tipomoneda  = isset( $request->tipomoneda )  ? $request->tipomoneda : null;

        $fechadevolucioncompra  = isset( $request->fechadevolucioncompra )  ? $request->fechadevolucioncompra : null;

        $cantidadtotal   = isset( $request->cantidadtotal ) ? $request->cantidadtotal : null;
        $montosubtotal   = isset( $request->montosubtotal ) ? $request->montosubtotal : null;
        $descuento       = isset( $request->descuento ) ? $request->descuento : null;
        $montodescuento  = isset( $request->montodescuento ) ? $request->montodescuento : null;
        $montototal      = isset( $request->montototal ) ? $request->montototal : null;

        $nota            = isset( $request->nota ) ? $request->nota : null;
        $tipocompra   = isset( $request->tipocompra ) ? $request->tipocompra : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $devolucioncompra = $query->create( [
            'fkidsucursal' => $fkidsucursal,
            'fkidalmacen'  => $fkidalmacen,
            'fkidconceptocompra' => $fkidconceptocompra,
            'fkidproveedor' => $fkidproveedor,
            'fkidmoneda'    => $fkidmoneda,
            'fkidnotacompra' => $fkidnotacompra,
            'fkidtipotransaccion' => $fkidtipotransaccion,

            'codigo'     => $codigo,
            'nrofactura' => $nrofactura,
            'tipocambio' => $tipocambio,
            'tipomoneda' => $tipomoneda,
            'tipocompra' => $tipocompra,
            'fechadevolucioncompra' => $fechadevolucioncompra,

            'cantidadtotal' => $cantidadtotal,
            'montototal'    => $montototal,
            'montosubtotal' => $montosubtotal,
            'descuento' => $descuento,
            'montodescuento' => $montodescuento,
            'nota'       => $nota,

            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $devolucioncompra;
    }

    public function upgrade( $query, $request )
    {
        $iddevolucioncompra = isset( $request->iddevolucioncompra ) ? $request->iddevolucioncompra : null;

        $fkidsucursal       = isset( $request->fkidsucursal )          ? $request->fkidsucursal : null;
        $fkidalmacen        = isset( $request->fkidalmacen )           ? $request->fkidalmacen : null;
        $fkidconceptocompra = isset( $request->fkidconceptocompra )    ? $request->fkidconceptocompra : null;
        $fkidproveedor      = isset( $request->fkidproveedor )         ? $request->fkidproveedor : null;
        $fkidmoneda         = isset( $request->fkidmoneda )            ? $request->fkidmoneda : null;
        $fkidnotacompra    = isset( $request->fkidnotacompra )   ? $request->fkidnotacompra : null;
        $fkidtipotransaccion = isset( $request->fkidtipotransaccion )   ? $request->fkidtipotransaccion : null;

        $codigo      = isset( $request->codigo )      ? $request->codigo : null;
        $nrofactura  = isset( $request->nrofactura )  ? $request->nrofactura : null;
        $tipocambio  = isset( $request->tipocambio )  ? $request->tipocambio : null;
        $tipomoneda  = isset( $request->tipomoneda )  ? $request->tipomoneda : null;

        $fechadevolucioncompra  = isset( $request->fechadevolucioncompra )  ? $request->fechadevolucioncompra : null;

        $cantidadtotal   = isset( $request->cantidadtotal ) ? $request->cantidadtotal : null;
        $montosubtotal   = isset( $request->montosubtotal ) ? $request->montosubtotal : null;
        $descuento       = isset( $request->descuento ) ? $request->descuento : null;
        $montodescuento  = isset( $request->montodescuento ) ? $request->montodescuento : null;
        $montototal      = isset( $request->montototal ) ? $request->montototal : null;

        $nota            = isset( $request->nota ) ? $request->nota : null;
        $tipocompra   = isset( $request->tipocompra ) ? $request->tipocompra : null;

        $devolucioncompra = $query->where('iddevolucioncompra', '=', $iddevolucioncompra)->update( [
            'fkidsucursal' => $fkidsucursal,
            'fkidalmacen'  => $fkidalmacen,
            'fkidconceptocompra' => $fkidconceptocompra,
            'fkidproveedor' => $fkidproveedor,
            'fkidmoneda'    => $fkidmoneda,
            'fkidnotacompra' => $fkidnotacompra,
            'fkidtipotransaccion' => $fkidtipotransaccion,

            'codigo'     => $codigo,
            'nrofactura' => $nrofactura,
            'tipocambio' => $tipocambio,
            'tipomoneda' => $tipomoneda,
            'tipocompra' => $tipocompra,
            'fechadevolucioncompra' => $fechadevolucioncompra,

            'cantidadtotal' => $cantidadtotal,
            'montototal'    => $montototal,
            'montosubtotal' => $montosubtotal,
            'descuento' => $descuento,
            'montodescuento' => $montodescuento,
            'nota'       => $nota,
        ] );

        return $devolucioncompra;
    }

    public function show( $query, $iddevolucioncompra ) {

        $devolucioncompra = $query
            ->leftJoin('sucursal as sucu', 'devolucioncompra.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'devolucioncompra.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptocompra as concepcomp', 'devolucioncompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
            ->leftJoin('proveedor as prov', 'devolucioncompra.fkidproveedor', '=', 'prov.idproveedor')
            ->leftJoin('moneda as mon', 'devolucioncompra.fkidmoneda', '=', 'mon.idmoneda')
            ->leftJoin('notacompra as notcomp', 'devolucioncompra.fkidnotacompra', '=', 'notcomp.idnotacompra')
            ->select( [
                'devolucioncompra.iddevolucioncompra', 'devolucioncompra.codigo', 'devolucioncompra.tipocambio', 'devolucioncompra.nrofactura',
                'devolucioncompra.tipomoneda', 'devolucioncompra.fechadevolucioncompra', 'devolucioncompra.tipocompra',
                'devolucioncompra.cantidadtotal', 'devolucioncompra.montosubtotal', 'devolucioncompra.descuento', 'devolucioncompra.montodescuento',
                'devolucioncompra.montototal', 'devolucioncompra.nota', 'devolucioncompra.fkidnotacompra',
                'devolucioncompra.isordencompra', 'devolucioncompra.isnotacompra', 'devolucioncompra.issolicitudcompra',
                'devolucioncompra.fkidsucursal', 'sucu.descripcion as sucursal',
                'devolucioncompra.fkidalmacen', 'alm.descripcion as almacen',
                'devolucioncompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                'devolucioncompra.fkidproveedor', 'prov.nombre as proveedor',
                'devolucioncompra.fkidmoneda', 'mon.descripcion as moneda',
                'devolucioncompra.estado', 'devolucioncompra.isdelete', 'devolucioncompra.fecha', 'devolucioncompra.hora',
            ] )
            ->where( 'devolucioncompra.iddevolucioncompra', '=', $iddevolucioncompra )
            ->with( [ 'arraydevolucioncompradetalle' => function( $query ) {
                $query

                    ->leftJoin('sucursal as suc', 'devolucioncompradetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'devolucioncompradetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('seccioninventario as seccinv', 'devolucioncompradetalle.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
                    ->leftJoin('proveedor as provdor', 'devolucioncompradetalle.fkidproveedor', '=', 'provdor.idproveedor')
                    ->leftJoin('producto as prod', 'devolucioncompradetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [

                        'devolucioncompradetalle.iddevolucioncompradetalle', 'devolucioncompradetalle.fkiddevolucioncompra', 'devolucioncompradetalle.fkidalmacenproductodetalle', 
                        'devolucioncompradetalle.fkidproducto', 'devolucioncompradetalle.fkidnotacompra', 'devolucioncompradetalle.fkidnotacompradetalle',
                        'devolucioncompradetalle.fkidordencompra', 'devolucioncompradetalle.fkidordencompradetalle', 
                        'devolucioncompradetalle.fkidsolicitudcompra', 'devolucioncompradetalle.fkidsolicitudcompradetalle', 
                        'devolucioncompradetalle.cantidadcomprada', 'devolucioncompradetalle.cantidad', 
                        'devolucioncompradetalle.costobase', 'devolucioncompradetalle.costounitario', 'devolucioncompradetalle.costosubtotal', 
                        'devolucioncompradetalle.descuento', 'devolucioncompradetalle.montodescuento',
                        'devolucioncompradetalle.peso', 'devolucioncompradetalle.pesosubtotal', 
                        'devolucioncompradetalle.volumen', 'devolucioncompradetalle.volumensubtotal', 
                        'devolucioncompradetalle.nota', 'devolucioncompradetalle.fechavencimiento', 'devolucioncompradetalle.nrolote', 'devolucioncompradetalle.nrofabrica',
                        'devolucioncompradetalle.isnotacompra', 'devolucioncompradetalle.isordencompra', 'devolucioncompradetalle.issolicitudcompra',

                        'devolucioncompradetalle.fkidsucursal', 'suc.descripcion as sucursal',
                        'devolucioncompradetalle.fkidalmacen', 'alm.descripcion as almacen',
                        'devolucioncompradetalle.fkidseccioninventario', 'seccinv.descripcion as seccioninventario',
                        'devolucioncompradetalle.fkidproveedor', 'provdor.nombre as proveedor', 'provdor.nit as nitproveedor',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'devolucioncompradetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',
                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',

                    ] )
                    ->orderBy('devolucioncompradetalle.iddevolucioncompradetalle');
            } ] )
            ->whereNull('devolucioncompra.deleted_at')
            ->orderBy('devolucioncompra.iddevolucioncompra', 'DESC')
            ->first();

        return $devolucioncompra;
    }

    public function scopeEnable( $query, $request )
    {
        $iddevolucioncompra = $request->iddevolucioncompra;
        $query->where('iddevolucioncompra', '=', $iddevolucioncompra)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $iddevolucioncompra = $request->iddevolucioncompra;
        $query->where('iddevolucioncompra', '=', $iddevolucioncompra)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $iddevolucioncompra = $request->iddevolucioncompra;
        return $query->where('iddevolucioncompra', '=', $iddevolucioncompra)->delete();
    }

    public function searchByID( $query, $iddevolucioncompra ) {
        $devolucioncompra = $query
            ->leftJoin('sucursal as sucu', 'devolucioncompra.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'devolucioncompra.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptocompra as concepcomp', 'devolucioncompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
            ->leftJoin('proveedor as prov', 'devolucioncompra.fkidproveedor', '=', 'prov.idproveedor')
            ->leftJoin('moneda as mon', 'devolucioncompra.fkidmoneda', '=', 'mon.idmoneda')
            ->leftJoin('notacompra as notcomp', 'devolucioncompra.fkidnotacompra', '=', 'notcomp.idnotacompra')
            ->select( [
                'devolucioncompra.iddevolucioncompra', 'devolucioncompra.codigo', 'devolucioncompra.tipocambio', 'devolucioncompra.nrofactura',
                'devolucioncompra.tipomoneda', 'devolucioncompra.fechadevolucioncompra', 'devolucioncompra.tipocompra',
                'devolucioncompra.cantidadtotal', 'devolucioncompra.montosubtotal', 'devolucioncompra.descuento', 'devolucioncompra.montodescuento',
                'devolucioncompra.montototal', 'devolucioncompra.nota', 'devolucioncompra.fkidnotacompra',
                'devolucioncompra.isordencompra', 'devolucioncompra.isnotacompra', 'devolucioncompra.issolicitudcompra',
                'devolucioncompra.fkidsucursal', 'sucu.descripcion as sucursal',
                'devolucioncompra.fkidalmacen', 'alm.descripcion as almacen',
                'devolucioncompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                'devolucioncompra.fkidproveedor', 'prov.nombre as proveedor',
                'devolucioncompra.fkidmoneda', 'mon.descripcion as moneda',
                'devolucioncompra.estado', 'devolucioncompra.isdelete', 'devolucioncompra.fecha', 'devolucioncompra.hora',
            ] )
            ->where( 'devolucioncompra.iddevolucioncompra', '=', $iddevolucioncompra )
            ->with( [ 'arraydevolucioncompradetalle' => function( $query ) {
                $query

                    ->leftJoin('sucursal as suc', 'devolucioncompradetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'devolucioncompradetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('seccioninventario as seccinv', 'devolucioncompradetalle.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
                    ->leftJoin('proveedor as provdor', 'devolucioncompradetalle.fkidproveedor', '=', 'provdor.idproveedor')
                    ->leftJoin('producto as prod', 'devolucioncompradetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [

                        'devolucioncompradetalle.iddevolucioncompradetalle', 'devolucioncompradetalle.fkiddevolucioncompra', 'devolucioncompradetalle.fkidalmacenproductodetalle', 
                        'devolucioncompradetalle.fkidproducto', 'devolucioncompradetalle.fkidnotacompra', 'devolucioncompradetalle.fkidnotacompradetalle',
                        'devolucioncompradetalle.fkidordencompra', 'devolucioncompradetalle.fkidordencompradetalle', 
                        'devolucioncompradetalle.fkidsolicitudcompra', 'devolucioncompradetalle.fkidsolicitudcompradetalle', 
                        'devolucioncompradetalle.cantidadcomprada', 'devolucioncompradetalle.cantidad', 
                        'devolucioncompradetalle.costobase', 'devolucioncompradetalle.costounitario', 'devolucioncompradetalle.costosubtotal', 
                        'devolucioncompradetalle.descuento', 'devolucioncompradetalle.montodescuento',
                        'devolucioncompradetalle.peso', 'devolucioncompradetalle.pesosubtotal', 
                        'devolucioncompradetalle.volumen', 'devolucioncompradetalle.volumensubtotal', 
                        'devolucioncompradetalle.nota', 'devolucioncompradetalle.fechavencimiento', 'devolucioncompradetalle.nrolote', 'devolucioncompradetalle.nrofabrica',
                        'devolucioncompradetalle.isnotacompra', 'devolucioncompradetalle.isordencompra', 'devolucioncompradetalle.issolicitudcompra',

                        'devolucioncompradetalle.fkidsucursal', 'suc.descripcion as sucursal',
                        'devolucioncompradetalle.fkidalmacen', 'alm.descripcion as almacen',
                        'devolucioncompradetalle.fkidseccioninventario', 'seccinv.descripcion as seccioninventario',
                        'devolucioncompradetalle.fkidproveedor', 'provdor.nombre as proveedor', 'provdor.nit as nitproveedor',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'devolucioncompradetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',
                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',

                    ] )
                    ->orderBy('devolucioncompradetalle.iddevolucioncompradetalle');
            } ] )
            ->whereNull('devolucioncompra.deleted_at')
            ->orderBy('devolucioncompra.iddevolucioncompra', 'DESC')
            ->first();

        return $devolucioncompra;
    }

    public function existsNotaCompra( $query, $fkidnotacompra ) {
        $devolucioncompra = $query
            ->where('devolucioncompra.fkidnotacompra', '=', $fkidnotacompra)
            ->whereNull('devolucioncompra.deleted_at')
            ->orderBy('devolucioncompra.iddevolucioncompra')
            ->get();

        return ( sizeof( $devolucioncompra ) > 0 );
    }

}
