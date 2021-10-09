<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class UnidadMedida extends Model
{

    use SoftDeletes;

    protected $table      = 'unidadmedida';
    protected $primaryKey = 'idunidadmedida';
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
        $column  = 'unidadmedida.idunidadmedida';

        if ( strtoupper( $orderBy ) != 'DESC' ) $orderBy = 'ASC';

        $islike =  Functions::isLikeAndIlike();

        $unidadmedida = $query->select( [
                'unidadmedida.idunidadmedida', 'unidadmedida.codigo', 'unidadmedida.descripcion', 'unidadmedida.abreviatura',
                'unidadmedida.isdelete', 'unidadmedida.estado', 'unidadmedida.fecha', 'unidadmedida.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('unidadmedida.idunidadmedida', '=', $search)
                        ->orWhere('unidadmedida.codigo', $islike, '%' . $search . '%')
                        ->orWhere('unidadmedida.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('unidadmedida.codigo', $islike, '%' . $search . '%')
                        ->orWhere('unidadmedida.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'unidadmedida.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $unidadmedida;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'unidadmedida.idunidadmedida';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $unidadmedida = $query->select( [
                'unidadmedida.idunidadmedida', 'unidadmedida.codigo', 'unidadmedida.descripcion', 'unidadmedida.abreviatura',
                'unidadmedida.isdelete', 'unidadmedida.estado', 'unidadmedida.fecha', 'unidadmedida.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('unidadmedida.idunidadmedida', '=', $search)
                        ->orWhere('unidadmedida.codigo', $islike, '%' . $search . '%')
                        ->orWhere('unidadmedida.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('unidadmedida.codigo', $islike, '%' . $search . '%')
                        ->orWhere('unidadmedida.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'unidadmedida.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $unidadmedida;
    }

    public function existDescripcion( $query, $request ) {

        $idunidadmedida = isset( $request->idunidadmedida ) ? $request->idunidadmedida : null;
        $descripcion    = isset( $request->descripcion )    ? $request->descripcion : null;

        $unidadmedida = $query
            ->where( function ( $query ) use ( $idunidadmedida, $descripcion ) {
                if ( !is_null( $idunidadmedida ) ) {
                    return $query->where('idunidadmedida', '<>', $idunidadmedida)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->whereNull('deleted_at')
            ->get();
        
        return ( sizeof( $unidadmedida ) > 0 );
    }

    public function newID( )
    {
        $unidadmedida = DB::table('unidadmedida')
            ->select('unidadmedida.idunidadmedida')
            ->orderBy('unidadmedida.idunidadmedida', 'DESC')
            ->first();

        return ( is_null( $unidadmedida ) ) ? 1 : intval( $unidadmedida->idunidadmedida ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo      = isset( $request->codigo )      ? $request->codigo : null;
        $abreviatura = isset( $request->abreviatura ) ? $request->abreviatura : null;
        $descripcion = isset( $request->descripcion ) ? $request->descripcion : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $unidadmedida = $query->create( [
            'codigo'      => $codigo,
            'abreviatura' => $abreviatura,
            'descripcion' => $descripcion,
            'fecha'       => $fecha,
            'hora'        => $hora
        ] );

        return $unidadmedida;
    }

    public function upgrade( $query, $request )
    {
        $idunidadmedida = isset( $request->idunidadmedida ) ? $request->idunidadmedida : null;
        $codigo         = isset( $request->codigo )         ? $request->codigo : null;
        $abreviatura    = isset( $request->abreviatura )    ? $request->abreviatura : null;
        $descripcion    = isset( $request->descripcion )    ? $request->descripcion : null;

        $unidadmedida = $query->where( 'idunidadmedida', '=', $idunidadmedida )
            ->update( [
                'codigo'      => $codigo,
                'abreviatura' => $abreviatura,
                'descripcion' => $descripcion,
            ] );

        return $unidadmedida;
    }

    public function scopeEnable( $query, $request )
    {
        $idunidadmedida = $request->idunidadmedida;
        $query->where('idunidadmedida', '=', $idunidadmedida)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idunidadmedida = $request->idunidadmedida;
        $query->where('idunidadmedida', '=', $idunidadmedida)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idunidadmedida = $request->idunidadmedida;
        $query->where('idunidadmedida', '=', $idunidadmedida)->delete();
    }
    
    public function searchByID( $idunidadmedida ) {
        $unidadmedida = DB::table('unidadmedida')
            ->select( [
                'unidadmedida.idunidadmedida', 'unidadmedida.codigo', 'unidadmedida.descripcion', 'unidadmedida.abreviatura',
                'unidadmedida.isdelete', 'unidadmedida.estado', 'unidadmedida.fecha', 'unidadmedida.hora'
            ] )
            ->where('unidadmedida.idunidadmedida', '=', $idunidadmedida)
            ->whereNull('unidadmedida.deleted_at')
            ->orderBy('unidadmedida.idunidadmedida', 'DESC')
            ->first();

        return $unidadmedida;
    }

}
