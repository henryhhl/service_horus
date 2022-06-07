<?php

namespace App\Models\Comercio\Venta;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ListaPrecio extends Model
{
    use SoftDeletes;

    protected $table      = 'listaprecio';
    protected $primaryKey = 'idlistaprecio';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'estado' => 'A',  'isdelete' => 'A', 'x_idusuario' => null,
        'codigo' => null, 'abreviatura' => null, 'imagen' => null, 'extension' => null,
        'nota' => null, 'tipocambio' => 0, 'fechainicio' => null, 'fechafinal' => null,
        'valor' => 0, 'fijoporcentaje' => 'N', 'accion' => 'N',
    ];

    protected $fillable = [
        'codigo', 'abreviatura', 'descripcion', 'nota', 'tipocambio',
        'fechalistaprecio', 'fechainicio', 'fechafinal', 'valor', 'fijoporcentaje', 'accion',
        'imagen', 'extension', 'x_idusuario', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function arraylistapreciodetalle() {
        return $this->hasMany(
            'App\Models\Comercio\Venta\ListaPrecioDetalle',
            'fkidlistaprecio',
            'idlistaprecio'
        );
    }

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'ASC';
        $column  = 'listaprecio.idlistaprecio';

        if ( strtoupper( $orderBy ) != 'DESC' ) $orderBy = 'ASC';

        $islike =  Functions::isLikeAndIlike();

        $listaprecio = $query
            ->select( [
                'listaprecio.idlistaprecio', 'listaprecio.codigo', 'listaprecio.descripcion',
                'listaprecio.nota', 'listaprecio.tipocambio', 'listaprecio.fechainicio', 'listaprecio.fechafinal',
                'listaprecio.fechalistaprecio', 'listaprecio.valor', 'listaprecio.fijoporcentaje', 'listaprecio.accion',
                'listaprecio.abreviatura', 'listaprecio.imagen', 'listaprecio.extension',
                'listaprecio.isdelete', 'listaprecio.estado', 'listaprecio.fecha', 'listaprecio.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('listaprecio.idlistaprecio', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('listaprecio.codigo', $islike, '%' . $search . '%')
                        ->orWhere('listaprecio.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'arraylistapreciodetalle' => function( $query ) {
                $query
                    ->leftJoin('producto as prod', 'listapreciodetalle.fkidproducto', '=', 'prod.idproducto')
                    ->select( [
                        'prod.idproducto', 'prod.nombre as producto', 'prod.codigo',
                        'listapreciodetalle.idlistapreciodetalle', 'listapreciodetalle.fkidlistaprecio',
                        'listapreciodetalle.preciobase', 'listapreciodetalle.preciopivote', 'listapreciodetalle.precioventa',
                        'listapreciodetalle.descuento', 'listapreciodetalle.montodescuento', 'listapreciodetalle.nota',
                        'listapreciodetalle.fkidproducto', 'listapreciodetalle.fkidmoneda',
                    ] )
                    ->orderBy('listapreciodetalle.idlistapreciodetalle');
            } ] )
            ->whereNull( 'listaprecio.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $listaprecio;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'listaprecio.idlistaprecio';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $listaprecio = $query
            ->select( [
                'listaprecio.idlistaprecio', 'listaprecio.codigo', 'listaprecio.descripcion',
                'listaprecio.nota', 'listaprecio.tipocambio', 'listaprecio.fechainicio', 'listaprecio.fechafinal',
                'listaprecio.fechalistaprecio', 'listaprecio.valor', 'listaprecio.fijoporcentaje', 'listaprecio.accion',
                'listaprecio.abreviatura', 'listaprecio.imagen', 'listaprecio.extension',
                'listaprecio.isdelete', 'listaprecio.estado', 'listaprecio.fecha', 'listaprecio.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('listaprecio.idlistaprecio', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('listaprecio.codigo', $islike, '%' . $search . '%')
                        ->orWhere('listaprecio.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'arraylistapreciodetalle' => function( $query ) {
                $query
                    ->leftJoin('producto as prod', 'listapreciodetalle.fkidproducto', '=', 'prod.idproducto')
                    ->select( [
                        'prod.idproducto', 'prod.nombre as producto', 'prod.codigo',
                        'listapreciodetalle.idlistapreciodetalle', 'listapreciodetalle.fkidlistaprecio',
                        'listapreciodetalle.preciobase', 'listapreciodetalle.preciopivote', 'listapreciodetalle.precioventa',
                        'listapreciodetalle.descuento', 'listapreciodetalle.montodescuento', 'listapreciodetalle.nota',
                        'listapreciodetalle.fkidproducto', 'listapreciodetalle.fkidmoneda',
                    ] )
                    ->orderBy('listapreciodetalle.idlistapreciodetalle');
            } ] )
            ->whereNull( 'listaprecio.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $listaprecio;
    }

    public function newID( )
    {
        $listaprecio = DB::table('listaprecio')
            ->select('listaprecio.idlistaprecio')
            ->orderBy('listaprecio.idlistaprecio', 'DESC')
            ->first();

        return ( is_null( $listaprecio ) ) ? 1 : intval( $listaprecio->idlistaprecio ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo      = isset( $request->codigo )      ? $request->codigo : null;
        $abreviatura = isset( $request->abreviatura ) ? $request->abreviatura : null;
        $descripcion      = isset( $request->descripcion )      ? $request->descripcion : null;
        $nota        = isset( $request->nota )        ? $request->nota : null;
        $tipocambio  = isset( $request->tipocambio )  ? $request->tipocambio : null;
        $fechalistaprecio = isset( $request->fechalistaprecio ) ? $request->fechalistaprecio : null;
        $fechainicio = isset( $request->fechainicio ) ? $request->fechainicio : null;
        $fechafinal  = isset( $request->fechafinal )  ? $request->fechafinal : null;
        $valor  = isset( $request->valor )  ? $request->valor : 0;
        $fijoporcentaje  = isset( $request->fijoporcentaje )  ? $request->fijoporcentaje : 'N';
        $accion  = isset( $request->accion )  ? $request->accion : 'N';
        $imagen      = isset( $request->imagen )      ? $request->imagen : null;
        $extension   = isset( $request->extension )   ? $request->extension : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $listaprecio = $query->create( [
            'codigo'      => $codigo,
            'abreviatura' => $abreviatura,
            'descripcion'      => $descripcion,
            'imagen'      => $imagen,
            'extension'   => $extension,
            'nota'        => $nota,
            'tipocambio'  => $tipocambio,
            'fechainicio' => $fechainicio,
            'fechafinal'  => $fechafinal,
            'fechalistaprecio'  => $fechalistaprecio,
            'valor'  => $valor,
            'fijoporcentaje'  => $fijoporcentaje,
            'accion'  => $accion,
            'fecha'       => $fecha,
            'hora'        => $hora
        ] );

        return $listaprecio;
    }

    public function upgrade( $query, $request )
    {
        $idlistaprecio = isset( $request->idlistaprecio ) ? $request->idlistaprecio : null;
        $codigo      = isset( $request->codigo )      ? $request->codigo : null;
        $abreviatura = isset( $request->abreviatura ) ? $request->abreviatura : null;
        $descripcion      = isset( $request->descripcion )      ? $request->descripcion : null;
        $nota        = isset( $request->nota )        ? $request->nota : null;
        $tipocambio  = isset( $request->tipocambio )  ? $request->tipocambio : null;
        $fechalistaprecio = isset( $request->fechalistaprecio ) ? $request->fechalistaprecio : null;
        $fechainicio = isset( $request->fechainicio ) ? $request->fechainicio : null;
        $fechafinal  = isset( $request->fechafinal )  ? $request->fechafinal : null;
        $valor  = isset( $request->valor )  ? $request->valor : 0;
        $fijoporcentaje  = isset( $request->fijoporcentaje )  ? $request->fijoporcentaje : 'N';
        $accion  = isset( $request->accion )  ? $request->accion : 'N';
        $imagen      = isset( $request->imagen )      ? $request->imagen : null;
        $extension   = isset( $request->extension )   ? $request->extension : null;

        $listaprecio = $query->where( 'idlistaprecio', '=', $idlistaprecio )
            ->update( [
                'codigo'      => $codigo,
                'abreviatura' => $abreviatura,
                'descripcion'      => $descripcion,
                'imagen'      => $imagen,
                'extension'   => $extension,
                'nota'        => $nota,
                'tipocambio'  => $tipocambio,
                'fechainicio' => $fechainicio,
                'fechafinal'  => $fechafinal,
                'fechalistaprecio'  => $fechalistaprecio,
                'valor'  => $valor,
                'fijoporcentaje'  => $fijoporcentaje,
                'accion'  => $accion,
            ] );

        return $listaprecio;
    }

    public function show( $query, $idlistaprecio ) {

        $listaprecio = $query
            ->select( [
                'listaprecio.idlistaprecio', 'listaprecio.codigo', 'listaprecio.descripcion',
                'listaprecio.nota', 'listaprecio.tipocambio', 'listaprecio.fechainicio', 'listaprecio.fechafinal',
                'listaprecio.fechalistaprecio', 'listaprecio.valor', 'listaprecio.fijoporcentaje', 'listaprecio.accion',
                'listaprecio.abreviatura', 'listaprecio.imagen', 'listaprecio.extension',
                'listaprecio.isdelete', 'listaprecio.estado', 'listaprecio.fecha', 'listaprecio.hora'
            ] )
            ->where('listaprecio.idlistaprecio', '=', $idlistaprecio)
            ->with( [ 'arraylistapreciodetalle' => function( $query ) {
                $query
                    ->leftJoin('producto as prod', 'listapreciodetalle.fkidproducto', '=', 'prod.idproducto')
                    ->select( [
                        'prod.idproducto', 'prod.nombre as producto', 'prod.codigo',
                        'listapreciodetalle.idlistapreciodetalle', 'listapreciodetalle.fkidlistaprecio',
                        'listapreciodetalle.preciobase', 'listapreciodetalle.preciopivote', 'listapreciodetalle.precioventa',
                        'listapreciodetalle.descuento', 'listapreciodetalle.montodescuento', 'listapreciodetalle.nota',
                        'listapreciodetalle.fkidproducto', 'listapreciodetalle.fkidmoneda',
                    ] )
                    ->orderBy('listapreciodetalle.idlistapreciodetalle');
            } ] )
            ->whereNull('listaprecio.deleted_at')
            ->orderBy('listaprecio.idlistaprecio', 'DESC')
            ->first();

        return $listaprecio;
    }

    public function scopeEnable( $query, $request )
    {
        $idlistaprecio = $request->idlistaprecio;
        $query->where('idlistaprecio', '=', $idlistaprecio)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idlistaprecio = $request->idlistaprecio;
        $query->where('idlistaprecio', '=', $idlistaprecio)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idlistaprecio = $request->idlistaprecio;
        $query->where('idlistaprecio', '=', $idlistaprecio)->delete();
    }

    public function searchByID( $query, $idlistaprecio ) {

        $listaprecio = $query
            ->select( [
                'listaprecio.idlistaprecio', 'listaprecio.codigo', 'listaprecio.descripcion',
                'listaprecio.nota', 'listaprecio.tipocambio', 'listaprecio.fechainicio', 'listaprecio.fechafinal',
                'listaprecio.fechalistaprecio', 'listaprecio.valor', 'listaprecio.fijoporcentaje', 'listaprecio.accion',
                'listaprecio.abreviatura', 'listaprecio.imagen', 'listaprecio.extension',
                'listaprecio.isdelete', 'listaprecio.estado', 'listaprecio.fecha', 'listaprecio.hora'
            ] )
            ->where('listaprecio.idlistaprecio', '=', $idlistaprecio)
            ->with( [ 'arraylistapreciodetalle' => function( $query ) {
                $query
                    ->leftJoin('producto as prod', 'listapreciodetalle.fkidproducto', '=', 'prod.idproducto')
                    ->select( [
                        'prod.idproducto', 'prod.nombre as producto', 'prod.codigo',
                        'listapreciodetalle.idlistapreciodetalle', 'listapreciodetalle.fkidlistaprecio',
                        'listapreciodetalle.preciobase', 'listapreciodetalle.preciopivote', 'listapreciodetalle.precioventa',
                        'listapreciodetalle.descuento', 'listapreciodetalle.montodescuento', 'listapreciodetalle.nota',
                        'listapreciodetalle.fkidproducto', 'listapreciodetalle.fkidmoneda',
                    ] )
                    ->orderBy('listapreciodetalle.idlistapreciodetalle');
            } ] )
            ->whereNull('listaprecio.deleted_at')
            ->orderBy('listaprecio.idlistaprecio', 'DESC')
            ->first();

        return $listaprecio;
    }

}
