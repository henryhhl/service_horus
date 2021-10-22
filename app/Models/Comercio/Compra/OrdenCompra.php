<?php

namespace App\Models\Comercio\Compra;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class OrdenCompra extends Model
{
    use SoftDeletes;

    protected $table      = 'ordencompra';
    protected $primaryKey = 'idordencompra';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A', 'isdelete' => 'A', 'fkidsolicitudcompra' => null,
        'codigo' => null, 'nrofactura' => null, 'tipocambio' => 0, 'diasplazo' => 0, 'fechavencimiento' => null,
        'cantidadtotal' => 0, 'montosubtotal' => 0, 'montototal' => 0, 'fletes' => 0, 'internacion' => 0, 'otrosgastos' => 0,
        'nota' => null, 'tiposolicitud' => 'L', 'issolicitudcompra' => 'N', 
    ];

    protected $fillable = [ 
        'fkidsolicitudcompra', 'fkidsucursal', 'fkidalmacen', 'fkidconceptocompra', 'fkidseccioninventario', 'fkidproveedor', 'fkidmoneda',
        'codigo', 'nrofactura', 'tipocambio', 'fechasolicitada', 'fechavencimiento', 'diasplazo',
        'cantidadtotal', 'montosubtotal', 'montototal', 'fletes', 'internacion', 'otrosgastos', 'nota', 
        'tiposolicitud', 'issolicitudcompra', 'iscompra', 'estado', 'fecha', 'hora', 'isdelete',
    ];

    public function ordencompradetalle() {
        return $this->hasMany(
            'App\Models\Comercio\Compra\OrdenCompraDetalle',
            'fkidordencompra',
            'idordencompra'
        );
    }

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'ordencompra.idordencompra';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $ordencompra = $query
            ->leftJoin('sucursal as sucu', 'ordencompra.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'ordencompra.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptocompra as concepcomp', 'ordencompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
            ->leftJoin('seccioninventario as seccinv', 'ordencompra.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
            ->leftJoin('proveedor as prov', 'ordencompra.fkidproveedor', '=', 'prov.idproveedor')
            ->leftJoin('moneda as mon', 'ordencompra.fkidmoneda', '=', 'mon.idmoneda')
            ->leftJoin('solicitudcompra as solicomp', 'ordencompra.fkidsolicitudcompra', '=', 'solicomp.idsolicitudcompra')
            ->select( [
                'ordencompra.idordencompra', 'ordencompra.codigo', 'ordencompra.nrofactura', 'ordencompra.tipocambio', 'ordencompra.cantidadtotal',
                'ordencompra.fechasolicitada', 'ordencompra.fechavencimiento', 'ordencompra.diasplazo', 'ordencompra.montosubtotal',
                'ordencompra.montototal', 'ordencompra.fletes', 'ordencompra.internacion', 'ordencompra.otrosgastos', 'solicomp.idsolicitudcompra',
                'ordencompra.nota', 'ordencompra.tiposolicitud', 'ordencompra.iscompra', 'ordencompra.issolicitudcompra', 'ordencompra.fkidsolicitudcompra',
                'ordencompra.fkidsucursal', 'sucu.descripcion as sucursal',
                'ordencompra.fkidalmacen', 'alm.descripcion as almacen',
                'ordencompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                'ordencompra.fkidseccioninventario', 'seccinv.descripcion as seccioninventario',
                'ordencompra.fkidproveedor', 'prov.nombre as proveedor', 'prov.nit as nitproveedor',
                'ordencompra.fkidmoneda', 'mon.descripcion as moneda',
                'ordencompra.estado', 'ordencompra.isdelete', 'ordencompra.fecha', 'ordencompra.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('ordencompra.idordencompra', '=', $search)
                        ->orWhere('ordencompra.codigo', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('ordencompra.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'ordencompradetalle' => function( $query ) {
                $query
                    ->leftJoin('unidadmedidaproducto as unidmedprod', 'ordencompradetalle.fkidunidadmedidaproducto', '=', 'unidmedprod.idunidadmedidaproducto')
                    ->leftJoin('unidadmedida as unidmed', 'unidmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('producto as prod', 'unidmedprod.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->select( 
                        'ordencompradetalle.idordencompradetalle', 'ordencompradetalle.fkidordencompra', 'ordencompradetalle.fkidsolicitudcompradetalle',
                        'ordencompradetalle.fkidunidadmedidaproducto', 'ordencompradetalle.cantidad', 'ordencompradetalle.cantidadsolicitada', 'ordencompradetalle.nota',
                        'ordencompradetalle.iscompra', 'ordencompradetalle.issolicitudcompra', 'ordencompradetalle.fechasolicitada', 'ordencompradetalle.fechavencimiento', 
                        'ordencompradetalle.costounitario', 'ordencompradetalle.costosubtotal', 'ordencompradetalle.estado',
                        'ordencompradetalle.peso', 'ordencompradetalle.pesosubtotal', 'ordencompradetalle.volumen', 'ordencompradetalle.volumensubtotal',
                        'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida', 
                        'unidmedprod.codigo', 'unidmedprod.valorequivalente', 'unidmedprod.stock', 
                        'prod.idproducto', 'prod.nombre', 
                        'ciud.idciudad', 'ciud.descripcion as ciudadorigen',
                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca'
                    )
                    ->orderBy('ordencompradetalle.idordencompradetalle');
            } ] )
            ->whereNull( 'ordencompra.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $ordencompra;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'ordencompra.idordencompra';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $ordencompra = $query
            ->leftJoin('sucursal as sucu', 'ordencompra.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'ordencompra.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptocompra as concepcomp', 'ordencompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
            ->leftJoin('seccioninventario as seccinv', 'ordencompra.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
            ->leftJoin('proveedor as prov', 'ordencompra.fkidproveedor', '=', 'prov.idproveedor')
            ->leftJoin('moneda as mon', 'ordencompra.fkidmoneda', '=', 'mon.idmoneda')
            ->leftJoin('solicitudcompra as solicomp', 'ordencompra.fkidsolicitudcompra', '=', 'solicomp.idsolicitudcompra')
            ->select( [
                'ordencompra.idordencompra', 'ordencompra.codigo', 'ordencompra.nrofactura', 'ordencompra.tipocambio', 'ordencompra.cantidadtotal',
                'ordencompra.fechasolicitada', 'ordencompra.fechavencimiento', 'ordencompra.diasplazo', 'ordencompra.montosubtotal',
                'ordencompra.montototal', 'ordencompra.fletes', 'ordencompra.internacion', 'ordencompra.otrosgastos', 'solicomp.idsolicitudcompra',
                'ordencompra.nota', 'ordencompra.tiposolicitud', 'ordencompra.iscompra', 'ordencompra.issolicitudcompra', 'ordencompra.fkidsolicitudcompra',
                'ordencompra.fkidsucursal', 'sucu.descripcion as sucursal',
                'ordencompra.fkidalmacen', 'alm.descripcion as almacen',
                'ordencompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                'ordencompra.fkidseccioninventario', 'seccinv.descripcion as seccioninventario',
                'ordencompra.fkidproveedor', 'prov.nombre as proveedor', 'prov.nit as nitproveedor',
                'ordencompra.fkidmoneda', 'mon.descripcion as moneda',
                'ordencompra.estado', 'ordencompra.isdelete', 'ordencompra.fecha', 'ordencompra.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('ordencompra.idordencompra', '=', $search)
                        ->orWhere('ordencompra.codigo', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('ordencompra.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'ordencompradetalle' => function( $query ) {
                $query
                    ->leftJoin('unidadmedidaproducto as unidmedprod', 'ordencompradetalle.fkidunidadmedidaproducto', '=', 'unidmedprod.idunidadmedidaproducto')
                    ->leftJoin('unidadmedida as unidmed', 'unidmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('producto as prod', 'unidmedprod.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->select( 
                        'ordencompradetalle.idordencompradetalle', 'ordencompradetalle.fkidordencompra', 'ordencompradetalle.fkidsolicitudcompradetalle',
                        'ordencompradetalle.fkidunidadmedidaproducto', 'ordencompradetalle.cantidad', 'ordencompradetalle.cantidadsolicitada', 'ordencompradetalle.nota',
                        'ordencompradetalle.iscompra', 'ordencompradetalle.issolicitudcompra', 'ordencompradetalle.fechasolicitada', 'ordencompradetalle.fechavencimiento', 
                        'ordencompradetalle.costounitario', 'ordencompradetalle.costosubtotal', 'ordencompradetalle.estado',
                        'ordencompradetalle.peso', 'ordencompradetalle.pesosubtotal', 'ordencompradetalle.volumen', 'ordencompradetalle.volumensubtotal',
                        'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida', 
                        'unidmedprod.codigo', 'unidmedprod.valorequivalente', 'unidmedprod.stock', 
                        'prod.idproducto', 'prod.nombre', 
                        'ciud.idciudad', 'ciud.descripcion as ciudadorigen',
                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca'
                    )
                    ->orderBy('ordencompradetalle.idordencompradetalle');
            } ] )
            ->whereNull( 'ordencompra.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $ordencompra;
    }

    public function newID( )
    {
        $ordencompra = DB::table('ordencompra')
            ->select('ordencompra.idordencompra')
            ->orderBy('ordencompra.idordencompra', 'DESC')
            ->first();

        return ( is_null( $ordencompra ) ) ? 1 : intval( $ordencompra->idordencompra ) + 1;
    }

    public function store( $query, $request )
    {
        $fkidsucursal          = isset( $request->fkidsucursal )          ? $request->fkidsucursal : null;
        $fkidalmacen           = isset( $request->fkidalmacen )           ? $request->fkidalmacen : null;
        $fkidconceptocompra    = isset( $request->fkidconceptocompra )    ? $request->fkidconceptocompra : null;
        $fkidseccioninventario = isset( $request->fkidseccioninventario ) ? $request->fkidseccioninventario : null;
        $fkidproveedor         = isset( $request->fkidproveedor )         ? $request->fkidproveedor : null;
        $fkidmoneda            = isset( $request->fkidmoneda )            ? $request->fkidmoneda : null;
        $fkidsolicitudcompra   = isset( $request->fkidsolicitudcompra )   ? $request->fkidsolicitudcompra : null;

        $nrofactura  = isset( $request->nrofactura )  ? $request->nrofactura : null;
        $codigo      = isset( $request->codigo )      ? $request->codigo : null;
        $tipocambio  = isset( $request->tipocambio )  ? $request->tipocambio : null;

        $diasplazo       = isset( $request->diasplazo )       ? $request->diasplazo       : null;
        $fechasolicitada = isset( $request->fechasolicitada ) ? $request->fechasolicitada : null;
        $fechavencimiento = isset( $request->fechavencimiento ) ? $request->fechavencimiento : null;

        $cantidadtotal   = isset( $request->cantidadtotal ) ? $request->cantidadtotal : null;
        $montosubtotal   = isset( $request->montosubtotal ) ? $request->montosubtotal : null;
        $montototal      = isset( $request->montototal ) ? $request->montototal : null;

        $fletes      = isset( $request->fletes ) ? $request->fletes : null;
        $internacion = isset( $request->internacion ) ? $request->internacion : null;
        $otrosgastos = isset( $request->otrosgastos ) ? $request->otrosgastos : null;

        $nota            = isset( $request->nota ) ? $request->nota : null;
        $tiposolicitud   = isset( $request->tiposolicitud ) ? $request->tiposolicitud : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $ordencompra = $query->create( [
            'fkidsucursal' => $fkidsucursal,
            'fkidalmacen'  => $fkidalmacen,
            'fkidconceptocompra' => $fkidconceptocompra,
            'fkidseccioninventario' => $fkidseccioninventario,
            'fkidproveedor' => $fkidproveedor,
            'fkidmoneda'    => $fkidmoneda,
            'fkidsolicitudcompra' => $fkidsolicitudcompra,

            'nrofactura' => $nrofactura,
            'codigo'     => $codigo,
            'tipocambio' => $tipocambio,

            'diasplazo'       => $diasplazo,
            'fechasolicitada' => $fechasolicitada,
            'fechavencimiento' => $fechavencimiento,

            'cantidadtotal' => $cantidadtotal,
            'montototal'    => $montototal,
            'montosubtotal' => $montosubtotal,

            'fletes'      => $fletes,
            'internacion' => $internacion,
            'otrosgastos' => $otrosgastos,

            'nota'          => $nota,
            'tiposolicitud' => $tiposolicitud,

            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $ordencompra;
    }

    public function show( $query, $idordencompra ) {

        $ordencompra = $query
            ->leftJoin('sucursal as sucu', 'ordencompra.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'ordencompra.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptocompra as concepcomp', 'ordencompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
            ->leftJoin('seccioninventario as seccinv', 'ordencompra.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
            ->leftJoin('proveedor as prov', 'ordencompra.fkidproveedor', '=', 'prov.idproveedor')
            ->leftJoin('moneda as mon', 'ordencompra.fkidmoneda', '=', 'mon.idmoneda')
            ->leftJoin('solicitudcompra as solicomp', 'ordencompra.fkidsolicitudcompra', '=', 'solicomp.idsolicitudcompra')
            ->select( [
                'ordencompra.idordencompra', 'ordencompra.codigo', 'ordencompra.nrofactura', 'ordencompra.tipocambio', 'ordencompra.cantidadtotal',
                'ordencompra.fechasolicitada', 'ordencompra.fechavencimiento', 'ordencompra.diasplazo', 'ordencompra.montosubtotal',
                'ordencompra.montototal', 'ordencompra.fletes', 'ordencompra.internacion', 'ordencompra.otrosgastos', 'solicomp.idsolicitudcompra',
                'ordencompra.nota', 'ordencompra.tiposolicitud', 'ordencompra.iscompra', 'ordencompra.issolicitudcompra', 'ordencompra.fkidsolicitudcompra',
                'ordencompra.fkidsucursal', 'sucu.descripcion as sucursal',
                'ordencompra.fkidalmacen', 'alm.descripcion as almacen',
                'ordencompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                'ordencompra.fkidseccioninventario', 'seccinv.descripcion as seccioninventario',
                'ordencompra.fkidproveedor', 'prov.nombre as proveedor', 'prov.nit as nitproveedor',
                'ordencompra.fkidmoneda', 'mon.descripcion as moneda',
                'ordencompra.estado', 'ordencompra.isdelete', 'ordencompra.fecha', 'ordencompra.hora'
            ] )
            ->where( 'ordencompra.idordencompra', '=', $idordencompra )
            ->with( [ 'ordencompradetalle' => function( $query ) {
                $query
                    ->leftJoin('unidadmedidaproducto as unidmedprod', 'ordencompradetalle.fkidunidadmedidaproducto', '=', 'unidmedprod.idunidadmedidaproducto')
                    ->leftJoin('unidadmedida as unidmed', 'unidmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('producto as prod', 'unidmedprod.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->select( 
                        'ordencompradetalle.idordencompradetalle', 'ordencompradetalle.fkidordencompra', 'ordencompradetalle.fkidsolicitudcompradetalle',
                        'ordencompradetalle.fkidunidadmedidaproducto', 'ordencompradetalle.cantidad', 'ordencompradetalle.cantidadsolicitada', 'ordencompradetalle.nota',
                        'ordencompradetalle.iscompra', 'ordencompradetalle.issolicitudcompra', 'ordencompradetalle.fechasolicitada', 'ordencompradetalle.fechavencimiento', 
                        'ordencompradetalle.costounitario', 'ordencompradetalle.costosubtotal', 'ordencompradetalle.estado',
                        'ordencompradetalle.peso', 'ordencompradetalle.pesosubtotal', 'ordencompradetalle.volumen', 'ordencompradetalle.volumensubtotal',
                        'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida', 
                        'unidmedprod.codigo', 'unidmedprod.valorequivalente', 'unidmedprod.stock', 
                        'prod.idproducto', 'prod.nombre', 
                        'ciud.idciudad', 'ciud.descripcion as ciudadorigen',
                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca'
                    )
                    ->orderBy('ordencompradetalle.idordencompradetalle');
            } ] )
            ->whereNull('ordencompra.deleted_at')
            ->orderBy('ordencompra.idordencompra', 'DESC')
            ->first();
        
        return $ordencompra;
    }

    public function scopeEnable( $query, $request )
    {
        $idordencompra = $request->idordencompra;
        $query->where('idordencompra', '=', $idordencompra)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idordencompra = $request->idordencompra;
        $query->where('idordencompra', '=', $idordencompra)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idordencompra = $request->idordencompra;
        $query->where('idordencompra', '=', $idordencompra)->delete();
    }

    public function searchByID( $query, $idordencompra ) {
        $ordencompra = $query
            ->leftJoin('sucursal as sucu', 'ordencompra.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'ordencompra.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptocompra as concepcomp', 'ordencompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
            ->leftJoin('seccioninventario as seccinv', 'ordencompra.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
            ->leftJoin('proveedor as prov', 'ordencompra.fkidproveedor', '=', 'prov.idproveedor')
            ->leftJoin('moneda as mon', 'ordencompra.fkidmoneda', '=', 'mon.idmoneda')
            ->leftJoin('solicitudcompra as solicomp', 'ordencompra.fkidsolicitudcompra', '=', 'solicomp.idsolicitudcompra')
            ->select( [
                'ordencompra.idordencompra', 'ordencompra.codigo', 'ordencompra.nrofactura', 'ordencompra.tipocambio', 'ordencompra.cantidadtotal',
                'ordencompra.fechasolicitada', 'ordencompra.fechavencimiento', 'ordencompra.diasplazo', 'ordencompra.montosubtotal',
                'ordencompra.montototal', 'ordencompra.fletes', 'ordencompra.internacion', 'ordencompra.otrosgastos', 'solicomp.idsolicitudcompra',
                'ordencompra.nota', 'ordencompra.tiposolicitud', 'ordencompra.iscompra', 'ordencompra.issolicitudcompra', 'ordencompra.fkidsolicitudcompra',
                'ordencompra.fkidsucursal', 'sucu.descripcion as sucursal',
                'ordencompra.fkidalmacen', 'alm.descripcion as almacen',
                'ordencompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                'ordencompra.fkidseccioninventario', 'seccinv.descripcion as seccioninventario',
                'ordencompra.fkidproveedor', 'prov.nombre as proveedor', 'prov.nit as nitproveedor',
                'ordencompra.fkidmoneda', 'mon.descripcion as moneda',
                'ordencompra.estado', 'ordencompra.isdelete', 'ordencompra.fecha', 'ordencompra.hora'
            ] )
            ->where('ordencompra.idordencompra', '=', $idordencompra)
            ->with( [ 'ordencompradetalle' => function( $query ) {
                $query
                    ->leftJoin('unidadmedidaproducto as unidmedprod', 'ordencompradetalle.fkidunidadmedidaproducto', '=', 'unidmedprod.idunidadmedidaproducto')
                    ->leftJoin('unidadmedida as unidmed', 'unidmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('producto as prod', 'unidmedprod.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->select( 
                        'ordencompradetalle.idordencompradetalle', 'ordencompradetalle.fkidordencompra', 'ordencompradetalle.fkidsolicitudcompradetalle',
                        'ordencompradetalle.fkidunidadmedidaproducto', 'ordencompradetalle.cantidad', 'ordencompradetalle.cantidadsolicitada', 'ordencompradetalle.nota',
                        'ordencompradetalle.iscompra', 'ordencompradetalle.issolicitudcompra', 'ordencompradetalle.fechasolicitada', 'ordencompradetalle.fechavencimiento', 
                        'ordencompradetalle.costounitario', 'ordencompradetalle.costosubtotal', 'ordencompradetalle.estado',
                        'ordencompradetalle.peso', 'ordencompradetalle.pesosubtotal', 'ordencompradetalle.volumen', 'ordencompradetalle.volumensubtotal',
                        'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida', 
                        'unidmedprod.codigo', 'unidmedprod.valorequivalente', 'unidmedprod.stock', 
                        'prod.idproducto', 'prod.nombre', 
                        'ciud.idciudad', 'ciud.descripcion as ciudadorigen',
                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca'
                    )
                    ->orderBy('ordencompradetalle.idordencompradetalle');
            } ] )
            ->whereNull('ordencompra.deleted_at')
            ->orderBy('ordencompra.idordencompra', 'DESC')
            ->first();

        return $ordencompra;
    }

    public function tieneProveedor( $query, $idproveedor ) {

        $ordencompra = $query
            ->where( 'ordencompra.fkidproveedor', '=', $idproveedor )
            ->whereNull('ordencompra.deleted_at')
            ->get();
        
        return ( sizeof( $ordencompra ) > 0 );
    }

    public function tieneConceptoCompra( $query, $idconceptocompra ) {

        $ordencompra = $query
            ->where( 'ordencompra.fkidconceptocompra', '=', $idconceptocompra )
            ->whereNull('ordencompra.deleted_at')
            ->get();
        
        return ( sizeof( $ordencompra ) > 0 );
    }

    public function tieneSeccionInventario( $query, $idseccioninventario ) {

        $ordencompra = $query
            ->where( 'ordencompra.fkidseccioninventario', '=', $idseccioninventario )
            ->whereNull('ordencompra.deleted_at')
            ->get();
        
        return ( sizeof( $ordencompra ) > 0 );
    }
    
}
