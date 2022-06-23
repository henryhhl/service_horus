<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Almacen extends Model
{
    use SoftDeletes;

    protected $table      = 'almacen';
    protected $primaryKey = 'idalmacen';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'codigo' => null, 'abreviatura' => null,
        'cantidadtotalingresorealizada' => 0, 'cantidadingresorealizada' => 0, 'cantidadingresocancelado' => 0,
        'cantidadtotalproductoingresorealizada' => 0, 'cantidadproductoingresorealizada' => 0, 'cantidadproductoingresocancelado' => 0,
        'cantidadtotalsalidarealizada' => 0, 'cantidadsalidarealizada' => 0, 'cantidadsalidacancelado' => 0,
        'cantidadtotalproductosalidarealizada' => 0, 'cantidadproductosalidarealizada' => 0, 'cantidadproductosalidacancelado' => 0,
        'cantidadtotaltraspasorealizada' => 0, 'cantidadtraspasorealizada' => 0, 'cantidadtraspasocancelado' => 0,
        'cantidadtotalproductotraspasorealizada' => 0, 'cantidadproductotraspasorealizada' => 0, 'cantidadproductotraspasocancelado' => 0,
        'cantidadtotalventarealizada' => 0, 'cantidadventarealizada' => 0, 'cantidadventacancelado' => 0,
        'cantidadtotalproductoventarealizada' => 0, 'cantidadproductoventarealizada' => 0, 'cantidadproductoventacancelado' => 0,
        'cantidadtotaldevolucionventarealizada' => 0, 'cantidaddevolucionventarealizada' => 0, 'cantidaddevolucionventacancelado' => 0,
        'cantidadtotalproductodevolucionventarealizada' => 0, 'cantidadproductodevolucionventarealizada' => 0, 'cantidadproductodevolucionventacancelado' => 0,
        'cantidadtotalcomprarealizada' => 0, 'cantidadcomprarealizada' => 0, 'cantidadcompracancelado' => 0,
        'cantidadtotalproductocomprarealizada' => 0, 'cantidadproductocomprarealizada' => 0, 'cantidadproductocompracancelado' => 0,
        'cantidadtotaldevolucioncomprarealizada' => 0, 'cantidaddevolucioncomprarealizada' => 0, 'cantidaddevolucioncompracancelado' => 0,
        'cantidadtotalproductodevolucioncomprarealizada' => 0, 'cantidadproductodevolucioncomprarealizada' => 0, 'cantidadproductodevolucioncompracancelado' => 0,
        'estado' => 'A',  'isdelete' => 'A',  'imagen' => null, 'extension' => null,
    ];

    protected $fillable = [ 
        'codigo', 'descripcion', 'abreviatura', 'direccion', 'fkidsucursal',
        'cantidadtotalingresorealizada', 'cantidadingresorealizada', 'cantidadingresocancelado',
        'cantidadtotalproductoingresorealizada', 'cantidadproductoingresorealizada', 'cantidadproductoingresocancelado',
        'cantidadtotalsalidarealizada', 'cantidadsalidarealizada', 'cantidadsalidacancelado',
        'cantidadtotalproductosalidarealizada', 'cantidadproductosalidarealizada', 'cantidadproductosalidacancelado',
        'cantidadtotaltraspasorealizada', 'cantidadtraspasorealizada', 'cantidadtraspasocancelado',
        'cantidadtotalproductotraspasorealizada', 'cantidadproductotraspasorealizada', 'cantidadproductotraspasocancelado',
        'cantidadtotalventarealizada', 'cantidadventarealizada', 'cantidadventacancelado',
        'cantidadtotalproductoventarealizada', 'cantidadproductoventarealizada', 'cantidadproductoventacancelado',
        'cantidadtotaldevolucionventarealizada', 'cantidaddevolucionventarealizada', 'cantidaddevolucionventacancelado',
        'cantidadtotalproductodevolucionventarealizada', 'cantidadproductodevolucionventarealizada', 'cantidadproductodevolucionventacancelado',
        'cantidadtotalcomprarealizada', 'cantidadcomprarealizada', 'cantidadcompracancelado',
        'cantidadtotalproductocomprarealizada', 'cantidadproductocomprarealizada', 'cantidadproductocompracancelado',
        'cantidadtotaldevolucioncomprarealizada', 'cantidaddevolucioncomprarealizada', 'cantidaddevolucioncompracancelado',
        'cantidadtotalproductodevolucioncomprarealizada', 'cantidadproductodevolucioncomprarealizada', 'cantidadproductodevolucioncompracancelado',
        'imagen', 'extension', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function arraynotacompra() {
        return $this->hasMany(
            'App\Models\Comercio\Compra\NotaCompra',
            'fkidalmacen',
            'idalmacen'
        );
    }

    public function get_data( $query, $request )
    {
        $fkidsucursal  = isset($request->fkidsucursal)  ? $request->fkidsucursal  : null;

        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'almacen.idalmacen';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $almacen = $query
            ->leftJoin('sucursal as sucu', 'almacen.fkidsucursal', '=', 'sucu.idsucursal')
            ->select( [
                'almacen.idalmacen', 'almacen.codigo', 'almacen.descripcion', 'almacen.direccion',
                'almacen.fkidsucursal', 'sucu.descripcion as sucursal',
                'almacen.abreviatura', 'almacen.imagen', 'almacen.extension',
                'almacen.isdelete', 'almacen.estado', 'almacen.fecha', 'almacen.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('almacen.idalmacen', '=', $search)
                        ->orWhere('almacen.codigo', $islike, '%' . $search . '%')
                        ->orWhere('almacen.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('almacen.codigo', $islike, '%' . $search . '%')
                        ->orWhere('almacen.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->where( is_numeric( $fkidsucursal ) ? [ ['almacen.fkidsucursal', '=', $fkidsucursal] ] : [] )
            ->whereNull( 'almacen.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $almacen;
    }

    public function get_paginate( $query, $request )
    {
        $fkidsucursal  = isset($request->fkidsucursal)  ? $request->fkidsucursal  : null;

        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'almacen.idalmacen';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $almacen = $query
            ->leftJoin('sucursal as sucu', 'almacen.fkidsucursal', '=', 'sucu.idsucursal')
            ->select( [
                'almacen.idalmacen', 'almacen.codigo', 'almacen.descripcion', 'almacen.direccion',
                'almacen.fkidsucursal', 'sucu.descripcion as sucursal',
                'almacen.abreviatura', 'almacen.imagen', 'almacen.extension',
                'almacen.isdelete', 'almacen.estado', 'almacen.fecha', 'almacen.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('almacen.idalmacen', '=', $search)
                        ->orWhere('almacen.codigo', $islike, '%' . $search . '%')
                        ->orWhere('almacen.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('almacen.codigo', $islike, '%' . $search . '%')
                        ->orWhere('almacen.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->where( is_numeric( $fkidsucursal ) ? [ ['almacen.fkidsucursal', '=', $fkidsucursal] ] : [] )
            ->whereNull( 'almacen.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $almacen;
    }

    public function existDescripcion( $query, $request ) {

        $idalmacen   = isset( $request->idalmacen )    ? $request->idalmacen : null;
        $descripcion = isset( $request->descripcion )  ? $request->descripcion : null;
        $fkidsucursal = isset( $request->fkidsucursal ) ? $request->fkidsucursal : null;

        $almacen = $query
            ->where( function ( $query ) use ( $idalmacen, $descripcion ) {
                if ( !is_null( $idalmacen ) ) {
                    return $query->where('idalmacen', '<>', $idalmacen)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->where( ( is_numeric( $fkidsucursal ) ? [ ['fkidsucursal', '=', $fkidsucursal] ] : [] ) )
            ->whereNull('deleted_at')
            ->get();
        
        return ( sizeof( $almacen ) > 0 );
    }

    public function newID( )
    {
        $almacen = DB::table('almacen')
            ->select('almacen.idalmacen')
            ->orderBy('almacen.idalmacen', 'DESC')
            ->first();

        return ( is_null( $almacen ) ) ? 1 : intval( $almacen->idalmacen ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo       = isset( $request->codigo )      ? $request->codigo : null;
        $abreviatura  = isset( $request->abreviatura ) ? $request->abreviatura : null;
        $descripcion  = isset( $request->descripcion ) ? $request->descripcion : null;
        $direccion    = isset( $request->direccion )   ? $request->direccion : null;
        $fkidsucursal = isset( $request->fkidsucursal )   ? $request->fkidsucursal : null;
        $imagen       = isset( $request->imagen )      ? $request->imagen : null;
        $extension    = isset( $request->extension )   ? $request->extension : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $almacen = $query->create( [
            'codigo'       => $codigo,
            'abreviatura'  => $abreviatura,
            'descripcion'  => $descripcion,
            'direccion'    => $direccion,
            'fkidsucursal' => $fkidsucursal,
            'imagen'       => $imagen,
            'extension'    => $extension,
            'fecha'        => $fecha,
            'hora'         => $hora
        ] );

        return $almacen;
    }

    public function upgrade( $query, $request )
    {
        $idalmacen      = isset( $request->idalmacen ) ? $request->idalmacen : null;
        $codigo         = isset( $request->codigo )         ? $request->codigo : null;
        $abreviatura    = isset( $request->abreviatura )    ? $request->abreviatura : null;
        $descripcion    = isset( $request->descripcion )    ? $request->descripcion : null;
        $direccion      = isset( $request->direccion )   ? $request->direccion : null;
        $fkidsucursal   = isset( $request->fkidsucursal )   ? $request->fkidsucursal : null;
        $imagen         = isset( $request->imagen )         ? $request->imagen : null;
        $extension      = isset( $request->extension )      ? $request->extension : null;

        $almacen = $query->where( 'idalmacen', '=', $idalmacen )
            ->update( [
                'codigo'       => $codigo,
                'abreviatura'  => $abreviatura,
                'descripcion'  => $descripcion,
                'direccion'    => $direccion,
                'fkidsucursal' => $fkidsucursal,
                'imagen'       => $imagen,
                'extension'    => $extension,
            ] );

        return $almacen;
    }

    public function show( $query, $idalmacen ) {

        $almacen = $query
            ->leftJoin('sucursal as sucu', 'almacen.fkidsucursal', '=', 'sucu.idsucursal')
            ->select( [
                'almacen.idalmacen', 'almacen.codigo', 'almacen.descripcion', 'almacen.direccion',
                'almacen.fkidsucursal', 'sucu.descripcion as sucursal',
                'almacen.abreviatura', 'almacen.imagen', 'almacen.extension',
                'almacen.isdelete', 'almacen.estado', 'almacen.fecha', 'almacen.hora'
            ] )
            ->where( 'almacen.idalmacen', '=', $idalmacen )
            ->whereNull('almacen.deleted_at')
            ->orderBy('almacen.idalmacen', 'DESC')
            ->first();
        
        return $almacen;
    }

    public function scopeEnable( $query, $request )
    {
        $idalmacen = $request->idalmacen;
        $query->where('idalmacen', '=', $idalmacen)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idalmacen = $request->idalmacen;
        $query->where('idalmacen', '=', $idalmacen)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idalmacen = $request->idalmacen;
        $query->where('idalmacen', '=', $idalmacen)->delete();
    }

    public function searchByID( $query, $idalmacen ) {
        $almacen = $query
            ->leftJoin('sucursal as sucu', 'almacen.fkidsucursal', '=', 'sucu.idsucursal')
            ->select( [
                'almacen.idalmacen', 'almacen.codigo', 'almacen.descripcion', 'almacen.direccion',
                'almacen.fkidsucursal', 'sucu.descripcion as sucursal',
                'almacen.abreviatura', 'almacen.imagen', 'almacen.extension',
                'almacen.isdelete', 'almacen.estado', 'almacen.fecha', 'almacen.hora'
            ] )
            ->where('almacen.idalmacen', '=', $idalmacen)
            ->whereNull('almacen.deleted_at')
            ->orderBy('almacen.idalmacen', 'DESC')
            ->first();

        return $almacen;
    }

    public function tieneSucursal( $query, $idsucursal ) {

        $almacen = $query
            ->where( 'almacen.fkidsucursal', '=', $idsucursal )
            ->whereNull('almacen.deleted_at')
            ->get();
        
        return ( sizeof( $almacen ) > 0 );
    }

}
