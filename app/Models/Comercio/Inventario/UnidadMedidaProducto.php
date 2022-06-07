<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class UnidadMedidaProducto extends Model
{
    use SoftDeletes;

    protected $table      = 'unidadmedidaproducto';
    protected $primaryKey = 'idunidadmedidaproducto';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'estado' => 'A',  'isdelete' => 'A',
        'codigo' => null, 'peso' => 0, 'costo' => 0, 'stock' => 0, 'costounitario' => 0,
        'volumen' => 0, 'costodescuento' => 0, 'costomontodescuento' => 0, 'valorequivalente' => 0,
    ];

    protected $fillable = [
        'fkidunidadmedida', 'fkidproducto', 'codigo', 'valorequivalente', 'peso', 'costo', 'stock',
        'volumen', 'costodescuento', 'costomontodescuento', 'costounitario',
        'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function arraynotacompradetalle() {
        return $this->hasMany(
            'App\Models\Comercio\Compra\NotaCompraDetalle',
            'fkidunidadmedidaproducto',
            'idunidadmedidaproducto'
        );
    }

    public function unidadmedida() {
        return $this->belongsTo("App\Models\Comercio\Inventario\UnidadMedida", "fkidunidadmedida", "idunidadmedida");
    }

    public function producto() {
        return $this->belongsTo("App\Models\Comercio\Inventario\Producto", "fkidproducto", "idproducto");
    }

    public function arrayalmacenunidadmedidaproducto() {
        return $this->hasMany(
            'App\Models\Comercio\Inventario\AlmacenUnidadMedidaProducto',
            'fkidunidadmedidaproducto',
            'idunidadmedidaproducto'
        );
    }

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $isventa = isset($request->isventa) ? $request->isventa : 'T';
        $column  = 'unidadmedidaproducto.idunidadmedidaproducto';
        $fkidalmacen = isset($request->fkidalmacen) ? $request->fkidalmacen : null;

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';
        if ( !is_numeric( $fkidalmacen ) ) $fkidalmacen = null;
        if ( strtoupper( $isventa ) != 'A' && strtoupper( $isventa ) != 'N' ) $isventa = 'T';
        else $isventa = strtoupper( $isventa );

        $islike =  Functions::isLikeAndIlike();

        $unidadmedidaproducto = $query
            ->select( [
                'unidadmedidaproducto.idunidadmedidaproducto', 'unidadmedidaproducto.fkidunidadmedida', 'unidadmedidaproducto.fkidproducto',
                'unidadmedidaproducto.codigo', 'unidadmedidaproducto.peso', 'unidadmedidaproducto.volumen',
                'unidadmedidaproducto.stock', 'unidadmedidaproducto.costo', 'unidadmedidaproducto.costodescuento',
                'unidadmedidaproducto.costomontodescuento', 'unidadmedidaproducto.costounitario',
                'unidadmedidaproducto.valorequivalente',
                'unidadmedidaproducto.fecha', 'unidadmedidaproducto.hora', 'unidadmedidaproducto.estado', 'unidadmedidaproducto.isdelete',

                'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                'prod.idproducto', 'prod.nombre as producto', 'prod.stockactual', 'prod.nivel', 'prod.isventa',
                'prodmarc.idproductomarca', 'prodmarc.descripcion as marca',
                'prodtipo.idproductotipo', 'prodtipo.descripcion as tipo',
                'ciu.idciudad', 'ciu.descripcion as origen',
                'cat.idcategoria', 'cat.descripcion as categoria'
            ] )
            ->leftJoin('unidadmedida as unidmed', 'unidadmedidaproducto.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
            ->leftJoin('producto as prod', 'unidadmedidaproducto.fkidproducto', '=', 'prod.idproducto')
            ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
            ->leftJoin('productotipo as prodtipo', 'prod.fkidproductotipo', '=', 'prodtipo.idproductotipo')
            ->leftJoin('categoria as cat', 'prod.fkidcategoria', '=', 'cat.idcategoria')
            ->leftJoin('ciudad as ciu', 'prod.fkidciudadorigen', '=', 'ciu.idciudad')
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('unidadmedidaproducto.idunidadmedidaproducto', '=', $search)
                        ->orWhere('unidadmedidaproducto.codigo', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('unidadmedidaproducto.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->where( ( $isventa == 'T' ) ? [] : [[ 'prod.isventa', '=', $isventa ]] )
            ->where( ( is_null( $fkidalmacen ) ) ? [] : [ [
                DB::raw("(
                    SELECT COUNT(*) AS cantidad
                    FROM almacenunidadmedidaproducto almundmedprod
                    WHERE almundmedprod.fkidunidadmedidaproducto = unidadmedidaproducto.idunidadmedidaproducto
                        AND almundmedprod.deleted_at IS NULL AND almundmedprod.fkidalmacen = '$fkidalmacen'
                )"), '>', '0'
            ] ] )
            // ->with( [ 'unidadmedida' => function ( $query ) {
            //     $query->select( 'idunidadmedida', 'abreviatura', 'descripcion' );
            // } ] )
            // ->with( [ 'producto' => function ( $query ) {
            //     $query->select( 'idproducto', 'nombre', 'descripcion' );
            // } ] )
            ->whereNull( 'unidadmedidaproducto.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $unidadmedidaproducto;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'unidadmedidaproducto.idunidadmedidaproducto';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $unidadmedidaproducto = $query
            ->select( [
                'unidadmedidaproducto.idunidadmedidaproducto', 'unidadmedidaproducto.fkidunidadmedida', 'unidadmedidaproducto.fkidproducto',
                'unidadmedidaproducto.codigo', 'unidadmedidaproducto.peso', 'unidadmedidaproducto.volumen',
                'unidadmedidaproducto.stock', 'unidadmedidaproducto.costo', 'unidadmedidaproducto.costodescuento',
                'unidadmedidaproducto.costomontodescuento', 'unidadmedidaproducto.costounitario',
                'unidadmedidaproducto.valorequivalente',
                'unidadmedidaproducto.fecha', 'unidadmedidaproducto.hora', 'unidadmedidaproducto.estado', 'unidadmedidaproducto.isdelete',

                'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                'prod.idproducto', 'prod.nombre as producto', 'prod.stockactual', 'prod.nivel',
                'prodmarc.idproductomarca', 'prodmarc.descripcion as marca',
                'prodtipo.idproductotipo', 'prodtipo.descripcion as tipo',
                'ciu.idciudad', 'ciu.descripcion as origen',
                'cat.idcategoria', 'cat.descripcion as categoria'
            ] )
            ->leftJoin('unidadmedida as unidmed', 'unidadmedidaproducto.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
            ->leftJoin('producto as prod', 'unidadmedidaproducto.fkidproducto', '=', 'prod.idproducto')
            ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
            ->leftJoin('productotipo as prodtipo', 'prod.fkidproductotipo', '=', 'prodtipo.idproductotipo')
            ->leftJoin('ciudad as ciu', 'prod.fkidciudadorigen', '=', 'ciu.idciudad')
            ->leftJoin('categoria as cat', 'prod.fkidcategoria', '=', 'cat.idcategoria')
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('unidadmedidaproducto.idunidadmedidaproducto', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('unidadmedidaproducto.codigo', $islike, '%' . $search . '%')
                        ->orWhere('prod.nombre', $islike, '%' . $search . '%');
                }
                return;
            } )
            // ->with( [ 'unidadmedida' => function ( $query ) {
            //     $query->select( 'idunidadmedida', 'abreviatura', 'descripcion' );
            // } ] )
            // ->with( [ 'producto' => function ( $query ) {
            //     $query->select( 'idproducto', 'nombre', 'descripcion' );
            // } ] )
            ->whereNull( 'unidadmedidaproducto.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $unidadmedidaproducto;
    }

    public function store( $query, $request, $detalle )
    {
        $fkidunidadmedida = $detalle->fkidunidadmedida;
        $fkidproducto     = $detalle->fkidproducto;
        $codigo = isset( $detalle->codigo ) ? $detalle->codigo : null;

        $peso    = isset( $detalle->peso )    ? $detalle->peso : 0;
        $volumen = isset( $detalle->volumen ) ? $detalle->volumen : 0;
        $valorequivalente = isset( $detalle->valorequivalente ) ? $detalle->valorequivalente : 0;

        $costo = isset( $detalle->costo ) ? $detalle->costo : 0;
        $costodescuento = isset( $detalle->costodescuento ) ? $detalle->costodescuento : 0;
        $costomontodescuento = isset( $detalle->costomontodescuento ) ? $detalle->costomontodescuento : 0;
        $costounitario = isset( $detalle->costounitario ) ? $detalle->costounitario : 0;

        $stock  = isset( $detalle->stock ) ? $detalle->stock : 0;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $unidadmedidaproducto = $query->create( [
            'fkidunidadmedida' => $fkidunidadmedida,
            'fkidproducto'     => $fkidproducto,
            'codigo'  => $codigo,
            'volumen' => $volumen,
            'peso'    => $peso,
            'valorequivalente'    => $valorequivalente,

            'costo' => $costo,
            'costodescuento' => $costodescuento,
            'costomontodescuento' => $costomontodescuento,
            'costounitario' => $costounitario,

            'stock'   => $stock,
            'fecha'   => $fecha,
            'hora'    => $hora
        ] );

        return $unidadmedidaproducto;
    }

    public function upgrade( $query, $detalle )
    {
        $idunidadmedidaproducto = $detalle->idunidadmedidaproducto;

        $fkidunidadmedida = $detalle->fkidunidadmedida;
        $fkidproducto     = $detalle->fkidproducto;
        $codigo = isset( $detalle->codigo ) ? $detalle->codigo : null;

        $peso   = isset( $detalle->peso )  ? $detalle->peso : 0;
        $volumen = isset( $detalle->volumen )  ? $detalle->volumen : 0;
        $valorequivalente = isset( $detalle->valorequivalente ) ? $detalle->valorequivalente : 0;

        $costo = isset( $detalle->costo ) ? $detalle->costo : 0;
        $costodescuento = isset( $detalle->costodescuento ) ? $detalle->costodescuento : 0;
        $costomontodescuento = isset( $detalle->costomontodescuento ) ? $detalle->costomontodescuento : 0;
        $costounitario = isset( $detalle->costounitario ) ? $detalle->costounitario : 0;

        $stock  = isset( $detalle->stock ) ? $detalle->stock : 0;

        $unidadmedidaproducto = $query->where( 'idunidadmedidaproducto', '=', $idunidadmedidaproducto )
            ->update( [
                'fkidunidadmedida' => $fkidunidadmedida,
                'fkidproducto'     => $fkidproducto,
                'codigo' => $codigo,
                'volumen' => $volumen,
                'peso'    => $peso,
                'valorequivalente' => $valorequivalente,

                'costo' => $costo,
                'costodescuento' => $costodescuento,
                'costomontodescuento' => $costomontodescuento,
                'costounitario' => $costounitario,
                'stock'  => $stock,
            ] );

        return $unidadmedidaproducto;
    }

    public function remove( $query, $idunidadmedidaproducto )
    {
        $query->where('idunidadmedidaproducto', '=', $idunidadmedidaproducto)->delete();
    }

    public function tieneUnidadMedida( $query, $idunidadmedida ) {

        $unidadmedidaproducto = $query
            ->where( 'unidadmedidaproducto.fkidunidadmedida', '=', $idunidadmedida )
            ->whereNull('unidadmedidaproducto.deleted_at')
            ->get();

        return ( sizeof( $unidadmedidaproducto ) > 0 );
    }

}
