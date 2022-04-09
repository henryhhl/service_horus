<?php

namespace App\Models\Comercio\Venta;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ComisionVenta extends Model
{
    use SoftDeletes;

    protected $table      = 'comisionventa';
    protected $primaryKey = 'idcomisionventa';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'codigo' => null, 'valor' => 0,
        'imagen' => null, 'extension' => null,
        'x_idusuario' => null, 'estado' => 'A',  'isdelete' => 'A',
    ];

    protected $fillable = [
        'codigo', 'descripcion', 'valor', 'imagen', 'extension',
        'x_idusuario', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'comisionventa.idcomisionventa';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $comisionventa = $query->select( [
                'comisionventa.idcomisionventa', 'comisionventa.codigo', 'comisionventa.descripcion', 'comisionventa.valor',
                'comisionventa.imagen', 'comisionventa.extension',
                'comisionventa.isdelete', 'comisionventa.estado', 'comisionventa.fecha', 'comisionventa.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('comisionventa.idcomisionventa', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('comisionventa.codigo', $islike, '%' . $search . '%')
                        ->orWhere('comisionventa.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'comisionventa.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $comisionventa;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'comisionventa.idcomisionventa';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $comisionventa = $query->select( [
                'comisionventa.idcomisionventa', 'comisionventa.codigo', 'comisionventa.descripcion', 'comisionventa.valor',
                'comisionventa.imagen', 'comisionventa.extension',
                'comisionventa.isdelete', 'comisionventa.estado', 'comisionventa.fecha', 'comisionventa.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('comisionventa.idcomisionventa', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('comisionventa.codigo', $islike, '%' . $search . '%')
                        ->orWhere('comisionventa.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'comisionventa.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $comisionventa;
    }

    public function existDescripcion( $query, $request ) {

        $idcomisionventa = isset( $request->idcomisionventa ) ? $request->idcomisionventa : null;
        $descripcion     = isset( $request->descripcion )    ? $request->descripcion : null;

        $comisionventa = $query
            ->where( function ( $query ) use ( $idcomisionventa, $descripcion ) {
                if ( !is_null( $idcomisionventa ) ) {
                    return $query->where('idcomisionventa', '<>', $idcomisionventa)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->whereNull('deleted_at')
            ->get();

        return ( sizeof( $comisionventa ) > 0 );
    }

    public function newID( )
    {
        $comisionventa = DB::table('comisionventa')
            ->select('comisionventa.idcomisionventa')
            ->orderBy('comisionventa.idcomisionventa', 'DESC')
            ->first();

        return ( is_null( $comisionventa ) ) ? 1 : intval( $comisionventa->idcomisionventa ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo      = isset( $request->codigo ) ? $request->codigo : null;
        $descripcion = isset( $request->descripcion ) ? $request->descripcion : null;
        $valor       = isset( $request->valor ) ? $request->valor : null;
        $imagen      = isset( $request->imagen ) ? $request->imagen : null;
        $extension   = isset( $request->extension ) ? $request->extension : null;
        $x_idusuario = isset( $request->x_idusuario ) ? $request->x_idusuario : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $comisionventa = $query->create( [
            'codigo'      => $codigo,
            'descripcion' => $descripcion,
            'valor'       => $valor,
            'imagen'      => $imagen,
            'extension'   => $extension,
            'fecha'       => $fecha,
            'hora'        => $hora,
            'x_idusuario' => $x_idusuario,
        ] );

        return $comisionventa;
    }

    public function upgrade( $query, $request )
    {
        $idcomisionventa = isset( $request->idcomisionventa ) ? $request->idcomisionventa : null;
        $codigo      = isset( $request->codigo ) ? $request->codigo : null;
        $descripcion = isset( $request->descripcion ) ? $request->descripcion : null;
        $valor       = isset( $request->valor ) ? $request->valor : null;
        $imagen      = isset( $request->imagen ) ? $request->imagen : null;
        $extension   = isset( $request->extension ) ? $request->extension : null;

        $comisionventa = $query->where( 'idcomisionventa', '=', $idcomisionventa )
            ->update( [
                'codigo'      => $codigo,
                'descripcion' => $descripcion,
                'valor'       => $valor,
                'imagen'      => $imagen,
                'extension'   => $extension,
            ] );

        return $comisionventa;
    }

    public function scopeEnable( $query, $request )
    {
        $idcomisionventa = $request->idcomisionventa;
        $query->where('idcomisionventa', '=', $idcomisionventa)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idcomisionventa = $request->idcomisionventa;
        $query->where('idcomisionventa', '=', $idcomisionventa)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idcomisionventa = $request->idcomisionventa;
        $query->where('idcomisionventa', '=', $idcomisionventa)->delete();
    }

    public function searchByID( $query, $idcomisionventa ) {

        $comisionventa = $query
            ->select( [
                'comisionventa.idcomisionventa', 'comisionventa.codigo', 'comisionventa.descripcion', 'comisionventa.valor',
                'comisionventa.imagen', 'comisionventa.extension',
                'comisionventa.isdelete', 'comisionventa.estado', 'comisionventa.fecha', 'comisionventa.hora'
            ] )
            ->where('comisionventa.idcomisionventa', '=', $idcomisionventa)
            ->whereNull('comisionventa.deleted_at')
            ->orderBy('comisionventa.idcomisionventa', 'DESC')
            ->first();

        return $comisionventa;
    }

    public function show( $query, $idcomisionventa ) {

        $comisionventa = $query
            ->select( [
                'comisionventa.idcomisionventa', 'comisionventa.codigo', 'comisionventa.descripcion', 'comisionventa.valor',
                'comisionventa.imagen', 'comisionventa.extension',
                'comisionventa.isdelete', 'comisionventa.estado', 'comisionventa.fecha', 'comisionventa.hora'
            ] )
            ->where( 'comisionventa.idcomisionventa', '=', $idcomisionventa )
            ->whereNull('comisionventa.deleted_at')
            ->orderBy('comisionventa.idcomisionventa', 'DESC')
            ->first();

        return $comisionventa;
    }
}
