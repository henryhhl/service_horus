<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class SeccionInventario extends Model
{
    use SoftDeletes;

    protected $table      = 'seccioninventario';
    protected $primaryKey = 'idseccioninventario';
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
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'ASC';
        $column  = 'seccioninventario.idseccioninventario';

        if ( strtoupper( $orderBy ) != 'DESC' ) $orderBy = 'ASC';

        $islike =  Functions::isLikeAndIlike();

        $seccioninventario = $query
            ->select( [
                'seccioninventario.idseccioninventario', 'seccioninventario.codigo', 'seccioninventario.descripcion',
                'seccioninventario.estado', 'seccioninventario.fecha', 'seccioninventario.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('seccioninventario.idseccioninventario', '=', $search)
                        ->orWhere('seccioninventario.codigo', $islike, '%' . $search . '%')
                        ->orWhere('seccioninventario.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('seccioninventario.codigo', $islike, '%' . $search . '%')
                        ->orWhere('seccioninventario.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'seccioninventario.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $seccioninventario;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'seccioninventario.idseccioninventario';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $seccioninventario = $query
            ->select( [
                'seccioninventario.idseccioninventario', 'seccioninventario.codigo', 'seccioninventario.descripcion',
                'seccioninventario.estado', 'seccioninventario.fecha', 'seccioninventario.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('seccioninventario.idseccioninventario', '=', $search)
                        ->orWhere('seccioninventario.codigo', $islike, '%' . $search . '%')
                        ->orWhere('seccioninventario.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('seccioninventario.codigo', $islike, '%' . $search . '%')
                        ->orWhere('seccioninventario.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'seccioninventario.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $seccioninventario;
    }

    public function existDescripcion( $query, $request ) {

        $idseccioninventario = isset( $request->idseccioninventario )    ? $request->idseccioninventario : null;
        $descripcion = isset( $request->descripcion )  ? $request->descripcion : null;

        $seccioninventario = $query
            ->where( function ( $query ) use ( $idseccioninventario, $descripcion ) {
                if ( !is_null( $idseccioninventario ) ) {
                    return $query->where('idseccioninventario', '<>', $idseccioninventario)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->whereNull('deleted_at')
            ->get();

        return ( sizeof( $seccioninventario ) > 0 );
    }

    public function newID( )
    {
        $seccioninventario = DB::table('seccioninventario')
            ->select('seccioninventario.idseccioninventario')
            ->orderBy('seccioninventario.idseccioninventario', 'DESC')
            ->first();

        return ( is_null( $seccioninventario ) ) ? 1 : intval( $seccioninventario->idseccioninventario ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo       = isset( $request->codigo )      ? $request->codigo : null;
        $descripcion  = isset( $request->descripcion ) ? $request->descripcion : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $seccioninventario = $query->create( [
            'codigo'       => $codigo,
            'descripcion'  => $descripcion,
            'fecha'        => $fecha,
            'hora'         => $hora
        ] );

        return $seccioninventario;
    }

    public function upgrade( $query, $request )
    {
        $idseccioninventario = isset( $request->idseccioninventario ) ? $request->idseccioninventario : null;
        $codigo         = isset( $request->codigo )         ? $request->codigo : null;
        $descripcion    = isset( $request->descripcion )    ? $request->descripcion : null;

        $seccioninventario = $query->where( 'idseccioninventario', '=', $idseccioninventario )
            ->update( [
                'codigo'       => $codigo,
                'descripcion'  => $descripcion,
            ] );

        return $seccioninventario;
    }

    public function show( $query, $idseccioninventario ) {

        $seccioninventario = $query
            ->select( [
                'seccioninventario.idseccioninventario', 'seccioninventario.codigo', 'seccioninventario.descripcion',
                'seccioninventario.estado', 'seccioninventario.fecha', 'seccioninventario.hora'
            ] )
            ->where( 'seccioninventario.idseccioninventario', '=', $idseccioninventario )
            ->whereNull('seccioninventario.deleted_at')
            ->orderBy('seccioninventario.idseccioninventario', 'DESC')
            ->first();

        return $seccioninventario;
    }

    public function scopeEnable( $query, $request )
    {
        $idseccioninventario = $request->idseccioninventario;
        $query->where('idseccioninventario', '=', $idseccioninventario)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idseccioninventario = $request->idseccioninventario;
        $query->where('idseccioninventario', '=', $idseccioninventario)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idseccioninventario = $request->idseccioninventario;
        $query->where('idseccioninventario', '=', $idseccioninventario)->delete();
    }

    public function searchByID( $query, $idseccioninventario ) {
        $seccioninventario = $query
            ->select( [
                'seccioninventario.idseccioninventario', 'seccioninventario.codigo', 'seccioninventario.descripcion',
                'seccioninventario.estado', 'seccioninventario.fecha', 'seccioninventario.hora'
            ] )
            ->where('seccioninventario.idseccioninventario', '=', $idseccioninventario)
            ->whereNull('seccioninventario.deleted_at')
            ->orderBy('seccioninventario.idseccioninventario', 'DESC')
            ->first();

        return $seccioninventario;
    }

}
