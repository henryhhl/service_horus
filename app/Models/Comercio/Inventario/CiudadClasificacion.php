<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class CiudadClasificacion extends Model
{
    
    use SoftDeletes;

    protected $table      = 'ciudadclasificacion';
    protected $primaryKey = 'idciudadclasificacion';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A', 'isdelete' => 'A', 
        'codigo' => null, 'abreviatura' => null,
    ];

    protected $fillable = [ 
        'abreviatura', 'codigo', 'descripcion', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'ciudadclasificacion.idciudadclasificacion';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $ciudadclasificacion = $query->select( [
                'ciudadclasificacion.idciudadclasificacion', 'ciudadclasificacion.codigo', 'ciudadclasificacion.descripcion', 
                'ciudadclasificacion.estado', 'ciudadclasificacion.fecha', 'ciudadclasificacion.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('ciudadclasificacion.idciudadclasificacion', '=', $search)
                        ->orWhere('ciudadclasificacion.codigo', $islike, '%' . $search . '%')
                        ->orWhere('ciudadclasificacion.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('ciudadclasificacion.codigo', $islike, '%' . $search . '%')
                        ->orWhere('ciudadclasificacion.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'ciudadclasificacion.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $ciudadclasificacion;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'ciudadclasificacion.idciudadclasificacion';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $ciudadclasificacion = $query->select( [
                'ciudadclasificacion.idciudadclasificacion', 'ciudadclasificacion.codigo', 'ciudadclasificacion.descripcion', 'ciudadclasificacion.estado',
                'ciudadclasificacion.fecha', 'ciudadclasificacion.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('ciudadclasificacion.idciudadclasificacion', '=', $search)
                        ->orWhere('ciudadclasificacion.codigo', $islike, '%' . $search . '%')
                        ->orWhere('ciudadclasificacion.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('ciudadclasificacion.codigo', $islike, '%' . $search . '%')
                        ->orWhere('ciudadclasificacion.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'ciudadclasificacion.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $ciudadclasificacion;
    }

    public function existDescripcion( $query, $request ) {

        $idciudadclasificacion = isset( $request->idciudadclasificacion ) ? $request->idciudadclasificacion : null;
        $descripcion           = isset( $request->descripcion ) ? $request->descripcion : null;

        $ciudadclasificacion = $query
            ->where( function ( $query ) use ( $idciudadclasificacion, $descripcion ) {
                if ( !is_null( $idciudadclasificacion ) ) {
                    return $query->where('idciudadclasificacion', '<>', $idciudadclasificacion)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->whereNull('deleted_at')
            ->get();
        
        return ( sizeof( $ciudadclasificacion ) > 0 );
    }

    public function newID( )
    {
        $ciudadclasificacion = DB::table('ciudadclasificacion')
            ->select('ciudadclasificacion.idciudadclasificacion')
            ->orderBy('ciudadclasificacion.idciudadclasificacion', 'DESC')
            ->first();

        return ( is_null( $ciudadclasificacion ) ) ? 1 : intval( $ciudadclasificacion->idciudadclasificacion ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo      = isset( $request->codigo )      ? $request->codigo : null;
        $descripcion = isset( $request->descripcion ) ? $request->descripcion : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $ciudadclasificacion = $query->create( [
            'codigo'      => $codigo,
            'descripcion' => $descripcion,
            'fecha'       => $fecha,
            'hora'        => $hora
        ] );

        return $ciudadclasificacion;
    }

    public function upgrade( $query, $request )
    {
        $idciudadclasificacion = isset( $request->idciudadclasificacion ) ? $request->idciudadclasificacion : null;
        $codigo                = isset( $request->codigo ) ? $request->codigo : null;
        $descripcion           = isset( $request->descripcion ) ? $request->descripcion : null;

        $ciudadclasificacion = $query->where( 'idciudadclasificacion', '=', $idciudadclasificacion )
            ->update( [
                'codigo'      => $codigo,
                'descripcion' => $descripcion,
            ] );

        return $ciudadclasificacion;
    }

    public function scopeEnable( $query, $request )
    {
        $idciudadclasificacion = $request->idciudadclasificacion;
        $query->where('idciudadclasificacion', '=', $idciudadclasificacion)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idciudadclasificacion = $request->idciudadclasificacion;
        $query->where('idciudadclasificacion', '=', $idciudadclasificacion)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idciudadclasificacion = $request->idciudadclasificacion;
        $query->where('idciudadclasificacion', '=', $idciudadclasificacion)->delete();
    }

    public function searchByID( $idciudadclasificacion ) {
        $ciudadclasificacion = DB::table('ciudadclasificacion')
            ->select( [
                'ciudadclasificacion.idciudadclasificacion', 'ciudadclasificacion.codigo', 'ciudadclasificacion.descripcion', 
                'ciudadclasificacion.estado', 'ciudadclasificacion.fecha', 'ciudadclasificacion.hora'
            ] )
            ->where('ciudadclasificacion.idciudadclasificacion', '=', $idciudadclasificacion)
            ->whereNull('ciudadclasificacion.deleted_at')
            ->orderBy('ciudadclasificacion.idciudadclasificacion', 'desc')
            ->first();

        return $ciudadclasificacion;
    }

}
