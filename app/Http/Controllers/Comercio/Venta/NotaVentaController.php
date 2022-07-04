<?php

namespace App\Http\Controllers\Comercio\Venta;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Venta\NotaVentaRequest;
use App\Models\Comercio\Inventario\Almacen;
use App\Models\Comercio\Inventario\AlmacenProductoDetalle;
use App\Models\Comercio\Inventario\Producto;
use App\Models\Comercio\Venta\Cliente;
use App\Models\Comercio\Venta\ConceptoVenta;
use App\Models\Comercio\Venta\ListaPrecio;
use App\Models\Comercio\Venta\NotaVenta;
use App\Models\Comercio\Venta\NotaVentaDetalle;
use App\Models\Comercio\Venta\Sucursal;
use App\Models\Comercio\Venta\TipoPago;
use App\Models\Comercio\Venta\TipoTransaccion;
use App\Models\Comercio\Venta\Vendedor;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class NotaVentaController extends Controller
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
            $ntavta = new NotaVenta();

            if ( $esPaginado == 0 ) {

                $notaventa = $ntavta->get_data( $ntavta, $request );

                return response( )->json( [
                    'response' => 1,
                    'arrayNotaVenta'  => $notaventa,
                ] );
            }

            $notaventa = $ntavta->get_paginate( $ntavta, $request );

            return response( )->json( [
                'response' => 1,
                'arrayNotaVenta'  => $notaventa->getCollection(),
                'pagination' => [
                    'total'        => $notaventa->total(),
                    'current_page' => $notaventa->currentPage(),
                    'per_page'     => $notaventa->perPage(),
                    'last_page'    => $notaventa->lastPage(),
                    'from'         => $notaventa->firstItem(),
                    'to'           => $notaventa->lastItem(),
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

            $ntavta = new NotaVenta();
            $idnotaventa = $ntavta->newID();

            $suc = new Sucursal();
            $arraySucursal = $suc->get_data( $suc, $request );

            $conctovta = new ConceptoVenta();
            $arrayConceptoVenta = $conctovta->get_data( $conctovta, $request );

            $ltaprec = new ListaPrecio();
            $arrayListaPrecio = $ltaprec->get_data( $ltaprec, $request );

            $tpopago = new TipoPago();
            $arrayTipoPago = $tpopago->get_data( $tpopago, $request );

            return response()->json( [
                'response' => 1,
                'idnotaventa'  => $idnotaventa,
                'arraySucursal'  => $arraySucursal,
                'arrayConceptoVenta'  => $arrayConceptoVenta,
                'arrayListaPrecio'  => $arrayListaPrecio,
                'arrayTipoPago'  => $arrayTipoPago,
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
    public function store( NotaVentaRequest $request )
    {
        try {

            DB::beginTransaction();

            $ntavta = new NotaVenta();
            $notaventa = $ntavta->store( $ntavta, $request );

            if ( $notaventa ) {
                $clte = new Cliente();
                $cliente = $clte->find( $notaventa->fkidcliente );
                if ( !is_null( $cliente ) ) {
                    $cliente->cantidadtotalventarealizada = $cliente->cantidadtotalventarealizada + 1;
                    $cliente->cantidadventarealizada = $cliente->cantidadventarealizada + 1;
                    $cliente->update();
                }

                $vdor = new Vendedor();
                $vendedor = $vdor->find( $notaventa->fkidvendedor );
                if ( !is_null( $vendedor ) ) {
                    $vendedor->cantidadtotalventarealizada = $vendedor->cantidadtotalventarealizada + 1;
                    $vendedor->cantidadventarealizada = $vendedor->cantidadventarealizada + 1;
                    $vendedor->update();
                }

                $alm = new Almacen();
                $almacen = $alm->find( $notaventa->fkidalmacen );
                if ( !is_null( $almacen ) ) {
                    $almacen->cantidadtotalventarealizada = $almacen->cantidadtotalventarealizada + 1;
                    $almacen->cantidadventarealizada = $almacen->cantidadventarealizada + 1;
                    $almacen->update();
                }

                $tpotrans = new TipoTransaccion();
                $tipotransaccion = $tpotrans->find( $notaventa->fkidtipotransaccion );
                if ( !is_null( $tipotransaccion ) ) {
                    $tipotransaccion->cantidadrealizada = intval( $tipotransaccion->cantidadrealizada ) + 1;
                    $tipotransaccion->update();
                }

                $arraynotaventadetalle = json_decode( $request->input( 'arraynotaventadetalle', '[]' ) );
                foreach ( $arraynotaventadetalle as $detalle ) {
                    if ( !is_null( $detalle->fkidalmacenproductodetalle ) ) {
                        $ntavtadet = new NotaVentaDetalle();
                        $detalle->fkidnotaventa = $notaventa->idnotaventa;
                        $notaventadetalle = $ntavtadet->store( $ntavtadet, $request, $detalle );

                        if ( !is_null( $notaventadetalle ) ) {
                            $almproddet = new AlmacenProductoDetalle();
                            $almacenproductodetalle = $almproddet->find($detalle->fkidalmacenproductodetalle);
                            if ( !is_null( $almacenproductodetalle ) ) {
                                $almacenproductodetalle->stockactual = $almacenproductodetalle->stockactual - intval($notaventadetalle->cantidad);
                                $almacenproductodetalle->totalventas = $almacenproductodetalle->totalventas + $notaventadetalle->cantidad;
                                $almacenproductodetalle->ventas = $almacenproductodetalle->ventas + $notaventadetalle->cantidad;
                                $almacenproductodetalle->update();
                            }

                            $prod = new Producto();
                            $producto = $prod->find($detalle->fkidproducto);
                            if ( !is_null( $producto ) ) {
                                $producto->stockactual = intval($producto->stockactual) - intval($notaventadetalle->cantidad);
                                $producto->totalnotaventa = intval($producto->totalnotaventa) + intval($notaventadetalle->cantidad);
                                $producto->notaventa = intval($producto->notaventa) + intval($notaventadetalle->cantidad);
                                $producto->update();
                            }

                            $almacen = $alm->find($detalle->fkidalmacen);
                            if ( !is_null( $almacen ) ) {
                                $almacen->cantidadtotalproductoventarealizada = intval($almacen->cantidadtotalproductoventarealizada) + intval($notaventadetalle->cantidad);
                                $almacen->cantidadproductoventarealizada = intval($almacen->cantidadproductoventarealizada) + intval($notaventadetalle->cantidad);
                                $almacen->update();
                            }

                            $cliente = $clte->find( $detalle->fkidcliente );
                            if ( !is_null( $cliente ) ) {
                                $cliente->cantidadtotalproductoventarealizada = $cliente->cantidadtotalproductoventarealizada + intval($detalle->cantidad);
                                $cliente->cantidadproductoventarealizada = $cliente->cantidadproductoventarealizada + intval($detalle->cantidad);
                                $cliente->update();
                            }

                            $vendedor = $vdor->find( $detalle->fkidvendedor );
                            if ( !is_null( $vendedor ) ) {
                                $vendedor->cantidadtotalproductoventarealizada = $vendedor->cantidadtotalproductoventarealizada + intval($detalle->cantidad);
                                $vendedor->cantidadproductoventarealizada = $vendedor->cantidadproductoventarealizada + intval($detalle->cantidad);
                                $vendedor->update();
                            }
                        }
                    }
                }

                DB::commit();
                return response( )->json( [
                    'response' => 1,
                    'notaventa' => $notaventa,
                    'message'  => 'Nota Venta registrado éxitosamente.',
                ] );
            }

            return response( )->json( [
                'response' => -1,
                'notaventa' => $notaventa,
                'message'  => 'Nota Venta no registrado, intentar nuevamente.',
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
    public function show( Request $request, $idnotaventa )
    {
        try {

            $dosifcion = new NotaVenta();
            $notaventa = $dosifcion->show( $dosifcion, $idnotaventa );

            if ( is_null( $notaventa ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Venta no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'notaventa'   => $notaventa,
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
    public function edit( Request $request, $idnotaventa )
    {
        try {

            $ntavta = new NotaVenta();
            $notaventa = $ntavta->show( $ntavta, $idnotaventa );

            if ( is_null( $notaventa ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Venta no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'notaventa'   => $notaventa,
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
    public function update( NotaVentaRequest $request )
    {
        try {

            DB::beginTransaction();

            $regla = [
                'idnotaventa' => 'required',
            ];

            $mensajes = [
                'idnotaventa.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $ntavta = new NotaVenta();
            $notaventa = $ntavta->find( $request->idnotaventa );

            if ( is_null( $notaventa ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Venta no existe.',
                ] );
            }

            if ( $notaventa->isdevolucionventa == "A" ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Funcionalidad no permitido. Ya que se encuentra en DEVOLUCIÓN DE VENTA registrado.',
                ] );
            }

            $result = $ntavta->upgrade( $ntavta, $request );

            if ( $result ) {
                $clte = new Cliente();
                if ( $notaventa->fkidcliente != $request->fkidcliente ) {
                    $cliente = $clte->find( $request->fkidcliente );
                    if ( !is_null( $cliente ) ) {
                        $cliente->cantidadtotalventarealizada = $cliente->cantidadtotalventarealizada + 1;
                        $cliente->cantidadventarealizada = $cliente->cantidadventarealizada + 1;
                        $cliente->update();
                    }
                    $cliente = $clte->find( $notaventa->fkidcliente );
                    if ( !is_null( $cliente ) ) {
                        $cliente->cantidadtotalventarealizada = $cliente->cantidadtotalventarealizada - 1;
                        $cliente->cantidadventacancelada = $cliente->cantidadventacancelada + 1;
                        $cliente->update();
                    }
                }

                $vdor = new Vendedor();
                if ( $notaventa->fkidvendedor != $request->fkidvendedor ) {
                    $vendedor = $vdor->find( $request->fkidvendedor );
                    if ( !is_null( $vendedor ) ) {
                        $vendedor->cantidadtotalventarealizada = $vendedor->cantidadtotalventarealizada + 1;
                        $vendedor->cantidadventarealizada = $vendedor->cantidadventarealizada + 1;
                        $vendedor->update();
                    }
                    $vendedor = $vdor->find( $notaventa->fkidvendedor );
                    if ( !is_null( $vendedor ) ) {
                        $vendedor->cantidadtotalventarealizada = $vendedor->cantidadtotalventarealizada - 1;
                        $vendedor->cantidadventacancelada = $vendedor->cantidadventacancelada + 1;
                        $vendedor->update();
                    }
                }

                $alm = new Almacen();
                if ( $notaventa->fkidalmacen != $request->fkidalmacen ) {
                    $almacen = $alm->find( $request->fkidalmacen );
                    if ( !is_null( $almacen ) ) {
                        $almacen->cantidadtotalventarealizada = $almacen->cantidadtotalventarealizada + 1;
                        $almacen->cantidadventarealizada = $almacen->cantidadventarealizada + 1;
                        $almacen->update();
                    }
                    $almacen = $alm->find( $notaventa->fkidalmacen );
                    if ( !is_null( $almacen ) ) {
                        $almacen->cantidadtotalventarealizada = $almacen->cantidadtotalventarealizada - 1;
                        $almacen->cantidadventacancelado = $almacen->cantidadventacancelado + 1;
                        $almacen->update();
                    }
                }

                $arraynotaventadetalle = json_decode( isset( $request->arraynotaventadetalle ) ? $request->arraynotaventadetalle : '[]' );
                foreach ( $arraynotaventadetalle as $detalle ) {
                    if ( !is_null( $detalle->fkidalmacenproductodetalle ) ) {
                        $ntavtadet = new NotaVentaDetalle();
                        if ( is_null( $detalle->idnotaventadetalle ) ) {
                            $detalle->fkidnotaventa = $notaventa->idnotaventa;
                            $notaventadetalle = $ntavtadet->store( $ntavtadet, $request, $detalle );
                            if ( !is_null( $notaventadetalle ) ) {
                                $almproddet = new AlmacenProductoDetalle();
                                $almacenproductodetalle = $almproddet->find($detalle->fkidalmacenproductodetalle);
                                if ( !is_null( $almacenproductodetalle ) ) {
                                    $almacenproductodetalle->stockactual = $almacenproductodetalle->stockactual - intval($notaventadetalle->cantidad);
                                    $almacenproductodetalle->totalventas = $almacenproductodetalle->totalventas + $notaventadetalle->cantidad;
                                    $almacenproductodetalle->ventas = $almacenproductodetalle->ventas + $notaventadetalle->cantidad;
                                    $almacenproductodetalle->update();
                                }

                                $prod = new Producto();
                                $producto = $prod->find( $detalle->fkidproducto );
                                if ( !is_null( $producto ) ) {
                                    $producto->stockactual = intval($producto->stockactual) - intval($notaventadetalle->cantidad);
                                    $producto->totalnotaventa = intval($producto->totalnotaventa) + intval($notaventadetalle->cantidad);
                                    $producto->notaventa = intval($producto->notaventa) + intval($notaventadetalle->cantidad);
                                    $producto->update();
                                }

                                $almacen = $alm->find( $detalle->fkidalmacen );
                                if ( !is_null( $almacen ) ) {
                                    $almacen->cantidadtotalproductoventarealizada = intval($almacen->cantidadtotalproductoventarealizada) + intval($detalle->cantidad);
                                    $almacen->cantidadproductoventarealizada = intval($almacen->cantidadproductoventarealizada) + intval($detalle->cantidad);
                                    $almacen->update();
                                }

                                $cliente = $clte->find( $detalle->fkidcliente );
                                if ( !is_null( $cliente ) ) {
                                    $cliente->cantidadtotalproductoventarealizada = $cliente->cantidadtotalproductoventarealizada + intval($detalle->cantidad);
                                    $cliente->cantidadproductoventarealizada = $cliente->cantidadproductoventarealizada + intval($detalle->cantidad);
                                    $cliente->update();
                                }

                                $vendedor = $vdor->find( $detalle->fkidvendedor );
                                if ( !is_null( $vendedor ) ) {
                                    $vendedor->cantidadtotalproductoventarealizada = $vendedor->cantidadtotalproductoventarealizada + intval($detalle->cantidad);
                                    $vendedor->cantidadproductoventarealizada = $vendedor->cantidadproductoventarealizada + intval($detalle->cantidad);
                                    $vendedor->update();
                                }
                            }
                        } else {
                            $notaventadetalle = $ntavtadet->find( $detalle->idnotaventadetalle );
                            if ( $ntavtadet->upgrade( $ntavtadet, $detalle ) ) {
                                $almproddet = new AlmacenProductoDetalle();
                                if ( $notaventadetalle->fkidalmacenproductodetalle != $detalle->fkidalmacenproductodetalle ) {
                                    $almacenproductodetalle = $almproddet->find($detalle->fkidalmacenproductodetalle);
                                    if ( !is_null( $almacenproductodetalle ) ) {
                                        $almacenproductodetalle->stockactual = $almacenproductodetalle->stockactual - intval($detalle->cantidad);
                                        $almacenproductodetalle->totalventas = $almacenproductodetalle->totalventas + intval($detalle->cantidad);
                                        $almacenproductodetalle->ventas = $almacenproductodetalle->ventas + intval($detalle->cantidad);
                                        $almacenproductodetalle->update();
                                    }
                                    $almacenproductodetalle = $almproddet->find($notaventadetalle->fkidalmacenproductodetalle);
                                    if ( !is_null( $almacenproductodetalle ) ) {
                                        $almacenproductodetalle->stockactual = $almacenproductodetalle->stockactual + intval($notaventadetalle->cantidad);
                                        $almacenproductodetalle->totalventas = $almacenproductodetalle->totalventas - intval($notaventadetalle->cantidad);
                                        $almacenproductodetalle->ventacancelada = $almacenproductodetalle->ventacancelada + intval($notaventadetalle->cantidad);
                                        $almacenproductodetalle->update();
                                    }
                                } else {
                                    $almacenproductodetalle = $almproddet->find($detalle->fkidalmacenproductodetalle);
                                    if ( !is_null( $almacenproductodetalle ) ) {
                                        $almacenproductodetalle->stockactual = $almacenproductodetalle->stockactual + intval($notaventadetalle->cantidad) - intval($detalle->cantidad);
                                        $almacenproductodetalle->totalventas = $almacenproductodetalle->totalventas - intval($notaventadetalle->cantidad) + intval($detalle->cantidad);
                                        $almacenproductodetalle->ventas = $almacenproductodetalle->ventas - intval($notaventadetalle->cantidad) + intval($detalle->cantidad);
                                        $almacenproductodetalle->update();
                                    }
                                }

                                $prod = new Producto();
                                if ( $notaventadetalle->fkidproducto != $detalle->fkidproducto ) {
                                    $producto = $prod->find( $detalle->fkidproducto );
                                    if ( !is_null( $producto ) ) {
                                        $producto->stockactual = intval($producto->stockactual) - intval($detalle->cantidad);
                                        $producto->totalnotaventa = intval($producto->totalnotaventa) + intval($detalle->cantidad);
                                        $producto->notaventa = intval($producto->notaventa) + intval($detalle->cantidad);
                                        $producto->update();
                                    }
                                    $producto = $prod->find( $notaventadetalle->fkidproducto );
                                    if ( !is_null( $producto ) ) {
                                        $producto->stockactual = intval($producto->stockactual) + intval($notaventadetalle->cantidad);
                                        $producto->totalnotaventa = intval($producto->totalnotaventa) - intval($notaventadetalle->cantidad);
                                        $producto->notaventacancelado = intval($producto->notaventacancelado) + intval($notaventadetalle->cantidad);
                                        $producto->update();
                                    }
                                } else {
                                    $producto = $prod->find( $detalle->fkidproducto );
                                    if ( !is_null( $producto ) ) {
                                        $producto->stockactual = intval($producto->stockactual) + intval($notaventadetalle->cantidad) - intval($detalle->cantidad);
                                        $producto->totalnotaventa = intval($producto->totalnotaventa) - intval($notaventadetalle->cantidad) + intval($detalle->cantidad);
                                        $producto->notaventa = intval($producto->notaventa) - intval($notaventadetalle->cantidad) + intval($detalle->cantidad);
                                        $producto->update();
                                    }
                                }

                                if ( $notaventadetalle->fkidalmacen != $detalle->fkidalmacen ) {
                                    $almacen = $alm->find( $detalle->fkidalmacen );
                                    if ( !is_null( $almacen ) ) {
                                        $almacen->cantidadtotalproductoventarealizada = intval($almacen->cantidadtotalproductoventarealizada) + intval($detalle->cantidad);
                                        $almacen->cantidadproductoventarealizada = intval($almacen->cantidadproductoventarealizada) + intval($detalle->cantidad);
                                        $almacen->update();
                                    }
                                    $almacen = $alm->find( $notaventadetalle->fkidalmacen );
                                    if ( !is_null( $almacen ) ) {
                                        $almacen->cantidadtotalproductoventarealizada = intval($almacen->cantidadtotalproductoventarealizada) - intval($notaventadetalle->cantidad);
                                        $almacen->cantidadproductoventacancelado = intval($almacen->cantidadproductoventacancelado) + intval($notaventadetalle->cantidad);
                                        $almacen->update();
                                    }
                                } else {
                                    $almacen = $alm->find( $detalle->fkidalmacen );
                                    if ( !is_null( $almacen ) ) {
                                        $almacen->cantidadtotalproductoventarealizada = intval($almacen->cantidadtotalproductoventarealizada) + intval($detalle->cantidad) - intval($notaventadetalle->cantidad);
                                        $almacen->cantidadproductoventarealizada = intval($almacen->cantidadproductoventarealizada) + intval($detalle->cantidad) - intval($notaventadetalle->cantidad);
                                        $almacen->update();
                                    }
                                }
                                
                                if ( $notaventadetalle->fkidcliente != $detalle->fkidcliente ) {
                                    $cliente = $clte->find( $detalle->fkidcliente );
                                    if ( !is_null( $cliente ) ) {
                                        $cliente->cantidadtotalproductoventarealizada = $cliente->cantidadtotalproductoventarealizada + intval($detalle->cantidad);
                                        $cliente->cantidadproductoventarealizada = $cliente->cantidadproductoventarealizada + intval($detalle->cantidad);
                                        $cliente->update();
                                    }
                                    $cliente = $clte->find( $notaventadetalle->fkidcliente );
                                    if ( !is_null( $cliente ) ) {
                                        $cliente->cantidadtotalproductoventarealizada = $cliente->cantidadtotalproductoventarealizada - intval($notaventadetalle->cantidad);
                                        $cliente->cantidadproductoventacancelada = $cliente->cantidadproductoventacancelada + intval($notaventadetalle->cantidad);
                                        $cliente->update();
                                    }
                                } else {
                                    $cliente = $clte->find( $detalle->fkidcliente );
                                    if ( !is_null( $cliente ) ) {
                                        $cliente->cantidadtotalproductoventarealizada = $cliente->cantidadtotalproductoventarealizada - intval($notaventadetalle->cantidad) + intval($detalle->cantidad);
                                        $cliente->cantidadproductoventarealizada = $cliente->cantidadproductoventarealizada - intval($notaventadetalle->cantidad) + intval($detalle->cantidad);
                                        $cliente->update();
                                    }
                                }

                                if ( $notaventadetalle->fkidvendedor != $detalle->fkidvendedor ) {
                                    $vendedor = $vdor->find( $detalle->fkidvendedor );
                                    if ( !is_null( $vendedor ) ) {
                                        $vendedor->cantidadtotalproductoventarealizada = $vendedor->cantidadtotalproductoventarealizada + intval($detalle->cantidad);
                                        $vendedor->cantidadproductoventarealizada = $vendedor->cantidadproductoventarealizada + intval($detalle->cantidad);
                                        $vendedor->update();
                                    }
                                    $vendedor = $vdor->find( $notaventadetalle->fkidvendedor );
                                    if ( !is_null( $vendedor ) ) {
                                        $vendedor->cantidadtotalproductoventarealizada = $vendedor->cantidadtotalproductoventarealizada - intval($notaventadetalle->cantidad);
                                        $vendedor->cantidadproductoventacancelada = $vendedor->cantidadproductoventacancelada + intval($notaventadetalle->cantidad);
                                        $vendedor->update();
                                    }
                                } else {
                                    $vendedor = $vdor->find( $detalle->fkidvendedor );
                                    if ( !is_null( $vendedor ) ) {
                                        $vendedor->cantidadtotalproductoventarealizada = $vendedor->cantidadtotalproductoventarealizada - intval($notaventadetalle->cantidad) + intval($detalle->cantidad);
                                        $vendedor->cantidadproductoventarealizada = $vendedor->cantidadproductoventarealizada - intval($notaventadetalle->cantidad) + intval($detalle->cantidad);
                                        $vendedor->update();
                                    }
                                }
                                
                            }
                        }
                    }
                }

                $arraynotaventadetalledelete = json_decode( isset( $request->arraynotaventadetalledelete ) ? $request->arraynotaventadetalledelete : '[]' );
                foreach ( $arraynotaventadetalledelete as $idnotaventadetalle ) {
                    $ntavtadet = new NotaVentaDetalle();
                    $notaventadetalle = $ntavtadet->find( $idnotaventadetalle );
                    if ( !is_null( $notaventadetalle ) ) {
                        $notaventadetalledelete = $notaventadetalle->delete();
                        if ( $notaventadetalledelete ) {
                            $almproddet = new AlmacenProductoDetalle();
                            $almacenproductodetalle = $almproddet->find($notaventadetalle->fkidalmacenproductodetalle);
                            if ( !is_null( $almacenproductodetalle ) ) {
                                $almacenproductodetalle->stockactual = $almacenproductodetalle->stockactual + $notaventadetalle->cantidad;
                                $almacenproductodetalle->totalventas = $almacenproductodetalle->totalventas - $notaventadetalle->cantidad;
                                $almacenproductodetalle->ventacancelada = $almacenproductodetalle->ventacancelada + $notaventadetalle->cantidad;
                                $almacenproductodetalle->update();
                            }

                            $prod = new Producto();
                            $producto = $prod->find( $notaventadetalle->fkidproducto );
                            if ( !is_null( $producto ) ) {
                                $producto->stockactual = intval($producto->stockactual) + intval($notaventadetalle->cantidad);
                                $producto->totalnotaventa = intval($producto->totalnotaventa) - intval($notaventadetalle->cantidad);
                                $producto->notaventacancelado = intval($producto->notaventacancelado) + intval($notaventadetalle->cantidad);
                                $producto->update();
                            }

                            $almacen = $alm->find( $notaventadetalle->fkidalmacen );
                            if ( !is_null( $almacen ) ) {
                                $almacen->cantidadtotalproductoventarealizada = intval($almacen->cantidadtotalproductoventarealizada) - intval($notaventadetalle->cantidad);
                                $almacen->cantidadproductoventacancelado = intval($almacen->cantidadproductoventacancelado) + intval($notaventadetalle->cantidad);
                                $almacen->update();
                            }

                            $cliente = $clte->find( $notaventadetalle->fkidcliente );
                            if ( !is_null( $cliente ) ) {
                                $cliente->cantidadtotalproductoventarealizada = $cliente->cantidadtotalproductoventarealizada - intval($notaventadetalle->cantidad);
                                $cliente->cantidadproductoventacancelada = $cliente->cantidadproductoventacancelada + intval($notaventadetalle->cantidad);
                                $cliente->update();
                            }

                            $vendedor = $vdor->find( $notaventadetalle->fkidvendedor );
                            if ( !is_null( $vendedor ) ) {
                                $vendedor->cantidadtotalproductoventarealizada = $vendedor->cantidadtotalproductoventarealizada - intval($notaventadetalle->cantidad);
                                $vendedor->cantidadproductoventacancelada = $vendedor->cantidadproductoventacancelada + intval($notaventadetalle->cantidad);
                                $vendedor->update();
                            }
                        }
                    }
                }

                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Nota Venta actualizado éxitosamente.',
                ] );
            }
            DB::rollBack();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Nota Venta.',
            ] );

        } catch ( \Exception $th ) {
            DB::rollBack();
            return response()->json( [
                'response' => -4,
                'message'  => 'Error al procesar la solicitud.',
                'error' => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage()
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
                'idnotaventa' => 'required',
            ];

            $mensajes = [
                'idnotaventa.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $ntavta = new NotaVenta();
            $notaventa = $ntavta->find( $request->idnotaventa );

            if ( is_null( $notaventa ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Venta no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            if ( $notaventa->isdevolucionventa == "A" ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Funcionalidad no permitido. Ya que se encuentra en DEVOLUCIÓN DE VENTA registrado.',
                ] );
            }

            /* fin de restriccion */

            $tpotrans = new TipoTransaccion();
            $tipotransaccion = $tpotrans->find( $notaventa->fkidtipotransaccion );
            if ( !is_null( $tipotransaccion ) ) {
                $tipotransaccion->cantidadcancelada = intval( $tipotransaccion->cantidadcancelada ) + 1;
                $tipotransaccion->update();
            }

            $clte = new Cliente();
            $cliente = $clte->find( $notaventa->fkidcliente );
            if ( !is_null( $cliente ) ) {
                $cliente->cantidadtotalventarealizada = $cliente->cantidadtotalventarealizada - 1;
                $cliente->cantidadventacancelada = $cliente->cantidadventacancelada + 1;
                $cliente->update();
            }

            $vdor = new Vendedor();
            $vendedor = $vdor->find( $notaventa->fkidvendedor );
            if ( !is_null( $vendedor ) ) {
                $vendedor->cantidadtotalventarealizada = $vendedor->cantidadtotalventarealizada - 1;
                $vendedor->cantidadventacancelada = $vendedor->cantidadventacancelada + 1;
                $vendedor->update();
            }

            $alm = new Almacen();
            $almacen = $alm->find( $notaventa->fkidalmacen );
            if ( !is_null( $almacen ) ) {
                $almacen->cantidadtotalventarealizada = $almacen->cantidadtotalventarealizada - 1;
                $almacen->cantidadventacancelado = $almacen->cantidadventacancelado + 1;
                $almacen->update();
            }

            $ntavtadet = new NotaVentaDetalle();
            $arraynotaventadetalle = $ntavtadet->getNotaVentaDetalle( $ntavtadet, $request->idnotaventa );

            foreach ( $arraynotaventadetalle as $detalle ) {
                $notaventadetalle = $ntavtadet->find( $detalle->idnotaventadetalle );
                if ( !is_null( $notaventadetalle ) ) {
                    $notaventadetalledelete = $notaventadetalle->delete();
                    if ( $notaventadetalledelete ) {
                        $almproddet = new AlmacenProductoDetalle();
                        $almacenproductodetalle = $almproddet->find($notaventadetalle->fkidalmacenproductodetalle);
                        if ( !is_null( $almacenproductodetalle ) ) {
                            $almacenproductodetalle->stockactual = intval($almacenproductodetalle->stockactual) + intval($notaventadetalle->cantidad);
                            $almacenproductodetalle->totalventas = $almacenproductodetalle->totalventas - $notaventadetalle->cantidad;
                            $almacenproductodetalle->ventacancelada = $almacenproductodetalle->ventacancelada + $notaventadetalle->cantidad;
                            $almacenproductodetalle->update();
                        }

                        $prod = new Producto();
                        $producto = $prod->find( $notaventadetalle->fkidproducto );
                        if ( !is_null( $producto ) ) {
                            $producto->stockactual = intval($producto->stockactual) + intval($notaventadetalle->cantidad);
                            $producto->totalnotaventa = intval($producto->totalnotaventa) - intval($notaventadetalle->cantidad);
                            $producto->notaventacancelado = intval($producto->notaventacancelado) + intval($notaventadetalle->cantidad);
                            $producto->update();
                        }

                        $almacen = $alm->find( $notaventadetalle->fkidalmacen );
                        if ( !is_null( $almacen ) ) {
                            $almacen->cantidadtotalproductoventarealizada = intval($almacen->cantidadtotalproductoventarealizada) - intval($notaventadetalle->cantidad);
                            $almacen->cantidadproductoventacancelado = intval($almacen->cantidadproductoventacancelado) + intval($notaventadetalle->cantidad);
                            $almacen->update();
                        }

                        $cliente = $clte->find( $notaventadetalle->fkidcliente );
                        if ( !is_null( $cliente ) ) {
                            $cliente->cantidadtotalproductoventarealizada = $cliente->cantidadtotalproductoventarealizada - intval($notaventadetalle->cantidad);
                            $cliente->cantidadproductoventacancelada = $cliente->cantidadproductoventacancelada + intval($notaventadetalle->cantidad);
                            $cliente->update();
                        }

                        $vendedor = $vdor->find( $notaventadetalle->fkidvendedor );
                        if ( !is_null( $vendedor ) ) {
                            $vendedor->cantidadtotalproductoventarealizada = $vendedor->cantidadtotalproductoventarealizada - intval($notaventadetalle->cantidad);
                            $vendedor->cantidadproductoventacancelada = $vendedor->cantidadproductoventacancelada + intval($notaventadetalle->cantidad);
                            $vendedor->update();
                        }
                    }
                }
            }

            $notaVentaDelete = $notaventa->delete();

            if ( $notaVentaDelete ) {
                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Nota Venta eliminado éxitosamente.',
                    'notaVentaDelete' => $notaVentaDelete,
                ] );
            }

            DB::rollBack();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al eliminar, favor de intentar nuevamente.',
                'notaVentaDelete' => $notaVentaDelete,
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
                'idnotaventa' => 'required',
            ];

            $mensajes = [
                'idnotaventa.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idnotaventa = $request->input('idnotaventa');

            $ntavta = new NotaVenta();
            $notaventa = $ntavta->searchByID( $ntavta, $idnotaventa );

            if ( is_null( $notaventa ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Venta no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'notaventa' => $notaventa,
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

            $ntavta = new NotaVenta();

            $notaventa = $ntavta->get_data( $ntavta, $request );

            if ( sizeof( $notaventa ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Nota Venta insertado.',
                ] );
            }

            $mytime = Carbon::now('America/La_paz');

            $fecha = $mytime->toDateString();
            $hora  = $mytime->toTimeString();

            $fecha = explode( '-', $fecha );
            $fecha = $fecha[2] . '/' . $fecha[1] . '/' . $fecha[0];

            return response()->json( [
                'response'      => 1,
                'fecha'         => $fecha,
                'hora'          => $hora,
                'arrayNotaVenta' => $notaventa,
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
