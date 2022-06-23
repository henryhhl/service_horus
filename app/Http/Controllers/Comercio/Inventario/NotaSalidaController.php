<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Inventario\NotaSalidaRequest;
use App\Models\Comercio\Inventario\AlmacenProductoDetalle;
use App\Models\Comercio\Inventario\ConceptoInventario;
use App\Models\Comercio\Inventario\NotaSalida;
use App\Models\Comercio\Inventario\NotaSalidaDetalle;
use App\Models\Comercio\Inventario\Producto;
use App\Models\Comercio\Venta\Sucursal;
use App\Models\Comercio\Venta\TipoTransaccion;
use App\Models\Configuracion\Moneda;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class NotaSalidaController extends Controller
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
            $obj = new NotaSalida();

            if ( $esPaginado == 0 ) {

                $notasalida = $obj->get_data( $obj, $request );
                return response( )->json( [
                    'response' => 1,
                    'arrayNotaSalida'  => $notasalida,
                ] );
            }

            $notasalida = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'arrayNotaSalida'  => $notasalida->getCollection(),
                'pagination' => [
                    'total'        => $notasalida->total(),
                    'current_page' => $notasalida->currentPage(),
                    'per_page'     => $notasalida->perPage(),
                    'last_page'    => $notasalida->lastPage(),
                    'from'         => $notasalida->firstItem(),
                    'to'           => $notasalida->lastItem(),
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

            $obj = new NotaSalida();
            $idnotasalida = $obj->newID();

            $obj = new Moneda();
            $moneda = $obj->get_data( $obj, $request );

            $suc = new Sucursal();
            $arraySucursal = $suc->get_data( $suc, $request );

            $conceptinv = new ConceptoInventario();
            $arrayConceptoInventario = $conceptinv->get_data( $conceptinv, $request );

            return response()->json( [
                'response' => 1,
                'idnotasalida' => $idnotasalida,
                'arrayMoneda'   => $moneda,
                'arraySucursal' => $arraySucursal,
                'arrayConceptoInventario' => $arrayConceptoInventario,
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
    public function store( NotaSalidaRequest $request )
    {
        try {

            DB::beginTransaction();

            $obj = new NotaSalida();
            $notasalida = $obj->store( $obj, $request );

            $tpotrans = new TipoTransaccion();
            $tipotransaccion = $tpotrans->find( $notasalida->fkidtipotransaccion );
            if ( !is_null( $tipotransaccion ) ) {
                $tipotransaccion->cantidadrealizada = intval( $tipotransaccion->cantidadrealizada ) + 1;
                $tipotransaccion->update();
            }

            $arrayNotaSalidaDetalle = json_decode($request->input('arrayNotaSalidaDetalle', '[]'));

            foreach ( $arrayNotaSalidaDetalle as $detalle ) {
                if ( !is_null( $detalle->fkidproducto ) ) {

                    $almproddet = new AlmacenProductoDetalle();
                    $firstalmunidmedprod = $almproddet->firstAlmacenProducto($almproddet, $detalle->fkidalmacen, $detalle->fkidproducto );
                    
                    if ( is_null( $firstalmunidmedprod ) ) {
                        $almacenproductodetalle = new AlmacenProductoDetalle();
                        $almacenproductodetalle->fkidproducto = $detalle->fkidproducto;
                        $almacenproductodetalle->fkidalmacen = $detalle->fkidalmacen;
                        $almacenproductodetalle->stockactual = $detalle->cantidad;
                        $almacenproductodetalle->totalsalidas = $detalle->cantidad;
                        $almacenproductodetalle->salidas = $detalle->cantidad;
                        $almacenproductodetalle->fecha = $request->x_fecha;
                        $almacenproductodetalle->hora  = $request->x_hora;
                        $almacenproductodetalle->save();

                        $detalle->fkidalmacenproductodetalle = $almacenproductodetalle->idalmacenproductodetalle;
                    } else {
                        $almacenproductodetalle = $almproddet->find($firstalmunidmedprod->idalmacenproductodetalle);
                        $almacenproductodetalle->stockactual = intval($almacenproductodetalle->stockactual) - intval($detalle->cantidad);
                        $almacenproductodetalle->totalsalidas = intval($almacenproductodetalle->totalsalidas) + intval($detalle->cantidad);
                        $almacenproductodetalle->salidas = intval($almacenproductodetalle->salidas) + intval($detalle->cantidad);
                        $almacenproductodetalle->update();
                        $detalle->fkidalmacenproductodetalle = $almacenproductodetalle->idalmacenproductodetalle;
                    }

                    $detalle->fkidnotasalida = $notasalida->idnotasalida;

                    $prod = new Producto();
                    $producto = $prod->find( $detalle->fkidproducto );
                    $producto->stockactual = intval($producto->stockactual) - intval($detalle->cantidad);
                    $producto->totalsalidas = intval($producto->totalsalidas) + intval($detalle->cantidad);
                    $producto->salidas = intval($producto->salidas) + intval($detalle->cantidad);
                    $producto->update();

                    $ntasaldet = new NotaSalidaDetalle();
                    $notasalidadetalle = $ntasaldet->store($ntasaldet, $request, $detalle);
                }
            }

            DB::commit();
            return response( )->json( [
                'response' => 1,
                'notasalida' => $notasalida,
                'message'  => 'Nota Salida registrado éxitosamente.',
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
    public function show( Request $request, $idnotasalida )
    {
        try {

            $obj = new NotaSalida();
            $notasalida = $obj->show( $obj, $idnotasalida );

            if ( is_null( $notasalida ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Salida no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'notasalida' => $notasalida,
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
    public function edit( Request $request, $idnotasalida )
    {
        try {

            $obj = new NotaSalida();
            $notasalida = $obj->show( $obj, $idnotasalida );

            if ( is_null( $notasalida ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Salida no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'notasalida' => $notasalida,
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
    public function update( NotaSalidaRequest $request )
    {
        try {

            DB::beginTransaction();

            $regla = [
                'idnotasalida' => 'required',
            ];

            $mensajes = [
                'idnotasalida.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new NotaSalida();
            $notasalida = $obj->find( $request->idnotasalida );

            if ( is_null( $notasalida ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Salida no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {

                $arrayNotaSalidaDetalle = json_decode( isset( $request->arrayNotaSalidaDetalle ) ? $request->arrayNotaSalidaDetalle : '[]' );
                foreach ( $arrayNotaSalidaDetalle as $detalle ) {
                    if ( !is_null( $detalle->fkidproducto ) ) {

                        if ( is_null( $detalle->idnotasalidadetalle ) ) {

                            $almproddet = new AlmacenProductoDetalle();
                            $firstalmunidmedprod = $almproddet->firstAlmacenProducto($almproddet, $detalle->fkidalmacen, $detalle->fkidproducto );
                            
                            if ( is_null( $firstalmunidmedprod ) ) {
                                $almacenproductodetalle = new AlmacenProductoDetalle();
                                $almacenproductodetalle->fkidproducto = $detalle->fkidproducto;
                                $almacenproductodetalle->fkidalmacen = $detalle->fkidalmacen;
                                $almacenproductodetalle->stockactual = $detalle->cantidad;
                                $almacenproductodetalle->totalsalidas = $detalle->cantidad;
                                $almacenproductodetalle->salidas = $detalle->cantidad;
                                $almacenproductodetalle->fecha  = $request->x_fecha;
                                $almacenproductodetalle->hora   = $request->x_hora;
                                $almacenproductodetalle->save();

                                $detalle->fkidalmacenproductodetalle = $almacenproductodetalle->idalmacenproductodetalle;
                            } else {
                                $almacenproductodetalle = $almproddet->find($firstalmunidmedprod->idalmacenproductodetalle);
                                $almacenproductodetalle->stockactual = intval($almacenproductodetalle->stockactual) - intval($detalle->cantidad);
                                $almacenproductodetalle->totalsalidas = intval($almacenproductodetalle->totalsalidas) + intval($detalle->cantidad);
                                $almacenproductodetalle->salidas = intval($almacenproductodetalle->salidas) + intval($detalle->cantidad);
                                $almacenproductodetalle->update();
                                $detalle->fkidalmacenproductodetalle = $almacenproductodetalle->idalmacenproductodetalle;
                            }

                            $detalle->fkidnotasalida = $notasalida->idnotasalida;

                            $prod = new Producto();
                            $producto = $prod->find( $detalle->fkidproducto );
                            $producto->stockactual = intval($producto->stockactual) - intval($detalle->cantidad);
                            $producto->totalsalidas = intval($producto->totalsalidas) + intval($detalle->cantidad);
                            $producto->salidas = intval($producto->salidas) + intval($detalle->cantidad);
                            $producto->update();

                            $ntasaldet = new NotaSalidaDetalle();
                            $notasalidadetalle = $ntasaldet->store($ntasaldet, $request, $detalle);
                        } else {
                            $ntasaldet = new NotaSalidaDetalle();
                            $notasalidadetalle = $ntasaldet->find( $detalle->idnotasalidadetalle );

                            if ( !is_null( $notasalidadetalle ) ) {
                                $almproddet = new AlmacenProductoDetalle();
                                $almacenproductodetalle = $almproddet->find($detalle->fkidalmacenproductodetalle);
                                if ( !is_null( $almacenproductodetalle ) ) {
                                    $almacenproductodetalle->stockactual = intval( $almacenproductodetalle->stockactual ) - intval( $detalle->cantidad ) + intval($notasalidadetalle->cantidad);
                                    $almacenproductodetalle->totalsalidas = intval( $almacenproductodetalle->totalsalidas ) + intval( $detalle->cantidad ) - intval($notasalidadetalle->cantidad);
                                    $almacenproductodetalle->salidacancelada = intval( $almacenproductodetalle->salidacancelada ) + intval($notasalidadetalle->cantidad);
                                    $almacenproductodetalle->update();

                                    $prod = new Producto();
                                    $producto = $prod->find($almacenproductodetalle->fkidproducto);
                                    if ( !is_null( $producto ) ) {
                                        $producto->stockactual = intval( $producto->stockactual ) - intval( $detalle->cantidad ) + intval($notasalidadetalle->cantidad);
                                        $producto->totalsalidas = intval( $producto->totalsalidas ) + intval( $detalle->cantidad ) - intval($notasalidadetalle->cantidad);
                                        $producto->salidas = intval( $producto->salidas ) + intval( $detalle->cantidad ) - intval($notasalidadetalle->cantidad);
                                        $producto->update();
                                    }
                                }
                                $ntasaldet->upgrade( $ntasaldet, $detalle );
                            }
                        }
                    }
                }

                $arrayDeleteNotaSalidaDetalle = json_decode( isset( $request->arrayDeleteNotaSalidaDetalle ) ? $request->arrayDeleteNotaSalidaDetalle : '[]' );
                foreach ( $arrayDeleteNotaSalidaDetalle as $idnotasalidadetalle ) {
                    $ntasaldet = new NotaSalidaDetalle();
                    $notasalidadetalle = $ntasaldet->find( $idnotasalidadetalle );
                    if ( !is_null( $notasalidadetalle ) ) {
                        $almproddet = new AlmacenProductoDetalle();
                        $almacenproductodetalle = $almproddet->find($notasalidadetalle->fkidalmacenproductodetalle);
                        if ( !is_null( $almacenproductodetalle ) ) {
                            $almacenproductodetalle->stockactual = intval( $almacenproductodetalle->stockactual ) + intval( $notasalidadetalle->cantidad );
                            $almacenproductodetalle->totalsalidas = intval( $almacenproductodetalle->totalsalidas ) - intval( $notasalidadetalle->cantidad );
                            $almacenproductodetalle->salidacancelada = intval( $almacenproductodetalle->salidacancelada ) + intval( $notasalidadetalle->cantidad );
                            $almacenproductodetalle->update();
    
                            $prod = new Producto();
                            $producto = $prod->find($almacenproductodetalle->fkidproducto);
                            if ( !is_null( $producto ) ) {
                                $producto->stockactual = intval( $producto->stockactual ) + intval( $notasalidadetalle->cantidad );
                                $producto->totalsalidas = intval( $producto->totalsalidas ) - intval( $notasalidadetalle->cantidad );
                                $producto->salidacancelado = intval( $producto->salidacancelado ) + intval( $notasalidadetalle->cantidad );
                                $producto->update();
                            }
                        }
                        $notasalidadetalle->delete();
                    }
                }

                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Nota Salida actualizado éxitosamente.',
                ] );
            }

            DB::rollBack();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Nota Salida.',
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
                'idnotasalida' => 'required',
            ];

            $mensajes = [
                'idnotasalida.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new NotaSalida();
            $notasalida = $obj->find( $request->idnotasalida );

            if ( is_null( $notasalida ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Salida no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            //

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            if ( $result ) {

                $ntasaldet = new NotaSalidaDetalle();
                $arrayNotaSalidaDetalle = $ntasaldet->getNotasalidaDetalle( $ntasaldet, $request->idnotasalida );

                foreach ( $arrayNotaSalidaDetalle as $detalle ) {
                    $notasalidadetalle = $ntasaldet->find( $detalle->idnotasalidadetalle );
                    if ( !is_null( $notasalidadetalle ) ) {
                        $almproddet = new AlmacenProductoDetalle();
                        $almacenproductodetalle = $almproddet->find($notasalidadetalle->fkidalmacenproductodetalle);
                        if ( !is_null( $almacenproductodetalle ) ) {
                            $almacenproductodetalle->stockactual = intval( $almacenproductodetalle->stockactual ) + intval( $notasalidadetalle->cantidad );
                            $almacenproductodetalle->totalsalidas = intval( $almacenproductodetalle->totalsalidas ) - intval( $notasalidadetalle->cantidad );
                            $almacenproductodetalle->salidacancelada = intval( $almacenproductodetalle->salidacancelada ) + intval( $notasalidadetalle->cantidad );
                            $almacenproductodetalle->update();
    
                            $prod = new Producto();
                            $producto = $prod->find($almacenproductodetalle->fkidproducto);
                            if ( !is_null( $producto ) ) {
                                $producto->stockactual = intval( $producto->stockactual ) + intval( $notasalidadetalle->cantidad );
                                $producto->totalsalidas = intval( $producto->totalsalidas ) - intval( $notasalidadetalle->cantidad );
                                $producto->salidacancelado = intval( $producto->salidacancelado ) + intval( $notasalidadetalle->cantidad );
                                $producto->update();
                            }
                        }
                        $notasalidadetalle->delete();
                    }
                }

                $tpotrans = new TipoTransaccion();
                $tipotransaccion = $tpotrans->find( $notasalida->fkidtipotransaccion );
                if ( !is_null( $tipotransaccion ) ) {
                    $tipotransaccion->cantidadcancelada = intval( $tipotransaccion->cantidadcancelada ) + 1;
                    $tipotransaccion->update();
                }

                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Nota Salida eliminado éxitosamente.',
                ] );
            }

            DB::commit();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al eliminar Nota Salida.',
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
                'idnotasalida' => 'required',
            ];

            $mensajes = [
                'idnotasalida.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idnotasalida = $request->input('idnotasalida');
            
            $obj = new NotaSalida();
            $notasalida = $obj->searchByID( $obj, $idnotasalida );

            if ( is_null( $notasalida ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Salida no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'notasalida' => $notasalida,
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

            $obj = new NotaSalida();

            $notasalida = $obj->get_data( $obj, $request );

            if ( sizeof( $notasalida ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Nota Salida insertado.',
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
                'arrayNotaSalida' => $notasalida,
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
