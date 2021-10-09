<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ConceptoInventario extends Model
{
    use SoftDeletes;

    protected $table      = 'conceptoinventario';
    protected $primaryKey = 'idconceptoinventario';
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
        $column  = 'conceptoinventario.idconceptoinventario';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $conceptoinventario = $query
            ->select( [
                'conceptoinventario.idconceptoinventario', 'conceptoinventario.codigo', 'conceptoinventario.descripcion',
                'conceptoinventario.estado', 'conceptoinventario.fecha', 'conceptoinventario.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('conceptoinventario.idconceptoinventario', '=', $search)
                        ->orWhere('conceptoinventario.codigo', $islike, '%' . $search . '%')
                        ->orWhere('conceptoinventario.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('conceptoinventario.codigo', $islike, '%' . $search . '%')
                        ->orWhere('conceptoinventario.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'conceptoinventario.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $conceptoinventario;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'conceptoinventario.idconceptoinventario';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $conceptoinventario = $query
            ->select( [
                'conceptoinventario.idconceptoinventario', 'conceptoinventario.codigo', 'conceptoinventario.descripcion',
                'conceptoinventario.estado', 'conceptoinventario.fecha', 'conceptoinventario.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('conceptoinventario.idconceptoinventario', '=', $search)
                        ->orWhere('conceptoinventario.codigo', $islike, '%' . $search . '%')
                        ->orWhere('conceptoinventario.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('conceptoinventario.codigo', $islike, '%' . $search . '%')
                        ->orWhere('conceptoinventario.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'conceptoinventario.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $conceptoinventario;
    }

    public function existDescripcion( $query, $request ) {

        $idconceptoinventario = isset( $request->idconceptoinventario )    ? $request->idconceptoinventario : null;
        $descripcion = isset( $request->descripcion )  ? $request->descripcion : null;

        $conceptoinventario = $query
            ->where( function ( $query ) use ( $idconceptoinventario, $descripcion ) {
                if ( !is_null( $idconceptoinventario ) ) {
                    return $query->where('idconceptoinventario', '<>', $idconceptoinventario)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->whereNull('deleted_at')
            ->get();
        
        return ( sizeof( $conceptoinventario ) > 0 );
    }

    public function newID( )
    {
        $conceptoinventario = DB::table('conceptoinventario')
            ->select('conceptoinventario.idconceptoinventario')
            ->orderBy('conceptoinventario.idconceptoinventario', 'DESC')
            ->first();

        return ( is_null( $conceptoinventario ) ) ? 1 : intval( $conceptoinventario->idconceptoinventario ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo       = isset( $request->codigo )      ? $request->codigo : null;
        $descripcion  = isset( $request->descripcion ) ? $request->descripcion : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $conceptoinventario = $query->create( [
            'codigo'       => $codigo,
            'descripcion'  => $descripcion,
            'fecha'        => $fecha,
            'hora'         => $hora
        ] );

        return $conceptoinventario;
    }

    public function upgrade( $query, $request )
    {
        $idconceptoinventario      = isset( $request->idconceptoinventario ) ? $request->idconceptoinventario : null;
        $codigo         = isset( $request->codigo )         ? $request->codigo : null;
        $descripcion    = isset( $request->descripcion )    ? $request->descripcion : null;

        $conceptoinventario = $query->where( 'idconceptoinventario', '=', $idconceptoinventario )
            ->update( [
                'codigo'       => $codigo,
                'descripcion'  => $descripcion,
            ] );

        return $conceptoinventario;
    }

    public function show( $query, $idconceptoinventario ) {

        $conceptoinventario = $query
            ->select( [
                'conceptoinventario.idconceptoinventario', 'conceptoinventario.codigo', 'conceptoinventario.descripcion',
                'conceptoinventario.estado', 'conceptoinventario.fecha', 'conceptoinventario.hora'
            ] )
            ->where( 'conceptoinventario.idconceptoinventario', '=', $idconceptoinventario )
            ->whereNull('conceptoinventario.deleted_at')
            ->orderBy('conceptoinventario.idconceptoinventario', 'DESC')
            ->first();
        
        return $conceptoinventario;
    }

    public function scopeEnable( $query, $request )
    {
        $idconceptoinventario = $request->idconceptoinventario;
        $query->where('idconceptoinventario', '=', $idconceptoinventario)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idconceptoinventario = $request->idconceptoinventario;
        $query->where('idconceptoinventario', '=', $idconceptoinventario)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idconceptoinventario = $request->idconceptoinventario;
        $query->where('idconceptoinventario', '=', $idconceptoinventario)->delete();
    }

    public function searchByID( $query, $idconceptoinventario ) {
        $conceptoinventario = $query
            ->select( [
                'conceptoinventario.idconceptoinventario', 'conceptoinventario.codigo', 'conceptoinventario.descripcion',
                'conceptoinventario.estado', 'conceptoinventario.fecha', 'conceptoinventario.hora'
            ] )
            ->where('conceptoinventario.idconceptoinventario', '=', $idconceptoinventario)
            ->whereNull('conceptoinventario.deleted_at')
            ->orderBy('conceptoinventario.idconceptoinventario', 'DESC')
            ->first();

        return $conceptoinventario;
    }
    
}
