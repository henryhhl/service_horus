<?php

namespace App\Models\Comercio\Venta;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Vendedor extends Model
{
    use SoftDeletes;

    protected $table      = 'vendedor';
    protected $primaryKey = 'idvendedor';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'codigo' => null, 'direccion' => null, 'fax' => null, 'telefono' => null,
        'celular' => null, 'email' => null, 'fechanacimiento' => null, 'genero' => 'N', 'estadocivil' => null,
        'cantidadventarealizada' => 0, 'cantidadventacancelada' => 0, 'cantidadproductoventarealizada' => 0, 'cantidadproductoventacancelada' => 0,
        'cantidadproductodevolucionventarealizada' => 0, 'cantidadproductodevolucionventacancelada' => 0,
        'cantidaddevolucionventarealizada' => 0, 'cantidaddevolucionventacancelada' => 0, 'cantidadtotalproductodevolucionventarealizada' => 0,
        'cantidadtotalventarealizada' => 0, 'cantidadtotalproductoventarealizada' => 0, 'cantidadtotaldevolucionventarealizada' => 0,
        'imagen' => null, 'extension' => null, 'x_idusuario' => null, 'estado' => 'A',  'isdelete' => 'A',
    ];

    protected $fillable = [
        'fkidciudadpais', 'fkidciudad', 'fkidcomisionventa',
        'codigo', 'ci', 'nombre', 'apellido', 'direccion', 'fax', 'telefono',
        'celular', 'email', 'fechanacimiento', 'genero', 'estadocivil',
        'cantidadventarealizada', 'cantidadventacancelada', 'cantidadproductoventarealizada', 'cantidadproductoventacancelada',
        'cantidadproductodevolucionventarealizada', 'cantidadproductodevolucionventacancelada', 'cantidaddevolucionventarealizada', 'cantidaddevolucionventacancelada',
        'cantidadtotalventarealizada', 'cantidadtotalproductoventarealizada', 'cantidadtotaldevolucionventarealizada', 'cantidadtotalproductodevolucionventarealizada',
        'imagen', 'extension', 'x_idusuario', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'vendedor.idvendedor';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $vendedor = $query
            ->select( [
                'vendedor.idvendedor', 'vendedor.fkidciudadpais', 'vendedor.fkidciudad', 'vendedor.fkidcomisionventa',
                'vendedor.codigo', 'vendedor.ci', 'vendedor.nombre', 'vendedor.apellido', 'vendedor.direccion', 'vendedor.fax', 'vendedor.telefono',
                'vendedor.celular', 'vendedor.email', 'vendedor.fechanacimiento', 'vendedor.genero', 'vendedor.estadocivil',
                'vendedor.imagen', 'vendedor.extension', 'vendedor.isdelete', 'vendedor.estado', 'vendedor.fecha', 'vendedor.hora',
                'ciupais.idciudad as idciudadpais', 'ciupais.descripcion as ciudadpais',
                'ciu.idciudad', 'ciu.descripcion as ciudad',
                'comivta.idcomisionventa', 'comivta.descripcion as comisionventa', 'comivta.valor'
            ] )
            ->leftJoin('ciudad as ciupais', 'vendedor.fkidciudadpais', '=', 'ciupais.idciudad')
            ->leftJoin('ciudad as ciu', 'vendedor.fkidciudad', '=', 'ciu.idciudad')
            ->leftJoin('comisionventa as comivta', 'vendedor.fkidcomisionventa', '=', 'comivta.idcomisionventa')
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('vendedor.idvendedor', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('vendedor.codigo', $islike, '%' . $search . '%')
                        ->orWhere('vendedor.nombre', $islike, '%' . $search . '%')
                        ->orWhere('vendedor.apellido', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'vendedor.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $vendedor;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'vendedor.idvendedor';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $vendedor = $query
            ->select( [
                'vendedor.idvendedor', 'vendedor.fkidciudadpais', 'vendedor.fkidciudad', 'vendedor.fkidcomisionventa',
                'vendedor.codigo', 'vendedor.ci', 'vendedor.nombre', 'vendedor.apellido', 'vendedor.direccion', 'vendedor.fax', 'vendedor.telefono',
                'vendedor.celular', 'vendedor.email', 'vendedor.fechanacimiento', 'vendedor.genero', 'vendedor.estadocivil',
                'vendedor.imagen', 'vendedor.extension', 'vendedor.isdelete', 'vendedor.estado', 'vendedor.fecha', 'vendedor.hora',
                'ciupais.idciudad as idciudadpais', 'ciupais.descripcion as ciudadpais',
                'ciu.idciudad', 'ciu.descripcion as ciudad',
                'comivta.idcomisionventa', 'comivta.descripcion as comisionventa', 'comivta.valor'
            ] )
            ->leftJoin('ciudad as ciupais', 'vendedor.fkidciudadpais', '=', 'ciupais.idciudad')
            ->leftJoin('ciudad as ciu', 'vendedor.fkidciudad', '=', 'ciu.idciudad')
            ->leftJoin('comisionventa as comivta', 'vendedor.fkidcomisionventa', '=', 'comivta.idcomisionventa')
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('vendedor.idvendedor', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('vendedor.codigo', $islike, '%' . $search . '%')
                        ->orWhere('vendedor.nombre', $islike, '%' . $search . '%')
                        ->orWhere('vendedor.apellido', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'vendedor.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $vendedor;
    }

    public function newID( )
    {
        $vendedor = DB::table('vendedor')
            ->select('vendedor.idvendedor')
            ->orderBy('vendedor.idvendedor', 'DESC')
            ->first();

        return ( is_null( $vendedor ) ) ? 1 : intval( $vendedor->idvendedor ) + 1;
    }

    public function store( $query, $request )
    {
        $fkidciudadpais    = isset( $request->fkidciudadpais ) ? $request->fkidciudadpais : null;
        $fkidciudad        = isset( $request->fkidciudad ) ? $request->fkidciudad : null;
        $fkidcomisionventa = isset( $request->fkidcomisionventa ) ? $request->fkidcomisionventa : null;

        $codigo = isset( $request->codigo ) ? $request->codigo : null;
        $ci = isset( $request->ci ) ? $request->ci : null;
        $nombre = isset( $request->nombre ) ? $request->nombre : null;
        $apellido = isset( $request->apellido ) ? $request->apellido : null;
        $direccion = isset( $request->direccion ) ? $request->direccion : null;
        $fax = isset( $request->fax ) ? $request->fax : null;
        $telefono = isset( $request->telefono ) ? $request->telefono : null;
        $celular = isset( $request->celular ) ? $request->celular : null;
        $email = isset( $request->email ) ? $request->email : null;
        $fechanacimiento = isset( $request->fechanacimiento ) ? $request->fechanacimiento : null;
        $genero = isset( $request->genero ) ? $request->genero : 'N';
        $estadocivil = isset( $request->estadocivil ) ? $request->estadocivil : 'N';

        $imagen      = isset( $request->imagen ) ? $request->imagen : null;
        $extension   = isset( $request->extension ) ? $request->extension : null;
        $estado = isset( $request->estado ) ? $request->estado : 'A';
        $x_idusuario = isset( $request->x_idusuario ) ? $request->x_idusuario : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $vendedor = $query->create( [
            'fkidciudadpais'    => $fkidciudadpais,
            'fkidciudad'        => $fkidciudad,
            'fkidcomisionventa' => $fkidcomisionventa,

            'codigo' => $codigo,
            'ci' => $ci,
            'nombre' => $nombre,
            'apellido' => $apellido,
            'direccion' => $direccion,
            'fax' => $fax,
            'telefono' => $telefono,
            'celular' => $celular,
            'email' => $email,
            'fechanacimiento' => $fechanacimiento,
            'genero' => $genero,
            'estadocivil' => $estadocivil,

            'imagen'      => $imagen,
            'extension'   => $extension,
            'estado'      => $estado,
            'fecha'       => $fecha,
            'hora'        => $hora,
            'x_idusuario' => $x_idusuario,
        ] );

        return $vendedor;
    }

    public function upgrade( $query, $request )
    {
        $idvendedor = isset( $request->idvendedor ) ? $request->idvendedor : null;

        $fkidciudadpais    = isset( $request->fkidciudadpais ) ? $request->fkidciudadpais : null;
        $fkidciudad        = isset( $request->fkidciudad ) ? $request->fkidciudad : null;
        $fkidcomisionventa = isset( $request->fkidcomisionventa ) ? $request->fkidcomisionventa : null;

        $codigo = isset( $request->codigo ) ? $request->codigo : null;
        $ci = isset( $request->ci ) ? $request->ci : null;
        $nombre = isset( $request->nombre ) ? $request->nombre : null;
        $apellido = isset( $request->apellido ) ? $request->apellido : null;
        $direccion = isset( $request->direccion ) ? $request->direccion : null;
        $fax = isset( $request->fax ) ? $request->fax : null;
        $telefono = isset( $request->telefono ) ? $request->telefono : null;
        $celular = isset( $request->celular ) ? $request->celular : null;
        $email = isset( $request->email ) ? $request->email : null;
        $fechanacimiento = isset( $request->fechanacimiento ) ? $request->fechanacimiento : null;
        $genero = isset( $request->genero ) ? $request->genero : 'N';
        $estadocivil = isset( $request->estadocivil ) ? $request->estadocivil : 'N';

        $imagen      = isset( $request->imagen ) ? $request->imagen : null;
        $extension   = isset( $request->extension ) ? $request->extension : null;
        $estado = isset( $request->estado ) ? $request->estado : 'A';

        $vendedor = $query->where( 'idvendedor', '=', $idvendedor )
            ->update( [
                'fkidciudadpais'    => $fkidciudadpais,
                'fkidciudad'        => $fkidciudad,
                'fkidcomisionventa' => $fkidcomisionventa,

                'codigo' => $codigo,
                'ci' => $ci,
                'nombre' => $nombre,
                'apellido' => $apellido,
                'direccion' => $direccion,
                'fax' => $fax,
                'telefono' => $telefono,
                'celular' => $celular,
                'email' => $email,
                'fechanacimiento' => $fechanacimiento,
                'genero' => $genero,
                'estadocivil' => $estadocivil,

                'imagen'      => $imagen,
                'extension'   => $extension,
                'estado'      => $estado,
            ] );

        return $vendedor;
    }

    public function scopeEnable( $query, $request )
    {
        $idvendedor = $request->idvendedor;
        $query->where('idvendedor', '=', $idvendedor)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idvendedor = $request->idvendedor;
        $query->where('idvendedor', '=', $idvendedor)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idvendedor = $request->idvendedor;
        $query->where('idvendedor', '=', $idvendedor)->delete();
    }

    public function searchByID( $query, $idvendedor ) {

        $vendedor = $query
            ->select( [
                'vendedor.idvendedor', 'vendedor.fkidciudadpais', 'vendedor.fkidciudad', 'vendedor.fkidcomisionventa',
                'vendedor.codigo', 'vendedor.ci', 'vendedor.nombre', 'vendedor.apellido', 'vendedor.direccion', 'vendedor.fax', 'vendedor.telefono',
                'vendedor.celular', 'vendedor.email', 'vendedor.fechanacimiento', 'vendedor.genero', 'vendedor.estadocivil',
                'vendedor.imagen', 'vendedor.extension', 'vendedor.isdelete', 'vendedor.estado', 'vendedor.fecha', 'vendedor.hora',
                'ciupais.idciudad as idciudadpais', 'ciupais.descripcion as ciudadpais',
                'ciu.idciudad', 'ciu.descripcion as ciudad',
                'comivta.idcomisionventa', 'comivta.descripcion as comisionventa', 'comivta.valor'
            ] )
            ->leftJoin('ciudad as ciupais', 'vendedor.fkidciudadpais', '=', 'ciupais.idciudad')
            ->leftJoin('ciudad as ciu', 'vendedor.fkidciudad', '=', 'ciu.idciudad')
            ->leftJoin('comisionventa as comivta', 'vendedor.fkidcomisionventa', '=', 'comivta.idcomisionventa')
            ->where('vendedor.idvendedor', '=', $idvendedor)
            ->whereNull('vendedor.deleted_at')
            ->orderBy('vendedor.idvendedor', 'DESC')
            ->first();

        return $vendedor;
    }

    public function show( $query, $idvendedor ) {

        $vendedor = $query
            ->select( [
                'vendedor.idvendedor', 'vendedor.fkidciudadpais', 'vendedor.fkidciudad', 'vendedor.fkidcomisionventa',
                'vendedor.codigo', 'vendedor.ci', 'vendedor.nombre', 'vendedor.apellido', 'vendedor.direccion', 'vendedor.fax', 'vendedor.telefono',
                'vendedor.celular', 'vendedor.email', 'vendedor.fechanacimiento', 'vendedor.genero', 'vendedor.estadocivil',
                'vendedor.imagen', 'vendedor.extension', 'vendedor.isdelete', 'vendedor.estado', 'vendedor.fecha', 'vendedor.hora',
                'ciupais.idciudad as idciudadpais', 'ciupais.descripcion as ciudadpais',
                'ciu.idciudad', 'ciu.descripcion as ciudad',
                'comivta.idcomisionventa', 'comivta.descripcion as comisionventa', 'comivta.valor'
            ] )
            ->leftJoin('ciudad as ciupais', 'vendedor.fkidciudadpais', '=', 'ciupais.idciudad')
            ->leftJoin('ciudad as ciu', 'vendedor.fkidciudad', '=', 'ciu.idciudad')
            ->leftJoin('comisionventa as comivta', 'vendedor.fkidcomisionventa', '=', 'comivta.idcomisionventa')
            ->where( 'vendedor.idvendedor', '=', $idvendedor )
            ->whereNull('vendedor.deleted_at')
            ->orderBy('vendedor.idvendedor', 'DESC')
            ->first();

        return $vendedor;
    }
}
