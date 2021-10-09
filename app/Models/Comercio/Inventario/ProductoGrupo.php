<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ProductoGrupo extends Model
{
    use SoftDeletes;

    protected $table      = 'productogrupo';
    protected $primaryKey = 'idproductogrupo';
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

    public function productosubgrupo() {
        return $this->hasMany(
            'App\Models\Comercio\Inventario\ProductoSubGrupo',
            'fkidproductogrupo',
            'idproductogrupo'
        );
    }

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'productogrupo.idproductogrupo';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $productogrupo = $query->select( [
                'productogrupo.idproductogrupo', 'productogrupo.codigo', 'productogrupo.descripcion', 
                'productogrupo.abreviatura', 'productogrupo.imagen', 'productogrupo.extension',
                'productogrupo.isdelete', 'productogrupo.estado', 'productogrupo.fecha', 'productogrupo.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('productogrupo.idproductogrupo', '=', $search)
                        ->orWhere('productogrupo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('productogrupo.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('productogrupo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('productogrupo.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'productosubgrupo' => function( $query ) {
                $query
                    ->select( [
                        'productosubgrupo.idproductosubgrupo', 'productosubgrupo.fkidproductogrupo',
                        'productosubgrupo.abreviatura', 'productosubgrupo.descripcion',
                    ] )
                    ->orderBy('productosubgrupo.idproductosubgrupo');
            } ] )
            ->whereNull( 'productogrupo.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $productogrupo;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'productogrupo.idproductogrupo';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $productogrupo = $query->select( [
                'productogrupo.idproductogrupo', 'productogrupo.codigo', 'productogrupo.descripcion', 
                'productogrupo.abreviatura', 'productogrupo.imagen', 'productogrupo.extension',
                'productogrupo.isdelete', 'productogrupo.estado', 'productogrupo.fecha', 'productogrupo.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('productogrupo.idproductogrupo', '=', $search)
                        ->orWhere('productogrupo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('productogrupo.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('productogrupo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('productogrupo.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'productosubgrupo' => function( $query ) {
                $query
                    ->select( [
                        'productosubgrupo.idproductosubgrupo', 'productosubgrupo.fkidproductogrupo',
                        'productosubgrupo.abreviatura', 'productosubgrupo.descripcion',
                    ] )
                    ->orderBy('productosubgrupo.idproductosubgrupo');
            } ] )
            ->whereNull( 'productogrupo.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $productogrupo;
    }

    public function existDescripcion( $query, $request ) {

        $idproductogrupo = isset( $request->idproductogrupo ) ? $request->idproductogrupo : null;
        $descripcion     = isset( $request->descripcion )    ? $request->descripcion : null;

        $productogrupo = $query
            ->where( function ( $query ) use ( $idproductogrupo, $descripcion ) {
                if ( !is_null( $idproductogrupo ) ) {
                    return $query->where('idproductogrupo', '<>', $idproductogrupo)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->whereNull('deleted_at')
            ->get();
        
        return ( sizeof( $productogrupo ) > 0 );
    }

    public function newID( )
    {
        $productogrupo = DB::table('productogrupo')
            ->select('productogrupo.idproductogrupo')
            ->orderBy('productogrupo.idproductogrupo', 'DESC')
            ->first();

        return ( is_null( $productogrupo ) ) ? 1 : intval( $productogrupo->idproductogrupo ) + 1;
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

        $productogrupo = $query->create( [
            'codigo'      => $codigo,
            'abreviatura' => $abreviatura,
            'descripcion' => $descripcion,
            'imagen'      => $imagen,
            'extension'   => $extension,
            'fecha'       => $fecha,
            'hora'        => $hora
        ] );

        return $productogrupo;
    }

    public function upgrade( $query, $request )
    {
        $idproductogrupo = isset( $request->idproductogrupo ) ? $request->idproductogrupo : null;
        $codigo          = isset( $request->codigo )         ? $request->codigo : null;
        $abreviatura     = isset( $request->abreviatura )    ? $request->abreviatura : null;
        $descripcion     = isset( $request->descripcion )    ? $request->descripcion : null;
        $imagen          = isset( $request->imagen )         ? $request->imagen : null;
        $extension       = isset( $request->extension )      ? $request->extension : null;

        $productogrupo = $query->where( 'idproductogrupo', '=', $idproductogrupo )
            ->update( [
                'codigo'      => $codigo,
                'abreviatura' => $abreviatura,
                'descripcion' => $descripcion,
                'imagen'      => $imagen,
                'extension'   => $extension,
            ] );

        return $productogrupo;
    }

    public function scopeEnable( $query, $request )
    {
        $idproductogrupo = $request->idproductogrupo;
        $query->where('idproductogrupo', '=', $idproductogrupo)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idproductogrupo = $request->idproductogrupo;
        $query->where('idproductogrupo', '=', $idproductogrupo)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idproductogrupo = $request->idproductogrupo;
        $query->where('idproductogrupo', '=', $idproductogrupo)->delete();
    }

    public function searchByID( $idproductogrupo ) {
        $productogrupo = DB::table('productogrupo')
            ->select( [
                'productogrupo.idproductogrupo', 'productogrupo.codigo', 'productogrupo.descripcion', 
                'productogrupo.abreviatura', 'productogrupo.imagen', 'productogrupo.extension',
                'productogrupo.isdelete', 'productogrupo.estado', 'productogrupo.fecha', 'productogrupo.hora'
            ] )
            ->where('productogrupo.idproductogrupo', '=', $idproductogrupo)
            ->with( [ 'productosubgrupo' => function( $query ) {
                $query
                    ->select( [
                        'productosubgrupo.idproductosubgrupo', 'productosubgrupo.fkidproductogrupo',
                        'productosubgrupo.abreviatura', 'productosubgrupo.descripcion',
                    ] )
                    ->orderBy('productosubgrupo.idproductosubgrupo');
            } ] )
            ->whereNull('productogrupo.deleted_at')
            ->orderBy('productogrupo.idproductogrupo', 'DESC')
            ->first();

        return $productogrupo;
    }

}
