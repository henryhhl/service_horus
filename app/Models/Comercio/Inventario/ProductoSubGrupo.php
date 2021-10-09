<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ProductoSubGrupo extends Model
{
    use SoftDeletes;

    protected $table      = 'productosubgrupo';
    protected $primaryKey = 'idproductosubgrupo';
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
        'codigo', 'descripcion', 'fkidproductogrupo', 'abreviatura', 'imagen', 'extension',
        'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'productosubgrupo.idproductosubgrupo';
        
        $fkidproductogrupo = isset($request->fkidproductogrupo) ? $request->fkidproductogrupo : null;

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $productosubgrupo = $query
            ->leftJoin('productogrupo as prodgrup', 'productosubgrupo.fkidproductogrupo', '=', 'prodgrup.idproductogrupo')
            ->select( [
                'productosubgrupo.idproductosubgrupo', 'productosubgrupo.codigo', 'productosubgrupo.descripcion', 
                'productosubgrupo.abreviatura', 'productosubgrupo.imagen', 'productosubgrupo.extension', 
                'productosubgrupo.fkidproductogrupo', 'prodgrup.descripcion as productogrupo',
                'productosubgrupo.isdelete', 'productosubgrupo.estado', 'productosubgrupo.fecha', 'productosubgrupo.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('productosubgrupo.idproductosubgrupo', '=', $search)
                        ->orWhere('productosubgrupo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('productosubgrupo.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('productosubgrupo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('productosubgrupo.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->where( is_numeric( $fkidproductogrupo ) ? [ ['productosubgrupo.fkidproductogrupo', '=', $fkidproductogrupo] ] : [] )
            ->whereNull( 'productosubgrupo.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $productosubgrupo;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'productosubgrupo.idproductosubgrupo';

        $fkidproductogrupo = isset($request->fkidproductogrupo) ? $request->fkidproductogrupo : null;

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $productosubgrupo = $query
            ->leftJoin('productogrupo as prodgrup', 'productosubgrupo.fkidproductogrupo', '=', 'prodgrup.idproductogrupo')
            ->select( [
                'productosubgrupo.idproductosubgrupo', 'productosubgrupo.codigo', 'productosubgrupo.descripcion', 
                'productosubgrupo.abreviatura', 'productosubgrupo.imagen', 'productosubgrupo.extension', 
                'productosubgrupo.fkidproductogrupo', 'prodgrup.descripcion as productogrupo',
                'productosubgrupo.isdelete', 'productosubgrupo.estado', 'productosubgrupo.fecha', 'productosubgrupo.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('productosubgrupo.idproductosubgrupo', '=', $search)
                        ->orWhere('productosubgrupo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('productosubgrupo.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('productosubgrupo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('productosubgrupo.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->where( is_numeric( $fkidproductogrupo ) ? [ ['productosubgrupo.fkidproductogrupo', '=', $fkidproductogrupo] ] : [] )
            ->whereNull( 'productosubgrupo.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $productosubgrupo;
    }

    public function existDescripcion( $query, $request ) {

        $idproductosubgrupo = isset( $request->idproductosubgrupo ) ? $request->idproductosubgrupo : null;
        $fkidproductogrupo  = isset( $request->idproductosubgrupo ) ? $request->idproductosubgrupo : null;
        $descripcion        = isset( $request->descripcion )    ? $request->descripcion : null;

        $productosubgrupo = $query
            ->where( function ( $query ) use ( $idproductosubgrupo, $descripcion ) {
                if ( !is_null( $idproductosubgrupo ) ) {
                    return $query->where('idproductosubgrupo', '<>', $idproductosubgrupo)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->where( is_numeric( $fkidproductogrupo ) ? [['fkidproductogrupo', '=', $fkidproductogrupo]] : [] )
            ->whereNull('deleted_at')
            ->get();
        
        return ( sizeof( $productosubgrupo ) > 0 );
    }

    public function newID( )
    {
        $productosubgrupo = DB::table('productosubgrupo')
            ->select('productosubgrupo.idproductosubgrupo')
            ->orderBy('productosubgrupo.idproductosubgrupo', 'DESC')
            ->first();

        return ( is_null( $productosubgrupo ) ) ? 1 : intval( $productosubgrupo->idproductosubgrupo ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo      = isset( $request->codigo )      ? $request->codigo : null;
        $abreviatura = isset( $request->abreviatura ) ? $request->abreviatura : null;
        $descripcion = isset( $request->descripcion ) ? $request->descripcion : null;
        $imagen      = isset( $request->imagen )      ? $request->imagen : null;
        $extension   = isset( $request->extension )   ? $request->extension : null;
        $fkidproductogrupo = isset( $request->fkidproductogrupo )   ? $request->fkidproductogrupo : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $productosubgrupo = $query->create( [
            'codigo'      => $codigo,
            'abreviatura' => $abreviatura,
            'descripcion' => $descripcion,
            'imagen'      => $imagen,
            'extension'   => $extension,
            'fkidproductogrupo' => $fkidproductogrupo,
            'fecha'       => $fecha,
            'hora'        => $hora
        ] );

        return $productosubgrupo;
    }

    public function upgrade( $query, $request )
    {
        $idproductosubgrupo = isset( $request->idproductosubgrupo ) ? $request->idproductosubgrupo : null;
        $fkidproductogrupo  = isset( $request->fkidproductogrupo ) ? $request->fkidproductogrupo : null;
        $codigo          = isset( $request->codigo )         ? $request->codigo : null;
        $abreviatura     = isset( $request->abreviatura )    ? $request->abreviatura : null;
        $descripcion     = isset( $request->descripcion )    ? $request->descripcion : null;
        $imagen          = isset( $request->imagen )         ? $request->imagen : null;
        $extension       = isset( $request->extension )      ? $request->extension : null;

        $productosubgrupo = $query->where( 'idproductosubgrupo', '=', $idproductosubgrupo )
            ->update( [
                'codigo'      => $codigo,
                'abreviatura' => $abreviatura,
                'descripcion' => $descripcion,
                'imagen'      => $imagen,
                'extension'   => $extension,
                'fkidproductogrupo' => $fkidproductogrupo,
            ] );

        return $productosubgrupo;
    }

    public function scopeEnable( $query, $request )
    {
        $idproductosubgrupo = $request->idproductosubgrupo;
        $query->where('idproductosubgrupo', '=', $idproductosubgrupo)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idproductosubgrupo = $request->idproductosubgrupo;
        $query->where('idproductosubgrupo', '=', $idproductosubgrupo)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idproductosubgrupo = $request->idproductosubgrupo;
        $query->where('idproductosubgrupo', '=', $idproductosubgrupo)->delete();
    }

    public function searchByID( $idproductosubgrupo ) {
        $productosubgrupo = DB::table('productosubgrupo')
            ->leftJoin('productogrupo as prodgrup', 'productosubgrupo.fkidproductogrupo', '=', 'prodgrup.idproductogrupo')
            ->select( [
                'productosubgrupo.idproductosubgrupo', 'productosubgrupo.codigo', 'productosubgrupo.descripcion', 
                'productosubgrupo.abreviatura', 'productosubgrupo.imagen', 'productosubgrupo.extension', 
                'productosubgrupo.fkidproductogrupo', 'prodgrup.descripcion as productogrupo',
                'productosubgrupo.isdelete', 'productosubgrupo.estado', 'productosubgrupo.fecha', 'productosubgrupo.hora'
            ] )
            ->where('productosubgrupo.idproductosubgrupo', '=', $idproductosubgrupo)
            ->whereNull('productosubgrupo.deleted_at')
            ->orderBy('productosubgrupo.idproductosubgrupo', 'DESC')
            ->first();

        return $productosubgrupo;
    }

    public function tieneProductoGrupo( $query, $idproductogrupo ) {

        $productosubgrupo = $query
            ->where( 'productosubgrupo.fkidproductogrupo', '=', $idproductogrupo )
            ->whereNull('productosubgrupo.deleted_at')
            ->get();
        
        return ( sizeof( $productosubgrupo ) > 0 );
    }
    
}
