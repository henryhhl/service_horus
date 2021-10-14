<?php

namespace App\Http\Controllers\Comercio\Compra;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Comercio\Compra\ConceptoCompra;
use App\Models\Comercio\Compra\NotaCompra;
use App\Models\Comercio\Compra\Proveedor;
use App\Models\Comercio\Inventario\Almacen;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class InformeCompraController extends Controller
{
    
    
    public function notacomprageneral( Request $request ) {
        try {

            $tipoinforme = isset( $request->tipoinforme ) ? $request->tipoinforme : null;

            $fechainicio = isset( $request->fechainicio ) ? $request->fechainicio : null;
            $fechafinal = isset( $request->fechafinal ) ? $request->fechafinal : null;
            $fkidsucursal = isset( $request->fkidsucursal) ? $request->fkidsucursal : null;
            $fkidalmacen = isset( $request->fkidalmacen ) ? $request->fkidalmacen : null;
            $fkidconceptocompra = isset( $request->fkidconceptocompra ) ? $request->fkidconceptocompra : null;
            $fkidproveedor = isset( $request->fkidproveedor ) ? $request->fkidproveedor : null;
            $fkidcategoria = isset( $request->fkidcategoria ) ? $request->fkidcategoria : null;
            $fkidproductomarca = isset( $request->fkidproductomarca ) ? $request->fkidproductomarca : null;
            $fkidproductogrupo = isset( $request->fkidproductogrupo ) ? $request->fkidproductogrupo : null;
            $fkidproductosubgrupo = isset( $request->fkidproductosubgrupo ) ? $request->fkidproductosubgrupo : null;
            $fkidproducto = isset( $request->fkidproducto ) ? $request->fkidproducto : null;
            $tipocompra = isset( $request->tipocompra ) ? $request->tipocompra : null;
            $formato = isset( $request->formato ) ? $request->formato : null;

            $arrayCondicionNotaCompra = [];
            $arrayCondicionProveedor = [];
            $arrayCondicionAlmacen = [];
            $arrayCondicionConcepto = [];

            if ( !is_null( $fkidsucursal ) ) {
                array_push( $arrayCondicionNotaCompra, [ 'notacompra.fkidsucursal', '=', $fkidsucursal ] );

                array_push( $arrayCondicionProveedor, [
                    DB::raw( "(
                        SELECT COUNT(*) 
                        FROM notacompra ntacomp 
                        WHERE ntacomp.fkidproveedor = proveedor.idproveedor AND ntacomp.fkidsucursal = '$fkidsucursal'
                    )" ), '>', '0'
                ] );

                array_push( $arrayCondicionAlmacen, [
                    DB::raw( "(
                        SELECT COUNT(*) 
                        FROM notacompra ntacomp 
                        WHERE ntacomp.fkidalmacen = almacen.idalmacen AND ntacomp.fkidsucursal = '$fkidsucursal'
                    )" ), '>', '0'
                ] );

                array_push( $arrayCondicionConcepto, [
                    DB::raw( "(
                        SELECT COUNT(*) 
                        FROM notacompra ntacomp 
                        WHERE ntacomp.fkidconceptocompra = conceptocompra.idconceptocompra AND ntacomp.fkidsucursal = '$fkidsucursal'
                    )" ), '>', '0'
                ] );
            }

            if ( !is_null( $fkidalmacen ) ) {
                array_push( $arrayCondicionNotaCompra, [ 'notacompra.fkidalmacen', '=', $fkidalmacen ] );

                array_push( $arrayCondicionProveedor, [
                    DB::raw( "(
                        SELECT COUNT(*) 
                        FROM notacompra as ntacomp 
                        WHERE ntacomp.fkidproveedor = proveedor.idproveedor AND ntacomp.fkidalmacen = '$fkidalmacen'
                    )" ), '>', '0'
                ] );

                array_push( $arrayCondicionAlmacen, [
                    DB::raw( "(
                        SELECT COUNT(*) 
                        FROM notacompra ntacomp 
                        WHERE ntacomp.fkidalmacen = almacen.idalmacen AND ntacomp.fkidalmacen = '$fkidalmacen'
                    )" ), '>', '0'
                ] );

                array_push( $arrayCondicionConcepto, [
                    DB::raw( "(
                        SELECT COUNT(*) 
                        FROM notacompra ntacomp 
                        WHERE ntacomp.fkidconceptocompra = conceptocompra.idconceptocompra AND ntacomp.fkidalmacen = '$fkidalmacen'
                    )" ), '>', '0'
                ] );
            }

            if ( !is_null( $fkidconceptocompra ) ) {
                array_push( $arrayCondicionNotaCompra, [ 'notacompra.fkidconceptocompra', '=', $fkidconceptocompra ] );

                array_push( $arrayCondicionProveedor, [
                    DB::raw( "(
                        SELECT COUNT(*) 
                        FROM notacompra as ntacomp 
                        WHERE ntacomp.fkidproveedor = proveedor.idproveedor AND ntacomp.fkidconceptocompra = '$fkidconceptocompra'
                    )" ), '>', '0'
                ] );

                array_push( $arrayCondicionAlmacen, [
                    DB::raw( "(
                        SELECT COUNT(*) 
                        FROM notacompra ntacomp 
                        WHERE ntacomp.fkidalmacen = almacen.idalmacen AND ntacomp.fkidconceptocompra = '$fkidconceptocompra'
                    )" ), '>', '0'
                ] );

                array_push( $arrayCondicionConcepto, [
                    DB::raw( "(
                        SELECT COUNT(*) 
                        FROM notacompra ntacomp 
                        WHERE ntacomp.fkidconceptocompra = conceptocompra.idconceptocompra AND ntacomp.fkidconceptocompra = '$fkidconceptocompra'
                    )" ), '>', '0'
                ] );
            }

            if ( !is_null( $fkidproveedor ) ) {
                array_push( $arrayCondicionNotaCompra, [ 'notacompra.fkidproveedor', '=', $fkidproveedor ] );

                array_push( $arrayCondicionProveedor, [
                    DB::raw( "(
                        SELECT COUNT(*) 
                        FROM notacompra ntacomp 
                        WHERE ntacomp.fkidproveedor = proveedor.idproveedor AND ntacomp.fkidproveedor = '$fkidproveedor'
                    )" ), '>', '0'
                ] );

                array_push( $arrayCondicionAlmacen, [
                    DB::raw( "(
                        SELECT COUNT(*) 
                        FROM notacompra ntacomp 
                        WHERE ntacomp.fkidalmacen = almacen.idalmacen AND ntacomp.fkidproveedor = '$fkidproveedor'
                    )" ), '>', '0'
                ] );

                array_push( $arrayCondicionConcepto, [
                    DB::raw( "(
                        SELECT COUNT(*) 
                        FROM notacompra ntacomp 
                        WHERE ntacomp.fkidconceptocompra = conceptocompra.idconceptocompra AND ntacomp.fkidproveedor = '$fkidproveedor'
                    )" ), '>', '0'
                ] );
            }

            if ( $tipocompra == "E" || $tipocompra == "L" ) {
                array_push( $arrayCondicionNotaCompra, [ 'notacompra.tipocompra', '=', $tipocompra ] );

                array_push( $arrayCondicionProveedor, [
                    DB::raw( "(
                        SELECT COUNT(*) 
                        FROM notacompra ntacomp 
                        WHERE ntacomp.fkidproveedor = proveedor.idproveedor AND ntacomp.tipocompra = '$tipocompra'
                    )" ), '>', '0'
                ] );

                array_push( $arrayCondicionAlmacen, [
                    DB::raw( "(
                        SELECT COUNT(*) 
                        FROM notacompra ntacomp 
                        WHERE ntacomp.fkidalmacen = almacen.idalmacen AND ntacomp.tipocompra = '$tipocompra'
                    )" ), '>', '0'
                ] );

                array_push( $arrayCondicionConcepto, [
                    DB::raw( "(
                        SELECT COUNT(*) 
                        FROM notacompra ntacomp 
                        WHERE ntacomp.fkidconceptocompra = conceptocompra.idconceptocompra AND ntacomp.tipocompra = '$tipocompra'
                    )" ), '>', '0'
                ] );
            }

            if ( !is_null( $fechainicio ) ) {
                if ( !is_null( $fechafinal ) ) {
                    array_push( $arrayCondicionNotaCompra, [ 'notacompra.fechanotacompra', '>=', $fechainicio ] );
                    array_push( $arrayCondicionNotaCompra, [ 'notacompra.fechanotacompra', '<=', $fechafinal ] );

                    array_push( $arrayCondicionProveedor, [
                        DB::raw( "(
                            SELECT COUNT(*) 
                            FROM notacompra ntacomp 
                            WHERE ntacomp.fkidproveedor = proveedor.idproveedor AND ntacomp.fechanotacompra >= '$fechainicio'
                        )" ), '>', '0'
                    ] );
                    array_push( $arrayCondicionProveedor, [
                        DB::raw( "(
                            SELECT COUNT(*) 
                            FROM notacompra ntacomp 
                            WHERE ntacomp.fkidproveedor = proveedor.idproveedor AND ntacomp.fechanotacompra <= '$fechafinal'
                        )" ), '>', '0'
                    ] );

                    array_push( $arrayCondicionAlmacen, [
                        DB::raw( "(
                            SELECT COUNT(*) 
                            FROM notacompra ntacomp 
                            WHERE ntacomp.fkidalmacen = almacen.idalmacen AND ntacomp.fechanotacompra >= '$fechainicio'
                        )" ), '>', '0'
                    ] );
                    array_push( $arrayCondicionAlmacen, [
                        DB::raw( "(
                            SELECT COUNT(*) 
                            FROM notacompra ntacomp 
                            WHERE ntacomp.fkidalmacen = almacen.idalmacen AND ntacomp.fechanotacompra <= '$fechafinal'
                        )" ), '>', '0'
                    ] );

                    array_push( $arrayCondicionConcepto, [
                        DB::raw( "(
                            SELECT COUNT(*) 
                            FROM notacompra ntacomp 
                            WHERE ntacomp.fkidconceptocompra = conceptocompra.idconceptocompra AND ntacomp.fechanotacompra >= '$fechainicio'
                        )" ), '>', '0'
                    ] );
                    array_push( $arrayCondicionConcepto, [
                        DB::raw( "(
                            SELECT COUNT(*) 
                            FROM notacompra ntacomp 
                            WHERE ntacomp.fkidconceptocompra = conceptocompra.idconceptocompra AND ntacomp.fechanotacompra <= '$fechafinal'
                        )" ), '>', '0'
                    ] );
                } else {
                    array_push( $arrayCondicionNotaCompra, [ 'notacompra.fechanotacompra', '>=', $fechainicio ] );

                    array_push( $arrayCondicionProveedor, [
                        DB::raw( "(
                            SELECT COUNT(*) 
                            FROM notacompra ntacomp 
                            WHERE ntacomp.fkidproveedor = proveedor.idproveedor AND ntacomp.fechanotacompra >= '$fechainicio'
                        )" ), '>', '0'
                    ] );

                    array_push( $arrayCondicionAlmacen, [
                        DB::raw( "(
                            SELECT COUNT(*) 
                            FROM notacompra ntacomp 
                            WHERE ntacomp.fkidalmacen = almacen.idalmacen AND ntacomp.fechanotacompra >= '$fechainicio'
                        )" ), '>', '0'
                    ] );

                    array_push( $arrayCondicionConcepto, [
                        DB::raw( "(
                            SELECT COUNT(*) 
                            FROM notacompra ntacomp 
                            WHERE ntacomp.fkidconceptocompra = conceptocompra.idconceptocompra AND ntacomp.fechanotacompra >= '$fechainicio'
                        )" ), '>', '0'
                    ] );
                }
            }

            $arrayInformeCompra= [];

            $prov = new Proveedor();
            $alm = new Almacen();
            $concepcomp = new ConceptoCompra();
            $notcomp = new NotaCompra();

            if ( $formato == "PN" ) {

                $arrayInformeCompra = $prov
                    ->leftJoin('ciudad as ciupais', 'proveedor.fkidciudadpais', '=', 'ciupais.idciudad')
                    ->leftJoin('ciudad as ciu', 'proveedor.fkidciudad', '=', 'ciu.idciudad')
                    ->leftJoin('proveedortipo as provtipo', 'proveedor.fkidproveedortipo', '=', 'provtipo.idproveedortipo')
                    ->leftJoin('proveedorgrupo as provgrupo', 'proveedor.fkidproveedorgrupo', '=', 'provgrupo.idproveedorgrupo')
                    ->select( [
                        'proveedor.idproveedor', 'proveedor.codigo', 'proveedor.nombre', 'proveedor.nit', 'proveedor.nroorden', 'proveedor.tipopersoneria',
                        'proveedor.fkidproveedortipo', 'provtipo.descripcion as proveedortipo',
                        'proveedor.fkidproveedorgrupo', 'provgrupo.descripcion as proveedorgrupo',
                    ] )
                    ->with( [ 'arraynotacompra' => function( $query ) use ( $arrayCondicionNotaCompra ) {
                        $query
                            ->leftJoin('sucursal as sucu', 'notacompra.fkidsucursal', '=', 'sucu.idsucursal')
                            ->leftJoin('almacen as alm', 'notacompra.fkidalmacen', '=', 'alm.idalmacen')
                            ->leftJoin('conceptocompra as concepcomp', 'notacompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
                            ->select( [
                                'notacompra.idnotacompra', 'notacompra.fkidproveedor', 'notacompra.impuestototal', 'notacompra.fechanotacompra', 
                                'notacompra.tipocambio', 'notacompra.montosubtotal', 'notacompra.montodescuento', 'notacompra.montototal', 
                                'notacompra.fletes', 'notacompra.internacion', 'notacompra.otrosgastos',
                                'notacompra.fkidsucursal', 'sucu.descripcion as sucursal',
                                'notacompra.fkidalmacen', 'alm.descripcion as almacen',
                                'notacompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                            ] )
                            ->where( $arrayCondicionNotaCompra )
                            ->with( [ 'arraynotacompradetalle' => function( $query ) {
                                $query
                                    ->leftJoin('unidadmedidaproducto as unidmedprod', 'notacompradetalle.fkidunidadmedidaproducto', '=', 'unidmedprod.idunidadmedidaproducto')
                                    ->leftJoin('unidadmedida as unidmed', 'unidmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                                    ->leftJoin('producto as prod', 'unidmedprod.fkidproducto', '=', 'prod.idproducto')
                                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                                    ->select( 
                                        'notacompradetalle.idnotacompradetalle', 'notacompradetalle.fkidnotacompra', 'notacompradetalle.fkidordencompradetalle',
                                        'notacompradetalle.fkidunidadmedidaproducto', 'notacompradetalle.cantidad', 'notacompradetalle.cantidadsolicitada', 
                                        'notacompradetalle.cantidadrecibida', 'notacompradetalle.cantidadfaltante','notacompradetalle.cantidadsobrante', 'notacompradetalle.nota',
                                        'notacompradetalle.nrocajas', 'notacompradetalle.costounitario', 'notacompradetalle.costosubtotal', 
                                        'notacompradetalle.peso', 'notacompradetalle.pesosubtotal', 'notacompradetalle.volumen', 'notacompradetalle.volumensubtotal',
                                        'notacompradetalle.isdevolucioncompra', 'notacompradetalle.isordencompra', 'notacompradetalle.issolicitudcompra', 
                                        'notacompradetalle.fechavencimiento', 'notacompradetalle.nrolote', 'notacompradetalle.nrofabrica', 'notacompradetalle.estado',
                                        'unidmedprod.stock', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida', 'unidmedprod.codigo',
                                        'prod.idproducto', 'prod.nombre', 
                                        'ciud.idciudad', 'ciud.descripcion as ciudadorigen',
                                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca'
                                    )
                                    ->orderBy('notacompradetalle.idnotacompradetalle');
                            } ] )
                            ->orderBy('notacompra.idnotacompra');
                    } ] )
                    ->where( $arrayCondicionProveedor )
                    ->whereNull('proveedor.deleted_at')
                    ->orderBy('proveedor.idproveedor', 'ASC')
                    ->get()->toArray();
            }

            if ( $formato == "AN" ) {

                $arrayInformeCompra = $alm
                    ->leftJoin('sucursal as suc', 'almacen.fkidsucursal', '=', 'suc.idsucursal')
                    ->select( [
                        'almacen.idalmacen', 'almacen.codigo', 'almacen.descripcion as almacen', 'almacen.direccion',
                        'almacen.fkidsucursal', 'suc.descripcion as sucursal',
                    ] )
                    ->with( [ 'arraynotacompra' => function( $query ) use ( $arrayCondicionNotaCompra ) {
                        $query
                            ->leftJoin('conceptocompra as concepcomp', 'notacompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
                            ->leftJoin('proveedor as prov', 'notacompra.fkidproveedor', '=', 'prov.idproveedor')
                            ->select( [
                                'notacompra.idnotacompra', 'notacompra.fkidalmacen', 'notacompra.fechanotacompra', 
                                'notacompra.tipocambio', 'notacompra.montosubtotal', 'notacompra.montodescuento', 'notacompra.montototal', 
                                'notacompra.fletes', 'notacompra.internacion', 'notacompra.otrosgastos', 'notacompra.impuestototal',
                                'notacompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra',
                                'notacompra.fkidproveedor', 'prov.nombre as proveedor'
                            ] )
                            ->where( $arrayCondicionNotaCompra )
                            ->with( [ 'arraynotacompradetalle' => function( $query ) {
                                $query
                                    ->leftJoin('unidadmedidaproducto as unidmedprod', 'notacompradetalle.fkidunidadmedidaproducto', '=', 'unidmedprod.idunidadmedidaproducto')
                                    ->leftJoin('unidadmedida as unidmed', 'unidmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                                    ->leftJoin('producto as prod', 'unidmedprod.fkidproducto', '=', 'prod.idproducto')
                                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                                    ->select( 
                                        'notacompradetalle.idnotacompradetalle', 'notacompradetalle.fkidnotacompra', 'notacompradetalle.fkidordencompradetalle',
                                        'notacompradetalle.fkidunidadmedidaproducto', 'notacompradetalle.cantidad', 'notacompradetalle.cantidadsolicitada', 
                                        'notacompradetalle.cantidadrecibida', 'notacompradetalle.cantidadfaltante','notacompradetalle.cantidadsobrante', 'notacompradetalle.nota',
                                        'notacompradetalle.nrocajas', 'notacompradetalle.costounitario', 'notacompradetalle.costosubtotal', 
                                        'notacompradetalle.peso', 'notacompradetalle.pesosubtotal', 'notacompradetalle.volumen', 'notacompradetalle.volumensubtotal',
                                        'notacompradetalle.isdevolucioncompra', 'notacompradetalle.isordencompra', 'notacompradetalle.issolicitudcompra', 
                                        'notacompradetalle.fechavencimiento', 'notacompradetalle.nrolote', 'notacompradetalle.nrofabrica', 'notacompradetalle.estado',
                                        'unidmedprod.stock', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida', 'unidmedprod.codigo',
                                        'prod.idproducto', 'prod.nombre', 
                                        'ciud.idciudad', 'ciud.descripcion as ciudadorigen',
                                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca'
                                    )
                                    ->orderBy('notacompradetalle.idnotacompradetalle');
                            } ] )
                            ->orderBy('notacompra.idnotacompra');
                    } ] )
                    ->where( $arrayCondicionAlmacen )
                    ->whereNull('almacen.deleted_at')
                    ->orderBy('almacen.idalmacen', 'ASC')
                    ->get()->toArray();
            }

            if ( $formato == "CN" ) {
                
                $arrayInformeCompra = $concepcomp
                    ->select( [
                        'conceptocompra.idconceptocompra', 'conceptocompra.descripcion as conceptocompra',
                    ] )
                    ->with( [ 'arraynotacompra' => function( $query ) use ( $arrayCondicionNotaCompra ) {
                        $query
                            ->leftJoin('sucursal as sucu', 'notacompra.fkidsucursal', '=', 'sucu.idsucursal')
                            ->leftJoin('almacen as alm', 'notacompra.fkidalmacen', '=', 'alm.idalmacen')
                            ->leftJoin('proveedor as prov', 'notacompra.fkidproveedor', '=', 'prov.idproveedor')
                            ->select( [
                                'notacompra.idnotacompra', 'notacompra.fkidconceptocompra', 'notacompra.fechanotacompra', 
                                'notacompra.tipocambio', 'notacompra.montosubtotal', 'notacompra.montodescuento', 'notacompra.montototal', 
                                'notacompra.fletes', 'notacompra.internacion', 'notacompra.otrosgastos', 'notacompra.impuestototal',
                                'notacompra.fkidsucursal', 'sucu.descripcion as sucursal',
                                'notacompra.fkidalmacen', 'alm.descripcion as almacen',
                                'notacompra.fkidproveedor', 'prov.nombre as proveedor'
                            ] )
                            ->where( $arrayCondicionNotaCompra )
                            ->with( [ 'arraynotacompradetalle' => function( $query ) {
                                $query
                                    ->leftJoin('unidadmedidaproducto as unidmedprod', 'notacompradetalle.fkidunidadmedidaproducto', '=', 'unidmedprod.idunidadmedidaproducto')
                                    ->leftJoin('unidadmedida as unidmed', 'unidmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                                    ->leftJoin('producto as prod', 'unidmedprod.fkidproducto', '=', 'prod.idproducto')
                                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                                    ->select( 
                                        'notacompradetalle.idnotacompradetalle', 'notacompradetalle.fkidnotacompra', 'notacompradetalle.fkidordencompradetalle',
                                        'notacompradetalle.fkidunidadmedidaproducto', 'notacompradetalle.cantidad', 'notacompradetalle.cantidadsolicitada', 
                                        'notacompradetalle.cantidadrecibida', 'notacompradetalle.cantidadfaltante','notacompradetalle.cantidadsobrante', 'notacompradetalle.nota',
                                        'notacompradetalle.nrocajas', 'notacompradetalle.costounitario', 'notacompradetalle.costosubtotal', 
                                        'notacompradetalle.peso', 'notacompradetalle.pesosubtotal', 'notacompradetalle.volumen', 'notacompradetalle.volumensubtotal',
                                        'notacompradetalle.isdevolucioncompra', 'notacompradetalle.isordencompra', 'notacompradetalle.issolicitudcompra', 
                                        'notacompradetalle.fechavencimiento', 'notacompradetalle.nrolote', 'notacompradetalle.nrofabrica', 'notacompradetalle.estado',
                                        'unidmedprod.stock', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida', 'unidmedprod.codigo',
                                        'prod.idproducto', 'prod.nombre', 
                                        'ciud.idciudad', 'ciud.descripcion as ciudadorigen',
                                        'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca'
                                    )
                                    ->orderBy('notacompradetalle.idnotacompradetalle');
                            } ] )
                            ->orderBy('notacompra.idnotacompra');
                    } ] )
                    ->where( $arrayCondicionConcepto )
                    ->whereNull('conceptocompra.deleted_at')
                    ->orderBy('conceptocompra.idconceptocompra', 'ASC')
                    ->get()->toArray();
            }

            if ( $formato == "CPN" ) {

                $arrayInformeCompra = $notcomp
                    ->leftJoin('sucursal as sucu', 'notacompra.fkidsucursal', '=', 'sucu.idsucursal')
                    ->leftJoin('almacen as alm', 'notacompra.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('conceptocompra as concepcomp', 'notacompra.fkidconceptocompra', '=', 'concepcomp.idconceptocompra')
                    ->leftJoin('proveedor as prov', 'notacompra.fkidproveedor', '=', 'prov.idproveedor')
                    ->select( [
                        'notacompra.idnotacompra', 'notacompra.fechanotacompra', 
                        'notacompra.tipocambio', 'notacompra.montosubtotal', 'notacompra.montodescuento', 'notacompra.montototal', 
                        'notacompra.fletes', 'notacompra.internacion', 'notacompra.otrosgastos', 'notacompra.impuestototal',
                        'notacompra.fkidsucursal', 'sucu.descripcion as sucursal',
                        'notacompra.fkidalmacen', 'alm.descripcion as almacen',
                        'notacompra.fkidproveedor', 'prov.nombre as proveedor',
                        'notacompra.fkidconceptocompra', 'concepcomp.descripcion as conceptocompra'
                    ] )
                    ->with( [ 'arraynotacompradetalle' => function( $query ) {
                        $query
                            ->leftJoin('unidadmedidaproducto as unidmedprod', 'notacompradetalle.fkidunidadmedidaproducto', '=', 'unidmedprod.idunidadmedidaproducto')
                            ->leftJoin('unidadmedida as unidmed', 'unidmedprod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                            ->leftJoin('producto as prod', 'unidmedprod.fkidproducto', '=', 'prod.idproducto')
                            ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                            ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                            ->select( 
                                'notacompradetalle.idnotacompradetalle', 'notacompradetalle.fkidnotacompra', 'notacompradetalle.fkidordencompradetalle',
                                'notacompradetalle.fkidunidadmedidaproducto', 'notacompradetalle.cantidad', 'notacompradetalle.cantidadsolicitada', 
                                'notacompradetalle.cantidadrecibida', 'notacompradetalle.cantidadfaltante','notacompradetalle.cantidadsobrante', 'notacompradetalle.nota',
                                'notacompradetalle.nrocajas', 'notacompradetalle.costounitario', 'notacompradetalle.costosubtotal', 
                                'notacompradetalle.peso', 'notacompradetalle.pesosubtotal', 'notacompradetalle.volumen', 'notacompradetalle.volumensubtotal',
                                'notacompradetalle.isdevolucioncompra', 'notacompradetalle.isordencompra', 'notacompradetalle.issolicitudcompra', 
                                'notacompradetalle.fechavencimiento', 'notacompradetalle.nrolote', 'notacompradetalle.nrofabrica', 'notacompradetalle.estado',
                                'unidmedprod.stock', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida', 'unidmedprod.codigo',
                                'prod.idproducto', 'prod.nombre', 
                                'ciud.idciudad', 'ciud.descripcion as ciudadorigen',
                                'prodmarc.idproductomarca', 'prodmarc.descripcion as productomarca'
                            )
                            ->orderBy('notacompradetalle.idnotacompradetalle');
                    } ] )
                    ->where( $arrayCondicionNotaCompra )
                    ->whereNull('notacompra.deleted_at')
                    ->orderBy('notacompra.idnotacompra')
                    ->get();
            }


            $mytime = Carbon::now('America/La_paz');

            $fecha = $mytime->toDateString();
            $hora  = $mytime->toTimeString();

            $fecha = explode( '-', $fecha );
            $fecha = $fecha[2] . '/' . $fecha[1] . '/' . $fecha[0];

            return response()->json( [
                'response' => 1,
                'arrayInformeCompra' => $arrayInformeCompra,
                'fecha' => $fecha,
                'hora' => $hora,
            ] );
            
        } catch ( \Exception $th ) {

            return response( )->json( [
                'response' => -4,
                'message'  => 'Error al procesar la solicitud',
                'error'    => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

}
