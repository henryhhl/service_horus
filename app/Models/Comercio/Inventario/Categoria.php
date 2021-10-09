<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Categoria extends Model
{
    use SoftDeletes;

    protected $table      = 'categoria';
    protected $primaryKey = 'idcategoria';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A',  'isdelete' => 'A', 
        'codigo' => null, 'abreviatura' => null,
        'imagen' => null, 'extension' => null, 'fkidcategoriapadre' => null,
    ];

    protected $fillable = [ 
        'codigo', 'descripcion', 'abreviatura', 'imagen', 'extension',
        'fkidcategoriapadre', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'categoria.idcategoria';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $categoria = $query
            ->leftJoin( 'categoria as cat', 'cat.idcategoria', '=', 'categoria.fkidcategoriapadre' )
            ->select( [
                'categoria.idcategoria', 'categoria.codigo', 'categoria.descripcion', 'cat.descripcion as categoriapadre',
                'categoria.abreviatura', 'categoria.imagen', 'categoria.extension', 'categoria.fkidcategoriapadre',
                'categoria.isdelete', 'categoria.estado', 'categoria.fecha', 'categoria.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('categoria.idcategoria', '=', $search)
                        ->orWhere('categoria.codigo', $islike, '%' . $search . '%')
                        ->orWhere('categoria.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('categoria.codigo', $islike, '%' . $search . '%')
                        ->orWhere('categoria.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'categoria.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $categoria;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'categoria.idcategoria';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $categoria = $query
            ->leftJoin( 'categoria as cat', 'cat.idcategoria', '=', 'categoria.fkidcategoriapadre' )
            ->select( [
                'categoria.idcategoria', 'categoria.codigo', 'categoria.descripcion', 'cat.descripcion as categoriapadre',
                'categoria.abreviatura', 'categoria.imagen', 'categoria.extension', 'categoria.fkidcategoriapadre',
                'categoria.isdelete', 'categoria.estado', 'categoria.fecha', 'categoria.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('categoria.idcategoria', '=', $search)
                        ->orWhere('categoria.codigo', $islike, '%' . $search . '%')
                        ->orWhere('categoria.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('categoria.codigo', $islike, '%' . $search . '%')
                        ->orWhere('categoria.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'categoria.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $categoria;
    }

    public function existDescripcion( $query, $request ) {

        $idcategoria        = isset( $request->idcategoria ) ? $request->idcategoria : null;
        $descripcion        = isset( $request->descripcion ) ? $request->descripcion : null;
        $fkidcategoriapadre = isset( $request->fkidcategoriapadre ) ? $request->fkidcategoriapadre : null;

        $categoria = $query
            ->where( function ( $query ) use ( $idcategoria, $descripcion ) {
                if ( !is_null( $idcategoria ) ) {
                    return $query->where('idcategoria', '<>', $idcategoria)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->where( is_numeric( $fkidcategoriapadre ) ? [ ['fkidcategoriapadre', '=', $fkidcategoriapadre] ] : [] )
            ->whereNull('deleted_at')
            ->get();
        
        return ( sizeof( $categoria ) > 0 );
    }

    public function newID( )
    {
        $categoria = DB::table('categoria')
            ->select('categoria.idcategoria')
            ->orderBy('categoria.idcategoria', 'DESC')
            ->first();

        return ( is_null( $categoria ) ) ? 1 : intval( $categoria->idcategoria ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo               = isset( $request->codigo )      ? $request->codigo : null;
        $abreviatura          = isset( $request->abreviatura ) ? $request->abreviatura : null;
        $descripcion          = isset( $request->descripcion ) ? $request->descripcion : null;
        $imagen               = isset( $request->imagen )      ? $request->imagen : null;
        $extension            = isset( $request->extension )   ? $request->extension : null;
        $fkidcategoriapadre   = isset( $request->fkidcategoriapadre ) ? $request->fkidcategoriapadre : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $categoria = $query->create( [
            'codigo'      => $codigo,
            'abreviatura' => $abreviatura,
            'descripcion' => $descripcion,
            'imagen'      => $imagen,
            'extension'   => $extension,
            'fkidcategoriapadre' => $fkidcategoriapadre,
            'fecha'       => $fecha,
            'hora'        => $hora
        ] );

        return $categoria;
    }

    public function upgrade( $query, $request )
    {
        $idcategoria        = isset( $request->idcategoria ) ? $request->idcategoria : null;
        $codigo             = isset( $request->codigo )         ? $request->codigo : null;
        $abreviatura        = isset( $request->abreviatura )    ? $request->abreviatura : null;
        $descripcion        = isset( $request->descripcion )    ? $request->descripcion : null;
        $imagen             = isset( $request->imagen )         ? $request->imagen : null;
        $extension          = isset( $request->extension )      ? $request->extension : null;
        $fkidcategoriapadre = isset( $request->fkidcategoriapadre ) ? $request->fkidcategoriapadre : null;

        $categoria = $query->where( 'idcategoria', '=', $idcategoria )
            ->update( [
                'codigo'      => $codigo,
                'abreviatura' => $abreviatura,
                'descripcion' => $descripcion,
                'imagen'      => $imagen,
                'extension'   => $extension,
                'fkidcategoriapadre'=> $fkidcategoriapadre,
            ] );

        return $categoria;
    }

    public function scopeEnable( $query, $request )
    {
        $idcategoria = $request->idcategoria;
        $query->where('idcategoria', '=', $idcategoria)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idcategoria = $request->idcategoria;
        $query->where('idcategoria', '=', $idcategoria)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idcategoria = $request->idcategoria;
        $query->where('idcategoria', '=', $idcategoria)->delete();
    }

    public function searchByID( $idcategoria ) {
        $categoria = DB::table('categoria')
            ->leftJoin( 'categoria as cat', 'cat.idcategoria', '=', 'categoria.fkidcategoriapadre' )
            ->select( [
                'categoria.idcategoria', 'categoria.codigo', 'categoria.descripcion', 'cat.descripcion as categoriapadre',
                'categoria.abreviatura', 'categoria.imagen', 'categoria.extension', 'categoria.fkidcategoriapadre',
                'categoria.isdelete', 'categoria.estado', 'categoria.fecha', 'categoria.hora'
            ] )
            ->where('categoria.idcategoria', '=', $idcategoria)
            ->whereNull('categoria.deleted_at')
            ->orderBy('categoria.idcategoria', 'DESC')
            ->first();

        return $categoria;
    }

}
