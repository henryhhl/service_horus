<?php

namespace App\Http\Controllers\Comercio\Compra;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Compra\SolicitudCompraRequest;
use App\Models\Comercio\Compra\ConceptoCompra;
use App\Models\Comercio\Compra\OrdenCompra;
use App\Models\Comercio\Compra\SolicitudCompra;
use App\Models\Comercio\Compra\SolicitudCompraDetalle;
use App\Models\Comercio\Inventario\SeccionInventario;
use App\Models\Comercio\Venta\Sucursal;
use App\Models\Comercio\Venta\TipoTransaccion;
use App\Models\Configuracion\Moneda;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SolicitudCompraController extends Controller
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
            $obj = new SolicitudCompra();

            if ( $esPaginado == 0 ) {

                $solicitudcompra = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'solicitudcompra'  => $solicitudcompra,
                    'ssss'  => $request->isordencompra,
                ] );
            }

            $solicitudcompra = $obj->get_paginate( $obj, $request );

            return response( )->json( [
                'response' => 1,
                'solicitudcompra'  => $solicitudcompra->getCollection(),
                'pagination' => [
                    'total'        => $solicitudcompra->total(),
                    'current_page' => $solicitudcompra->currentPage(),
                    'per_page'     => $solicitudcompra->perPage(),
                    'last_page'    => $solicitudcompra->lastPage(),
                    'from'         => $solicitudcompra->firstItem(),
                    'to'           => $solicitudcompra->lastItem(),
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

            $obj = new SolicitudCompra();
            $idsolicitudcompra = $obj->newID();

            $obj = new Moneda();
            $arrayMoneda = $obj->get_data( $obj, $request );

            $suc = new Sucursal();
            $arraySucursal = $suc->get_data( $suc, $request );

            $concepcomp = new ConceptoCompra();
            $arrayConceptoCompra = $concepcomp->get_data( $concepcomp, $request );

            $seccinv = new SeccionInventario();
            $arraySeccionInventario = $seccinv->get_data( $seccinv, $request );

            return response()->json( [
                'response' => 1,
                'idsolicitudcompra'  => $idsolicitudcompra,
                'arrayMoneda'        => $arrayMoneda,
                'arraySucursal'      => $arraySucursal,
                'arrayConceptoCompra' => $arrayConceptoCompra,
                'arraySeccionInventario' => $arraySeccionInventario,
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
    public function store(SolicitudCompraRequest $request)
    {
        try {

            DB::beginTransaction();

            $obj = new SolicitudCompra();
            $solicitudcompra = $obj->store( $obj, $request );

            $arraySolicitudCompraDetalle = json_decode($request->input('arraySolicitudCompraDetalle', '[]'));
            foreach ( $arraySolicitudCompraDetalle as $detalle ) {
                if ( !is_null( $detalle->fkidproducto ) ) {
                    $detalle->fkidsolicitudcompra = $solicitudcompra->idsolicitudcompra;
                    $solicitudcompradetalle = new SolicitudCompraDetalle();
                    $solicitudcompradetalle->store($solicitudcompradetalle, $request, $detalle);
                }
            }

            $tpotrans = new TipoTransaccion();
            $tipotransaccion = $tpotrans->find( $solicitudcompra->fkidtipotransaccion );
            if ( !is_null( $tipotransaccion ) ) {
                $tipotransaccion->cantidadrealizada = intval( $tipotransaccion->cantidadrealizada ) + 1;
                $tipotransaccion->update();
            }

            DB::commit();
            return response( )->json( [
                'response' => 1,
                'solicitudcompra' => $solicitudcompra,
                'message'  => 'Solicitud Compra registrado éxitosamente.',
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
    public function show( Request $request, $idsolicitudcompra )
    {
        try {

            $obj = new SolicitudCompra();
            $solicitudcompra = $obj->show( $obj, $idsolicitudcompra );

            if ( is_null( $solicitudcompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Solicitud Compra no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'solicitudcompra'   => $solicitudcompra,
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
    public function edit( Request $request, $idsolicitudcompra )
    {
        try {

            $obj = new SolicitudCompra();
            $solicitudcompra = $obj->show( $obj, $idsolicitudcompra );

            if ( is_null( $solicitudcompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Solicitud Compra no existente, favor revisar.',
                ] );
            }


            return response()->json( [
                'response' => 1,
                'solicitudcompra'   => $solicitudcompra,
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
    public function update( SolicitudCompraRequest $request )
    {
        try {

            DB::beginTransaction();

            $regla = [
                'idsolicitudcompra' => 'required',
            ];

            $mensajes = [
                'idsolicitudcompra.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new SolicitudCompra();

            $solicitudcompra = $obj->find( $request->idsolicitudcompra );

            if ( is_null( $solicitudcompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Solicitud Compra no existe.',
                ] );
            }

            if ( $solicitudcompra->isordencompra == "A" ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Funcionalidad no permitido. Ya que se encuentra en ORDEN DE COMPRA registrado.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {

                $arraySolicitudCompraDetalle = json_decode( isset( $request->arraySolicitudCompraDetalle ) ? $request->arraySolicitudCompraDetalle : '[]' );
                foreach ( $arraySolicitudCompraDetalle as $detalle ) {
                    if ( !is_null( $detalle->fkidproducto ) ) {
                        $solicompdet = new SolicitudCompraDetalle();
                        $detalle->fkidsolicitudcompra = $solicitudcompra->idsolicitudcompra;
                        if ( is_null( $detalle->idsolicitudcompradetalle ) ) {
                            $solicompdet->store( $solicompdet, $request, $detalle );
                        } else {
                            $solicitudcompradetalle = $solicompdet->upgrade( $solicompdet, $detalle );
                        }
                    }
                }

                $arrayDeleteSolicitudCompraDetalle = json_decode( isset( $request->arrayDeleteSolicitudCompraDetalle ) ? $request->arrayDeleteSolicitudCompraDetalle : '[]' );
                foreach ( $arrayDeleteSolicitudCompraDetalle as $idsolicitudcompradetalle ) {
                    $solicompdet = new SolicitudCompraDetalle();
                    $solicitudcompradetalle = $solicompdet->find( $idsolicitudcompradetalle );
                    if ( !is_null( $solicitudcompradetalle ) ) {
                        $solicitudcompradetalle->delete();
                    }
                }

                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Solicitud Compra actualizado éxitosamente.',
                ] );
            }

            DB::rollBack();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Solicitud Compra.',
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
                'idsolicitudcompra' => 'required',
            ];

            $mensajes = [
                'idsolicitudcompra.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {
                DB::rollBack();
                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new SolicitudCompra();
            $solicitudcompra = $obj->find( $request->idsolicitudcompra );

            if ( is_null( $solicitudcompra ) ) {
                DB::rollBack();
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Solicitud Compra no existe.',
                ] );
            }

            if ( $solicitudcompra->isordencompra == "A" ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Funcionalidad no permitido. Ya que se encuentra en ORDEN DE COMPRA registrado.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            $ordcomp = new OrdenCompra();
            if ( $ordcomp->existsSolicitudCompra( $ordcomp, $request->idsolicitudcompra ) ) {
                DB::rollBack();
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que se encuentra registrado en una orden de compra.',
                ] );
            }

            //

            /* fin de restriccion */

            $solicitudcompradelete = $obj->remove( $obj, $request );

            if ( $solicitudcompradelete ) {
                $solcompdet = new SolicitudCompraDetalle();
                $arraySolicitudCompraDetalle = $solcompdet->getSolicitudCompraDetalle( $solcompdet, $request->idsolicitudcompra );

                foreach ( $arraySolicitudCompraDetalle as $detalle ) {
                    $solicitudcompradetalle = $solcompdet->find($detalle->idsolicitudcompradetalle);
                    if ( !is_null( $solicitudcompradetalle ) ) {
                        $solicitudcompradetalle->delete();
                    }
                }

                $tpotrans = new TipoTransaccion();
                $tipotransaccion = $tpotrans->find( $solicitudcompra->fkidtipotransaccion );
                if ( !is_null( $tipotransaccion ) ) {
                    $tipotransaccion->cantidadcancelada = intval( $tipotransaccion->cantidadcancelada ) + 1;
                    $tipotransaccion->update();
                }

                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Solicitud Compra eliminado éxitosamente.',
                    'solicitudcompradelete' => $solicitudcompradelete,
                ] );

            }

            DB::rollBack();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al eliminar, favor de intentar nuevamente.',
                'solicitudcompradelete' => $solicitudcompradelete,
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
                'idsolicitudcompra' => 'required',
            ];

            $mensajes = [
                'idsolicitudcompra.required' => 'El ID Solicitud Compra es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idsolicitudcompra = $request->input('idsolicitudcompra');

            $obj = new SolicitudCompra();
            $solicitudcompra = $obj->searchByID( $obj, $idsolicitudcompra );

            if ( is_null( $solicitudcompra ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Solicitud Compra no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'solicitudcompra' => $solicitudcompra,
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

            $obj = new SolicitudCompra();

            $solicitudcompra = $obj->get_data( $obj, $request );

            if ( sizeof( $solicitudcompra ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Solicitud Compra insertado.',
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
                'arraySolicitudCompra' => $solicitudcompra,
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
