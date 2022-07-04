<?php

namespace App\Models\Comercio\Venta;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class DevolucionNotaVenta extends Model
{
    use SoftDeletes;

    protected $table      = 'devolucionnotaventa';
    protected $primaryKey = 'iddevolucionnotaventa';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'fkidusers' => null, 'fkidmoneda' => null, 'codigo' => null, 'nrofactura' => null, 'tiponotaventa' => null,
        'tipocambio' => 0, 'montosubtotal' => 0, 'descuento' => 0, 'montodescuento' => 0, 'montototal' => 0, 'cantidadtotal' => 0,
        'razonsocial' => null, 'nit' => null, 'glosa' => null, 'esnotadevolucion' => 'N',
        'estado' => 'A',  'isdelete' => 'A', 'x_idusuario' => null,
    ];

    protected $fillable = [
        'fkidnotaventa', 'fkidsucursal', 'fkidalmacen', 'fkidconceptoventa', 'fkidmoneda', 'fkidcliente', 'fkidvendedor', 'fkidusers', 'fkidlistaprecio',
        'codigo', 'nrofactura', 'fechadevolucionnotaventa', 'fechanotaventa', 'tiponotaventa', 'fkidtipotransaccion', 'fkidtipopago',
        'tipocambio', 'montosubtotal', 'descuento', 'montodescuento', 'montototal', 'cantidadtotal',
        'razonsocial', 'nit', 'glosa', 'esnotadevolucion',
        'fecha', 'hora', 'estado', 'isdelete', 'x_idusuario',
    ];

    public function arraydevolucionnotaventadetalle() {
        return $this->hasMany(
            'App\Models\Comercio\Venta\DevolucionNotaVentaDetalle',
            'fkiddevolucionnotaventa',
            'iddevolucionnotaventa'
        );
    }

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'devolucionnotaventa.iddevolucionnotaventa';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $devolucionnotaventa = $query
            ->select( [
                'devolucionnotaventa.iddevolucionnotaventa', 'devolucionnotaventa.codigo', 'devolucionnotaventa.fkidsucursal', 'devolucionnotaventa.fkidalmacen', 'devolucionnotaventa.fkidvendedor',
                'devolucionnotaventa.fkidcliente', 'devolucionnotaventa.fkidlistaprecio', 'devolucionnotaventa.fkidconceptoventa', 'devolucionnotaventa.fkidmoneda',
                'devolucionnotaventa.fkidtipotransaccion', 'devolucionnotaventa.fkidtipopago', 'devolucionnotaventa.fkidusers', 'devolucionnotaventa.fkidnotaventa',
                'devolucionnotaventa.tipocambio', 'devolucionnotaventa.tiponotaventa', 'devolucionnotaventa.nrofactura', 'devolucionnotaventa.razonsocial', 'devolucionnotaventa.nit', 
                'devolucionnotaventa.glosa', 'devolucionnotaventa.fechadevolucionnotaventa', 'devolucionnotaventa.fechanotaventa', 'devolucionnotaventa.esnotadevolucion',
                'devolucionnotaventa.montosubtotal', 'devolucionnotaventa.descuento', 'devolucionnotaventa.montodescuento', 'devolucionnotaventa.montototal', 'devolucionnotaventa.cantidadtotal', 
                'devolucionnotaventa.estado', 'devolucionnotaventa.isdelete', 'devolucionnotaventa.fecha', 'devolucionnotaventa.hora',
                'suc.idsucursal', 'suc.descripcion as sucursal',
                'alm.idalmacen', 'alm.descripcion as almacen',
                'vend.idvendedor', DB::raw("CONCAT(vend.nombre, ' ', vend.apellido) as vendedor"),
                'cli.idcliente', DB::raw("CONCAT(cli.nombre, ' ', cli.apellido) as cliente"), 'cli.razonsocial as nombrecomercial', 'cli.nit',
                'listprec.idlistaprecio', 'listprec.descripcion as listaprecio',
                'concepvta.idconceptoventa', 'concepvta.descripcion as conceptoventa',
                'mond.idmoneda', 'mond.descripcion as moneda',
                'ttrans.idtipotransaccion', 'ttrans.descripcion as tipotransaccion',
                'tpago.idtipopago', 'tpago.descripcion as tipopago',
            ] )
            ->leftJoin('sucursal as suc', 'devolucionnotaventa.fkidsucursal', '=', 'suc.idsucursal')
            ->leftJoin('almacen as alm', 'devolucionnotaventa.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('vendedor as vend', 'devolucionnotaventa.fkidvendedor', '=', 'vend.idvendedor')
            ->leftJoin('cliente as cli', 'devolucionnotaventa.fkidcliente', '=', 'cli.idcliente')
            ->leftJoin('listaprecio as listprec', 'devolucionnotaventa.fkidlistaprecio', '=', 'listprec.idlistaprecio')
            ->leftJoin('conceptoventa as concepvta', 'devolucionnotaventa.fkidconceptoventa', '=', 'concepvta.idconceptoventa')
            ->leftJoin('moneda as mond', 'devolucionnotaventa.fkidmoneda', '=', 'mond.idmoneda')
            ->leftJoin('tipotransaccion as ttrans', 'devolucionnotaventa.fkidtipotransaccion', '=', 'ttrans.idtipotransaccion')
            ->leftJoin('tipopago as tpago', 'devolucionnotaventa.fkidtipopago', '=', 'tpago.idtipopago')
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('devolucionnotaventa.iddevolucionnotaventa', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('devolucionnotaventa.codigo', $islike, '%' . $search . '%')
                        ->orWhere('alm.descripcion', $islike, '%' . $search . '%')
                        ->orWhere('suc.descripcion', $islike, '%' . $search . '%')
                        ->orWhere('concepvta.descripcion', $islike, '%' . $search . '%')
                        ->orWhere('devolucionnotaventa.montototal', $islike, '%' . $search . '%')
                        ->orWhere( DB::raw("CONCAT(vend.nombre, ' ', vend.apellido)"), $islike, "%$search%" )
                        ->orWhere( DB::raw("CONCAT(cli.nombre, ' ', cli.apellido)"), $islike, "%$search%" );
                }
                return;
            } )
            ->with( [ 'arraydevolucionnotaventadetalle' => function( $query ) {
                $query
                    ->select( [
                        'devolucionnotaventadetalle.iddevolucionnotaventadetalle', 'devolucionnotaventadetalle.fkiddevolucionnotaventa', 'devolucionnotaventadetalle.fkidproducto', 
                        'devolucionnotaventadetalle.fkidproductotipo', 'devolucionnotaventadetalle.fkidproductomarca', 'devolucionnotaventadetalle.fkidvendedor',
                        'devolucionnotaventadetalle.fkidalmacenproductodetalle', 'devolucionnotaventadetalle.fkidalmacen',
                        'devolucionnotaventadetalle.fkidcliente', 'devolucionnotaventadetalle.fkidsucursal',
                        'devolucionnotaventadetalle.fkidlistapreciodetalle', 'devolucionnotaventadetalle.fkidlistaprecio', 'devolucionnotaventadetalle.fkidnotaventadetalle',

                        'devolucionnotaventadetalle.cantidad', 'devolucionnotaventadetalle.cantidadvendida', 'devolucionnotaventadetalle.preciounitario', 
                        'devolucionnotaventadetalle.preciosubtotal', 'devolucionnotaventadetalle.nrolote', 'devolucionnotaventadetalle.nrofabrica', 
                        'devolucionnotaventadetalle.fechavencimiento', 'devolucionnotaventadetalle.nota', 'devolucionnotaventadetalle.estado',

                        'almproddet.idalmacenproductodetalle', 'almproddet.stockactual', 'almproddet.stockminimo', 'almproddet.stockmaximo', 
                        'almproddet.ingresos', 'almproddet.salidas', 'almproddet.traspasos', 'almproddet.ventas', 'almproddet.compras',
                        'prod.idproducto', 'prod.codigo', 'prod.nombre as producto', 'prod.stockactual as stocktotal', 'prod.peso', 'prod.volumen', 'prod.valorequivalente',
                        'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'alm.idalmacen', 'alm.descripcion as almacen', 'alm.fkidsucursal',
                        'venddor.idvendedor', DB::raw("CONCAT(venddor.nombre, ' ', venddor.apellido) as vendedor"),
                        'listprec.idlistaprecio', 'listprec.descripcion as listaprecio',
                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca',
                        'prodtipo.idproductotipo', 'prodtipo.descripcion as productotipo',
                        'prod.fkidciudadorigen', 'ciu.descripcion as ciudadorigen',
                    ] )
                    ->leftJoin('almacenproductodetalle as almproddet', 'devolucionnotaventadetalle.fkidalmacenproductodetalle', '=', 'almproddet.idalmacenproductodetalle')
                    ->leftJoin('almacen as alm', 'devolucionnotaventadetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('listaprecio as listprec', 'devolucionnotaventadetalle.fkidlistaprecio', '=', 'listprec.idlistaprecio')
                    ->leftJoin('vendedor as venddor', 'devolucionnotaventadetalle.fkidvendedor', '=', 'venddor.idvendedor')
                    ->leftJoin('producto as prod', 'devolucionnotaventadetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtipo', 'prod.fkidproductotipo', '=', 'prodtipo.idproductotipo')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciu', 'prod.fkidciudadorigen', '=', 'ciu.idciudad')
                    ->orderBy('devolucionnotaventadetalle.iddevolucionnotaventadetalle', 'ASC');
            } ] )
            ->whereNull( 'devolucionnotaventa.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $devolucionnotaventa;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'devolucionnotaventa.iddevolucionnotaventa';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $devolucionnotaventa = $query
            ->select( [
                'devolucionnotaventa.iddevolucionnotaventa', 'devolucionnotaventa.codigo', 'devolucionnotaventa.fkidsucursal', 'devolucionnotaventa.fkidalmacen', 'devolucionnotaventa.fkidvendedor',
                'devolucionnotaventa.fkidcliente', 'devolucionnotaventa.fkidlistaprecio', 'devolucionnotaventa.fkidconceptoventa', 'devolucionnotaventa.fkidmoneda',
                'devolucionnotaventa.fkidtipotransaccion', 'devolucionnotaventa.fkidtipopago', 'devolucionnotaventa.fkidusers', 'devolucionnotaventa.fkidnotaventa',
                'devolucionnotaventa.tipocambio', 'devolucionnotaventa.tiponotaventa', 'devolucionnotaventa.nrofactura', 'devolucionnotaventa.razonsocial', 'devolucionnotaventa.nit', 
                'devolucionnotaventa.glosa', 'devolucionnotaventa.fechadevolucionnotaventa', 'devolucionnotaventa.fechanotaventa', 'devolucionnotaventa.esnotadevolucion',
                'devolucionnotaventa.montosubtotal', 'devolucionnotaventa.descuento', 'devolucionnotaventa.montodescuento', 'devolucionnotaventa.montototal', 'devolucionnotaventa.cantidadtotal', 
                'devolucionnotaventa.estado', 'devolucionnotaventa.isdelete', 'devolucionnotaventa.fecha', 'devolucionnotaventa.hora',
                'suc.idsucursal', 'suc.descripcion as sucursal',
                'alm.idalmacen', 'alm.descripcion as almacen',
                'vend.idvendedor', DB::raw("CONCAT(vend.nombre, ' ', vend.apellido) as vendedor"),
                'cli.idcliente', DB::raw("CONCAT(cli.nombre, ' ', cli.apellido) as cliente"), 'cli.razonsocial as nombrecomercial', 'cli.nit',
                'listprec.idlistaprecio', 'listprec.descripcion as listaprecio',
                'concepvta.idconceptoventa', 'concepvta.descripcion as conceptoventa',
                'mond.idmoneda', 'mond.descripcion as moneda',
                'ttrans.idtipotransaccion', 'ttrans.descripcion as tipotransaccion',
                'tpago.idtipopago', 'tpago.descripcion as tipopago',
            ] )
            ->leftJoin('sucursal as suc', 'devolucionnotaventa.fkidsucursal', '=', 'suc.idsucursal')
            ->leftJoin('almacen as alm', 'devolucionnotaventa.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('vendedor as vend', 'devolucionnotaventa.fkidvendedor', '=', 'vend.idvendedor')
            ->leftJoin('cliente as cli', 'devolucionnotaventa.fkidcliente', '=', 'cli.idcliente')
            ->leftJoin('listaprecio as listprec', 'devolucionnotaventa.fkidlistaprecio', '=', 'listprec.idlistaprecio')
            ->leftJoin('conceptoventa as concepvta', 'devolucionnotaventa.fkidconceptoventa', '=', 'concepvta.idconceptoventa')
            ->leftJoin('moneda as mond', 'devolucionnotaventa.fkidmoneda', '=', 'mond.idmoneda')
            ->leftJoin('tipotransaccion as ttrans', 'devolucionnotaventa.fkidtipotransaccion', '=', 'ttrans.idtipotransaccion')
            ->leftJoin('tipopago as tpago', 'devolucionnotaventa.fkidtipopago', '=', 'tpago.idtipopago')
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('devolucionnotaventa.iddevolucionnotaventa', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('devolucionnotaventa.codigo', $islike, '%' . $search . '%')
                        ->orWhere('alm.descripcion', $islike, '%' . $search . '%')
                        ->orWhere('suc.descripcion', $islike, '%' . $search . '%')
                        ->orWhere('concepvta.descripcion', $islike, '%' . $search . '%')
                        ->orWhere('devolucionnotaventa.montototal', $islike, '%' . $search . '%')
                        ->orWhere( DB::raw("CONCAT(vend.nombre, ' ', vend.apellido)"), $islike, "%$search%" )
                        ->orWhere( DB::raw("CONCAT(cli.nombre, ' ', cli.apellido)"), $islike, "%$search%" );
                }
                return;
            } )
            ->with( [ 'arraydevolucionnotaventadetalle' => function( $query ) {
                $query
                    ->select( [
                        'devolucionnotaventadetalle.iddevolucionnotaventadetalle', 'devolucionnotaventadetalle.fkiddevolucionnotaventa', 'devolucionnotaventadetalle.fkidproducto', 
                        'devolucionnotaventadetalle.fkidproductotipo', 'devolucionnotaventadetalle.fkidproductomarca', 'devolucionnotaventadetalle.fkidvendedor',
                        'devolucionnotaventadetalle.fkidalmacenproductodetalle', 'devolucionnotaventadetalle.fkidalmacen',
                        'devolucionnotaventadetalle.fkidcliente', 'devolucionnotaventadetalle.fkidsucursal',
                        'devolucionnotaventadetalle.fkidlistapreciodetalle', 'devolucionnotaventadetalle.fkidlistaprecio', 'devolucionnotaventadetalle.fkidnotaventadetalle',

                        'devolucionnotaventadetalle.cantidad', 'devolucionnotaventadetalle.cantidadvendida', 'devolucionnotaventadetalle.preciounitario', 
                        'devolucionnotaventadetalle.preciosubtotal', 'devolucionnotaventadetalle.nrolote', 'devolucionnotaventadetalle.nrofabrica', 
                        'devolucionnotaventadetalle.fechavencimiento', 'devolucionnotaventadetalle.nota', 'devolucionnotaventadetalle.estado',

                        'almproddet.idalmacenproductodetalle', 'almproddet.stockactual', 'almproddet.stockminimo', 'almproddet.stockmaximo', 
                        'almproddet.ingresos', 'almproddet.salidas', 'almproddet.traspasos', 'almproddet.ventas', 'almproddet.compras',
                        'prod.idproducto', 'prod.codigo', 'prod.nombre as producto', 'prod.stockactual as stocktotal', 'prod.peso', 'prod.volumen', 'prod.valorequivalente',
                        'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'alm.idalmacen', 'alm.descripcion as almacen', 'alm.fkidsucursal',
                        'venddor.idvendedor', DB::raw("CONCAT(venddor.nombre, ' ', venddor.apellido) as vendedor"),
                        'listprec.idlistaprecio', 'listprec.descripcion as listaprecio',
                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca',
                        'prodtipo.idproductotipo', 'prodtipo.descripcion as productotipo',
                        'prod.fkidciudadorigen', 'ciu.descripcion as ciudadorigen',
                    ] )
                    ->leftJoin('almacenproductodetalle as almproddet', 'devolucionnotaventadetalle.fkidalmacenproductodetalle', '=', 'almproddet.idalmacenproductodetalle')
                    ->leftJoin('almacen as alm', 'devolucionnotaventadetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('listaprecio as listprec', 'devolucionnotaventadetalle.fkidlistaprecio', '=', 'listprec.idlistaprecio')
                    ->leftJoin('vendedor as venddor', 'devolucionnotaventadetalle.fkidvendedor', '=', 'venddor.idvendedor')
                    ->leftJoin('producto as prod', 'devolucionnotaventadetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtipo', 'prod.fkidproductotipo', '=', 'prodtipo.idproductotipo')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciu', 'prod.fkidciudadorigen', '=', 'ciu.idciudad')
                    ->orderBy('devolucionnotaventadetalle.iddevolucionnotaventadetalle', 'ASC');
            } ] )
            ->whereNull( 'devolucionnotaventa.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->paginate($paginate);

        return $devolucionnotaventa;
    }

    public function newID( )
    {
        $devolucionnotaventa = DB::table('devolucionnotaventa')
            ->select('devolucionnotaventa.iddevolucionnotaventa')
            ->orderBy('devolucionnotaventa.iddevolucionnotaventa', 'DESC')
            ->first();

        return ( is_null( $devolucionnotaventa ) ) ? 1 : intval( $devolucionnotaventa->iddevolucionnotaventa ) + 1;
    }

    public function store( $query, $request )
    {
        $fkidnotaventa  = isset( $request->fkidnotaventa ) ? $request->fkidnotaventa : null;
        $fkidsucursal  = isset( $request->fkidsucursal ) ? $request->fkidsucursal : null;
        $fkidalmacen  = isset( $request->fkidalmacen ) ? $request->fkidalmacen : null;
        $fkidvendedor  = isset( $request->fkidvendedor ) ? $request->fkidvendedor : null;
        $fkidcliente  = isset( $request->fkidcliente ) ? $request->fkidcliente : null;
        $fkidlistaprecio  = isset( $request->fkidlistaprecio ) ? $request->fkidlistaprecio : null;
        $fkidconceptoventa  = isset( $request->fkidconceptoventa ) ? $request->fkidconceptoventa : null;
        $fkidmoneda  = isset( $request->fkidmoneda ) ? $request->fkidmoneda : null;
        $fkidusers  = isset( $request->fkidusers ) ? $request->fkidusers : null;
        $fkidtipotransaccion  = isset( $request->fkidtipotransaccion ) ? $request->fkidtipotransaccion : null;
        $fkidtipopago  = isset( $request->fkidtipopago ) ? $request->fkidtipopago : null;

        $codigo  = isset( $request->codigo ) ? $request->codigo : null;
        $nrofactura  = isset( $request->nrofactura ) ? $request->nrofactura : null;
        $fechadevolucionnotaventa  = isset( $request->fechadevolucionnotaventa ) ? $request->fechadevolucionnotaventa : null;
        $fechanotaventa  = isset( $request->fechanotaventa ) ? $request->fechanotaventa : null;
        $tiponotaventa  = isset( $request->tiponotaventa ) ? $request->tiponotaventa : null;

        $tipocambio  = isset( $request->tipocambio ) ? $request->tipocambio : 0;
        $montosubtotal  = isset( $request->montosubtotal ) ? $request->montosubtotal : 0;
        $descuento  = isset( $request->descuento ) ? $request->descuento : 0;
        $montodescuento  = isset( $request->montodescuento ) ? $request->montodescuento : 0;
        $montototal  = isset( $request->montototal ) ? $request->montototal : 0;
        $cantidadtotal  = isset( $request->cantidadtotal ) ? $request->cantidadtotal : 0;

        $razonsocial  = isset( $request->razonsocial ) ? $request->razonsocial : null;
        $nit  = isset( $request->nit ) ? $request->nit : null;
        $glosa  = isset( $request->glosa ) ? $request->glosa : null;
        $esnotadevolucion  = isset( $request->esnotadevolucion ) ? $request->esnotadevolucion : "N";

        $estado  = isset( $request->estado ) ? $request->estado : 'A';
        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $devolucionnotaventa = $query->create( [
            'fkidnotaventa' => $fkidnotaventa,
            'fkidsucursal' => $fkidsucursal,
            'fkidalmacen' => $fkidalmacen,
            'fkidvendedor' => $fkidvendedor,
            'fkidcliente' => $fkidcliente,
            'fkidlistaprecio' => $fkidlistaprecio,
            'fkidconceptoventa' => $fkidconceptoventa,
            'fkidmoneda' => $fkidmoneda,
            'fkidusers' => $fkidusers,
            'fkidtipotransaccion' => $fkidtipotransaccion,
            'fkidtipopago' => $fkidtipopago,

            'codigo' => $codigo,
            'nrofactura' => $nrofactura,
            'fechadevolucionnotaventa' => $fechadevolucionnotaventa,
            'fechanotaventa' => $fechanotaventa,
            'tiponotaventa' => $tiponotaventa,

            'razonsocial' => $razonsocial,
            'nit' => $nit,
            'glosa' => $glosa,
            'esnotadevolucion' => $esnotadevolucion,

            'tipocambio' => $tipocambio,
            'montosubtotal' => $montosubtotal,
            'descuento' => $descuento,
            'montodescuento' => $montodescuento,
            'montototal' => $montototal,
            'cantidadtotal' => $cantidadtotal,

            'estado' => $estado,
            'fecha' => $fecha,
            'hora'  => $hora,
        ] );

        return $devolucionnotaventa;
    }

    public function upgrade( $query, $request )
    {
        $iddevolucionnotaventa = isset( $request->iddevolucionnotaventa ) ? $request->iddevolucionnotaventa : null;

        $fkidnotaventa  = isset( $request->fkidnotaventa ) ? $request->fkidnotaventa : null;
        $fkidsucursal  = isset( $request->fkidsucursal ) ? $request->fkidsucursal : null;
        $fkidalmacen  = isset( $request->fkidalmacen ) ? $request->fkidalmacen : null;
        $fkidvendedor  = isset( $request->fkidvendedor ) ? $request->fkidvendedor : null;
        $fkidcliente  = isset( $request->fkidcliente ) ? $request->fkidcliente : null;
        $fkidlistaprecio  = isset( $request->fkidlistaprecio ) ? $request->fkidlistaprecio : null;
        $fkidconceptoventa  = isset( $request->fkidconceptoventa ) ? $request->fkidconceptoventa : null;
        $fkidmoneda  = isset( $request->fkidmoneda ) ? $request->fkidmoneda : null;
        $fkidusers  = isset( $request->fkidusers ) ? $request->fkidusers : null;
        $fkidtipotransaccion  = isset( $request->fkidtipotransaccion ) ? $request->fkidtipotransaccion : null;
        $fkidtipopago  = isset( $request->fkidtipopago ) ? $request->fkidtipopago : null;

        $codigo  = isset( $request->codigo ) ? $request->codigo : null;
        $nrofactura  = isset( $request->nrofactura ) ? $request->nrofactura : null;
        $fechadevolucionnotaventa  = isset( $request->fechadevolucionnotaventa ) ? $request->fechadevolucionnotaventa : null;
        $fechanotaventa  = isset( $request->fechanotaventa ) ? $request->fechanotaventa : null;
        $tiponotaventa  = isset( $request->tiponotaventa ) ? $request->tiponotaventa : null;

        $tipocambio  = isset( $request->tipocambio ) ? $request->tipocambio : 0;
        $montosubtotal  = isset( $request->montosubtotal ) ? $request->montosubtotal : 0;
        $descuento  = isset( $request->descuento ) ? $request->descuento : 0;
        $montodescuento  = isset( $request->montodescuento ) ? $request->montodescuento : 0;
        $montototal  = isset( $request->montototal ) ? $request->montototal : 0;
        $cantidadtotal  = isset( $request->cantidadtotal ) ? $request->cantidadtotal : 0;

        $razonsocial  = isset( $request->razonsocial ) ? $request->razonsocial : null;
        $nit  = isset( $request->nit ) ? $request->nit : null;
        $glosa  = isset( $request->glosa ) ? $request->glosa : null;
        $esnotadevolucion  = isset( $request->esnotadevolucion ) ? $request->esnotadevolucion : "N";
        $estado  = isset( $request->estado ) ? $request->estado : 'A';

        $devolucionnotaventa = $query->where( 'iddevolucionnotaventa', '=', $iddevolucionnotaventa )
            ->update( [
                'fkidnotaventa' => $fkidnotaventa,
                'fkidsucursal' => $fkidsucursal,
                'fkidalmacen' => $fkidalmacen,
                'fkidvendedor' => $fkidvendedor,
                'fkidcliente' => $fkidcliente,
                'fkidlistaprecio' => $fkidlistaprecio,
                'fkidconceptoventa' => $fkidconceptoventa,
                'fkidmoneda' => $fkidmoneda,
                'fkidusers' => $fkidusers,
                'fkidtipotransaccion' => $fkidtipotransaccion,
                'fkidtipopago' => $fkidtipopago,

                'codigo' => $codigo,
                'nrofactura' => $nrofactura,
                'fechadevolucionnotaventa' => $fechadevolucionnotaventa,
                'fechanotaventa' => $fechanotaventa,
                'tiponotaventa' => $tiponotaventa,

                'razonsocial' => $razonsocial,
                'nit' => $nit,
                'glosa' => $glosa,
                'esnotadevolucion' => $esnotadevolucion,

                'tipocambio' => $tipocambio,
                'montosubtotal' => $montosubtotal,
                'descuento' => $descuento,
                'montodescuento' => $montodescuento,
                'montototal' => $montototal,
                'cantidadtotal' => $cantidadtotal,
                'estado' => $estado,
            ] );

        return $devolucionnotaventa;
    }

    public function show( $query, $iddevolucionnotaventa ) {

        $devolucionnotaventa = $query
            ->select( [
                'devolucionnotaventa.iddevolucionnotaventa', 'devolucionnotaventa.codigo', 'devolucionnotaventa.fkidsucursal', 'devolucionnotaventa.fkidalmacen', 'devolucionnotaventa.fkidvendedor',
                'devolucionnotaventa.fkidcliente', 'devolucionnotaventa.fkidlistaprecio', 'devolucionnotaventa.fkidconceptoventa', 'devolucionnotaventa.fkidmoneda',
                'devolucionnotaventa.fkidtipotransaccion', 'devolucionnotaventa.fkidtipopago', 'devolucionnotaventa.fkidusers', 'devolucionnotaventa.fkidnotaventa',
                'devolucionnotaventa.tipocambio', 'devolucionnotaventa.tiponotaventa', 'devolucionnotaventa.nrofactura', 'devolucionnotaventa.razonsocial', 'devolucionnotaventa.nit', 
                'devolucionnotaventa.glosa', 'devolucionnotaventa.fechadevolucionnotaventa', 'devolucionnotaventa.fechanotaventa', 'devolucionnotaventa.esnotadevolucion',
                'devolucionnotaventa.montosubtotal', 'devolucionnotaventa.descuento', 'devolucionnotaventa.montodescuento', 'devolucionnotaventa.montototal', 'devolucionnotaventa.cantidadtotal', 
                'devolucionnotaventa.estado', 'devolucionnotaventa.isdelete', 'devolucionnotaventa.fecha', 'devolucionnotaventa.hora',
                'suc.idsucursal', 'suc.descripcion as sucursal',
                'alm.idalmacen', 'alm.descripcion as almacen',
                'vend.idvendedor', DB::raw("CONCAT(vend.nombre, ' ', vend.apellido) as vendedor"),
                'cli.idcliente', DB::raw("CONCAT(cli.nombre, ' ', cli.apellido) as cliente"), 'cli.razonsocial as nombrecomercial', 'cli.nit',
                'listprec.idlistaprecio', 'listprec.descripcion as listaprecio',
                'concepvta.idconceptoventa', 'concepvta.descripcion as conceptoventa',
                'mond.idmoneda', 'mond.descripcion as moneda',
                'ttrans.idtipotransaccion', 'ttrans.descripcion as tipotransaccion',
                'tpago.idtipopago', 'tpago.descripcion as tipopago',
            ] )
            ->leftJoin('sucursal as suc', 'devolucionnotaventa.fkidsucursal', '=', 'suc.idsucursal')
            ->leftJoin('almacen as alm', 'devolucionnotaventa.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('vendedor as vend', 'devolucionnotaventa.fkidvendedor', '=', 'vend.idvendedor')
            ->leftJoin('cliente as cli', 'devolucionnotaventa.fkidcliente', '=', 'cli.idcliente')
            ->leftJoin('listaprecio as listprec', 'devolucionnotaventa.fkidlistaprecio', '=', 'listprec.idlistaprecio')
            ->leftJoin('conceptoventa as concepvta', 'devolucionnotaventa.fkidconceptoventa', '=', 'concepvta.idconceptoventa')
            ->leftJoin('moneda as mond', 'devolucionnotaventa.fkidmoneda', '=', 'mond.idmoneda')
            ->leftJoin('tipotransaccion as ttrans', 'devolucionnotaventa.fkidtipotransaccion', '=', 'ttrans.idtipotransaccion')
            ->leftJoin('tipopago as tpago', 'devolucionnotaventa.fkidtipopago', '=', 'tpago.idtipopago')
            ->with( [ 'arraydevolucionnotaventadetalle' => function( $query ) {
                $query
                    ->select( [
                        'devolucionnotaventadetalle.iddevolucionnotaventadetalle', 'devolucionnotaventadetalle.fkiddevolucionnotaventa', 'devolucionnotaventadetalle.fkidproducto', 
                        'devolucionnotaventadetalle.fkidproductotipo', 'devolucionnotaventadetalle.fkidproductomarca', 'devolucionnotaventadetalle.fkidvendedor',
                        'devolucionnotaventadetalle.fkidalmacenproductodetalle', 'devolucionnotaventadetalle.fkidalmacen',
                        'devolucionnotaventadetalle.fkidcliente', 'devolucionnotaventadetalle.fkidsucursal',
                        'devolucionnotaventadetalle.fkidlistapreciodetalle', 'devolucionnotaventadetalle.fkidlistaprecio', 'devolucionnotaventadetalle.fkidnotaventadetalle',

                        'devolucionnotaventadetalle.cantidad', 'devolucionnotaventadetalle.cantidadvendida', 'devolucionnotaventadetalle.preciounitario', 
                        'devolucionnotaventadetalle.preciosubtotal', 'devolucionnotaventadetalle.nrolote', 'devolucionnotaventadetalle.nrofabrica', 
                        'devolucionnotaventadetalle.fechavencimiento', 'devolucionnotaventadetalle.nota', 'devolucionnotaventadetalle.estado',

                        'almproddet.idalmacenproductodetalle', 'almproddet.stockactual', 'almproddet.stockminimo', 'almproddet.stockmaximo', 
                        'almproddet.ingresos', 'almproddet.salidas', 'almproddet.traspasos', 'almproddet.ventas', 'almproddet.compras',
                        'prod.idproducto', 'prod.codigo', 'prod.nombre as producto', 'prod.stockactual as stocktotal', 'prod.peso', 'prod.volumen', 'prod.valorequivalente',
                        'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'alm.idalmacen', 'alm.descripcion as almacen', 'alm.fkidsucursal',
                        'venddor.idvendedor', DB::raw("CONCAT(venddor.nombre, ' ', venddor.apellido) as vendedor"),
                        'listprec.idlistaprecio', 'listprec.descripcion as listaprecio',
                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca',
                        'prodtipo.idproductotipo', 'prodtipo.descripcion as productotipo',
                        'prod.fkidciudadorigen', 'ciu.descripcion as ciudadorigen',
                    ] )
                    ->leftJoin('almacenproductodetalle as almproddet', 'devolucionnotaventadetalle.fkidalmacenproductodetalle', '=', 'almproddet.idalmacenproductodetalle')
                    ->leftJoin('almacen as alm', 'devolucionnotaventadetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('listaprecio as listprec', 'devolucionnotaventadetalle.fkidlistaprecio', '=', 'listprec.idlistaprecio')
                    ->leftJoin('vendedor as venddor', 'devolucionnotaventadetalle.fkidvendedor', '=', 'venddor.idvendedor')
                    ->leftJoin('producto as prod', 'devolucionnotaventadetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtipo', 'prod.fkidproductotipo', '=', 'prodtipo.idproductotipo')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciu', 'prod.fkidciudadorigen', '=', 'ciu.idciudad')
                    ->orderBy('devolucionnotaventadetalle.iddevolucionnotaventadetalle', 'ASC');
            } ] )
            ->where( 'devolucionnotaventa.iddevolucionnotaventa', '=', $iddevolucionnotaventa )
            ->whereNull('devolucionnotaventa.deleted_at')
            ->orderBy('devolucionnotaventa.iddevolucionnotaventa', 'DESC')
            ->first();

        return $devolucionnotaventa;
    }

    public function scopeEnable( $query, $request )
    {
        $iddevolucionnotaventa = $request->iddevolucionnotaventa;
        $query->where('iddevolucionnotaventa', '=', $iddevolucionnotaventa)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $iddevolucionnotaventa = $request->iddevolucionnotaventa;
        $query->where('iddevolucionnotaventa', '=', $iddevolucionnotaventa)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $iddevolucionnotaventa = $request->iddevolucionnotaventa;
        $query->where('iddevolucionnotaventa', '=', $iddevolucionnotaventa)->delete();
    }

    public function searchByID( $query, $iddevolucionnotaventa ) {
        $devolucionnotaventa = $query
            ->select( [
                'devolucionnotaventa.iddevolucionnotaventa', 'devolucionnotaventa.codigo', 'devolucionnotaventa.fkidsucursal', 'devolucionnotaventa.fkidalmacen', 'devolucionnotaventa.fkidvendedor',
                'devolucionnotaventa.fkidcliente', 'devolucionnotaventa.fkidlistaprecio', 'devolucionnotaventa.fkidconceptoventa', 'devolucionnotaventa.fkidmoneda',
                'devolucionnotaventa.fkidtipotransaccion', 'devolucionnotaventa.fkidtipopago', 'devolucionnotaventa.fkidusers', 'devolucionnotaventa.fkidnotaventa',
                'devolucionnotaventa.tipocambio', 'devolucionnotaventa.tiponotaventa', 'devolucionnotaventa.nrofactura', 'devolucionnotaventa.razonsocial', 'devolucionnotaventa.nit', 
                'devolucionnotaventa.glosa', 'devolucionnotaventa.fechadevolucionnotaventa', 'devolucionnotaventa.fechanotaventa', 'devolucionnotaventa.esnotadevolucion',
                'devolucionnotaventa.montosubtotal', 'devolucionnotaventa.descuento', 'devolucionnotaventa.montodescuento', 'devolucionnotaventa.montototal', 'devolucionnotaventa.cantidadtotal', 
                'devolucionnotaventa.estado', 'devolucionnotaventa.isdelete', 'devolucionnotaventa.fecha', 'devolucionnotaventa.hora',
                'suc.idsucursal', 'suc.descripcion as sucursal',
                'alm.idalmacen', 'alm.descripcion as almacen',
                'vend.idvendedor', DB::raw("CONCAT(vend.nombre, ' ', vend.apellido) as vendedor"),
                'cli.idcliente', DB::raw("CONCAT(cli.nombre, ' ', cli.apellido) as cliente"), 'cli.razonsocial as nombrecomercial', 'cli.nit',
                'listprec.idlistaprecio', 'listprec.descripcion as listaprecio',
                'concepvta.idconceptoventa', 'concepvta.descripcion as conceptoventa',
                'mond.idmoneda', 'mond.descripcion as moneda',
                'ttrans.idtipotransaccion', 'ttrans.descripcion as tipotransaccion',
                'tpago.idtipopago', 'tpago.descripcion as tipopago',
            ] )
            ->leftJoin('sucursal as suc', 'devolucionnotaventa.fkidsucursal', '=', 'suc.idsucursal')
            ->leftJoin('almacen as alm', 'devolucionnotaventa.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('vendedor as vend', 'devolucionnotaventa.fkidvendedor', '=', 'vend.idvendedor')
            ->leftJoin('cliente as cli', 'devolucionnotaventa.fkidcliente', '=', 'cli.idcliente')
            ->leftJoin('listaprecio as listprec', 'devolucionnotaventa.fkidlistaprecio', '=', 'listprec.idlistaprecio')
            ->leftJoin('conceptoventa as concepvta', 'devolucionnotaventa.fkidconceptoventa', '=', 'concepvta.idconceptoventa')
            ->leftJoin('moneda as mond', 'devolucionnotaventa.fkidmoneda', '=', 'mond.idmoneda')
            ->leftJoin('tipotransaccion as ttrans', 'devolucionnotaventa.fkidtipotransaccion', '=', 'ttrans.idtipotransaccion')
            ->leftJoin('tipopago as tpago', 'devolucionnotaventa.fkidtipopago', '=', 'tpago.idtipopago')
            ->with( [ 'arraydevolucionnotaventadetalle' => function( $query ) {
                $query
                    ->select( [
                        'devolucionnotaventadetalle.iddevolucionnotaventadetalle', 'devolucionnotaventadetalle.fkiddevolucionnotaventa', 'devolucionnotaventadetalle.fkidproducto', 
                        'devolucionnotaventadetalle.fkidproductotipo', 'devolucionnotaventadetalle.fkidproductomarca', 'devolucionnotaventadetalle.fkidvendedor',
                        'devolucionnotaventadetalle.fkidalmacenproductodetalle', 'devolucionnotaventadetalle.fkidalmacen',
                        'devolucionnotaventadetalle.fkidcliente', 'devolucionnotaventadetalle.fkidsucursal',
                        'devolucionnotaventadetalle.fkidlistapreciodetalle', 'devolucionnotaventadetalle.fkidlistaprecio', 'devolucionnotaventadetalle.fkidnotaventadetalle',

                        'devolucionnotaventadetalle.cantidad', 'devolucionnotaventadetalle.cantidadvendida', 'devolucionnotaventadetalle.preciounitario', 
                        'devolucionnotaventadetalle.preciosubtotal', 'devolucionnotaventadetalle.nrolote', 'devolucionnotaventadetalle.nrofabrica', 
                        'devolucionnotaventadetalle.fechavencimiento', 'devolucionnotaventadetalle.nota', 'devolucionnotaventadetalle.estado',

                        'almproddet.idalmacenproductodetalle', 'almproddet.stockactual', 'almproddet.stockminimo', 'almproddet.stockmaximo', 
                        'almproddet.ingresos', 'almproddet.salidas', 'almproddet.traspasos', 'almproddet.ventas', 'almproddet.compras',
                        'prod.idproducto', 'prod.codigo', 'prod.nombre as producto', 'prod.stockactual as stocktotal', 'prod.peso', 'prod.volumen', 'prod.valorequivalente',
                        'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'alm.idalmacen', 'alm.descripcion as almacen', 'alm.fkidsucursal',
                        'venddor.idvendedor', DB::raw("CONCAT(venddor.nombre, ' ', venddor.apellido) as vendedor"),
                        'listprec.idlistaprecio', 'listprec.descripcion as listaprecio',
                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca',
                        'prodtipo.idproductotipo', 'prodtipo.descripcion as productotipo',
                        'prod.fkidciudadorigen', 'ciu.descripcion as ciudadorigen',
                    ] )
                    ->leftJoin('almacenproductodetalle as almproddet', 'devolucionnotaventadetalle.fkidalmacenproductodetalle', '=', 'almproddet.idalmacenproductodetalle')
                    ->leftJoin('almacen as alm', 'devolucionnotaventadetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('listaprecio as listprec', 'devolucionnotaventadetalle.fkidlistaprecio', '=', 'listprec.idlistaprecio')
                    ->leftJoin('vendedor as venddor', 'devolucionnotaventadetalle.fkidvendedor', '=', 'venddor.idvendedor')
                    ->leftJoin('producto as prod', 'devolucionnotaventadetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtipo', 'prod.fkidproductotipo', '=', 'prodtipo.idproductotipo')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciu', 'prod.fkidciudadorigen', '=', 'ciu.idciudad')
                    ->orderBy('devolucionnotaventadetalle.iddevolucionnotaventadetalle', 'ASC');
            } ] )
            ->where('devolucionnotaventa.iddevolucionnotaventa', '=', $iddevolucionnotaventa)
            ->whereNull('devolucionnotaventa.deleted_at')
            ->orderBy('devolucionnotaventa.iddevolucionnotaventa', 'DESC')
            ->first();

        return $devolucionnotaventa;
    }

}
