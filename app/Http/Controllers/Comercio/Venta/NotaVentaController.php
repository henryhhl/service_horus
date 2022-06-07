<?php

namespace App\Http\Controllers\Comercio\Venta;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Venta\NotaVentaRequest;
use App\Models\Comercio\Venta\ConceptoVenta;
use App\Models\Comercio\Venta\ListaPrecio;
use App\Models\Comercio\Venta\NotaVenta;
use App\Models\Comercio\Venta\NotaVentaDetalle;
use App\Models\Comercio\Venta\Sucursal;
use App\Models\Comercio\Venta\TipoPago;
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

                $arraynotaventadetalle = json_decode( $request->input( 'arraynotaventadetalle', '[]' ) );

                foreach ( $arraynotaventadetalle as $detalle ) {
                    if ( !is_null( $detalle->fkidalmacenproductodetalle ) ) {
                        $ntavtadet = new NotaVentaDetalle();
                        $detalle->fkidnotaventa = $notaventa->idnotaventa;
                        $detalle->fkidvendedor = $notaventa->fkidvendedor;
                        $ntavtadet->store( $ntavtadet, $request, $detalle );
                    }
                }

                DB::commit();
                return response( )->json( [
                    'response' => 1,
                    'notaventa' => $notaventa,
                    'message'  => 'Nota Venta registrado éxitosamente.',
                ] );
            }

            DB::rollBack();
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

            $result = $ntavta->upgrade( $ntavta, $request );

            if ( $result ) {

                $arraynotaventadetalle = json_decode( isset( $request->arraynotaventadetalle ) ? $request->arraynotaventadetalle : '[]' );
                foreach ( $arraynotaventadetalle as $detalle ) {
                    if ( !is_null( $detalle->fkidalmacenproductodetalle ) ) {
                        $ntavtadet = new NotaVentaDetalle();
                        if ( is_null( $detalle->idnotaventadetalle ) ) {
                            $detalle->fkidnotaventa = $notaventa->idnotaventa;
                            $detalle->fkidvendedor = $notaventa->fkidvendedor;
                            $ntavtadet->store( $ntavtadet, $request, $detalle );
                        } else {
                            $notaventadetalle = $ntavtadet->upgrade( $ntavtadet, $detalle );
                        }
                    }
                }

                $arraynotaventadetalledelete = json_decode( isset( $request->arraynotaventadetalledelete ) ? $request->arraynotaventadetalledelete : '[]' );
                foreach ( $arraynotaventadetalledelete as $idnotaventadetalle ) {
                    $ntavtadet = new NotaVentaDetalle();
                    $notaventadetalle = $ntavtadet->find( $idnotaventadetalle );
                    if ( !is_null( $notaventadetalle ) ) {
                        $notaventadetalle->delete();
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

            /* fin de restriccion */

            $ntavtadet = new NotaVentaDetalle();
            $arraynotaventadetalle = $ntavtadet->getNotaVentaDetalle( $ntavtadet, $request->idnotaventa );

            foreach ( $arraynotaventadetalle as $detalle ) {
                $notaventadetalle = $ntavtadet->find( $detalle->idnotaventadetalle );
                if ( !is_null( $notaventadetalle ) ) {
                    $notaventadetalle->delete();
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
