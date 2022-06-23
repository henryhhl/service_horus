<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Inventario\NotaTraspasoProductoRequest;
use App\Models\Comercio\Inventario\AlmacenProductoDetalle;
use App\Models\Comercio\Inventario\ConceptoInventario;
use App\Models\Comercio\Inventario\NotaTraspasoProducto;
use App\Models\Comercio\Inventario\NotaTraspasoProductoDetalle;
use App\Models\Comercio\Inventario\Producto;
use App\Models\Comercio\Venta\Sucursal;
use App\Models\Comercio\Venta\TipoTransaccion;
use App\Models\Configuracion\Moneda;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class NotaTraspasoProductoController extends Controller
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
            $obj = new NotaTraspasoProducto();

            if ( $esPaginado == 0 ) {

                $notatraspasoproducto = $obj->get_data( $obj, $request );
                return response( )->json( [
                    'response' => 1,
                    'arrayNotaTraspasoProducto'  => $notatraspasoproducto,
                ] );
            }

            $notatraspasoproducto = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'arrayNotaTraspasoProducto'  => $notatraspasoproducto->getCollection(),
                'pagination' => [
                    'total'        => $notatraspasoproducto->total(),
                    'current_page' => $notatraspasoproducto->currentPage(),
                    'per_page'     => $notatraspasoproducto->perPage(),
                    'last_page'    => $notatraspasoproducto->lastPage(),
                    'from'         => $notatraspasoproducto->firstItem(),
                    'to'           => $notatraspasoproducto->lastItem(),
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

            $obj = new NotaTraspasoProducto();
            $idnotatraspasoproducto = $obj->newID();

            $obj = new Moneda();
            $moneda = $obj->get_data( $obj, $request );

            $suc = new Sucursal();
            $arraySucursal = $suc->get_data( $suc, $request );

            $conceptinv = new ConceptoInventario();
            $arrayConceptoInventario = $conceptinv->get_data( $conceptinv, $request );

            return response()->json( [
                'response' => 1,
                'idnotatraspasoproducto' => $idnotatraspasoproducto,
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
    public function store( NotaTraspasoProductoRequest $request )
    {
        try {

            DB::beginTransaction();

            $obj = new NotaTraspasoProducto();
            $notatraspasoproducto = $obj->store( $obj, $request );

            $tpotrans = new TipoTransaccion();
            $tipotransaccion = $tpotrans->find( $notatraspasoproducto->fkidtipotransaccion );
            if ( !is_null( $tipotransaccion ) ) {
                $tipotransaccion->cantidadrealizada = intval( $tipotransaccion->cantidadrealizada ) + 1;
                $tipotransaccion->update();
            }

            $arrayNotaTraspasoProductoDetalle = json_decode($request->input('arrayNotaTraspasoProductoDetalle', '[]'));

            foreach ( $arrayNotaTraspasoProductoDetalle as $detalle ) {
                if ( !is_null( $detalle->fkidproducto ) ) {

                    $almproddet = new AlmacenProductoDetalle();
                    $firstalmprodsal = $almproddet->firstAlmacenProducto($almproddet, $detalle->fkidalmacensalida, $detalle->fkidproducto );
                    
                    if ( !is_null( $firstalmprodsal ) ) {
                        $firstalmproding = $almproddet->firstAlmacenProducto($almproddet, $detalle->fkidalmaceningreso, $detalle->fkidproducto );
                        if ( is_null( $firstalmproding ) ) {
                            $almacenproductodetalle = new AlmacenProductoDetalle();
                            $almacenproductodetalle->fkidproducto = $detalle->fkidproducto;
                            $almacenproductodetalle->fkidalmacen = $detalle->fkidalmaceningreso;
                            $almacenproductodetalle->stockactual = $detalle->cantidad;
                            $almacenproductodetalle->totaltraspasos = $detalle->cantidad;
                            $almacenproductodetalle->traspasos = $detalle->cantidad;
                            $almacenproductodetalle->fecha   = $request->x_fecha;
                            $almacenproductodetalle->hora    = $request->x_hora;
                            $almacenproductodetalle->save();
    
                            $detalle->fkidalmacenproductodetalleingreso = $almacenproductodetalle->idalmacenproductodetalle;
                        } else {
                            $almacenproductodetalle = $almproddet->find($firstalmproding->idalmacenproductodetalle);
                            $almacenproductodetalle->stockactual = intval($almacenproductodetalle->stockactual) + intval($detalle->cantidad);
                            $almacenproductodetalle->totaltraspasos = intval($almacenproductodetalle->totaltraspasos) + intval($detalle->cantidad);
                            $almacenproductodetalle->traspasos = intval($almacenproductodetalle->traspasos) + intval($detalle->cantidad);
                            $almacenproductodetalle->update();
                            $detalle->fkidalmacenproductodetalleingreso = $almacenproductodetalle->idalmacenproductodetalle;
                        }

                        $almacenproductodetalle = $almproddet->find($firstalmprodsal->idalmacenproductodetalle);
                        $almacenproductodetalle->stockactual = intval($almacenproductodetalle->stockactual) - intval($detalle->cantidad);
                        $almacenproductodetalle->totaltraspasos = intval($almacenproductodetalle->totaltraspasos) + intval($detalle->cantidad);
                        $almacenproductodetalle->traspasos = intval($almacenproductodetalle->traspasos) + intval($detalle->cantidad);
                        $almacenproductodetalle->update();
                        $detalle->fkidalmacenproductodetallesalida = $almacenproductodetalle->idalmacenproductodetalle;
                    }

                    $detalle->fkidnotatraspasoproducto = $notatraspasoproducto->idnotatraspasoproducto;

                    $prod = new Producto();
                    $producto = $prod->find( $detalle->fkidproducto );
                    $producto->totaltraspasos = intval($producto->totaltraspasos) + intval($detalle->cantidad);
                    $producto->traspasos = intval($producto->traspasos) + intval($detalle->cantidad);
                    $producto->update();

                    $ntatraspproddet = new NotaTraspasoProductoDetalle();
                    $notatraspasoproductodetalle = $ntatraspproddet->store($ntatraspproddet, $request, $detalle);
                }
            }

            DB::commit();
            return response( )->json( [
                'response' => 1,
                'notatraspasoproducto' => $notatraspasoproducto,
                'message'  => 'Nota Traspaso registrado éxitosamente.',
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
    public function show( Request $request, $idnotatraspasoproducto )
    {
        try {

            $obj = new NotaTraspasoProducto();
            $notatraspasoproducto = $obj->show( $obj, $idnotatraspasoproducto );

            if ( is_null( $notatraspasoproducto ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Traspaso no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'notatraspasoproducto' => $notatraspasoproducto,
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
    public function edit( Request $request, $idnotatraspasoproducto )
    {
        try {

            $obj = new NotaTraspasoProducto();
            $notatraspasoproducto = $obj->show( $obj, $idnotatraspasoproducto );

            if ( is_null( $notatraspasoproducto ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Traspaso no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'notatraspasoproducto' => $notatraspasoproducto,
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
    public function update( NotaTraspasoProductoRequest $request )
    {
        try {

            DB::beginTransaction();

            $regla = [
                'idnotatraspasoproducto' => 'required',
            ];

            $mensajes = [
                'idnotatraspasoproducto.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new NotaTraspasoProducto();
            $notatraspasoproducto = $obj->find( $request->idnotatraspasoproducto );

            if ( is_null( $notatraspasoproducto ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Traspaso no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {

                $arrayNotaTraspasoProductoDetalle = json_decode( isset( $request->arrayNotaTraspasoProductoDetalle ) ? $request->arrayNotaTraspasoProductoDetalle : '[]' );
                foreach ( $arrayNotaTraspasoProductoDetalle as $detalle ) {
                    if ( !is_null( $detalle->fkidproducto ) ) {

                        if ( is_null( $detalle->idnotatraspasoproductodetalle ) ) {

                            $almproddet = new AlmacenProductoDetalle();
                            $firstalmprodsal = $almproddet->firstAlmacenProducto($almproddet, $detalle->fkidalmacensalida, $detalle->fkidproducto );
                    
                            if ( !is_null( $firstalmprodsal ) ) {
                                $firstalmproding = $almproddet->firstAlmacenProducto($almproddet, $detalle->fkidalmaceningreso, $detalle->fkidproducto );
                                if ( is_null( $firstalmproding ) ) {
                                    $almacenproductodetalle = new AlmacenProductoDetalle();
                                    $almacenproductodetalle->fkidproducto = $detalle->fkidproducto;
                                    $almacenproductodetalle->fkidalmacen = $detalle->fkidalmaceningreso;
                                    $almacenproductodetalle->stockactual = $detalle->cantidad;
                                    $almacenproductodetalle->totaltraspasos = $detalle->cantidad;
                                    $almacenproductodetalle->traspasos = $detalle->cantidad;
                                    $almacenproductodetalle->fecha   = $request->x_fecha;
                                    $almacenproductodetalle->hora    = $request->x_hora;
                                    $almacenproductodetalle->save();
            
                                    $detalle->fkidalmacenproductodetalleingreso = $almacenproductodetalle->idalmacenproductodetalle;
                                } else {
                                    $almacenproductodetalle = $almproddet->find($firstalmproding->idalmacenproductodetalle);
                                    $almacenproductodetalle->stockactual = intval($almacenproductodetalle->stockactual) + intval($detalle->cantidad);
                                    $almacenproductodetalle->totaltraspasos = intval($almacenproductodetalle->traspasos) + intval($detalle->traspasos);
                                    $almacenproductodetalle->traspasos = intval($almacenproductodetalle->traspasos) + intval($detalle->traspasos);
                                    $almacenproductodetalle->update();
                                    $detalle->fkidalmacenproductodetalleingreso = $almacenproductodetalle->idalmacenproductodetalle;
                                }

                                $almacenproductodetalle = $almproddet->find($firstalmprodsal->idalmacenproductodetalle);
                                $almacenproductodetalle->stockactual = intval($almacenproductodetalle->stockactual) - intval($detalle->cantidad);
                                $almacenproductodetalle->totaltraspasos = intval($almacenproductodetalle->totaltraspasos) + intval($detalle->cantidad);
                                $almacenproductodetalle->traspasos = intval($almacenproductodetalle->traspasos) + intval($detalle->cantidad);
                                $almacenproductodetalle->update();
                                $detalle->fkidalmacenproductodetallesalida = $almacenproductodetalle->idalmacenproductodetalle;
                            }

                            $prod = new Producto();
                            $producto = $prod->find( $detalle->fkidproducto );
                            $producto->totaltraspasos = intval($producto->totaltraspasos) + intval($detalle->cantidad);
                            $producto->traspasos = intval($producto->traspasos) + intval($detalle->cantidad);
                            $producto->update();

                            $detalle->fkidnotatraspasoproducto = $notatraspasoproducto->idnotatraspasoproducto;

                            $ntatraspproddet = new NotaTraspasoProductoDetalle();
                            $notatraspasoproductodetalle = $ntatraspproddet->store($ntatraspproddet, $request, $detalle);
                        } else {
                            $ntatraspproddet = new NotaTraspasoProductoDetalle();
                            $notatraspasoproductodetalle = $ntatraspproddet->find( $detalle->idnotatraspasoproductodetalle );

                            if ( !is_null( $notatraspasoproductodetalle ) ) {
                                $almproddet = new AlmacenProductoDetalle();
                                $almacenproductodetalleingreso = $almproddet->find($detalle->fkidalmacenproductodetalleingreso);
                                if ( !is_null( $almacenproductodetalleingreso ) ) {
                                    $almacenproductodetalleingreso->stockactual = intval( $almacenproductodetalleingreso->stockactual ) + intval( $detalle->cantidad ) - intval($notatraspasoproductodetalle->cantidad);
                                    $almacenproductodetalleingreso->totaltraspasos = intval( $almacenproductodetalleingreso->totaltraspasos ) + intval( $detalle->cantidad ) - intval($notatraspasoproductodetalle->cantidad);
                                    $almacenproductodetalleingreso->traspasos = intval( $almacenproductodetalleingreso->traspasos ) + intval( $detalle->cantidad ) - intval($notatraspasoproductodetalle->cantidad);
                                    $almacenproductodetalleingreso->traspasocancelada = intval( $almacenproductodetalleingreso->traspasocancelada ) + intval($notatraspasoproductodetalle->cantidad);
                                    $almacenproductodetalleingreso->update();
                                }
                                $almacenproductodetallesalida = $almproddet->find($detalle->fkidalmacenproductodetallesalida);
                                if ( !is_null( $almacenproductodetallesalida ) ) {
                                    $almacenproductodetallesalida->stockactual = intval( $almacenproductodetallesalida->stockactual ) - intval( $detalle->cantidad ) + intval($notatraspasoproductodetalle->cantidad);
                                    $almacenproductodetallesalida->totaltraspasos = intval( $almacenproductodetallesalida->totaltraspasos ) + intval( $detalle->cantidad ) - intval($notatraspasoproductodetalle->cantidad);
                                    $almacenproductodetallesalida->traspasos = intval( $almacenproductodetallesalida->traspasos ) + intval( $detalle->cantidad ) - intval($notatraspasoproductodetalle->cantidad);
                                    $almacenproductodetallesalida->traspasocancelada = intval( $almacenproductodetallesalida->traspasocancelada ) + intval($notatraspasoproductodetalle->cantidad);
                                    $almacenproductodetallesalida->update();
                                }
                                $prod = new Producto();
                                $producto = $prod->find( $detalle->fkidproducto );
                                $producto->totaltraspasos = intval($producto->totaltraspasos) + intval($detalle->cantidad) - intval($notatraspasoproductodetalle->cantidad);
                                $producto->traspasos = intval($producto->traspasos) + intval($detalle->cantidad) - intval($notatraspasoproductodetalle->cantidad);
                                $producto->update();
                                $ntatraspproddet->upgrade( $ntatraspproddet, $detalle );
                            }
                        }
                    }
                }

                $arrayDeleteNotaTraspasoProductoDetalle = json_decode( isset( $request->arrayDeleteNotaTraspasoProductoDetalle ) ? $request->arrayDeleteNotaTraspasoProductoDetalle : '[]' );
                foreach ( $arrayDeleteNotaTraspasoProductoDetalle as $idnotatraspasoproductodetalle ) {
                    $ntatraspproddet = new NotaTraspasoProductoDetalle();
                    $notatraspasoproductodetalle = $ntatraspproddet->find( $idnotatraspasoproductodetalle );
                    if ( !is_null( $notatraspasoproductodetalle ) ) {
                        $almproddet = new AlmacenProductoDetalle();
                        $almacenproductodetalleingreso = $almproddet->find($notatraspasoproductodetalle->fkidalmacenproductodetalleingreso);
                        if ( !is_null( $almacenproductodetalleingreso ) ) {
                            $almacenproductodetalleingreso->stockactual = intval( $almacenproductodetalleingreso->stockactual ) - intval( $notatraspasoproductodetalle->cantidad );
                            $almacenproductodetalleingreso->totaltraspasos = intval( $almacenproductodetalleingreso->totaltraspasos ) - intval( $notatraspasoproductodetalle->cantidad );
                            $almacenproductodetalleingreso->traspasocancelada = intval( $almacenproductodetalleingreso->traspasocancelada ) + intval( $notatraspasoproductodetalle->cantidad );
                            $almacenproductodetalleingreso->update();
                        }
                        $almacenproductodetallesalida = $almproddet->find($notatraspasoproductodetalle->fkidalmacenproductodetallesalida);
                        if ( !is_null( $almacenproductodetallesalida ) ) {
                            $almacenproductodetallesalida->stockactual = intval( $almacenproductodetallesalida->stockactual ) + intval( $notatraspasoproductodetalle->cantidad );
                            $almacenproductodetallesalida->totaltraspasos = intval( $almacenproductodetallesalida->totaltraspasos ) - intval( $notatraspasoproductodetalle->cantidad );
                            $almacenproductodetallesalida->traspasocancelada = intval( $almacenproductodetallesalida->traspasocancelada ) + intval( $notatraspasoproductodetalle->cantidad );
                            $almacenproductodetallesalida->update();
                        }
                        $prod = new Producto();
                        $producto = $prod->find( $notatraspasoproductodetalle->fkidproducto );
                        $producto->totaltraspasos = intval($producto->totaltraspasos) - intval($notatraspasoproductodetalle->cantidad);
                        $producto->traspasocancelado = intval($producto->traspasocancelado) + intval($notatraspasoproductodetalle->cantidad);
                        $producto->update();
                        $notatraspasoproductodetalle->delete();
                    }
                }

                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Nota Traspaso actualizado éxitosamente.',
                ] );
            }

            DB::rollBack();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Nota Traspaso.',
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
                'idnotatraspasoproducto' => 'required',
            ];

            $mensajes = [
                'idnotatraspasoproducto.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new NotaTraspasoProducto();
            $notatraspasoproducto = $obj->find( $request->idnotatraspasoproducto );

            if ( is_null( $notatraspasoproducto ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Traspaso no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            //

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            if ( $result ) {

                $ntatraspproddet = new NotaTraspasoProductoDetalle();
                $arrayNotaTraspasoProductoDetalle = $ntatraspproddet->getNotaTraspasoProductoDetalle( $ntatraspproddet, $request->idnotatraspasoproducto );

                foreach ( $arrayNotaTraspasoProductoDetalle as $detalle ) {
                    $notatraspasoproductodetalle = $ntatraspproddet->find( $detalle->idnotatraspasoproductodetalle );
                    if ( !is_null( $notatraspasoproductodetalle ) ) {
                        $almproddet = new AlmacenProductoDetalle();
                        $almacenproductodetalleingreso = $almproddet->find($notatraspasoproductodetalle->fkidalmacenproductodetalleingreso);
                        if ( !is_null( $almacenproductodetalleingreso ) ) {
                            $almacenproductodetalleingreso->stockactual = intval( $almacenproductodetalleingreso->stockactual ) - intval( $notatraspasoproductodetalle->cantidad );
                            $almacenproductodetalleingreso->totaltraspasos = intval( $almacenproductodetalleingreso->totaltraspasos ) - intval( $notatraspasoproductodetalle->cantidad );
                            $almacenproductodetalleingreso->traspasocancelada = intval( $almacenproductodetalleingreso->traspasocancelada ) + intval( $notatraspasoproductodetalle->cantidad );
                            $almacenproductodetalleingreso->update();
                        }
                        $almacenproductodetallesalida = $almproddet->find($notatraspasoproductodetalle->fkidalmacenproductodetallesalida);
                        if ( !is_null( $almacenproductodetallesalida ) ) {
                            $almacenproductodetallesalida->stockactual = intval( $almacenproductodetallesalida->stockactual ) + intval( $notatraspasoproductodetalle->cantidad );
                            $almacenproductodetallesalida->totaltraspasos = intval( $almacenproductodetallesalida->totaltraspasos ) - intval( $notatraspasoproductodetalle->cantidad );
                            $almacenproductodetallesalida->traspasocancelada = intval( $almacenproductodetallesalida->traspasocancelada ) + intval( $notatraspasoproductodetalle->cantidad );
                            $almacenproductodetallesalida->update();
                        }
                        $prod = new Producto();
                        $producto = $prod->find( $notatraspasoproductodetalle->fkidproducto );
                        $producto->totaltraspasos = intval($producto->totaltraspasos) - intval($notatraspasoproductodetalle->cantidad);
                        $producto->traspasocancelado = intval($producto->traspasocancelado) + intval($notatraspasoproductodetalle->cantidad);
                        $producto->update();
                        $notatraspasoproductodetalle->delete();
                    }
                }

                $tpotrans = new TipoTransaccion();
                $tipotransaccion = $tpotrans->find( $notatraspasoproducto->fkidtipotransaccion );
                if ( !is_null( $tipotransaccion ) ) {
                    $tipotransaccion->cantidadcancelada = intval( $tipotransaccion->cantidadcancelada ) + 1;
                    $tipotransaccion->update();
                }

                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Nota Traspaso eliminado éxitosamente.',
                ] );
            }

            DB::commit();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al eliminar Nota Traspaso.',
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
                'idnotatraspasoproducto' => 'required',
            ];

            $mensajes = [
                'idnotatraspasoproducto.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idnotatraspasoproducto = $request->input('idnotatraspasoproducto');
            
            $obj = new NotaTraspasoProducto();
            $notatraspasoproducto = $obj->searchByID( $obj, $idnotatraspasoproducto );

            if ( is_null( $notatraspasoproducto ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Traspaso no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'notatraspasoproducto' => $notatraspasoproducto,
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

            $obj = new NotaTraspasoProducto();

            $notatraspasoproducto = $obj->get_data( $obj, $request );

            if ( sizeof( $notatraspasoproducto ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Nota Traspaso insertado.',
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
                'arrayNotaTraspasoProducto' => $notatraspasoproducto,
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
