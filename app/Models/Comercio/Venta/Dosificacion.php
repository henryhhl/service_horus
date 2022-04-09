<?php

namespace App\Models\Comercio\Venta;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Dosificacion extends Model
{
    use SoftDeletes;

    protected $table      = 'dosificacion';
    protected $primaryKey = 'iddosificacion';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'tiposucursal' => 'S', 'tipodosificacion' => 'A', 'tipoempresa' => 'N',
        'numerocorrelativo' => 0, 'numfacturainicial' => 0, 'numfacturasiguiente' => 0,
        'rangofacturainicial' => 0, 'rangofacturafinal' => 0,
        'estado' => 'A',  'isdelete' => 'A', 'codigo' => null, 'abreviatura' => null,
        'imagen' => null, 'extension' => null, 'x_idusuario' => null,
    ];

    protected $fillable = [
        'fkidsucursal', 'fkidactividadeconomica', 'descripcion', 'tiposucursal', 'tipodosificacion', 'tipoempresa', 'nit',
        'nroautorizacion', 'llave', 'lugaremision', 'numerocorrelativo', 'direccionfiscal', 'telefonofiscal',
        'numfacturainicial', 'numfacturasiguiente', 'fechaactivacion', 'fechalimiteemision', 'rangofacturainicial', 'rangofacturafinal',
        'codigo', 'abreviatura', 'imagen', 'extension', 'fecha', 'hora', 'estado', 'isdelete', 'x_idusuario',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'dosificacion.iddosificacion';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $dosificacion = $query
            ->select( [
                'dosificacion.iddosificacion', 'dosificacion.fkidsucursal', 'dosificacion.fkidactividadeconomica', 'dosificacion.descripcion',
                'dosificacion.tiposucursal', 'dosificacion.tipodosificacion', 'dosificacion.tipoempresa', 'dosificacion.nit',
                'dosificacion.nroautorizacion', 'dosificacion.llave', 'dosificacion.lugaremision', 'dosificacion.numerocorrelativo',
                'dosificacion.direccionfiscal', 'dosificacion.telefonofiscal', 'dosificacion.numfacturainicial', 'dosificacion.numfacturasiguiente',
                'dosificacion.fechaactivacion', 'dosificacion.fechalimiteemision', 'dosificacion.rangofacturainicial', 'dosificacion.rangofacturafinal',
                'dosificacion.codigo', 'dosificacion.abreviatura', 'dosificacion.imagen', 'dosificacion.extension',
                'dosificacion.estado', 'dosificacion.isdelete', 'dosificacion.fecha', 'dosificacion.hora',
                'suc.idsucursal', 'suc.descripcion as sucursal',
                'activeco.idactividadeconomica', 'activeco.descripcion as actividadeconomica',
            ] )
            ->leftJoin('sucursal as suc', 'dosificacion.fkidsucursal', '=', 'suc.idsucursal')
            ->leftJoin('actividadeconomica as activeco', 'dosificacion.fkidactividadeconomica', '=', 'activeco.idactividadeconomica')
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('dosificacion.iddosificacion', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('dosificacion.codigo', $islike, '%' . $search . '%')
                        ->orWhere('dosificacion.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'dosificacion.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $dosificacion;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'dosificacion.iddosificacion';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $dosificacion = $query
            ->select( [
                'dosificacion.iddosificacion', 'dosificacion.fkidsucursal', 'dosificacion.fkidactividadeconomica', 'dosificacion.descripcion',
                'dosificacion.tiposucursal', 'dosificacion.tipodosificacion', 'dosificacion.tipoempresa', 'dosificacion.nit',
                'dosificacion.nroautorizacion', 'dosificacion.llave', 'dosificacion.lugaremision', 'dosificacion.numerocorrelativo',
                'dosificacion.direccionfiscal', 'dosificacion.telefonofiscal', 'dosificacion.numfacturainicial', 'dosificacion.numfacturasiguiente',
                'dosificacion.fechaactivacion', 'dosificacion.fechalimiteemision', 'dosificacion.rangofacturainicial', 'dosificacion.rangofacturafinal',
                'dosificacion.codigo', 'dosificacion.abreviatura', 'dosificacion.imagen', 'dosificacion.extension',
                'dosificacion.estado', 'dosificacion.isdelete', 'dosificacion.fecha', 'dosificacion.hora',
                'suc.idsucursal', 'suc.descripcion as sucursal',
                'activeco.idactividadeconomica', 'activeco.descripcion as actividadeconomica',
            ] )
            ->leftJoin('sucursal as suc', 'dosificacion.fkidsucursal', '=', 'suc.idsucursal')
            ->leftJoin('actividadeconomica as activeco', 'dosificacion.fkidactividadeconomica', '=', 'activeco.idactividadeconomica')
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('dosificacion.iddosificacion', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('dosificacion.codigo', $islike, '%' . $search . '%')
                        ->orWhere('dosificacion.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'dosificacion.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $dosificacion;
    }

    public function existDescripcion( $query, $request ) {

        $iddosificacion = isset( $request->iddosificacion )  ? $request->iddosificacion : null;
        $descripcion = isset( $request->descripcion )  ? $request->descripcion : null;

        $dosificacion = $query
            ->where( function ( $query ) use ( $iddosificacion, $descripcion ) {
                if ( !is_null( $iddosificacion ) ) {
                    return $query->where('iddosificacion', '<>', $iddosificacion)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->whereNull('deleted_at')
            ->get();

        return ( sizeof( $dosificacion ) > 0 );
    }

    public function newID( )
    {
        $dosificacion = DB::table('dosificacion')
            ->select('dosificacion.iddosificacion')
            ->orderBy('dosificacion.iddosificacion', 'DESC')
            ->first();

        return ( is_null( $dosificacion ) ) ? 1 : intval( $dosificacion->iddosificacion ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo       = isset( $request->codigo )      ? $request->codigo : null;
        $abreviatura  = isset( $request->abreviatura ) ? $request->abreviatura : null;

        $fkidsucursal  = isset( $request->fkidsucursal ) ? $request->fkidsucursal : null;
        $fkidactividadeconomica  = isset( $request->fkidactividadeconomica ) ? $request->fkidactividadeconomica : null;

        $descripcion  = isset( $request->descripcion ) ? $request->descripcion : null;
        $tiposucursal  = isset( $request->tiposucursal ) ? $request->tiposucursal : 'S';
        $tipodosificacion  = isset( $request->tipodosificacion ) ? $request->tipodosificacion : 'A';
        $tipoempresa  = isset( $request->tipoempresa ) ? $request->tipoempresa : 'N';

        $nit  = isset( $request->nit ) ? $request->nit : null;
        $nroautorizacion  = isset( $request->nroautorizacion ) ? $request->nroautorizacion : null;
        $llave  = isset( $request->llave ) ? $request->llave : null;
        $lugaremision  = isset( $request->lugaremision ) ? $request->lugaremision : null;
        $numerocorrelativo  = isset( $request->numerocorrelativo ) ? $request->numerocorrelativo : 0;
        $direccionfiscal  = isset( $request->direccionfiscal ) ? $request->direccionfiscal : null;
        $telefonofiscal  = isset( $request->telefonofiscal ) ? $request->telefonofiscal : null;
        $numfacturainicial  = isset( $request->numfacturainicial ) ? $request->numfacturainicial : 0;
        $numfacturasiguiente  = isset( $request->numfacturasiguiente ) ? $request->numfacturasiguiente : 0;
        $fechaactivacion  = isset( $request->fechaactivacion ) ? $request->fechaactivacion : null;
        $fechalimiteemision  = isset( $request->fechalimiteemision ) ? $request->fechalimiteemision : null;
        $rangofacturainicial  = isset( $request->rangofacturainicial ) ? $request->rangofacturainicial : 0;
        $rangofacturafinal  = isset( $request->rangofacturafinal ) ? $request->rangofacturafinal : 0;

        $imagen  = isset( $request->imagen ) ? $request->imagen : null;
        $extension  = isset( $request->extension ) ? $request->extension : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $dosificacion = $query->create( [
            'codigo'       => $codigo,
            'abreviatura'  => $abreviatura,

            'fkidsucursal'  => $fkidsucursal,
            'fkidactividadeconomica'  => $fkidactividadeconomica,

            'descripcion'  => $descripcion,
            'tiposucursal'  => $tiposucursal,
            'tipodosificacion'  => $tipodosificacion,
            'tipoempresa'  => $tipoempresa,
            'nit'  => $nit,
            'nroautorizacion'  => $nroautorizacion,
            'llave'  => $llave,
            'lugaremision'  => $lugaremision,
            'numerocorrelativo'  => $numerocorrelativo,
            'direccionfiscal'  => $direccionfiscal,
            'telefonofiscal'  => $telefonofiscal,
            'numfacturainicial'  => $numfacturainicial,
            'numfacturasiguiente'  => $numfacturasiguiente,
            'fechaactivacion'  => $fechaactivacion,
            'fechalimiteemision'  => $fechalimiteemision,
            'rangofacturainicial'  => $rangofacturainicial,
            'rangofacturafinal'  => $rangofacturafinal,

            'imagen'  => $imagen,
            'extension' => $extension,
            'fecha'     => $fecha,
            'hora'      => $hora
        ] );

        return $dosificacion;
    }

    public function upgrade( $query, $request )
    {
        $iddosificacion = isset( $request->iddosificacion ) ? $request->iddosificacion : null;
        $codigo       = isset( $request->codigo )      ? $request->codigo : null;
        $abreviatura  = isset( $request->abreviatura ) ? $request->abreviatura : null;

        $fkidsucursal  = isset( $request->fkidsucursal ) ? $request->fkidsucursal : null;
        $fkidactividadeconomica  = isset( $request->fkidactividadeconomica ) ? $request->fkidactividadeconomica : null;

        $descripcion  = isset( $request->descripcion ) ? $request->descripcion : null;
        $tiposucursal  = isset( $request->tiposucursal ) ? $request->tiposucursal : 'S';
        $tipodosificacion  = isset( $request->tipodosificacion ) ? $request->tipodosificacion : 'A';
        $tipoempresa  = isset( $request->tipoempresa ) ? $request->tipoempresa : 'N';

        $nit  = isset( $request->nit ) ? $request->nit : null;
        $nroautorizacion  = isset( $request->nroautorizacion ) ? $request->nroautorizacion : null;
        $llave  = isset( $request->llave ) ? $request->llave : null;
        $lugaremision  = isset( $request->lugaremision ) ? $request->lugaremision : null;
        $numerocorrelativo  = isset( $request->numerocorrelativo ) ? $request->numerocorrelativo : 0;
        $direccionfiscal  = isset( $request->direccionfiscal ) ? $request->direccionfiscal : null;
        $telefonofiscal  = isset( $request->telefonofiscal ) ? $request->telefonofiscal : null;
        $numfacturainicial  = isset( $request->numfacturainicial ) ? $request->numfacturainicial : 0;
        $numfacturasiguiente  = isset( $request->numfacturasiguiente ) ? $request->numfacturasiguiente : 0;
        $fechaactivacion  = isset( $request->fechaactivacion ) ? $request->fechaactivacion : null;
        $fechalimiteemision  = isset( $request->fechalimiteemision ) ? $request->fechalimiteemision : null;
        $rangofacturainicial  = isset( $request->rangofacturainicial ) ? $request->rangofacturainicial : 0;
        $rangofacturafinal  = isset( $request->rangofacturafinal ) ? $request->rangofacturafinal : 0;

        $imagen  = isset( $request->imagen ) ? $request->imagen : null;
        $extension  = isset( $request->extension ) ? $request->extension : null;

        $dosificacion = $query->where( 'iddosificacion', '=', $iddosificacion )
            ->update( [
                'codigo'       => $codigo,
                'abreviatura'  => $abreviatura,

                'fkidsucursal'  => $fkidsucursal,
                'fkidactividadeconomica'  => $fkidactividadeconomica,

                'descripcion'  => $descripcion,
                'tiposucursal'  => $tiposucursal,
                'tipodosificacion'  => $tipodosificacion,
                'tipoempresa'  => $tipoempresa,
                'nit'  => $nit,
                'nroautorizacion'  => $nroautorizacion,
                'llave'  => $llave,
                'lugaremision'  => $lugaremision,
                'numerocorrelativo'  => $numerocorrelativo,
                'direccionfiscal'  => $direccionfiscal,
                'telefonofiscal'  => $telefonofiscal,
                'numfacturainicial'  => $numfacturainicial,
                'numfacturasiguiente'  => $numfacturasiguiente,
                'fechaactivacion'  => $fechaactivacion,
                'fechalimiteemision'  => $fechalimiteemision,
                'rangofacturainicial'  => $rangofacturainicial,
                'rangofacturafinal'  => $rangofacturafinal,

                'imagen'  => $imagen,
                'extension' => $extension,
            ] );

        return $dosificacion;
    }

    public function show( $query, $iddosificacion ) {

        $dosificacion = $query
            ->select( [
                'dosificacion.iddosificacion', 'dosificacion.fkidsucursal', 'dosificacion.fkidactividadeconomica', 'dosificacion.descripcion',
                'dosificacion.tiposucursal', 'dosificacion.tipodosificacion', 'dosificacion.tipoempresa', 'dosificacion.nit',
                'dosificacion.nroautorizacion', 'dosificacion.llave', 'dosificacion.lugaremision', 'dosificacion.numerocorrelativo',
                'dosificacion.direccionfiscal', 'dosificacion.telefonofiscal', 'dosificacion.numfacturainicial', 'dosificacion.numfacturasiguiente',
                'dosificacion.fechaactivacion', 'dosificacion.fechalimiteemision', 'dosificacion.rangofacturainicial', 'dosificacion.rangofacturafinal',
                'dosificacion.codigo', 'dosificacion.abreviatura', 'dosificacion.imagen', 'dosificacion.extension',
                'dosificacion.estado', 'dosificacion.isdelete', 'dosificacion.fecha', 'dosificacion.hora',
                'suc.idsucursal', 'suc.descripcion as sucursal',
                'activeco.idactividadeconomica', 'activeco.descripcion as actividadeconomica',
            ] )
            ->leftJoin('sucursal as suc', 'dosificacion.fkidsucursal', '=', 'suc.idsucursal')
            ->leftJoin('actividadeconomica as activeco', 'dosificacion.fkidactividadeconomica', '=', 'activeco.idactividadeconomica')
            ->where( 'dosificacion.iddosificacion', '=', $iddosificacion )
            ->whereNull('dosificacion.deleted_at')
            ->orderBy('dosificacion.iddosificacion', 'DESC')
            ->first();

        return $dosificacion;
    }

    public function scopeEnable( $query, $request )
    {
        $iddosificacion = $request->iddosificacion;
        $query->where('iddosificacion', '=', $iddosificacion)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $iddosificacion = $request->iddosificacion;
        $query->where('iddosificacion', '=', $iddosificacion)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $iddosificacion = $request->iddosificacion;
        $query->where('iddosificacion', '=', $iddosificacion)->delete();
    }

    public function searchByID( $query, $iddosificacion ) {
        $dosificacion = $query
            ->select( [
                'dosificacion.iddosificacion', 'dosificacion.fkidsucursal', 'dosificacion.fkidactividadeconomica', 'dosificacion.descripcion',
                'dosificacion.tiposucursal', 'dosificacion.tipodosificacion', 'dosificacion.tipoempresa', 'dosificacion.nit',
                'dosificacion.nroautorizacion', 'dosificacion.llave', 'dosificacion.lugaremision', 'dosificacion.numerocorrelativo',
                'dosificacion.direccionfiscal', 'dosificacion.telefonofiscal', 'dosificacion.numfacturainicial', 'dosificacion.numfacturasiguiente',
                'dosificacion.fechaactivacion', 'dosificacion.fechalimiteemision', 'dosificacion.rangofacturainicial', 'dosificacion.rangofacturafinal',
                'dosificacion.codigo', 'dosificacion.abreviatura', 'dosificacion.imagen', 'dosificacion.extension',
                'dosificacion.estado', 'dosificacion.isdelete', 'dosificacion.fecha', 'dosificacion.hora',
                'suc.idsucursal', 'suc.descripcion as sucursal',
                'activeco.idactividadeconomica', 'activeco.descripcion as actividadeconomica',
            ] )
            ->leftJoin('sucursal as suc', 'dosificacion.fkidsucursal', '=', 'suc.idsucursal')
            ->leftJoin('actividadeconomica as activeco', 'dosificacion.fkidactividadeconomica', '=', 'activeco.idactividadeconomica')
            ->where('dosificacion.iddosificacion', '=', $iddosificacion)
            ->whereNull('dosificacion.deleted_at')
            ->orderBy('dosificacion.iddosificacion', 'DESC')
            ->first();

        return $dosificacion;
    }
}
