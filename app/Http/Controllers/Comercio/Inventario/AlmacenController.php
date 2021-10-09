<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Inventario\AlmacenRequest;
use App\Models\Comercio\Inventario\Almacen;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class AlmacenController extends Controller
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
            $obj = new Almacen();

            if ( $esPaginado == 0 ) {

                $almacen = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'almacen'  => $almacen,
                ] );
            }

            $almacen = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'almacen'  => $almacen->getCollection(),
                'pagination' => [
                    'total'        => $almacen->total(),
                    'current_page' => $almacen->currentPage(),
                    'per_page'     => $almacen->perPage(),
                    'last_page'    => $almacen->lastPage(),
                    'from'         => $almacen->firstItem(),
                    'to'           => $almacen->lastItem(),
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

            $obj = new Almacen();
            $idalmacen = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idalmacen'  => $idalmacen,
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
    public function store(AlmacenRequest $request)
    {
        try {

            $obj = new Almacen();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Álmacen ya existe.',
                ] );
            }

            $almacen = $obj->store( $obj, $request );

            return response( )->json( [
                'response' => 1,
                'almacen' => $almacen,
                'message'  => 'Álmacen registrado éxitosamente.',
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
    public function show( Request $request, $idalmacen )
    {
        try {


            $obj = new Almacen();
            $almacen = $obj->show( $obj, $idalmacen );

            if ( is_null( $almacen ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Álmacen no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'almacen'   => $almacen,
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
    public function edit( Request $request, $idalmacen)
    {
        try {


            $obj = new Almacen();
            $almacen = $obj->show( $obj, $idalmacen );

            if ( is_null( $almacen ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Álmacen no existente, favor revisar.',
                ] );
            }


            return response()->json( [
                'response' => 1,
                'almacen'   => $almacen,
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
    public function update( AlmacenRequest $request )
    {
        try {

            $regla = [
                'idalmacen' => 'required',
            ];

            $mensajes = [
                'idalmacen.required' => 'El ID Álmacen es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new Almacen();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Álmacen ya existe.',
                ] );
            }

            $almacen = $obj->find( $request->idalmacen );

            if ( is_null( $almacen ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Álmacen no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Álmacen actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Álmacen.',
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
                'idalmacen' => 'required',
            ];

            $mensajes = [
                'idalmacen.required' => 'El ID Álmacen es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new Almacen();
            $almacen = $obj->find( $request->idalmacen );

            if ( is_null( $almacen ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Álmacen no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            //

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Álmacen eliminado éxitosamente.',
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
                'idalmacen' => 'required',
            ];

            $mensajes = [
                'idalmacen.required' => 'El ID Álmacen es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idalmacen = $request->input('idalmacen');
            
            $obj = new Almacen();
            $almacen = $obj->searchByID( $obj, $idalmacen );

            if ( is_null( $almacen ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Álmacen no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'almacen' => $almacen,
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

            $obj = new Almacen();

            $almacen = $obj->get_data( $obj, $request );

            if ( sizeof( $almacen ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Álmacen insertado.',
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
                'arrayAlmacen' => $almacen,
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
