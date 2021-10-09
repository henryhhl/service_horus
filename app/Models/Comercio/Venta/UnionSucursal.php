<?php

namespace App\Models\Comercio\Venta;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class UnionSucursal extends Model
{
    use SoftDeletes;

    protected $table      = 'unionsucursal';
    protected $primaryKey = 'idunionsucursal';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A',  'isdelete' => 'A', 
        'codigo' => null, 'abreviatura' => null,
        'imagen' => null, 'extension' => null,
    ];

    protected $fillable = [ 
        'codigo', 'descripcion', 'abreviatura', 'imagen', 'extension',
        'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'unionsucursal.idunionsucursal';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $unionsucursal = $query->select( [
                'unionsucursal.idunionsucursal', 'unionsucursal.codigo', 'unionsucursal.descripcion', 
                'unionsucursal.abreviatura', 'unionsucursal.imagen', 'unionsucursal.extension',
                'unionsucursal.isdelete', 'unionsucursal.estado', 'unionsucursal.fecha', 'unionsucursal.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('unionsucursal.idunionsucursal', '=', $search)
                        ->orWhere('unionsucursal.codigo', $islike, '%' . $search . '%')
                        ->orWhere('unionsucursal.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('unionsucursal.codigo', $islike, '%' . $search . '%')
                        ->orWhere('unionsucursal.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'unionsucursal.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $unionsucursal;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'unionsucursal.idunionsucursal';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $unionsucursal = $query->select( [
                'unionsucursal.idunionsucursal', 'unionsucursal.codigo', 'unionsucursal.descripcion', 
                'unionsucursal.abreviatura', 'unionsucursal.imagen', 'unionsucursal.extension',
                'unionsucursal.isdelete', 'unionsucursal.estado', 'unionsucursal.fecha', 'unionsucursal.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('unionsucursal.idunionsucursal', '=', $search)
                        ->orWhere('unionsucursal.codigo', $islike, '%' . $search . '%')
                        ->orWhere('unionsucursal.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('unionsucursal.codigo', $islike, '%' . $search . '%')
                        ->orWhere('unionsucursal.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'unionsucursal.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $unionsucursal;
    }

    public function existDescripcion( $query, $request ) {

        $idunionsucursal = isset( $request->idunionsucursal ) ? $request->idunionsucursal : null;
        $descripcion     = isset( $request->descripcion )    ? $request->descripcion : null;

        $unionsucursal = $query
            ->where( function ( $query ) use ( $idunionsucursal, $descripcion ) {
                if ( !is_null( $idunionsucursal ) ) {
                    return $query->where('idunionsucursal', '<>', $idunionsucursal)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->whereNull('deleted_at')
            ->get();
        
        return ( sizeof( $unionsucursal ) > 0 );
    }

    public function newID( )
    {
        $unionsucursal = DB::table('unionsucursal')
            ->select('unionsucursal.idunionsucursal')
            ->orderBy('unionsucursal.idunionsucursal', 'DESC')
            ->first();

        return ( is_null( $unionsucursal ) ) ? 1 : intval( $unionsucursal->idunionsucursal ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo      = isset( $request->codigo )      ? $request->codigo : null;
        $abreviatura = isset( $request->abreviatura ) ? $request->abreviatura : null;
        $descripcion = isset( $request->descripcion ) ? $request->descripcion : null;
        $imagen      = isset( $request->imagen )      ? $request->imagen : null;
        $extension   = isset( $request->extension )   ? $request->extension : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $unionsucursal = $query->create( [
            'codigo'      => $codigo,
            'abreviatura' => $abreviatura,
            'descripcion' => $descripcion,
            'imagen'      => $imagen,
            'extension'   => $extension,
            'fecha'       => $fecha,
            'hora'        => $hora
        ] );

        return $unionsucursal;
    }

    public function upgrade( $query, $request )
    {
        $idunionsucursal = isset( $request->idunionsucursal ) ? $request->idunionsucursal : null;
        $codigo         = isset( $request->codigo )         ? $request->codigo : null;
        $abreviatura    = isset( $request->abreviatura )    ? $request->abreviatura : null;
        $descripcion    = isset( $request->descripcion )    ? $request->descripcion : null;
        $imagen         = isset( $request->imagen )         ? $request->imagen : null;
        $extension      = isset( $request->extension )      ? $request->extension : null;

        $unionsucursal = $query->where( 'idunionsucursal', '=', $idunionsucursal )
            ->update( [
                'codigo'      => $codigo,
                'abreviatura' => $abreviatura,
                'descripcion' => $descripcion,
                'imagen'      => $imagen,
                'extension'   => $extension,
            ] );

        return $unionsucursal;
    }

    public function scopeEnable( $query, $request )
    {
        $idunionsucursal = $request->idunionsucursal;
        $query->where('idunionsucursal', '=', $idunionsucursal)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idunionsucursal = $request->idunionsucursal;
        $query->where('idunionsucursal', '=', $idunionsucursal)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idunionsucursal = $request->idunionsucursal;
        $query->where('idunionsucursal', '=', $idunionsucursal)->delete();
    }

    public function searchByID( $query, $idunionsucursal ) {
        
        $unionsucursal = $query
            ->select( [
                'unionsucursal.idunionsucursal', 'unionsucursal.codigo', 'unionsucursal.descripcion', 
                'unionsucursal.abreviatura', 'unionsucursal.imagen', 'unionsucursal.extension',
                'unionsucursal.isdelete', 'unionsucursal.estado', 'unionsucursal.fecha', 'unionsucursal.hora'
            ] )
            ->where('unionsucursal.idunionsucursal', '=', $idunionsucursal)
            ->whereNull('unionsucursal.deleted_at')
            ->orderBy('unionsucursal.idunionsucursal', 'DESC')
            ->first();

        return $unionsucursal;
    }
}
