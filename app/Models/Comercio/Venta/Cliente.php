<?php

namespace App\Models\Comercio\Venta;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Cliente extends Model
{
    use SoftDeletes;

    protected $table      = 'cliente';
    protected $primaryKey = 'idcliente';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'fkidconceptoventa' => null, 'fkidsucursal' => null,
        'codigo' => null, 'razonsocial' => null, 'nit' => null, 'email' => null, 'casilla' => null,
        'fax' => null, 'telefono' => null, 'celular' => null, 'contacto' => null, 'direccion' => null,
        'diascredito' => 0, 'limitecredito' => 0, 'descuento' => 0, 'cantidaditems' => 0, 'descuentoxcantidaditems' => 0,
        'descuentoinicial' => 0, 'descuentofinal' => 0,
        'montototaladeudado' => 0, 'fechaultimopago' => null, 'montototaladeudadoultimopago' => 0, 'fechaultimaventa' => null, 'montototalultimaventa' => 0,
        'imagen' => null, 'extension' => null, 'tipopersoneria' => 'S',
        'estado' => 'A',  'isdelete' => 'A', 'x_idusuario' => null,
    ];

    protected $fillable = [
        'fkidciudadpais', 'fkidciudad', 'fkidclientetipo', 'fkidlistaprecio', 'fkidconceptoventa', 'fkidsucursal',
        'codigo', 'nombre', 'apellido', 'razonsocial', 'nit', 'email', 'casilla', 'fax', 'telefono', 'celular',
        'contacto', 'direccion', 'diascredito', 'limitecredito',
        'descuento', 'cantidaditems', 'descuentoxcantidaditems', 'descuentoinicial', 'descuentofinal',
        'montototaladeudado', 'fechaultimopago', 'montototaladeudadoultimopago', 'fechaultimaventa', 'montototalultimaventa',
        'imagen', 'extension', 'tipopersoneria',
        'fecha', 'hora', 'estado', 'isdelete', 'x_idusuario',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'cliente.idcliente';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $cliente = $query
            ->select( [
                'cliente.fkidciudadpais', 'cliente.fkidciudad', 'cliente.fkidclientetipo', 'cliente.fkidlistaprecio', 'cliente.fkidconceptoventa', 'cliente.fkidsucursal',
                'cliente.codigo', 'cliente.nombre', 'cliente.apellido', 'cliente.razonsocial', 'cliente.nit', 'cliente.email', 'cliente.casilla', 'cliente.fax', 'cliente.telefono', 'cliente.celular',
                'cliente.contacto', 'cliente.direccion', 'cliente.diascredito', 'cliente.limitecredito',
                'cliente.descuento', 'cliente.cantidaditems', 'cliente.descuentoxcantidaditems', 'cliente.descuentoinicial', 'cliente.descuentofinal',
                'cliente.montototaladeudado', 'cliente.fechaultimopago', 'cliente.montototaladeudadoultimopago', 'cliente.fechaultimaventa', 'cliente.montototalultimaventa',
                'cliente.imagen', 'cliente.extension', 'cliente.tipopersoneria',
                'cliente.estado', 'cliente.isdelete', 'cliente.fecha', 'cliente.hora',
                'ciupais.idciudad as idciudadpais', 'ciupais.descripcion as ciudadpais',
                'ciu.idciudad', 'ciu.descripcion as ciudad',
                'tipo.idclientetipo', 'tipo.descripcion as tipocliente',
                'cliente.idcliente',
            ] )
            ->leftJoin('ciudad as ciupais', 'cliente.fkidciudadpais', '=', 'ciupais.idciudad')
            ->leftJoin('ciudad as ciu', 'cliente.fkidciudad', '=', 'ciu.idciudad')
            ->leftJoin('clientetipo as tipo', 'cliente.fkidclientetipo', '=', 'tipo.idclientetipo')
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('cliente.idcliente', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('cliente.codigo', $islike, '%' . $search . '%')
                        ->orWhere('cliente.nombre', $islike, '%' . $search . '%')
                        ->orWhere('cliente.apellido', $islike, '%' . $search . '%')
                        ->orWhere('cliente.razonsocial', $islike, '%' . $search . '%')
                        ->orWhere('cliente.nit', $islike, '%' . $search . '%')
                        ->orWhere('cliente.email', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'cliente.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $cliente;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'cliente.idcliente';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $cliente = $query
            ->select( [
                'cliente.fkidciudadpais', 'cliente.fkidciudad', 'cliente.fkidclientetipo', 'cliente.fkidlistaprecio', 'cliente.fkidconceptoventa', 'cliente.fkidsucursal',
                'cliente.codigo', 'cliente.nombre', 'cliente.apellido', 'cliente.razonsocial', 'cliente.nit', 'cliente.email', 'cliente.casilla', 'cliente.fax', 'cliente.telefono', 'cliente.celular',
                'cliente.contacto', 'cliente.direccion', 'cliente.diascredito', 'cliente.limitecredito',
                'cliente.descuento', 'cliente.cantidaditems', 'cliente.descuentoxcantidaditems', 'cliente.descuentoinicial', 'cliente.descuentofinal',
                'cliente.montototaladeudado', 'cliente.fechaultimopago', 'cliente.montototaladeudadoultimopago', 'cliente.fechaultimaventa', 'cliente.montototalultimaventa',
                'cliente.imagen', 'cliente.extension', 'cliente.tipopersoneria',
                'cliente.estado', 'cliente.isdelete', 'cliente.fecha', 'cliente.hora',
                'ciupais.idciudad as idciudadpais', 'ciupais.descripcion as ciudadpais',
                'ciu.idciudad', 'ciu.descripcion as ciudad',
                'tipo.idclientetipo', 'tipo.descripcion as tipocliente',
                'cliente.idcliente',
            ] )
            ->leftJoin('ciudad as ciupais', 'cliente.fkidciudadpais', '=', 'ciupais.idciudad')
            ->leftJoin('ciudad as ciu', 'cliente.fkidciudad', '=', 'ciu.idciudad')
            ->leftJoin('clientetipo as tipo', 'cliente.fkidclientetipo', '=', 'tipo.idclientetipo')
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('cliente.idcliente', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('cliente.codigo', $islike, '%' . $search . '%')
                        ->orWhere('cliente.nombre', $islike, '%' . $search . '%')
                        ->orWhere('cliente.apellido', $islike, '%' . $search . '%')
                        ->orWhere('cliente.razonsocial', $islike, '%' . $search . '%')
                        ->orWhere('cliente.nit', $islike, '%' . $search . '%')
                        ->orWhere('cliente.email', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'cliente.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $cliente;
    }

    public function newID( )
    {
        $cliente = DB::table('cliente')
            ->select('cliente.idcliente')
            ->orderBy('cliente.idcliente', 'DESC')
            ->first();

        return ( is_null( $cliente ) ) ? 1 : intval( $cliente->idcliente ) + 1;
    }

    public function store( $query, $request )
    {
        $fkidciudadpais   = isset( $request->fkidciudadpais ) ? $request->fkidciudadpais : null;
        $fkidciudad       = isset( $request->fkidciudad ) ? $request->fkidciudad : null;
        $fkidclientetipo  = isset( $request->fkidclientetipo ) ? $request->fkidclientetipo : null;
        $fkidlistaprecio  = isset( $request->fkidlistaprecio ) ? $request->fkidlistaprecio : null;
        $fkidconceptoventa = isset( $request->fkidconceptoventa ) ? $request->fkidconceptoventa : null;
        $fkidsucursal  = isset( $request->fkidsucursal ) ? $request->fkidsucursal : null;

        $codigo = isset( $request->codigo ) ? $request->codigo : null;
        $nombre = isset( $request->nombre ) ? $request->nombre : null;
        $apellido = isset( $request->apellido ) ? $request->apellido : null;
        $razonsocial = isset( $request->razonsocial ) ? $request->razonsocial : null;
        $nit = isset( $request->nit ) ? $request->nit : "0";
        $email = isset( $request->email ) ? $request->email : null;
        $casilla = isset( $request->casilla ) ? $request->casilla : null;
        $fax = isset( $request->fax ) ? $request->fax : null;
        $telefono = isset( $request->telefono ) ? $request->telefono : null;
        $celular = isset( $request->celular ) ? $request->celular : null;
        $contacto = isset( $request->contacto ) ? $request->contacto : null;
        $direccion = isset( $request->direccion ) ? $request->direccion : null;

        $diascredito = isset( $request->diascredito ) ? $request->diascredito : 0;
        $limitecredito = isset( $request->limitecredito ) ? $request->limitecredito : 0;
        $descuento = isset( $request->descuento ) ? $request->descuento : 0;
        $cantidaditems = isset( $request->cantidaditems ) ? $request->cantidaditems : 0;
        $descuentoxcantidaditems = isset( $request->descuentoxcantidaditems ) ? $request->descuentoxcantidaditems : 0;
        $descuentoinicial = isset( $request->descuentoinicial ) ? $request->descuentoinicial : 0;
        $descuentofinal = isset( $request->descuentofinal ) ? $request->descuentofinal : 0;

        $montototaladeudado = isset( $request->montototaladeudado ) ? $request->montototaladeudado : 0;
        $fechaultimopago = isset( $request->fechaultimopago ) ? $request->fechaultimopago : null;
        $montototaladeudadoultimopago = isset( $request->montototaladeudadoultimopago ) ? $request->montototaladeudadoultimopago : 0;
        $fechaultimaventa = isset( $request->fechaultimaventa ) ? $request->fechaultimaventa : null;
        $montototalultimaventa = isset( $request->montototalultimaventa ) ? $request->montototalultimaventa : 0;

        $tipopersoneria = isset( $request->tipopersoneria ) ? $request->tipopersoneria : 'S';
        $imagen = isset( $request->imagen ) ? $request->imagen : null;
        $extension = isset( $request->extension ) ? $request->extension : null;

        $x_idusuario = isset( $request->x_idusuario ) ? $request->x_idusuario : null;
        $estado = isset( $request->estado ) ? $request->estado : "A";

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $cliente = $query->create( [
            'fkidciudadpais' => $fkidciudadpais,
            'fkidciudad' => $fkidciudad,
            'fkidclientetipo' => $fkidclientetipo,
            'fkidlistaprecio' => $fkidlistaprecio,
            'fkidconceptoventa' => $fkidconceptoventa,
            'fkidsucursal' => $fkidsucursal,

            'codigo' => $codigo,
            'nombre' => $nombre,
            'apellido' => $apellido,
            'razonsocial' => $razonsocial,
            'nit' => $nit,
            'email' => $email,
            'casilla' => $casilla,
            'fax' => $fax,
            'telefono' => $telefono,
            'celular' => $celular,
            'contacto' => $contacto,
            'direccion' => $direccion,

            'diascredito' => $diascredito,
            'limitecredito' => $limitecredito,
            'descuento' => $descuento,
            'cantidaditems' => $cantidaditems,
            'descuentoxcantidaditems' => $descuentoxcantidaditems,
            'descuentoinicial' => $descuentoinicial,
            'descuentofinal' => $descuentofinal,

            'montototaladeudado' => $montototaladeudado,
            'fechaultimopago' => $fechaultimopago,
            'montototaladeudadoultimopago' => $montototaladeudadoultimopago,
            'fechaultimaventa' => $fechaultimaventa,
            'montototalultimaventa' => $montototalultimaventa,

            'tipopersoneria' => $tipopersoneria,
            'x_idusuario' => $x_idusuario,
            'estado' => $estado,

            'imagen'    => $imagen,
            'extension' => $extension,

            'fecha'     => $fecha,
            'hora'      => $hora
        ] );

        return $cliente;
    }

    public function upgrade( $query, $request )
    {
        $idcliente = isset( $request->idcliente ) ? $request->idcliente : null;
        $fkidciudadpais   = isset( $request->fkidciudadpais ) ? $request->fkidciudadpais : null;
        $fkidciudad       = isset( $request->fkidciudad ) ? $request->fkidciudad : null;
        $fkidclientetipo  = isset( $request->fkidclientetipo ) ? $request->fkidclientetipo : null;
        $fkidlistaprecio  = isset( $request->fkidlistaprecio ) ? $request->fkidlistaprecio : null;
        $fkidconceptoventa = isset( $request->fkidconceptoventa ) ? $request->fkidconceptoventa : null;
        $fkidsucursal  = isset( $request->fkidsucursal ) ? $request->fkidsucursal : null;

        $codigo = isset( $request->codigo ) ? $request->codigo : null;
        $nombre = isset( $request->nombre ) ? $request->nombre : null;
        $apellido = isset( $request->apellido ) ? $request->apellido : null;
        $razonsocial = isset( $request->razonsocial ) ? $request->razonsocial : null;
        $nit = isset( $request->nit ) ? $request->nit : "0";
        $email = isset( $request->email ) ? $request->email : null;
        $casilla = isset( $request->casilla ) ? $request->casilla : null;
        $fax = isset( $request->fax ) ? $request->fax : null;
        $telefono = isset( $request->telefono ) ? $request->telefono : null;
        $celular = isset( $request->celular ) ? $request->celular : null;
        $contacto = isset( $request->contacto ) ? $request->contacto : null;
        $direccion = isset( $request->direccion ) ? $request->direccion : null;

        $diascredito = isset( $request->diascredito ) ? $request->diascredito : 0;
        $limitecredito = isset( $request->limitecredito ) ? $request->limitecredito : 0;
        $descuento = isset( $request->descuento ) ? $request->descuento : 0;
        $cantidaditems = isset( $request->cantidaditems ) ? $request->cantidaditems : 0;
        $descuentoxcantidaditems = isset( $request->descuentoxcantidaditems ) ? $request->descuentoxcantidaditems : 0;
        $descuentoinicial = isset( $request->descuentoinicial ) ? $request->descuentoinicial : 0;
        $descuentofinal = isset( $request->descuentofinal ) ? $request->descuentofinal : 0;

        $montototaladeudado = isset( $request->montototaladeudado ) ? $request->montototaladeudado : 0;
        $fechaultimopago = isset( $request->fechaultimopago ) ? $request->fechaultimopago : null;
        $montototaladeudadoultimopago = isset( $request->montototaladeudadoultimopago ) ? $request->montototaladeudadoultimopago : 0;
        $fechaultimaventa = isset( $request->fechaultimaventa ) ? $request->fechaultimaventa : null;
        $montototalultimaventa = isset( $request->montototalultimaventa ) ? $request->montototalultimaventa : 0;

        $tipopersoneria = isset( $request->tipopersoneria ) ? $request->tipopersoneria : 'S';
        $imagen = isset( $request->imagen ) ? $request->imagen : null;
        $extension = isset( $request->extension ) ? $request->extension : null;

        $x_idusuario = isset( $request->x_idusuario ) ? $request->x_idusuario : null;
        $estado = isset( $request->estado ) ? $request->estado : "A";

        $cliente = $query->where( 'idcliente', '=', $idcliente )
            ->update( [
                'fkidciudadpais' => $fkidciudadpais,
                'fkidciudad' => $fkidciudad,
                'fkidclientetipo' => $fkidclientetipo,
                'fkidlistaprecio' => $fkidlistaprecio,
                'fkidconceptoventa' => $fkidconceptoventa,
                'fkidsucursal' => $fkidsucursal,

                'codigo' => $codigo,
                'nombre' => $nombre,
                'apellido' => $apellido,
                'razonsocial' => $razonsocial,
                'nit' => $nit,
                'email' => $email,
                'casilla' => $casilla,
                'fax' => $fax,
                'telefono' => $telefono,
                'celular' => $celular,
                'contacto' => $contacto,
                'direccion' => $direccion,

                'diascredito' => $diascredito,
                'limitecredito' => $limitecredito,
                'descuento' => $descuento,
                'cantidaditems' => $cantidaditems,
                'descuentoxcantidaditems' => $descuentoxcantidaditems,
                'descuentoinicial' => $descuentoinicial,
                'descuentofinal' => $descuentofinal,

                'montototaladeudado' => $montototaladeudado,
                'fechaultimopago' => $fechaultimopago,
                'montototaladeudadoultimopago' => $montototaladeudadoultimopago,
                'fechaultimaventa' => $fechaultimaventa,
                'montototalultimaventa' => $montototalultimaventa,

                'tipopersoneria' => $tipopersoneria,
                'x_idusuario' => $x_idusuario,
                'estado' => $estado,

                'imagen'    => $imagen,
                'extension' => $extension,
            ] );

        return $cliente;
    }

    public function show( $query, $idcliente ) {

        $cliente = $query
            ->select( [
                'cliente.fkidciudadpais', 'cliente.fkidciudad', 'cliente.fkidclientetipo', 'cliente.fkidlistaprecio', 'cliente.fkidconceptoventa', 'cliente.fkidsucursal',
                'cliente.codigo', 'cliente.nombre', 'cliente.apellido', 'cliente.razonsocial', 'cliente.nit', 'cliente.email', 'cliente.casilla', 'cliente.fax', 'cliente.telefono', 'cliente.celular',
                'cliente.contacto', 'cliente.direccion', 'cliente.diascredito', 'cliente.limitecredito',
                'cliente.descuento', 'cliente.cantidaditems', 'cliente.descuentoxcantidaditems', 'cliente.descuentoinicial', 'cliente.descuentofinal',
                'cliente.montototaladeudado', 'cliente.fechaultimopago', 'cliente.montototaladeudadoultimopago', 'cliente.fechaultimaventa', 'cliente.montototalultimaventa',
                'cliente.imagen', 'cliente.extension', 'cliente.tipopersoneria',
                'cliente.estado', 'cliente.isdelete', 'cliente.fecha', 'cliente.hora',
                'ciupais.idciudad as idciudadpais', 'ciupais.descripcion as ciudadpais',
                'ciu.idciudad', 'ciu.descripcion as ciudad',
                'tipo.idclientetipo', 'tipo.descripcion as tipocliente',
                'cliente.idcliente',
            ] )
            ->leftJoin('ciudad as ciupais', 'cliente.fkidciudadpais', '=', 'ciupais.idciudad')
            ->leftJoin('ciudad as ciu', 'cliente.fkidciudad', '=', 'ciu.idciudad')
            ->leftJoin('clientetipo as tipo', 'cliente.fkidclientetipo', '=', 'tipo.idclientetipo')
            ->where( 'cliente.idcliente', '=', $idcliente )
            ->whereNull('cliente.deleted_at')
            ->orderBy('cliente.idcliente', 'DESC')
            ->first();

        return $cliente;
    }

    public function scopeEnable( $query, $request )
    {
        $idcliente = $request->idcliente;
        $query->where('idcliente', '=', $idcliente)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idcliente = $request->idcliente;
        $query->where('idcliente', '=', $idcliente)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idcliente = $request->idcliente;
        $query->where('idcliente', '=', $idcliente)->delete();
    }

    public function searchByID( $query, $idcliente ) {
        $cliente = $query
            ->select( [
                'cliente.fkidciudadpais', 'cliente.fkidciudad', 'cliente.fkidclientetipo', 'cliente.fkidlistaprecio', 'cliente.fkidconceptoventa', 'cliente.fkidsucursal',
                'cliente.codigo', 'cliente.nombre', 'cliente.apellido', 'cliente.razonsocial', 'cliente.nit', 'cliente.email', 'cliente.casilla', 'cliente.fax', 'cliente.telefono', 'cliente.celular',
                'cliente.contacto', 'cliente.direccion', 'cliente.diascredito', 'cliente.limitecredito',
                'cliente.descuento', 'cliente.cantidaditems', 'cliente.descuentoxcantidaditems', 'cliente.descuentoinicial', 'cliente.descuentofinal',
                'cliente.montototaladeudado', 'cliente.fechaultimopago', 'cliente.montototaladeudadoultimopago', 'cliente.fechaultimaventa', 'cliente.montototalultimaventa',
                'cliente.imagen', 'cliente.extension', 'cliente.tipopersoneria',
                'cliente.estado', 'cliente.isdelete', 'cliente.fecha', 'cliente.hora',
                'ciupais.idciudad as idciudadpais', 'ciupais.descripcion as ciudadpais',
                'ciu.idciudad', 'ciu.descripcion as ciudad',
                'tipo.idclientetipo', 'tipo.descripcion as tipocliente',
                'cliente.idcliente',
            ] )
            ->leftJoin('ciudad as ciupais', 'cliente.fkidciudadpais', '=', 'ciupais.idciudad')
            ->leftJoin('ciudad as ciu', 'cliente.fkidciudad', '=', 'ciu.idciudad')
            ->leftJoin('clientetipo as tipo', 'cliente.fkidclientetipo', '=', 'tipo.idclientetipo')
            ->where('cliente.idcliente', '=', $idcliente)
            ->whereNull('cliente.deleted_at')
            ->orderBy('cliente.idcliente', 'DESC')
            ->first();

        return $cliente;
    }

    public function searchByNit( $query, $nit ) {
        $islike =  Functions::isLikeAndIlike();

        $cliente = $query
            ->select( [
                'cliente.fkidciudadpais', 'cliente.fkidciudad', 'cliente.fkidclientetipo', 'cliente.fkidlistaprecio', 'cliente.fkidconceptoventa', 'cliente.fkidsucursal',
                'cliente.codigo', 'cliente.nombre', 'cliente.apellido', 'cliente.razonsocial', 'cliente.nit', 'cliente.email', 'cliente.casilla', 'cliente.fax', 'cliente.telefono', 'cliente.celular',
                'cliente.contacto', 'cliente.direccion', 'cliente.diascredito', 'cliente.limitecredito',
                'cliente.descuento', 'cliente.cantidaditems', 'cliente.descuentoxcantidaditems', 'cliente.descuentoinicial', 'cliente.descuentofinal',
                'cliente.montototaladeudado', 'cliente.fechaultimopago', 'cliente.montototaladeudadoultimopago', 'cliente.fechaultimaventa', 'cliente.montototalultimaventa',
                'cliente.imagen', 'cliente.extension', 'cliente.tipopersoneria',
                'cliente.estado', 'cliente.isdelete', 'cliente.fecha', 'cliente.hora',
                'ciupais.idciudad as idciudadpais', 'ciupais.descripcion as ciudadpais',
                'ciu.idciudad', 'ciu.descripcion as ciudad',
                'tipo.idclientetipo', 'tipo.descripcion as tipocliente',
                'cliente.idcliente',
            ] )
            ->leftJoin('ciudad as ciupais', 'cliente.fkidciudadpais', '=', 'ciupais.idciudad')
            ->leftJoin('ciudad as ciu', 'cliente.fkidciudad', '=', 'ciu.idciudad')
            ->leftJoin('clientetipo as tipo', 'cliente.fkidclientetipo', '=', 'tipo.idclientetipo')
            ->where( 'cliente.nit', $islike, $nit )
            ->whereNull('cliente.deleted_at')
            ->orderBy('cliente.idcliente', 'DESC')
            ->get();

        return $cliente;
    }
}
