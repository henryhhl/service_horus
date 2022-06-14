<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class NotaIngreso extends Model
{
    use SoftDeletes;

    protected $table      = 'notaingreso';
    protected $primaryKey = 'idnotaingreso';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'codigo' => null, 'nro' => null, 'nromanual' => null, 'tipocambio' => 0, 'cantidadtotal' => 0,
        'montototal' => 0, 'volumentotal' => 0, 'pesototal' => 0, 'nrocajastotal' => 0, 'nota' => null,
        'esnotaingreso' => 'N', 'esingresado' => 'N', 'actualizarcostos' => 'N',
        'fkidusers' => null, 'x_idusuario' => null, 'estado' => 'A',  'isdelete' => 'A', 
    ];

    protected $fillable = [ 
        'fkidsucursal', 'fkidalmacen', 'fkidconceptoinventario', 'fkidmoneda', 'fkidtipotransaccion',
        'codigo', 'nro', 'nromanual', 'fechanotaingreso', 'tipocambio', 'cantidadtotal', 'montototal',
        'volumentotal', 'pesototal', 'nrocajastotal', 'nota', 'esnotaingreso', 'esingresado', 'actualizarcostos',
        'fkidusers', 'x_idusuario', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function arraynotaingresodetalle() {
        return $this->hasMany(
            'App\Models\Comercio\Inventario\NotaIngresoDetalle',
            'fkidnotaingreso',
            'idnotaingreso'
        );
    }

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'ASC';
        $column  = 'notaingreso.idnotaingreso';

        if ( strtoupper( $orderBy ) != 'DESC' ) $orderBy = 'ASC';
        $islike =  Functions::isLikeAndIlike();

        $notaingreso = $query
            ->leftJoin('sucursal as sucu', 'notaingreso.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'notaingreso.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptoinventario as concepinv', 'notaingreso.fkidconceptoinventario', '=', 'concepinv.idconceptoinventario')
            ->leftJoin('moneda as mon', 'notaingreso.fkidmoneda', '=', 'mon.idmoneda')
            ->select( [
                'notaingreso.idnotaingreso', 'notaingreso.codigo', 'notaingreso.nro', 'notaingreso.nromanual', 'notaingreso.fechanotaingreso', 
                'notaingreso.tipocambio', 'notaingreso.cantidadtotal', 'notaingreso.montototal',
                'notaingreso.volumentotal', 'notaingreso.pesototal', 'notaingreso.nrocajastotal', 'notaingreso.estado', 
                'notaingreso.nota', 'notaingreso.esnotaingreso', 'notaingreso.esingresado', 'notaingreso.actualizarcostos',
                'notaingreso.fkidsucursal', 'sucu.descripcion as sucursal',
                'notaingreso.fkidalmacen', 'alm.descripcion as almacen',
                'notaingreso.fkidmoneda', 'mon.descripcion as moneda',
                'notaingreso.fkidconceptoinventario', 'concepinv.descripcion as conceptoinventario',
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query->where('notaingreso.idnotaingreso', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('notaingreso.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'arraynotaingresodetalle' => function( $query ) {
                $query
                    ->leftJoin('sucursal as suc', 'notaingresodetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'notaingresodetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('producto as prod', 'notaingresodetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'notaingresodetalle.idnotaingresodetalle', 'notaingresodetalle.fkidnotaingreso', 'notaingresodetalle.fkidalmacenproductodetalle', 
                        'notaingresodetalle.stockactualanterior', 'notaingresodetalle.cantidad', 'notaingresodetalle.nrocajas', 
                        'notaingresodetalle.costobase', 'notaingresodetalle.costounitario', 'notaingresodetalle.costosubtotal', 'notaingresodetalle.costopromedio',
                        'notaingresodetalle.descuento', 'notaingresodetalle.montodescuento', 
                        'notaingresodetalle.peso', 'notaingresodetalle.pesosubtotal', 'notaingresodetalle.volumen', 'notaingresodetalle.volumensubtotal',
                        'notaingresodetalle.nota', 'notaingresodetalle.fechavencimiento', 
                        'notaingresodetalle.nrolote', 'notaingresodetalle.nrofabrica',

                        'notaingresodetalle.fkidsucursal', 'suc.descripcion as sucursal',
                        'notaingresodetalle.fkidalmacen', 'alm.descripcion as almacen',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'notaingresodetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',

                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',

                    ] )
                    ->orderBy('notaingresodetalle.idnotaingresodetalle');
            } ] )
            ->whereNull( 'notaingreso.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $notaingreso;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'ASC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'notaingreso.idnotaingreso';

        if ( strtoupper( $orderBy ) != 'DESC' ) $orderBy = 'ASC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $notaingreso = $query
            ->leftJoin('sucursal as sucu', 'notaingreso.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'notaingreso.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptoinventario as concepinv', 'notaingreso.fkidconceptoinventario', '=', 'concepinv.idconceptoinventario')
            ->leftJoin('moneda as mon', 'notaingreso.fkidmoneda', '=', 'mon.idmoneda')
            ->select( [
                'notaingreso.idnotaingreso', 'notaingreso.codigo', 'notaingreso.nro', 'notaingreso.nromanual', 'notaingreso.fechanotaingreso', 
                'notaingreso.tipocambio', 'notaingreso.cantidadtotal', 'notaingreso.montototal',
                'notaingreso.volumentotal', 'notaingreso.pesototal', 'notaingreso.nrocajastotal', 'notaingreso.estado', 
                'notaingreso.nota', 'notaingreso.esnotaingreso', 'notaingreso.esingresado', 'notaingreso.actualizarcostos',
                'notaingreso.fkidsucursal', 'sucu.descripcion as sucursal',
                'notaingreso.fkidalmacen', 'alm.descripcion as almacen',
                'notaingreso.fkidmoneda', 'mon.descripcion as moneda',
                'notaingreso.fkidconceptoinventario', 'concepinv.descripcion as conceptoinventario',
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('notaingreso.idnotaingreso', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('notaingreso.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'arraynotaingresodetalle' => function( $query ) {
                $query
                    ->leftJoin('sucursal as suc', 'notaingresodetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'notaingresodetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('producto as prod', 'notaingresodetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'notaingresodetalle.idnotaingresodetalle', 'notaingresodetalle.fkidnotaingreso', 'notaingresodetalle.fkidalmacenproductodetalle', 
                        'notaingresodetalle.stockactualanterior', 'notaingresodetalle.cantidad', 'notaingresodetalle.nrocajas', 
                        'notaingresodetalle.costobase', 'notaingresodetalle.costounitario', 'notaingresodetalle.costosubtotal', 'notaingresodetalle.costopromedio',
                        'notaingresodetalle.descuento', 'notaingresodetalle.montodescuento', 
                        'notaingresodetalle.peso', 'notaingresodetalle.pesosubtotal', 'notaingresodetalle.volumen', 'notaingresodetalle.volumensubtotal',
                        'notaingresodetalle.nota', 'notaingresodetalle.fechavencimiento', 
                        'notaingresodetalle.nrolote', 'notaingresodetalle.nrofabrica',

                        'notaingresodetalle.fkidsucursal', 'suc.descripcion as sucursal',
                        'notaingresodetalle.fkidalmacen', 'alm.descripcion as almacen',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'notaingresodetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',

                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',

                    ] )
                    ->orderBy('notaingresodetalle.idnotaingresodetalle');
            } ] )
            ->whereNull( 'notaingreso.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $notaingreso;
    }

    public function newID( )
    {
        $notaingreso = DB::table('notaingreso')
            ->select('notaingreso.idnotaingreso')
            ->orderBy('notaingreso.idnotaingreso', 'DESC')
            ->first();

        return ( is_null( $notaingreso ) ) ? 1 : intval( $notaingreso->idnotaingreso ) + 1;
    }

    public function store( $query, $request )
    {
        $fkidconceptoinventario = isset( $request->fkidconceptoinventario ) ? $request->fkidconceptoinventario : null;
        $fkidsucursal = isset( $request->fkidsucursal ) ? $request->fkidsucursal : null;
        $fkidalmacen  = isset( $request->fkidalmacen )  ? $request->fkidalmacen : null;
        $fkidmoneda   = isset( $request->fkidmoneda )   ? $request->fkidmoneda : null;
        $fkidtipotransaccion = isset( $request->fkidtipotransaccion ) ? $request->fkidtipotransaccion : null;

        $codigo     = isset( $request->codigo )     ? $request->codigo : null;
        $nro  = isset( $request->nro )  ? $request->nro : '0';
        $nromanual  = isset( $request->nromanual )  ? $request->nromanual : '0';
        $tipocambio = isset( $request->tipocambio ) ? $request->tipocambio : 0;
        $fechanotaingreso = isset( $request->fechanotaingreso ) ? $request->fechanotaingreso : null;

        $cantidadtotal = isset( $request->cantidadtotal ) ? $request->cantidadtotal : 0;
        $montototal    = isset( $request->montototal )    ? $request->montototal : 0;
        $pesototal     = isset( $request->pesototal )     ? $request->pesototal : 0;
        $volumentotal  = isset( $request->volumentotal )  ? $request->volumentotal : 0;
        $nrocajastotal = isset( $request->nrocajastotal ) ? $request->nrocajastotal : 0;
        $nota          = isset( $request->nota )          ? $request->nota : null;

        $esingresado = isset( $request->esingresado ) ? $request->esingresado : "N";
        $esnotaingreso = isset( $request->esnotaingreso ) ? $request->esnotaingreso : "N";
        $actualizarcostos = isset( $request->actualizarcostos ) ? $request->actualizarcostos : "N";
        $estado = isset( $request->estado ) ? $request->estado : "N";

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $notaingreso = $query->create( [
            'fkidconceptoinventario' => $fkidconceptoinventario,
            'fkidsucursal' => $fkidsucursal,
            'fkidalmacen'  => $fkidalmacen,
            'fkidmoneda'   => $fkidmoneda,
            'fkidtipotransaccion' => $fkidtipotransaccion,

            'codigo'     => $codigo,
            'nro'  => $nro,
            'nromanual'  => $nromanual,
            'tipocambio' => $tipocambio,
            'fechanotaingreso' => $fechanotaingreso,
            'cantidadtotal'   => $cantidadtotal,
            'montototal' => $montototal,
            'pesototal'  => $pesototal,
            'volumentotal'  => $volumentotal,
            'nrocajastotal' => $nrocajastotal,

            'esingresado' => $esingresado,
            'esnotaingreso' => $esnotaingreso,
            'actualizarcostos' => $actualizarcostos,
            'estado' => $estado,
            
            'nota'  => $nota,
            'fecha' => $fecha,
            'hora'  => $hora
        ] );

        return $notaingreso;
    }

    public function upgrade( $query, $request )
    {
        $idnotaingreso = isset( $request->idnotaingreso ) ? $request->idnotaingreso : null;
        
        $fkidconceptoinventario = isset( $request->fkidconceptoinventario ) ? $request->fkidconceptoinventario : null;
        $fkidsucursal = isset( $request->fkidsucursal ) ? $request->fkidsucursal : null;
        $fkidalmacen  = isset( $request->fkidalmacen )  ? $request->fkidalmacen : null;
        $fkidmoneda   = isset( $request->fkidmoneda )   ? $request->fkidmoneda : null;
        $fkidtipotransaccion = isset( $request->fkidtipotransaccion ) ? $request->fkidtipotransaccion : null;

        $codigo     = isset( $request->codigo )     ? $request->codigo : null;
        $nro  = isset( $request->nro )  ? $request->nro : '0';
        $nromanual  = isset( $request->nromanual )  ? $request->nromanual : '0';
        $tipocambio = isset( $request->tipocambio ) ? $request->tipocambio : 0;
        $fechanotaingreso = isset( $request->fechanotaingreso ) ? $request->fechanotaingreso : null;

        $cantidadtotal = isset( $request->cantidadtotal ) ? $request->cantidadtotal : 0;
        $montototal    = isset( $request->montototal )    ? $request->montototal : 0;
        $pesototal     = isset( $request->pesototal )     ? $request->pesototal : 0;
        $volumentotal  = isset( $request->volumentotal )  ? $request->volumentotal : 0;
        $nrocajastotal = isset( $request->nrocajastotal ) ? $request->nrocajastotal : 0;
        $nota          = isset( $request->nota )          ? $request->nota : null;

        $esingresado = isset( $request->esingresado ) ? $request->esingresado : "N";
        $esnotaingreso = isset( $request->esnotaingreso ) ? $request->esnotaingreso : "N";
        $actualizarcostos = isset( $request->actualizarcostos ) ? $request->actualizarcostos : "N";
        $estado = isset( $request->estado ) ? $request->estado : "N";

        $notaingreso = $query->where( 'idnotaingreso', '=', $idnotaingreso )
            ->update( [
                'fkidconceptoinventario' => $fkidconceptoinventario,
                'fkidsucursal' => $fkidsucursal,
                'fkidalmacen'  => $fkidalmacen,
                'fkidmoneda'   => $fkidmoneda,
                'fkidtipotransaccion' => $fkidtipotransaccion,

                'codigo'     => $codigo,
                'nro'  => $nro,
                'nromanual'  => $nromanual,
                'tipocambio' => $tipocambio,
                'fechanotaingreso' => $fechanotaingreso,
                'cantidadtotal'   => $cantidadtotal,
                'montototal' => $montototal,
                'pesototal'  => $pesototal,
                'volumentotal'  => $volumentotal,
                'nrocajastotal' => $nrocajastotal,

                'esingresado' => $esingresado,
                'esnotaingreso' => $esnotaingreso,
                'actualizarcostos' => $actualizarcostos,
                'estado' => $estado,
                
                'nota'  => $nota,
            ] );

        return $notaingreso;
    }

    public function show( $query, $idnotaingreso ) {

        $notaingreso = $query
            ->leftJoin('sucursal as sucu', 'notaingreso.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'notaingreso.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptoinventario as concepinv', 'notaingreso.fkidconceptoinventario', '=', 'concepinv.idconceptoinventario')
            ->leftJoin('moneda as mon', 'notaingreso.fkidmoneda', '=', 'mon.idmoneda')
            ->select( [
                'notaingreso.idnotaingreso', 'notaingreso.codigo', 'notaingreso.nro', 'notaingreso.nromanual', 'notaingreso.fechanotaingreso', 
                'notaingreso.tipocambio', 'notaingreso.cantidadtotal', 'notaingreso.montototal',
                'notaingreso.volumentotal', 'notaingreso.pesototal', 'notaingreso.nrocajastotal', 'notaingreso.estado', 
                'notaingreso.nota', 'notaingreso.esnotaingreso', 'notaingreso.esingresado', 'notaingreso.actualizarcostos',
                'notaingreso.fkidsucursal', 'sucu.descripcion as sucursal',
                'notaingreso.fkidalmacen', 'alm.descripcion as almacen',
                'notaingreso.fkidmoneda', 'mon.descripcion as moneda',
                'notaingreso.fkidconceptoinventario', 'concepinv.descripcion as conceptoinventario',
            ] )
            ->with( [ 'arraynotaingresodetalle' => function( $query ) {
                $query
                    ->leftJoin('sucursal as suc', 'notaingresodetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'notaingresodetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('producto as prod', 'notaingresodetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'notaingresodetalle.idnotaingresodetalle', 'notaingresodetalle.fkidnotaingreso', 'notaingresodetalle.fkidalmacenproductodetalle', 
                        'notaingresodetalle.stockactualanterior', 'notaingresodetalle.cantidad', 'notaingresodetalle.nrocajas', 
                        'notaingresodetalle.costobase', 'notaingresodetalle.costounitario', 'notaingresodetalle.costosubtotal', 'notaingresodetalle.costopromedio',
                        'notaingresodetalle.descuento', 'notaingresodetalle.montodescuento', 
                        'notaingresodetalle.peso', 'notaingresodetalle.pesosubtotal', 'notaingresodetalle.volumen', 'notaingresodetalle.volumensubtotal',
                        'notaingresodetalle.nota', 'notaingresodetalle.fechavencimiento', 
                        'notaingresodetalle.nrolote', 'notaingresodetalle.nrofabrica',

                        'notaingresodetalle.fkidsucursal', 'suc.descripcion as sucursal',
                        'notaingresodetalle.fkidalmacen', 'alm.descripcion as almacen',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'notaingresodetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',

                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',

                    ] )
                    ->orderBy('notaingresodetalle.idnotaingresodetalle');
            } ] )
            ->where( 'notaingreso.idnotaingreso', '=', $idnotaingreso )
            ->whereNull('notaingreso.deleted_at')
            ->orderBy('notaingreso.idnotaingreso', 'DESC')
            ->first();
        
        return $notaingreso;
    }

    public function scopeEnable( $query, $request )
    {
        $idnotaingreso = $request->idnotaingreso;
        $query->where('idnotaingreso', '=', $idnotaingreso)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idnotaingreso = $request->idnotaingreso;
        $query->where('idnotaingreso', '=', $idnotaingreso)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idnotaingreso = $request->idnotaingreso;
        return $query->where('idnotaingreso', '=', $idnotaingreso)->delete();
    }

    public function searchByID( $query, $idnotaingreso ) {
        $notaingreso = $query
            ->leftJoin('sucursal as sucu', 'notaingreso.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'notaingreso.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptoinventario as concepinv', 'notaingreso.fkidconceptoinventario', '=', 'concepinv.idconceptoinventario')
            ->leftJoin('moneda as mon', 'notaingreso.fkidmoneda', '=', 'mon.idmoneda')
            ->select( [
                'notaingreso.idnotaingreso', 'notaingreso.codigo', 'notaingreso.nro', 'notaingreso.nromanual', 'notaingreso.fechanotaingreso', 
                'notaingreso.tipocambio', 'notaingreso.cantidadtotal', 'notaingreso.montototal',
                'notaingreso.volumentotal', 'notaingreso.pesototal', 'notaingreso.nrocajastotal', 'notaingreso.estado', 
                'notaingreso.nota', 'notaingreso.esnotaingreso', 'notaingreso.esingresado', 'notaingreso.actualizarcostos',
                'notaingreso.fkidsucursal', 'sucu.descripcion as sucursal',
                'notaingreso.fkidalmacen', 'alm.descripcion as almacen',
                'notaingreso.fkidmoneda', 'mon.descripcion as moneda',
                'notaingreso.fkidconceptoinventario', 'concepinv.descripcion as conceptoinventario',
            ] )
            ->with( [ 'arraynotaingresodetalle' => function( $query ) {
                $query
                    ->leftJoin('sucursal as suc', 'notaingresodetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'notaingresodetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('producto as prod', 'notaingresodetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'notaingresodetalle.idnotaingresodetalle', 'notaingresodetalle.fkidnotaingreso', 'notaingresodetalle.fkidalmacenproductodetalle', 
                        'notaingresodetalle.stockactualanterior', 'notaingresodetalle.cantidad', 'notaingresodetalle.nrocajas', 
                        'notaingresodetalle.costobase', 'notaingresodetalle.costounitario', 'notaingresodetalle.costosubtotal', 'notaingresodetalle.costopromedio',
                        'notaingresodetalle.descuento', 'notaingresodetalle.montodescuento', 
                        'notaingresodetalle.peso', 'notaingresodetalle.pesosubtotal', 'notaingresodetalle.volumen', 'notaingresodetalle.volumensubtotal',
                        'notaingresodetalle.nota', 'notaingresodetalle.fechavencimiento', 
                        'notaingresodetalle.nrolote', 'notaingresodetalle.nrofabrica',

                        'notaingresodetalle.fkidsucursal', 'suc.descripcion as sucursal',
                        'notaingresodetalle.fkidalmacen', 'alm.descripcion as almacen',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'notaingresodetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',

                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',

                    ] )
                    ->orderBy('notaingresodetalle.idnotaingresodetalle');
            } ] )
            ->where('notaingreso.idnotaingreso', '=', $idnotaingreso)
            ->whereNull('notaingreso.deleted_at')
            ->orderBy('notaingreso.idnotaingreso', 'DESC')
            ->first();

        return $notaingreso;
    }

}
