<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Producto extends Model
{
    use SoftDeletes;

    protected $table      = 'producto';
    protected $primaryKey = 'idproducto';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'estado' => 'A', 'isdelete' => 'A', 'codigo' => null, 'descripcion' => null,
        'stockactual' => 0, 'nivel' => 0,
        'imagen' => null, 'extension' => null, 'abreviatura' => null,
    ];

    protected $fillable = [
        'fkidciudadorigen', 'fkidcategoria', 'fkidproductomarca', 'fkidproductotipo', 'fkidproductogrupo', 'fkidproductosubgrupo',
        'codigo', 'nombre', 'descripcion', 'stockactual', 'nivel', 'abreviatura',
        'imagen', 'extension', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function unidadmedidaproducto() {
        return $this->hasMany(
            'App\Models\Comercio\Inventario\UnidadMedidaProducto',
            'fkidproducto',
            'idproducto'
        );
    }

    public function proveedorproducto() {
        return $this->hasMany(
            'App\Models\Comercio\Compra\ProveedorProducto',
            'fkidproducto',
            'idproducto'
        );
    }

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'producto.idproducto';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $producto = $query
            ->leftJoin('ciudad as ciu', 'producto.fkidciudadorigen', '=', 'ciu.idciudad')
            ->leftJoin('categoria as cat', 'producto.fkidcategoria', '=', 'cat.idcategoria')
            ->leftJoin('productomarca as prodmarc', 'producto.fkidproductomarca', '=', 'prodmarc.idproductomarca')
            ->leftJoin('productotipo as prodtipo', 'producto.fkidproductotipo', '=', 'prodtipo.idproductotipo')
            ->leftJoin('productogrupo as prodgrupo', 'producto.fkidproductogrupo', '=', 'prodgrupo.idproductogrupo')
            ->leftJoin('productosubgrupo as prodsubgrupo', 'producto.fkidproductosubgrupo', '=', 'prodsubgrupo.idproductosubgrupo')
            ->select( [
                'producto.idproducto', 'producto.codigo', 'producto.nombre', 'producto.descripcion', 'producto.abreviatura',
                'producto.stockactual', 'producto.nivel', 'producto.imagen',  'producto.extension',
                'producto.fkidciudadorigen', 'ciu.descripcion as ciudadorigen',
                'producto.fkidcategoria', 'cat.descripcion as categoria',
                'producto.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                'producto.fkidproductotipo', 'prodtipo.descripcion as productotipo',
                'producto.fkidproductogrupo', 'prodgrupo.descripcion as productogrupo',
                'producto.fkidproductosubgrupo', 'prodsubgrupo.descripcion as productosubgrupo',
                'producto.isdelete', 'producto.estado', 'producto.fecha', 'producto.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('producto.idproducto', '=', $search)
                        ->orWhere('producto.codigo', $islike, '%' . $search . '%')
                        ->orWhere('producto.nombre', $islike, '%' . $search . '%')
                        ->orWhere('producto.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('producto.codigo', $islike, '%' . $search . '%')
                        ->orWhere('producto.nombre', $islike, '%' . $search . '%')
                        ->orWhere('producto.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'unidadmedidaproducto' => function( $query ) {
                $query
                    ->leftJoin('unidadmedida as unidmed', 'unidadmedidaproducto.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->select( [
                        'unidmed.descripcion as unidadmedida', 'unidmed.abreviatura', 'unidadmedidaproducto.fkidunidadmedida',
                        'unidadmedidaproducto.fkidproducto', 'unidadmedidaproducto.peso', 'unidadmedidaproducto.idunidadmedidaproducto',
                        'unidadmedidaproducto.stock', 'unidadmedidaproducto.costo', 'unidadmedidaproducto.codigo',
                        'unidadmedidaproducto.volumen', 'unidadmedidaproducto.costounitario', 'unidadmedidaproducto.valorequivalente',
                        'unidadmedidaproducto.costodescuento', 'unidadmedidaproducto.costomontodescuento',
                    ] )
                    ->orderBy('unidadmedidaproducto.idunidadmedidaproducto');
            } ] )
            ->with( [ 'proveedorproducto' => function( $query ) {
                $query
                    ->leftJoin('proveedor as prov', 'proveedorproducto.fkidproveedor', '=', 'prov.idproveedor')
                    ->select( [
                        'prov.nombre as proveedor', 'proveedorproducto.fkidproveedor',
                        'proveedorproducto.fkidproducto','proveedorproducto.idproveedorproducto',
                        'proveedorproducto.costounitario', 'proveedorproducto.stock'
                    ] )
                    ->orderBy('proveedorproducto.idproveedorproducto');
            } ] )
            ->whereNull( 'producto.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $producto;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'producto.idproducto';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $producto = $query
            ->leftJoin('ciudad as ciu', 'producto.fkidciudadorigen', '=', 'ciu.idciudad')
            ->leftJoin('categoria as cat', 'producto.fkidcategoria', '=', 'cat.idcategoria')
            ->leftJoin('productomarca as prodmarc', 'producto.fkidproductomarca', '=', 'prodmarc.idproductomarca')
            ->leftJoin('productotipo as prodtipo', 'producto.fkidproductotipo', '=', 'prodtipo.idproductotipo')
            ->leftJoin('productogrupo as prodgrupo', 'producto.fkidproductogrupo', '=', 'prodgrupo.idproductogrupo')
            ->leftJoin('productosubgrupo as prodsubgrupo', 'producto.fkidproductosubgrupo', '=', 'prodsubgrupo.idproductosubgrupo')
            ->select( [
                'producto.idproducto', 'producto.codigo', 'producto.nombre', 'producto.descripcion', 'producto.abreviatura',
                'producto.stockactual', 'producto.nivel', 'producto.imagen',  'producto.extension',
                'producto.fkidciudadorigen', 'ciu.descripcion as ciudadorigen',
                'producto.fkidcategoria', 'cat.descripcion as categoria',
                'producto.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                'producto.fkidproductotipo', 'prodtipo.descripcion as productotipo',
                'producto.fkidproductogrupo', 'prodgrupo.descripcion as productogrupo',
                'producto.fkidproductosubgrupo', 'prodsubgrupo.descripcion as productosubgrupo',
                'producto.isdelete', 'producto.estado', 'producto.fecha', 'producto.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('producto.idproducto', '=', $search)
                        ->orWhere('producto.codigo', $islike, '%' . $search . '%')
                        ->orWhere('producto.nombre', $islike, '%' . $search . '%')
                        ->orWhere('producto.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('producto.codigo', $islike, '%' . $search . '%')
                        ->orWhere('producto.nombre', $islike, '%' . $search . '%')
                        ->orWhere('producto.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'unidadmedidaproducto' => function( $query ) {
                $query
                    ->leftJoin('unidadmedida as unidmed', 'unidadmedidaproducto.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->select( [
                        'unidmed.descripcion as unidadmedida', 'unidmed.abreviatura', 'unidadmedidaproducto.fkidunidadmedida',
                        'unidadmedidaproducto.fkidproducto', 'unidadmedidaproducto.peso', 'unidadmedidaproducto.idunidadmedidaproducto',
                        'unidadmedidaproducto.stock', 'unidadmedidaproducto.costo', 'unidadmedidaproducto.codigo',
                        'unidadmedidaproducto.volumen', 'unidadmedidaproducto.costounitario', 'unidadmedidaproducto.valorequivalente',
                        'unidadmedidaproducto.costodescuento', 'unidadmedidaproducto.costomontodescuento',
                    ] )
                    ->orderBy('unidadmedidaproducto.idunidadmedidaproducto');
            } ] )
            ->with( [ 'proveedorproducto' => function( $query ) {
                $query
                    ->leftJoin('proveedor as prov', 'proveedorproducto.fkidproveedor', '=', 'prov.idproveedor')
                    ->select( [
                        'prov.nombre as proveedor', 'proveedorproducto.fkidproveedor',
                        'proveedorproducto.fkidproducto','proveedorproducto.idproveedorproducto',
                        'proveedorproducto.costounitario', 'proveedorproducto.stock'
                    ] )
                    ->orderBy('proveedorproducto.idproveedorproducto');
            } ] )
            ->whereNull( 'producto.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $producto;
    }

    public function newID( )
    {
        $producto = DB::table('producto')
            ->select('producto.idproducto')
            ->orderBy('producto.idproducto', 'DESC')
            ->first();

        return ( is_null( $producto ) ) ? 1 : intval( $producto->idproducto ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo      = isset( $request->codigo ) ? $request->codigo : null;
        $nombre      = isset( $request->nombre ) ? $request->nombre : null;
        $descripcion = isset( $request->descripcion ) ? $request->descripcion : null;
        $stockactual = isset( $request->stockactual ) ? $request->stockactual : null;
        $nivel       = isset( $request->nivel ) ? $request->nivel : null;
        $imagen      = isset( $request->imagen ) ? $request->imagen : null;
        $extension   = isset( $request->extension ) ? $request->extension : null;
        $abreviatura = isset( $request->abreviatura ) ? $request->abreviatura : null;
        $estado      = isset( $request->estado ) ? $request->estado : null;

        $fkidciudadorigen     = isset( $request->fkidciudadorigen ) ? $request->fkidciudadorigen : null;
        $fkidcategoria        = isset( $request->fkidcategoria ) ? $request->fkidcategoria : null;
        $fkidproductomarca    = isset( $request->fkidproductomarca ) ? $request->fkidproductomarca : null;
        $fkidproductotipo     = isset( $request->fkidproductotipo ) ? $request->fkidproductotipo : null;
        $fkidproductogrupo    = isset( $request->fkidproductogrupo ) ? $request->fkidproductogrupo : null;
        $fkidproductosubgrupo = isset( $request->fkidproductosubgrupo ) ? $request->fkidproductosubgrupo : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $producto = $query->create( [
            'codigo'      => $codigo,
            'nombre'      => $nombre,
            'descripcion' => $descripcion,
            'stockactual' => $stockactual,
            'nivel'       => $nivel,
            'imagen'      => $imagen,
            'extension'   => $extension,
            'abreviatura' => $abreviatura,
            'estado'      => $estado,
            'fkidciudadorigen'  => $fkidciudadorigen,
            'fkidcategoria'     => $fkidcategoria,
            'fkidproductomarca' => $fkidproductomarca,
            'fkidproductotipo'  => $fkidproductotipo,
            'fkidproductogrupo' => $fkidproductogrupo,
            'fkidproductosubgrupo' => $fkidproductosubgrupo,
            'fecha' => $fecha,
            'hora'  => $hora,
        ] );

        return $producto;
    }

    public function upgrade( $query, $request )
    {
        $idproducto  = isset( $request->idproducto ) ? $request->idproducto : null;
        $codigo      = isset( $request->codigo ) ? $request->codigo : null;
        $nombre      = isset( $request->nombre ) ? $request->nombre : null;
        $descripcion = isset( $request->descripcion ) ? $request->descripcion : null;
        $stockactual = isset( $request->stockactual ) ? $request->stockactual : null;
        $nivel       = isset( $request->nivel ) ? $request->nivel : null;
        $imagen      = isset( $request->imagen ) ? $request->imagen : null;
        $extension   = isset( $request->extension ) ? $request->extension : null;
        $abreviatura = isset( $request->abreviatura ) ? $request->abreviatura : null;
        $estado      = isset( $request->estado ) ? $request->estado : null;

        $fkidciudadorigen     = isset( $request->fkidciudadorigen ) ? $request->fkidciudadorigen : null;
        $fkidcategoria        = isset( $request->fkidcategoria ) ? $request->fkidcategoria : null;
        $fkidproductomarca    = isset( $request->fkidproductomarca ) ? $request->fkidproductomarca : null;
        $fkidproductotipo     = isset( $request->fkidproductotipo ) ? $request->fkidproductotipo : null;
        $fkidproductogrupo    = isset( $request->fkidproductogrupo ) ? $request->fkidproductogrupo : null;
        $fkidproductosubgrupo = isset( $request->fkidproductosubgrupo ) ? $request->fkidproductosubgrupo : null;

        $producto = $query->where( 'idproducto', '=', $idproducto )
            ->update( [
                'codigo'      => $codigo,
                'nombre'      => $nombre,
                'descripcion' => $descripcion,
                'stockactual' => $stockactual,
                'nivel'       => $nivel,
                'imagen'      => $imagen,
                'extension'   => $extension,
                'abreviatura' => $abreviatura,
                'estado'      => $estado,
                'fkidciudadorigen'  => $fkidciudadorigen,
                'fkidcategoria'     => $fkidcategoria,
                'fkidproductomarca' => $fkidproductomarca,
                'fkidproductotipo'  => $fkidproductotipo,
                'fkidproductogrupo' => $fkidproductogrupo,
                'fkidproductosubgrupo' => $fkidproductosubgrupo,
            ] );

        return $producto;
    }

    public function show( $query, $idproducto ) {

        $producto = $query
            ->leftJoin('ciudad as ciu', 'producto.fkidciudadorigen', '=', 'ciu.idciudad')
            ->leftJoin('categoria as cat', 'producto.fkidcategoria', '=', 'cat.idcategoria')
            ->leftJoin('productomarca as prodmarc', 'producto.fkidproductomarca', '=', 'prodmarc.idproductomarca')
            ->leftJoin('productotipo as prodtipo', 'producto.fkidproductotipo', '=', 'prodtipo.idproductotipo')
            ->leftJoin('productogrupo as prodgrupo', 'producto.fkidproductogrupo', '=', 'prodgrupo.idproductogrupo')
            ->leftJoin('productosubgrupo as prodsubgrupo', 'producto.fkidproductosubgrupo', '=', 'prodsubgrupo.idproductosubgrupo')
            ->select( [
                'producto.idproducto', 'producto.codigo', 'producto.nombre', 'producto.descripcion', 'producto.abreviatura',
                'producto.stockactual', 'producto.nivel', 'producto.imagen',  'producto.extension',
                'producto.fkidciudadorigen', 'ciu.descripcion as ciudadorigen',
                'producto.fkidcategoria', 'cat.descripcion as categoria',
                'producto.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                'producto.fkidproductotipo', 'prodtipo.descripcion as productotipo',
                'producto.fkidproductogrupo', 'prodgrupo.descripcion as productogrupo',
                'producto.fkidproductosubgrupo', 'prodsubgrupo.descripcion as productosubgrupo',
                'producto.isdelete', 'producto.estado', 'producto.fecha', 'producto.hora'
            ] )
            ->where( 'producto.idproducto', '=', $idproducto )
            ->with( [ 'unidadmedidaproducto' => function( $query ) {
                $query
                    ->leftJoin('unidadmedida as unidmed', 'unidadmedidaproducto.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->select( [
                        'unidmed.descripcion as unidadmedida', 'unidmed.abreviatura', 'unidadmedidaproducto.fkidunidadmedida',
                        'unidadmedidaproducto.fkidproducto', 'unidadmedidaproducto.peso', 'unidadmedidaproducto.idunidadmedidaproducto',
                        'unidadmedidaproducto.stock', 'unidadmedidaproducto.costo', 'unidadmedidaproducto.codigo',
                        'unidadmedidaproducto.volumen', 'unidadmedidaproducto.costounitario', 'unidadmedidaproducto.valorequivalente',
                        'unidadmedidaproducto.costodescuento', 'unidadmedidaproducto.costomontodescuento',
                    ] )
                    ->orderBy('unidadmedidaproducto.idunidadmedidaproducto');
            } ] )
            ->with( [ 'proveedorproducto' => function( $query ) {
                $query
                    ->leftJoin('proveedor as prov', 'proveedorproducto.fkidproveedor', '=', 'prov.idproveedor')
                    ->select( [
                        'prov.nombre as proveedor', 'proveedorproducto.fkidproveedor',
                        'proveedorproducto.fkidproducto','proveedorproducto.idproveedorproducto',
                        'proveedorproducto.costounitario', 'proveedorproducto.stock'
                    ] )
                    ->orderBy('proveedorproducto.idproveedorproducto');
            } ] )
            ->whereNull('producto.deleted_at')
            ->orderBy('producto.idproducto', 'DESC')
            ->first();

        return $producto;
    }

    public function scopeEnable( $query, $request )
    {
        $idproducto = $request->idproducto;
        $query->where('idproducto', '=', $idproducto)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idproducto = $request->idproducto;
        $query->where('idproducto', '=', $idproducto)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idproducto = $request->idproducto;
        $query->where('idproducto', '=', $idproducto)->delete();
    }

    public function searchByID( $query, $idproducto ) {
        $producto = $query
            ->leftJoin('ciudad as ciu', 'producto.fkidciudadorigen', '=', 'ciu.idciudad')
            ->leftJoin('categoria as cat', 'producto.fkidcategoria', '=', 'cat.idcategoria')
            ->leftJoin('productomarca as prodmarc', 'producto.fkidproductomarca', '=', 'prodmarc.idproductomarca')
            ->leftJoin('productotipo as prodtipo', 'producto.fkidproductotipo', '=', 'prodtipo.idproductotipo')
            ->leftJoin('productogrupo as prodgrupo', 'producto.fkidproductogrupo', '=', 'prodgrupo.idproductogrupo')
            ->leftJoin('productosubgrupo as prodsubgrupo', 'producto.fkidproductosubgrupo', '=', 'prodsubgrupo.idproductosubgrupo')
            ->select( [
                'producto.idproducto', 'producto.codigo', 'producto.nombre', 'producto.descripcion', 'producto.abreviatura',
                'producto.stockactual', 'producto.nivel', 'producto.imagen',  'producto.extension',
                'producto.fkidciudadorigen', 'ciu.descripcion as ciudadorigen',
                'producto.fkidcategoria', 'cat.descripcion as categoria',
                'producto.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                'producto.fkidproductotipo', 'prodtipo.descripcion as productotipo',
                'producto.fkidproductogrupo', 'prodgrupo.descripcion as productogrupo',
                'producto.fkidproductosubgrupo', 'prodsubgrupo.descripcion as productosubgrupo',
                'producto.isdelete', 'producto.estado', 'producto.fecha', 'producto.hora'
            ] )
            ->where('producto.idproducto', '=', $idproducto)
            ->with( [ 'unidadmedidaproducto' => function( $query ) {
                $query
                    ->leftJoin('unidadmedida as unidmed', 'unidadmedidaproducto.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->select( [
                        'unidmed.descripcion as unidadmedida', 'unidmed.abreviatura', 'unidadmedidaproducto.fkidunidadmedida',
                        'unidadmedidaproducto.fkidproducto', 'unidadmedidaproducto.peso', 'unidadmedidaproducto.idunidadmedidaproducto',
                        'unidadmedidaproducto.stock', 'unidadmedidaproducto.costo', 'unidadmedidaproducto.codigo',
                        'unidadmedidaproducto.volumen', 'unidadmedidaproducto.costounitario', 'unidadmedidaproducto.valorequivalente',
                        'unidadmedidaproducto.costodescuento', 'unidadmedidaproducto.costomontodescuento',
                    ] )
                    ->orderBy('unidadmedidaproducto.idunidadmedidaproducto');
            } ] )
            ->with( [ 'proveedorproducto' => function( $query ) {
                $query
                    ->leftJoin('proveedor as prov', 'proveedorproducto.fkidproveedor', '=', 'prov.idproveedor')
                    ->select( [
                        'prov.nombre as proveedor', 'proveedorproducto.fkidproveedor',
                        'proveedorproducto.fkidproducto','proveedorproducto.idproveedorproducto',
                        'proveedorproducto.costounitario', 'proveedorproducto.stock'
                    ] )
                    ->orderBy('proveedorproducto.idproveedorproducto');
            } ] )
            ->whereNull('producto.deleted_at')
            ->orderBy('producto.idproducto', 'DESC')
            ->first();

        return $producto;
    }

    public function tieneCiudadOrigen( $query, $idciudadorigen ) {

        $producto = $query
            ->where( 'producto.fkidciudadorigen', '=', $idciudadorigen )
            ->whereNull('producto.deleted_at')
            ->get();

        return ( sizeof( $producto ) > 0 );
    }

    public function tieneProductoTipo( $query, $idproductotipo ) {

        $producto = $query
            ->where( 'producto.fkidproductotipo', '=', $idproductotipo )
            ->whereNull('producto.deleted_at')
            ->get();

        return ( sizeof( $producto ) > 0 );
    }

    public function tieneProductoMarca( $query, $idproductomarca ) {

        $producto = $query
            ->where( 'producto.fkidproductomarca', '=', $idproductomarca )
            ->whereNull('producto.deleted_at')
            ->get();

        return ( sizeof( $producto ) > 0 );
    }

    public function tieneCategoria( $query, $idcategoria ) {

        $producto = $query
            ->where( 'producto.fkidcategoria', '=', $idcategoria )
            ->whereNull('producto.deleted_at')
            ->get();

        return ( sizeof( $producto ) > 0 );
    }

    public function tieneProductoGrupo( $query, $idproductogrupo ) {

        $producto = $query
            ->where( 'producto.fkidproductogrupo', '=', $idproductogrupo )
            ->whereNull('producto.deleted_at')
            ->get();

        return ( sizeof( $producto ) > 0 );
    }

    public function tieneProductoSubGrupo( $query, $idproductosubgrupo ) {

        $producto = $query
            ->where( 'producto.fkidproductosubgrupo', '=', $idproductosubgrupo )
            ->whereNull('producto.deleted_at')
            ->get();

        return ( sizeof( $producto ) > 0 );
    }

}
