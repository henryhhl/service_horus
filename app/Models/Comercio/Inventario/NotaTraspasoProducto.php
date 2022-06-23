<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class NotaTraspasoProducto extends Model
{
    use SoftDeletes;

    protected $table      = 'notatraspasoproducto';
    protected $primaryKey = 'idnotatraspasoproducto';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'codigo' => null, 'nromanual' => null, 'tipocambio' => 0, 'cantidadtotal' => 0,
        'montototal' => 0, 'volumentotal' => 0, 'pesototal' => 0, 'nrocajastotal' => 0, 'nota' => null,
        'fkidusers' => null, 'x_idusuario' => null, 'estado' => 'A',  'isdelete' => 'A', 
    ];

    protected $fillable = [ 
        'fkidsucursalingreso', 'fkidsucursalsalida', 'fkidalmaceningreso', 'fkidalmacensalida', 'fkidconceptoinventario', 'fkidmoneda', 'fkidtipotransaccion',
        'codigo', 'nromanual', 'fechanotatraspaso', 'tipocambio', 'cantidadtotal', 'montototal',
        'volumentotal', 'pesototal', 'nrocajastotal', 'nota',
        'fkidusers', 'x_idusuario', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function arraynotatraspasoproductodetalle() {
        return $this->hasMany(
            'App\Models\Comercio\Inventario\NotaTraspasoProductoDetalle',
            'fkidnotatraspasoproducto',
            'idnotatraspasoproducto'
        );
    }

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'ASC';
        $column  = 'notatraspasoproducto.idnotatraspasoproducto';

        if ( strtoupper( $orderBy ) != 'DESC' ) $orderBy = 'ASC';
        $islike =  Functions::isLikeAndIlike();

        $notatraspasoproducto = $query
            ->leftJoin('sucursal as sucuing', 'notatraspasoproducto.fkidsucursalingreso', '=', 'sucuing.idsucursal')
            ->leftJoin('sucursal as sucusal', 'notatraspasoproducto.fkidsucursalsalida', '=', 'sucusal.idsucursal')
            ->leftJoin('almacen as alming', 'notatraspasoproducto.fkidalmaceningreso', '=', 'alming.idalmacen')
            ->leftJoin('almacen as almsal', 'notatraspasoproducto.fkidalmacensalida', '=', 'almsal.idalmacen')
            ->leftJoin('conceptoinventario as concepinv', 'notatraspasoproducto.fkidconceptoinventario', '=', 'concepinv.idconceptoinventario')
            ->leftJoin('moneda as mon', 'notatraspasoproducto.fkidmoneda', '=', 'mon.idmoneda')
            ->select( [
                'notatraspasoproducto.idnotatraspasoproducto', 'notatraspasoproducto.codigo','notatraspasoproducto.nromanual', 'notatraspasoproducto.fechanotatraspaso', 
                'notatraspasoproducto.tipocambio', 'notatraspasoproducto.cantidadtotal', 'notatraspasoproducto.montototal',
                'notatraspasoproducto.volumentotal', 'notatraspasoproducto.pesototal', 'notatraspasoproducto.nrocajastotal', 'notatraspasoproducto.estado', 'notatraspasoproducto.nota',
                'notatraspasoproducto.fkidsucursalingreso', 'sucuing.descripcion as sucursalingreso',
                'notatraspasoproducto.fkidsucursalsalida', 'sucusal.descripcion as sucursalsalida',
                'notatraspasoproducto.fkidalmaceningreso', 'alming.descripcion as almaceningreso',
                'notatraspasoproducto.fkidalmacensalida', 'almsal.descripcion as almacensalida',
                'notatraspasoproducto.fkidmoneda', 'mon.descripcion as moneda',
                'notatraspasoproducto.fkidconceptoinventario', 'concepinv.descripcion as conceptoinventario',
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query->where('notatraspasoproducto.idnotatraspasoproducto', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('notatraspasoproducto.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'arraynotatraspasoproductodetalle' => function( $query ) {
                $query
                    ->leftJoin('sucursal as sucing', 'notatraspasoproductodetalle.fkidsucursalingreso', '=', 'sucing.idsucursal')
                    ->leftJoin('sucursal as sucsal', 'notatraspasoproductodetalle.fkidsucursalsalida', '=', 'sucsal.idsucursal')
                    ->leftJoin('almacen as alming', 'notatraspasoproductodetalle.fkidalmaceningreso', '=', 'alming.idalmacen')
                    ->leftJoin('almacen as almsal', 'notatraspasoproductodetalle.fkidalmacensalida', '=', 'almsal.idalmacen')
                    ->leftJoin('producto as prod', 'notatraspasoproductodetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'notatraspasoproductodetalle.idnotatraspasoproductodetalle', 'notatraspasoproductodetalle.fkidnotatraspasoproducto', 
                        'notatraspasoproductodetalle.fkidalmacenproductodetalleingreso', 'notatraspasoproductodetalle.fkidalmacenproductodetallesalida', 
                        'notatraspasoproductodetalle.stockactualanterior', 'notatraspasoproductodetalle.cantidad', 'notatraspasoproductodetalle.nrocajas', 
                        'notatraspasoproductodetalle.costobase', 'notatraspasoproductodetalle.costounitarioingreso', 'notatraspasoproductodetalle.costounitariosalida', 
                        'notatraspasoproductodetalle.costosubtotalingreso', 'notatraspasoproductodetalle.costosubtotalsalida',
                        'notatraspasoproductodetalle.descuento', 'notatraspasoproductodetalle.montodescuento', 
                        'notatraspasoproductodetalle.peso', 'notatraspasoproductodetalle.pesosubtotal', 'notatraspasoproductodetalle.volumen', 'notatraspasoproductodetalle.volumensubtotal',
                        'notatraspasoproductodetalle.nota', 'notatraspasoproductodetalle.fechavencimiento', 
                        'notatraspasoproductodetalle.nrolote', 'notatraspasoproductodetalle.nrofabrica',

                        'notatraspasoproductodetalle.fkidsucursalingreso', 'sucing.descripcion as sucursalingreso',
                        'notatraspasoproductodetalle.fkidsucursalsalida', 'sucsal.descripcion as sucursalsalida',
                        'notatraspasoproductodetalle.fkidalmaceningreso', 'alming.descripcion as almaceningreso',
                        'notatraspasoproductodetalle.fkidalmacensalida', 'almsal.descripcion as almacensalida',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'notatraspasoproductodetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',

                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',

                    ] )
                    ->orderBy('notatraspasoproductodetalle.idnotatraspasoproductodetalle');
            } ] )
            ->whereNull( 'notatraspasoproducto.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $notatraspasoproducto;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'ASC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'notatraspasoproducto.idnotatraspasoproducto';

        if ( strtoupper( $orderBy ) != 'DESC' ) $orderBy = 'ASC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $notatraspasoproducto = $query
            ->leftJoin('sucursal as sucuing', 'notatraspasoproducto.fkidsucursalingreso', '=', 'sucuing.idsucursal')
            ->leftJoin('sucursal as sucusal', 'notatraspasoproducto.fkidsucursalsalida', '=', 'sucusal.idsucursal')
            ->leftJoin('almacen as alming', 'notatraspasoproducto.fkidalmaceningreso', '=', 'alming.idalmacen')
            ->leftJoin('almacen as almsal', 'notatraspasoproducto.fkidalmacensalida', '=', 'almsal.idalmacen')
            ->leftJoin('conceptoinventario as concepinv', 'notatraspasoproducto.fkidconceptoinventario', '=', 'concepinv.idconceptoinventario')
            ->leftJoin('moneda as mon', 'notatraspasoproducto.fkidmoneda', '=', 'mon.idmoneda')
            ->select( [
                'notatraspasoproducto.idnotatraspasoproducto', 'notatraspasoproducto.codigo','notatraspasoproducto.nromanual', 'notatraspasoproducto.fechanotatraspaso', 
                'notatraspasoproducto.tipocambio', 'notatraspasoproducto.cantidadtotal', 'notatraspasoproducto.montototal',
                'notatraspasoproducto.volumentotal', 'notatraspasoproducto.pesototal', 'notatraspasoproducto.nrocajastotal', 'notatraspasoproducto.estado', 'notatraspasoproducto.nota',
                'notatraspasoproducto.fkidsucursalingreso', 'sucuing.descripcion as sucursalingreso',
                'notatraspasoproducto.fkidsucursalsalida', 'sucusal.descripcion as sucursalsalida',
                'notatraspasoproducto.fkidalmaceningreso', 'alming.descripcion as almaceningreso',
                'notatraspasoproducto.fkidalmacensalida', 'almsal.descripcion as almacensalida',
                'notatraspasoproducto.fkidmoneda', 'mon.descripcion as moneda',
                'notatraspasoproducto.fkidconceptoinventario', 'concepinv.descripcion as conceptoinventario',
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('notatraspasoproducto.idnotatraspasoproducto', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('notatraspasoproducto.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'arraynotatraspasoproductodetalle' => function( $query ) {
                $query
                    ->leftJoin('sucursal as sucing', 'notatraspasoproductodetalle.fkidsucursalingreso', '=', 'sucing.idsucursal')
                    ->leftJoin('sucursal as sucsal', 'notatraspasoproductodetalle.fkidsucursalsalida', '=', 'sucsal.idsucursal')
                    ->leftJoin('almacen as alming', 'notatraspasoproductodetalle.fkidalmaceningreso', '=', 'alming.idalmacen')
                    ->leftJoin('almacen as almsal', 'notatraspasoproductodetalle.fkidalmacensalida', '=', 'almsal.idalmacen')
                    ->leftJoin('producto as prod', 'notatraspasoproductodetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'notatraspasoproductodetalle.idnotatraspasoproductodetalle', 'notatraspasoproductodetalle.fkidnotatraspasoproducto', 
                        'notatraspasoproductodetalle.fkidalmacenproductodetalleingreso', 'notatraspasoproductodetalle.fkidalmacenproductodetallesalida', 
                        'notatraspasoproductodetalle.stockactualanterior', 'notatraspasoproductodetalle.cantidad', 'notatraspasoproductodetalle.nrocajas', 
                        'notatraspasoproductodetalle.costobase', 'notatraspasoproductodetalle.costounitarioingreso', 'notatraspasoproductodetalle.costounitariosalida', 
                        'notatraspasoproductodetalle.costosubtotalingreso', 'notatraspasoproductodetalle.costosubtotalsalida',
                        'notatraspasoproductodetalle.descuento', 'notatraspasoproductodetalle.montodescuento', 
                        'notatraspasoproductodetalle.peso', 'notatraspasoproductodetalle.pesosubtotal', 'notatraspasoproductodetalle.volumen', 'notatraspasoproductodetalle.volumensubtotal',
                        'notatraspasoproductodetalle.nota', 'notatraspasoproductodetalle.fechavencimiento', 
                        'notatraspasoproductodetalle.nrolote', 'notatraspasoproductodetalle.nrofabrica',

                        'notatraspasoproductodetalle.fkidsucursalingreso', 'sucing.descripcion as sucursalingreso',
                        'notatraspasoproductodetalle.fkidsucursalsalida', 'sucsal.descripcion as sucursalsalida',
                        'notatraspasoproductodetalle.fkidalmaceningreso', 'alming.descripcion as almaceningreso',
                        'notatraspasoproductodetalle.fkidalmacensalida', 'almsal.descripcion as almacensalida',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'notatraspasoproductodetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',

                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',

                    ] )
                    ->orderBy('notatraspasoproductodetalle.idnotatraspasoproductodetalle');
            } ] )
            ->whereNull( 'notatraspasoproducto.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $notatraspasoproducto;
    }

    public function newID( )
    {
        $notatraspasoproducto = DB::table('notatraspasoproducto')
            ->select('notatraspasoproducto.idnotatraspasoproducto')
            ->orderBy('notatraspasoproducto.idnotatraspasoproducto', 'DESC')
            ->first();

        return ( is_null( $notatraspasoproducto ) ) ? 1 : intval( $notatraspasoproducto->idnotatraspasoproducto ) + 1;
    }

    public function store( $query, $request )
    {
        $fkidconceptoinventario = isset( $request->fkidconceptoinventario ) ? $request->fkidconceptoinventario : null;
        $fkidsucursalingreso = isset( $request->fkidsucursalingreso ) ? $request->fkidsucursalingreso : null;
        $fkidsucursalsalida = isset( $request->fkidsucursalsalida ) ? $request->fkidsucursalsalida : null;
        $fkidalmaceningreso  = isset( $request->fkidalmaceningreso )  ? $request->fkidalmaceningreso : null;
        $fkidalmacensalida  = isset( $request->fkidalmacensalida )  ? $request->fkidalmacensalida : null;
        $fkidmoneda   = isset( $request->fkidmoneda )   ? $request->fkidmoneda : null;
        $fkidtipotransaccion = isset( $request->fkidtipotransaccion ) ? $request->fkidtipotransaccion : null;

        $codigo     = isset( $request->codigo )     ? $request->codigo : null;
        $nromanual  = isset( $request->nromanual )  ? $request->nromanual : '0';
        $tipocambio = isset( $request->tipocambio ) ? $request->tipocambio : 0;
        $fechanotatraspaso = isset( $request->fechanotatraspaso ) ? $request->fechanotatraspaso : null;

        $cantidadtotal = isset( $request->cantidadtotal ) ? $request->cantidadtotal : 0;
        $montototal    = isset( $request->montototal )    ? $request->montototal : 0;
        $pesototal     = isset( $request->pesototal )     ? $request->pesototal : 0;
        $volumentotal  = isset( $request->volumentotal )  ? $request->volumentotal : 0;
        $nrocajastotal = isset( $request->nrocajastotal ) ? $request->nrocajastotal : 0;
        $nota          = isset( $request->nota )          ? $request->nota : null;

        $estado = isset( $request->estado ) ? $request->estado : "N";

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $notatraspasoproducto = $query->create( [
            'fkidconceptoinventario' => $fkidconceptoinventario,
            'fkidsucursalingreso' => $fkidsucursalingreso,
            'fkidsucursalsalida' => $fkidsucursalsalida,
            'fkidalmaceningreso'  => $fkidalmaceningreso,
            'fkidalmacensalida'  => $fkidalmacensalida,
            'fkidmoneda'   => $fkidmoneda,
            'fkidtipotransaccion' => $fkidtipotransaccion,

            'codigo'     => $codigo,
            'nromanual'  => $nromanual,
            'tipocambio' => $tipocambio,
            'fechanotatraspaso' => $fechanotatraspaso,
            'cantidadtotal'   => $cantidadtotal,
            'montototal' => $montototal,
            'pesototal'  => $pesototal,
            'volumentotal'  => $volumentotal,
            'nrocajastotal' => $nrocajastotal,

            'estado' => $estado,            
            'nota'  => $nota,
            'fecha' => $fecha,
            'hora'  => $hora
        ] );

        return $notatraspasoproducto;
    }

    public function upgrade( $query, $request )
    {
        $idnotatraspasoproducto = isset( $request->idnotatraspasoproducto ) ? $request->idnotatraspasoproducto : null;
        
        $fkidconceptoinventario = isset( $request->fkidconceptoinventario ) ? $request->fkidconceptoinventario : null;
        $fkidsucursalingreso = isset( $request->fkidsucursalingreso ) ? $request->fkidsucursalingreso : null;
        $fkidsucursalsalida = isset( $request->fkidsucursalsalida ) ? $request->fkidsucursalsalida : null;
        $fkidalmaceningreso  = isset( $request->fkidalmaceningreso )  ? $request->fkidalmaceningreso : null;
        $fkidalmacensalida  = isset( $request->fkidalmacensalida )  ? $request->fkidalmacensalida : null;
        $fkidmoneda   = isset( $request->fkidmoneda )   ? $request->fkidmoneda : null;
        $fkidtipotransaccion = isset( $request->fkidtipotransaccion ) ? $request->fkidtipotransaccion : null;

        $codigo     = isset( $request->codigo )     ? $request->codigo : null;
        $nromanual  = isset( $request->nromanual )  ? $request->nromanual : '0';
        $tipocambio = isset( $request->tipocambio ) ? $request->tipocambio : 0;
        $fechanotatraspaso = isset( $request->fechanotatraspaso ) ? $request->fechanotatraspaso : null;

        $cantidadtotal = isset( $request->cantidadtotal ) ? $request->cantidadtotal : 0;
        $montototal    = isset( $request->montototal )    ? $request->montototal : 0;
        $pesototal     = isset( $request->pesototal )     ? $request->pesototal : 0;
        $volumentotal  = isset( $request->volumentotal )  ? $request->volumentotal : 0;
        $nrocajastotal = isset( $request->nrocajastotal ) ? $request->nrocajastotal : 0;
        $nota          = isset( $request->nota )          ? $request->nota : null;
        $estado = isset( $request->estado ) ? $request->estado : "N";

        $notatraspasoproducto = $query->where( 'idnotatraspasoproducto', '=', $idnotatraspasoproducto )
            ->update( [
                'fkidconceptoinventario' => $fkidconceptoinventario,
                'fkidsucursalingreso' => $fkidsucursalingreso,
                'fkidsucursalsalida' => $fkidsucursalsalida,
                'fkidalmaceningreso'  => $fkidalmaceningreso,
                'fkidalmacensalida'  => $fkidalmacensalida,
                'fkidmoneda'   => $fkidmoneda,
                'fkidtipotransaccion' => $fkidtipotransaccion,

                'codigo'     => $codigo,
                'nromanual'  => $nromanual,
                'tipocambio' => $tipocambio,
                'fechanotatraspaso' => $fechanotatraspaso,
                'cantidadtotal'   => $cantidadtotal,
                'montototal' => $montototal,
                'pesototal'  => $pesototal,
                'volumentotal'  => $volumentotal,
                'nrocajastotal' => $nrocajastotal,

                'estado' => $estado,
                'nota'  => $nota,
            ] );

        return $notatraspasoproducto;
    }

    public function show( $query, $idnotatraspasoproducto ) {

        $notatraspasoproducto = $query
            ->leftJoin('sucursal as sucuing', 'notatraspasoproducto.fkidsucursalingreso', '=', 'sucuing.idsucursal')
            ->leftJoin('sucursal as sucusal', 'notatraspasoproducto.fkidsucursalsalida', '=', 'sucusal.idsucursal')
            ->leftJoin('almacen as alming', 'notatraspasoproducto.fkidalmaceningreso', '=', 'alming.idalmacen')
            ->leftJoin('almacen as almsal', 'notatraspasoproducto.fkidalmacensalida', '=', 'almsal.idalmacen')
            ->leftJoin('conceptoinventario as concepinv', 'notatraspasoproducto.fkidconceptoinventario', '=', 'concepinv.idconceptoinventario')
            ->leftJoin('moneda as mon', 'notatraspasoproducto.fkidmoneda', '=', 'mon.idmoneda')
            ->select( [
                'notatraspasoproducto.idnotatraspasoproducto', 'notatraspasoproducto.codigo','notatraspasoproducto.nromanual', 'notatraspasoproducto.fechanotatraspaso', 
                'notatraspasoproducto.tipocambio', 'notatraspasoproducto.cantidadtotal', 'notatraspasoproducto.montototal',
                'notatraspasoproducto.volumentotal', 'notatraspasoproducto.pesototal', 'notatraspasoproducto.nrocajastotal', 'notatraspasoproducto.estado', 'notatraspasoproducto.nota',
                'notatraspasoproducto.fkidsucursalingreso', 'sucuing.descripcion as sucursalingreso',
                'notatraspasoproducto.fkidsucursalsalida', 'sucusal.descripcion as sucursalsalida',
                'notatraspasoproducto.fkidalmaceningreso', 'alming.descripcion as almaceningreso',
                'notatraspasoproducto.fkidalmacensalida', 'almsal.descripcion as almacensalida',
                'notatraspasoproducto.fkidmoneda', 'mon.descripcion as moneda',
                'notatraspasoproducto.fkidconceptoinventario', 'concepinv.descripcion as conceptoinventario',
            ] )
            ->with( [ 'arraynotatraspasoproductodetalle' => function( $query ) {
                $query
                    ->leftJoin('sucursal as sucing', 'notatraspasoproductodetalle.fkidsucursalingreso', '=', 'sucing.idsucursal')
                    ->leftJoin('sucursal as sucsal', 'notatraspasoproductodetalle.fkidsucursalsalida', '=', 'sucsal.idsucursal')
                    ->leftJoin('almacen as alming', 'notatraspasoproductodetalle.fkidalmaceningreso', '=', 'alming.idalmacen')
                    ->leftJoin('almacen as almsal', 'notatraspasoproductodetalle.fkidalmacensalida', '=', 'almsal.idalmacen')
                    ->leftJoin('producto as prod', 'notatraspasoproductodetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'notatraspasoproductodetalle.idnotatraspasoproductodetalle', 'notatraspasoproductodetalle.fkidnotatraspasoproducto', 
                        'notatraspasoproductodetalle.fkidalmacenproductodetalleingreso', 'notatraspasoproductodetalle.fkidalmacenproductodetallesalida', 
                        'notatraspasoproductodetalle.stockactualanterior', 'notatraspasoproductodetalle.cantidad', 'notatraspasoproductodetalle.nrocajas', 
                        'notatraspasoproductodetalle.costobase', 'notatraspasoproductodetalle.costounitarioingreso', 'notatraspasoproductodetalle.costounitariosalida', 
                        'notatraspasoproductodetalle.costosubtotalingreso', 'notatraspasoproductodetalle.costosubtotalsalida',
                        'notatraspasoproductodetalle.descuento', 'notatraspasoproductodetalle.montodescuento', 
                        'notatraspasoproductodetalle.peso', 'notatraspasoproductodetalle.pesosubtotal', 'notatraspasoproductodetalle.volumen', 'notatraspasoproductodetalle.volumensubtotal',
                        'notatraspasoproductodetalle.nota', 'notatraspasoproductodetalle.fechavencimiento', 
                        'notatraspasoproductodetalle.nrolote', 'notatraspasoproductodetalle.nrofabrica',

                        'notatraspasoproductodetalle.fkidsucursalingreso', 'sucing.descripcion as sucursalingreso',
                        'notatraspasoproductodetalle.fkidsucursalsalida', 'sucsal.descripcion as sucursalsalida',
                        'notatraspasoproductodetalle.fkidalmaceningreso', 'alming.descripcion as almaceningreso',
                        'notatraspasoproductodetalle.fkidalmacensalida', 'almsal.descripcion as almacensalida',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'notatraspasoproductodetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',

                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',

                    ] )
                    ->orderBy('notatraspasoproductodetalle.idnotatraspasoproductodetalle');
            } ] )
            ->where( 'notatraspasoproducto.idnotatraspasoproducto', '=', $idnotatraspasoproducto )
            ->whereNull('notatraspasoproducto.deleted_at')
            ->orderBy('notatraspasoproducto.idnotatraspasoproducto', 'DESC')
            ->first();
        
        return $notatraspasoproducto;
    }

    public function scopeEnable( $query, $request )
    {
        $idnotatraspasoproducto = $request->idnotatraspasoproducto;
        $query->where('idnotatraspasoproducto', '=', $idnotatraspasoproducto)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idnotatraspasoproducto = $request->idnotatraspasoproducto;
        $query->where('idnotatraspasoproducto', '=', $idnotatraspasoproducto)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idnotatraspasoproducto = $request->idnotatraspasoproducto;
        return $query->where('idnotatraspasoproducto', '=', $idnotatraspasoproducto)->delete();
    }

    public function searchByID( $query, $idnotatraspasoproducto ) {
        $notatraspasoproducto = $query
            ->leftJoin('sucursal as sucuing', 'notatraspasoproducto.fkidsucursalingreso', '=', 'sucuing.idsucursal')
            ->leftJoin('sucursal as sucusal', 'notatraspasoproducto.fkidsucursalsalida', '=', 'sucusal.idsucursal')
            ->leftJoin('almacen as alming', 'notatraspasoproducto.fkidalmaceningreso', '=', 'alming.idalmacen')
            ->leftJoin('almacen as almsal', 'notatraspasoproducto.fkidalmacensalida', '=', 'almsal.idalmacen')
            ->leftJoin('conceptoinventario as concepinv', 'notatraspasoproducto.fkidconceptoinventario', '=', 'concepinv.idconceptoinventario')
            ->leftJoin('moneda as mon', 'notatraspasoproducto.fkidmoneda', '=', 'mon.idmoneda')
            ->select( [
                'notatraspasoproducto.idnotatraspasoproducto', 'notatraspasoproducto.codigo','notatraspasoproducto.nromanual', 'notatraspasoproducto.fechanotatraspaso', 
                'notatraspasoproducto.tipocambio', 'notatraspasoproducto.cantidadtotal', 'notatraspasoproducto.montototal',
                'notatraspasoproducto.volumentotal', 'notatraspasoproducto.pesototal', 'notatraspasoproducto.nrocajastotal', 'notatraspasoproducto.estado', 'notatraspasoproducto.nota',
                'notatraspasoproducto.fkidsucursalingreso', 'sucuing.descripcion as sucursalingreso',
                'notatraspasoproducto.fkidsucursalsalida', 'sucusal.descripcion as sucursalsalida',
                'notatraspasoproducto.fkidalmaceningreso', 'alming.descripcion as almaceningreso',
                'notatraspasoproducto.fkidalmacensalida', 'almsal.descripcion as almacensalida',
                'notatraspasoproducto.fkidmoneda', 'mon.descripcion as moneda',
                'notatraspasoproducto.fkidconceptoinventario', 'concepinv.descripcion as conceptoinventario',
            ] )
            ->with( [ 'arraynotatraspasoproductodetalle' => function( $query ) {
                $query
                    ->leftJoin('sucursal as sucing', 'notatraspasoproductodetalle.fkidsucursalingreso', '=', 'sucing.idsucursal')
                    ->leftJoin('sucursal as sucsal', 'notatraspasoproductodetalle.fkidsucursalsalida', '=', 'sucsal.idsucursal')
                    ->leftJoin('almacen as alming', 'notatraspasoproductodetalle.fkidalmaceningreso', '=', 'alming.idalmacen')
                    ->leftJoin('almacen as almsal', 'notatraspasoproductodetalle.fkidalmacensalida', '=', 'almsal.idalmacen')
                    ->leftJoin('producto as prod', 'notatraspasoproductodetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'notatraspasoproductodetalle.idnotatraspasoproductodetalle', 'notatraspasoproductodetalle.fkidnotatraspasoproducto', 
                        'notatraspasoproductodetalle.fkidalmacenproductodetalleingreso', 'notatraspasoproductodetalle.fkidalmacenproductodetallesalida', 
                        'notatraspasoproductodetalle.stockactualanterior', 'notatraspasoproductodetalle.cantidad', 'notatraspasoproductodetalle.nrocajas', 
                        'notatraspasoproductodetalle.costobase', 'notatraspasoproductodetalle.costounitarioingreso', 'notatraspasoproductodetalle.costounitariosalida', 
                        'notatraspasoproductodetalle.costosubtotalingreso', 'notatraspasoproductodetalle.costosubtotalsalida',
                        'notatraspasoproductodetalle.descuento', 'notatraspasoproductodetalle.montodescuento', 
                        'notatraspasoproductodetalle.peso', 'notatraspasoproductodetalle.pesosubtotal', 'notatraspasoproductodetalle.volumen', 'notatraspasoproductodetalle.volumensubtotal',
                        'notatraspasoproductodetalle.nota', 'notatraspasoproductodetalle.fechavencimiento', 
                        'notatraspasoproductodetalle.nrolote', 'notatraspasoproductodetalle.nrofabrica',

                        'notatraspasoproductodetalle.fkidsucursalingreso', 'sucing.descripcion as sucursalingreso',
                        'notatraspasoproductodetalle.fkidsucursalsalida', 'sucsal.descripcion as sucursalsalida',
                        'notatraspasoproductodetalle.fkidalmaceningreso', 'alming.descripcion as almaceningreso',
                        'notatraspasoproductodetalle.fkidalmacensalida', 'almsal.descripcion as almacensalida',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'notatraspasoproductodetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',

                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',

                    ] )
                    ->orderBy('notatraspasoproductodetalle.idnotatraspasoproductodetalle');
            } ] )
            ->where('notatraspasoproducto.idnotatraspasoproducto', '=', $idnotatraspasoproducto)
            ->whereNull('notatraspasoproducto.deleted_at')
            ->orderBy('notatraspasoproducto.idnotatraspasoproducto', 'DESC')
            ->first();

        return $notatraspasoproducto;
    }
    
}
