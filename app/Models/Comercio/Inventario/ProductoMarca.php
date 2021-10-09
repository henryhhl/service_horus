<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ProductoMarca extends Model
{
    use SoftDeletes;

    protected $table      = 'productomarca';
    protected $primaryKey = 'idproductomarca';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A',  'isdelete' => 'A', 
        'codigo' => null, 'abreviatura' => null,
        'imagen' => null, 'extension' => null,
    ];

    protected $fillable = [ 
        'codigo', 'descripcion', 'abreviatura', 'imagen', 'extension',
        'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'productomarca.idproductomarca';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $productomarca = $query->select( [
                'productomarca.idproductomarca', 'productomarca.codigo', 'productomarca.descripcion', 
                'productomarca.abreviatura', 'productomarca.imagen', 'productomarca.extension',
                'productomarca.isdelete', 'productomarca.estado', 'productomarca.fecha', 'productomarca.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('productomarca.idproductomarca', '=', $search)
                        ->orWhere('productomarca.codigo', $islike, '%' . $search . '%')
                        ->orWhere('productomarca.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('productomarca.codigo', $islike, '%' . $search . '%')
                        ->orWhere('productomarca.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'productomarca.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $productomarca;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'productomarca.idproductomarca';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $productomarca = $query->select( [
                'productomarca.idproductomarca', 'productomarca.codigo', 'productomarca.descripcion', 
                'productomarca.abreviatura', 'productomarca.imagen', 'productomarca.extension',
                'productomarca.isdelete', 'productomarca.estado', 'productomarca.fecha', 'productomarca.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('productomarca.idproductomarca', '=', $search)
                        ->orWhere('productomarca.codigo', $islike, '%' . $search . '%')
                        ->orWhere('productomarca.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('productomarca.codigo', $islike, '%' . $search . '%')
                        ->orWhere('productomarca.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'productomarca.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $productomarca;
    }

    public function existDescripcion( $query, $request ) {

        $idproductomarca = isset( $request->idproductomarca ) ? $request->idproductomarca : null;
        $descripcion     = isset( $request->descripcion )    ? $request->descripcion : null;

        $productomarca = $query
            ->where( function ( $query ) use ( $idproductomarca, $descripcion ) {
                if ( !is_null( $idproductomarca ) ) {
                    return $query->where('idproductomarca', '<>', $idproductomarca)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->whereNull('deleted_at')
            ->get();
        
        return ( sizeof( $productomarca ) > 0 );
    }

    public function newID( )
    {
        $productomarca = DB::table('productomarca')
            ->select('productomarca.idproductomarca')
            ->orderBy('productomarca.idproductomarca', 'DESC')
            ->first();

        return ( is_null( $productomarca ) ) ? 1 : intval( $productomarca->idproductomarca ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo      = isset( $request->codigo )      ? $request->codigo : null;
        $abreviatura = isset( $request->abreviatura ) ? $request->abreviatura : null;
        $descripcion = isset( $request->descripcion ) ? $request->descripcion : null;
        $imagen      = isset( $request->imagen )      ? $request->imagen : null;
        $extension   = isset( $request->extension )   ? $request->extension : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $productomarca = $query->create( [
            'codigo'      => $codigo,
            'abreviatura' => $abreviatura,
            'descripcion' => $descripcion,
            'imagen'      => $imagen,
            'extension'   => $extension,
            'fecha'       => $fecha,
            'hora'        => $hora
        ] );

        return $productomarca;
    }

    public function upgrade( $query, $request )
    {
        $idproductomarca = isset( $request->idproductomarca ) ? $request->idproductomarca : null;
        $codigo         = isset( $request->codigo )         ? $request->codigo : null;
        $abreviatura    = isset( $request->abreviatura )    ? $request->abreviatura : null;
        $descripcion    = isset( $request->descripcion )    ? $request->descripcion : null;
        $imagen         = isset( $request->imagen )         ? $request->imagen : null;
        $extension      = isset( $request->extension )      ? $request->extension : null;

        $productomarca = $query->where( 'idproductomarca', '=', $idproductomarca )
            ->update( [
                'codigo'      => $codigo,
                'abreviatura' => $abreviatura,
                'descripcion' => $descripcion,
                'imagen'      => $imagen,
                'extension'   => $extension,
            ] );

        return $productomarca;
    }

    public function scopeEnable( $query, $request )
    {
        $idproductomarca = $request->idproductomarca;
        $query->where('idproductomarca', '=', $idproductomarca)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idproductomarca = $request->idproductomarca;
        $query->where('idproductomarca', '=', $idproductomarca)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idproductomarca = $request->idproductomarca;
        $query->where('idproductomarca', '=', $idproductomarca)->delete();
    }

    public function searchByID( $idproductomarca ) {
        $productomarca = DB::table('productomarca')
            ->select( [
                'productomarca.idproductomarca', 'productomarca.codigo', 'productomarca.descripcion', 
                'productomarca.abreviatura', 'productomarca.imagen', 'productomarca.extension',
                'productomarca.isdelete', 'productomarca.estado', 'productomarca.fecha', 'productomarca.hora'
            ] )
            ->where('productomarca.idproductomarca', '=', $idproductomarca)
            ->whereNull('productomarca.deleted_at')
            ->orderBy('productomarca.idproductomarca', 'DESC')
            ->first();

        return $productomarca;
    }

}
