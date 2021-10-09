<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ProductoTipo extends Model
{
    
    use SoftDeletes;

    protected $table      = 'productotipo';
    protected $primaryKey = 'idproductotipo';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A',  'isdelete' => 'A', 
        'codigo' => null, 'abreviatura' => null,
    ];

    protected $fillable = [ 
        'codigo', 'descripcion', 'abreviatura', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'ASC';
        $column  = 'productotipo.idproductotipo';

        if ( strtoupper( $orderBy ) != 'DESC' ) $orderBy = 'ASC';

        $islike =  Functions::isLikeAndIlike();

        $productotipo = $query->select( [
                'productotipo.idproductotipo', 'productotipo.codigo', 'productotipo.descripcion', 'productotipo.abreviatura',
                'productotipo.isdelete', 'productotipo.estado', 'productotipo.fecha', 'productotipo.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('productotipo.idproductotipo', '=', $search)
                        ->orWhere('productotipo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('productotipo.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('productotipo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('productotipo.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'productotipo.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $productotipo;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'productotipo.idproductotipo';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $productotipo = $query->select( [
                'productotipo.idproductotipo', 'productotipo.codigo', 'productotipo.descripcion', 'productotipo.abreviatura',
                'productotipo.isdelete', 'productotipo.estado', 'productotipo.fecha', 'productotipo.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('productotipo.idproductotipo', '=', $search)
                        ->orWhere('productotipo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('productotipo.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('productotipo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('productotipo.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'productotipo.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $productotipo;
    }

    public function existDescripcion( $query, $request ) {

        $idproductotipo = isset( $request->idproductotipo ) ? $request->idproductotipo : null;
        $descripcion    = isset( $request->descripcion )    ? $request->descripcion : null;

        $productotipo = $query
            ->where( function ( $query ) use ( $idproductotipo, $descripcion ) {
                if ( !is_null( $idproductotipo ) ) {
                    return $query->where('idproductotipo', '<>', $idproductotipo)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->whereNull('deleted_at')
            ->get();
        
        return ( sizeof( $productotipo ) > 0 );
    }

    public function newID( )
    {
        $productotipo = DB::table('productotipo')
            ->select('productotipo.idproductotipo')
            ->orderBy('productotipo.idproductotipo', 'DESC')
            ->first();

        return ( is_null( $productotipo ) ) ? 1 : intval( $productotipo->idproductotipo ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo      = isset( $request->codigo )      ? $request->codigo : null;
        $abreviatura = isset( $request->abreviatura ) ? $request->abreviatura : null;
        $descripcion = isset( $request->descripcion ) ? $request->descripcion : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $productotipo = $query->create( [
            'codigo'      => $codigo,
            'abreviatura' => $abreviatura,
            'descripcion' => $descripcion,
            'fecha'       => $fecha,
            'hora'        => $hora
        ] );

        return $productotipo;
    }

    public function upgrade( $query, $request )
    {
        $idproductotipo = isset( $request->idproductotipo ) ? $request->idproductotipo : null;
        $codigo         = isset( $request->codigo )         ? $request->codigo : null;
        $abreviatura    = isset( $request->abreviatura )    ? $request->abreviatura : null;
        $descripcion    = isset( $request->descripcion )    ? $request->descripcion : null;

        $productotipo = $query->where( 'idproductotipo', '=', $idproductotipo )
            ->update( [
                'codigo'      => $codigo,
                'abreviatura' => $abreviatura,
                'descripcion' => $descripcion,
            ] );

        return $productotipo;
    }

    public function scopeEnable( $query, $request )
    {
        $idproductotipo = $request->idproductotipo;
        $query->where('idproductotipo', '=', $idproductotipo)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idproductotipo = $request->idproductotipo;
        $query->where('idproductotipo', '=', $idproductotipo)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idproductotipo = $request->idproductotipo;
        $query->where('idproductotipo', '=', $idproductotipo)->delete();
    }

    public function searchByID( $idproductotipo ) {
        $productotipo = DB::table('productotipo')
            ->select( [
                'productotipo.idproductotipo', 'productotipo.codigo', 'productotipo.descripcion', 'productotipo.abreviatura',
                'productotipo.isdelete', 'productotipo.estado', 'productotipo.fecha', 'productotipo.hora'
            ] )
            ->where('productotipo.idproductotipo', '=', $idproductotipo)
            ->whereNull('productotipo.deleted_at')
            ->orderBy('productotipo.idproductotipo', 'DESC')
            ->first();

        return $productotipo;
    }

}
