<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AlmacenProductoDetalle extends Model
{
    use SoftDeletes;

    protected $table      = 'almacenproductodetalle';
    protected $primaryKey = 'idalmacenproductodetalle';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'stockactual' => 0, 'stockminimo' => 0, 'stockmaximo' => 0,
        'ingresos' => 0, 'salidas' => 0, 'traspasos' => 0, 'ventas' => 0, 'compras' => 0, 'devolucionventas' => 0, 'devolucioncompras' => 0,
        'ingresocancelado' => 0, 'salidacancelada' => 0, 'traspasocancelada' => 0, 'ventacancelada' => 0, 'devolucionventacancelada' => 0,
        'compracancelada' => 0, 'devolucioncompracancelada' => 0, 'totalingresos' => 0, 'totalsalidas' => 0, 'totaltraspasos' => 0,
        'totalventas' => 0, 'totaldevolucionventas' => 0, 'totalcompras' => 0, 'totaldevolucioncompras' => 0,
        'estado' => 'A',  'isdelete' => 'A',
    ];

    protected $fillable = [
        'fkidproducto', 'fkidalmacen', 'stockactual', 'stockminimo', 'stockmaximo',
        'ingresos', 'salidas', 'traspasos', 'ventas', 'compras', 'devolucionventas', 'devolucioncompras',
        'ingresocancelado', 'salidacancelada', 'traspasocancelada', 'ventacancelada', 'devolucionventacancelada',
        'compracancelada', 'devolucioncompracancelada', 'totalingresos', 'totalsalidas', 'totaltraspasos',
        'totalventas', 'totaldevolucionventas', 'totalcompras', 'totaldevolucioncompras',
        'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function existAlmProd( $query, $idalmacen, $fkidproducto ) {

        $arrayalmacenproductodetalle = $query
            ->where( 'fkidalmacen', '=', $idalmacen )
            ->where( 'fkidproducto', '=', $fkidproducto )
            ->whereNull( 'deleted_at' )
            ->get();

        return ( sizeof( $arrayalmacenproductodetalle ) > 0 );
    }

    public function get_data( $query, $request ) {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $isventa = isset($request->isventa) ? $request->isventa : null;
        $estado  = isset($request->estado)  ? $request->estado   : null;
        $column  = 'almacenproductodetalle.idalmacenproductodetalle';
        $fkidalmacen = isset($request->fkidalmacen) ? $request->fkidalmacen : null;
        $fkidlistaprecio = isset($request->fkidlistaprecio) ? $request->fkidlistaprecio : null;

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';
        if ( strtoupper( $isventa ) != 'A' && strtoupper( $isventa ) != 'N' ) $isventa = null; else $isventa = strtoupper( $isventa );
        if ( strtoupper( $estado )  != 'A' && strtoupper( $estado )  != 'N' ) $estado  = null;
        if ( !is_numeric( $fkidalmacen ) ) $fkidalmacen = null;
        if ( !is_numeric( $fkidlistaprecio ) ) $fkidlistaprecio = null;

        $islike =  Functions::isLikeAndIlike();

        $almacenproductodetalle = $query
            ->select( [
                'almacenproductodetalle.idalmacenproductodetalle', 'almacenproductodetalle.fkidproducto', 'almacenproductodetalle.fkidalmacen',
                'almacenproductodetalle.stockactual', 'almacenproductodetalle.stockminimo', 'almacenproductodetalle.stockmaximo', 
                'almacenproductodetalle.ingresos', 'almacenproductodetalle.salidas', 'almacenproductodetalle.traspasos', 'almacenproductodetalle.ventas', 'almacenproductodetalle.compras',

                'prod.idproducto', 'prod.codigo', 'prod.nombre as producto', 'prod.stockactual as stocktotal', 'prod.nivel', 'prod.isventa',
                'prod.valorequivalente', 'prod.peso', 'prod.volumen', 'prod.costobase', 'prod.costounitario', 'prod.costodescuento', 'prod.costomontodescuento',
                'prod.fecha as producto_fecha', 'prod.hora as producto_hora', 'prod.estado as producto_estado', 
                'prod.isdelete as producto_isdelete', 'prod.imagen as producto_imagen', 'prod.descripcion as producto_descripcion',

                'listprecdet.idlistapreciodetalle', 'listprecdet.fkidlistaprecio', 'listprecdet.fkidmoneda', 'listprecdet.precioventa',

                'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                'prodmarc.idproductomarca', 'prodmarc.descripcion as marca',
                'prodtipo.idproductotipo', 'prodtipo.descripcion as tipo',
                'prodgrup.idproductogrupo', 'prodgrup.descripcion as grupo',
                'prodsubgrup.idproductosubgrupo', 'prodsubgrup.descripcion as subgrupo',
                'ciu.idciudad', 'ciu.descripcion as origen',
                'cat.idcategoria', 'cat.descripcion as categoria'
            ] )
            ->leftJoin('producto as prod', 'almacenproductodetalle.fkidproducto', '=', 'prod.idproducto')
            ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
            ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
            ->leftJoin('productotipo as prodtipo', 'prod.fkidproductotipo', '=', 'prodtipo.idproductotipo')
            ->leftJoin('productogrupo as prodgrup', 'prod.fkidproductogrupo', '=', 'prodgrup.idproductogrupo')
            ->leftJoin('productosubgrupo as prodsubgrup', 'prod.fkidproductosubgrupo', '=', 'prodsubgrup.idproductosubgrupo')
            ->leftJoin('categoria as cat', 'prod.fkidcategoria', '=', 'cat.idcategoria')
            ->leftJoin('ciudad as ciu', 'prod.fkidciudadorigen', '=', 'ciu.idciudad')
            ->leftJoin('listapreciodetalle as listprecdet', 'prod.idproducto', '=', 'listprecdet.fkidproducto')
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('almacenproductodetalle.idalmacenproductodetalle', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('prod.nombre', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->where( ( is_null( $fkidlistaprecio ) ) ? [] : [ ['listprecdet.fkidlistaprecio', '=', $fkidlistaprecio] ] )
            ->where( ( is_null( $fkidalmacen ) ) ? [] : [ ['almacenproductodetalle.fkidalmacen', '=', $fkidalmacen] ] )
            ->where( ( is_null( $estado ) ) ? [] : [ ['prod.estado', '=', $estado] ] )
            ->where( ( is_null( $isventa ) ) ? [] : [[ 'prod.isventa', '=', $isventa ]] )
            ->whereNull( 'almacenproductodetalle.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->get()->toArray();

        return $almacenproductodetalle;
    }

    public function get_paginate( $query, $request ) {
        $search   = isset($request->search)   ? $request->search   : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy  : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $isventa  = isset($request->isventa)  ? $request->isventa  : null;
        $estado   = isset($request->estado)   ? $request->estado   : null;
        $column   = 'almacenproductodetalle.idalmacenproductodetalle';
        $fkidalmacen = isset($request->fkidalmacen) ? $request->fkidalmacen : null;
        $fkidlistaprecio = isset($request->fkidlistaprecio) ? $request->fkidlistaprecio : null;

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';
        if ( !is_numeric( $paginate ) ) $paginate = 20;
        if ( strtoupper( $isventa ) != 'A' && strtoupper( $isventa ) != 'N' ) $isventa = null; else $isventa = strtoupper( $isventa );
        if ( strtoupper( $estado )  != 'A' && strtoupper( $estado )  != 'N' ) $estado  = null;
        if ( !is_numeric( $fkidalmacen ) ) $fkidalmacen = null;
        if ( !is_numeric( $fkidlistaprecio ) ) $fkidlistaprecio = null;

        $islike =  Functions::isLikeAndIlike();

        $almacenproductodetalle = $query
            ->select( [
                'almacenproductodetalle.idalmacenproductodetalle', 'almacenproductodetalle.fkidproducto', 'almacenproductodetalle.fkidalmacen',
                'almacenproductodetalle.stockactual', 'almacenproductodetalle.stockminimo', 'almacenproductodetalle.stockmaximo', 
                'almacenproductodetalle.ingresos', 'almacenproductodetalle.salidas', 'almacenproductodetalle.traspasos', 'almacenproductodetalle.ventas', 'almacenproductodetalle.compras',

                'prod.idproducto', 'prod.codigo', 'prod.nombre as producto', 'prod.stockactual as stocktotal', 'prod.nivel', 'prod.isventa',
                'prod.valorequivalente', 'prod.peso', 'prod.volumen', 'prod.costobase', 'prod.costounitario', 'prod.costodescuento', 'prod.costomontodescuento',
                'prod.fecha as producto_fecha', 'prod.hora as producto_hora', 'prod.estado as producto_estado', 
                'prod.isdelete as producto_isdelete', 'prod.imagen as producto_imagen', 'prod.descripcion as producto_descripcion',

                'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                'prodmarc.idproductomarca', 'prodmarc.descripcion as marca',
                'prodtipo.idproductotipo', 'prodtipo.descripcion as tipo',
                'prodgrup.idproductogrupo', 'prodgrup.descripcion as grupo',
                'prodsubgrup.idproductosubgrupo', 'prodsubgrup.descripcion as subgrupo',
                'ciu.idciudad', 'ciu.descripcion as origen',
                'cat.idcategoria', 'cat.descripcion as categoria'
            ] )
            ->leftJoin('producto as prod', 'almacenproductodetalle.fkidproducto', '=', 'prod.idproducto')
            ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
            ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
            ->leftJoin('productotipo as prodtipo', 'prod.fkidproductotipo', '=', 'prodtipo.idproductotipo')
            ->leftJoin('productogrupo as prodgrup', 'prod.fkidproductogrupo', '=', 'prodgrup.idproductogrupo')
            ->leftJoin('productosubgrupo as prodsubgrup', 'prod.fkidproductosubgrupo', '=', 'prodsubgrup.idproductosubgrupo')
            ->leftJoin('categoria as cat', 'prod.fkidcategoria', '=', 'cat.idcategoria')
            ->leftJoin('ciudad as ciu', 'prod.fkidciudadorigen', '=', 'ciu.idciudad')
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('almacenproductodetalle.idalmacenproductodetalle', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('prod.nombre', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->where( ( is_null( $fkidalmacen ) ) ? [] : [ ['almacenproductodetalle.fkidalmacen', '=', $fkidalmacen] ] )
            ->where( ( is_null( $estado ) ) ? [] : [ ['prod.estado', '=', $estado] ] )
            ->where( ( is_null( $isventa ) ) ? [] : [[ 'prod.isventa', '=', $isventa ]] )
            ->whereNull( 'almacenproductodetalle.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $almacenproductodetalle;
    }

    public function existAlmacenProducto( $query, $idalmacen, $idproducto ) {

        $almacenproductodetalle = $query
            ->where( [['fkidalmacen', '=', $idalmacen], ['fkidproducto', '=', $idproducto]] )
            ->whereNull( 'deleted_at' )
            ->get();

        return ( sizeof( $almacenproductodetalle ) > 0 );
    }

    public function firstAlmacenProducto( $query, $idalmacen, $idproducto ) {

        $almacenproductodetalle = $query
            ->where( [['fkidalmacen', '=', $idalmacen], ['fkidproducto', '=', $idproducto]] )
            ->whereNull( 'deleted_at' )
            ->first();

        return $almacenproductodetalle;
    }

    public function store( $query, $request, $detalle )
    {
        $fkidproducto = $detalle->fkidproducto;
        $fkidalmacen  = $detalle->fkidalmacen;

        $stockactual = is_numeric( $detalle->stockactual ) ? $detalle->stockactual : 0;
        $stockminimo = is_numeric( $detalle->stockminimo ) ? $detalle->stockminimo : 0;
        $stockmaximo = is_numeric( $detalle->stockmaximo ) ? $detalle->stockmaximo : 0;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $almacenproductodetalle = $query->create( [
            'fkidproducto' => $fkidproducto,
            'fkidalmacen'  => $fkidalmacen,
            'stockactual'  => $stockactual,
            'stockminimo'  => $stockminimo,
            'stockmaximo'  => $stockmaximo,
            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $almacenproductodetalle;
    }

    public function upgrade( $query, $detalle )
    {
        $idalmacenproductodetalle = $detalle->idalmacenproductodetalle;

        $fkidproducto = $detalle->fkidproducto;
        $fkidalmacen  = $detalle->fkidalmacen;

        $stockactual = is_numeric( $detalle->stockactual ) ? $detalle->stockactual : 0;
        $stockminimo = is_numeric( $detalle->stockminimo ) ? $detalle->stockminimo : 0;
        $stockmaximo = is_numeric( $detalle->stockmaximo ) ? $detalle->stockmaximo : 0;

        $almacenproductodetalle = $query->where( 'idalmacenproductodetalle', '=', $idalmacenproductodetalle )
            ->update( [
                'fkidproducto' => $fkidproducto,
                'fkidalmacen'  => $fkidalmacen,
                'stockactual'  => $stockactual,
                'stockminimo'  => $stockminimo,
                'stockmaximo'  => $stockmaximo,
            ] );

        return $almacenproductodetalle;
    }

    public function remove( $query, $idalmacenproductodetalle )
    {
        $query->where('idalmacenproductodetalle', '=', $idalmacenproductodetalle)->delete();
    }

}
