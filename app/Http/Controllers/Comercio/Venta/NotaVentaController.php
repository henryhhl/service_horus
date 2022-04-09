<?php

namespace App\Http\Controllers\Comercio\Venta;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Venta\NotaVentaRequest;
use App\Models\Comercio\Venta\NotaVenta;
use Carbon\Carbon;
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

            return response()->json( [
                'response' => 1,
                'idnotaventa'  => $idnotaventa,
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

            $ntavta = new NotaVenta();
            $notaventa = $ntavta->store( $ntavta, $request );

            if ( $notaventa ) {
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
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Nota Venta actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Nota Venta.',
            ] );

        } catch ( \Exception $th ) {

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

            $notaVentaDelete = $ntavta->delete();

            if ( $notaVentaDelete ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Nota Venta eliminado éxitosamente.',
                    'notaVentaDelete' => $notaVentaDelete,
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al eliminar, favor de intentar nuevamente.',
                'notaVentaDelete' => $notaVentaDelete,
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
