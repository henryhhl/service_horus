<?php

namespace App\Models\Configuracion;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Moneda extends Model
{
    use SoftDeletes;

    protected $table      = 'moneda';
    protected $primaryKey = 'idmoneda';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A', 'isdelete' => 'A', 'imagen' => null, 'extension' => null, 
    ];

    protected $fillable = [ 
        'descripcion', 'abreviatura', 'imagen', 'extension',
        'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'ASC';
        $column  = 'moneda.idmoneda';

        if ( strtoupper( $orderBy ) != 'DESC' ) $orderBy = 'ASC';

        $islike =  Functions::isLikeAndIlike();

        $moneda = $query
            ->select( [
                'moneda.idmoneda', 'moneda.abreviatura', 'moneda.descripcion',
                'moneda.estado', 'moneda.isdelete', 'moneda.fecha', 'moneda.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('moneda.idmoneda', '=', $search)
                        ->orWhere('moneda.abreviatura', $islike, '%' . $search . '%')
                        ->orWhere('moneda.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('moneda.abreviatura', $islike, '%' . $search . '%')
                        ->orWhere('moneda.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'moneda.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $moneda;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'moneda.idmoneda';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $moneda = $query
            ->select( [
                'moneda.idmoneda', 'moneda.abreviatura', 'moneda.descripcion',
                'moneda.estado', 'moneda.isdelete', 'moneda.fecha', 'moneda.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('moneda.idmoneda', '=', $search)
                        ->orWhere('moneda.abreviatura', $islike, '%' . $search . '%')
                        ->orWhere('moneda.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('moneda.abreviatura', $islike, '%' . $search . '%')
                        ->orWhere('moneda.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'moneda.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $moneda;
    }
    
}
