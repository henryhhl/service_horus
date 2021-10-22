<?php

namespace App\Models\Comercio\Compra;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ProveedorTipo extends Model
{
    use SoftDeletes;

    protected $table      = 'proveedortipo';
    protected $primaryKey = 'idproveedortipo';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A', 'isdelete' => 'A', 'codigo' => null,
    ];

    protected $fillable = [ 
        'codigo', 'descripcion',
        'estado', 'isdelete', 'fecha', 'hora',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'proveedortipo.idproveedortipo';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $proveedortipo = $query
            ->select( [
                'proveedortipo.idproveedortipo', 'proveedortipo.codigo', 'proveedortipo.descripcion',
                'proveedortipo.estado', 'proveedortipo.fecha', 'proveedortipo.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('proveedortipo.idproveedortipo', '=', $search)
                        ->orWhere('proveedortipo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('proveedortipo.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('proveedortipo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('proveedortipo.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'proveedortipo.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $proveedortipo;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'proveedortipo.idproveedortipo';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $proveedortipo = $query
            ->select( [
                'proveedortipo.idproveedortipo', 'proveedortipo.codigo', 'proveedortipo.descripcion',
                'proveedortipo.estado', 'proveedortipo.fecha', 'proveedortipo.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('proveedortipo.idproveedortipo', '=', $search)
                        ->orWhere('proveedortipo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('proveedortipo.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('proveedortipo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('proveedortipo.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'proveedortipo.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $proveedortipo;
    }

    public function existDescripcion( $query, $request ) {

        $idproveedortipo = isset( $request->idproveedortipo )    ? $request->idproveedortipo : null;
        $descripcion = isset( $request->descripcion )  ? $request->descripcion : null;

        $proveedortipo = $query
            ->where( function ( $query ) use ( $idproveedortipo, $descripcion ) {
                if ( !is_null( $idproveedortipo ) ) {
                    return $query->where('idproveedortipo', '<>', $idproveedortipo)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->whereNull('deleted_at')
            ->get();
        
        return ( sizeof( $proveedortipo ) > 0 );
    }

    public function newID( )
    {
        $proveedortipo = DB::table('proveedortipo')
            ->select('proveedortipo.idproveedortipo')
            ->orderBy('proveedortipo.idproveedortipo', 'DESC')
            ->first();

        return ( is_null( $proveedortipo ) ) ? 1 : intval( $proveedortipo->idproveedortipo ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo       = isset( $request->codigo )      ? $request->codigo : null;
        $descripcion  = isset( $request->descripcion ) ? $request->descripcion : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $proveedortipo = $query->create( [
            'codigo'       => $codigo,
            'descripcion'  => $descripcion,
            'fecha'        => $fecha,
            'hora'         => $hora
        ] );

        return $proveedortipo;
    }

    public function upgrade( $query, $request )
    {
        $idproveedortipo      = isset( $request->idproveedortipo ) ? $request->idproveedortipo : null;
        $codigo         = isset( $request->codigo )         ? $request->codigo : null;
        $descripcion    = isset( $request->descripcion )    ? $request->descripcion : null;

        $proveedortipo = $query->where( 'idproveedortipo', '=', $idproveedortipo )
            ->update( [
                'codigo'       => $codigo,
                'descripcion'  => $descripcion,
            ] );

        return $proveedortipo;
    }

    public function show( $query, $idproveedortipo ) {

        $proveedortipo = $query
            ->select( [
                'proveedortipo.idproveedortipo', 'proveedortipo.codigo', 'proveedortipo.descripcion',
                'proveedortipo.estado', 'proveedortipo.fecha', 'proveedortipo.hora'
            ] )
            ->where( 'proveedortipo.idproveedortipo', '=', $idproveedortipo )
            ->whereNull('proveedortipo.deleted_at')
            ->orderBy('proveedortipo.idproveedortipo', 'DESC')
            ->first();
        
        return $proveedortipo;
    }

    public function scopeEnable( $query, $request )
    {
        $idproveedortipo = $request->idproveedortipo;
        $query->where('idproveedortipo', '=', $idproveedortipo)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idproveedortipo = $request->idproveedortipo;
        $query->where('idproveedortipo', '=', $idproveedortipo)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idproveedortipo = $request->idproveedortipo;
        $query->where('idproveedortipo', '=', $idproveedortipo)->delete();
    }

    public function searchByID( $query, $idproveedortipo ) {
        $proveedortipo = $query
            ->select( [
                'proveedortipo.idproveedortipo', 'proveedortipo.codigo', 'proveedortipo.descripcion',
                'proveedortipo.estado', 'proveedortipo.fecha', 'proveedortipo.hora'
            ] )
            ->where('proveedortipo.idproveedortipo', '=', $idproveedortipo)
            ->whereNull('proveedortipo.deleted_at')
            ->orderBy('proveedortipo.idproveedortipo', 'DESC')
            ->first();

        return $proveedortipo;
    }
    
}
