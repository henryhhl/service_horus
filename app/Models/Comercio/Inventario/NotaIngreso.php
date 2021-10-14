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
        'estado' => 'A',  'isdelete' => 'A', 
        'codigo' => null, 'nromanual' => '0', 'tipocambio' => 0,
        'cantidadtotal' => 0, 'montototal' => 0, 'pesototal' => 0, 'volumentotal' => 0, 
        'nota' => null, 'esingresado' => 'N', 'nrocajastotal' => 0,
    ];

    protected $fillable = [ 
        'fkidsucursal', 'fkidalmacen', 'fkidconceptoinventario', 'fkidmoneda',
        'codigo', 'nromanual', 'tipocambio', 'fechanotaingreso', 'cantidadtotal',
        'montototal', 'pesototal', 'volumentotal', 'nota', 'esingresado', 'nrocajastotal',
        'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function notaingresodetalle() {
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
                'notaingreso.idnotaingreso', 'notaingreso.codigo', 'notaingreso.nromanual', 'notaingreso.tipocambio',
                'notaingreso.fechanotaingreso', 'notaingreso.cantidadtotal', 'notaingreso.montototal', 'notaingreso.pesototal',
                'notaingreso.volumentotal', 'notaingreso.nrocajastotal', 'notaingreso.nota', 'notaingreso.esingresado',
                'notaingreso.fkidsucursal', 'sucu.descripcion as sucursal',
                'notaingreso.fkidalmacen', 'alm.descripcion as almacen',
                'notaingreso.fkidmoneda', 'mon.descripcion as moneda',
                'notaingreso.fkidconceptoinventario', 'concepinv.descripcion as conceptoinventario',
                'notaingreso.estado', 'notaingreso.isdelete', 'notaingreso.fecha', 'notaingreso.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('notaingreso.idnotaingreso', '=', $search)
                        ->orWhere('notaingreso.codigo', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('notaingreso.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'notaingresodetalle' => function( $query ) {
                $query
                    ->leftJoin('almacenunidadmedidaproducto as almunidmedprod', 'notaingresodetalle.fkidalmacenunidadmedidaproducto', '=', 'almunidmedprod.idalmacenunidadmedidaproducto')
                    ->leftJoin('unidadmedidaproducto as unidmedprod', 'almunidmedprod.fkidunidadmedidaproducto', '=', 'unidmedprod.idunidadmedidaproducto')
                    ->leftJoin('unidadmedida as unidmed', 'unidmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('producto as prod', 'unidmedprod.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->select( 
                        'notaingresodetalle.idnotaingresodetalle', 'notaingresodetalle.fkidnotaingreso', 
                        'notaingresodetalle.fkidalmacenunidadmedidaproducto', 'almunidmedprod.fkidunidadmedidaproducto',
                        'notaingresodetalle.cantidad', 'notaingresodetalle.costounitario', 'notaingresodetalle.costosubtotal',
                        'notaingresodetalle.nrocajas', 'notaingresodetalle.peso', 'notaingresodetalle.pesosubtotal',
                        'notaingresodetalle.volumen', 'notaingresodetalle.volumensubtotal', 'notaingresodetalle.fechavencimiento',
                        'notaingresodetalle.nrolote', 'notaingresodetalle.nrofabrica', 'notaingresodetalle.precio',
                        'notaingresodetalle.nota', 'notaingresodetalle.esingresado', 'notaingresodetalle.estado',
                        'unidmedprod.peso as pesounidadmedida', 'unidmedprod.costo', 'unidmedprod.stock',
                        'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'prod.idproducto', 'prod.nombre', 'prod.codigo',
                        'ciud.idciudad', 'ciud.descripcion as ciudadorigen',
                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca'
                    )
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
                'notaingreso.idnotaingreso', 'notaingreso.codigo', 'notaingreso.nromanual', 'notaingreso.tipocambio',
                'notaingreso.fechanotaingreso', 'notaingreso.cantidadtotal', 'notaingreso.montototal', 'notaingreso.pesototal',
                'notaingreso.volumentotal', 'notaingreso.nrocajastotal', 'notaingreso.nota', 'notaingreso.esingresado',
                'notaingreso.fkidsucursal', 'sucu.descripcion as sucursal',
                'notaingreso.fkidalmacen', 'alm.descripcion as almacen',
                'notaingreso.fkidmoneda', 'mon.descripcion as moneda',
                'notaingreso.fkidconceptoinventario', 'concepinv.descripcion as conceptoinventario',
                'notaingreso.estado', 'notaingreso.isdelete', 'notaingreso.fecha', 'notaingreso.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('notaingreso.idnotaingreso', '=', $search)
                        ->orWhere('notaingreso.codigo', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('notaingreso.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'notaingresodetalle' => function( $query ) {
                $query
                    ->leftJoin('almacenunidadmedidaproducto as almunidmedprod', 'notaingresodetalle.fkidalmacenunidadmedidaproducto', '=', 'almunidmedprod.idalmacenunidadmedidaproducto')
                    ->leftJoin('unidadmedidaproducto as unidmedprod', 'almunidmedprod.fkidunidadmedidaproducto', '=', 'unidmedprod.idunidadmedidaproducto')
                    ->leftJoin('unidadmedida as unidmed', 'unidmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('producto as prod', 'unidmedprod.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->select( 
                        'notaingresodetalle.idnotaingresodetalle', 'notaingresodetalle.fkidnotaingreso', 
                        'notaingresodetalle.fkidalmacenunidadmedidaproducto', 'almunidmedprod.fkidunidadmedidaproducto',
                        'notaingresodetalle.cantidad', 'notaingresodetalle.costounitario', 'notaingresodetalle.costosubtotal',
                        'notaingresodetalle.nrocajas', 'notaingresodetalle.peso', 'notaingresodetalle.pesosubtotal',
                        'notaingresodetalle.volumen', 'notaingresodetalle.volumensubtotal', 'notaingresodetalle.fechavencimiento',
                        'notaingresodetalle.nrolote', 'notaingresodetalle.nrofabrica', 'notaingresodetalle.precio',
                        'notaingresodetalle.nota', 'notaingresodetalle.esingresado', 'notaingresodetalle.estado',
                        'unidmedprod.peso as pesounidadmedida', 'unidmedprod.costo', 'unidmedprod.stock',
                        'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'prod.idproducto', 'prod.nombre', 'prod.codigo',
                        'ciud.idciudad', 'ciud.descripcion as ciudadorigen',
                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca'
                    )
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

        $codigo     = isset( $request->codigo )     ? $request->codigo : null;
        $nromanual  = isset( $request->nromanual )  ? $request->nromanual : '0';
        $tipocambio = isset( $request->tipocambio ) ? $request->tipocambio : 0;
        $fechanotaingreso = isset( $request->fechanotaingreso ) ? $request->fechanotaingreso : null;
        $cantidadtotal = isset( $request->cantidadtotal ) ? $request->cantidadtotal : 0;
        $montototal    = isset( $request->montototal )    ? $request->montototal : 0;
        $pesototal     = isset( $request->pesototal )     ? $request->pesototal : 0;
        $volumentotal  = isset( $request->volumentotal )  ? $request->volumentotal : 0;
        $nrocajastotal = isset( $request->nrocajastotal ) ? $request->nrocajastotal : 0;
        $nota          = isset( $request->nota )          ? $request->nota : null;
        $esingresado   = isset( $request->esingresado )   ? $request->esingresado : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $notaingreso = $query->create( [
            'fkidconceptoinventario' => $fkidconceptoinventario,
            'fkidsucursal' => $fkidsucursal,
            'fkidalmacen'  => $fkidalmacen,
            'fkidmoneda'   => $fkidmoneda,

            'codigo'     => $codigo,
            'nromanual'  => $nromanual,
            'tipocambio' => $tipocambio,
            'fechanotaingreso' => $fechanotaingreso,
            'cantidadtotal'   => $cantidadtotal,
            'montototal' => $montototal,
            'pesototal'  => $pesototal,
            'volumentotal'  => $volumentotal,
            'nrocajastotal' => $nrocajastotal,
            'esingresado'   => $esingresado,
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

        $codigo     = isset( $request->codigo )     ? $request->codigo : null;
        $nromanual  = isset( $request->nromanual )  ? $request->nromanual : '0';
        $tipocambio = isset( $request->tipocambio ) ? $request->tipocambio : 0;
        $fechanotaingreso = isset( $request->fechanotaingreso ) ? $request->fechanotaingreso : null;
        $cantidadtotal = isset( $request->cantidadtotal ) ? $request->cantidadtotal : 0;
        $montototal    = isset( $request->montototal )    ? $request->montototal : 0;
        $pesototal     = isset( $request->pesototal )     ? $request->pesototal : 0;
        $volumentotal  = isset( $request->volumentotal )  ? $request->volumentotal : 0;
        $nrocajastotal = isset( $request->nrocajastotal ) ? $request->nrocajastotal : 0;
        $nota          = isset( $request->nota )          ? $request->nota : null;
        $esingresado   = isset( $request->esingresado )   ? $request->esingresado : null;

        $notaingreso = $query->where( 'idnotaingreso', '=', $idnotaingreso )
            ->update( [
                'fkidconceptoinventario' => $fkidconceptoinventario,
                'fkidsucursal' => $fkidsucursal,
                'fkidalmacen'  => $fkidalmacen,
                'fkidmoneda'   => $fkidmoneda,

                'codigo'     => $codigo,
                'nromanual'  => $nromanual,
                'tipocambio' => $tipocambio,
                'fechanotaingreso' => $fechanotaingreso,
                'cantidadtotal'   => $cantidadtotal,
                'montototal' => $montototal,
                'pesototal'  => $pesototal,
                'volumentotal'  => $volumentotal,
                'nrocajastotal' => $nrocajastotal,
                'esingresado'   => $esingresado,
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
                'notaingreso.idnotaingreso', 'notaingreso.codigo', 'notaingreso.nromanual', 'notaingreso.tipocambio',
                'notaingreso.fechanotaingreso', 'notaingreso.cantidadtotal', 'notaingreso.montototal', 'notaingreso.pesototal',
                'notaingreso.volumentotal', 'notaingreso.nrocajastotal', 'notaingreso.nota', 'notaingreso.esingresado',
                'notaingreso.fkidsucursal', 'sucu.descripcion as sucursal',
                'notaingreso.fkidalmacen', 'alm.descripcion as almacen',
                'notaingreso.fkidmoneda', 'mon.descripcion as moneda',
                'notaingreso.fkidconceptoinventario', 'concepinv.descripcion as conceptoinventario',
                'notaingreso.estado', 'notaingreso.isdelete', 'notaingreso.fecha', 'notaingreso.hora'
            ] )
            ->with( [ 'notaingresodetalle' => function( $query ) {
                $query
                    ->leftJoin('almacenunidadmedidaproducto as almunidmedprod', 'notaingresodetalle.fkidalmacenunidadmedidaproducto', '=', 'almunidmedprod.idalmacenunidadmedidaproducto')
                    ->leftJoin('unidadmedidaproducto as unidmedprod', 'almunidmedprod.fkidunidadmedidaproducto', '=', 'unidmedprod.idunidadmedidaproducto')
                    ->leftJoin('unidadmedida as unidmed', 'unidmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('producto as prod', 'unidmedprod.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->select( 
                        'notaingresodetalle.idnotaingresodetalle', 'notaingresodetalle.fkidnotaingreso', 
                        'notaingresodetalle.fkidalmacenunidadmedidaproducto', 'almunidmedprod.fkidunidadmedidaproducto',
                        'notaingresodetalle.cantidad', 'notaingresodetalle.costounitario', 'notaingresodetalle.costosubtotal',
                        'notaingresodetalle.nrocajas', 'notaingresodetalle.peso', 'notaingresodetalle.pesosubtotal',
                        'notaingresodetalle.volumen', 'notaingresodetalle.volumensubtotal', 'notaingresodetalle.fechavencimiento',
                        'notaingresodetalle.nrolote', 'notaingresodetalle.nrofabrica', 'notaingresodetalle.precio',
                        'notaingresodetalle.nota', 'notaingresodetalle.esingresado', 'notaingresodetalle.estado',
                        'unidmedprod.peso as pesounidadmedida', 'unidmedprod.costo', 'unidmedprod.stock',
                        'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'prod.idproducto', 'prod.nombre', 'prod.codigo',
                        'ciud.idciudad', 'ciud.descripcion as ciudadorigen',
                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca'
                    )
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
        $query->where('idnotaingreso', '=', $idnotaingreso)->delete();
    }

    public function searchByID( $query, $idnotaingreso ) {
        $notaingreso = $query
            ->leftJoin('sucursal as sucu', 'notaingreso.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'notaingreso.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptoinventario as concepinv', 'notaingreso.fkidconceptoinventario', '=', 'concepinv.idconceptoinventario')
            ->leftJoin('moneda as mon', 'notaingreso.fkidmoneda', '=', 'mon.idmoneda')
            ->select( [
                'notaingreso.idnotaingreso', 'notaingreso.codigo', 'notaingreso.nromanual', 'notaingreso.tipocambio',
                'notaingreso.fechanotaingreso', 'notaingreso.cantidadtotal', 'notaingreso.montototal', 'notaingreso.pesototal',
                'notaingreso.volumentotal', 'notaingreso.nrocajastotal', 'notaingreso.nota', 'notaingreso.esingresado',
                'notaingreso.fkidsucursal', 'sucu.descripcion as sucursal',
                'notaingreso.fkidalmacen', 'alm.descripcion as almacen',
                'notaingreso.fkidmoneda', 'mon.descripcion as moneda',
                'notaingreso.fkidconceptoinventario', 'concepinv.descripcion as conceptoinventario',
                'notaingreso.estado', 'notaingreso.isdelete', 'notaingreso.fecha', 'notaingreso.hora'
            ] )
            ->with( [ 'notaingresodetalle' => function( $query ) {
                $query
                    ->leftJoin('almacenunidadmedidaproducto as almunidmedprod', 'notaingresodetalle.fkidalmacenunidadmedidaproducto', '=', 'almunidmedprod.idalmacenunidadmedidaproducto')
                    ->leftJoin('unidadmedidaproducto as unidmedprod', 'almunidmedprod.fkidunidadmedidaproducto', '=', 'unidmedprod.idunidadmedidaproducto')
                    ->leftJoin('unidadmedida as unidmed', 'unidmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('producto as prod', 'unidmedprod.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->select( 
                        'notaingresodetalle.idnotaingresodetalle', 'notaingresodetalle.fkidnotaingreso', 
                        'notaingresodetalle.fkidalmacenunidadmedidaproducto', 'almunidmedprod.fkidunidadmedidaproducto',
                        'notaingresodetalle.cantidad', 'notaingresodetalle.costounitario', 'notaingresodetalle.costosubtotal',
                        'notaingresodetalle.nrocajas', 'notaingresodetalle.peso', 'notaingresodetalle.pesosubtotal',
                        'notaingresodetalle.volumen', 'notaingresodetalle.volumensubtotal', 'notaingresodetalle.fechavencimiento',
                        'notaingresodetalle.nrolote', 'notaingresodetalle.nrofabrica', 'notaingresodetalle.precio',
                        'notaingresodetalle.nota', 'notaingresodetalle.esingresado', 'notaingresodetalle.estado',
                        'unidmedprod.peso as pesounidadmedida', 'unidmedprod.costo', 'unidmedprod.stock',
                        'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'prod.idproducto', 'prod.nombre', 'prod.codigo',
                        'ciud.idciudad', 'ciud.descripcion as ciudadorigen',
                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca'
                    )
                    ->orderBy('notaingresodetalle.idnotaingresodetalle');
            } ] )
            ->where('notaingreso.idnotaingreso', '=', $idnotaingreso)
            ->whereNull('notaingreso.deleted_at')
            ->orderBy('notaingreso.idnotaingreso', 'DESC')
            ->first();

        return $notaingreso;
    }

}
