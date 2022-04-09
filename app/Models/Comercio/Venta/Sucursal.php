<?php

namespace App\Models\Comercio\Venta;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Sucursal extends Model
{
    use SoftDeletes;

    protected $table      = 'sucursal';
    protected $primaryKey = 'idsucursal';
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
        'codigo', 'descripcion', 'abreviatura', 'direccion', 'fkidciudad', 'fkidciudadpais', 'fkidunionsucursal',
        'imagen', 'extension', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'sucursal.idsucursal';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $sucursal = $query
            ->select( [
                'sucursal.idsucursal', 'sucursal.codigo', 'sucursal.descripcion', 'sucursal.direccion',
                'sucursal.fkidciudad', 'ciu.descripcion as ciudad',
                'sucursal.fkidciudadpais', 'ciupais.descripcion as ciudadpais',
                'sucursal.fkidunionsucursal', 'unionsuc.descripcion as unionsucursal',
                'sucursal.abreviatura', 'sucursal.imagen', 'sucursal.extension',
                'sucursal.isdelete', 'sucursal.estado', 'sucursal.fecha', 'sucursal.hora'
            ] )
            ->leftJoin('ciudad as ciu', 'sucursal.fkidciudad', '=', 'ciu.idciudad')
            ->leftJoin('ciudad as ciupais', 'sucursal.fkidciudadpais', '=', 'ciupais.idciudad')
            ->leftJoin('unionsucursal as unionsuc', 'sucursal.fkidunionsucursal', '=', 'unionsuc.idunionsucursal')
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('sucursal.idsucursal', '=', $search)
                        ->orWhere('sucursal.codigo', $islike, '%' . $search . '%')
                        ->orWhere('sucursal.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('sucursal.codigo', $islike, '%' . $search . '%')
                        ->orWhere('sucursal.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'sucursal.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $sucursal;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'sucursal.idsucursal';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $sucursal = $query
            ->select( [
                'sucursal.idsucursal', 'sucursal.codigo', 'sucursal.descripcion', 'sucursal.direccion',
                'sucursal.fkidciudad', 'ciu.descripcion as ciudad',
                'sucursal.fkidciudadpais', 'ciupais.descripcion as ciudadpais',
                'sucursal.fkidunionsucursal', 'unionsuc.descripcion as unionsucursal',
                'sucursal.abreviatura', 'sucursal.imagen', 'sucursal.extension',
                'sucursal.isdelete', 'sucursal.estado', 'sucursal.fecha', 'sucursal.hora'
            ] )
            ->leftJoin('ciudad as ciu', 'sucursal.fkidciudad', '=', 'ciu.idciudad')
            ->leftJoin('ciudad as ciupais', 'sucursal.fkidciudadpais', '=', 'ciupais.idciudad')
            ->leftJoin('unionsucursal as unionsuc', 'sucursal.fkidunionsucursal', '=', 'unionsuc.idunionsucursal')
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('sucursal.idsucursal', '=', $search)
                        ->orWhere('sucursal.codigo', $islike, '%' . $search . '%')
                        ->orWhere('sucursal.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('sucursal.codigo', $islike, '%' . $search . '%')
                        ->orWhere('sucursal.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'sucursal.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $sucursal;
    }

    public function existDescripcion( $query, $request ) {

        $idsucursal = isset( $request->idsucursal ) ? $request->idsucursal : null;
        $descripcion = isset( $request->descripcion )    ? $request->descripcion : null;
        $fkidunionsucursal = isset( $request->fkidunionsucursal )    ? $request->fkidunionsucursal : null;

        $sucursal = $query
            ->where( function ( $query ) use ( $idsucursal, $descripcion ) {
                if ( !is_null( $idsucursal ) ) {
                    return $query->where('idsucursal', '<>', $idsucursal)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->where( ( is_numeric( $fkidunionsucursal ) ? [ ['fkidunionsucursal', '=', $fkidunionsucursal] ] : [] ) )
            ->whereNull('deleted_at')
            ->get();

        return ( sizeof( $sucursal ) > 0 );
    }

    public function newID( )
    {
        $sucursal = DB::table('sucursal')
            ->select('sucursal.idsucursal')
            ->orderBy('sucursal.idsucursal', 'DESC')
            ->first();

        return ( is_null( $sucursal ) ) ? 1 : intval( $sucursal->idsucursal ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo      = isset( $request->codigo )      ? $request->codigo : null;
        $abreviatura = isset( $request->abreviatura ) ? $request->abreviatura : null;
        $descripcion = isset( $request->descripcion ) ? $request->descripcion : null;
        $direccion   = isset( $request->direccion )   ? $request->direccion : null;
        $fkidciudad  = isset( $request->fkidciudad )   ? $request->fkidciudad : null;
        $fkidciudadpais  = isset( $request->fkidciudadpais )   ? $request->fkidciudadpais : null;
        $fkidunionsucursal  = isset( $request->fkidunionsucursal )   ? $request->fkidunionsucursal : null;
        $imagen      = isset( $request->imagen )      ? $request->imagen : null;
        $extension   = isset( $request->extension )   ? $request->extension : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $sucursal = $query->create( [
            'codigo'      => $codigo,
            'abreviatura' => $abreviatura,
            'descripcion' => $descripcion,
            'direccion'   => $direccion,
            'fkidciudadpais'  => $fkidciudadpais,
            'fkidciudad'  => $fkidciudad,
            'fkidunionsucursal'  => $fkidunionsucursal,
            'imagen'      => $imagen,
            'extension'   => $extension,
            'fecha'       => $fecha,
            'hora'        => $hora
        ] );

        return $sucursal;
    }

    public function upgrade( $query, $request )
    {
        $idsucursal     = isset( $request->idsucursal ) ? $request->idsucursal : null;
        $codigo         = isset( $request->codigo )         ? $request->codigo : null;
        $abreviatura    = isset( $request->abreviatura )    ? $request->abreviatura : null;
        $descripcion    = isset( $request->descripcion )    ? $request->descripcion : null;
        $direccion      = isset( $request->direccion )   ? $request->direccion : null;
        $fkidciudad     = isset( $request->fkidciudad )   ? $request->fkidciudad : null;
        $fkidciudadpais     = isset( $request->fkidciudadpais )   ? $request->fkidciudadpais : null;
        $fkidunionsucursal  = isset( $request->fkidunionsucursal )   ? $request->fkidunionsucursal : null;
        $imagen         = isset( $request->imagen )         ? $request->imagen : null;
        $extension      = isset( $request->extension )      ? $request->extension : null;

        $sucursal = $query->where( 'idsucursal', '=', $idsucursal )
            ->update( [
                'codigo'      => $codigo,
                'abreviatura' => $abreviatura,
                'descripcion' => $descripcion,
                'direccion'   => $direccion,
                'fkidciudad'  => $fkidciudad,
                'fkidciudadpais'  => $fkidciudadpais,
                'fkidunionsucursal'  => $fkidunionsucursal,
                'imagen'      => $imagen,
                'extension'   => $extension,
            ] );

        return $sucursal;
    }

    public function show( $query, $idsucursal ) {

        $sucursal = $query
            ->select( [
                'sucursal.idsucursal', 'sucursal.codigo', 'sucursal.descripcion', 'sucursal.direccion',
                'sucursal.fkidciudad', 'ciu.descripcion as ciudad',
                'sucursal.fkidciudadpais', 'ciupais.descripcion as ciudadpais',
                'sucursal.fkidunionsucursal', 'unionsuc.descripcion as unionsucursal',
                'sucursal.abreviatura', 'sucursal.imagen', 'sucursal.extension',
                'sucursal.isdelete', 'sucursal.estado', 'sucursal.fecha', 'sucursal.hora'
            ] )
            ->leftJoin('ciudad as ciu', 'sucursal.fkidciudad', '=', 'ciu.idciudad')
            ->leftJoin('ciudad as ciupais', 'sucursal.fkidciudadpais', '=', 'ciupais.idciudad')
            ->leftJoin('unionsucursal as unionsuc', 'sucursal.fkidunionsucursal', '=', 'unionsuc.idunionsucursal')
            ->where( 'sucursal.idsucursal', '=', $idsucursal )
            ->whereNull('sucursal.deleted_at')
            ->orderBy('sucursal.idsucursal', 'DESC')
            ->first();

        return $sucursal;
    }

    public function tieneUnionSucursal( $query, $idunionsucursal ) {

        $sucursal = $query
            ->where( 'sucursal.fkidunionsucursal', '=', $idunionsucursal )
            ->whereNull('sucursal.deleted_at')
            ->get();

        return ( sizeof( $sucursal ) > 0 );
    }

    public function scopeEnable( $query, $request )
    {
        $idsucursal = $request->idsucursal;
        $query->where('idsucursal', '=', $idsucursal)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idsucursal = $request->idsucursal;
        $query->where('idsucursal', '=', $idsucursal)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idsucursal = $request->idsucursal;
        $query->where('idsucursal', '=', $idsucursal)->delete();
    }

    public function searchByID( $query, $idsucursal ) {
        $sucursal = $query
            ->select( [
                'sucursal.idsucursal', 'sucursal.codigo', 'sucursal.descripcion', 'sucursal.direccion',
                'sucursal.fkidciudad', 'ciu.descripcion as ciudad',
                'sucursal.fkidciudadpais', 'ciupais.descripcion as ciudadpais',
                'sucursal.fkidunionsucursal', 'unionsuc.descripcion as unionsucursal',
                'sucursal.abreviatura', 'sucursal.imagen', 'sucursal.extension',
                'sucursal.isdelete', 'sucursal.estado', 'sucursal.fecha', 'sucursal.hora'
            ] )
            ->leftJoin('ciudad as ciu', 'sucursal.fkidciudad', '=', 'ciu.idciudad')
            ->leftJoin('ciudad as ciupais', 'sucursal.fkidciudadpais', '=', 'ciupais.idciudad')
            ->leftJoin('unionsucursal as unionsuc', 'sucursal.fkidunionsucursal', '=', 'unionsuc.idunionsucursal')
            ->where('sucursal.idsucursal', '=', $idsucursal)
            ->whereNull('sucursal.deleted_at')
            ->orderBy('sucursal.idsucursal', 'DESC')
            ->first();

        return $sucursal;
    }

}
