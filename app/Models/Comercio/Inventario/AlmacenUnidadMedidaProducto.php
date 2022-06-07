<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AlmacenUnidadMedidaProducto extends Model
{
    use SoftDeletes;

    protected $table      = 'almacenunidadmedidaproducto';
    protected $primaryKey = 'idalmacenunidadmedidaproducto';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'estado' => 'A',  'isdelete' => 'A',
        'stockactual' => 0, 'stockminimo' => 0, 'stockmaximo' => 0,
        'ingresos' => 0, 'salidas' => 0, 'traspasos' => 0, 'ventas' => 0, 'compras' => 0,
    ];

    protected $fillable = [
        'fkidunidadmedidaproducto', 'fkidalmacen', 'stockactual', 'stockminimo', 'stockmaximo',
        'ingresos', 'salidas', 'traspasos', 'ventas', 'compras',
        'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function get_data( $query, $request ) {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $isventa = isset($request->isventa) ? $request->isventa : 'T';
        $estado  = isset($request->estado)  ? $request->estado   : null;
        $column  = 'almacenunidadmedidaproducto.idalmacenunidadmedidaproducto';
        $fkidalmacen = isset($request->fkidalmacen) ? $request->fkidalmacen : null;

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';
        if ( strtoupper( $isventa ) != 'A' && strtoupper( $isventa ) != 'N' ) $isventa = 'T'; else $isventa = strtoupper( $isventa );
        if ( strtoupper( $estado )  != 'A' && strtoupper( $estado )  != 'N' ) $estado  = null;
        if ( !is_numeric( $fkidalmacen ) ) $fkidalmacen = null;

        $islike =  Functions::isLikeAndIlike();

        $almacenunidadmedidaproducto = $query
            ->select( [
                'almacenunidadmedidaproducto.idalmacenunidadmedidaproducto', 'almacenunidadmedidaproducto.stockactual', 'almacenunidadmedidaproducto.stockminimo',
                'almacenunidadmedidaproducto.stockmaximo', 'almacenunidadmedidaproducto.ingresos', 'almacenunidadmedidaproducto.salidas', 'almacenunidadmedidaproducto.traspasos',
                'almacenunidadmedidaproducto.ventas', 'almacenunidadmedidaproducto.compras',

                'undmedprod.idunidadmedidaproducto', 'undmedprod.fkidunidadmedida', 'undmedprod.fkidproducto',
                'undmedprod.codigo', 'undmedprod.valorequivalente', 'undmedprod.peso', 'undmedprod.volumen', 'undmedprod.stock', 
                'undmedprod.costo', 'undmedprod.costodescuento', 'undmedprod.costomontodescuento', 'undmedprod.costounitario',
                'undmedprod.fecha', 'undmedprod.hora', 'undmedprod.estado', 'undmedprod.isdelete',

                'prod.idproducto', 'prod.nombre as producto', 'prod.stockactual as stocktotal', 'prod.nivel', 'prod.isventa',
                'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                'prodmarc.idproductomarca', 'prodmarc.descripcion as marca',
                'prodtipo.idproductotipo', 'prodtipo.descripcion as tipo',
                'prodgrup.idproductogrupo', 'prodgrup.descripcion as grupo',
                'prodsubgrup.idproductosubgrupo', 'prodsubgrup.descripcion as subgrupo',
                'ciu.idciudad', 'ciu.descripcion as origen',
                'cat.idcategoria', 'cat.descripcion as categoria'
            ] )
            ->leftJoin('unidadmedidaproducto as undmedprod', 'almacenunidadmedidaproducto.fkidunidadmedidaproducto', '=', 'undmedprod.idunidadmedidaproducto')
            ->leftJoin('unidadmedida as unidmed', 'undmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
            ->leftJoin('producto as prod', 'undmedprod.fkidproducto', '=', 'prod.idproducto')
            ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
            ->leftJoin('productotipo as prodtipo', 'prod.fkidproductotipo', '=', 'prodtipo.idproductotipo')
            ->leftJoin('productogrupo as prodgrup', 'prod.fkidproductogrupo', '=', 'prodgrup.idproductogrupo')
            ->leftJoin('productosubgrupo as prodsubgrup', 'prod.fkidproductosubgrupo', '=', 'prodsubgrup.idproductosubgrupo')
            ->leftJoin('categoria as cat', 'prod.fkidcategoria', '=', 'cat.idcategoria')
            ->leftJoin('ciudad as ciu', 'prod.fkidciudadorigen', '=', 'ciu.idciudad')
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('almacenunidadmedidaproducto.idalmacenunidadmedidaproducto', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('prod.nombre', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->where( ( is_null( $fkidalmacen ) ) ? [] : [ ['almacenunidadmedidaproducto.fkidalmacen', '=', $fkidalmacen] ] )
            ->where( ( $isventa == 'T' ) ? [] : [[ 'prod.isventa', '=', $isventa ]] )
            ->where( ( is_null( $estado ) ) ? [] : [ ['prod.estado', '=', $estado] ] )
            ->whereNull( 'almacenunidadmedidaproducto.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->get()->toArray();

        return $almacenunidadmedidaproducto;
    }

    public function get_paginate( $query, $request ) {
        $search   = isset($request->search)   ? $request->search   : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy  : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $isventa  = isset($request->isventa)  ? $request->isventa  : 'T';
        $estado   = isset($request->estado)   ? $request->estado   : null;
        $column   = 'almacenunidadmedidaproducto.idalmacenunidadmedidaproducto';
        $fkidalmacen = isset($request->fkidalmacen) ? $request->fkidalmacen : null;

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';
        if ( !is_numeric( $paginate ) ) $paginate = 20;
        if ( strtoupper( $isventa ) != 'A' && strtoupper( $isventa ) != 'N' ) $isventa = 'T'; else $isventa = strtoupper( $isventa );
        if ( strtoupper( $estado )  != 'A' && strtoupper( $estado )  != 'N' ) $estado  = null;
        if ( !is_numeric( $fkidalmacen ) ) $fkidalmacen = null;

        $islike =  Functions::isLikeAndIlike();

        $almacenunidadmedidaproducto = $query
            ->select( [
                'almacenunidadmedidaproducto.idalmacenunidadmedidaproducto', 'almacenunidadmedidaproducto.stockactual', 'almacenunidadmedidaproducto.stockminimo',
                'almacenunidadmedidaproducto.stockmaximo', 'almacenunidadmedidaproducto.ingresos', 'almacenunidadmedidaproducto.salidas', 'almacenunidadmedidaproducto.traspasos',
                'almacenunidadmedidaproducto.ventas', 'almacenunidadmedidaproducto.compras',

                'undmedprod.idunidadmedidaproducto', 'undmedprod.fkidunidadmedida', 'undmedprod.fkidproducto',
                'undmedprod.codigo', 'undmedprod.valorequivalente', 'undmedprod.peso', 'undmedprod.volumen', 'undmedprod.stock', 
                'undmedprod.costo', 'undmedprod.costodescuento', 'undmedprod.costomontodescuento', 'undmedprod.costounitario',
                'undmedprod.fecha', 'undmedprod.hora', 'undmedprod.estado', 'undmedprod.isdelete',

                'prod.idproducto', 'prod.nombre as producto', 'prod.stockactual as stocktotal', 'prod.nivel', 'prod.isventa',
                'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                'prodmarc.idproductomarca', 'prodmarc.descripcion as marca',
                'prodtipo.idproductotipo', 'prodtipo.descripcion as tipo',
                'prodgrup.idproductogrupo', 'prodgrup.descripcion as grupo',
                'prodsubgrup.idproductosubgrupo', 'prodsubgrup.descripcion as subgrupo',
                'ciu.idciudad', 'ciu.descripcion as origen',
                'cat.idcategoria', 'cat.descripcion as categoria'
            ] )
            ->leftJoin('unidadmedidaproducto as undmedprod', 'almacenunidadmedidaproducto.fkidunidadmedidaproducto', '=', 'undmedprod.idunidadmedidaproducto')
            ->leftJoin('unidadmedida as unidmed', 'undmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
            ->leftJoin('producto as prod', 'undmedprod.fkidproducto', '=', 'prod.idproducto')
            ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
            ->leftJoin('productotipo as prodtipo', 'prod.fkidproductotipo', '=', 'prodtipo.idproductotipo')
            ->leftJoin('productogrupo as prodgrup', 'prod.fkidproductogrupo', '=', 'prodgrup.idproductogrupo')
            ->leftJoin('productosubgrupo as prodsubgrup', 'prod.fkidproductosubgrupo', '=', 'prodsubgrup.idproductosubgrupo')
            ->leftJoin('categoria as cat', 'prod.fkidcategoria', '=', 'cat.idcategoria')
            ->leftJoin('ciudad as ciu', 'prod.fkidciudadorigen', '=', 'ciu.idciudad')
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('almacenunidadmedidaproducto.idalmacenunidadmedidaproducto', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('prod.nombre', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->where( ( is_null( $fkidalmacen ) ) ? [] : [ ['almacenunidadmedidaproducto.fkidalmacen', '=', $fkidalmacen] ] )
            ->where( ( is_null( $estado ) ) ? [] : [ ['prod.estado', '=', $estado] ] )
            ->where( ( $isventa == 'T' ) ? [] : [[ 'prod.isventa', '=', $isventa ]] )
            ->whereNull( 'almacenunidadmedidaproducto.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->get()->toArray();

        return $almacenunidadmedidaproducto;
    }

    public function existAlmUndMedProd( $query, $idalmacen, $idunidadmedidaproducto ) {

        $almacenunidadmedidaproducto = $query
            ->where( 'fkidalmacen', '=', $idalmacen )
            ->where( 'fkidunidadmedidaproducto', '=', $idunidadmedidaproducto )
            ->whereNull( 'deleted_at' )
            ->get();

        return ( sizeof( $almacenunidadmedidaproducto ) > 0 );
    }

    public function firstAlmUndMedProd( $query, $idalmacen, $idunidadmedidaproducto ) {

        $almacenunidadmedidaproducto = $query
            ->where( 'fkidalmacen', '=', $idalmacen )
            ->where( 'fkidunidadmedidaproducto', '=', $idunidadmedidaproducto )
            ->whereNull( 'deleted_at' )
            ->first();

        return $almacenunidadmedidaproducto;
    }

    public function store( $query, $request, $detalle )
    {
        $fkidunidadmedidaproducto = $detalle->fkidunidadmedidaproducto;
        $fkidalmacen              = $detalle->fkidalmacen;

        $stockactual = is_numeric( $detalle->stockactual ) ? $detalle->stockactual : 0;
        $stockminimo = is_numeric( $detalle->stockminimo ) ? $detalle->stockminimo : 0;
        $stockmaximo = is_numeric( $detalle->stockmaximo ) ? $detalle->stockmaximo : 0;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $almacenunidadmedidaproducto = $query->create( [
            'fkidunidadmedidaproducto' => $fkidunidadmedidaproducto,
            'fkidalmacen'  => $fkidalmacen,
            'stockactual'  => $stockactual,
            'stockminimo'  => $stockminimo,
            'stockmaximo'  => $stockmaximo,
            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $almacenunidadmedidaproducto;
    }

    public function upgrade( $query, $detalle )
    {
        $idalmacenunidadmedidaproducto = $detalle->idalmacenunidadmedidaproducto;

        $fkidunidadmedidaproducto = $detalle->fkidunidadmedidaproducto;
        $fkidalmacen              = $detalle->fkidalmacen;

        $stockactual = is_numeric( $detalle->stockactual ) ? $detalle->stockactual : 0;
        $stockminimo = is_numeric( $detalle->stockminimo ) ? $detalle->stockminimo : 0;
        $stockmaximo = is_numeric( $detalle->stockmaximo ) ? $detalle->stockmaximo : 0;

        $almacenunidadmedidaproducto = $query->where( 'idalmacenunidadmedidaproducto', '=', $idalmacenunidadmedidaproducto )
            ->update( [
                'fkidunidadmedidaproducto' => $fkidunidadmedidaproducto,
                'fkidalmacen'  => $fkidalmacen,
                'stockactual'  => $stockactual,
                'stockminimo'  => $stockminimo,
                'stockmaximo'  => $stockmaximo,
            ] );

        return $almacenunidadmedidaproducto;
    }

    public function remove( $query, $idalmacenunidadmedidaproducto )
    {
        $query->where('idalmacenunidadmedidaproducto', '=', $idalmacenunidadmedidaproducto)->delete();
    }

}
