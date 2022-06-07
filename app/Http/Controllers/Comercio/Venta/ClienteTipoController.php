<?php

namespace App\Http\Controllers\Comercio\Venta;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Venta\ClienteTipoRequest;
use App\Models\Comercio\Venta\ClienteTipo;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ClienteTipoController extends Controller
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
            $obj = new ClienteTipo();

            if ( $esPaginado == 0 ) {

                $clientetipo = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'clientetipo'  => $clientetipo,
                ] );
            }

            $clientetipo = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'clientetipo'  => $clientetipo->getCollection(),
                'pagination' => [
                    'total'        => $clientetipo->total(),
                    'current_page' => $clientetipo->currentPage(),
                    'per_page'     => $clientetipo->perPage(),
                    'last_page'    => $clientetipo->lastPage(),
                    'from'         => $clientetipo->firstItem(),
                    'to'           => $clientetipo->lastItem(),
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

            $obj = new ClienteTipo();
            $idclientetipo = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idclientetipo'  => $idclientetipo,
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
    public function store( ClienteTipoRequest $request )
    {
        try {

            $obj = new ClienteTipo();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Tipo Cliente ya existe.',
                ] );
            }

            $clientetipo = $obj->store( $obj, $request );

            return response( )->json( [
                'response' => 1,
                'clientetipo' => $clientetipo,
                'message'  => 'Tipo Cliente registrado éxitosamente.',
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
    public function show( Request $request, $idclientetipo )
    {
        try {

            $obj = new ClienteTipo();
            $clientetipo = $obj->show( $obj, $idclientetipo );

            if ( is_null( $clientetipo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Tipo Cliente no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'clientetipo'   => $clientetipo,
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
    public function edit( Request $request, $idclientetipo )
    {
        try {

            $obj = new ClienteTipo();
            $clientetipo = $obj->show( $obj, $idclientetipo );

            if ( is_null( $clientetipo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Tipo Cliente no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'clientetipo'   => $clientetipo,
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
    public function update( ClienteTipoRequest $request )
    {
        try {

            $regla = [
                'idclientetipo' => 'required',
            ];

            $mensajes = [
                'idclientetipo.required' => 'El ID Tipo Cliente es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ClienteTipo();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Tipo Cliente ya existe.',
                ] );
            }

            $clientetipo = $obj->find( $request->idclientetipo );

            if ( is_null( $clientetipo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Tipo Cliente no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Tipo Cliente actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Tipo Cliente.',
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
                'idclientetipo' => 'required',
            ];

            $mensajes = [
                'idclientetipo.required' => 'El ID Tipo Cliente es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ClienteTipo();
            $clientetipo = $obj->find( $request->idclientetipo );

            if ( is_null( $clientetipo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Tipo Cliente no existe.',
                ] );
            }

            if ( $clientetipo->isdelete == "N" ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Acción no permitido.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Tipo Cliente eliminado éxitosamente.',
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
                'idclientetipo' => 'required',
            ];

            $mensajes = [
                'idclientetipo.required' => 'El ID Tipo Cliente es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idclientetipo = $request->input('idclientetipo');
            
            $obj = new ClienteTipo();
            $clientetipo = $obj->searchByID( $obj, $idclientetipo );

            if ( is_null( $clientetipo ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Tipo Cliente no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'clientetipo' => $clientetipo,
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

            $obj = new ClienteTipo();

            $clientetipo = $obj->get_data( $obj, $request );

            if ( sizeof( $clientetipo ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Tipo Cliente insertado.',
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
                'arrayClienteTipo' => $clientetipo,
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
