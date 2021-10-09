<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Inventario\UnidadMedidaRequest;
use App\Models\Comercio\Inventario\UnidadMedida;
use App\Models\Comercio\Inventario\UnidadMedidaProducto;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class UnidadMedidaController extends Controller
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
            $obj = new UnidadMedida();

            if ( $esPaginado == 0 ) {

                $unidadmedida = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'unidadmedida'  => $unidadmedida,
                ] );
            }

            $unidadmedida = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'unidadmedida'  => $unidadmedida->getCollection(),
                'pagination' => [
                    'total'        => $unidadmedida->total(),
                    'current_page' => $unidadmedida->currentPage(),
                    'per_page'     => $unidadmedida->perPage(),
                    'last_page'    => $unidadmedida->lastPage(),
                    'from'         => $unidadmedida->firstItem(),
                    'to'           => $unidadmedida->lastItem(),
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

            $obj = new UnidadMedida();
            $idunidadmedida = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idunidadmedida'  => $idunidadmedida,
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
    public function store( UnidadMedidaRequest $request )
    {
        try {

            $obj = new UnidadMedida();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Unidad Medida ya existe.',
                ] );
            }

            $unidadmedida = $obj->store( $obj, $request );

            return response( )->json( [
                'response'     => 1,
                'unidadmedida' => $unidadmedida,
                'message'      => 'Unidad Medida registrado éxitosamente.',
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
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update( UnidadMedidaRequest $request )
    {
        try {

            $regla = [
                'idunidadmedida' => 'required',
            ];

            $mensajes = [
                'idunidadmedida.required' => 'El ID Unidad Medida es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new UnidadMedida();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Unidad Medida ya existe.',
                ] );
            }

            $unidadmedida = $obj->find( $request->idunidadmedida );

            if ( is_null( $unidadmedida ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Unidad Medida no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Unidad Medida actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Unidad Medida.',
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
                'idunidadmedida' => 'required',
            ];

            $mensajes = [
                'idunidadmedida.required' => 'El ID Unidad Medida es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new UnidadMedida();
            $unidadmedida = $obj->find( $request->idunidadmedida );

            if ( is_null( $unidadmedida ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Unidad Medida no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */
            
            $obj_unidadmedidaproducto = new UnidadMedidaProducto();

            if ( $obj_unidadmedidaproducto->tieneUnidadMedida( $obj_unidadmedidaproducto, $request->idunidadmedida ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene en Producto Agregado.',
                ] );
            }

            //

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Unidad Medida eliminado éxitosamente.',
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
                'idunidadmedida' => 'required',
            ];

            $mensajes = [
                'idunidadmedida.required' => 'El ID Unidad Medida es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idunidadmedida = $request->input('idunidadmedida');
            
            $obj = new UnidadMedida();
            $unidadmedida = $obj->searchByID( $idunidadmedida );

            if ( is_null( $unidadmedida ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Unidad Medida no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'unidadmedida' => $unidadmedida,
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

            $obj = new UnidadMedida();

            $unidadmedida = $obj->get_data( $obj, $request );

            if ( sizeof( $unidadmedida ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Unidad Medida insertado.',
                ] );
            }

            $mytime = Carbon::now('America/La_paz');

            $fecha = $mytime->toDateString();
            $hora  = $mytime->toTimeString();

            $fecha = explode( '-', $fecha );
            $fecha = $fecha[2] . '/' . $fecha[1] . '/' . $fecha[0];
            
            return response()->json( [
                'response'          => 1,
                'fecha'             => $fecha,
                'hora'              => $hora,
                'arrayUnidadMedida' => $unidadmedida,
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
