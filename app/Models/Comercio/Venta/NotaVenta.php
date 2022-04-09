<?php

namespace App\Models\Comercio\Venta;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class NotaVenta extends Model
{
    use SoftDeletes;

    protected $table      = 'notaventa';
    protected $primaryKey = 'idnotaventa';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'fkidmoneda' => null, 'fkidusers' => null,
        'nrodebito' => 0, 'nroventa' => 0, 'nrocotizacion' => 0, 'tipocambio' => 0,
        'estadoproceso' => 'F', 'tipoventa' => null, 'diascredito' => null, 'fechavencimiento' => null,
        'facturar' => 'N', 'nrofactura' => 0, 'razonsocial' => null, 'nit' => null, 'glosa' => null,
        'impuestoiva' => 0, 'montototalcobrado' => 0, 'montototaldeudamora' => 0, 'montototaldeudaactual' => 0,
        'descuentoacumulado' => 0, 'porcentajerangodescuentoinicial' => 0, 'porcentajerangodescuentofinal' => 0,
        'montosubtotal' => 0, 'descuento' => 0, 'montodescuento' => 0, 'montototal' => 0, 'montoanticipo' => 0,
        'isdevolucionventa' => 'N', 'cantidadtotal' => 0,
        'estado' => 'A',  'isdelete' => 'A',
        'codigo' => null, 'x_idusuario' => null,
    ];

    protected $fillable = [
        'codigo', 'fkidsucursal', 'fkidalmacen', 'fkidvendedor', 'fkidcliente', 'fkidlistaprecio', 'fkidconceptoventa',
        'fkidmoneda', 'fkidusers', 'fkidtipotransaccion', 'fkidtipopago',
        'nrodebito', 'nroventa', 'nrocotizacion', 'tipocambio', 'estadoproceso', 'tipoventa',
        'facturar', 'nrofactura', 'razonsocial', 'nit', 'glosa',
        'impuestoiva', 'montototalcobrado', 'montototaldeudamora', 'montototaldeudaactual',
        'descuentoacumulado', 'porcentajerangodescuentoinicial', 'porcentajerangodescuentofinal',
        'montosubtotal', 'descuento', 'montodescuento', 'montototal', 'montoanticipo', 'cantidadtotal',
        'isdevolucionventa', 'fechaventa', 'diascredito', 'fechavencimiento',
        'fecha', 'hora', 'estado', 'isdelete', 'x_idusuario',
    ];

    public function arraynotacompradetalle() {
        return $this->hasMany(
            'App\Models\Comercio\Venta\NotaVentaDetalle',
            'fkidnotaventa',
            'idnotaventa'
        );
    }

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'notaventa.idnotaventa';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $notaventa = $query
            ->select( [
                'notaventa.idnotaventa', 'notaventa.codigo', 'notaventa.fkidsucursal', 'notaventa.fkidalmacen', 'notaventa.fkidvendedor',
                'notaventa.fkidcliente', 'notaventa.fkidlistaprecio', 'notaventa.fkidconceptoventa', 'notaventa.fkidmoneda',
                'notaventa.fkidtipotransaccion', 'notaventa.fkidtipopago', 'notaventa.fkidusers',
                'notaventa.nrodebito', 'notaventa.nroventa', 'notaventa.nrocotizacion', 'notaventa.tipocambio', 'notaventa.estadoproceso',
                'notaventa.tipoventa', 'notaventa.facturar', 'notaventa.nrofactura', 'notaventa.razonsocial', 'notaventa.nit', 'notaventa.glosa',
                'notaventa.impuestoiva', 'notaventa.montototalcobrado', 'notaventa.montototaldeudamora', 'notaventa.montototaldeudaactual',
                'notaventa.descuentoacumulado', 'notaventa.porcentajerangodescuentoinicial', 'notaventa.porcentajerangodescuentofinal',
                'notaventa.montosubtotal', 'notaventa.descuento', 'notaventa.montodescuento', 'notaventa.montototal', 'notaventa.montoanticipo',
                'notaventa.isdevolucionventa', 'notaventa.fechaventa', 'notaventa.diascredito', 'notaventa.fechavencimiento', 'notaventa.cantidadtotal',
                'notaventa.estado', 'notaventa.isdelete', 'notaventa.fecha', 'notaventa.hora',
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
            ->leftJoin('sucursal as suc', 'notaventa.fkidsucursal', '=', 'suc.idsucursal')
            ->leftJoin('almacen as alm', 'notaventa.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('vendedor as vend', 'notaventa.fkidvendedor', '=', 'vend.idvendedor')
            ->leftJoin('cliente as cli', 'notaventa.fkidcliente', '=', 'cli.idcliente')
            ->leftJoin('listaprecio as listprec', 'notaventa.fkidlistaprecio', '=', 'listprec.idlistaprecio')
            ->leftJoin('conceptoventa as concepvta', 'notaventa.fkidconceptoventa', '=', 'concepvta.idconceptoventa')
            ->leftJoin('moneda as mond', 'notaventa.fkidmoneda', '=', 'mond.idmoneda')
            ->leftJoin('tipotransaccion as ttrans', 'notaventa.fkidtipotransaccion', '=', 'ttrans.idtipotransaccion')
            ->leftJoin('tipopago as tpago', 'notaventa.fkidtipopago', '=', 'tpago.idtipopago')
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('notaventa.idnotaventa', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('notaventa.codigo', $islike, '%' . $search . '%')
                        ->orWhere('alm.descripcion', $islike, '%' . $search . '%')
                        ->orWhere('suc.descripcion', $islike, '%' . $search . '%')
                        ->orWhere('concepvta.descripcion', $islike, '%' . $search . '%')
                        ->orWhere('notaventa.montototal', $islike, '%' . $search . '%')
                        ->orWhere( DB::raw("CONCAT(vend.nombre, ' ', vend.apellido)"), $islike, "%$search%" )
                        ->orWhere( DB::raw("CONCAT(cli.nombre, ' ', cli.apellido)"), $islike, "%$search%" );
                }
                return;
            } )
            ->with( [ 'arraynotacompradetalle' => function( $query ) {
                $query
                    ->select( [
                        'notaventadetalle.fkidnotaventa', 'notaventadetalle.fkidunidadmedidaproducto', 'notaventadetalle.fkidalmacenunidadmedidaproducto',
                        'notaventadetalle.fkidalmacen', 'notaventadetalle.fkidlistapreciodetalle', 'notaventadetalle.fkidvendedor',
                        'notaventadetalle.cantidad', 'notaventadetalle.cantidadsolicitada', 'notaventadetalle.preciounitario', 'notaventadetalle.preciounitariosubtotal',
                        'notaventadetalle.descuento', 'notaventadetalle.montodescuento', 'notaventadetalle.nota',
                        'notaventadetalle.estadoproceso', 'notaventadetalle.tipoentrega', 'notaventadetalle.isdevolucionventa',
                        'unidmedprod.codigo', 'unidmedprod.valorequivalente', 'unidmedprod.stock',
                        'prod.idproducto', 'prod.nombre as producto',
                        'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                    ] )
                    ->leftJoin('unidadmedidaproducto as undmedprod', 'notaventadetalle.fkidunidadmedidaproducto', '=', 'undmedprod.idunidadmedidaproducto')
                    ->leftJoin('producto as prod', 'undmedprod.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'undmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->orderBy('notaventadetalle', 'ASC');
            } ] )
            ->whereNull( 'notaventa.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $notaventa;
    }

    public function get_paginate( $query, $request )
    {
        $search   = isset($request->search)   ? $request->search  : null;
        $orderBy  = isset($request->orderBy)  ? $request->orderBy : 'DESC';
        $paginate = isset($request->paginate) ? $request->paginate : 20;
        $column   = 'notaventa.idnotaventa';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        if ( !is_numeric( $paginate ) ) $paginate = 20;

        $islike =  Functions::isLikeAndIlike();

        $notaventa = $query
            ->select( [
                'notaventa.idnotaventa', 'notaventa.codigo', 'notaventa.fkidsucursal', 'notaventa.fkidalmacen', 'notaventa.fkidvendedor',
                'notaventa.fkidcliente', 'notaventa.fkidlistaprecio', 'notaventa.fkidconceptoventa', 'notaventa.fkidmoneda',
                'notaventa.fkidtipotransaccion', 'notaventa.fkidtipopago', 'notaventa.fkidusers',
                'notaventa.nrodebito', 'notaventa.nroventa', 'notaventa.nrocotizacion', 'notaventa.tipocambio', 'notaventa.estadoproceso',
                'notaventa.tipoventa', 'notaventa.facturar', 'notaventa.nrofactura', 'notaventa.razonsocial', 'notaventa.nit', 'notaventa.glosa',
                'notaventa.impuestoiva', 'notaventa.montototalcobrado', 'notaventa.montototaldeudamora', 'notaventa.montototaldeudaactual',
                'notaventa.descuentoacumulado', 'notaventa.porcentajerangodescuentoinicial', 'notaventa.porcentajerangodescuentofinal',
                'notaventa.montosubtotal', 'notaventa.descuento', 'notaventa.montodescuento', 'notaventa.montototal', 'notaventa.montoanticipo',
                'notaventa.isdevolucionventa', 'notaventa.fechaventa', 'notaventa.diascredito', 'notaventa.fechavencimiento', 'notaventa.cantidadtotal',
                'notaventa.estado', 'notaventa.isdelete', 'notaventa.fecha', 'notaventa.hora',
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
            ->leftJoin('sucursal as suc', 'notaventa.fkidsucursal', '=', 'suc.idsucursal')
            ->leftJoin('almacen as alm', 'notaventa.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('vendedor as vend', 'notaventa.fkidvendedor', '=', 'vend.idvendedor')
            ->leftJoin('cliente as cli', 'notaventa.fkidcliente', '=', 'cli.idcliente')
            ->leftJoin('listaprecio as listprec', 'notaventa.fkidlistaprecio', '=', 'listprec.idlistaprecio')
            ->leftJoin('conceptoventa as concepvta', 'notaventa.fkidconceptoventa', '=', 'concepvta.idconceptoventa')
            ->leftJoin('moneda as mond', 'notaventa.fkidmoneda', '=', 'mond.idmoneda')
            ->leftJoin('tipotransaccion as ttrans', 'notaventa.fkidtipotransaccion', '=', 'ttrans.idtipotransaccion')
            ->leftJoin('tipopago as tpago', 'notaventa.fkidtipopago', '=', 'tpago.idtipopago')
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('notaventa.idnotaventa', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('notaventa.codigo', $islike, '%' . $search . '%')
                        ->orWhere('alm.descripcion', $islike, '%' . $search . '%')
                        ->orWhere('suc.descripcion', $islike, '%' . $search . '%')
                        ->orWhere('concepvta.descripcion', $islike, '%' . $search . '%')
                        ->orWhere('notaventa.montototal', $islike, '%' . $search . '%')
                        ->orWhere( DB::raw("CONCAT(vend.nombre, ' ', vend.apellido)"), $islike, "%$search%" )
                        ->orWhere( DB::raw("CONCAT(cli.nombre, ' ', cli.apellido)"), $islike, "%$search%" );
                }
                return;
            } )
            ->with( [ 'arraynotacompradetalle' => function( $query ) {
                $query
                    ->select( [
                        'notaventadetalle.fkidnotaventa', 'notaventadetalle.fkidunidadmedidaproducto', 'notaventadetalle.fkidalmacenunidadmedidaproducto',
                        'notaventadetalle.fkidalmacen', 'notaventadetalle.fkidlistapreciodetalle', 'notaventadetalle.fkidvendedor',
                        'notaventadetalle.cantidad', 'notaventadetalle.cantidadsolicitada', 'notaventadetalle.preciounitario', 'notaventadetalle.preciounitariosubtotal',
                        'notaventadetalle.descuento', 'notaventadetalle.montodescuento', 'notaventadetalle.nota',
                        'notaventadetalle.estadoproceso', 'notaventadetalle.tipoentrega', 'notaventadetalle.isdevolucionventa',
                        'unidmedprod.codigo', 'unidmedprod.valorequivalente', 'unidmedprod.stock',
                        'prod.idproducto', 'prod.nombre as producto',
                        'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                    ] )
                    ->leftJoin('unidadmedidaproducto as undmedprod', 'notaventadetalle.fkidunidadmedidaproducto', '=', 'undmedprod.idunidadmedidaproducto')
                    ->leftJoin('producto as prod', 'undmedprod.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'undmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->orderBy('notaventadetalle', 'ASC');
            } ] )
            ->whereNull( 'notaventa.deleted_at' )
            ->orderBy( $column, $orderBy )
            ->paginate($paginate);

        return $notaventa;
    }

    public function newID( )
    {
        $notaventa = DB::table('notaventa')
            ->select('notaventa.idnotaventa')
            ->orderBy('notaventa.idnotaventa', 'DESC')
            ->first();

        return ( is_null( $notaventa ) ) ? 1 : intval( $notaventa->idnotaventa ) + 1;
    }

    public function store( $query, $request )
    {
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
        $nrodebito  = isset( $request->nrodebito ) ? $request->nrodebito : 0;
        $nroventa  = isset( $request->nroventa ) ? $request->nroventa : 0;
        $nrocotizacion  = isset( $request->nrocotizacion ) ? $request->nrocotizacion : 0;
        $tipocambio  = isset( $request->tipocambio ) ? $request->tipocambio : 0;
        $estadoproceso  = isset( $request->estadoproceso ) ? $request->estadoproceso : 'F';
        $tipoventa  = isset( $request->tipoventa ) ? $request->tipoventa : null;

        $facturar  = isset( $request->facturar ) ? $request->facturar : 'N';
        $nrofactura  = isset( $request->nrofactura ) ? $request->nrofactura : null;
        $razonsocial  = isset( $request->razonsocial ) ? $request->razonsocial : null;
        $nit  = isset( $request->nit ) ? $request->nit : null;
        $glosa  = isset( $request->glosa ) ? $request->glosa : null;

        $impuestoiva  = isset( $request->impuestoiva ) ? $request->impuestoiva : 0;
        $montototalcobrado  = isset( $request->montototalcobrado ) ? $request->montototalcobrado : 0;
        $montototaldeudamora  = isset( $request->montototaldeudamora ) ? $request->montototaldeudamora : 0;
        $montototaldeudaactual  = isset( $request->montototaldeudaactual ) ? $request->montototaldeudaactual : 0;
        $montoanticipo  = isset( $request->montoanticipo ) ? $request->montoanticipo : 0;

        $descuentoacumulado  = isset( $request->descuentoacumulado ) ? $request->descuentoacumulado : 0;
        $porcentajerangodescuentoinicial  = isset( $request->porcentajerangodescuentoinicial ) ? $request->porcentajerangodescuentoinicial : 0;
        $porcentajerangodescuentofinal  = isset( $request->porcentajerangodescuentofinal ) ? $request->porcentajerangodescuentofinal : 0;

        $montosubtotal  = isset( $request->montosubtotal ) ? $request->montosubtotal : 0;
        $descuento  = isset( $request->descuento ) ? $request->descuento : 0;
        $montodescuento  = isset( $request->montodescuento ) ? $request->montodescuento : 0;
        $montototal  = isset( $request->montototal ) ? $request->montototal : 0;
        $cantidadtotal  = isset( $request->cantidadtotal ) ? $request->cantidadtotal : 0;

        $isdevolucionventa  = isset( $request->isdevolucionventa ) ? $request->isdevolucionventa : 'N';
        $fechaventa  = isset( $request->fechaventa ) ? $request->fechaventa : null;
        $diascredito  = isset( $request->diascredito ) ? $request->diascredito : null;
        $fechavencimiento  = isset( $request->fechavencimiento ) ? $request->fechavencimiento : null;
        $estado  = isset( $request->estado ) ? $request->estado : 'A';

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $notaventa = $query->create( [
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
            'nrodebito' => $nrodebito,
            'nroventa' => $nroventa,
            'nrocotizacion' => $nrocotizacion,
            'tipocambio' => $tipocambio,
            'estadoproceso' => $estadoproceso,
            'tipoventa' => $tipoventa,

            'facturar' => $facturar,
            'nrofactura' => $nrofactura,
            'razonsocial' => $razonsocial,
            'nit' => $nit,
            'glosa' => $glosa,

            'impuestoiva' => $impuestoiva,
            'montototalcobrado' => $montototalcobrado,
            'montototaldeudamora' => $montototaldeudamora,
            'montototaldeudaactual' => $montototaldeudaactual,
            'montoanticipo' => $montoanticipo,

            'descuentoacumulado' => $descuentoacumulado,
            'porcentajerangodescuentoinicial' => $porcentajerangodescuentoinicial,
            'porcentajerangodescuentofinal' => $porcentajerangodescuentofinal,

            'montosubtotal' => $montosubtotal,
            'descuento' => $descuento,
            'montodescuento' => $montodescuento,
            'montototal' => $montototal,
            'cantidadtotal' => $cantidadtotal,

            'isdevolucionventa' => $isdevolucionventa,
            'fechaventa' => $fechaventa,
            'diascredito' => $diascredito,
            'fechavencimiento' => $fechavencimiento,
            'estado' => $estado,

            'fecha' => $fecha,
            'hora'  => $hora,
        ] );

        return $notaventa;
    }

    public function upgrade( $query, $request )
    {
        $idnotaventa = isset( $request->idnotaventa ) ? $request->idnotaventa : null;

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
        $nrodebito  = isset( $request->nrodebito ) ? $request->nrodebito : 0;
        $nroventa  = isset( $request->nroventa ) ? $request->nroventa : 0;
        $nrocotizacion  = isset( $request->nrocotizacion ) ? $request->nrocotizacion : 0;
        $tipocambio  = isset( $request->tipocambio ) ? $request->tipocambio : 0;
        $estadoproceso  = isset( $request->estadoproceso ) ? $request->estadoproceso : 'F';
        $tipoventa  = isset( $request->tipoventa ) ? $request->tipoventa : null;

        $facturar  = isset( $request->facturar ) ? $request->facturar : 'N';
        $nrofactura  = isset( $request->nrofactura ) ? $request->nrofactura : null;
        $razonsocial  = isset( $request->razonsocial ) ? $request->razonsocial : null;
        $nit  = isset( $request->nit ) ? $request->nit : null;
        $glosa  = isset( $request->glosa ) ? $request->glosa : null;

        $impuestoiva  = isset( $request->impuestoiva ) ? $request->impuestoiva : 0;
        $montototalcobrado  = isset( $request->montototalcobrado ) ? $request->montototalcobrado : 0;
        $montototaldeudamora  = isset( $request->montototaldeudamora ) ? $request->montototaldeudamora : 0;
        $montototaldeudaactual  = isset( $request->montototaldeudaactual ) ? $request->montototaldeudaactual : 0;
        $montoanticipo  = isset( $request->montoanticipo ) ? $request->montoanticipo : 0;

        $descuentoacumulado  = isset( $request->descuentoacumulado ) ? $request->descuentoacumulado : 0;
        $porcentajerangodescuentoinicial  = isset( $request->porcentajerangodescuentoinicial ) ? $request->porcentajerangodescuentoinicial : 0;
        $porcentajerangodescuentofinal  = isset( $request->porcentajerangodescuentofinal ) ? $request->porcentajerangodescuentofinal : 0;

        $montosubtotal  = isset( $request->montosubtotal ) ? $request->montosubtotal : 0;
        $descuento  = isset( $request->descuento ) ? $request->descuento : 0;
        $montodescuento  = isset( $request->montodescuento ) ? $request->montodescuento : 0;
        $montototal  = isset( $request->montototal ) ? $request->montototal : 0;
        $cantidadtotal  = isset( $request->cantidadtotal ) ? $request->cantidadtotal : 0;

        $isdevolucionventa  = isset( $request->isdevolucionventa ) ? $request->isdevolucionventa : 'N';
        $fechaventa  = isset( $request->fechaventa ) ? $request->fechaventa : null;
        $diascredito  = isset( $request->diascredito ) ? $request->diascredito : null;
        $fechavencimiento  = isset( $request->fechavencimiento ) ? $request->fechavencimiento : null;
        $estado  = isset( $request->estado ) ? $request->estado : 'A';

        $notaventa = $query->where( 'idnotaventa', '=', $idnotaventa )
            ->update( [
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
                'nrodebito' => $nrodebito,
                'nroventa' => $nroventa,
                'nrocotizacion' => $nrocotizacion,
                'tipocambio' => $tipocambio,
                'estadoproceso' => $estadoproceso,
                'tipoventa' => $tipoventa,

                'facturar' => $facturar,
                'nrofactura' => $nrofactura,
                'razonsocial' => $razonsocial,
                'nit' => $nit,
                'glosa' => $glosa,

                'impuestoiva' => $impuestoiva,
                'montototalcobrado' => $montototalcobrado,
                'montototaldeudamora' => $montototaldeudamora,
                'montototaldeudaactual' => $montototaldeudaactual,
                'montoanticipo' => $montoanticipo,

                'descuentoacumulado' => $descuentoacumulado,
                'porcentajerangodescuentoinicial' => $porcentajerangodescuentoinicial,
                'porcentajerangodescuentofinal' => $porcentajerangodescuentofinal,

                'montosubtotal' => $montosubtotal,
                'descuento' => $descuento,
                'montodescuento' => $montodescuento,
                'montototal' => $montototal,
                'cantidadtotal' => $cantidadtotal,

                'isdevolucionventa' => $isdevolucionventa,
                'fechaventa' => $fechaventa,
                'diascredito' => $diascredito,
                'fechavencimiento' => $fechavencimiento,
                'estado' => $estado,
            ] );

        return $notaventa;
    }

    public function show( $query, $idnotaventa ) {

        $notaventa = $query
            ->select( [
                'notaventa.idnotaventa', 'notaventa.codigo', 'notaventa.fkidsucursal', 'notaventa.fkidalmacen', 'notaventa.fkidvendedor',
                'notaventa.fkidcliente', 'notaventa.fkidlistaprecio', 'notaventa.fkidconceptoventa', 'notaventa.fkidmoneda',
                'notaventa.fkidtipotransaccion', 'notaventa.fkidtipopago', 'notaventa.fkidusers',
                'notaventa.nrodebito', 'notaventa.nroventa', 'notaventa.nrocotizacion', 'notaventa.tipocambio', 'notaventa.estadoproceso',
                'notaventa.tipoventa', 'notaventa.facturar', 'notaventa.nrofactura', 'notaventa.razonsocial', 'notaventa.nit', 'notaventa.glosa',
                'notaventa.impuestoiva', 'notaventa.montototalcobrado', 'notaventa.montototaldeudamora', 'notaventa.montototaldeudaactual',
                'notaventa.descuentoacumulado', 'notaventa.porcentajerangodescuentoinicial', 'notaventa.porcentajerangodescuentofinal',
                'notaventa.montosubtotal', 'notaventa.descuento', 'notaventa.montodescuento', 'notaventa.montototal', 'notaventa.montoanticipo',
                'notaventa.isdevolucionventa', 'notaventa.fechaventa', 'notaventa.diascredito', 'notaventa.fechavencimiento', 'notaventa.cantidadtotal',
                'notaventa.estado', 'notaventa.isdelete', 'notaventa.fecha', 'notaventa.hora',
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
            ->leftJoin('sucursal as suc', 'notaventa.fkidsucursal', '=', 'suc.idsucursal')
            ->leftJoin('almacen as alm', 'notaventa.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('vendedor as vend', 'notaventa.fkidvendedor', '=', 'vend.idvendedor')
            ->leftJoin('cliente as cli', 'notaventa.fkidcliente', '=', 'cli.idcliente')
            ->leftJoin('listaprecio as listprec', 'notaventa.fkidlistaprecio', '=', 'listprec.idlistaprecio')
            ->leftJoin('conceptoventa as concepvta', 'notaventa.fkidconceptoventa', '=', 'concepvta.idconceptoventa')
            ->leftJoin('moneda as mond', 'notaventa.fkidmoneda', '=', 'mond.idmoneda')
            ->leftJoin('tipotransaccion as ttrans', 'notaventa.fkidtipotransaccion', '=', 'ttrans.idtipotransaccion')
            ->leftJoin('tipopago as tpago', 'notaventa.fkidtipopago', '=', 'tpago.idtipopago')
            ->with( [ 'arraynotacompradetalle' => function( $query ) {
                $query
                    ->select( [
                        'notaventadetalle.fkidnotaventa', 'notaventadetalle.fkidunidadmedidaproducto', 'notaventadetalle.fkidalmacenunidadmedidaproducto',
                        'notaventadetalle.fkidalmacen', 'notaventadetalle.fkidlistapreciodetalle', 'notaventadetalle.fkidvendedor',
                        'notaventadetalle.cantidad', 'notaventadetalle.cantidadsolicitada', 'notaventadetalle.preciounitario', 'notaventadetalle.preciounitariosubtotal',
                        'notaventadetalle.descuento', 'notaventadetalle.montodescuento', 'notaventadetalle.nota',
                        'notaventadetalle.estadoproceso', 'notaventadetalle.tipoentrega', 'notaventadetalle.isdevolucionventa',
                        'unidmedprod.codigo', 'unidmedprod.valorequivalente', 'unidmedprod.stock',
                        'prod.idproducto', 'prod.nombre as producto',
                        'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                    ] )
                    ->leftJoin('unidadmedidaproducto as undmedprod', 'notaventadetalle.fkidunidadmedidaproducto', '=', 'undmedprod.idunidadmedidaproducto')
                    ->leftJoin('producto as prod', 'undmedprod.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'undmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->orderBy('notaventadetalle', 'ASC');
            } ] )
            ->where( 'notaventa.idnotaventa', '=', $idnotaventa )
            ->whereNull('notaventa.deleted_at')
            ->orderBy('notaventa.idnotaventa', 'DESC')
            ->first();

        return $notaventa;
    }

    public function scopeEnable( $query, $request )
    {
        $idnotaventa = $request->idnotaventa;
        $query->where('idnotaventa', '=', $idnotaventa)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idnotaventa = $request->idnotaventa;
        $query->where('idnotaventa', '=', $idnotaventa)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idnotaventa = $request->idnotaventa;
        $query->where('idnotaventa', '=', $idnotaventa)->delete();
    }

    public function searchByID( $query, $idnotaventa ) {
        $notaventa = $query
            ->select( [
                'notaventa.idnotaventa', 'notaventa.codigo', 'notaventa.fkidsucursal', 'notaventa.fkidalmacen', 'notaventa.fkidvendedor',
                'notaventa.fkidcliente', 'notaventa.fkidlistaprecio', 'notaventa.fkidconceptoventa', 'notaventa.fkidmoneda',
                'notaventa.fkidtipotransaccion', 'notaventa.fkidtipopago', 'notaventa.fkidusers',
                'notaventa.nrodebito', 'notaventa.nroventa', 'notaventa.nrocotizacion', 'notaventa.tipocambio', 'notaventa.estadoproceso',
                'notaventa.tipoventa', 'notaventa.facturar', 'notaventa.nrofactura', 'notaventa.razonsocial', 'notaventa.nit', 'notaventa.glosa',
                'notaventa.impuestoiva', 'notaventa.montototalcobrado', 'notaventa.montototaldeudamora', 'notaventa.montototaldeudaactual',
                'notaventa.descuentoacumulado', 'notaventa.porcentajerangodescuentoinicial', 'notaventa.porcentajerangodescuentofinal',
                'notaventa.montosubtotal', 'notaventa.descuento', 'notaventa.montodescuento', 'notaventa.montototal', 'notaventa.montoanticipo',
                'notaventa.isdevolucionventa', 'notaventa.fechaventa', 'notaventa.diascredito', 'notaventa.fechavencimiento', 'notaventa.cantidadtotal',
                'notaventa.estado', 'notaventa.isdelete', 'notaventa.fecha', 'notaventa.hora',
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
            ->leftJoin('sucursal as suc', 'notaventa.fkidsucursal', '=', 'suc.idsucursal')
            ->leftJoin('almacen as alm', 'notaventa.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('vendedor as vend', 'notaventa.fkidvendedor', '=', 'vend.idvendedor')
            ->leftJoin('cliente as cli', 'notaventa.fkidcliente', '=', 'cli.idcliente')
            ->leftJoin('listaprecio as listprec', 'notaventa.fkidlistaprecio', '=', 'listprec.idlistaprecio')
            ->leftJoin('conceptoventa as concepvta', 'notaventa.fkidconceptoventa', '=', 'concepvta.idconceptoventa')
            ->leftJoin('moneda as mond', 'notaventa.fkidmoneda', '=', 'mond.idmoneda')
            ->leftJoin('tipotransaccion as ttrans', 'notaventa.fkidtipotransaccion', '=', 'ttrans.idtipotransaccion')
            ->leftJoin('tipopago as tpago', 'notaventa.fkidtipopago', '=', 'tpago.idtipopago')
            ->with( [ 'arraynotacompradetalle' => function( $query ) {
                $query
                    ->select( [
                        'notaventadetalle.fkidnotaventa', 'notaventadetalle.fkidunidadmedidaproducto', 'notaventadetalle.fkidalmacenunidadmedidaproducto',
                        'notaventadetalle.fkidalmacen', 'notaventadetalle.fkidlistapreciodetalle', 'notaventadetalle.fkidvendedor',
                        'notaventadetalle.cantidad', 'notaventadetalle.cantidadsolicitada', 'notaventadetalle.preciounitario', 'notaventadetalle.preciounitariosubtotal',
                        'notaventadetalle.descuento', 'notaventadetalle.montodescuento', 'notaventadetalle.nota',
                        'notaventadetalle.estadoproceso', 'notaventadetalle.tipoentrega', 'notaventadetalle.isdevolucionventa',
                        'unidmedprod.codigo', 'unidmedprod.valorequivalente', 'unidmedprod.stock',
                        'prod.idproducto', 'prod.nombre as producto',
                        'unidmed.idunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                    ] )
                    ->leftJoin('unidadmedidaproducto as undmedprod', 'notaventadetalle.fkidunidadmedidaproducto', '=', 'undmedprod.idunidadmedidaproducto')
                    ->leftJoin('producto as prod', 'undmedprod.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'undmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->orderBy('notaventadetalle', 'ASC');
            } ] )
            ->where('notaventa.idnotaventa', '=', $idnotaventa)
            ->whereNull('notaventa.deleted_at')
            ->orderBy('notaventa.idnotaventa', 'DESC')
            ->first();

        return $notaventa;
    }
}
