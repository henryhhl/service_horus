<?php

namespace App\Models\Comercio\Venta;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ActividadEconomica extends Model
{
    use SoftDeletes;

    protected $table      = 'actividadeconomica';
    protected $primaryKey = 'idactividadeconomica';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'estado' => 'A',  'isdelete' => 'A',
        'codigo' => null, 'abreviatura' => null,
        'imagen' => null, 'extension' => null, 'x_idusuario' => null,
    ];

    protected $fillable = [
        'codigo', 'descripcion', 'abreviatura', 'imagen', 'extension',
        'fecha', 'hora', 'estado', 'isdelete', 'x_idusuario',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'actividadeconomica.idactividadeconomica';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $actividadeconomica = $query
            ->select( [
                'actividadeconomica.idactividadeconomica', 'actividadeconomica.codigo', 'actividadeconomica.descripcion',
                'actividadeconomica.abreviatura', 'actividadeconomica.imagen', 'actividadeconomica.extension',
                'actividadeconomica.estado', 'actividadeconomica.isdelete', 'actividadeconomica.fecha', 'actividadeconomica.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('actividadeconomica.idactividadeconomica', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('actividadeconomica.codigo', $islike, '%' . $search . '%')
                        ->orWhere('actividadeconomica.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'actividadeconomica.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $actividadeconomica;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'actividadeconomica.idactividadeconomica';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $actividadeconomica = $query
            ->select( [
                'actividadeconomica.idactividadeconomica', 'actividadeconomica.codigo', 'actividadeconomica.descripcion',
                'actividadeconomica.abreviatura', 'actividadeconomica.imagen', 'actividadeconomica.extension',
                'actividadeconomica.estado', 'actividadeconomica.isdelete', 'actividadeconomica.fecha', 'actividadeconomica.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('actividadeconomica.idactividadeconomica', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('actividadeconomica.codigo', $islike, '%' . $search . '%')
                        ->orWhere('actividadeconomica.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'actividadeconomica.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $actividadeconomica;
    }

    public function existDescripcion( $query, $request ) {

        $idactividadeconomica = isset( $request->idactividadeconomica )  ? $request->idactividadeconomica : null;
        $descripcion = isset( $request->descripcion )  ? $request->descripcion : null;

        $actividadeconomica = $query
            ->where( function ( $query ) use ( $idactividadeconomica, $descripcion ) {
                if ( !is_null( $idactividadeconomica ) ) {
                    return $query->where('idactividadeconomica', '<>', $idactividadeconomica)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->whereNull('deleted_at')
            ->get();

        return ( sizeof( $actividadeconomica ) > 0 );
    }

    public function newID( )
    {
        $actividadeconomica = DB::table('actividadeconomica')
            ->select('actividadeconomica.idactividadeconomica')
            ->orderBy('actividadeconomica.idactividadeconomica', 'DESC')
            ->first();

        return ( is_null( $actividadeconomica ) ) ? 1 : intval( $actividadeconomica->idactividadeconomica ) + 1;
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

        $actividadeconomica = $query->create( [
            'codigo'       => $codigo,
            'abreviatura'  => $abreviatura,
            'descripcion'  => $descripcion,
            'imagen'  => $imagen,
            'extension' => $extension,
            'fecha'     => $fecha,
            'hora'      => $hora
        ] );

        return $actividadeconomica;
    }

    public function upgrade( $query, $request )
    {
        $idactividadeconomica = isset( $request->idactividadeconomica ) ? $request->idactividadeconomica : null;
        $codigo         = isset( $request->codigo )         ? $request->codigo : null;
        $abreviatura    = isset( $request->abreviatura )    ? $request->abreviatura : null;
        $descripcion    = isset( $request->descripcion )    ? $request->descripcion : null;

        $imagen    = isset( $request->imagen )    ? $request->imagen : null;
        $extension = isset( $request->extension ) ? $request->extension : null;

        $actividadeconomica = $query->where( 'idactividadeconomica', '=', $idactividadeconomica )
            ->update( [
                'codigo'       => $codigo,
                'abreviatura'  => $abreviatura,
                'descripcion'  => $descripcion,
                'imagen'  => $imagen,
                'extension'  => $extension,
            ] );

        return $actividadeconomica;
    }

    public function show( $query, $idactividadeconomica ) {

        $actividadeconomica = $query
            ->select( [
                'actividadeconomica.idactividadeconomica', 'actividadeconomica.codigo', 'actividadeconomica.descripcion',
                'actividadeconomica.abreviatura', 'actividadeconomica.imagen', 'actividadeconomica.extension',
                'actividadeconomica.estado', 'actividadeconomica.isdelete', 'actividadeconomica.fecha', 'actividadeconomica.hora'
            ] )
            ->where( 'actividadeconomica.idactividadeconomica', '=', $idactividadeconomica )
            ->whereNull('actividadeconomica.deleted_at')
            ->orderBy('actividadeconomica.idactividadeconomica', 'DESC')
            ->first();

        return $actividadeconomica;
    }

    public function scopeEnable( $query, $request )
    {
        $idactividadeconomica = $request->idactividadeconomica;
        $query->where('idactividadeconomica', '=', $idactividadeconomica)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idactividadeconomica = $request->idactividadeconomica;
        $query->where('idactividadeconomica', '=', $idactividadeconomica)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idactividadeconomica = $request->idactividadeconomica;
        $query->where('idactividadeconomica', '=', $idactividadeconomica)->delete();
    }

    public function searchByID( $query, $idactividadeconomica ) {
        $actividadeconomica = $query
            ->select( [
                'actividadeconomica.idactividadeconomica', 'actividadeconomica.codigo', 'actividadeconomica.descripcion',
                'actividadeconomica.abreviatura', 'actividadeconomica.imagen', 'actividadeconomica.extension',
                'actividadeconomica.estado', 'actividadeconomica.isdelete', 'actividadeconomica.fecha', 'actividadeconomica.hora'
            ] )
            ->where('actividadeconomica.idactividadeconomica', '=', $idactividadeconomica)
            ->whereNull('actividadeconomica.deleted_at')
            ->orderBy('actividadeconomica.idactividadeconomica', 'DESC')
            ->first();

        return $actividadeconomica;
    }
}
