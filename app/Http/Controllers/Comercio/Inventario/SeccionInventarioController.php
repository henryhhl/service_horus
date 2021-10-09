<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Inventario\SeccionInventarioRequest;
use App\Models\Comercio\Inventario\SeccionInventario;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class SeccionInventarioController extends Controller
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
            $obj = new SeccionInventario();

            if ( $esPaginado == 0 ) {

                $seccioninventario = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'seccioninventario'  => $seccioninventario,
                ] );
            }

            $seccioninventario = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'seccioninventario'  => $seccioninventario->getCollection(),
                'pagination' => [
                    'total'        => $seccioninventario->total(),
                    'current_page' => $seccioninventario->currentPage(),
                    'per_page'     => $seccioninventario->perPage(),
                    'last_page'    => $seccioninventario->lastPage(),
                    'from'         => $seccioninventario->firstItem(),
                    'to'           => $seccioninventario->lastItem(),
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

            $obj = new SeccionInventario();
            $idseccioninventario = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idseccioninventario'  => $idseccioninventario,
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
    public function store( SeccionInventarioRequest $request )
    {
        try {

            $obj = new SeccionInventario();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Sección inventario ya existe.',
                ] );
            }

            $seccioninventario = $obj->store( $obj, $request );

            return response( )->json( [
                'response' => 1,
                'seccioninventario' => $seccioninventario,
                'message'  => 'Sección inventario registrado éxitosamente.',
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
    public function show( Request $request, $idseccioninventario )
    {
        try {

            $obj = new SeccionInventario();
            $seccioninventario = $obj->show( $obj, $idseccioninventario );

            if ( is_null( $seccioninventario ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Sección inventario no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'seccioninventario'   => $seccioninventario,
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
    public function edit( Request $request, $idseccioninventario )
    {
        try {

            $obj = new SeccionInventario();
            $seccioninventario = $obj->show( $obj, $idseccioninventario );

            if ( is_null( $seccioninventario ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Sección inventario no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'seccioninventario'   => $seccioninventario,
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
    public function update( SeccionInventarioRequest $request )
    {
        try {

            $regla = [
                'idseccioninventario' => 'required',
            ];

            $mensajes = [
                'idseccioninventario.required' => 'El ID Sección inventario es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new SeccionInventario();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Sección inventario ya existe.',
                ] );
            }

            $seccioninventario = $obj->find( $request->idseccioninventario );

            if ( is_null( $seccioninventario ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Sección inventario no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Sección inventario actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Sección inventario.',
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
                'idseccioninventario' => 'required',
            ];

            $mensajes = [
                'idseccioninventario.required' => 'El ID Sección inventario es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new SeccionInventario();
            $seccioninventario = $obj->find( $request->idseccioninventario );

            if ( is_null( $seccioninventario ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Sección inventario no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Sección inventario eliminado éxitosamente.',
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
                'idseccioninventario' => 'required',
            ];

            $mensajes = [
                'idseccioninventario.required' => 'El ID Sección inventario es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idseccioninventario = $request->input('idseccioninventario');
            
            $obj = new SeccionInventario();
            $seccioninventario = $obj->searchByID( $obj, $idseccioninventario );

            if ( is_null( $seccioninventario ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Sección inventario no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'seccioninventario' => $seccioninventario,
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

            $obj = new SeccionInventario();

            $seccioninventario = $obj->get_data( $obj, $request );

            if ( sizeof( $seccioninventario ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Sección inventario insertado.',
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
                'arraySeccionInventario' => $seccioninventario,
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
