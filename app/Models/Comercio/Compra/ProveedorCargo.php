<?php

namespace App\Models\Comercio\Compra;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ProveedorCargo extends Model
{
    use SoftDeletes;

    protected $table      = 'proveedorcargo';
    protected $primaryKey = 'idproveedorcargo';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A', 'isdelete' => 'A',
        'codigo' => null, 'abreviatura' => null, 'imagen' => null, 'extension' => null,
    ];

    protected $fillable = [ 
        'codigo', 'abreviatura', 'descripcion', 'imagen', 'extension',
        'estado', 'isdelete', 'fecha', 'hora',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'proveedorcargo.idproveedorcargo';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $proveedorcargo = $query
            ->select( [
                'proveedorcargo.idproveedorcargo', 'proveedorcargo.codigo', 'proveedorcargo.descripcion',
                'proveedorcargo.abreviatura', 'proveedorcargo.imagen', 'proveedorcargo.extension',
                'proveedorcargo.estado', 'proveedorcargo.isdelete', 'proveedorcargo.fecha', 'proveedorcargo.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('proveedorcargo.idproveedorcargo', '=', $search)
                        ->orWhere('proveedorcargo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('proveedorcargo.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('proveedorcargo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('proveedorcargo.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'proveedorcargo.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $proveedorcargo;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'proveedorcargo.idproveedorcargo';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $proveedorcargo = $query
            ->select( [
                'proveedorcargo.idproveedorcargo', 'proveedorcargo.codigo', 'proveedorcargo.descripcion',
                'proveedorcargo.abreviatura', 'proveedorcargo.imagen', 'proveedorcargo.extension',
                'proveedorcargo.estado', 'proveedorcargo.isdelete', 'proveedorcargo.fecha', 'proveedorcargo.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('proveedorcargo.idproveedorcargo', '=', $search)
                        ->orWhere('proveedorcargo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('proveedorcargo.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('proveedorcargo.codigo', $islike, '%' . $search . '%')
                        ->orWhere('proveedorcargo.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'proveedorcargo.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $proveedorcargo;
    }

    public function existDescripcion( $query, $request ) {

        $idproveedorcargo = isset( $request->idproveedorcargo )    ? $request->idproveedorcargo : null;
        $descripcion = isset( $request->descripcion )  ? $request->descripcion : null;

        $proveedorcargo = $query
            ->where( function ( $query ) use ( $idproveedorcargo, $descripcion ) {
                if ( !is_null( $idproveedorcargo ) ) {
                    return $query->where('idproveedorcargo', '<>', $idproveedorcargo)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->whereNull('deleted_at')
            ->get();
        
        return ( sizeof( $proveedorcargo ) > 0 );
    }

    public function newID( )
    {
        $proveedorcargo = DB::table('proveedorcargo')
            ->select('proveedorcargo.idproveedorcargo')
            ->orderBy('proveedorcargo.idproveedorcargo', 'DESC')
            ->first();

        return ( is_null( $proveedorcargo ) ) ? 1 : intval( $proveedorcargo->idproveedorcargo ) + 1;
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

        $proveedorcargo = $query->create( [
            'codigo'       => $codigo,
            'abreviatura'  => $abreviatura,
            'descripcion'  => $descripcion,
            'imagen'  => $imagen,
            'extension' => $extension,
            'fecha'     => $fecha,
            'hora'      => $hora
        ] );

        return $proveedorcargo;
    }

    public function upgrade( $query, $request )
    {
        $idproveedorcargo = isset( $request->idproveedorcargo ) ? $request->idproveedorcargo : null;
        $codigo         = isset( $request->codigo )         ? $request->codigo : null;
        $abreviatura    = isset( $request->abreviatura )    ? $request->abreviatura : null;
        $descripcion    = isset( $request->descripcion )    ? $request->descripcion : null;

        $imagen    = isset( $request->imagen )    ? $request->imagen : null;
        $extension = isset( $request->extension ) ? $request->extension : null;

        $proveedorcargo = $query->where( 'idproveedorcargo', '=', $idproveedorcargo )
            ->update( [
                'codigo'       => $codigo,
                'abreviatura'  => $abreviatura,
                'descripcion'  => $descripcion,
                'imagen'  => $imagen,
                'extension'  => $extension,
            ] );

        return $proveedorcargo;
    }

    public function show( $query, $idproveedorcargo ) {

        $proveedorcargo = $query
            ->select( [
                'proveedorcargo.idproveedorcargo', 'proveedorcargo.codigo', 'proveedorcargo.descripcion',
                'proveedorcargo.abreviatura', 'proveedorcargo.imagen', 'proveedorcargo.extension',
                'proveedorcargo.estado', 'proveedorcargo.isdelete', 'proveedorcargo.fecha', 'proveedorcargo.hora'
            ] )
            ->where( 'proveedorcargo.idproveedorcargo', '=', $idproveedorcargo )
            ->whereNull('proveedorcargo.deleted_at')
            ->orderBy('proveedorcargo.idproveedorcargo', 'DESC')
            ->first();
        
        return $proveedorcargo;
    }

    public function scopeEnable( $query, $request )
    {
        $idproveedorcargo = $request->idproveedorcargo;
        $query->where('idproveedorcargo', '=', $idproveedorcargo)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idproveedorcargo = $request->idproveedorcargo;
        $query->where('idproveedorcargo', '=', $idproveedorcargo)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idproveedorcargo = $request->idproveedorcargo;
        $query->where('idproveedorcargo', '=', $idproveedorcargo)->delete();
    }

    public function searchByID( $query, $idproveedorcargo ) {
        $proveedorcargo = $query
            ->select( [
                'proveedorcargo.idproveedorcargo', 'proveedorcargo.codigo', 'proveedorcargo.descripcion',
                'proveedorcargo.abreviatura', 'proveedorcargo.imagen', 'proveedorcargo.extension',
                'proveedorcargo.estado', 'proveedorcargo.isdelete', 'proveedorcargo.fecha', 'proveedorcargo.hora'
            ] )
            ->where('proveedorcargo.idproveedorcargo', '=', $idproveedorcargo)
            ->whereNull('proveedorcargo.deleted_at')
            ->orderBy('proveedorcargo.idproveedorcargo', 'DESC')
            ->first();

        return $proveedorcargo;
    }
    
}
