<?php

namespace App\Models\Comercio\Venta;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ConceptoVenta extends Model
{
    use SoftDeletes;

    protected $table      = 'conceptoventa';
    protected $primaryKey = 'idconceptoventa';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'estado' => 'A',  'isdelete' => 'A',
        'codigo' => null, 'abreviatura' => null,
        'imagen' => null, 'extension' => null,
        'x_idusuario' => null,
    ];

    protected $fillable = [
        'codigo', 'descripcion', 'abreviatura', 'imagen', 'extension',
        'fecha', 'hora', 'estado', 'isdelete', 'x_idusuario',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'conceptoventa.idconceptoventa';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $conceptoventa = $query
            ->select( [
                'conceptoventa.idconceptoventa', 'conceptoventa.codigo', 'conceptoventa.descripcion',
                'conceptoventa.abreviatura', 'conceptoventa.imagen', 'conceptoventa.extension',
                'conceptoventa.estado', 'conceptoventa.isdelete', 'conceptoventa.fecha', 'conceptoventa.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('conceptoventa.idconceptoventa', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('conceptoventa.codigo', $islike, '%' . $search . '%')
                        ->orWhere('conceptoventa.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'conceptoventa.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $conceptoventa;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'conceptoventa.idconceptoventa';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $conceptoventa = $query
            ->select( [
                'conceptoventa.idconceptoventa', 'conceptoventa.codigo', 'conceptoventa.descripcion',
                'conceptoventa.abreviatura', 'conceptoventa.imagen', 'conceptoventa.extension',
                'conceptoventa.estado', 'conceptoventa.isdelete', 'conceptoventa.fecha', 'conceptoventa.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('conceptoventa.idconceptoventa', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('conceptoventa.codigo', $islike, '%' . $search . '%')
                        ->orWhere('conceptoventa.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'conceptoventa.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $conceptoventa;
    }

    public function existDescripcion( $query, $request ) {

        $idconceptoventa = isset( $request->idconceptoventa )  ? $request->idconceptoventa : null;
        $descripcion = isset( $request->descripcion )  ? $request->descripcion : null;

        $conceptoventa = $query
            ->where( function ( $query ) use ( $idconceptoventa, $descripcion ) {
                if ( !is_null( $idconceptoventa ) ) {
                    return $query->where('idconceptoventa', '<>', $idconceptoventa)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->whereNull('deleted_at')
            ->get();

        return ( sizeof( $conceptoventa ) > 0 );
    }

    public function newID( )
    {
        $conceptoventa = DB::table('conceptoventa')
            ->select('conceptoventa.idconceptoventa')
            ->orderBy('conceptoventa.idconceptoventa', 'DESC')
            ->first();

        return ( is_null( $conceptoventa ) ) ? 1 : intval( $conceptoventa->idconceptoventa ) + 1;
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

        $conceptoventa = $query->create( [
            'codigo'       => $codigo,
            'abreviatura'  => $abreviatura,
            'descripcion'  => $descripcion,
            'imagen'  => $imagen,
            'extension' => $extension,
            'fecha'     => $fecha,
            'hora'      => $hora
        ] );

        return $conceptoventa;
    }

    public function upgrade( $query, $request )
    {
        $idconceptoventa = isset( $request->idconceptoventa ) ? $request->idconceptoventa : null;
        $codigo         = isset( $request->codigo )         ? $request->codigo : null;
        $abreviatura    = isset( $request->abreviatura )    ? $request->abreviatura : null;
        $descripcion    = isset( $request->descripcion )    ? $request->descripcion : null;

        $imagen    = isset( $request->imagen )    ? $request->imagen : null;
        $extension = isset( $request->extension ) ? $request->extension : null;

        $conceptoventa = $query->where( 'idconceptoventa', '=', $idconceptoventa )
            ->update( [
                'codigo'       => $codigo,
                'abreviatura'  => $abreviatura,
                'descripcion'  => $descripcion,
                'imagen'  => $imagen,
                'extension'  => $extension,
            ] );

        return $conceptoventa;
    }

    public function show( $query, $idconceptoventa ) {

        $conceptoventa = $query
            ->select( [
                'conceptoventa.idconceptoventa', 'conceptoventa.codigo', 'conceptoventa.descripcion',
                'conceptoventa.abreviatura', 'conceptoventa.imagen', 'conceptoventa.extension',
                'conceptoventa.estado', 'conceptoventa.isdelete', 'conceptoventa.fecha', 'conceptoventa.hora'
            ] )
            ->where( 'conceptoventa.idconceptoventa', '=', $idconceptoventa )
            ->whereNull('conceptoventa.deleted_at')
            ->orderBy('conceptoventa.idconceptoventa', 'DESC')
            ->first();

        return $conceptoventa;
    }

    public function scopeEnable( $query, $request )
    {
        $idconceptoventa = $request->idconceptoventa;
        $query->where('idconceptoventa', '=', $idconceptoventa)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idconceptoventa = $request->idconceptoventa;
        $query->where('idconceptoventa', '=', $idconceptoventa)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idconceptoventa = $request->idconceptoventa;
        $query->where('idconceptoventa', '=', $idconceptoventa)->delete();
    }

    public function searchByID( $query, $idconceptoventa ) {
        $conceptoventa = $query
            ->select( [
                'conceptoventa.idconceptoventa', 'conceptoventa.codigo', 'conceptoventa.descripcion',
                'conceptoventa.abreviatura', 'conceptoventa.imagen', 'conceptoventa.extension',
                'conceptoventa.estado', 'conceptoventa.isdelete', 'conceptoventa.fecha', 'conceptoventa.hora'
            ] )
            ->where('conceptoventa.idconceptoventa', '=', $idconceptoventa)
            ->whereNull('conceptoventa.deleted_at')
            ->orderBy('conceptoventa.idconceptoventa', 'DESC')
            ->first();

        return $conceptoventa;
    }
}
