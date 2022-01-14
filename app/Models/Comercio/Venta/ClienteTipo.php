<?php

namespace App\Models\Comercio\Venta;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ClienteTipo extends Model
{
    use SoftDeletes;

    protected $table      = 'clientetipo';
    protected $primaryKey = 'idclientetipo';
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
        'fecha', 'hora', 'estado', 'isdelete',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'clientetipo.idclientetipo';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $clientetipo = $query
            ->select( [
                'clientetipo.idclientetipo', 'clientetipo.codigo', 'clientetipo.descripcion',
                'clientetipo.abreviatura', 'clientetipo.imagen', 'clientetipo.extension',
                'clientetipo.estado', 'clientetipo.isdelete', 'clientetipo.fecha', 'clientetipo.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('clientetipo.idclientetipo', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('clientetipo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('clientetipo.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'clientetipo.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $clientetipo;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'clientetipo.idclientetipo';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $clientetipo = $query
            ->select( [
                'clientetipo.idclientetipo', 'clientetipo.codigo', 'clientetipo.descripcion',
                'clientetipo.abreviatura', 'clientetipo.imagen', 'clientetipo.extension',
                'clientetipo.estado', 'clientetipo.isdelete', 'clientetipo.fecha', 'clientetipo.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('clientetipo.idclientetipo', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('clientetipo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('clientetipo.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'clientetipo.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $clientetipo;
    }

    public function existDescripcion( $query, $request ) {

        $idclientetipo = isset( $request->idclientetipo )  ? $request->idclientetipo : null;
        $descripcion = isset( $request->descripcion )  ? $request->descripcion : null;

        $clientetipo = $query
            ->where( function ( $query ) use ( $idclientetipo, $descripcion ) {
                if ( !is_null( $idclientetipo ) ) {
                    return $query->where('idclientetipo', '<>', $idclientetipo)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->whereNull('deleted_at')
            ->get();
        
        return ( sizeof( $clientetipo ) > 0 );
    }

    public function newID( )
    {
        $clientetipo = DB::table('clientetipo')
            ->select('clientetipo.idclientetipo')
            ->orderBy('clientetipo.idclientetipo', 'DESC')
            ->first();

        return ( is_null( $clientetipo ) ) ? 1 : intval( $clientetipo->idclientetipo ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo       = isset( $request->codigo )      ? $request->codigo : null;
        $abreviatura  = isset( $request->abreviatura ) ? $request->abreviatura : null;
        $descripcion  = isset( $request->descripcion ) ? $request->descripcion : null;

        $imagen  = isset( $request->imagen ) ? $request->imagen : null;
        $extension  = isset( $request->extension ) ? $request->extension : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $clientetipo = $query->create( [
            'codigo'       => $codigo,
            'abreviatura'  => $abreviatura,
            'descripcion'  => $descripcion,
            'imagen'  => $imagen,
            'extension' => $extension,
            'fecha'     => $fecha,
            'hora'      => $hora
        ] );

        return $clientetipo;
    }

    public function upgrade( $query, $request )
    {
        $idclientetipo = isset( $request->idclientetipo ) ? $request->idclientetipo : null;
        $codigo         = isset( $request->codigo )         ? $request->codigo : null;
        $abreviatura    = isset( $request->abreviatura )    ? $request->abreviatura : null;
        $descripcion    = isset( $request->descripcion )    ? $request->descripcion : null;

        $imagen    = isset( $request->imagen )    ? $request->imagen : null;
        $extension = isset( $request->extension ) ? $request->extension : null;

        $clientetipo = $query->where( 'idclientetipo', '=', $idclientetipo )
            ->update( [
                'codigo'       => $codigo,
                'abreviatura'  => $abreviatura,
                'descripcion'  => $descripcion,
                'imagen'  => $imagen,
                'extension'  => $extension,
            ] );

        return $clientetipo;
    }

    public function show( $query, $idclientetipo ) {

        $clientetipo = $query
            ->select( [
                'clientetipo.idclientetipo', 'clientetipo.codigo', 'clientetipo.descripcion',
                'clientetipo.abreviatura', 'clientetipo.imagen', 'clientetipo.extension',
                'clientetipo.estado', 'clientetipo.isdelete', 'clientetipo.fecha', 'clientetipo.hora'
            ] )
            ->where( 'clientetipo.idclientetipo', '=', $idclientetipo )
            ->whereNull('clientetipo.deleted_at')
            ->orderBy('clientetipo.idclientetipo', 'DESC')
            ->first();
        
        return $clientetipo;
    }

    public function scopeEnable( $query, $request )
    {
        $idclientetipo = $request->idclientetipo;
        $query->where('idclientetipo', '=', $idclientetipo)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idclientetipo = $request->idclientetipo;
        $query->where('idclientetipo', '=', $idclientetipo)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idclientetipo = $request->idclientetipo;
        $query->where('idclientetipo', '=', $idclientetipo)->delete();
    }

    public function searchByID( $query, $idclientetipo ) {
        $clientetipo = $query
            ->select( [
                'clientetipo.idclientetipo', 'clientetipo.codigo', 'clientetipo.descripcion',
                'clientetipo.abreviatura', 'clientetipo.imagen', 'clientetipo.extension',
                'clientetipo.estado', 'clientetipo.isdelete', 'clientetipo.fecha', 'clientetipo.hora'
            ] )
            ->where('clientetipo.idclientetipo', '=', $idclientetipo)
            ->whereNull('clientetipo.deleted_at')
            ->orderBy('clientetipo.idclientetipo', 'DESC')
            ->first();

        return $clientetipo;
    }
    
}
