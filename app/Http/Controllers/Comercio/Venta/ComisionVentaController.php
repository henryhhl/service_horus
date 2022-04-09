<?php

namespace App\Http\Controllers\Comercio\Venta;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Venta\ComisionVentaRequest;
use App\Models\Comercio\Venta\ComisionVenta;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ComisionVentaController extends Controller
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
            $comivta = new ComisionVenta();

            if ( $esPaginado == 0 ) {

                $comisionventa = $comivta->get_data( $comivta, $request );

                return response( )->json( [
                    'response' => 1,
                    'arrayComisionVenta'  => $comisionventa,
                ] );
            }

            $comisionventa = $comivta->get_paginate( $comivta, $request );

            return response( )->json( [
                'response' => 1,
                'arrayComisionVenta'  => $comisionventa->getCollection(),
                'pagination' => [
                    'total'        => $comisionventa->total(),
                    'current_page' => $comisionventa->currentPage(),
                    'per_page'     => $comisionventa->perPage(),
                    'last_page'    => $comisionventa->lastPage(),
                    'from'         => $comisionventa->firstItem(),
                    'to'           => $comisionventa->lastItem(),
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

            $comivta = new ComisionVenta();
            $idcomisionventa = $comivta->newID();

            return response()->json( [
                'response' => 1,
                'idcomisionventa'  => $idcomisionventa,
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
    public function store( ComisionVentaRequest $request )
    {
        try {

            $comivta = new ComisionVenta();
            $comisionventa = $comivta->store( $comivta, $request );

            return response( )->json( [
                'response' => 1,
                'comisionventa' => $comisionventa,
                'message'  => 'Comisión venta registrado éxitosamente.',
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
    public function show( Request $request, $idcomisionventa )
    {
        try {

            $comivta = new ComisionVenta();
            $comisionventa = $comivta->show( $comivta, $idcomisionventa );

            if ( is_null( $comisionventa ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Comisión venta no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'comisionventa'   => $comisionventa,
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
    public function edit( Request $request, $idcomisionventa )
    {
        try {

            $comivta = new ComisionVenta();
            $comisionventa = $comivta->show( $comivta, $idcomisionventa );

            if ( is_null( $comisionventa ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Comisión venta no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'comisionventa'   => $comisionventa,
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
    public function update( ComisionVentaRequest $request )
    {
        try {

            $regla = [
                'idcomisionventa' => 'required',
            ];

            $mensajes = [
                'idcomisionventa.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $comivta = new ComisionVenta();

            $comisionventa = $comivta->find( $request->idcomisionventa );
            if ( is_null( $comisionventa ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Comisión venta no existe.',
                ] );
            }

            $comisionventaupdate = $comivta->upgrade( $comivta, $request );

            if ( $comisionventaupdate ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Comisión venta actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Comisión venta.',
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
                'idcomisionventa' => 'required',
            ];

            $mensajes = [
                'idcomisionventa.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $comivta = new ComisionVenta();
            $comisionventa = $comivta->find( $request->idcomisionventa );

            if ( is_null( $comisionventa ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Comisión venta no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            /* fin de restriccion */

            $comisionventadelete = $comisionventa->delete();

            if ( $comisionventadelete ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Comisión venta eliminado éxitosamente.',
                    'comisionventadelete' => $comisionventadelete,
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al eliminar, favor de intentar nuevamente.',
                'comisionventadelete' => $comisionventadelete,
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
                'idcomisionventa' => 'required',
            ];

            $mensajes = [
                'idcomisionventa.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idcomisionventa = $request->input('idcomisionventa');

            $comivta = new ComisionVenta();
            $comisionventa = $comivta->searchByID( $comivta, $idcomisionventa );

            if ( is_null( $comisionventa ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Comisión venta no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'comisionventa' => $comisionventa,
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

            $comivta = new ComisionVenta();

            $comisionventa = $comivta->get_data( $comivta, $request );

            if ( sizeof( $comisionventa ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Comisión venta insertado.',
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
                'arrayComisionVenta' => $comisionventa,
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
