<?php

namespace App\Http\Controllers\Comercio\Venta;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Venta\DevolucionNotaVentaRequest;
use App\Models\Comercio\Inventario\AlmacenProductoDetalle;
use App\Models\Comercio\Inventario\Producto;
use App\Models\Comercio\Venta\Cliente;
use App\Models\Comercio\Venta\DevolucionNotaVenta;
use App\Models\Comercio\Venta\DevolucionNotaVentaDetalle;
use App\Models\Comercio\Venta\TipoTransaccion;
use App\Models\Comercio\Venta\Vendedor;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class DevolucionNotaVentaController extends Controller
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
            $devntavta = new DevolucionNotaVenta();

            if ( $esPaginado == 0 ) {

                $devolucionnotaventa = $devntavta->get_data( $devntavta, $request );

                return response( )->json( [
                    'response' => 1,
                    'arrayDevolucionNotaVenta'  => $devolucionnotaventa,
                ] );
            }

            $devolucionnotaventa = $devntavta->get_paginate( $devntavta, $request );

            return response( )->json( [
                'response' => 1,
                'arrayDevolucionNotaVenta'  => $devolucionnotaventa->getCollection(),
                'pagination' => [
                    'total'        => $devolucionnotaventa->total(),
                    'current_page' => $devolucionnotaventa->currentPage(),
                    'per_page'     => $devolucionnotaventa->perPage(),
                    'last_page'    => $devolucionnotaventa->lastPage(),
                    'from'         => $devolucionnotaventa->firstItem(),
                    'to'           => $devolucionnotaventa->lastItem(),
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

            $devntavta = new DevolucionNotaVenta();
            $iddevolucionnotaventa = $devntavta->newID();

            return response()->json( [
                'response' => 1,
                'iddevolucionnotaventa'  => $iddevolucionnotaventa,
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
    public function store( DevolucionNotaVentaRequest $request )
    {
        try {

            DB::beginTransaction();

            $devntavta = new DevolucionNotaVenta();
            $devolucionnotaventa = $devntavta->store( $devntavta, $request );

            if ( $devolucionnotaventa ) {

                $tpotrans = new TipoTransaccion();
                $tipotransaccion = $tpotrans->find( $devolucionnotaventa->fkidtipotransaccion );
                if ( !is_null( $tipotransaccion ) ) {
                    $tipotransaccion->cantidadrealizada = intval( $tipotransaccion->cantidadrealizada ) + 1;
                    $tipotransaccion->update();
                }

                $clte = new Cliente();
                $cliente = $clte->find( $devolucionnotaventa->fkidcliente );
                if ( !is_null( $cliente ) ) {
                    $cliente->cantidadtotaldevolucionventarealizada = $cliente->cantidadtotaldevolucionventarealizada + 1;
                    $cliente->cantidaddevolucionventarealizada = $cliente->cantidaddevolucionventarealizada + 1;
                    $cliente->update();
                }
                $vdor = new Vendedor();
                $vendedor = $vdor->find( $devolucionnotaventa->fkidvendedor );
                if ( !is_null( $vendedor ) ) {
                    $vendedor->cantidadtotaldevolucionventarealizada = $vendedor->cantidadtotaldevolucionventarealizada + 1;
                    $vendedor->cantidaddevolucionventarealizada = $vendedor->cantidaddevolucionventarealizada + 1;
                    $vendedor->update();
                }

                $arraydevolucionnotaventadetalle = json_decode( $request->input( 'arraydevolucionnotaventadetalle', '[]' ) );

                foreach ( $arraydevolucionnotaventadetalle as $detalle ) {
                    if ( !is_null( $detalle->fkidalmacenproductodetalle ) ) {
                        $devntavtadet = new DevolucionNotaVentaDetalle();
                        $detalle->fkiddevolucionnotaventa = $devolucionnotaventa->iddevolucionnotaventa;
                        $detalle->fkidvendedor = $devolucionnotaventa->fkidvendedor;
                        $devolucionnotaventadetalle = $devntavtadet->store( $devntavtadet, $request, $detalle );
                        if ( !is_null( $devolucionnotaventadetalle ) ) {
                            $almproddet = new AlmacenProductoDetalle();
                            $almacenproductodetalle = $almproddet->find($devolucionnotaventadetalle->fkidalmacenproductodetalle);
                            if ( !is_null( $almacenproductodetalle ) ) {
                                $almacenproductodetalle->stockactual = $almacenproductodetalle->stockactual + $devolucionnotaventadetalle->cantidad;
                                $almacenproductodetalle->totaldevolucionventas = $almacenproductodetalle->totaldevolucionventas + $devolucionnotaventadetalle->cantidad;
                                $almacenproductodetalle->devolucionventas = $almacenproductodetalle->devolucionventas + $devolucionnotaventadetalle->cantidad;
                                $almacenproductodetalle->update();
                            }
                            $prod = new Producto();
                            $producto = $prod->find($devolucionnotaventadetalle->fkidproducto);
                            if ( !is_null( $producto ) ) {
                                $producto->stockactual = intval($producto->stockactual) + intval($devolucionnotaventadetalle->cantidad);
                                $producto->totaldevolucionventa = intval($producto->totaldevolucionventa) + intval($devolucionnotaventadetalle->cantidad);
                                $producto->devolucionventa = intval($producto->devolucionventa) + intval($devolucionnotaventadetalle->cantidad);
                                $producto->update();
                            }
                            if ( !is_null( $cliente ) ) {
                                $cliente->cantidadtotalproductodevolucionventarealizada = $cliente->cantidadtotalproductodevolucionventarealizada + intval($devolucionnotaventadetalle->cantidad);
                                $cliente->cantidadproductodevolucionventarealizada = $cliente->cantidadproductodevolucionventarealizada + intval($devolucionnotaventadetalle->cantidad);
                                $cliente->update();
                            }
                            if ( !is_null( $vendedor ) ) {
                                $vendedor->cantidadtotalproductodevolucionventarealizada = $vendedor->cantidadtotalproductodevolucionventarealizada + intval($devolucionnotaventadetalle->cantidad);
                                $vendedor->cantidadproductodevolucionventarealizada = $vendedor->cantidadproductodevolucionventarealizada + intval($devolucionnotaventadetalle->cantidad);
                                $vendedor->update();
                            }
                        }
                    }
                }

                DB::commit();
                return response( )->json( [
                    'response' => 1,
                    'devolucionnotaventa' => $devolucionnotaventa,
                    'message'  => 'Devolución Nota Venta registrado éxitosamente.',
                ] );
            }

            DB::rollBack();
            return response( )->json( [
                'response' => -1,
                'devolucionnotaventa' => $devolucionnotaventa,
                'message'  => 'Devolución Nota Venta no registrado, intentar nuevamente.',
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
    public function show( Request $request, $iddevolucionnotaventa ) 
    {
        try {

            $devntavta = new DevolucionNotaVenta();
            $devolucionnotaventa = $devntavta->show( $devntavta, $iddevolucionnotaventa );

            if ( is_null( $devolucionnotaventa ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Devolución Nota Venta no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'devolucionnotaventa'   => $devolucionnotaventa,
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
    public function edit( Request $request, $iddevolucionnotaventa )
    {
        try {

            $devntavta = new DevolucionNotaVenta();
            $devolucionnotaventa = $devntavta->show( $devntavta, $iddevolucionnotaventa );

            if ( is_null( $devolucionnotaventa ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Devolución Nota Venta no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'devolucionnotaventa'   => $devolucionnotaventa,
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
    public function update( DevolucionNotaVentaRequest $request )
    {
        try {

            DB::beginTransaction();

            $regla = [
                'iddevolucionnotaventa' => 'required',
            ];

            $mensajes = [
                'iddevolucionnotaventa.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $devntavta = new DevolucionNotaVenta();
            $devolucionnotaventa = $devntavta->find( $request->iddevolucionnotaventa );

            if ( is_null( $devolucionnotaventa ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Devolución Nota Venta no existe.',
                ] );
            }

            $result = $devntavta->upgrade( $devntavta, $request );

            if ( $result ) {

                $clte = new Cliente();
                $cliente = $clte->find( $devolucionnotaventa->fkidcliente );

                $vdor = new Vendedor();
                $vendedor = $vdor->find( $devolucionnotaventa->fkidvendedor );

                $arraydevolucionnotaventadetalle = json_decode( isset( $request->arraydevolucionnotaventadetalle ) ? $request->arraydevolucionnotaventadetalle : '[]' );
                foreach ( $arraydevolucionnotaventadetalle as $detalle ) {
                    if ( !is_null( $detalle->fkidalmacenproductodetalle ) ) {
                        $devntavtadet = new DevolucionNotaVentaDetalle();

                        $almproddet = new AlmacenProductoDetalle();
                        $almacenproductodetalle = $almproddet->find($detalle->fkidalmacenproductodetalle);

                        $prod = new Producto();
                        $producto = $prod->find( $detalle->fkidproducto );

                        if ( is_null( $detalle->iddevolucionnotaventadetalle ) ) {
                            $detalle->fkiddevolucionnotaventa = $devolucionnotaventa->iddevolucionnotaventa;
                            $detalle->fkidvendedor = $devolucionnotaventa->fkidvendedor;
                            $devolucionnotaventadetalle = $devntavtadet->store( $devntavtadet, $request, $detalle );
                            if ( !is_null( $devolucionnotaventadetalle ) ) {
                                if ( !is_null( $almacenproductodetalle ) ) {
                                    $almacenproductodetalle->stockactual = $almacenproductodetalle->stockactual + $devolucionnotaventadetalle->cantidad;
                                    $almacenproductodetalle->totaldevolucionventas = $almacenproductodetalle->totaldevolucionventas + $devolucionnotaventadetalle->cantidad;
                                    $almacenproductodetalle->devolucionventas = $almacenproductodetalle->devolucionventas + $devolucionnotaventadetalle->cantidad;
                                    $almacenproductodetalle->update();
                                }
                                if ( !is_null( $producto ) ) {
                                    $producto->stockactual = intval($producto->stockactual) + intval($devolucionnotaventadetalle->cantidad);
                                    $producto->totaldevolucionventa = intval($producto->totaldevolucionventa) + intval($devolucionnotaventadetalle->cantidad);
                                    $producto->devolucionventa = intval($producto->devolucionventa) + intval($devolucionnotaventadetalle->cantidad);
                                    $producto->update();
                                }
                                if ( !is_null( $cliente ) ) {
                                    $cliente->cantidadtotalproductodevolucionventarealizada = $cliente->cantidadtotalproductodevolucionventarealizada + intval($devolucionnotaventadetalle->cantidad);
                                    $cliente->cantidadproductodevolucionventarealizada = $cliente->cantidadproductodevolucionventarealizada + intval($devolucionnotaventadetalle->cantidad);
                                    $cliente->update();
                                }
                                if ( !is_null( $vendedor ) ) {
                                    $vendedor->cantidadtotalproductodevolucionventarealizada = $vendedor->cantidadtotalproductodevolucionventarealizada + intval($devolucionnotaventadetalle->cantidad);
                                    $vendedor->cantidadproductodevolucionventarealizada = $vendedor->cantidadproductodevolucionventarealizada + intval($devolucionnotaventadetalle->cantidad);
                                    $vendedor->update();
                                }
                            }
                        } else {
                            $devolucionnotaventadetalle = $devntavtadet->find( $detalle->iddevolucionnotaventadetalle );
                            $devolucionnotaventadetalleupdate = $devntavtadet->upgrade( $devntavtadet, $detalle );
                            if ( $devolucionnotaventadetalleupdate ) {
                                if ( !is_null( $almacenproductodetalle ) ) {
                                    $almacenproductodetalle->stockactual = $almacenproductodetalle->stockactual - $devolucionnotaventadetalle->cantidad + intval($detalle->cantidad);
                                    $almacenproductodetalle->totaldevolucionventas = $almacenproductodetalle->totaldevolucionventas - $devolucionnotaventadetalle->cantidad + intval($detalle->cantidad);
                                    $almacenproductodetalle->devolucionventas = $almacenproductodetalle->devolucionventas - $devolucionnotaventadetalle->cantidad + intval($detalle->cantidad);
                                    $almacenproductodetalle->update();
                                }
                                if ( !is_null( $producto ) ) {
                                    $producto->stockactual = intval($producto->stockactual) - $devolucionnotaventadetalle->cantidad + intval($detalle->cantidad);
                                    $producto->totaldevolucionventa = intval($producto->totaldevolucionventa) - $devolucionnotaventadetalle->cantidad + intval($detalle->cantidad);
                                    $producto->devolucionventa = intval($producto->devolucionventa) - $devolucionnotaventadetalle->cantidad + intval($detalle->cantidad);
                                    $producto->update();
                                }
                                if ( !is_null( $cliente ) ) {
                                    $cliente->cantidadtotalproductodevolucionventarealizada = $cliente->cantidadtotalproductodevolucionventarealizada - intval($devolucionnotaventadetalle->cantidad) + intval($detalle->cantidad);
                                    $cliente->cantidadproductodevolucionventarealizada = $cliente->cantidadproductodevolucionventarealizada - intval($devolucionnotaventadetalle->cantidad) + intval($detalle->cantidad);
                                    $cliente->update();
                                }
                                if ( !is_null( $vendedor ) ) {
                                    $vendedor->cantidadtotalproductodevolucionventarealizada = $vendedor->cantidadtotalproductodevolucionventarealizada - intval($devolucionnotaventadetalle->cantidad) + intval($detalle->cantidad);
                                    $vendedor->cantidadproductodevolucionventarealizada = $vendedor->cantidadproductodevolucionventarealizada - intval($devolucionnotaventadetalle->cantidad) + intval($detalle->cantidad);
                                    $vendedor->update();
                                }
                            }
                        }
                    }
                }

                $arraydevolucionnotaventadetalledelete = json_decode( isset( $request->arraydevolucionnotaventadetalledelete ) ? $request->arraydevolucionnotaventadetalledelete : '[]' );
                foreach ( $arraydevolucionnotaventadetalledelete as $iddevolucionnotaventadetalle ) {
                    $devntavtadet = new DevolucionNotaVentaDetalle();
                    $devolucionnotaventadetalle = $devntavtadet->find( $iddevolucionnotaventadetalle );
                    if ( !is_null( $devolucionnotaventadetalle ) ) {
                        $devolucionnotaventadetalledelete = $devolucionnotaventadetalle->delete();
                        if ( $devolucionnotaventadetalledelete ) {
                            $almproddet = new AlmacenProductoDetalle();
                            $almacenproductodetalle = $almproddet->find($devolucionnotaventadetalle->fkidalmacenproductodetalle);
                            if ( !is_null( $almacenproductodetalle ) ) {
                                $almacenproductodetalle->stockactual = $almacenproductodetalle->stockactual - $devolucionnotaventadetalle->cantidad;
                                $almacenproductodetalle->totaldevolucionventas = $almacenproductodetalle->totaldevolucionventas - $devolucionnotaventadetalle->cantidad;
                                $almacenproductodetalle->devolucionventacancelada = $almacenproductodetalle->devolucionventacancelada + $devolucionnotaventadetalle->cantidad;
                                $almacenproductodetalle->update();
                            }
                            $prod = new Producto();
                            $producto = $prod->find( $devolucionnotaventadetalle->fkidproducto );
                            if ( !is_null( $producto ) ) {
                                $producto->stockactual = intval($producto->stockactual) - intval($devolucionnotaventadetalle->cantidad);
                                $producto->totaldevolucionventa = intval($producto->totaldevolucionventa) - intval($devolucionnotaventadetalle->cantidad);
                                $producto->devolucionventacancelado = intval($producto->devolucionventacancelado) + intval($devolucionnotaventadetalle->cantidad);
                                $producto->update();
                            }
                            if ( !is_null( $cliente ) ) {
                                $cliente->cantidadtotalproductodevolucionventarealizada = $cliente->cantidadtotalproductodevolucionventarealizada - intval($devolucionnotaventadetalle->cantidad);
                                $cliente->cantidadproductodevolucionventacancelada = $cliente->cantidadproductodevolucionventacancelada + intval($devolucionnotaventadetalle->cantidad);
                                $cliente->update();
                            }
                            if ( !is_null( $vendedor ) ) {
                                $vendedor->cantidadtotalproductodevolucionventarealizada = $vendedor->cantidadtotalproductodevolucionventarealizada - intval($devolucionnotaventadetalle->cantidad);
                                $vendedor->cantidadproductodevolucionventacancelada = $vendedor->cantidadproductodevolucionventacancelada + intval($devolucionnotaventadetalle->cantidad);
                                $vendedor->update();
                            }
                        }
                    }
                }

                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Devolución Nota Venta actualizado éxitosamente.',
                    'devolucionnotaventa' => $devolucionnotaventa,
                ] );
            }
            DB::rollBack();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Nota Venta.',
                'devolucionnotaventa' => $devolucionnotaventa,
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
                'iddevolucionnotaventa' => 'required',
            ];

            $mensajes = [
                'iddevolucionnotaventa.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $devntavta = new DevolucionNotaVenta();
            $devolucionnotaventa = $devntavta->find( $request->iddevolucionnotaventa );

            if ( is_null( $devolucionnotaventa ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Devolución Nota Venta no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            /* fin de restriccion */

            $clte = new Cliente();
            $cliente = $clte->find( $devolucionnotaventa->fkidcliente );

            $vdor = new Vendedor();
            $vendedor = $vdor->find( $devolucionnotaventa->fkidvendedor );

            $devntavtadet = new DevolucionNotaVentaDetalle();
            $arraydevolucionnotaventadetalle = $devntavtadet->getDevolucionNotaVentaDetalle( $devntavtadet, $request->iddevolucionnotaventa );

            foreach ( $arraydevolucionnotaventadetalle as $detalle ) {
                $devolucionnotaventadetalle = $devntavtadet->find( $detalle->iddevolucionnotaventadetalle );
                if ( !is_null( $devolucionnotaventadetalle ) ) {
                    $devolucionnotaventadetalledelete =  $devolucionnotaventadetalle->delete();
                    if ( $devolucionnotaventadetalledelete ) {
                        $almproddet = new AlmacenProductoDetalle();
                        $almacenproductodetalle = $almproddet->find($devolucionnotaventadetalle->fkidalmacenproductodetalle);
                        if ( !is_null( $almacenproductodetalle ) ) {
                            $almacenproductodetalle->stockactual = $almacenproductodetalle->stockactual - $devolucionnotaventadetalle->cantidad;
                            $almacenproductodetalle->totaldevolucionventas = $almacenproductodetalle->totaldevolucionventas - $devolucionnotaventadetalle->cantidad;
                            $almacenproductodetalle->devolucionventacancelada = $almacenproductodetalle->devolucionventacancelada + $devolucionnotaventadetalle->cantidad;
                            $almacenproductodetalle->update();
                        }
                        $prod = new Producto();
                        $producto = $prod->find( $devolucionnotaventadetalle->fkidproducto );
                        if ( !is_null( $producto ) ) {
                            $producto->stockactual = intval($producto->stockactual) - intval($devolucionnotaventadetalle->cantidad);
                            $producto->totaldevolucionventa = intval($producto->totaldevolucionventa) - intval($devolucionnotaventadetalle->cantidad);
                            $producto->devolucionventacancelado = intval($producto->devolucionventacancelado) + intval($devolucionnotaventadetalle->cantidad);
                            $producto->update();
                        }
                        if ( !is_null( $cliente ) ) {
                            $cliente->cantidadtotalproductodevolucionventarealizada = $cliente->cantidadtotalproductodevolucionventarealizada - intval($devolucionnotaventadetalle->cantidad);
                            $cliente->cantidadproductodevolucionventacancelada = $cliente->cantidadproductodevolucionventacancelada + intval($devolucionnotaventadetalle->cantidad);
                            $cliente->update();
                        }
                        if ( !is_null( $vendedor ) ) {
                            $vendedor->cantidadtotalproductodevolucionventarealizada = $vendedor->cantidadtotalproductodevolucionventarealizada - intval($devolucionnotaventadetalle->cantidad);
                            $vendedor->cantidadproductodevolucionventacancelada = $vendedor->cantidadproductodevolucionventacancelada + intval($devolucionnotaventadetalle->cantidad);
                            $vendedor->update();
                        }
                    }
                }
            }

            $devolucionNotaVentaDelete = $devolucionnotaventa->delete();

            if ( $devolucionNotaVentaDelete ) {
                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Devolución Nota Venta eliminado éxitosamente.',
                    'devolucionNotaVentaDelete' => $devolucionNotaVentaDelete,
                ] );
            }

            DB::rollBack();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al eliminar, favor de intentar nuevamente.',
                'devolucionNotaVentaDelete' => $devolucionNotaVentaDelete,
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
                'iddevolucionnotaventa' => 'required',
            ];

            $mensajes = [
                'iddevolucionnotaventa.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $iddevolucionnotaventa = $request->input('iddevolucionnotaventa');

            $devntavta = new DevolucionNotaVenta();
            $devolucionnotaventa = $devntavta->searchByID( $devntavta, $iddevolucionnotaventa );

            if ( is_null( $devolucionnotaventa ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Devolución Nota Venta no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'devolucionnotaventa' => $devolucionnotaventa,
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

            $devntavta = new DevolucionNotaVenta();

            $devolucionnotaventa = $devntavta->get_data( $devntavta, $request );

            if ( sizeof( $devolucionnotaventa ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Devolución Nota Venta insertado.',
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
                'arrayDevolucionNotaVenta' => $devolucionnotaventa,
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
