<?php

namespace App\Http\Controllers\Comercio\Compra;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Compra\OrdenCompraRequest;
use App\Models\Comercio\Compra\ConceptoCompra;
use App\Models\Comercio\Compra\NotaCompra;
use App\Models\Comercio\Compra\OrdenCompra;
use App\Models\Comercio\Compra\OrdenCompraDetalle;
use App\Models\Comercio\Compra\SolicitudCompra;
use App\Models\Comercio\Inventario\SeccionInventario;
use App\Models\Comercio\Venta\Sucursal;
use App\Models\Comercio\Venta\TipoTransaccion;
use App\Models\Configuracion\Moneda;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrdenCompraController extends Controller
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
            $obj = new OrdenCompra();

            if ( $esPaginado == 0 ) {

                $ordencompra = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'ordencompra'  => $ordencompra,
                ] );
            }

            $ordencompra = $obj->get_paginate( $obj, $request );

            return response( )->json( [
                'response' => 1,
                'ordencompra'  => $ordencompra->getCollection(),
                'pagination' => [
                    'total'        => $ordencompra->total(),
                    'current_page' => $ordencompra->currentPage(),
                    'per_page'     => $ordencompra->perPage(),
                    'last_page'    => $ordencompra->lastPage(),
                    'from'         => $ordencompra->firstItem(),
                    'to'           => $ordencompra->lastItem(),
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

            $obj = new OrdenCompra();
            $idordencompra = $obj->newID();

            $obj = new Moneda();
            $moneda = $obj->get_data( $obj, $request );

            $suc = new Sucursal();
            $arraySucursal = $suc->get_data( $suc, $request );

            $concepcomp = new ConceptoCompra();
            $arrayConceptoCompra = $concepcomp->get_data( $concepcomp, $request );

            $seccinv = new SeccionInventario();
            $arraySeccionInventario = $seccinv->get_data( $seccinv, $request );

            return response()->json( [
                'response' => 1,
                'idordencompra' => $idordencompra,
                'arrayMoneda'   => $moneda,
                'arraySucursal'   => $arraySucursal,
                'arrayConceptoCompra'   => $arrayConceptoCompra,
                'arraySeccionInventario'   => $arraySeccionInventario,
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
    public function store( OrdenCompraRequest $request )
    {
        try {

            DB::beginTransaction();

            $obj = new OrdenCompra();
            $ordencompra = $obj->store( $obj, $request );

            if ( !is_null( $ordencompra->fkidsolicitudcompra ) ) {
                $solicomp = new SolicitudCompra();
                $solicitudcompra = $solicomp->find( $ordencompra->fkidsolicitudcompra );
                $solicitudcompra->isordencompra = "A";
                $solicitudcompra->update();
            }

            $arrayOrdenCompraDetalle = json_decode($request->input('arrayOrdenCompraDetalle', '[]'));
            foreach ( $arrayOrdenCompraDetalle as $detalle ) {
                if ( !is_null( $detalle->fkidproducto ) ) {
                    $detalle->fkidordencompra = $ordencompra->idordencompra;
                    $ordencompradetalle = new OrdenCompraDetalle();
                    $ordencompradetalle->store($ordencompradetalle, $request, $detalle);
                }
            }

            $tpotrans = new TipoTransaccion();
            $tipotransaccion = $tpotrans->find( $ordencompra->fkidtipotransaccion );
            if ( !is_null( $tipotransaccion ) ) {
                $tipotransaccion->cantidadrealizada = intval( $tipotransaccion->cantidadrealizada ) + 1;
                $tipotransaccion->update();
            }

            DB::commit();
            return response( )->json( [
                'response' => 1,
                'ordencompra' => $ordencompra,
                'message'  => 'Orden Compra registrado éxitosamente.',
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
    public function show( Request $request, $idordencompra )
    {
        try {

            $obj = new OrdenCompra();
            $ordencompra = $obj->show( $obj, $idordencompra );

            if ( is_null( $ordencompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Orden Compra no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'ordencompra'   => $ordencompra,
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
    public function edit( Request $request, $idordencompra )
    {
        try {

            $obj = new OrdenCompra();
            $ordencompra = $obj->show( $obj, $idordencompra );

            if ( is_null( $ordencompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Orden Compra no existente, favor revisar.',
                ] );
            }


            return response()->json( [
                'response' => 1,
                'ordencompra'   => $ordencompra,
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
    public function update( OrdenCompraRequest $request )
    {
        try {

            DB::beginTransaction();

            $regla = [
                'idordencompra' => 'required',
            ];

            $mensajes = [
                'idordencompra.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new OrdenCompra();

            $ordencompra = $obj->find( $request->idordencompra );

            if ( is_null( $ordencompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Orden Compra no existe.',
                ] );
            }

            if ( $ordencompra->iscompra == "A" ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Funcionalidad no permitido. Ya que se encuentra en NOTA DE COMPRA registrado.',
                ] );
            }

            if ( !is_null( $ordencompra->fkidsolicitudcompra ) ) {
                $solicomp = new SolicitudCompra();
                $solicitudcompra = $solicomp->find( $ordencompra->fkidsolicitudcompra );
                $solicitudcompra->isordencompra = "N";
                $solicitudcompra->update();
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                $ordencompra = $obj->find( $request->idordencompra );
                $fkidsolicitudcompra = $ordencompra->fkidsolicitudcompra;

                if ( !is_null( $fkidsolicitudcompra ) ) {
                    $solicomp = new SolicitudCompra();
                    $solicitudcompra = $solicomp->find( $fkidsolicitudcompra );
                    $solicitudcompra->isordencompra = "A";
                    $solicitudcompra->update();
                }

                $arrayOrdenCompraDetalle = json_decode( isset( $request->arrayOrdenCompraDetalle ) ? $request->arrayOrdenCompraDetalle : '[]' );
                foreach ( $arrayOrdenCompraDetalle as $detalle ) {
                    if ( !is_null( $detalle->fkidproducto ) ) {
                        $ordcompdet = new OrdenCompraDetalle();
                        $detalle->fkidordencompra = $ordencompra->idordencompra;
                        if ( is_null( $detalle->idordencompradetalle ) ) {
                            $ordcompdet->store( $ordcompdet, $request, $detalle );
                        } else {
                            $ordencompradetalle = $ordcompdet->upgrade( $ordcompdet, $detalle );
                        }
                    }
                }

                $arrayDeleteOrdenCompraDetalle = json_decode( isset( $request->arrayDeleteOrdenCompraDetalle ) ? $request->arrayDeleteOrdenCompraDetalle : '[]' );
                foreach ( $arrayDeleteOrdenCompraDetalle as $idordencompradetalle ) {
                    $ordcompdet = new OrdenCompraDetalle();
                    $ordencompradetalle = $ordcompdet->find( $idordencompradetalle );
                    if ( !is_null( $ordencompradetalle ) ) {
                        $ordencompradetalle->delete();
                    }
                }

                $ordcompdet = new OrdenCompraDetalle();
                $arrayOrdenCompraDetalle = $ordcompdet->getOrdenCompraDetalle( $ordcompdet, $ordencompra->idordencompra );

                foreach ( $arrayOrdenCompraDetalle as $detalle ) {
                    $ordencompradetalle = $ordcompdet->find($detalle->idordencompradetalle);
                    if ( !is_null( $ordencompradetalle ) ) {
                        if ( $ordencompradetalle->fkidsolicitudcompra != $ordencompra->fkidsolicitudcompra ) {
                            if ( !is_null( $ordencompradetalle->fkidsolicitudcompra ) ) {
                                $ordencompradetalle->delete();
                            }
                        }
                    }
                }

                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Orden Compra actualizado éxitosamente.',
                ] );
            }

            DB::rollBack();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Orden Compra.',
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
                'idordencompra' => 'required',
            ];

            $mensajes = [
                'idordencompra.required' => 'El ID es requerido.'
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

            $obj = new OrdenCompra();
            $ordencompra = $obj->find( $request->idordencompra );

            if ( is_null( $ordencompra ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Orden Compra no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            $ntacomp = new NotaCompra();
            if ( $ntacomp->existsOrdenCompra( $ntacomp, $request->idordencompra ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que se encuentra registrado en una nota de compra.',
                ] );
            }

            //

            /* fin de restriccion */

            $ordencompradelete = $obj->remove( $obj, $request );

            if ( $ordencompradelete ) {
                $ordcompdet = new OrdenCompraDetalle();
                $arrayOrdenCompraDetalle = $ordcompdet->getOrdenCompraDetalle( $ordcompdet, $request->idordencompra );

                foreach ( $arrayOrdenCompraDetalle as $detalle ) {
                    $ordencompradetalle = $ordcompdet->find($detalle->idordencompradetalle);
                    if ( !is_null( $ordencompradetalle ) ) {
                        $ordencompradetalle->delete();
                    }
                }

                if ( !is_null( $ordencompra->fkidsolicitudcompra ) ) {
                    $solicomp = new SolicitudCompra();
                    $solicitudcompra = $solicomp->find( $ordencompra->fkidsolicitudcompra );
                    if ( !is_null( $solicitudcompra ) ) {
                        $solicitudcompra->isordencompra = "N";
                        $solicitudcompra->update();
                    }
                }

                $tpotrans = new TipoTransaccion();
                $tipotransaccion = $tpotrans->find( $ordencompra->fkidtipotransaccion );
                if ( !is_null( $tipotransaccion ) ) {
                    $tipotransaccion->cantidadcancelada = intval( $tipotransaccion->cantidadcancelada ) + 1;
                    $tipotransaccion->update();
                }

                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Orden Compra eliminado éxitosamente.',
                ] );
            }

            DB::rollBack();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al eliminar, favor de intentar nuevamente.',
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
                'idordencompra' => 'required',
            ];

            $mensajes = [
                'idordencompra.required' => 'El ID Orden Compra es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idordencompra = $request->input('idordencompra');

            $obj = new OrdenCompra();
            $ordencompra = $obj->searchByID( $obj, $idordencompra );

            if ( is_null( $ordencompra ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Orden Compra no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'ordencompra' => $ordencompra,
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

            $obj = new OrdenCompra();

            $ordencompra = $obj->get_data( $obj, $request );

            if ( sizeof( $ordencompra ) == 0 ) {
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
                'arrayOrdenCompra' => $ordencompra,
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
