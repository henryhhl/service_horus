<?php

namespace App\Http\Controllers\Comercio\Venta;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Venta\ActividadEconomicaRequest;
use App\Models\Comercio\Venta\ActividadEconomica;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ActividadEconomicaController extends Controller
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
            $activeco = new ActividadEconomica();

            if ( $esPaginado == 0 ) {

                $actividadEconomica = $activeco->get_data( $activeco, $request );

                return response( )->json( [
                    'response' => 1,
                    'arrayActividadEconomica'  => $actividadEconomica,
                ] );
            }

            $actividadEconomica = $activeco->get_paginate( $activeco, $request );

            return response( )->json( [
                'response' => 1,
                'arrayActividadEconomica'  => $actividadEconomica->getCollection(),
                'pagination' => [
                    'total'        => $actividadEconomica->total(),
                    'current_page' => $actividadEconomica->currentPage(),
                    'per_page'     => $actividadEconomica->perPage(),
                    'last_page'    => $actividadEconomica->lastPage(),
                    'from'         => $actividadEconomica->firstItem(),
                    'to'           => $actividadEconomica->lastItem(),
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

            $activeco = new ActividadEconomica();
            $idactividadeconomica = $activeco->newID();

            return response()->json( [
                'response' => 1,
                'idactividadeconomica'  => $idactividadeconomica,
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
    public function store( ActividadEconomicaRequest $request )
    {
        try {

            $activeco = new ActividadEconomica();

            if ( $activeco->existDescripcion( $activeco, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción ya existe.',
                ] );
            }

            $actividadEconomica = $activeco->store( $activeco, $request );

            return response( )->json( [
                'response' => 1,
                'actividadEconomica' => $actividadEconomica,
                'message'  => 'Actividad Económica registrado éxitosamente.',
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
    public function show( Request $request, $idactividadeconomica )
    {
        try {

            $activeco = new ActividadEconomica();
            $actividadEconomica = $activeco->show( $activeco, $idactividadeconomica );

            if ( is_null( $actividadEconomica ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Actividad Económica no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'actividadEconomica'   => $actividadEconomica,
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
    public function edit( Request $request, $idactividadeconomica )
    {
        try {

            $activeco = new ActividadEconomica();
            $actividadEconomica = $activeco->show( $activeco, $idactividadeconomica );

            if ( is_null( $actividadEconomica ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Actividad Económica no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'actividadEconomica'   => $actividadEconomica,
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
    public function update( ActividadEconomicaRequest $request )
    {
        try {

            $regla = [
                'idactividadeconomica' => 'required',
            ];

            $mensajes = [
                'idactividadeconomica.required' => 'El ID Actividad Económica es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $activeco = new ActividadEconomica();

            if ( $activeco->existDescripcion( $activeco, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Actividad Económica ya existe.',
                ] );
            }

            $actividadEconomica = $activeco->find( $request->idactividadeconomica );

            if ( is_null( $actividadEconomica ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Actividad Económica no existe.',
                ] );
            }

            $result = $activeco->upgrade( $activeco, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Actividad Económica actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Actividad Económica.',
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
                'idactividadeconomica' => 'required',
            ];

            $mensajes = [
                'idactividadeconomica.required' => 'El ID Actividad Económica es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $activeco = new ActividadEconomica();
            $actividadEconomica = $activeco->find( $request->idactividadeconomica );

            if ( is_null( $actividadEconomica ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Actividad Económica no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            /* fin de restriccion */

            $actividadEconomicaDelete = $activeco->delete();

            if ( $actividadEconomicaDelete ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Actividad Económica eliminado éxitosamente.',
                    'actividadEconomicaDelete' => $actividadEconomicaDelete,
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al eliminar, favor de intentar nuevamente.',
                'actividadEconomicaDelete' => $actividadEconomicaDelete,
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
                'idactividadeconomica' => 'required',
            ];

            $mensajes = [
                'idactividadeconomica.required' => 'El ID Actividad Económica es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idactividadeconomica = $request->input('idactividadeconomica');

            $activeco = new ActividadEconomica();
            $actividadEconomica = $activeco->searchByID( $activeco, $idactividadeconomica );

            if ( is_null( $actividadEconomica ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Actividad Económica no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'actividadEconomica' => $actividadEconomica,
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

            $activeco = new ActividadEconomica();

            $actividadEconomica = $activeco->get_data( $activeco, $request );

            if ( sizeof( $actividadEconomica ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Actividad Económica insertado.',
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
                'arrayActividadEconomica' => $actividadEconomica,
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
