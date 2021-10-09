<?php

namespace App\Models\Comercio\Compra;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ProveedorGrupo extends Model
{
    use SoftDeletes;

    protected $table      = 'proveedorgrupo';
    protected $primaryKey = 'idproveedorgrupo';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A', 'codigo' => null,
    ];

    protected $fillable = [ 
        'codigo', 'descripcion',
        'estado', 'fecha', 'hora',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'proveedorgrupo.idproveedorgrupo';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $proveedorgrupo = $query
            ->select( [
                'proveedorgrupo.idproveedorgrupo', 'proveedorgrupo.codigo', 'proveedorgrupo.descripcion',
                'proveedorgrupo.estado', 'proveedorgrupo.fecha', 'proveedorgrupo.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('proveedorgrupo.idproveedorgrupo', '=', $search)
                        ->orWhere('proveedorgrupo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('proveedorgrupo.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('proveedorgrupo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('proveedorgrupo.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'proveedorgrupo.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $proveedorgrupo;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'proveedorgrupo.idproveedorgrupo';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $proveedorgrupo = $query
            ->select( [
                'proveedorgrupo.idproveedorgrupo', 'proveedorgrupo.codigo', 'proveedorgrupo.descripcion',
                'proveedorgrupo.estado', 'proveedorgrupo.fecha', 'proveedorgrupo.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('proveedorgrupo.idproveedorgrupo', '=', $search)
                        ->orWhere('proveedorgrupo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('proveedorgrupo.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('proveedorgrupo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('proveedorgrupo.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'proveedorgrupo.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $proveedorgrupo;
    }

    public function existDescripcion( $query, $request ) {

        $idproveedorgrupo = isset( $request->idproveedorgrupo )    ? $request->idproveedorgrupo : null;
        $descripcion = isset( $request->descripcion )  ? $request->descripcion : null;

        $proveedorgrupo = $query
            ->where( function ( $query ) use ( $idproveedorgrupo, $descripcion ) {
                if ( !is_null( $idproveedorgrupo ) ) {
                    return $query->where('idproveedorgrupo', '<>', $idproveedorgrupo)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->whereNull('deleted_at')
            ->get();
        
        return ( sizeof( $proveedorgrupo ) > 0 );
    }

    public function newID( )
    {
        $proveedorgrupo = DB::table('proveedorgrupo')
            ->select('proveedorgrupo.idproveedorgrupo')
            ->orderBy('proveedorgrupo.idproveedorgrupo', 'DESC')
            ->first();

        return ( is_null( $proveedorgrupo ) ) ? 1 : intval( $proveedorgrupo->idproveedorgrupo ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo       = isset( $request->codigo )      ? $request->codigo : null;
        $descripcion  = isset( $request->descripcion ) ? $request->descripcion : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $proveedorgrupo = $query->create( [
            'codigo'       => $codigo,
            'descripcion'  => $descripcion,
            'fecha'        => $fecha,
            'hora'         => $hora
        ] );

        return $proveedorgrupo;
    }

    public function upgrade( $query, $request )
    {
        $idproveedorgrupo = isset( $request->idproveedorgrupo ) ? $request->idproveedorgrupo : null;
        $codigo         = isset( $request->codigo )         ? $request->codigo : null;
        $descripcion    = isset( $request->descripcion )    ? $request->descripcion : null;

        $proveedorgrupo = $query->where( 'idproveedorgrupo', '=', $idproveedorgrupo )
            ->update( [
                'codigo'       => $codigo,
                'descripcion'  => $descripcion,
            ] );

        return $proveedorgrupo;
    }

    public function show( $query, $idproveedorgrupo ) {

        $proveedorgrupo = $query
            ->select( [
                'proveedorgrupo.idproveedorgrupo', 'proveedorgrupo.codigo', 'proveedorgrupo.descripcion',
                'proveedorgrupo.estado', 'proveedorgrupo.fecha', 'proveedorgrupo.hora'
            ] )
            ->where( 'proveedorgrupo.idproveedorgrupo', '=', $idproveedorgrupo )
            ->whereNull('proveedorgrupo.deleted_at')
            ->orderBy('proveedorgrupo.idproveedorgrupo', 'DESC')
            ->first();
        
        return $proveedorgrupo;
    }

    public function scopeEnable( $query, $request )
    {
        $idproveedorgrupo = $request->idproveedorgrupo;
        $query->where('idproveedorgrupo', '=', $idproveedorgrupo)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idproveedorgrupo = $request->idproveedorgrupo;
        $query->where('idproveedorgrupo', '=', $idproveedorgrupo)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idproveedorgrupo = $request->idproveedorgrupo;
        $query->where('idproveedorgrupo', '=', $idproveedorgrupo)->delete();
    }

    public function searchByID( $query, $idproveedorgrupo ) {
        $proveedorgrupo = $query
            ->select( [
                'proveedorgrupo.idproveedorgrupo', 'proveedorgrupo.codigo', 'proveedorgrupo.descripcion',
                'proveedorgrupo.estado', 'proveedorgrupo.fecha', 'proveedorgrupo.hora'
            ] )
            ->where('proveedorgrupo.idproveedorgrupo', '=', $idproveedorgrupo)
            ->whereNull('proveedorgrupo.deleted_at')
            ->orderBy('proveedorgrupo.idproveedorgrupo', 'DESC')
            ->first();

        return $proveedorgrupo;
    }
    
}
