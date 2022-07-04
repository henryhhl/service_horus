<?php

namespace App\Http\Controllers\Comercio\Compra;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Compra\DevolucionCompraRequest;
use App\Models\Comercio\Compra\ConceptoCompra;
use App\Models\Comercio\Compra\DevolucionCompra;
use App\Models\Comercio\Compra\DevolucionCompraDetalle;
use App\Models\Comercio\Compra\NotaCompra;
use App\Models\Comercio\Compra\Proveedor;
use App\Models\Comercio\Inventario\Almacen;
use App\Models\Comercio\Inventario\AlmacenProductoDetalle;
use App\Models\Comercio\Inventario\Producto;
use App\Models\Comercio\Venta\TipoTransaccion;
use App\Models\Configuracion\Moneda;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class DevolucionCompraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index( Request $request )
    {
        try {

            $esPaginado = isset( $request->esPaginado ) ? $request->esPaginado : 1;
            $obj = new DevolucionCompra();

            if ( $esPaginado == 0 ) {

                $devolucioncompra = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'devolucioncompra'  => $devolucioncompra,
                ] );
            }

            $devolucioncompra = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'devolucioncompra'  => $devolucioncompra->getCollection(),
                'pagination' => [
                    'total'        => $devolucioncompra->total(),
                    'current_page' => $devolucioncompra->currentPage(),
                    'per_page'     => $devolucioncompra->perPage(),
                    'last_page'    => $devolucioncompra->lastPage(),
                    'from'         => $devolucioncompra->firstItem(),
                    'to'           => $devolucioncompra->lastItem(),
                ],
            ] );

        } catch ( \Exception $th ) {

            return response( )->json( [
                'response' => -4,
                'message' => 'Error al procesar la solicitud',
                'error' => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create( Request $request )
    {
        try {

            $obj = new DevolucionCompra();
            $iddevolucioncompra = $obj->newID();

            $obj = new Moneda();
            $moneda = $obj->get_data( $obj, $request );

            $concepcomp = new ConceptoCompra();
            $arrayConceptoCompra = $concepcomp->get_data( $concepcomp, $request );

            return response()->json( [
                'response' => 1,
                'iddevolucioncompra' => $iddevolucioncompra,
                'arrayMoneda'   => $moneda,
                'arrayConceptoCompra' => $arrayConceptoCompra,
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DevolucionCompraRequest $request)
    {
        try {

            DB::beginTransaction();

            $obj = new DevolucionCompra();
            $devolucioncompra = $obj->store( $obj, $request );

            if ( !is_null( $devolucioncompra ) ) {
                if ( !is_null( $devolucioncompra->fkidnotacompra ) ) {
                    $notcomp = new NotaCompra();
                    $notacompra = $notcomp->find( $devolucioncompra->fkidnotacompra );
                    if ( !is_null( $notacompra ) ) {
                        $notacompra->isdevolucioncompra = "A";
                        $notacompra->update();
                    }
                }

                $alm = new Almacen();
                $almacen = $alm->find( $devolucioncompra->fkidalmacen );
                if ( !is_null( $almacen ) ) {
                    $almacen->cantidadtotaldevolucioncomprarealizada = $almacen->cantidadtotaldevolucioncomprarealizada + 1;
                    $almacen->cantidaddevolucioncomprarealizada = $almacen->cantidaddevolucioncomprarealizada + 1;
                    $almacen->update();
                }
    
                $tpotrans = new TipoTransaccion();
                $tipotransaccion = $tpotrans->find( $devolucioncompra->fkidtipotransaccion );
                if ( !is_null( $tipotransaccion ) ) {
                    $tipotransaccion->cantidadrealizada = intval( $tipotransaccion->cantidadrealizada ) + 1;
                    $tipotransaccion->update();
                }

                $provdor = new Proveedor();
                $proveedor = $provdor->find( $devolucioncompra->fkidproveedor );
                if ( !is_null( $proveedor ) ) {
                    $proveedor->cantidadtotaldevolucioncomprarealizada = $proveedor->cantidadtotaldevolucioncomprarealizada + 1;
                    $proveedor->cantidaddevolucioncomprarealizada = $proveedor->cantidaddevolucioncomprarealizada + 1;
                    $proveedor->update();
                }
    
                $arrayDevolucionCompraDetalle = json_decode($request->input('arrayDevolucionCompraDetalle', '[]'));
                foreach ( $arrayDevolucionCompraDetalle as $detalle ) {
                    if ( !is_null( $detalle->fkidproducto ) ) {
                        $detalle->fkiddevolucioncompra = $devolucioncompra->iddevolucioncompra;
                        $devcompdet = new DevolucionCompraDetalle();
                        $devolucioncompradetalle = $devcompdet->store($devcompdet, $request, $detalle);

                        if ( !is_null( $devolucioncompradetalle ) ) {
                            $proveedor = $provdor->find( $devolucioncompradetalle->fkidproveedor );
                            if ( !is_null( $proveedor ) ) {
                                $proveedor->cantidadtotalproductodevolucioncomprarealizada = $proveedor->cantidadtotalproductodevolucioncomprarealizada + intval($devolucioncompra->cantidad);
                                $proveedor->cantidadproductodevolucioncomprarealizada = $proveedor->cantidadproductodevolucioncomprarealizada + intval($devolucioncompra->cantidad);
                                $proveedor->update();
                            }
        
                            $almproddet = new AlmacenProductoDetalle();
                            $almacenproductodetalle = $almproddet->find($devolucioncompradetalle->fkidalmacenproductodetalle);
                            if ( !is_null( $almacenproductodetalle ) ) {
                                $almacenproductodetalle->stockactual = intval( $almacenproductodetalle->stockactual ) - intval( $devolucioncompradetalle->cantidad );
                                $almacenproductodetalle->totaldevolucioncompras = intval($almproddet->totaldevolucioncompras) + intval( $devolucioncompradetalle->cantidad );
                                $almacenproductodetalle->devolucioncompras = intval($almproddet->devolucioncompras) + intval( $devolucioncompradetalle->cantidad );
                                $almacenproductodetalle->update();
                            }
                            $almacen = $alm->find( $devolucioncompradetalle->fkidalmacen );
                            if ( !is_null( $almacen ) ) {
                                $almacen->cantidadtotalproductodevolucioncomprarealizada = $almacen->cantidadtotalproductodevolucioncomprarealizada + intval($devolucioncompra->cantidad);
                                $almacen->cantidadproductodevolucioncomprarealizada = $almacen->cantidadproductodevolucioncomprarealizada + intval($devolucioncompra->cantidad);
                                $almacen->update();
                            }
                            $prod = new Producto();
                            $producto = $prod->find($devolucioncompradetalle->fkidproducto);
                            if ( !is_null( $producto ) ) {
                                $producto->stockactual = intval( $producto->stockactual ) - intval( $devolucioncompradetalle->cantidad );
                                $producto->totaldevolucioncompra = intval( $producto->totaldevolucioncompra ) + intval( $devolucioncompradetalle->cantidad );
                                $producto->devolucioncompra = intval( $producto->devolucioncompra ) + intval( $devolucioncompradetalle->cantidad );
                                $producto->update();
                            }
                        }
    
                    }
                }
                DB::commit();
                return response( )->json( [
                    'response' => 1,
                    'devolucioncompra' => $devolucioncompra,
                    'message'  => 'Devolución Compra registrado éxitosamente.',
                ] );
            }

            return response( )->json( [
                'response' => -1,
                'devolucioncompra' => $devolucioncompra,
                'message'  => 'Devolución Compra no registrado, intentar nuevamente.',
            ] );
            
        } catch ( \Exception $th ) {
            DB::rollBack();
            return response( )->json( [
                'response' => -4,
                'message'  => 'Error al procesar la solicitud.',
                'error'    => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show( Request $request, $iddevolucioncompra )
    {
        try {

            $obj = new DevolucionCompra();
            $devolucioncompra = $obj->show( $obj, $iddevolucioncompra );

            if ( is_null( $devolucioncompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Devolución Compra no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'devolucioncompra' => $devolucioncompra,
            ] );

        } catch (\Exception $th) {
            return response()->json( [
                'response' => -4,
                'message' => 'Error al procesar la solicitud.',
                'error' => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit( Request $request, $iddevolucioncompra )
    {
        try {

            $obj = new DevolucionCompra();
            $devolucioncompra = $obj->show( $obj, $iddevolucioncompra );

            if ( is_null( $devolucioncompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Devolución Compra no existente, favor revisar.',
                ] );
            }


            return response()->json( [
                'response' => 1,
                'devolucioncompra'   => $devolucioncompra,
            ] );

        } catch (\Exception $th) {
            return response()->json( [
                'response' => -4,
                'message' => 'Error al procesar la solicitud.',
                'error' => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update( DevolucionCompraRequest $request )
    {
        try {

            DB::beginTransaction();

            $regla = [
                'iddevolucioncompra' => 'required',
            ];

            $mensajes = [
                'iddevolucioncompra.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new DevolucionCompra();

            $devolucioncompra = $obj->find( $request->iddevolucioncompra );

            if ( is_null( $devolucioncompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Devolución Compra no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {

                $provdor = new Proveedor();
                if ( $devolucioncompra->fkidproveedor != $request->fkidproveedor ) {
                    $proveedor = $provdor->find( $devolucioncompra->fkidproveedor );
                    if ( !is_null( $proveedor ) ) {
                        $proveedor->cantidadtotaldevolucioncomprarealizada = $proveedor->cantidadtotaldevolucioncomprarealizada - 1;
                        $proveedor->cantidaddevolucioncompracancelada = $proveedor->cantidaddevolucioncompracancelada + 1;
                        $proveedor->update();
                    }
                    $proveedor = $provdor->find( $request->fkidproveedor );
                    if ( !is_null( $proveedor ) ) {
                        $proveedor->cantidadtotaldevolucioncomprarealizada = $proveedor->cantidadtotaldevolucioncomprarealizada + 1;
                        $proveedor->cantidaddevolucioncomprarealizada = $proveedor->cantidaddevolucioncomprarealizada + 1;
                        $proveedor->update();
                    }
                }

                $alm = new Almacen();
                if ( $devolucioncompra->fkidalmacen != $request->fkidalmacen ) {
                    $almacen = $alm->find( $devolucioncompra->fkidalmacen );
                    if ( !is_null( $almacen ) ) {
                        $almacen->cantidadtotaldevolucioncomprarealizada = $almacen->cantidadtotaldevolucioncomprarealizada - 1;
                        $almacen->cantidaddevolucioncompracancelado = $almacen->cantidaddevolucioncompracancelado + 1;
                        $almacen->update();
                    }
                    $almacen = $alm->find($request->fkidalmacen);
                    if ( !is_null( $almacen ) ) {
                        $almacen->cantidadtotaldevolucioncomprarealizada = $almacen->cantidadtotaldevolucioncomprarealizada + 1;
                        $almacen->cantidaddevolucioncomprarealizada = $almacen->cantidaddevolucioncomprarealizada + 1;
                        $almacen->update();
                    }
                }

                if ( !is_null( $devolucioncompra->fkidnotacompra ) ) {
                    $ntacomp = new NotaCompra();
                    $notacompra = $ntacomp->find( $devolucioncompra->fkidnotacompra );
                    if ( !is_null( $notacompra ) ) {
                        $notacompra->isdevolucioncompra = "N";
                        $notacompra->update();
                    }
                }
                if ( !is_null( $request->fkidnotacompra ) ) {
                    $ntacomp = new NotaCompra();
                    $notacompra = $ntacomp->find( $devolucioncompra->fkidnotacompra );
                    if ( !is_null( $notacompra ) ) {
                        $notacompra->isdevolucioncompra = "A";
                        $notacompra->update();
                    }
                }

                $arrayDevolucionCompraDetalle = json_decode( isset( $request->arrayDevolucionCompraDetalle ) ? $request->arrayDevolucionCompraDetalle : '[]' );
                foreach ( $arrayDevolucionCompraDetalle as $detalle ) {
                    if ( !is_null( $detalle->fkidproducto ) ) {
                        $detalle->fkiddevolucioncompra = $devolucioncompra->iddevolucioncompra;
                        $devcompdet = new DevolucionCompraDetalle();
                        if ( is_null( $detalle->iddevolucioncompradetalle ) ) {
                            $devolucioncompradetalle = $devcompdet->store($devcompdet, $request, $detalle);
                            if ( $devolucioncompradetalle ) {
                                $almproddet = new AlmacenProductoDetalle();
                                $almacenproductodetalle = $almproddet->find($detalle->fkidalmacenproductodetalle);
                                if ( !is_null( $almacenproductodetalle ) ) {
                                    $almacenproductodetalle->stockactual = intval( $almacenproductodetalle->stockactual ) - intval( $detalle->cantidad );
                                    $almacenproductodetalle->totaldevolucioncompras = intval($almproddet->totaldevolucioncompras) + intval( $detalle->cantidad );
                                    $almacenproductodetalle->devolucioncompras = intval($almproddet->devolucioncompras) + intval( $detalle->cantidad );
                                    $almacenproductodetalle->update();
                                }
                                $almacen = $alm->find( $detalle->fkidalmacen );
                                if ( !is_null( $almacen ) ) {
                                    $almacen->cantidadtotalproductodevolucioncomprarealizada = $almacen->cantidadtotalproductodevolucioncomprarealizada + intval($detalle->cantidad);
                                    $almacen->cantidadproductodevolucioncomprarealizada = $almacen->cantidadproductodevolucioncomprarealizada + intval($detalle->cantidad);
                                    $almacen->update();
                                }

                                $prod = new Producto();
                                $producto = $prod->find($detalle->fkidproducto);
                                if ( !is_null( $producto ) ) {
                                    $producto->stockactual = intval( $producto->stockactual ) - intval( $detalle->cantidad );
                                    $producto->totaldevolucioncompra = intval( $producto->totaldevolucioncompra ) + intval( $detalle->cantidad );
                                    $producto->devolucioncompra = intval( $producto->devolucioncompra ) + intval( $detalle->cantidad );
                                    $producto->update();
                                }

                                $proveedor = $provdor->find( $detalle->fkidproveedor );
                                if ( !is_null( $proveedor ) ) {
                                    $proveedor->cantidadtotalproductodevolucioncomprarealizada = $proveedor->cantidadtotalproductodevolucioncomprarealizada + intval($detalle->cantidad);
                                    $proveedor->cantidadproductodevolucioncomprarealizada = $proveedor->cantidadproductodevolucioncomprarealizada + intval($detalle->cantidad);
                                    $proveedor->update();
                                }
                            }
                        } else {
                            $devolucioncompradetalle = $devcompdet->find( $detalle->iddevolucioncompradetalle );
                            if ( $devcompdet->upgrade( $devcompdet, $detalle ) ) {

                                $almproddet = new AlmacenProductoDetalle();
                                if ( $devolucioncompradetalle->fkidalmacenproductodetalle != $detalle->fkidalmacenproductodetalle ) {
                                    $almacenproductodetalle = $almproddet->find($detalle->fkidalmacenproductodetalle);
                                    if ( !is_null( $almacenproductodetalle ) ) {
                                        $almacenproductodetalle->stockactual = intval( $almacenproductodetalle->stockactual ) - intval( $detalle->cantidad );
                                        $almacenproductodetalle->totaldevolucioncompras = intval( $almacenproductodetalle->totaldevolucioncompras ) + intval( $detalle->cantidad );
                                        $almacenproductodetalle->devolucioncompras = intval( $almacenproductodetalle->devolucioncompras ) + intval( $detalle->cantidad );
                                        $almacenproductodetalle->update();
                                    }
                                    $almacenproductodetalle = $almproddet->find($devolucioncompradetalle->fkidalmacenproductodetalle);
                                    if ( !is_null( $almacenproductodetalle ) ) {
                                        $almacenproductodetalle->stockactual = intval( $almacenproductodetalle->stockactual ) + intval( $devolucioncompradetalle->cantidad );
                                        $almacenproductodetalle->totaldevolucioncompras = intval( $almacenproductodetalle->totaldevolucioncompras ) - intval( $devolucioncompradetalle->cantidad );
                                        $almacenproductodetalle->devolucioncompracancelada = intval( $almacenproductodetalle->devolucioncompracancelada ) + intval( $detalle->cantidad );
                                        $almacenproductodetalle->update();
                                    }
                                } else {
                                    $almacenproductodetalle = $almproddet->find($detalle->fkidalmacenproductodetalle);
                                    if ( !is_null( $almacenproductodetalle ) ) {
                                        $almacenproductodetalle->stockactual = intval( $almacenproductodetalle->stockactual ) - intval( $detalle->cantidad ) + intval( $devolucioncompradetalle->cantidad );
                                        $almacenproductodetalle->totaldevolucioncompras = intval( $almacenproductodetalle->totaldevolucioncompras ) + intval( $detalle->cantidad ) - intval( $devolucioncompradetalle->cantidad );
                                        $almacenproductodetalle->devolucioncompras = intval( $almacenproductodetalle->devolucioncompras ) + intval( $detalle->cantidad ) - intval( $devolucioncompradetalle->cantidad );
                                        $almacenproductodetalle->update();
                                    }
                                }
                                
                                $prod = new Producto();
                                if ( $devolucioncompradetalle->fkidproducto != $detalle->fkidproducto ) {
                                    $producto = $prod->find($detalle->fkidproducto);
                                    if ( !is_null( $producto ) ) {
                                        $producto->stockactual = intval( $producto->stockactual ) - intval( $detalle->cantidad );
                                        $producto->totaldevolucioncompra = intval( $producto->totaldevolucioncompra ) + intval( $detalle->cantidad );
                                        $producto->devolucioncompra = intval( $producto->devolucioncompra ) + intval( $detalle->cantidad );
                                        $producto->update();
                                    }
                                    $producto = $prod->find($devolucioncompradetalle->fkidproducto);
                                    if ( !is_null( $producto ) ) {
                                        $producto->stockactual = intval( $producto->stockactual ) + intval( $devolucioncompradetalle->cantidad );
                                        $producto->totaldevolucioncompra = intval( $producto->totaldevolucioncompra ) - intval( $devolucioncompradetalle->cantidad );
                                        $producto->devolucioncompracancelado = intval( $producto->devolucioncompracancelado ) + intval( $devolucioncompradetalle->cantidad );
                                        $producto->update();
                                    }
                                } else {
                                    $producto = $prod->find($detalle->fkidproducto);
                                    if ( !is_null( $producto ) ) {
                                        $producto->stockactual = intval( $producto->stockactual ) - intval( $detalle->cantidad ) + intval( $devolucioncompradetalle->cantidad );
                                        $producto->totaldevolucioncompra = intval( $producto->totaldevolucioncompra ) + intval( $detalle->cantidad ) - intval( $devolucioncompradetalle->cantidad );
                                        $producto->devolucioncompra = intval( $producto->devolucioncompra ) + intval( $detalle->cantidad ) - intval( $devolucioncompradetalle->cantidad );
                                        $producto->update();
                                    }
                                }

                                if ( $devolucioncompradetalle->fkidalmacen != $detalle->fkidalmacen ) {
                                    $almacen = $alm->find( $detalle->fkidalmacen );
                                    if ( !is_null( $almacen ) ) {
                                        $almacen->cantidadtotalproductodevolucioncomprarealizada = $almacen->cantidadtotalproductodevolucioncomprarealizada + intval($detalle->cantidad);
                                        $almacen->cantidadproductodevolucioncomprarealizada = $almacen->cantidadproductodevolucioncomprarealizada + intval($detalle->cantidad);
                                        $almacen->update();
                                    }
                                    $almacen = $alm->find( $devolucioncompradetalle->fkidalmacen );
                                    if ( !is_null( $almacen ) ) {
                                        $almacen->cantidadtotalproductodevolucioncomprarealizada = $almacen->cantidadtotalproductodevolucioncomprarealizada - intval($devolucioncompradetalle->cantidad);
                                        $almacen->cantidadproductodevolucioncompracancelado = $almacen->cantidadproductodevolucioncompracancelado + intval($devolucioncompradetalle->cantidad);
                                        $almacen->update();
                                    }
                                } else {
                                    $almacen = $alm->find( $detalle->fkidalmacen );
                                    if ( !is_null( $almacen ) ) {
                                        $almacen->cantidadtotalproductodevolucioncomprarealizada = $almacen->cantidadtotalproductodevolucioncomprarealizada + intval($detalle->cantidad) - intval($devolucioncompradetalle->cantidad);
                                        $almacen->cantidadproductodevolucioncomprarealizada = $almacen->cantidadproductodevolucioncomprarealizada + intval($detalle->cantidad) - intval($devolucioncompradetalle->cantidad);
                                        $almacen->update();
                                    }
                                }

                                if ( $devolucioncompradetalle->fkidproveedor != $detalle->fkidproveedor ) {
                                    $proveedor = $provdor->find( $devolucioncompradetalle->fkidproveedor );
                                    if ( !is_null( $proveedor ) ) {
                                        $proveedor->cantidadtotalproductodevolucioncomprarealizada = $proveedor->cantidadtotalproductodevolucioncomprarealizada - intval( $devolucioncompradetalle->cantidad );
                                        $proveedor->cantidadproductodevolucioncompracancelada = $proveedor->cantidadproductodevolucioncompracancelada + intval( $devolucioncompradetalle->cantidad );
                                        $proveedor->update();
                                    }
                                    $proveedor = $provdor->find( $detalle->fkidproveedor );
                                    if ( !is_null( $proveedor ) ) {
                                        $proveedor->cantidadtotalproductodevolucioncomprarealizada = $proveedor->cantidadtotalproductodevolucioncomprarealizada + intval( $detalle->cantidad );
                                        $proveedor->cantidadproductodevolucioncomprarealizada = $proveedor->cantidadproductodevolucioncomprarealizada + intval( $detalle->cantidad );
                                        $proveedor->update();
                                    }
                                } else {
                                    $proveedor = $provdor->find( $detalle->fkidproveedor );
                                    if ( !is_null( $proveedor ) ) {
                                        $proveedor->cantidadtotalproductodevolucioncomprarealizada = $proveedor->cantidadtotalproductodevolucioncomprarealizada - intval($devolucioncompradetalle->cantidad) + intval($detalle->cantidad);
                                        $proveedor->cantidadproductodevolucioncomprarealizada = $proveedor->cantidadproductodevolucioncomprarealizada + intval($detalle->cantidad) - intval($devolucioncompradetalle->cantidad);
                                        $proveedor->update();
                                    }
                                }
                            }
                        }
    
                    }
                }

                $arrayDeleteDevolucionCompraDetalle = json_decode( isset( $request->arrayDeleteDevolucionCompraDetalle ) ? $request->arrayDeleteDevolucionCompraDetalle : '[]' );
                foreach ( $arrayDeleteDevolucionCompraDetalle as $iddevolucioncompradetalle ) {
                    $devcompdet = new DevolucionCompraDetalle();
                    $devolucioncompradetalle = $devcompdet->find( $iddevolucioncompradetalle );
                    if ( !is_null( $devolucioncompradetalle ) ) {
                        $almproddet = new AlmacenProductoDetalle();
                        $almacenproductodetalle = $almproddet->find($devolucioncompradetalle->fkidalmacenproductodetalle);
                        if ( !is_null( $almacenproductodetalle ) ) {
                            $almacenproductodetalle->stockactual = intval( $almacenproductodetalle->stockactual ) + intval( $devolucioncompradetalle->cantidad );
                            $almacenproductodetalle->totaldevolucioncompras = intval( $almacenproductodetalle->totaldevolucioncompras ) - intval( $devolucioncompradetalle->cantidad );
                            $almacenproductodetalle->devolucioncompracancelada = intval( $almacenproductodetalle->devolucioncompracancelada ) + intval( $devolucioncompradetalle->cantidad );
                            $almacenproductodetalle->update();
                        }

                        $prod = new Producto();
                        $producto = $prod->find($devolucioncompradetalle->fkidproducto);
                        if ( !is_null( $producto ) ) {
                            $producto->stockactual = intval( $producto->stockactual ) + intval( $devolucioncompradetalle->cantidad );
                            $producto->totaldevolucioncompra = intval( $producto->totaldevolucioncompra ) - intval( $devolucioncompradetalle->cantidad );
                            $producto->devolucioncompracancelado = intval( $producto->devolucioncompracancelado ) + intval( $devolucioncompradetalle->cantidad );
                            $producto->update();
                        }

                        $almacen = $alm->find( $devolucioncompradetalle->fkidalmacen );
                        if ( !is_null( $almacen ) ) {
                            $almacen->cantidadtotalproductodevolucioncomprarealizada = $almacen->cantidadtotalproductodevolucioncomprarealizada - intval($devolucioncompradetalle->cantidad);
                            $almacen->cantidadproductodevolucioncompracancelado = $almacen->cantidadproductodevolucioncompracancelado + intval($devolucioncompradetalle->cantidad);
                            $almacen->update();
                        }

                        $proveedor = $provdor->find( $devolucioncompradetalle->fkidproveedor );
                        if ( !is_null( $proveedor ) ) {
                            $proveedor->cantidadtotalproductodevolucioncomprarealizada = $proveedor->cantidadtotalproductodevolucioncomprarealizada - intval( $devolucioncompradetalle->cantidad );
                            $proveedor->cantidadproductodevolucioncompracancelada = $proveedor->cantidadproductodevolucioncompracancelada + intval( $devolucioncompradetalle->cantidad );
                            $proveedor->update();
                        }
                        if ( $devolucioncompradetalle->delete() ) {
                            // Accion    
                        }
                    }
                }

                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Devolución Compra actualizado éxitosamente.',
                ] );
            }
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Devolución de Compra.',
            ] );

        } catch (\Exception $th) {
            DB::rollBack();
            return response()->json( [
                'response' => -4,
                'message' => 'Error al procesar la solicitud.',
                'error' => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function delete( Request $request )
    {
        try {

            DB::beginTransaction();

            $regla = [
                'iddevolucioncompra' => 'required',
            ];

            $mensajes = [
                'iddevolucioncompra.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new DevolucionCompra();
            $devolucioncompra = $obj->find( $request->iddevolucioncompra );

            if ( is_null( $devolucioncompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Devolucion Compra no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            //

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            if ( $result ) {

                if ( !is_null( $devolucioncompra->fkidnotacompra ) ) {
                    $notcomp = new NotaCompra();
                    $notacompra = $notcomp->find( $devolucioncompra->fkidnotacompra );
                    if ( !is_null( $notacompra ) ) {
                        $notacompra->isdevolucioncompra = "N";
                        $notacompra->update();
                    }
                }

                $provdor = new Proveedor();
                $proveedor = $provdor->find( $devolucioncompra->fkidproveedor );
                if ( !is_null( $proveedor ) ) {
                    $proveedor->cantidadtotaldevolucioncomprarealizada = $proveedor->cantidadtotaldevolucioncomprarealizada - 1;
                    $proveedor->cantidaddevolucioncompracancelada = $proveedor->cantidaddevolucioncompracancelada + 1;
                    $proveedor->update();
                }

                $alm = new Almacen();
                $almacen = $alm->find($devolucioncompra->fkidalmacen);
                if ( !is_null( $almacen ) ) {
                    $almacen->cantidadtotaldevolucioncomprarealizada = $almacen->cantidadtotaldevolucioncomprarealizada - 1;
                    $almacen->cantidaddevolucioncompracancelado = $almacen->cantidaddevolucioncompracancelado + 1;
                    $almacen->update();
                }

                $tpotrans = new TipoTransaccion();
                $tipotransaccion = $tpotrans->find( $notacompra->fkidtipotransaccion );
                if ( !is_null( $tipotransaccion ) ) {
                    $tipotransaccion->cantidadcancelada = intval( $tipotransaccion->cantidadcancelada ) + 1;
                    $tipotransaccion->update();
                }

                $devcompdet = new DevolucionCompraDetalle();
                $arrayDevolucionCompraDetalle = $devcompdet->getDevolucionCompraDetalle( $devcompdet, $request->iddevolucioncompra );

                foreach ( $arrayDevolucionCompraDetalle as $detalle ) {
                    $devolucioncompradetalle = $devcompdet->find( $detalle->iddevolucioncompradetalle );
                    if ( !is_null( $devolucioncompradetalle ) ) {
                        $almproddet = new AlmacenProductoDetalle();
                        $almacenproductodetalle = $almproddet->find($devolucioncompradetalle->fkidalmacenproductodetalle);
                        if ( !is_null( $almacenproductodetalle ) ) {
                            $almacenproductodetalle->stockactual = intval( $almacenproductodetalle->stockactual ) + intval( $devolucioncompradetalle->cantidad );
                            $almacenproductodetalle->totaldevolucioncompras = intval( $almacenproductodetalle->totaldevolucioncompras ) - intval( $devolucioncompradetalle->cantidad );
                            $almacenproductodetalle->devolucioncompracancelada = intval( $almacenproductodetalle->devolucioncompracancelada ) + intval( $devolucioncompradetalle->cantidad );
                            $almacenproductodetalle->update();
                        }

                        $prod = new Producto();
                        $producto = $prod->find($devolucioncompradetalle->fkidproducto);
                        if ( !is_null( $producto ) ) {
                            $producto->stockactual = intval( $producto->stockactual ) + intval( $devolucioncompradetalle->cantidad );
                            $producto->totaldevolucioncompra = intval( $producto->totaldevolucioncompra ) - intval( $devolucioncompradetalle->cantidad );
                            $producto->devolucioncompracancelado = intval( $producto->devolucioncompracancelado ) + intval( $devolucioncompradetalle->cantidad );
                            $producto->update();
                        }

                        $almacen = $alm->find( $devolucioncompradetalle->fkidalmacen );
                        if ( !is_null( $almacen ) ) {
                            $almacen->cantidadtotalproductodevolucioncomprarealizada = $almacen->cantidadtotalproductodevolucioncomprarealizada - intval($devolucioncompradetalle->cantidad);
                            $almacen->cantidadproductodevolucioncompracancelado = $almacen->cantidadproductodevolucioncompracancelado + intval($devolucioncompradetalle->cantidad);
                            $almacen->update();
                        }

                        $proveedor = $provdor->find($devolucioncompradetalle->fkidproveedor);
                        if ( !is_null( $proveedor ) ) {
                            $proveedor->cantidadtotalproductodevolucioncomprarealizada = $proveedor->cantidadtotalproductodevolucioncomprarealizada - intval($devolucioncompradetalle->cantidad);
                            $proveedor->cantidadproductodevolucioncompracancelada = $proveedor->cantidadproductodevolucioncompracancelada + intval($devolucioncompradetalle->cantidad);
                            $proveedor->update();
                        }
                        $devolucioncompradetalle->delete();
                    }
                }

                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'devolución Compra eliminado éxitosamente.',
                ] );
            }

            DB::rollBack();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al eliminar Devolución Compra.',
            ] );

        } catch (\Exception $th) {
            DB::rollBack();
            return response()->json( [
                'response' => -4,
                'message' => 'Error al procesar la solicitud.',
                'error' => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

    public function searchByID(Request $request)
    {
        try {

            $regla = [
                'iddevolucioncompra' => 'required',
            ];

            $mensajes = [
                'iddevolucioncompra.required' => 'El ID Nota Compra es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $iddevolucioncompra = $request->input('iddevolucioncompra');
            
            $obj = new DevolucionCompra();
            $devolucioncompra = $obj->searchByID( $obj, $iddevolucioncompra );

            if ( is_null( $devolucioncompra ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Devolución Compra no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'devolucioncompra' => $devolucioncompra,
            ] );
            
        } catch (\Exception $th) {
            return response()->json( [
                'response' => -4,
                'message' => 'Error al procesar la solicitud.',
                'error' => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

    public function reporte(Request $request)
    {
        try {

            $obj = new DevolucionCompra();

            $devolucioncompra = $obj->get_data( $obj, $request );

            if ( sizeof( $devolucioncompra ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Devolución Compra insertado.',
                ] );
            }

            $mytime = Carbon::now('America/La_paz');

            $fecha = $mytime->toDateString();
            $hora  = $mytime->toTimeString();

            $fecha = explode( '-', $fecha );
            $fecha = $fecha[2] . '/' . $fecha[1] . '/' . $fecha[0];
            
            return response()->json( [
                'response' => 1,
                'fecha'    => $fecha,
                'hora'     => $hora,
                'arrayDevolucionCompra' => $devolucioncompra,
            ] );
            
        } catch (\Exception $th) {
            
            return response()->json( [
                'response' => -4,
                'message' => 'Error al procesar la solicitud',
                'error' => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

}
