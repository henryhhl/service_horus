<?php

namespace App\Models\Comercio\Compra;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ConceptoCompra extends Model
{
    use SoftDeletes;

    protected $table      = 'conceptocompra';
    protected $primaryKey = 'idconceptocompra';
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

    public function arraynotacompra() {
        return $this->hasMany(
            'App\Models\Comercio\Compra\NotaCompra',
            'fkidconceptocompra',
            'idconceptocompra'
        );
    }

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'ASC';
        $column  = 'conceptocompra.idconceptocompra';

        if ( strtoupper( $orderBy ) != 'DESC' ) $orderBy = 'ASC';

        $islike =  Functions::isLikeAndIlike();

        $conceptocompra = $query
            ->select( [
                'conceptocompra.idconceptocompra', 'conceptocompra.codigo', 'conceptocompra.descripcion',
                'conceptocompra.estado', 'conceptocompra.fecha', 'conceptocompra.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('conceptocompra.idconceptocompra', '=', $search)
                        ->orWhere('conceptocompra.codigo', $islike, '%' . $search . '%')
                        ->orWhere('conceptocompra.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('conceptocompra.codigo', $islike, '%' . $search . '%')
                        ->orWhere('conceptocompra.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'conceptocompra.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $conceptocompra;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'conceptocompra.idconceptocompra';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $conceptocompra = $query
            ->select( [
                'conceptocompra.idconceptocompra', 'conceptocompra.codigo', 'conceptocompra.descripcion',
                'conceptocompra.estado', 'conceptocompra.fecha', 'conceptocompra.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('conceptocompra.idconceptocompra', '=', $search)
                        ->orWhere('conceptocompra.codigo', $islike, '%' . $search . '%')
                        ->orWhere('conceptocompra.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('conceptocompra.codigo', $islike, '%' . $search . '%')
                        ->orWhere('conceptocompra.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'conceptocompra.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $conceptocompra;
    }

    public function existDescripcion( $query, $request ) {

        $idconceptocompra = isset( $request->idconceptocompra )    ? $request->idconceptocompra : null;
        $descripcion = isset( $request->descripcion )  ? $request->descripcion : null;

        $conceptocompra = $query
            ->where( function ( $query ) use ( $idconceptocompra, $descripcion ) {
                if ( !is_null( $idconceptocompra ) ) {
                    return $query->where('idconceptocompra', '<>', $idconceptocompra)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->whereNull('deleted_at')
            ->get();

        return ( sizeof( $conceptocompra ) > 0 );
    }

    public function newID( )
    {
        $conceptocompra = DB::table('conceptocompra')
            ->select('conceptocompra.idconceptocompra')
            ->orderBy('conceptocompra.idconceptocompra', 'DESC')
            ->first();

        return ( is_null( $conceptocompra ) ) ? 1 : intval( $conceptocompra->idconceptocompra ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo       = isset( $request->codigo )      ? $request->codigo : null;
        $descripcion  = isset( $request->descripcion ) ? $request->descripcion : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $conceptocompra = $query->create( [
            'codigo'       => $codigo,
            'descripcion'  => $descripcion,
            'fecha'        => $fecha,
            'hora'         => $hora
        ] );

        return $conceptocompra;
    }

    public function upgrade( $query, $request )
    {
        $idconceptocompra = isset( $request->idconceptocompra ) ? $request->idconceptocompra : null;
        $codigo         = isset( $request->codigo )         ? $request->codigo : null;
        $descripcion    = isset( $request->descripcion )    ? $request->descripcion : null;

        $conceptocompra = $query->where( 'idconceptocompra', '=', $idconceptocompra )
            ->update( [
                'codigo'       => $codigo,
                'descripcion'  => $descripcion,
            ] );

        return $conceptocompra;
    }

    public function show( $query, $idconceptocompra ) {

        $conceptocompra = $query
            ->select( [
                'conceptocompra.idconceptocompra', 'conceptocompra.codigo', 'conceptocompra.descripcion',
                'conceptocompra.estado', 'conceptocompra.fecha', 'conceptocompra.hora'
            ] )
            ->where( 'conceptocompra.idconceptocompra', '=', $idconceptocompra )
            ->whereNull('conceptocompra.deleted_at')
            ->orderBy('conceptocompra.idconceptocompra', 'DESC')
            ->first();

        return $conceptocompra;
    }

    public function scopeEnable( $query, $request )
    {
        $idconceptocompra = $request->idconceptocompra;
        $query->where('idconceptocompra', '=', $idconceptocompra)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idconceptocompra = $request->idconceptocompra;
        $query->where('idconceptocompra', '=', $idconceptocompra)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idconceptocompra = $request->idconceptocompra;
        $query->where('idconceptocompra', '=', $idconceptocompra)->delete();
    }

    public function searchByID( $query, $idconceptocompra ) {
        $conceptocompra = $query
            ->select( [
                'conceptocompra.idconceptocompra', 'conceptocompra.codigo', 'conceptocompra.descripcion',
                'conceptocompra.estado', 'conceptocompra.fecha', 'conceptocompra.hora'
            ] )
            ->where('conceptocompra.idconceptocompra', '=', $idconceptocompra)
            ->whereNull('conceptocompra.deleted_at')
            ->orderBy('conceptocompra.idconceptocompra', 'DESC')
            ->first();

        return $conceptocompra;
    }

}
