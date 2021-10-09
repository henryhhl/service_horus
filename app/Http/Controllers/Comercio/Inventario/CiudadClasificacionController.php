<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Inventario\CiudadClasificacionRequest;
use App\Models\Comercio\Inventario\Ciudad;
use App\Models\Comercio\Inventario\CiudadClasificacion;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class CiudadClasificacionController extends Controller
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
            $obj = new CiudadClasificacion();

            if ( $esPaginado == 0 ) {

                $ciudadclasificacion = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'ciudadclasificacion'  => $ciudadclasificacion,
                ] );
            }

            $ciudadclasificacion = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'ciudadclasificacion'  => $ciudadclasificacion->getCollection(),
                'pagination' => [
                    'total'        => $ciudadclasificacion->total(),
                    'current_page' => $ciudadclasificacion->currentPage(),
                    'per_page'     => $ciudadclasificacion->perPage(),
                    'last_page'    => $ciudadclasificacion->lastPage(),
                    'from'         => $ciudadclasificacion->firstItem(),
                    'to'           => $ciudadclasificacion->lastItem(),
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

            $obj = new CiudadClasificacion();
            $idciudadclasificacion = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idciudadclasificacion'  => $idciudadclasificacion,
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
    public function store( CiudadClasificacionRequest $request )
    {
        try {

            $obj = new CiudadClasificacion();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de la ciudad clasificación ya existe.',
                ] );
            }

            $ciudadclasificacion = $obj->store( $obj, $request );

            return response( )->json( [
                'response'            => 1,
                'ciudadclasificacion' => $ciudadclasificacion,
                'message'             => 'Ciudad Clasificación registrado éxitosamente.',
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
    public function update( Request $request )
    {
        try {

            $regla = [
                'descripcion' => 'required|max:200|min:3',
                'idciudadclasificacion' => 'required',
            ];

            $mensajes = [
                'descripcion.required' => 'Campo descripcion es obligatorio.',
                'descripcion.max' => 'Campo descripcion permite máximo de 200 caracteres.',
                'descripcion.min' => 'Campo descripcion permite minimo de 3 caracteres.',
                'idciudadclasificacion.required' => 'El ID Ciudad Clasificación es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new CiudadClasificacion();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de la ciudad clasificación ya existe.',
                ] );
            }

            $ciudadclasificacion = $obj->find( $request->idciudadclasificacion );

            if ( is_null( $ciudadclasificacion ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Ciudad Clasificación no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Ciudad Clasificación actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Ciudad Clasificación.',
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
                'idciudadclasificacion' => 'required',
            ];

            $mensajes = [
                'idciudadclasificacion.required' => 'El ID Ciudad Clasificación es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new CiudadClasificacion();
            $ciudadclasificacion = $obj->find( $request->idciudadclasificacion );

            if ( is_null( $ciudadclasificacion ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Ciudad Clasificación no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            $obj_ciudad = new Ciudad(); 

            if ( $obj_ciudad->tieneCiudadClasificacion( $obj_ciudad, $request->idciudadclasificacion ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene en Ciudad Agregado.',
                ] );
            }

            //

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Ciudad Clasificación eliminado éxitosamente.',
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
                'idciudadclasificacion' => 'required',
            ];

            $mensajes = [
                'idciudadclasificacion.required' => 'El ID Ciudad Clasificación es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idciudadclasificacion = $request->input('idciudadclasificacion');
            
            $obj = new CiudadClasificacion();
            $ciudadclasificacion = $obj->searchByID( $idciudadclasificacion );

            if ( is_null( $ciudadclasificacion ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Ciudad Clasificación no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'ciudadclasificacion' => $ciudadclasificacion,
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

            $obj = new CiudadClasificacion();

            $ciudadclasificacion = $obj->get_data( $obj, $request );

            if ( sizeof( $ciudadclasificacion ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Ciudad Clasificación insertado.',
                ] );
            }

            $mytime = Carbon::now('America/La_paz');

            $fecha = $mytime->toDateString();
            $hora  = $mytime->toTimeString();

            $fecha = explode( '-', $fecha );
            $fecha = $fecha[2] . '/' . $fecha[1] . '/' . $fecha[0];
            
            return response()->json( [
                'response'                 => 1,
                'fecha'                    => $fecha,
                'hora'                     => $hora,
                'arrayCiudadClasificacion' => $ciudadclasificacion,
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
