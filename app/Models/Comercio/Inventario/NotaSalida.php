<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class NotaSalida extends Model
{
    use SoftDeletes;

    protected $table      = 'notasalida';
    protected $primaryKey = 'idnotasalida';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'codigo' => null, 'nro' => null, 'nromanual' => null, 'tipocambio' => 0, 'cantidadtotal' => 0,
        'montototal' => 0, 'volumentotal' => 0, 'pesototal' => 0, 'nrocajastotal' => 0, 'nota' => null,
        'esnotasalida' => 'N', 'esingresado' => 'N',
        'fkidusers' => null, 'x_idusuario' => null, 'estado' => 'A',  'isdelete' => 'A', 
    ];

    protected $fillable = [ 
        'fkidsucursal', 'fkidalmacen', 'fkidconceptoinventario', 'fkidmoneda', 'fkidtipotransaccion',
        'codigo', 'nro', 'nromanual', 'fechanotasalida', 'tipocambio', 'cantidadtotal', 'montototal',
        'volumentotal', 'pesototal', 'nrocajastotal', 'nota', 'esnotasalida', 'esingresado',
        'fkidusers', 'x_idusuario', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function arraynotasalidadetalle() {
        return $this->hasMany(
            'App\Models\Comercio\Inventario\NotaSalidaDetalle',
            'fkidnotasalida',
            'idnotasalida'
        );
    }

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'ASC';
        $column  = 'notasalida.idnotasalida';

        if ( strtoupper( $orderBy ) != 'DESC' ) $orderBy = 'ASC';
        $islike =  Functions::isLikeAndIlike();

        $notasalida = $query
            ->leftJoin('sucursal as sucu', 'notasalida.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'notasalida.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptoinventario as concepinv', 'notasalida.fkidconceptoinventario', '=', 'concepinv.idconceptoinventario')
            ->leftJoin('moneda as mon', 'notasalida.fkidmoneda', '=', 'mon.idmoneda')
            ->select( [
                'notasalida.idnotasalida', 'notasalida.codigo', 'notasalida.nro', 'notasalida.nromanual', 'notasalida.fechanotasalida', 
                'notasalida.tipocambio', 'notasalida.cantidadtotal', 'notasalida.montototal',
                'notasalida.volumentotal', 'notasalida.pesototal', 'notasalida.nrocajastotal', 'notasalida.estado', 
                'notasalida.nota', 'notasalida.esnotasalida', 'notasalida.esingresado',
                'notasalida.fkidsucursal', 'sucu.descripcion as sucursal',
                'notasalida.fkidalmacen', 'alm.descripcion as almacen',
                'notasalida.fkidmoneda', 'mon.descripcion as moneda',
                'notasalida.fkidconceptoinventario', 'concepinv.descripcion as conceptoinventario',
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query->where('notasalida.idnotasalida', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('notasalida.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'arraynotasalidadetalle' => function( $query ) {
                $query
                    ->leftJoin('sucursal as suc', 'notasalidadetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'notasalidadetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('producto as prod', 'notasalidadetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'notasalidadetalle.idnotasalidadetalle', 'notasalidadetalle.fkidnotasalida', 'notasalidadetalle.fkidalmacenproductodetalle', 
                        'notasalidadetalle.stockactualanterior', 'notasalidadetalle.cantidad', 'notasalidadetalle.nrocajas', 
                        'notasalidadetalle.costobase', 'notasalidadetalle.costounitario', 'notasalidadetalle.costosubtotal',
                        'notasalidadetalle.descuento', 'notasalidadetalle.montodescuento', 
                        'notasalidadetalle.peso', 'notasalidadetalle.pesosubtotal', 'notasalidadetalle.volumen', 'notasalidadetalle.volumensubtotal',
                        'notasalidadetalle.nota', 'notasalidadetalle.fechavencimiento', 
                        'notasalidadetalle.nrolote', 'notasalidadetalle.nrofabrica',

                        'notasalidadetalle.fkidsucursal', 'suc.descripcion as sucursal',
                        'notasalidadetalle.fkidalmacen', 'alm.descripcion as almacen',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'notasalidadetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',

                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',

                    ] )
                    ->orderBy('notasalidadetalle.idnotasalidadetalle');
            } ] )
            ->whereNull( 'notasalida.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $notasalida;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'ASC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'notasalida.idnotasalida';

        if ( strtoupper( $orderBy ) != 'DESC' ) $orderBy = 'ASC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $notasalida = $query
            ->leftJoin('sucursal as sucu', 'notasalida.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'notasalida.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptoinventario as concepinv', 'notasalida.fkidconceptoinventario', '=', 'concepinv.idconceptoinventario')
            ->leftJoin('moneda as mon', 'notasalida.fkidmoneda', '=', 'mon.idmoneda')
            ->select( [
                'notasalida.idnotasalida', 'notasalida.codigo', 'notasalida.nro', 'notasalida.nromanual', 'notasalida.fechanotasalida', 
                'notasalida.tipocambio', 'notasalida.cantidadtotal', 'notasalida.montototal',
                'notasalida.volumentotal', 'notasalida.pesototal', 'notasalida.nrocajastotal', 'notasalida.estado', 
                'notasalida.nota', 'notasalida.esnotasalida', 'notasalida.esingresado',
                'notasalida.fkidsucursal', 'sucu.descripcion as sucursal',
                'notasalida.fkidalmacen', 'alm.descripcion as almacen',
                'notasalida.fkidmoneda', 'mon.descripcion as moneda',
                'notasalida.fkidconceptoinventario', 'concepinv.descripcion as conceptoinventario',
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('notasalida.idnotasalida', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('notasalida.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'arraynotasalidadetalle' => function( $query ) {
                $query
                    ->leftJoin('sucursal as suc', 'notasalidadetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'notasalidadetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('producto as prod', 'notasalidadetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'notasalidadetalle.idnotasalidadetalle', 'notasalidadetalle.fkidnotasalida', 'notasalidadetalle.fkidalmacenproductodetalle', 
                        'notasalidadetalle.stockactualanterior', 'notasalidadetalle.cantidad', 'notasalidadetalle.nrocajas', 
                        'notasalidadetalle.costobase', 'notasalidadetalle.costounitario', 'notasalidadetalle.costosubtotal', 
                        'notasalidadetalle.descuento', 'notasalidadetalle.montodescuento', 
                        'notasalidadetalle.peso', 'notasalidadetalle.pesosubtotal', 'notasalidadetalle.volumen', 'notasalidadetalle.volumensubtotal',
                        'notasalidadetalle.nota', 'notasalidadetalle.fechavencimiento', 
                        'notasalidadetalle.nrolote', 'notasalidadetalle.nrofabrica',

                        'notasalidadetalle.fkidsucursal', 'suc.descripcion as sucursal',
                        'notasalidadetalle.fkidalmacen', 'alm.descripcion as almacen',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'notasalidadetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',

                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',

                    ] )
                    ->orderBy('notasalidadetalle.idnotasalidadetalle');
            } ] )
            ->whereNull( 'notasalida.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $notasalida;
    }

    public function newID( )
    {
        $notasalida = DB::table('notasalida')
            ->select('notasalida.idnotasalida')
            ->orderBy('notasalida.idnotasalida', 'DESC')
            ->first();

        return ( is_null( $notasalida ) ) ? 1 : intval( $notasalida->idnotasalida ) + 1;
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
        $fechanotasalida = isset( $request->fechanotasalida ) ? $request->fechanotasalida : null;

        $cantidadtotal = isset( $request->cantidadtotal ) ? $request->cantidadtotal : 0;
        $montototal    = isset( $request->montototal )    ? $request->montototal : 0;
        $pesototal     = isset( $request->pesototal )     ? $request->pesototal : 0;
        $volumentotal  = isset( $request->volumentotal )  ? $request->volumentotal : 0;
        $nrocajastotal = isset( $request->nrocajastotal ) ? $request->nrocajastotal : 0;
        $nota          = isset( $request->nota )          ? $request->nota : null;

        $esingresado = isset( $request->esingresado ) ? $request->esingresado : "N";
        $esnotasalida = isset( $request->esnotasalida ) ? $request->esnotasalida : "N";
        $estado = isset( $request->estado ) ? $request->estado : "N";

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $notasalida = $query->create( [
            'fkidconceptoinventario' => $fkidconceptoinventario,
            'fkidsucursal' => $fkidsucursal,
            'fkidalmacen'  => $fkidalmacen,
            'fkidmoneda'   => $fkidmoneda,
            'fkidtipotransaccion' => $fkidtipotransaccion,

            'codigo'     => $codigo,
            'nro'  => $nro,
            'nromanual'  => $nromanual,
            'tipocambio' => $tipocambio,
            'fechanotasalida' => $fechanotasalida,
            'cantidadtotal'   => $cantidadtotal,
            'montototal' => $montototal,
            'pesototal'  => $pesototal,
            'volumentotal'  => $volumentotal,
            'nrocajastotal' => $nrocajastotal,

            'esingresado' => $esingresado,
            'esnotasalida' => $esnotasalida,
            'estado' => $estado,
            
            'nota'  => $nota,
            'fecha' => $fecha,
            'hora'  => $hora
        ] );

        return $notasalida;
    }

    public function upgrade( $query, $request )
    {
        $idnotasalida = isset( $request->idnotasalida ) ? $request->idnotasalida : null;
        
        $fkidconceptoinventario = isset( $request->fkidconceptoinventario ) ? $request->fkidconceptoinventario : null;
        $fkidsucursal = isset( $request->fkidsucursal ) ? $request->fkidsucursal : null;
        $fkidalmacen  = isset( $request->fkidalmacen )  ? $request->fkidalmacen : null;
        $fkidmoneda   = isset( $request->fkidmoneda )   ? $request->fkidmoneda : null;
        $fkidtipotransaccion = isset( $request->fkidtipotransaccion ) ? $request->fkidtipotransaccion : null;

        $codigo     = isset( $request->codigo )     ? $request->codigo : null;
        $nro  = isset( $request->nro )  ? $request->nro : '0';
        $nromanual  = isset( $request->nromanual )  ? $request->nromanual : '0';
        $tipocambio = isset( $request->tipocambio ) ? $request->tipocambio : 0;
        $fechanotasalida = isset( $request->fechanotasalida ) ? $request->fechanotasalida : null;

        $cantidadtotal = isset( $request->cantidadtotal ) ? $request->cantidadtotal : 0;
        $montototal    = isset( $request->montototal )    ? $request->montototal : 0;
        $pesototal     = isset( $request->pesototal )     ? $request->pesototal : 0;
        $volumentotal  = isset( $request->volumentotal )  ? $request->volumentotal : 0;
        $nrocajastotal = isset( $request->nrocajastotal ) ? $request->nrocajastotal : 0;
        $nota          = isset( $request->nota )          ? $request->nota : null;

        $esingresado = isset( $request->esingresado ) ? $request->esingresado : "N";
        $esnotasalida = isset( $request->esnotasalida ) ? $request->esnotasalida : "N";
        $estado = isset( $request->estado ) ? $request->estado : "N";

        $notasalida = $query->where( 'idnotasalida', '=', $idnotasalida )
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
                'fechanotasalida' => $fechanotasalida,
                'cantidadtotal'   => $cantidadtotal,
                'montototal' => $montototal,
                'pesototal'  => $pesototal,
                'volumentotal'  => $volumentotal,
                'nrocajastotal' => $nrocajastotal,

                'esingresado' => $esingresado,
                'esnotasalida' => $esnotasalida,
                'estado' => $estado,
                
                'nota'  => $nota,
            ] );

        return $notasalida;
    }

    public function show( $query, $idnotasalida ) {

        $notasalida = $query
            ->leftJoin('sucursal as sucu', 'notasalida.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'notasalida.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptoinventario as concepinv', 'notasalida.fkidconceptoinventario', '=', 'concepinv.idconceptoinventario')
            ->leftJoin('moneda as mon', 'notasalida.fkidmoneda', '=', 'mon.idmoneda')
            ->select( [
                'notasalida.idnotasalida', 'notasalida.codigo', 'notasalida.nro', 'notasalida.nromanual', 'notasalida.fechanotasalida', 
                'notasalida.tipocambio', 'notasalida.cantidadtotal', 'notasalida.montototal',
                'notasalida.volumentotal', 'notasalida.pesototal', 'notasalida.nrocajastotal', 'notasalida.estado', 
                'notasalida.nota', 'notasalida.esnotasalida', 'notasalida.esingresado',
                'notasalida.fkidsucursal', 'sucu.descripcion as sucursal',
                'notasalida.fkidalmacen', 'alm.descripcion as almacen',
                'notasalida.fkidmoneda', 'mon.descripcion as moneda',
                'notasalida.fkidconceptoinventario', 'concepinv.descripcion as conceptoinventario',
            ] )
            ->with( [ 'arraynotasalidadetalle' => function( $query ) {
                $query
                    ->leftJoin('sucursal as suc', 'notasalidadetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'notasalidadetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('producto as prod', 'notasalidadetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'notasalidadetalle.idnotasalidadetalle', 'notasalidadetalle.fkidnotasalida', 'notasalidadetalle.fkidalmacenproductodetalle', 
                        'notasalidadetalle.stockactualanterior', 'notasalidadetalle.cantidad', 'notasalidadetalle.nrocajas', 
                        'notasalidadetalle.costobase', 'notasalidadetalle.costounitario', 'notasalidadetalle.costosubtotal',
                        'notasalidadetalle.descuento', 'notasalidadetalle.montodescuento', 
                        'notasalidadetalle.peso', 'notasalidadetalle.pesosubtotal', 'notasalidadetalle.volumen', 'notasalidadetalle.volumensubtotal',
                        'notasalidadetalle.nota', 'notasalidadetalle.fechavencimiento', 
                        'notasalidadetalle.nrolote', 'notasalidadetalle.nrofabrica',

                        'notasalidadetalle.fkidsucursal', 'suc.descripcion as sucursal',
                        'notasalidadetalle.fkidalmacen', 'alm.descripcion as almacen',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'notasalidadetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',

                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',

                    ] )
                    ->orderBy('notasalidadetalle.idnotasalidadetalle');
            } ] )
            ->where( 'notasalida.idnotasalida', '=', $idnotasalida )
            ->whereNull('notasalida.deleted_at')
            ->orderBy('notasalida.idnotasalida', 'DESC')
            ->first();
        
        return $notasalida;
    }

    public function scopeEnable( $query, $request )
    {
        $idnotasalida = $request->idnotasalida;
        $query->where('idnotasalida', '=', $idnotasalida)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idnotasalida = $request->idnotasalida;
        $query->where('idnotasalida', '=', $idnotasalida)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idnotasalida = $request->idnotasalida;
        return $query->where('idnotasalida', '=', $idnotasalida)->delete();
    }

    public function searchByID( $query, $idnotasalida ) {
        $notasalida = $query
            ->leftJoin('sucursal as sucu', 'notasalida.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'notasalida.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptoinventario as concepinv', 'notasalida.fkidconceptoinventario', '=', 'concepinv.idconceptoinventario')
            ->leftJoin('moneda as mon', 'notasalida.fkidmoneda', '=', 'mon.idmoneda')
            ->select( [
                'notasalida.idnotasalida', 'notasalida.codigo', 'notasalida.nro', 'notasalida.nromanual', 'notasalida.fechanotasalida', 
                'notasalida.tipocambio', 'notasalida.cantidadtotal', 'notasalida.montototal',
                'notasalida.volumentotal', 'notasalida.pesototal', 'notasalida.nrocajastotal', 'notasalida.estado', 
                'notasalida.nota', 'notasalida.esnotasalida', 'notasalida.esingresado',
                'notasalida.fkidsucursal', 'sucu.descripcion as sucursal',
                'notasalida.fkidalmacen', 'alm.descripcion as almacen',
                'notasalida.fkidmoneda', 'mon.descripcion as moneda',
                'notasalida.fkidconceptoinventario', 'concepinv.descripcion as conceptoinventario',
            ] )
            ->with( [ 'arraynotasalidadetalle' => function( $query ) {
                $query
                    ->leftJoin('sucursal as suc', 'notasalidadetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'notasalidadetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('producto as prod', 'notasalidadetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'notasalidadetalle.idnotasalidadetalle', 'notasalidadetalle.fkidnotasalida', 'notasalidadetalle.fkidalmacenproductodetalle', 
                        'notasalidadetalle.stockactualanterior', 'notasalidadetalle.cantidad', 'notasalidadetalle.nrocajas', 
                        'notasalidadetalle.costobase', 'notasalidadetalle.costounitario', 'notasalidadetalle.costosubtotal',
                        'notasalidadetalle.descuento', 'notasalidadetalle.montodescuento', 
                        'notasalidadetalle.peso', 'notasalidadetalle.pesosubtotal', 'notasalidadetalle.volumen', 'notasalidadetalle.volumensubtotal',
                        'notasalidadetalle.nota', 'notasalidadetalle.fechavencimiento', 
                        'notasalidadetalle.nrolote', 'notasalidadetalle.nrofabrica',

                        'notasalidadetalle.fkidsucursal', 'suc.descripcion as sucursal',
                        'notasalidadetalle.fkidalmacen', 'alm.descripcion as almacen',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'notasalidadetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',

                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',

                    ] )
                    ->orderBy('notasalidadetalle.idnotasalidadetalle');
            } ] )
            ->where('notasalida.idnotasalida', '=', $idnotasalida)
            ->whereNull('notasalida.deleted_at')
            ->orderBy('notasalida.idnotasalida', 'DESC')
            ->first();

        return $notasalida;
    }
    
}