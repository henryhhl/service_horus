<?php

namespace App\Models\Comercio\Compra;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Proveedor extends Model
{
    use SoftDeletes;

    protected $table      = 'proveedor';
    protected $primaryKey = 'idproveedor';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'estado' => 'A', 'codigo' => null, 'direccion' => null, 'nit' => null,
        'telefono' => null, 'celular' => null, 'fax' => null, 'email' => null,
        'sitioweb' => null, 'nroorden' => '0', 'diascredito' => '0', 'formadepago' => null,
        'imagen' => null, 'extension' => null, 'fechaalta' => null, 'fechabaja' => null,
        'contacto' => null,
    ];

    protected $fillable = [
        'fkidciudadpais', 'fkidciudad', 'fkidproveedortipo', 'fkidproveedorgrupo',
        'codigo', 'nombre', 'direccion', 'nit', 'telefono', 'celular', 'fax', 'email',
        'sitioweb', 'nroorden', 'diascredito', 'formadepago', 'tipopersoneria',
        'imagen', 'extension', 'fechaalta', 'fechabaja', 'contacto',
        'estado', 'fecha', 'hora',
    ];

    public function arraynotacompra() {
        return $this->hasMany(
            'App\Models\Comercio\Compra\NotaCompra',
            'fkidproveedor',
            'idproveedor'
        );
    }

    public function arrayproveedorproductotipo() {
        return $this->hasMany(
            'App\Models\Comercio\Compra\ProveedorProductoTipo',
            'fkidproveedor',
            'idproveedor'
        );
    }

    public function arrayproveedorpersonal() {
        return $this->hasMany(
            'App\Models\Comercio\Compra\ProveedorPersonal',
            'fkidproveedor',
            'idproveedor'
        );
    }

    public function arrayproveedorproducto() {
        return $this->hasMany(
            'App\Models\Comercio\Compra\ProveedorProducto',
            'fkidproveedor',
            'idproveedor'
        );
    }

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'proveedor.idproveedor';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $proveedor = $query
            ->leftJoin('ciudad as ciupais', 'proveedor.fkidciudadpais', '=', 'ciupais.idciudad')
            ->leftJoin('ciudad as ciu', 'proveedor.fkidciudad', '=', 'ciu.idciudad')
            ->leftJoin('proveedortipo as provtipo', 'proveedor.fkidproveedortipo', '=', 'provtipo.idproveedortipo')
            ->leftJoin('proveedorgrupo as provgrupo', 'proveedor.fkidproveedorgrupo', '=', 'provgrupo.idproveedorgrupo')
            ->select( [
                'proveedor.idproveedor', 'proveedor.codigo', 'proveedor.nombre', 'proveedor.direccion', 'proveedor.nit',
                'proveedor.telefono', 'proveedor.celular', 'proveedor.fax', 'proveedor.email', 'proveedor.sitioweb',
                'proveedor.nroorden', 'proveedor.diascredito', 'proveedor.formadepago', 'proveedor.tipopersoneria',
                'proveedor.imagen', 'proveedor.extension', 'proveedor.fechaalta', 'proveedor.fechabaja', 'proveedor.contacto',
                'proveedor.fkidciudadpais', 'ciupais.descripcion as ciudadpais',
                'proveedor.fkidciudad', 'ciu.descripcion as ciudad',
                'proveedor.fkidproveedortipo', 'provtipo.descripcion as proveedortipo',
                'proveedor.fkidproveedorgrupo', 'provgrupo.descripcion as proveedorgrupo',
                'proveedor.estado', 'proveedor.fecha', 'proveedor.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('proveedor.idproveedor', '=', $search)
                        ->orWhere('proveedor.codigo', $islike, '%' . $search . '%')
                        ->orWhere('proveedor.nombre', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('proveedor.codigo', $islike, '%' . $search . '%')
                        ->orWhere('proveedor.nombre', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'arrayproveedorproducto' => function( $query ) {
                $query
                    ->leftJoin('producto as prod', 'proveedorproducto.fkidproducto', '=', 'prod.idproducto')
                    ->select( [
                        'prod.idproducto', 'prod.nombre as producto',
                        'proveedorproducto.idproveedorproducto', 'proveedorproducto.fkidproveedor', 'proveedorproducto.fkidproducto',
                        'proveedorproducto.costounitario', 'proveedorproducto.stock',
                    ] )
                    ->orderBy('proveedorproducto.idproveedorproducto');
            } ] )
            ->with( [ 'arrayproveedorproductotipo' => function( $query ) {
                $query
                    ->leftJoin('productotipo as prodtipo', 'proveedorproductotipo.fkidproductotipo', '=', 'prodtipo.idproductotipo')
                    ->select( [
                        'prodtipo.descripcion as productotipo', 'proveedorproductotipo.fkidproductotipo',
                        'proveedorproductotipo.fkidproveedor','proveedorproductotipo.idproveedorproductotipo',
                    ] )
                    ->orderBy('proveedorproductotipo.idproveedorproductotipo');
            } ] )
            ->with( [ 'arrayproveedorpersonal' => function( $query ) {
                $query
                    ->leftJoin('proveedorcargo as provcargo', 'proveedorpersonal.fkidproveedorcargo', '=', 'provcargo.idproveedorcargo')
                    ->select( [
                        'provcargo.descripcion as proveedorcargo', 'proveedorpersonal.fkidproveedorcargo',
                        'proveedorpersonal.codigo', 'proveedorpersonal.nombre', 'proveedorpersonal.apellido', 'proveedorpersonal.celular',
                        'proveedorpersonal.telefono', 'proveedorpersonal.email', 'proveedorpersonal.imagen', 'proveedorpersonal.extension',
                        'proveedorpersonal.fkidproveedor','proveedorpersonal.idproveedorpersonal',
                    ] )
                    ->orderBy('proveedorpersonal.idproveedorpersonal');
            } ] )
            ->whereNull( 'proveedor.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $proveedor;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'proveedor.idproveedor';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $proveedor = $query
            ->leftJoin('ciudad as ciupais', 'proveedor.fkidciudadpais', '=', 'ciupais.idciudad')
            ->leftJoin('ciudad as ciu', 'proveedor.fkidciudad', '=', 'ciu.idciudad')
            ->leftJoin('proveedortipo as provtipo', 'proveedor.fkidproveedortipo', '=', 'provtipo.idproveedortipo')
            ->leftJoin('proveedorgrupo as provgrupo', 'proveedor.fkidproveedorgrupo', '=', 'provgrupo.idproveedorgrupo')
            ->select( [
                'proveedor.idproveedor', 'proveedor.codigo', 'proveedor.nombre', 'proveedor.direccion', 'proveedor.nit',
                'proveedor.telefono', 'proveedor.celular', 'proveedor.fax', 'proveedor.email', 'proveedor.sitioweb',
                'proveedor.nroorden', 'proveedor.diascredito', 'proveedor.formadepago', 'proveedor.tipopersoneria',
                'proveedor.imagen', 'proveedor.extension', 'proveedor.fechaalta', 'proveedor.fechabaja', 'proveedor.contacto',
                'proveedor.fkidciudadpais', 'ciupais.descripcion as ciudadpais',
                'proveedor.fkidciudad', 'ciu.descripcion as ciudad',
                'proveedor.fkidproveedortipo', 'provtipo.descripcion as proveedortipo',
                'proveedor.fkidproveedorgrupo', 'provgrupo.descripcion as proveedorgrupo',
                'proveedor.estado', 'proveedor.fecha', 'proveedor.hora'
            ] )
            ->where( function ( $query ) use ($search, $islike) {
                if ( is_numeric( $search ) ) {
                    return $query
                        ->where('proveedor.idproveedor', '=', $search)
                        ->orWhere('proveedor.codigo', $islike, '%' . $search . '%')
                        ->orWhere('proveedor.nombre', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('proveedor.codigo', $islike, '%' . $search . '%')
                        ->orWhere('proveedor.nombre', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'arrayproveedorproducto' => function( $query ) {
                $query
                    ->leftJoin('producto as prod', 'proveedorproducto.fkidproducto', '=', 'prod.idproducto')
                    ->select( [
                        'prod.idproducto', 'prod.nombre as producto',
                        'proveedorproducto.idproveedorproducto', 'proveedorproducto.fkidproveedor', 'proveedorproducto.fkidproducto',
                        'proveedorproducto.costounitario', 'proveedorproducto.stock',
                    ] )
                    ->orderBy('proveedorproducto.idproveedorproducto');
            } ] )
            ->with( [ 'arrayproveedorproductotipo' => function( $query ) {
                $query
                    ->leftJoin('productotipo as prodtipo', 'proveedorproductotipo.fkidproductotipo', '=', 'prodtipo.idproductotipo')
                    ->select( [
                        'prodtipo.descripcion as productotipo', 'proveedorproductotipo.fkidproductotipo',
                        'proveedorproductotipo.fkidproveedor','proveedorproductotipo.idproveedorproductotipo',
                    ] )
                    ->orderBy('proveedorproductotipo.idproveedorproductotipo');
            } ] )
            ->with( [ 'arrayproveedorpersonal' => function( $query ) {
                $query
                    ->leftJoin('proveedorcargo as provcargo', 'proveedorpersonal.fkidproveedorcargo', '=', 'provcargo.idproveedorcargo')
                    ->select( [
                        'provcargo.descripcion as proveedorcargo', 'proveedorpersonal.fkidproveedorcargo',
                        'proveedorpersonal.codigo', 'proveedorpersonal.nombre', 'proveedorpersonal.apellido', 'proveedorpersonal.celular',
                        'proveedorpersonal.telefono', 'proveedorpersonal.email', 'proveedorpersonal.imagen', 'proveedorpersonal.extension',
                        'proveedorpersonal.fkidproveedor','proveedorpersonal.idproveedorpersonal',
                    ] )
                    ->orderBy('proveedorpersonal.idproveedorpersonal');
            } ] )
            ->whereNull( 'proveedor.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $proveedor;
    }

    public function newID( )
    {
        $proveedor = DB::table('proveedor')
            ->select('proveedor.idproveedor')
            ->orderBy('proveedor.idproveedor', 'DESC')
            ->first();

        return ( is_null( $proveedor ) ) ? 1 : intval( $proveedor->idproveedor ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo    = isset( $request->codigo )    ? $request->codigo : null;
        $nombre    = isset( $request->nombre )    ? $request->nombre : null;
        $direccion = isset( $request->direccion ) ? $request->direccion : null;
        $nit       = isset( $request->nit )       ? $request->nit : null;

        $telefono = isset( $request->telefono ) ? $request->telefono : null;
        $celular  = isset( $request->celular )  ? $request->celular : null;
        $fax      = isset( $request->fax )      ? $request->fax : null;
        $contacto = isset( $request->contacto ) ? $request->contacto : null;
        $email    = isset( $request->email )    ? $request->email : null;
        $sitioweb = isset( $request->sitioweb ) ? $request->sitioweb : null;

        $nroorden       = isset( $request->nroorden )       ? $request->nroorden : null;
        $diascredito    = isset( $request->diascredito )    ? $request->diascredito : null;
        $formadepago    = isset( $request->formadepago )    ? $request->formadepago : null;
        $tipopersoneria = isset( $request->tipopersoneria ) ? $request->tipopersoneria : null;

        $imagen    = isset( $request->imagen )    ? $request->imagen : null;
        $extension = isset( $request->extension ) ? $request->extension : null;
        $fechaalta = isset( $request->fechaalta ) ? $request->fechaalta : null;
        $fechabaja = isset( $request->fechabaja ) ? $request->fechabaja : null;

        $fkidciudadpais     = isset( $request->fkidciudadpais )     ? $request->fkidciudadpais : null;
        $fkidciudad         = isset( $request->fkidciudad )         ? $request->fkidciudad : null;
        $fkidproveedortipo  = isset( $request->fkidproveedortipo )  ? $request->fkidproveedortipo : null;
        $fkidproveedorgrupo = isset( $request->fkidproveedorgrupo ) ? $request->fkidproveedorgrupo : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $proveedor = $query->create( [
            'codigo'    => $codigo,
            'nombre'    => $nombre,
            'direccion' => $direccion,
            'fkidciudadpais'     => $fkidciudadpais,
            'fkidciudad'         => $fkidciudad,
            'fkidproveedortipo'  => $fkidproveedortipo,
            'fkidproveedorgrupo' => $fkidproveedorgrupo,
            'nit' => $nit,
            'telefono' => $telefono,
            'celular'  => $celular,
            'fax'      => $fax,
            'contacto' => $contacto,
            'email'    => $email,
            'sitioweb' => $sitioweb,
            'nroorden'       => $nroorden,
            'diascredito'    => $diascredito,
            'formadepago'    => $formadepago,
            'tipopersoneria' => $tipopersoneria,
            'imagen'    => $imagen,
            'extension' => $extension,
            'fechaalta' => $fechaalta,
            'fechabaja' => $fechabaja,
            'fecha'  => $fecha,
            'hora'   => $hora,
        ] );

        return $proveedor;
    }

    public function upgrade( $query, $request )
    {
        $idproveedor = isset( $request->idproveedor ) ? $request->idproveedor : null;

        $codigo    = isset( $request->codigo )    ? $request->codigo : null;
        $nombre    = isset( $request->nombre )    ? $request->nombre : null;
        $direccion = isset( $request->direccion ) ? $request->direccion : null;
        $nit       = isset( $request->nit )       ? $request->nit : null;

        $telefono = isset( $request->telefono ) ? $request->telefono : null;
        $celular  = isset( $request->celular )  ? $request->celular : null;
        $fax      = isset( $request->fax )      ? $request->fax : null;
        $contacto = isset( $request->contacto ) ? $request->contacto : null;
        $email    = isset( $request->email )    ? $request->email : null;
        $sitioweb = isset( $request->sitioweb ) ? $request->sitioweb : null;

        $nroorden       = isset( $request->nroorden )       ? $request->nroorden : null;
        $diascredito    = isset( $request->diascredito )    ? $request->diascredito : null;
        $formadepago    = isset( $request->formadepago )    ? $request->formadepago : null;
        $tipopersoneria = isset( $request->tipopersoneria ) ? $request->tipopersoneria : null;

        $imagen    = isset( $request->imagen )    ? $request->imagen : null;
        $extension = isset( $request->extension ) ? $request->extension : null;
        $fechaalta = isset( $request->fechaalta ) ? $request->fechaalta : null;
        $fechabaja = isset( $request->fechabaja ) ? $request->fechabaja : null;

        $fkidciudadpais     = isset( $request->fkidciudadpais )     ? $request->fkidciudadpais : null;
        $fkidciudad         = isset( $request->fkidciudad )         ? $request->fkidciudad : null;
        $fkidproveedortipo  = isset( $request->fkidproveedortipo )  ? $request->fkidproveedortipo : null;
        $fkidproveedorgrupo = isset( $request->fkidproveedorgrupo ) ? $request->fkidproveedorgrupo : null;

        $proveedor = $query->where( 'idproveedor', '=', $idproveedor )
            ->update( [
                'codigo'    => $codigo,
                'nombre'    => $nombre,
                'direccion' => $direccion,
                'fkidciudadpais'     => $fkidciudadpais,
                'fkidciudad'         => $fkidciudad,
                'fkidproveedortipo'  => $fkidproveedortipo,
                'fkidproveedorgrupo' => $fkidproveedorgrupo,
                'nit' => $nit,
                'telefono' => $telefono,
                'celular'  => $celular,
                'fax'      => $fax,
                'contacto' => $contacto,
                'email'    => $email,
                'sitioweb' => $sitioweb,
                'nroorden'       => $nroorden,
                'diascredito'    => $diascredito,
                'formadepago'    => $formadepago,
                'tipopersoneria' => $tipopersoneria,
                'imagen'    => $imagen,
                'extension' => $extension,
                'fechaalta' => $fechaalta,
                'fechabaja' => $fechabaja,
            ] );

        return $proveedor;
    }

    public function show( $query, $idproveedor ) {

        $proveedor = $query
            ->leftJoin('ciudad as ciupais', 'proveedor.fkidciudadpais', '=', 'ciupais.idciudad')
            ->leftJoin('ciudad as ciu', 'proveedor.fkidciudad', '=', 'ciu.idciudad')
            ->leftJoin('proveedortipo as provtipo', 'proveedor.fkidproveedortipo', '=', 'provtipo.idproveedortipo')
            ->leftJoin('proveedorgrupo as provgrupo', 'proveedor.fkidproveedorgrupo', '=', 'provgrupo.idproveedorgrupo')
            ->select( [
                'proveedor.idproveedor', 'proveedor.codigo', 'proveedor.nombre', 'proveedor.direccion', 'proveedor.nit',
                'proveedor.telefono', 'proveedor.celular', 'proveedor.fax', 'proveedor.email', 'proveedor.sitioweb',
                'proveedor.nroorden', 'proveedor.diascredito', 'proveedor.formadepago', 'proveedor.tipopersoneria',
                'proveedor.imagen', 'proveedor.extension', 'proveedor.fechaalta', 'proveedor.fechabaja', 'proveedor.contacto',
                'proveedor.fkidciudadpais', 'ciupais.descripcion as ciudadpais',
                'proveedor.fkidciudad', 'ciu.descripcion as ciudad',
                'proveedor.fkidproveedortipo', 'provtipo.descripcion as proveedortipo',
                'proveedor.fkidproveedorgrupo', 'provgrupo.descripcion as proveedorgrupo',
                'proveedor.estado', 'proveedor.fecha', 'proveedor.hora'
            ] )
            ->where( 'proveedor.idproveedor', '=', $idproveedor )
            ->with( [ 'arrayproveedorproducto' => function( $query ) {
                $query
                    ->leftJoin('producto as prod', 'proveedorproducto.fkidproducto', '=', 'prod.idproducto')
                    ->select( [
                        'prod.idproducto', 'prod.nombre as producto',
                        'proveedorproducto.idproveedorproducto', 'proveedorproducto.fkidproveedor', 'proveedorproducto.fkidproducto',
                        'proveedorproducto.costounitario', 'proveedorproducto.stock',
                    ] )
                    ->orderBy('proveedorproducto.idproveedorproducto');
            } ] )
            ->with( [ 'arrayproveedorproductotipo' => function( $query ) {
                $query
                    ->leftJoin('productotipo as prodtipo', 'proveedorproductotipo.fkidproductotipo', '=', 'prodtipo.idproductotipo')
                    ->select( [
                        'prodtipo.descripcion as productotipo', 'proveedorproductotipo.fkidproductotipo',
                        'proveedorproductotipo.fkidproveedor','proveedorproductotipo.idproveedorproductotipo',
                    ] )
                    ->orderBy('proveedorproductotipo.idproveedorproductotipo');
            } ] )
            ->with( [ 'arrayproveedorpersonal' => function( $query ) {
                $query
                    ->leftJoin('proveedorcargo as provcargo', 'proveedorpersonal.fkidproveedorcargo', '=', 'provcargo.idproveedorcargo')
                    ->select( [
                        'provcargo.descripcion as proveedorcargo', 'proveedorpersonal.fkidproveedorcargo',
                        'proveedorpersonal.codigo', 'proveedorpersonal.nombre', 'proveedorpersonal.apellido', 'proveedorpersonal.celular',
                        'proveedorpersonal.telefono', 'proveedorpersonal.email', 'proveedorpersonal.imagen', 'proveedorpersonal.extension',
                        'proveedorpersonal.fkidproveedor','proveedorpersonal.idproveedorpersonal',
                    ] )
                    ->orderBy('proveedorpersonal.idproveedorpersonal');
            } ] )
            ->whereNull('proveedor.deleted_at')
            ->orderBy('proveedor.idproveedor', 'DESC')
            ->first();

        return $proveedor;
    }

    public function scopeEnable( $query, $request )
    {
        $idproveedor = $request->idproveedor;
        $query->where('idproveedor', '=', $idproveedor)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idproveedor = $request->idproveedor;
        $query->where('idproveedor', '=', $idproveedor)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idproveedor = $request->idproveedor;
        $query->where('idproveedor', '=', $idproveedor)->delete();
    }

    public function searchByID( $query, $idproveedor ) {
        $proveedor = $query
            ->leftJoin('ciudad as ciupais', 'proveedor.fkidciudadpais', '=', 'ciupais.idciudad')
            ->leftJoin('ciudad as ciu', 'proveedor.fkidciudad', '=', 'ciu.idciudad')
            ->leftJoin('proveedortipo as provtipo', 'proveedor.fkidproveedortipo', '=', 'provtipo.idproveedortipo')
            ->leftJoin('proveedorgrupo as provgrupo', 'proveedor.fkidproveedorgrupo', '=', 'provgrupo.idproveedorgrupo')
            ->select( [
                'proveedor.idproveedor', 'proveedor.codigo', 'proveedor.nombre', 'proveedor.direccion', 'proveedor.nit',
                'proveedor.telefono', 'proveedor.celular', 'proveedor.fax', 'proveedor.email', 'proveedor.sitioweb',
                'proveedor.nroorden', 'proveedor.diascredito', 'proveedor.formadepago', 'proveedor.tipopersoneria',
                'proveedor.imagen', 'proveedor.extension', 'proveedor.fechaalta', 'proveedor.fechabaja', 'proveedor.contacto',
                'proveedor.fkidciudadpais', 'ciupais.descripcion as ciudadpais',
                'proveedor.fkidciudad', 'ciu.descripcion as ciudad',
                'proveedor.fkidproveedortipo', 'provtipo.descripcion as proveedortipo',
                'proveedor.fkidproveedorgrupo', 'provgrupo.descripcion as proveedorgrupo',
                'proveedor.estado', 'proveedor.fecha', 'proveedor.hora'
            ] )
            ->where('proveedor.idproveedor', '=', $idproveedor)
            ->with( [ 'arrayproveedorproducto' => function( $query ) {
                $query
                    ->leftJoin('producto as prod', 'proveedorproducto.fkidproducto', '=', 'prod.idproducto')
                    ->select( [
                        'prod.idproducto', 'prod.nombre as producto',
                        'proveedorproducto.idproveedorproducto', 'proveedorproducto.fkidproveedor', 'proveedorproducto.fkidproducto',
                        'proveedorproducto.costounitario', 'proveedorproducto.stock',
                    ] )
                    ->orderBy('proveedorproducto.idproveedorproducto');
            } ] )
            ->with( [ 'arrayproveedorproductotipo' => function( $query ) {
                $query
                    ->leftJoin('productotipo as prodtipo', 'proveedorproductotipo.fkidproductotipo', '=', 'prodtipo.idproductotipo')
                    ->select( [
                        'prodtipo.descripcion as productotipo', 'proveedorproductotipo.fkidproductotipo',
                        'proveedorproductotipo.fkidproveedor','proveedorproductotipo.idproveedorproductotipo',
                    ] )
                    ->orderBy('proveedorproductotipo.idproveedorproductotipo');
            } ] )
            ->with( [ 'arrayproveedorpersonal' => function( $query ) {
                $query
                    ->leftJoin('proveedorcargo as provcargo', 'proveedorpersonal.fkidproveedorcargo', '=', 'provcargo.idproveedorcargo')
                    ->select( [
                        'provcargo.descripcion as proveedorcargo', 'proveedorpersonal.fkidproveedorcargo',
                        'proveedorpersonal.codigo', 'proveedorpersonal.nombre', 'proveedorpersonal.apellido', 'proveedorpersonal.celular',
                        'proveedorpersonal.telefono', 'proveedorpersonal.email', 'proveedorpersonal.imagen', 'proveedorpersonal.extension',
                        'proveedorpersonal.fkidproveedor','proveedorpersonal.idproveedorpersonal',
                    ] )
                    ->orderBy('proveedorpersonal.idproveedorpersonal');
            } ] )
            ->whereNull('proveedor.deleted_at')
            ->orderBy('proveedor.idproveedor', 'DESC')
            ->first();

        return $proveedor;
    }

    public function tieneCiudad( $query, $idciudad ) {

        $proveedor = $query
            ->where( function ( $query ) use ( $idciudad ) {
                return $query
                    ->where( 'proveedor.fkidciudad', '=', $idciudad )
                    ->orWhere('proveedor.fkidciudadpais', '=', $idciudad );
            } )
            ->whereNull('proveedor.deleted_at')
            ->get();

        return ( sizeof( $proveedor ) > 0 );
    }

    public function tieneProveedorGrupo( $query, $idproveedorgrupo ) {

        $proveedor = $query
            ->where( 'proveedor.fkidproveedorgrupo', '=', $idproveedorgrupo )
            ->whereNull('proveedor.deleted_at')
            ->get();

        return ( sizeof( $proveedor ) > 0 );
    }

    public function tieneProveedorTipo( $query, $idproveedortipo ) {

        $proveedor = $query
            ->where( 'proveedor.fkidproveedortipo', '=', $idproveedortipo )
            ->whereNull('proveedor.deleted_at')
            ->get();

        return ( sizeof( $proveedor ) > 0 );
    }

}
