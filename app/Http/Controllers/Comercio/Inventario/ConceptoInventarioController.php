<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Inventario\ConceptoInventarioRequest;
use App\Models\Comercio\Inventario\ConceptoInventario;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ConceptoInventarioController extends Controller
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
            $obj = new ConceptoInventario();

            if ( $esPaginado == 0 ) {

                $conceptoinventario = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'conceptoinventario'  => $conceptoinventario,
                ] );
            }

            $conceptoinventario = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'conceptoinventario'  => $conceptoinventario->getCollection(),
                'pagination' => [
                    'total'        => $conceptoinventario->total(),
                    'current_page' => $conceptoinventario->currentPage(),
                    'per_page'     => $conceptoinventario->perPage(),
                    'last_page'    => $conceptoinventario->lastPage(),
                    'from'         => $conceptoinventario->firstItem(),
                    'to'           => $conceptoinventario->lastItem(),
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

            $obj = new ConceptoInventario();
            $idconceptoinventario = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idconceptoinventario'  => $idconceptoinventario,
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
    public function store(ConceptoInventarioRequest $request)
    {
        try {

            $obj = new ConceptoInventario();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Concepto Inventario ya existe.',
                ] );
            }

            $conceptoinventario = $obj->store( $obj, $request );

            return response( )->json( [
                'response' => 1,
                'conceptoinventario' => $conceptoinventario,
                'message'  => 'Concepto Inventario registrado éxitosamente.',
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
    public function show( Request $request, $idconceptoinventario )
    {
        try {

            $obj = new ConceptoInventario();
            $conceptoinventario = $obj->show( $obj, $idconceptoinventario );

            if ( is_null( $conceptoinventario ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Concepto Inventario no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'conceptoinventario'   => $conceptoinventario,
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
    public function edit( Request $request, $idconceptoinventario )
    {
        try {


            $obj = new ConceptoInventario();
            $conceptoinventario = $obj->show( $obj, $idconceptoinventario );

            if ( is_null( $conceptoinventario ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Concepto Inventario no existente, favor revisar.',
                ] );
            }


            return response()->json( [
                'response' => 1,
                'conceptoinventario'   => $conceptoinventario,
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
    public function update(ConceptoInventarioRequest $request)
    {
        try {

            $regla = [
                'idconceptoinventario' => 'required',
            ];

            $mensajes = [
                'idconceptoinventario.required' => 'El ID Concepto Inventario es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ConceptoInventario();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Concepto Inventario ya existe.',
                ] );
            }

            $conceptoinventario = $obj->find( $request->idconceptoinventario );

            if ( is_null( $conceptoinventario ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Concepto Inventario no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Concepto Inventario actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Concepto Inventario.',
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
                'idconceptoinventario' => 'required',
            ];

            $mensajes = [
                'idconceptoinventario.required' => 'El ID Concepto Inventario es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ConceptoInventario();
            $conceptoinventario = $obj->find( $request->idconceptoinventario );

            if ( is_null( $conceptoinventario ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Concepto Inventario no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            //

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Concepto Inventario eliminado éxitosamente.',
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
                'idconceptoinventario' => 'required',
            ];

            $mensajes = [
                'idconceptoinventario.required' => 'El ID Concepto Inventario es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idconceptoinventario = $request->input('idconceptoinventario');
            
            $obj = new ConceptoInventario();
            $conceptoinventario = $obj->searchByID( $obj, $idconceptoinventario );

            if ( is_null( $conceptoinventario ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Concepto Inventario no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'conceptoinventario' => $conceptoinventario,
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

            $obj = new ConceptoInventario();

            $conceptoinventario = $obj->get_data( $obj, $request );

            if ( sizeof( $conceptoinventario ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Concepto Inventario insertado.',
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
                'arrayConceptoInventario' => $conceptoinventario,
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
