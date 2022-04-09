<?php

namespace App\Http\Controllers\Comercio\Venta;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Venta\DosificacionRequest;
use App\Models\Comercio\Venta\Dosificacion;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class DosificacionController extends Controller
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
            $dosifcion = new Dosificacion();

            if ( $esPaginado == 0 ) {

                $dosificacion = $dosifcion->get_data( $dosifcion, $request );

                return response( )->json( [
                    'response' => 1,
                    'arrayDosificacion'  => $dosificacion,
                ] );
            }

            $dosificacion = $dosifcion->get_paginate( $dosifcion, $request );

            return response( )->json( [
                'response' => 1,
                'arrayDosificacion'  => $dosificacion->getCollection(),
                'pagination' => [
                    'total'        => $dosificacion->total(),
                    'current_page' => $dosificacion->currentPage(),
                    'per_page'     => $dosificacion->perPage(),
                    'last_page'    => $dosificacion->lastPage(),
                    'from'         => $dosificacion->firstItem(),
                    'to'           => $dosificacion->lastItem(),
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

            $dosifcion = new Dosificacion();
            $iddosificacion = $dosifcion->newID();

            return response()->json( [
                'response' => 1,
                'iddosificacion'  => $iddosificacion,
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
    public function store( DosificacionRequest $request )
    {
        try {

            $dosifcion = new Dosificacion();

            if ( $dosifcion->existDescripcion( $dosifcion, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción ya existe.',
                ] );
            }

            $dosificacion = $dosifcion->store( $dosifcion, $request );

            if ( $dosificacion ) {
                return response( )->json( [
                    'response' => 1,
                    'dosificacion' => $dosificacion,
                    'message'  => 'Dosificación registrado éxitosamente.',
                ] );
            }

            return response( )->json( [
                'response' => -1,
                'dosificacion' => $dosificacion,
                'message'  => 'Dosificación no registrado, intentar nuevamente.',
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
    public function show( Request $request, $iddosificacion )
    {
        try {

            $dosifcion = new Dosificacion();
            $dosificacion = $dosifcion->show( $dosifcion, $iddosificacion );

            if ( is_null( $dosificacion ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Dosificación no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'dosificacion'   => $dosificacion,
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
    public function edit( Request $request, $iddosificacion )
    {
        try {

            $dosifcion = new Dosificacion();
            $dosificacion = $dosifcion->show( $dosifcion, $iddosificacion );

            if ( is_null( $dosificacion ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Dosificación no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'dosificacion'   => $dosificacion,
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
    public function update( DosificacionRequest $request )
    {
        try {

            $regla = [
                'iddosificacion' => 'required',
            ];

            $mensajes = [
                'iddosificacion.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $dosifcion = new Dosificacion();

            if ( $dosifcion->existDescripcion( $dosifcion, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Dosificación ya existe.',
                ] );
            }

            $dosificacion = $dosifcion->find( $request->iddosificacion );

            if ( is_null( $dosificacion ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Dosificación no existe.',
                ] );
            }

            $result = $dosifcion->upgrade( $dosifcion, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Dosificación actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Dosificación.',
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
                'iddosificacion' => 'required',
            ];

            $mensajes = [
                'iddosificacion.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $activeco = new Dosificacion();
            $dosificacion = $activeco->find( $request->iddosificacion );

            if ( is_null( $dosificacion ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Dosificación no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            /* fin de restriccion */

            $dosificacionDelete = $activeco->delete();

            if ( $dosificacionDelete ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Dosificación eliminado éxitosamente.',
                    'dosificacionDelete' => $dosificacionDelete,
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al eliminar, favor de intentar nuevamente.',
                'dosificacionDelete' => $dosificacionDelete,
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
                'iddosificacion' => 'required',
            ];

            $mensajes = [
                'iddosificacion.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $iddosificacion = $request->input('iddosificacion');

            $activeco = new Dosificacion();
            $dosificacion = $activeco->searchByID( $activeco, $iddosificacion );

            if ( is_null( $dosificacion ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Dosificación no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'dosificacion' => $dosificacion,
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

            $activeco = new Dosificacion();

            $dosificacion = $activeco->get_data( $activeco, $request );

            if ( sizeof( $dosificacion ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Dosificación insertado.',
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
                'arrayDosificacion' => $dosificacion,
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
