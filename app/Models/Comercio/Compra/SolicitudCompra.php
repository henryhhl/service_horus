<?php

namespace App\Models\Comercio\Compra;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class SolicitudCompra extends Model
{
    use SoftDeletes;

    protected $table      = 'solicitudcompra';
    protected $primaryKey = 'idsolicitudcompra';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'fkidusers' => null, 'codigo' => null, 'tipocambio' => 0, 'fechafinalizada' => null,
        'cantidadpendientetotal' => 0, 'cantidadsolicitadatotal' => 0,  'montototal' => 0, 'nota' => null,
        'estado' => 'A', 'isdelete' => 'A', 'tiposolicitud' => 'L', 'isordencompra' => 'N', 'x_idusuario' => null,
    ];

    protected $fillable = [ 
        'fkidsucursal', 'fkidalmacen', 'fkidconceptocompra', 'fkidseccioninventario', 'fkidproveedor', 'fkidmoneda',
        'fkidusers', 'fkidtipotransaccion', 'codigo', 'tipocambio', 'fechasolicitada', 'fechafinalizada', 'cantidadpendientetotal', 'montototal', 'nota',
        'cantidadsolicitadatotal', 'tiposolicitud', 'isordencompra', 'estado', 'fecha', 'hora', 'isdelete', 'x_idusuario',
    ];

    public function arraysolicitudcompradetalle() {
        return $this->hasMany(
            'App\Models\Comercio\Compra\SolicitudCompraDetalle',
            'fkidsolicitudcompra',
            'idsolicitudcompra'
        );
    }

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'solicitudcompra.idsolicitudcompra';

        $isordencompra = isset($request->isordencompra) ? $request->isordencompra : false;
        if ( strtolower( $isordencompra ) == 'true' || $isordencompra == true ) {
            $isordencompra = true;
        } else {
            $isordencompra = false;
        }

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $solicitudcompra = $query
            ->leftJoin('sucursal as sucu', 'solicitudcompra.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'solicitudcompra.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptocompra as concepcomp', 'solicitudcompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
            ->leftJoin('seccioninventario as seccinv', 'solicitudcompra.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
            ->leftJoin('proveedor as prov', 'solicitudcompra.fkidproveedor', '=', 'prov.idproveedor')
            ->leftJoin('moneda as mon', 'solicitudcompra.fkidmoneda', '=', 'mon.idmoneda')
            ->leftJoin('tipotransaccion as tpotransac', 'solicitudcompra.fkidtipotransaccion', '=', 'tpotransac.idtipotransaccion')
            ->select( [
                'solicitudcompra.idsolicitudcompra', 'solicitudcompra.codigo', 'solicitudcompra.tipocambio', 'solicitudcompra.cantidadsolicitadatotal',
                'solicitudcompra.fechasolicitada', 'solicitudcompra.fechafinalizada', 'solicitudcompra.cantidadpendientetotal',
                'solicitudcompra.montototal', 'solicitudcompra.nota', 'solicitudcompra.tiposolicitud', 'solicitudcompra.isordencompra',
                'solicitudcompra.fkidtipotransaccion', 'tpotransac.descripcion as tipotransaccion',
                'solicitudcompra.fkidsucursal', 'sucu.descripcion as sucursal',
                'solicitudcompra.fkidalmacen', 'alm.descripcion as almacen',
                'solicitudcompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                'solicitudcompra.fkidseccioninventario', 'seccinv.descripcion as seccioninventario',
                'solicitudcompra.fkidproveedor', 'prov.nombre as proveedor',
                'solicitudcompra.fkidmoneda', 'mon.descripcion as moneda',
                'solicitudcompra.estado', 'solicitudcompra.isdelete', 'solicitudcompra.fecha', 'solicitudcompra.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('solicitudcompra.idsolicitudcompra', '=', $search)
                        ->orWhere('solicitudcompra.codigo', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('solicitudcompra.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->where( $isordencompra ? [ ['solicitudcompra.isordencompra', '=', 'N'] ] : [] )
            ->with( [ 'arraysolicitudcompradetalle' => function( $query ) {
                $query
                    ->leftJoin('producto as prod', 'solicitudcompradetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('sucursal as suc', 'solicitudcompradetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'solicitudcompradetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('seccioninventario as seccinv', 'solicitudcompradetalle.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
                    ->leftJoin('proveedor as provdor', 'solicitudcompradetalle.fkidproveedor', '=', 'provdor.idproveedor')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'solicitudcompradetalle.idsolicitudcompradetalle', 'solicitudcompradetalle.fkidsolicitudcompra', 'solicitudcompradetalle.fkidseccioninventario',
                        'solicitudcompradetalle.fkidproducto', 'solicitudcompradetalle.fkidsucursal', 'solicitudcompradetalle.fkidalmacen', 'solicitudcompradetalle.fkidproveedor',
                        'solicitudcompradetalle.stockactual', 'solicitudcompradetalle.cantidadpendiente', 'solicitudcompradetalle.cantidadsolicitada', 'solicitudcompradetalle.nota',
                        'solicitudcompradetalle.isordencompra', 'solicitudcompradetalle.fechasolicitada', 'solicitudcompradetalle.fechafinalizada', 
                        'solicitudcompradetalle.costobase', 'solicitudcompradetalle.costounitario', 'solicitudcompradetalle.costosubtotal', 'solicitudcompradetalle.estado',
                        'prod.idproducto', 'prod.nombre as producto', 'prod.codigo', 'prod.peso', 'prod.volumen', 'prod.stockactual', 'prod.valorequivalente',
                        'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',
                        'suc.idsucursal', 'suc.descripcion as sucursal',
                        'alm.idalmacen', 'alm.descripcion as almacen',
                        'seccinv.idseccioninventario', 'seccinv.descripcion as seccioninventario',
                        'provdor.idproveedor', 'provdor.nombre as proveedor', 'provdor.nit as nitproveedor'
                    ] )
                    ->orderBy('solicitudcompradetalle.idsolicitudcompradetalle');
            } ] )
            ->whereNull( 'solicitudcompra.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $solicitudcompra;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'solicitudcompra.idsolicitudcompra';

        $isordencompra = isset($request->isordencompra) ? $request->isordencompra : false;
        if ( strtolower( $isordencompra ) == 'true' || $isordencompra == true ) {
            $isordencompra = true;
        } else {
            $isordencompra = false;
        }

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $solicitudcompra = $query
            ->leftJoin('sucursal as sucu', 'solicitudcompra.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'solicitudcompra.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptocompra as concepcomp', 'solicitudcompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
            ->leftJoin('seccioninventario as seccinv', 'solicitudcompra.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
            ->leftJoin('proveedor as prov', 'solicitudcompra.fkidproveedor', '=', 'prov.idproveedor')
            ->leftJoin('moneda as mon', 'solicitudcompra.fkidmoneda', '=', 'mon.idmoneda')
            ->leftJoin('tipotransaccion as tpotransac', 'solicitudcompra.fkidtipotransaccion', '=', 'tpotransac.idtipotransaccion')
            ->select( [
                'solicitudcompra.idsolicitudcompra', 'solicitudcompra.codigo', 'solicitudcompra.tipocambio', 'solicitudcompra.cantidadsolicitadatotal',
                'solicitudcompra.fechasolicitada', 'solicitudcompra.fechafinalizada', 'solicitudcompra.cantidadpendientetotal',
                'solicitudcompra.montototal', 'solicitudcompra.nota', 'solicitudcompra.tiposolicitud', 'solicitudcompra.isordencompra',
                'solicitudcompra.fkidtipotransaccion', 'tpotransac.descripcion as tipotransaccion',
                'solicitudcompra.fkidsucursal', 'sucu.descripcion as sucursal',
                'solicitudcompra.fkidalmacen', 'alm.descripcion as almacen',
                'solicitudcompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                'solicitudcompra.fkidseccioninventario', 'seccinv.descripcion as seccioninventario',
                'solicitudcompra.fkidproveedor', 'prov.nombre as proveedor',
                'solicitudcompra.fkidmoneda', 'mon.descripcion as moneda',
                'solicitudcompra.estado', 'solicitudcompra.isdelete', 'solicitudcompra.fecha', 'solicitudcompra.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('solicitudcompra.idsolicitudcompra', '=', $search)
                        ->orWhere('solicitudcompra.codigo', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('solicitudcompra.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->where( $isordencompra ? [ ['solicitudcompra.isordencompra', '=', 'N'] ] : [] )
            ->with( [ 'arraysolicitudcompradetalle' => function( $query ) {
                $query
                    ->leftJoin('producto as prod', 'solicitudcompradetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('sucursal as suc', 'solicitudcompradetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'solicitudcompradetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('seccioninventario as seccinv', 'solicitudcompradetalle.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
                    ->leftJoin('proveedor as provdor', 'solicitudcompradetalle.fkidproveedor', '=', 'provdor.idproveedor')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'solicitudcompradetalle.idsolicitudcompradetalle', 'solicitudcompradetalle.fkidsolicitudcompra', 'solicitudcompradetalle.fkidseccioninventario',
                        'solicitudcompradetalle.fkidproducto', 'solicitudcompradetalle.fkidsucursal', 'solicitudcompradetalle.fkidalmacen', 'solicitudcompradetalle.fkidproveedor',
                        'solicitudcompradetalle.stockactual', 'solicitudcompradetalle.cantidadpendiente', 'solicitudcompradetalle.cantidadsolicitada', 'solicitudcompradetalle.nota',
                        'solicitudcompradetalle.isordencompra', 'solicitudcompradetalle.fechasolicitada', 'solicitudcompradetalle.fechafinalizada', 
                        'solicitudcompradetalle.costobase', 'solicitudcompradetalle.costounitario', 'solicitudcompradetalle.costosubtotal', 'solicitudcompradetalle.estado',
                        'prod.idproducto', 'prod.nombre as producto', 'prod.codigo', 'prod.peso', 'prod.volumen', 'prod.stockactual', 'prod.valorequivalente',
                        'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',
                        'suc.idsucursal', 'suc.descripcion as sucursal',
                        'alm.idalmacen', 'alm.descripcion as almacen',
                        'seccinv.idseccioninventario', 'seccinv.descripcion as seccioninventario',
                        'provdor.idproveedor', 'provdor.nombre as proveedor', 'provdor.nit as nitproveedor'
                    ] )
                    ->orderBy('solicitudcompradetalle.idsolicitudcompradetalle');
            } ] )
            ->whereNull( 'solicitudcompra.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $solicitudcompra;
    }

    public function newID( )
    {
        $solicitudcompra = DB::table('solicitudcompra')
            ->select('solicitudcompra.idsolicitudcompra')
            ->orderBy('solicitudcompra.idsolicitudcompra', 'DESC')
            ->first();

        return ( is_null( $solicitudcompra ) ) ? 1 : intval( $solicitudcompra->idsolicitudcompra ) + 1;
    }

    public function store( $query, $request )
    {
        $fkidsucursal          = isset( $request->fkidsucursal )          ? $request->fkidsucursal : null;
        $fkidalmacen           = isset( $request->fkidalmacen )           ? $request->fkidalmacen : null;
        $fkidconceptocompra    = isset( $request->fkidconceptocompra )    ? $request->fkidconceptocompra : null;
        $fkidseccioninventario = isset( $request->fkidseccioninventario ) ? $request->fkidseccioninventario : null;
        $fkidproveedor         = isset( $request->fkidproveedor )         ? $request->fkidproveedor : null;
        $fkidmoneda            = isset( $request->fkidmoneda )            ? $request->fkidmoneda : null;
        $fkidusers             = isset( $request->fkidusers )             ? $request->fkidusers : null;
        $fkidtipotransaccion   = isset( $request->fkidtipotransaccion )   ? $request->fkidtipotransaccion : null;

        $codigo          = isset( $request->codigo )         ? $request->codigo : null;
        $tipocambio      = isset( $request->tipocambio )     ? $request->tipocambio : null;
        $fechasolicitada = isset( $request->fechasolicitada ) ? $request->fechasolicitada : null;
        $fechafinalizada = isset( $request->fechafinalizada ) ? $request->fechafinalizada : null;
        $cantidadpendientetotal   = isset( $request->cantidadpendientetotal ) ? $request->cantidadpendientetotal : null;
        $cantidadsolicitadatotal   = isset( $request->cantidadsolicitadatotal ) ? $request->cantidadsolicitadatotal : null;
        $montototal      = isset( $request->montototal ) ? $request->montototal : null;
        $nota            = isset( $request->nota ) ? $request->nota : null;
        $tiposolicitud   = isset( $request->tiposolicitud ) ? $request->tiposolicitud : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $solicitudcompra = $query->create( [
            'fkidsucursal' => $fkidsucursal,
            'fkidalmacen'  => $fkidalmacen,
            'fkidconceptocompra' => $fkidconceptocompra,
            'fkidseccioninventario' => $fkidseccioninventario,
            'fkidproveedor' => $fkidproveedor,
            'fkidmoneda'    => $fkidmoneda,
            'fkidusers'    => $fkidusers,
            'fkidtipotransaccion' => $fkidtipotransaccion,

            'codigo'     => $codigo,
            'tipocambio' => $tipocambio,
            'fechasolicitada' => $fechasolicitada,
            'fechafinalizada' => $fechafinalizada,
            'cantidadpendientetotal' => $cantidadpendientetotal,
            'cantidadsolicitadatotal' => $cantidadsolicitadatotal,
            'montototal'    => $montototal,
            'nota'          => $nota,
            'tiposolicitud' => $tiposolicitud,

            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $solicitudcompra;
    }

    public function upgrade( $query, $request )
    {
        $idsolicitudcompra = isset( $request->idsolicitudcompra ) ? $request->idsolicitudcompra : null;

        $fkidsucursal          = isset( $request->fkidsucursal )          ? $request->fkidsucursal : null;
        $fkidalmacen           = isset( $request->fkidalmacen )           ? $request->fkidalmacen : null;
        $fkidconceptocompra    = isset( $request->fkidconceptocompra )    ? $request->fkidconceptocompra : null;
        $fkidseccioninventario = isset( $request->fkidseccioninventario ) ? $request->fkidseccioninventario : null;
        $fkidproveedor         = isset( $request->fkidproveedor )         ? $request->fkidproveedor : null;
        $fkidmoneda            = isset( $request->fkidmoneda )            ? $request->fkidmoneda : null;
        $fkidusers             = isset( $request->fkidusers )             ? $request->fkidusers : null;
        $fkidtipotransaccion   = isset( $request->fkidtipotransaccion )   ? $request->fkidtipotransaccion : null;

        $codigo          = isset( $request->codigo )         ? $request->codigo : null;
        $tipocambio      = isset( $request->tipocambio )     ? $request->tipocambio : null;
        $fechasolicitada = isset( $request->fechasolicitada ) ? $request->fechasolicitada : null;
        $fechafinalizada = isset( $request->fechafinalizada ) ? $request->fechafinalizada : null;
        $cantidadpendientetotal   = isset( $request->cantidadpendientetotal ) ? $request->cantidadpendientetotal : null;
        $cantidadsolicitadatotal   = isset( $request->cantidadsolicitadatotal ) ? $request->cantidadsolicitadatotal : null;
        $montototal      = isset( $request->montototal ) ? $request->montototal : null;
        $nota            = isset( $request->nota ) ? $request->nota : null;
        $tiposolicitud   = isset( $request->tiposolicitud ) ? $request->tiposolicitud : null;

        $solicitudcompra = $query->where( 'idsolicitudcompra', '=', $idsolicitudcompra )
            ->update( [
                'fkidsucursal' => $fkidsucursal,
                'fkidalmacen'  => $fkidalmacen,
                'fkidconceptocompra' => $fkidconceptocompra,
                'fkidseccioninventario' => $fkidseccioninventario,
                'fkidproveedor' => $fkidproveedor,
                'fkidmoneda'    => $fkidmoneda,
                'fkidusers'    => $fkidusers,
                'fkidtipotransaccion' => $fkidtipotransaccion,

                'codigo'     => $codigo,
                'tipocambio' => $tipocambio,
                'fechasolicitada' => $fechasolicitada,
                'fechafinalizada' => $fechafinalizada,
                'cantidadpendientetotal' => $cantidadpendientetotal,
                'cantidadsolicitadatotal' => $cantidadsolicitadatotal,
                'montototal'    => $montototal,
                'nota'          => $nota,
                'tiposolicitud' => $tiposolicitud,
            ] );

        return $solicitudcompra;
    }

    public function show( $query, $idsolicitudcompra ) {

        $solicitudcompra = $query
            ->leftJoin('sucursal as sucu', 'solicitudcompra.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'solicitudcompra.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptocompra as concepcomp', 'solicitudcompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
            ->leftJoin('seccioninventario as seccinv', 'solicitudcompra.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
            ->leftJoin('proveedor as prov', 'solicitudcompra.fkidproveedor', '=', 'prov.idproveedor')
            ->leftJoin('moneda as mon', 'solicitudcompra.fkidmoneda', '=', 'mon.idmoneda')
            ->leftJoin('tipotransaccion as tpotransac', 'solicitudcompra.fkidtipotransaccion', '=', 'tpotransac.idtipotransaccion')
            ->select( [
                'solicitudcompra.idsolicitudcompra', 'solicitudcompra.codigo', 'solicitudcompra.tipocambio', 'solicitudcompra.cantidadsolicitadatotal',
                'solicitudcompra.fechasolicitada', 'solicitudcompra.fechafinalizada', 'solicitudcompra.cantidadpendientetotal',
                'solicitudcompra.montototal', 'solicitudcompra.nota', 'solicitudcompra.tiposolicitud', 'solicitudcompra.isordencompra',
                'solicitudcompra.fkidtipotransaccion', 'tpotransac.descripcion as tipotransaccion',
                'solicitudcompra.fkidsucursal', 'sucu.descripcion as sucursal',
                'solicitudcompra.fkidalmacen', 'alm.descripcion as almacen',
                'solicitudcompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                'solicitudcompra.fkidseccioninventario', 'seccinv.descripcion as seccioninventario',
                'solicitudcompra.fkidproveedor', 'prov.nombre as proveedor',
                'solicitudcompra.fkidmoneda', 'mon.descripcion as moneda',
                'solicitudcompra.estado', 'solicitudcompra.isdelete', 'solicitudcompra.fecha', 'solicitudcompra.hora'
            ] )
            ->where( 'solicitudcompra.idsolicitudcompra', '=', $idsolicitudcompra )
            ->with( [ 'arraysolicitudcompradetalle' => function( $query ) {
                $query
                    ->leftJoin('producto as prod', 'solicitudcompradetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('sucursal as suc', 'solicitudcompradetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'solicitudcompradetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('seccioninventario as seccinv', 'solicitudcompradetalle.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
                    ->leftJoin('proveedor as provdor', 'solicitudcompradetalle.fkidproveedor', '=', 'provdor.idproveedor')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'solicitudcompradetalle.idsolicitudcompradetalle', 'solicitudcompradetalle.fkidsolicitudcompra', 'solicitudcompradetalle.fkidseccioninventario',
                        'solicitudcompradetalle.fkidproducto', 'solicitudcompradetalle.fkidsucursal', 'solicitudcompradetalle.fkidalmacen', 'solicitudcompradetalle.fkidproveedor',
                        'solicitudcompradetalle.stockactual', 'solicitudcompradetalle.cantidadpendiente', 'solicitudcompradetalle.cantidadsolicitada', 'solicitudcompradetalle.nota',
                        'solicitudcompradetalle.isordencompra', 'solicitudcompradetalle.fechasolicitada', 'solicitudcompradetalle.fechafinalizada', 
                        'solicitudcompradetalle.costobase', 'solicitudcompradetalle.costounitario', 'solicitudcompradetalle.costosubtotal', 'solicitudcompradetalle.estado',
                        'prod.idproducto', 'prod.nombre as producto', 'prod.codigo', 'prod.peso', 'prod.volumen', 'prod.stockactual', 'prod.valorequivalente',
                        'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',
                        'suc.idsucursal', 'suc.descripcion as sucursal',
                        'alm.idalmacen', 'alm.descripcion as almacen',
                        'seccinv.idseccioninventario', 'seccinv.descripcion as seccioninventario',
                        'provdor.idproveedor', 'provdor.nombre as proveedor', 'provdor.nit as nitproveedor'
                    ] )
                    ->orderBy('solicitudcompradetalle.idsolicitudcompradetalle');
            } ] )
            ->whereNull('solicitudcompra.deleted_at')
            ->orderBy('solicitudcompra.idsolicitudcompra', 'DESC')
            ->first();
        
        return $solicitudcompra;
    }

    public function scopeEnable( $query, $request )
    {
        $idsolicitudcompra = $request->idsolicitudcompra;
        $query->where('idsolicitudcompra', '=', $idsolicitudcompra)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idsolicitudcompra = $request->idsolicitudcompra;
        $query->where('idsolicitudcompra', '=', $idsolicitudcompra)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idsolicitudcompra = $request->idsolicitudcompra;
        return $query->where('idsolicitudcompra', '=', $idsolicitudcompra)->delete();
    }

    public function searchByID( $query, $idsolicitudcompra ) {
        $solicitudcompra = $query
            ->leftJoin('sucursal as sucu', 'solicitudcompra.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'solicitudcompra.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptocompra as concepcomp', 'solicitudcompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
            ->leftJoin('seccioninventario as seccinv', 'solicitudcompra.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
            ->leftJoin('proveedor as prov', 'solicitudcompra.fkidproveedor', '=', 'prov.idproveedor')
            ->leftJoin('moneda as mon', 'solicitudcompra.fkidmoneda', '=', 'mon.idmoneda')
            ->leftJoin('tipotransaccion as tpotransac', 'solicitudcompra.fkidtipotransaccion', '=', 'tpotransac.idtipotransaccion')
            ->select( [
                'solicitudcompra.idsolicitudcompra', 'solicitudcompra.codigo', 'solicitudcompra.tipocambio', 'solicitudcompra.cantidadsolicitadatotal',
                'solicitudcompra.fechasolicitada', 'solicitudcompra.fechafinalizada', 'solicitudcompra.cantidadpendientetotal',
                'solicitudcompra.montototal', 'solicitudcompra.nota', 'solicitudcompra.tiposolicitud', 'solicitudcompra.isordencompra',
                'solicitudcompra.fkidtipotransaccion', 'tpotransac.descripcion as tipotransaccion',
                'solicitudcompra.fkidsucursal', 'sucu.descripcion as sucursal',
                'solicitudcompra.fkidalmacen', 'alm.descripcion as almacen',
                'solicitudcompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                'solicitudcompra.fkidseccioninventario', 'seccinv.descripcion as seccioninventario',
                'solicitudcompra.fkidproveedor', 'prov.nombre as proveedor',
                'solicitudcompra.fkidmoneda', 'mon.descripcion as moneda',
                'solicitudcompra.estado', 'solicitudcompra.isdelete', 'solicitudcompra.fecha', 'solicitudcompra.hora'
            ] )
            ->where('solicitudcompra.idsolicitudcompra', '=', $idsolicitudcompra)
            ->with( [ 'arraysolicitudcompradetalle' => function( $query ) {
                $query
                    ->leftJoin('producto as prod', 'solicitudcompradetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('sucursal as suc', 'solicitudcompradetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'solicitudcompradetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('seccioninventario as seccinv', 'solicitudcompradetalle.fkidseccioninventario', '=', 'seccinv.idseccioninventario')
                    ->leftJoin('proveedor as provdor', 'solicitudcompradetalle.fkidproveedor', '=', 'provdor.idproveedor')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'solicitudcompradetalle.idsolicitudcompradetalle', 'solicitudcompradetalle.fkidsolicitudcompra', 'solicitudcompradetalle.fkidseccioninventario',
                        'solicitudcompradetalle.fkidproducto', 'solicitudcompradetalle.fkidsucursal', 'solicitudcompradetalle.fkidalmacen', 'solicitudcompradetalle.fkidproveedor',
                        'solicitudcompradetalle.stockactual', 'solicitudcompradetalle.cantidadpendiente', 'solicitudcompradetalle.cantidadsolicitada', 'solicitudcompradetalle.nota',
                        'solicitudcompradetalle.isordencompra', 'solicitudcompradetalle.fechasolicitada', 'solicitudcompradetalle.fechafinalizada', 
                        'solicitudcompradetalle.costobase', 'solicitudcompradetalle.costounitario', 'solicitudcompradetalle.costosubtotal', 'solicitudcompradetalle.estado',
                        'prod.idproducto', 'prod.nombre as producto', 'prod.codigo', 'prod.peso', 'prod.volumen', 'prod.stockactual', 'prod.valorequivalente',
                        'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',
                        'suc.idsucursal', 'suc.descripcion as sucursal',
                        'alm.idalmacen', 'alm.descripcion as almacen',
                        'seccinv.idseccioninventario', 'seccinv.descripcion as seccioninventario',
                        'provdor.idproveedor', 'provdor.nombre as proveedor', 'provdor.nit as nitproveedor'
                    ] )
                    ->orderBy('solicitudcompradetalle.idsolicitudcompradetalle');
            } ] )
            ->whereNull('solicitudcompra.deleted_at')
            ->orderBy('solicitudcompra.idsolicitudcompra', 'DESC')
            ->first();

        return $solicitudcompra;
    }
    
    public function tieneProveedor( $query, $idproveedor ) {

        $solicitudcompra = $query
            ->where( 'solicitudcompra.fkidproveedor', '=', $idproveedor )
            ->whereNull('solicitudcompra.deleted_at')
            ->get();
        
        return ( sizeof( $solicitudcompra ) > 0 );
    }

    public function tieneConceptoCompra( $query, $idconceptocompra ) {

        $solicitudcompra = $query
            ->where( 'solicitudcompra.fkidconceptocompra', '=', $idconceptocompra )
            ->whereNull('solicitudcompra.deleted_at')
            ->get();
        
        return ( sizeof( $solicitudcompra ) > 0 );
    }

}
