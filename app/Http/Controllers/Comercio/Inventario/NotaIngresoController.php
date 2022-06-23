<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Inventario\NotaIngresoRequest;
use App\Models\Comercio\Inventario\AlmacenProductoDetalle;
use App\Models\Comercio\Inventario\AlmacenUnidadMedidaProducto;
use App\Models\Comercio\Inventario\ConceptoInventario;
use App\Models\Comercio\Inventario\NotaIngreso;
use App\Models\Comercio\Inventario\NotaIngresoDetalle;
use App\Models\Comercio\Inventario\Producto;
use App\Models\Comercio\Inventario\UnidadMedidaProducto;
use App\Models\Comercio\Venta\Sucursal;
use App\Models\Comercio\Venta\TipoTransaccion;
use App\Models\Configuracion\Moneda;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class NotaIngresoController extends Controller
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
            $obj = new NotaIngreso();

            if ( $esPaginado == 0 ) {

                $notaingreso = $obj->get_data( $obj, $request );
                return response( )->json( [
                    'response' => 1,
                    'arrayNotaIngreso'  => $notaingreso,
                ] );
            }

            $notaingreso = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'arrayNotaIngreso'  => $notaingreso->getCollection(),
                'pagination' => [
                    'total'        => $notaingreso->total(),
                    'current_page' => $notaingreso->currentPage(),
                    'per_page'     => $notaingreso->perPage(),
                    'last_page'    => $notaingreso->lastPage(),
                    'from'         => $notaingreso->firstItem(),
                    'to'           => $notaingreso->lastItem(),
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

            $obj = new NotaIngreso();
            $idnotaingreso = $obj->newID();

            $obj = new Moneda();
            $moneda = $obj->get_data( $obj, $request );

            $suc = new Sucursal();
            $arraySucursal = $suc->get_data( $suc, $request );

            $conceptinv = new ConceptoInventario();
            $arrayConceptoInventario = $conceptinv->get_data( $conceptinv, $request );

            return response()->json( [
                'response' => 1,
                'idnotaingreso' => $idnotaingreso,
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
    public function store( NotaIngresoRequest $request )
    {

        try {

            DB::beginTransaction();

            $obj = new NotaIngreso();
            $notaingreso = $obj->store( $obj, $request );

            $tpotrans = new TipoTransaccion();
            $tipotransaccion = $tpotrans->find( $notaingreso->fkidtipotransaccion );
            if ( !is_null( $tipotransaccion ) ) {
                $tipotransaccion->cantidadrealizada = intval( $tipotransaccion->cantidadrealizada ) + 1;
                $tipotransaccion->update();
            }

            $arrayNotaIngresoDetalle = json_decode($request->input('arrayNotaIngresoDetalle', '[]'));

            foreach ( $arrayNotaIngresoDetalle as $detalle ) {
                if ( !is_null( $detalle->fkidproducto ) ) {

                    $ntaingdet = new NotaIngresoDetalle();
                    $notaingresodetalle = $ntaingdet->store($ntaingdet, $request, $detalle);

                    if ( $notaingresodetalle ) {
                        $almproddet = new AlmacenProductoDetalle();
                        $firstalmunidmedprod = $almproddet->firstAlmacenProducto($almproddet, $detalle->fkidalmacen, $detalle->fkidproducto );
                        
                        if ( is_null( $firstalmunidmedprod ) ) {
                            $almacenproductodetalle = new AlmacenProductoDetalle();
                            $almacenproductodetalle->fkidproducto = $detalle->fkidproducto;
                            $almacenproductodetalle->fkidalmacen = $detalle->fkidalmacen;
                            $almacenproductodetalle->stockactual = $detalle->cantidad;
                            $almacenproductodetalle->totalingresos = $detalle->cantidad;
                            $almacenproductodetalle->ingresos = $detalle->cantidad;
                            $almacenproductodetalle->fecha  = $request->x_fecha;
                            $almacenproductodetalle->hora   = $request->x_hora;
                            $almacenproductodetalle->save();

                            $detalle->fkidalmacenproductodetalle = $almacenproductodetalle->idalmacenproductodetalle;
                        } else {
                            $almacenproductodetalle = $almproddet->find($firstalmunidmedprod->idalmacenproductodetalle);
                            $almacenproductodetalle->stockactual = intval($almacenproductodetalle->stockactual) + intval($detalle->cantidad);
                            $almacenproductodetalle->totalingresos = intval($almacenproductodetalle->totalingresos) + intval($detalle->cantidad);
                            $almacenproductodetalle->ingresos = intval($almacenproductodetalle->ingresos) + intval($detalle->cantidad);
                            $almacenproductodetalle->update();
                            $detalle->fkidalmacenproductodetalle = $almacenproductodetalle->idalmacenproductodetalle;
                        }

                        $detalle->fkidnotaingreso = $notaingreso->idnotaingreso;

                        $prod = new Producto();
                        $producto = $prod->find( $detalle->fkidproducto );
                        $producto->stockactual = intval($producto->stockactual) + intval($detalle->cantidad);
                        $producto->totalingresos = intval($producto->totalingresos) + intval($detalle->cantidad);
                        $producto->ingresos = intval($producto->ingresos) + intval($detalle->cantidad);
                        $producto->update();
                    }
                }
            }

            DB::commit();
            return response( )->json( [
                'response' => 1,
                'notaingreso' => $notaingreso,
                'message'  => 'Nota Ingreso registrado éxitosamente.',
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
    public function show( Request $request, $idnotaingreso )
    {
        try {

            $obj = new NotaIngreso();
            $notaingreso = $obj->show( $obj, $idnotaingreso );

            if ( is_null( $notaingreso ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Ingreso no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'notaingreso' => $notaingreso,
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
    public function edit( Request $request, $idnotaingreso )
    {
        try {

            $obj = new NotaIngreso();
            $notaingreso = $obj->show( $obj, $idnotaingreso );

            if ( is_null( $notaingreso ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Ingreso no existente, favor revisar.',
                ] );
            }


            return response()->json( [
                'response' => 1,
                'notaingreso'   => $notaingreso,
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
    public function update( NotaIngresoRequest $request )
    {
        try {

            DB::beginTransaction();

            $regla = [
                'idnotaingreso' => 'required',
            ];

            $mensajes = [
                'idnotaingreso.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new NotaIngreso();
            $notaingreso = $obj->find( $request->idnotaingreso );

            if ( is_null( $notaingreso ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Ingreso no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {

                $arrayNotaIngresoDetalle = json_decode( isset( $request->arrayNotaIngresoDetalle ) ? $request->arrayNotaIngresoDetalle : '[]' );
                foreach ( $arrayNotaIngresoDetalle as $detalle ) {
                    if ( !is_null( $detalle->fkidproducto ) ) {

                        if ( is_null( $detalle->idnotaingresodetalle ) ) {

                            $almproddet = new AlmacenProductoDetalle();
                            $firstalmunidmedprod = $almproddet->firstAlmacenProducto($almproddet, $detalle->fkidalmacen, $detalle->fkidproducto );
                            
                            if ( is_null( $firstalmunidmedprod ) ) {
                                $almacenproductodetalle = new AlmacenProductoDetalle();
                                $almacenproductodetalle->fkidproducto = $detalle->fkidproducto;
                                $almacenproductodetalle->fkidalmacen = $detalle->fkidalmacen;
                                $almacenproductodetalle->stockactual = $detalle->cantidad;
                                $almacenproductodetalle->totalingresos = $detalle->cantidad;
                                $almacenproductodetalle->ingresos = $detalle->cantidad;
                                $almacenproductodetalle->fecha  = $request->x_fecha;
                                $almacenproductodetalle->hora   = $request->x_hora;
                                $almacenproductodetalle->save();

                                $detalle->fkidalmacenproductodetalle = $almacenproductodetalle->idalmacenproductodetalle;
                            } else {
                                $almacenproductodetalle = $almproddet->find($firstalmunidmedprod->idalmacenproductodetalle);
                                $almacenproductodetalle->stockactual = intval($almacenproductodetalle->stockactual) + intval($detalle->cantidad);
                                $almacenproductodetalle->totalingresos = intval($almacenproductodetalle->totalingresos) + intval($detalle->cantidad);
                                $almacenproductodetalle->ingresos = intval($almacenproductodetalle->ingresos) + intval($detalle->cantidad);
                                $almacenproductodetalle->update();
                                $detalle->fkidalmacenproductodetalle = $almacenproductodetalle->idalmacenproductodetalle;
                            }

                            $detalle->fkidnotaingreso = $notaingreso->idnotaingreso;

                            $prod = new Producto();
                            $producto = $prod->find( $detalle->fkidproducto );
                            $producto->stockactual = intval($producto->stockactual) + intval($detalle->cantidad);
                            $producto->totalingresos = intval($producto->totalingresos) + intval($detalle->cantidad);
                            $producto->ingresos = intval($producto->ingresos) + intval($detalle->cantidad);
                            $producto->update();

                            $ntaingdet = new NotaIngresoDetalle();
                            $notaingresodetalle = $ntaingdet->store($ntaingdet, $request, $detalle);
                        } else {
                            $ntaingdet = new NotaIngresoDetalle();
                            $notaingresodetalle = $ntaingdet->find( $detalle->idnotaingresodetalle );

                            if ( !is_null( $notaingresodetalle ) ) {
                                $almproddet = new AlmacenProductoDetalle();
                                $almacenproductodetalle = $almproddet->find($detalle->fkidalmacenproductodetalle);
                                if ( !is_null( $almacenproductodetalle ) ) {
                                    $almacenproductodetalle->stockactual = intval( $almacenproductodetalle->stockactual ) + intval( $detalle->cantidad ) - intval($notaingresodetalle->cantidad);
                                    $almacenproductodetalle->totalingresos = intval( $almacenproductodetalle->totalingresos ) + intval( $detalle->cantidad ) - intval($notaingresodetalle->cantidad);
                                    $almacenproductodetalle->ingresos = intval( $almacenproductodetalle->ingresos ) + intval( $detalle->cantidad ) - intval($notaingresodetalle->cantidad);
                                    $almacenproductodetalle->ingresocancelado = intval( $almacenproductodetalle->ingresocancelado ) + intval($notaingresodetalle->cantidad);
                                    $almacenproductodetalle->update();

                                    $prod = new Producto();
                                    $producto = $prod->find($almacenproductodetalle->fkidproducto);
                                    if ( !is_null( $producto ) ) {
                                        $producto->stockactual = intval( $producto->stockactual ) + intval( $detalle->cantidad ) - intval($notaingresodetalle->cantidad);
                                        $producto->totalingresos = intval( $producto->totalingresos ) + intval( $detalle->cantidad ) - intval($notaingresodetalle->cantidad);
                                        $producto->ingresos = intval( $producto->ingresos ) + intval( $detalle->cantidad ) - intval($notaingresodetalle->cantidad);
                                        $producto->update();
                                    }
                                }
                                $ntaingdet->upgrade( $ntaingdet, $detalle );
                            }
                        }
                    }
                }

                $arrayDeleteNotaIngresoDetalle = json_decode( isset( $request->arrayDeleteNotaIngresoDetalle ) ? $request->arrayDeleteNotaIngresoDetalle : '[]' );
                foreach ( $arrayDeleteNotaIngresoDetalle as $idnotaingresodetalle ) {
                    $ntaingdet = new NotaIngresoDetalle();
                    $notaingresodetalle = $ntaingdet->find( $idnotaingresodetalle );
                    if ( !is_null( $notaingresodetalle ) ) {
                        $almproddet = new AlmacenProductoDetalle();
                        $almacenproductodetalle = $almproddet->find($notaingresodetalle->fkidalmacenproductodetalle);
                        if ( !is_null( $almacenproductodetalle ) ) {
                            $almacenproductodetalle->stockactual = intval( $almacenproductodetalle->stockactual ) - intval( $notaingresodetalle->cantidad );
                            $almacenproductodetalle->totalingresos = intval( $almacenproductodetalle->totalingresos ) - intval( $notaingresodetalle->cantidad );
                            $almacenproductodetalle->ingresocancelado = intval( $almacenproductodetalle->ingresocancelado ) + intval($notaingresodetalle->cantidad);
                            $almacenproductodetalle->update();
    
                            $prod = new Producto();
                            $producto = $prod->find($almacenproductodetalle->fkidproducto);
                            if ( !is_null( $producto ) ) {
                                $producto->stockactual = intval( $producto->stockactual ) - intval( $notaingresodetalle->cantidad );
                                $producto->totalingresos = intval( $producto->totalingresos ) - intval($notaingresodetalle->cantidad);
                                $producto->ingresocancelado = intval( $producto->ingresocancelado ) + intval($notaingresodetalle->cantidad);
                                $producto->update();
                            }
                        }
                        $notaingresodetalle->delete();
                    }
                }

                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Nota Ingreso actualizado éxitosamente.',
                ] );
            }

            DB::rollBack();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Nota Ingreso.',
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
                'idnotaingreso' => 'required',
            ];

            $mensajes = [
                'idnotaingreso.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new NotaIngreso();
            $notaingreso = $obj->find( $request->idnotaingreso );

            if ( is_null( $notaingreso ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Ingreso no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            //

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            if ( $result ) {

                $ntaingdet = new NotaIngresoDetalle();
                $arrayNotaInresoDetalle = $ntaingdet->getNotaIngresoDetalle( $ntaingdet, $request->idnotaingreso );

                foreach ( $arrayNotaInresoDetalle as $detalle ) {
                    $notaingresodetalle = $ntaingdet->find( $detalle->idnotaingresodetalle );
                    if ( !is_null( $notaingresodetalle ) ) {
                        $almproddet = new AlmacenProductoDetalle();
                        $almacenproductodetalle = $almproddet->find($notaingresodetalle->fkidalmacenproductodetalle);
                        if ( !is_null( $almacenproductodetalle ) ) {
                            $almacenproductodetalle->stockactual = intval( $almacenproductodetalle->stockactual ) - intval( $notaingresodetalle->cantidad );
                            $almacenproductodetalle->totalingresos = intval( $almacenproductodetalle->totalingresos ) - intval( $notaingresodetalle->cantidad );
                            $almacenproductodetalle->ingresocancelado = intval( $almacenproductodetalle->ingresocancelado ) + intval( $notaingresodetalle->cantidad );
                            $almacenproductodetalle->update();
    
                            $prod = new Producto();
                            $producto = $prod->find($almacenproductodetalle->fkidproducto);
                            if ( !is_null( $producto ) ) {
                                $producto->stockactual = intval( $producto->stockactual ) - intval( $notaingresodetalle->cantidad );
                                $producto->totalingresos = intval( $producto->totalingresos ) - intval( $notaingresodetalle->cantidad );
                                $producto->ingresocancelado = intval( $producto->ingresocancelado ) + intval( $notaingresodetalle->cantidad );
                                $producto->update();
                            }
                        }
                        $notaingresodetalle->delete();
                    }
                }

                $tpotrans = new TipoTransaccion();
                $tipotransaccion = $tpotrans->find( $notaingreso->fkidtipotransaccion );
                if ( !is_null( $tipotransaccion ) ) {
                    $tipotransaccion->cantidadcancelada = intval( $tipotransaccion->cantidadcancelada ) + 1;
                    $tipotransaccion->update();
                }

                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Nota Ingreso eliminado éxitosamente.',
                ] );
            }

            DB::commit();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al eliminar Nota Ingreso.',
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
                'idnotaingreso' => 'required',
            ];

            $mensajes = [
                'idnotaingreso.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idnotaingreso = $request->input('idnotaingreso');
            
            $obj = new NotaIngreso();
            $notaingreso = $obj->searchByID( $obj, $idnotaingreso );

            if ( is_null( $notaingreso ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Ingreso no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'notaingreso' => $notaingreso,
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

            $obj = new NotaIngreso();

            $notaingreso = $obj->get_data( $obj, $request );

            if ( sizeof( $notaingreso ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Nota Ingreso insertado.',
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
                'arrayNotaIngreso' => $notaingreso,
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
