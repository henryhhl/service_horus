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
        'stockactual' => 0, 'nivel' => 0, 'isventa' => 'A',
        'valorequivalente' => 0, 'peso' => 0, 'volumen' => 0, 'costocif' => 0, 'costofob' => 0,
        'costobase' => 0, 'costodescuento' => 0, 'costomontodescuento' => 0, 'costounitario' => 0,
        'ingresos' => 0, 'salidas' => 0, 'traspasos' => 0, 'solicitudcompra' => 0, 'ordencompra' => 0, 'notacompra' => 0,
        'devolucioncompra' => 0, 'notaventa' => 0, 'devolucionventa' => 0,
        'ingresocancelado' => 0, 'salidacancelado' => 0, 'traspasocancelado' => 0, 'solicitudcompracancelado' => 0, 'ordencompracancelado' => 0, 
        'notacompracancelado' => 0, 'devolucioncompracancelado' => 0, 'notaventacancelado' => 0, 'devolucionventacancelado' => 0,
        'totalingresos' => 0, 'totalsalidas' => 0, 'totaltraspasos' => 0, 'totalsolicitudcompra' => 0, 'totalordencompra' => 0, 'totalnotacompra' => 0,
        'totaldevolucioncompra' => 0, 'totalnotaventa' => 0, 'totaldevolucionventa' => 0,
        'imagen' => null, 'extension' => null, 'abreviatura' => null,
    ];

    protected $fillable = [
        'fkidciudadorigen', 'fkidcategoria', 'fkidproductomarca', 'fkidproductotipo', 'fkidproductogrupo', 'fkidproductosubgrupo', 'fkidunidadmedida',
        'codigo', 'nombre', 'descripcion', 'stockactual', 'nivel', 'abreviatura', 'costocif', 'costofob',
        'valorequivalente', 'peso', 'volumen', 'costobase', 'costodescuento', 'costomontodescuento', 'costounitario',
        'ingresos', 'salidas', 'traspasos', 'solicitudcompra', 'ordencompra', 'notacompra', 'devolucioncompra', 'notaventa', 'devolucionventa',
        'ingresocancelado', 'salidacancelado', 'traspasocancelado', 'solicitudcompracancelado', 'ordencompracancelado', 
        'notacompracancelado', 'devolucioncompracancelado', 'notaventacancelado', 'devolucionventacancelado',
        'totalingresos', 'totalsalidas', 'totaltraspasos', 'totalsolicitudcompra', 'totalordencompra', 'totalnotacompra',
        'totaldevolucioncompra', 'totalnotaventa', 'totaldevolucionventa',
        'imagen', 'extension', 'isventa', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function arrayunidadmedidaproducto() {
        return $this->hasMany(
            'App\Models\Comercio\Inventario\UnidadMedidaProducto',
            'fkidproducto',
            'idproducto'
        );
    }

    public function arrayproveedorproducto() {
        return $this->hasMany(
            'App\Models\Comercio\Compra\ProveedorProducto',
            'fkidproducto',
            'idproducto'
        );
    }

    public function arraylistapreciodetalle() {
        return $this->hasMany(
            'App\Models\Comercio\Venta\ListaPrecioDetalle',
            'fkidproducto',
            'idproducto'
        );
    }

    public function arrayalmacenproductodetalle() {
        return $this->hasMany(
            'App\Models\Comercio\Inventario\AlmacenProductoDetalle',
            'fkidproducto',
            'idproducto'
        );
    }

    public function getTransacciones( $query ) {
        $arrayProducto = $query
            ->select( [
                'producto.idproducto', 'producto.codigo', 'producto.nombre', 'producto.descripcion', 'producto.abreviatura',
                'producto.stockactual', 'producto.nivel', 'producto.imagen',  'producto.extension',
                'producto.valorequivalente', 'producto.peso', 'producto.volumen', 'producto.costobase',
                'producto.costodescuento', 'producto.costomontodescuento', 'producto.costounitario',
                'producto.fkidciudadorigen', 'ciu.descripcion as ciudadorigen',
                'producto.fkidcategoria', 'cat.descripcion as categoria',
                'producto.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                'producto.fkidproductotipo', 'prodtipo.descripcion as productotipo',
                'producto.fkidproductogrupo', 'prodgrupo.descripcion as productogrupo',
                'producto.fkidproductosubgrupo', 'prodsubgrupo.descripcion as productosubgrupo',
                'producto.fkidunidadmedida', 'undmed.descripcion as unidadmedida', 'undmed.abreviatura',
                'producto.isventa', 'producto.isdelete', 'producto.estado', 'producto.fecha', 'producto.hora',
                'producto.ingresos', 'producto.salidas', 'producto.traspasos', 'producto.solicitudcompra', 'producto.ordencompra', 
                'producto.notacompra', 'producto.devolucioncompra', 'producto.notaventa', 'producto.devolucionventa',
                'producto.ingresocancelado', 'producto.salidacancelado', 'producto.traspasocancelado', 'producto.solicitudcompracancelado', 'producto.ordencompracancelado', 
                'producto.notacompracancelado', 'producto.devolucioncompracancelado', 'producto.notaventacancelado', 'producto.devolucionventacancelado',
                'producto.totalingresos', 'producto.totalsalidas', 'producto.totaltraspasos', 'producto.totalsolicitudcompra', 'producto.totalordencompra', 'producto.totalnotacompra',
                'producto.totaldevolucioncompra', 'producto.totalnotaventa', 'producto.totaldevolucionventa',
            ] )
            ->leftJoin('ciudad as ciu', 'producto.fkidciudadorigen', '=', 'ciu.idciudad')
            ->leftJoin('categoria as cat', 'producto.fkidcategoria', '=', 'cat.idcategoria')
            ->leftJoin('productomarca as prodmarc', 'producto.fkidproductomarca', '=', 'prodmarc.idproductomarca')
            ->leftJoin('productotipo as prodtipo', 'producto.fkidproductotipo', '=', 'prodtipo.idproductotipo')
            ->leftJoin('productogrupo as prodgrupo', 'producto.fkidproductogrupo', '=', 'prodgrupo.idproductogrupo')
            ->leftJoin('productosubgrupo as prodsubgrupo', 'producto.fkidproductosubgrupo', '=', 'prodsubgrupo.idproductosubgrupo')
            ->leftJoin('unidadmedida as undmed', 'producto.fkidunidadmedida', '=', 'undmed.idunidadmedida')
            ->whereNull( 'producto.deleted_at' )
            ->orderBy( 'producto.nombre' , 'DESC' )
            ->get();

        return $arrayProducto;
    }

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $isventa = isset($request->isventa) ? $request->isventa : 'T';
        $fkidalmacen = isset($request->fkidalmacen) ? $request->fkidalmacen : null;
        $fkidlistaprecio = isset($request->fkidlistaprecio) ? $request->fkidlistaprecio : null;
        $column  = isset($request->column) ? $request->column : 'idproducto';

        $column = 'producto.' . $column;

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';
        if ( strtoupper( $isventa ) != 'A' && strtoupper( $isventa ) != 'N' ) { 
            $isventa = 'T'; 
        } else { 
            $isventa = strtoupper( $isventa ); 
        }
        if ( !is_numeric( $fkidalmacen ) ) $fkidalmacen = null;
        if ( !is_numeric( $fkidlistaprecio ) ) $fkidlistaprecio = null;

        $islike =  Functions::isLikeAndIlike();

        $producto = $query
            ->leftJoin('ciudad as ciu', 'producto.fkidciudadorigen', '=', 'ciu.idciudad')
            ->leftJoin('categoria as cat', 'producto.fkidcategoria', '=', 'cat.idcategoria')
            ->leftJoin('productomarca as prodmarc', 'producto.fkidproductomarca', '=', 'prodmarc.idproductomarca')
            ->leftJoin('productotipo as prodtipo', 'producto.fkidproductotipo', '=', 'prodtipo.idproductotipo')
            ->leftJoin('productogrupo as prodgrupo', 'producto.fkidproductogrupo', '=', 'prodgrupo.idproductogrupo')
            ->leftJoin('productosubgrupo as prodsubgrupo', 'producto.fkidproductosubgrupo', '=', 'prodsubgrupo.idproductosubgrupo')
            ->leftJoin('unidadmedida as undmed', 'producto.fkidunidadmedida', '=', 'undmed.idunidadmedida')
            ->select( [
                'producto.idproducto', 'producto.codigo', 'producto.nombre', 'producto.descripcion', 'producto.abreviatura',
                'producto.stockactual', 'producto.nivel', 'producto.imagen',  'producto.extension',
                'producto.valorequivalente', 'producto.peso', 'producto.volumen', 'producto.costobase',
                'producto.costodescuento', 'producto.costomontodescuento', 'producto.costounitario',
                'producto.fkidciudadorigen', 'ciu.descripcion as ciudadorigen',
                'producto.fkidcategoria', 'cat.descripcion as categoria',
                'producto.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                'producto.fkidproductotipo', 'prodtipo.descripcion as productotipo',
                'producto.fkidproductogrupo', 'prodgrupo.descripcion as productogrupo',
                'producto.fkidproductosubgrupo', 'prodsubgrupo.descripcion as productosubgrupo',
                'producto.fkidunidadmedida', 'undmed.descripcion as unidadmedida', 'undmed.abreviatura',
                'producto.isventa', 'producto.isdelete', 'producto.estado', 'producto.fecha', 'producto.hora',
                DB::raw("(
                        SELECT (CASE WHEN almproddet.stockactual IS NULL THEN 0 ELSE almproddet.stockactual END) AS stock 
                        FROM almacenproductodetalle almproddet 
                        WHERE producto.idproducto = almproddet.fkidproducto AND almproddet.fkidalmacen = '$fkidalmacen'
                    ) as stockalmacen"
                ),
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
            ->where( ( $isventa == 'T' ) ? [] : [[ 'producto.isventa', '=', $isventa ]] )
            ->with( [ 'arrayproveedorproducto' => function( $query ) {
                $query
                    ->leftJoin('proveedor as prov', 'proveedorproducto.fkidproveedor', '=', 'prov.idproveedor')
                    ->select( [
                        'prov.nombre as proveedor', 'proveedorproducto.fkidproveedor',
                        'proveedorproducto.fkidproducto','proveedorproducto.idproveedorproducto',
                        'proveedorproducto.costounitario', 'proveedorproducto.stock'
                    ] )
                    ->orderBy('proveedorproducto.idproveedorproducto');
            } ] )
            ->with( [ 'arraylistapreciodetalle' => function( $query ) {
                $query
                    ->leftJoin('listaprecio as listprec', 'listapreciodetalle.fkidlistaprecio', '=', 'listprec.idlistaprecio')
                    ->select( [
                        'listprec.descripcion as listaprecio', 'listprec.abreviatura', 'listprec.codigo', 'listprec.accion', 'listprec.valor',
                        'listapreciodetalle.idlistapreciodetalle','listapreciodetalle.fkidmoneda',
                        'listapreciodetalle.fkidproducto', 'listapreciodetalle.fkidlistaprecio',
                        'listapreciodetalle.preciobase','listapreciodetalle.preciopivote', 'listapreciodetalle.precioventa',
                        'listapreciodetalle.descuento','listapreciodetalle.montodescuento', 'listapreciodetalle.nota',
                    ] )
                    ->orderBy('listapreciodetalle.idlistapreciodetalle');
            } ] )
            ->with( [ 'arrayalmacenproductodetalle' => function( $query ) {
                $query
                    ->select( [
                        'almacenproductodetalle.idalmacenproductodetalle', 'almacenproductodetalle.fkidproducto', 'almacenproductodetalle.fkidalmacen',
                        'almacenproductodetalle.stockactual', 'almacenproductodetalle.stockminimo', 'almacenproductodetalle.stockmaximo',
                        'almacenproductodetalle.ingresos', 'almacenproductodetalle.salidas', 'almacenproductodetalle.traspasos',
                        'almacenproductodetalle.ventas', 'almacenproductodetalle.compras', 'almacenproductodetalle.fecha', 'almacenproductodetalle.hora',
                        'alm.idalmacen', 'alm.descripcion as almacen', 'alm.direccion',
                        'suc.idsucursal', 'suc.descripcion as sucursal',
                    ] )
                    ->leftJoin('almacen as alm', 'almacenproductodetalle.fkidalmacen', 'alm.idalmacen')
                    ->leftJoin('sucursal as suc', 'alm.fkidsucursal', 'suc.idsucursal')
                    ->orderBy('suc.idsucursal', 'ASC')
                    ->orderBy('alm.idalmacen', 'ASC');
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
        $fkidalmacen = isset($request->fkidalmacen) ? $request->fkidalmacen : null;

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';
        if ( !is_numeric( $paginate ) ) $paginate = 20;
        if ( !is_numeric( $fkidalmacen ) ) $fkidalmacen = null;

        $islike =  Functions::isLikeAndIlike();

        $producto = $query
            ->leftJoin('ciudad as ciu', 'producto.fkidciudadorigen', '=', 'ciu.idciudad')
            ->leftJoin('categoria as cat', 'producto.fkidcategoria', '=', 'cat.idcategoria')
            ->leftJoin('productomarca as prodmarc', 'producto.fkidproductomarca', '=', 'prodmarc.idproductomarca')
            ->leftJoin('productotipo as prodtipo', 'producto.fkidproductotipo', '=', 'prodtipo.idproductotipo')
            ->leftJoin('productogrupo as prodgrupo', 'producto.fkidproductogrupo', '=', 'prodgrupo.idproductogrupo')
            ->leftJoin('productosubgrupo as prodsubgrupo', 'producto.fkidproductosubgrupo', '=', 'prodsubgrupo.idproductosubgrupo')
            ->leftJoin('unidadmedida as undmed', 'producto.fkidunidadmedida', '=', 'undmed.idunidadmedida')
            ->select( [
                'producto.idproducto', 'producto.codigo', 'producto.nombre', 'producto.descripcion', 'producto.abreviatura',
                'producto.stockactual', 'producto.nivel', 'producto.imagen',  'producto.extension',
                'producto.valorequivalente', 'producto.peso', 'producto.volumen', 'producto.costobase',
                'producto.costodescuento', 'producto.costomontodescuento', 'producto.costounitario',
                'producto.fkidciudadorigen', 'ciu.descripcion as ciudadorigen',
                'producto.fkidcategoria', 'cat.descripcion as categoria',
                'producto.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                'producto.fkidproductotipo', 'prodtipo.descripcion as productotipo',
                'producto.fkidproductogrupo', 'prodgrupo.descripcion as productogrupo',
                'producto.fkidproductosubgrupo', 'prodsubgrupo.descripcion as productosubgrupo',
                'producto.fkidunidadmedida', 'undmed.descripcion as unidadmedida', 'undmed.abreviatura',
                'producto.isventa', 'producto.isdelete', 'producto.estado', 'producto.fecha', 'producto.hora'
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
            ->with( [ 'arrayproveedorproducto' => function( $query ) {
                $query
                    ->leftJoin('proveedor as prov', 'proveedorproducto.fkidproveedor', '=', 'prov.idproveedor')
                    ->select( [
                        'prov.nombre as proveedor', 'proveedorproducto.fkidproveedor',
                        'proveedorproducto.fkidproducto','proveedorproducto.idproveedorproducto',
                        'proveedorproducto.costounitario', 'proveedorproducto.stock'
                    ] )
                    ->orderBy('proveedorproducto.idproveedorproducto');
            } ] )
            ->with( [ 'arraylistapreciodetalle' => function( $query ) {
                $query
                    ->leftJoin('listaprecio as listprec', 'listapreciodetalle.fkidlistaprecio', '=', 'listprec.idlistaprecio')
                    ->select( [
                        'listprec.descripcion as listaprecio', 'listprec.abreviatura', 'listprec.codigo', 'listprec.accion', 'listprec.valor',
                        'listapreciodetalle.idlistapreciodetalle','listapreciodetalle.fkidmoneda',
                        'listapreciodetalle.fkidproducto', 'listapreciodetalle.fkidlistaprecio',
                        'listapreciodetalle.preciobase','listapreciodetalle.preciopivote', 'listapreciodetalle.precioventa',
                        'listapreciodetalle.descuento','listapreciodetalle.montodescuento', 'listapreciodetalle.nota',
                    ] )
                    ->orderBy('listapreciodetalle.idlistapreciodetalle');
            } ] )
            ->with( [ 'arrayalmacenproductodetalle' => function( $query ) {
                $query
                    ->select( [
                        'almacenproductodetalle.idalmacenproductodetalle', 'almacenproductodetalle.fkidproducto', 'almacenproductodetalle.fkidalmacen',
                        'almacenproductodetalle.stockactual', 'almacenproductodetalle.stockminimo', 'almacenproductodetalle.stockmaximo',
                        'almacenproductodetalle.ingresos', 'almacenproductodetalle.salidas', 'almacenproductodetalle.traspasos',
                        'almacenproductodetalle.ventas', 'almacenproductodetalle.compras', 'almacenproductodetalle.fecha', 'almacenproductodetalle.hora',
                        'alm.idalmacen', 'alm.descripcion as almacen', 'alm.direccion',
                        'suc.idsucursal', 'suc.descripcion as sucursal',
                    ] )
                    ->leftJoin('almacen as alm', 'almacenproductodetalle.fkidalmacen', 'alm.idalmacen')
                    ->leftJoin('sucursal as suc', 'alm.fkidsucursal', 'suc.idsucursal')
                    ->orderBy('suc.idsucursal', 'ASC')
                    ->orderBy('alm.idalmacen', 'ASC');
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
        $estado      = isset( $request->estado ) ? $request->estado : 'A';
        $isventa     = isset( $request->isventa ) ? $request->isventa : 'A';

        $valorequivalente = isset( $request->valorequivalente ) ? $request->valorequivalente : 0;

        $peso    = isset( $request->peso ) ? $request->peso : 0;
        $volumen = isset( $request->volumen ) ? $request->volumen : 0;
        $costobase = isset( $request->costobase ) ? $request->costobase : 0;
        $costodescuento = isset( $request->costodescuento ) ? $request->costodescuento : 0;
        $costomontodescuento = isset( $request->costomontodescuento ) ? $request->costomontodescuento : 0;
        $costounitario = isset( $request->costounitario ) ? $request->costounitario : 0;

        $fkidciudadorigen     = isset( $request->fkidciudadorigen ) ? $request->fkidciudadorigen : null;
        $fkidcategoria        = isset( $request->fkidcategoria ) ? $request->fkidcategoria : null;
        $fkidproductomarca    = isset( $request->fkidproductomarca ) ? $request->fkidproductomarca : null;
        $fkidproductotipo     = isset( $request->fkidproductotipo ) ? $request->fkidproductotipo : null;
        $fkidproductogrupo    = isset( $request->fkidproductogrupo ) ? $request->fkidproductogrupo : null;
        $fkidproductosubgrupo = isset( $request->fkidproductosubgrupo ) ? $request->fkidproductosubgrupo : null;
        $fkidunidadmedida     = isset( $request->fkidunidadmedida ) ? $request->fkidunidadmedida : null;

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
            'isventa'     => $isventa,
            'valorequivalente' => $valorequivalente,
            'peso'    => $peso,
            'volumen' => $volumen,
            'costobase' => $costobase,
            'costodescuento' => $costodescuento,
            'costomontodescuento' => $costomontodescuento,
            'costounitario' => $costounitario,
            'fkidciudadorigen'  => $fkidciudadorigen,
            'fkidcategoria'     => $fkidcategoria,
            'fkidproductomarca' => $fkidproductomarca,
            'fkidproductotipo'  => $fkidproductotipo,
            'fkidproductogrupo' => $fkidproductogrupo,
            'fkidunidadmedida'  => $fkidunidadmedida,
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
        $estado      = isset( $request->estado ) ? $request->estado : 'A';
        $isventa     = isset( $request->isventa ) ? $request->isventa : 'A';

        $valorequivalente = isset( $request->valorequivalente ) ? $request->valorequivalente : 0;

        $peso    = isset( $request->peso ) ? $request->peso : 0;
        $volumen = isset( $request->volumen ) ? $request->volumen : 0;
        $costobase = isset( $request->costobase ) ? $request->costobase : 0;
        $costodescuento = isset( $request->costodescuento ) ? $request->costodescuento : 0;
        $costomontodescuento = isset( $request->costomontodescuento ) ? $request->costomontodescuento : 0;
        $costounitario = isset( $request->costounitario ) ? $request->costounitario : 0;

        $fkidciudadorigen     = isset( $request->fkidciudadorigen ) ? $request->fkidciudadorigen : null;
        $fkidcategoria        = isset( $request->fkidcategoria ) ? $request->fkidcategoria : null;
        $fkidproductomarca    = isset( $request->fkidproductomarca ) ? $request->fkidproductomarca : null;
        $fkidproductotipo     = isset( $request->fkidproductotipo ) ? $request->fkidproductotipo : null;
        $fkidproductogrupo    = isset( $request->fkidproductogrupo ) ? $request->fkidproductogrupo : null;
        $fkidproductosubgrupo = isset( $request->fkidproductosubgrupo ) ? $request->fkidproductosubgrupo : null;
        $fkidunidadmedida     = isset( $request->fkidunidadmedida ) ? $request->fkidunidadmedida : null;

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
                'isventa'     => $isventa,
                'valorequivalente' => $valorequivalente,
                'peso'    => $peso,
                'volumen' => $volumen,
                'costobase' => $costobase,
                'costodescuento' => $costodescuento,
                'costomontodescuento' => $costomontodescuento,
                'costounitario' => $costounitario,
                'fkidciudadorigen'  => $fkidciudadorigen,
                'fkidcategoria'     => $fkidcategoria,
                'fkidproductomarca' => $fkidproductomarca,
                'fkidproductotipo'  => $fkidproductotipo,
                'fkidproductogrupo' => $fkidproductogrupo,
                'fkidunidadmedida'  => $fkidunidadmedida,
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
            ->leftJoin('unidadmedida as undmed', 'producto.fkidunidadmedida', '=', 'undmed.idunidadmedida')
            ->select( [
                'producto.idproducto', 'producto.codigo', 'producto.nombre', 'producto.descripcion', 'producto.abreviatura',
                'producto.stockactual', 'producto.nivel', 'producto.imagen',  'producto.extension',
                'producto.valorequivalente', 'producto.peso', 'producto.volumen', 'producto.costobase',
                'producto.costodescuento', 'producto.costomontodescuento', 'producto.costounitario',
                'producto.fkidciudadorigen', 'ciu.descripcion as ciudadorigen',
                'producto.fkidcategoria', 'cat.descripcion as categoria',
                'producto.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                'producto.fkidproductotipo', 'prodtipo.descripcion as productotipo',
                'producto.fkidproductogrupo', 'prodgrupo.descripcion as productogrupo',
                'producto.fkidproductosubgrupo', 'prodsubgrupo.descripcion as productosubgrupo',
                'producto.fkidunidadmedida', 'undmed.descripcion as unidadmedida', 'undmed.abreviatura',
                'producto.isventa', 'producto.isdelete', 'producto.estado', 'producto.fecha', 'producto.hora'
            ] )
            ->where( 'producto.idproducto', '=', $idproducto )
            ->with( [ 'arrayproveedorproducto' => function( $query ) {
                $query
                    ->leftJoin('proveedor as prov', 'proveedorproducto.fkidproveedor', '=', 'prov.idproveedor')
                    ->select( [
                        'prov.nombre as proveedor', 'proveedorproducto.fkidproveedor',
                        'proveedorproducto.fkidproducto','proveedorproducto.idproveedorproducto',
                        'proveedorproducto.costounitario', 'proveedorproducto.stock'
                    ] )
                    ->orderBy('proveedorproducto.idproveedorproducto');
            } ] )
            ->with( [ 'arraylistapreciodetalle' => function( $query ) {
                $query
                    ->leftJoin('listaprecio as listprec', 'listapreciodetalle.fkidlistaprecio', '=', 'listprec.idlistaprecio')
                    ->select( [
                        'listprec.descripcion as listaprecio', 'listprec.abreviatura', 'listprec.codigo', 'listprec.accion', 'listprec.valor',
                        'listapreciodetalle.idlistapreciodetalle','listapreciodetalle.fkidmoneda',
                        'listapreciodetalle.fkidproducto', 'listapreciodetalle.fkidlistaprecio',
                        'listapreciodetalle.preciobase','listapreciodetalle.preciopivote', 'listapreciodetalle.precioventa',
                        'listapreciodetalle.descuento','listapreciodetalle.montodescuento', 'listapreciodetalle.nota',
                    ] )
                    ->orderBy('listapreciodetalle.idlistapreciodetalle');
            } ] )
            ->with( [ 'arrayalmacenproductodetalle' => function( $query ) {
                $query
                    ->select( [
                        'almacenproductodetalle.idalmacenproductodetalle', 'almacenproductodetalle.fkidproducto', 'almacenproductodetalle.fkidalmacen',
                        'almacenproductodetalle.stockactual', 'almacenproductodetalle.stockminimo', 'almacenproductodetalle.stockmaximo',
                        'almacenproductodetalle.ingresos', 'almacenproductodetalle.salidas', 'almacenproductodetalle.traspasos',
                        'almacenproductodetalle.ventas', 'almacenproductodetalle.compras', 'almacenproductodetalle.fecha', 'almacenproductodetalle.hora',
                        'alm.idalmacen', 'alm.descripcion as almacen', 'alm.direccion',
                        'suc.idsucursal', 'suc.descripcion as sucursal',
                    ] )
                    ->leftJoin('almacen as alm', 'almacenproductodetalle.fkidalmacen', 'alm.idalmacen')
                    ->leftJoin('sucursal as suc', 'alm.fkidsucursal', 'suc.idsucursal')
                    ->orderBy('suc.idsucursal', 'ASC')
                    ->orderBy('alm.idalmacen', 'ASC');
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
            ->leftJoin('unidadmedida as undmed', 'producto.fkidunidadmedida', '=', 'undmed.idunidadmedida')
            ->select( [
                'producto.idproducto', 'producto.codigo', 'producto.nombre', 'producto.descripcion', 'producto.abreviatura',
                'producto.stockactual', 'producto.nivel', 'producto.imagen',  'producto.extension',
                'producto.valorequivalente', 'producto.peso', 'producto.volumen', 'producto.costobase',
                'producto.costodescuento', 'producto.costomontodescuento', 'producto.costounitario',
                'producto.fkidciudadorigen', 'ciu.descripcion as ciudadorigen',
                'producto.fkidcategoria', 'cat.descripcion as categoria',
                'producto.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                'producto.fkidproductotipo', 'prodtipo.descripcion as productotipo',
                'producto.fkidproductogrupo', 'prodgrupo.descripcion as productogrupo',
                'producto.fkidproductosubgrupo', 'prodsubgrupo.descripcion as productosubgrupo',
                'producto.fkidunidadmedida', 'undmed.descripcion as unidadmedida', 'undmed.abreviatura',
                'producto.isventa', 'producto.isdelete', 'producto.estado', 'producto.fecha', 'producto.hora'
            ] )
            ->where('producto.idproducto', '=', $idproducto)
            ->with( [ 'arrayproveedorproducto' => function( $query ) {
                $query
                    ->leftJoin('proveedor as prov', 'proveedorproducto.fkidproveedor', '=', 'prov.idproveedor')
                    ->select( [
                        'prov.nombre as proveedor', 'proveedorproducto.fkidproveedor',
                        'proveedorproducto.fkidproducto','proveedorproducto.idproveedorproducto',
                        'proveedorproducto.costounitario', 'proveedorproducto.stock'
                    ] )
                    ->orderBy('proveedorproducto.idproveedorproducto');
            } ] )
            ->with( [ 'arraylistapreciodetalle' => function( $query ) {
                $query
                    ->leftJoin('listaprecio as listprec', 'listapreciodetalle.fkidlistaprecio', '=', 'listprec.idlistaprecio')
                    ->select( [
                        'listprec.descripcion as listaprecio', 'listprec.abreviatura', 'listprec.codigo', 'listprec.accion', 'listprec.valor',
                        'listapreciodetalle.idlistapreciodetalle','listapreciodetalle.fkidmoneda',
                        'listapreciodetalle.fkidproducto', 'listapreciodetalle.fkidlistaprecio',
                        'listapreciodetalle.preciobase','listapreciodetalle.preciopivote', 'listapreciodetalle.precioventa',
                        'listapreciodetalle.descuento','listapreciodetalle.montodescuento', 'listapreciodetalle.nota',
                    ] )
                    ->orderBy('listapreciodetalle.idlistapreciodetalle');
            } ] )
            ->with( [ 'arrayalmacenproductodetalle' => function( $query ) {
                $query
                    ->select( [
                        'almacenproductodetalle.idalmacenproductodetalle', 'almacenproductodetalle.fkidproducto', 'almacenproductodetalle.fkidalmacen',
                        'almacenproductodetalle.stockactual', 'almacenproductodetalle.stockminimo', 'almacenproductodetalle.stockmaximo',
                        'almacenproductodetalle.ingresos', 'almacenproductodetalle.salidas', 'almacenproductodetalle.traspasos',
                        'almacenproductodetalle.ventas', 'almacenproductodetalle.compras', 'almacenproductodetalle.fecha', 'almacenproductodetalle.hora',
                        'alm.idalmacen', 'alm.descripcion as almacen', 'alm.direccion',
                        'suc.idsucursal', 'suc.descripcion as sucursal',
                    ] )
                    ->leftJoin('almacen as alm', 'almacenproductodetalle.fkidalmacen', 'alm.idalmacen')
                    ->leftJoin('sucursal as suc', 'alm.fkidsucursal', 'suc.idsucursal')
                    ->orderBy('suc.idsucursal', 'ASC')
                    ->orderBy('alm.idalmacen', 'ASC');
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
