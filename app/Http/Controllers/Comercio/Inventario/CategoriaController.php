<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Inventario\CategoriaRequest;
use App\Models\Comercio\Inventario\Categoria;
use App\Models\Comercio\Inventario\Producto;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class CategoriaController extends Controller
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
            $obj = new Categoria();

            if ( $esPaginado == 0 ) {

                $categoria = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'categoria'  => $categoria,
                ] );
            }

            $categoria = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'categoria'  => $categoria->getCollection(),
                'pagination' => [
                    'total'        => $categoria->total(),
                    'current_page' => $categoria->currentPage(),
                    'per_page'     => $categoria->perPage(),
                    'last_page'    => $categoria->lastPage(),
                    'from'         => $categoria->firstItem(),
                    'to'           => $categoria->lastItem(),
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

            $obj = new Categoria();
            $idcategoria = $obj->newID();

            $request->orderBy = "ASC";
            $categoria = $obj->get_data( $obj, $request );

            return response()->json( [
                'response'    => 1,
                'idcategoria' => $idcategoria,
                'categoria'   => $categoria,
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
    public function store( CategoriaRequest $request )
    {
        try {

            $obj = new Categoria();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Categoría ya existe.',
                ] );
            }

            $categoria = $obj->store( $obj, $request );

            return response( )->json( [
                'response'  => 1,
                'categoria' => $categoria,
                'message'   => 'Categoría registrado éxitosamente.',
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
    public function update( CategoriaRequest $request )
    {
        try {

            $regla = [
                'idcategoria' => 'required',
            ];

            $mensajes = [
                'idcategoria.required' => 'El ID Categoría es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new Categoria();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Categoría ya existe.',
                ] );
            }

            $categoria = $obj->find( $request->idcategoria );

            if ( is_null( $categoria ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Caategoría no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Caategoría actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Caategoría.',
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
                'idcategoria' => 'required',
            ];

            $mensajes = [
                'idcategoria.required' => 'El ID Categoría es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new Categoria();
            $categoria = $obj->find( $request->idcategoria );

            if ( is_null( $categoria ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Categoría no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            $obj_producto = new Producto();

            if ( $obj_producto->tieneCategoria( $obj_producto, $request->idcategoria ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene en Producto Agregado.',
                ] );
            }

            if ( $categoria->isdelete == "N" ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Acción no permitido.',
                ] );
            }

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Categoría eliminado éxitosamente.',
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
                'idcategoria' => 'required',
            ];

            $mensajes = [
                'idcategoria.required' => 'El ID Categoría es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idcategoria = $request->input('idcategoria');
            
            $obj = new Categoria();
            $categoria = $obj->searchByID( $idcategoria );

            if ( is_null( $categoria ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Categoría no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'categoria' => $categoria,
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

            $obj = new Categoria();

            $categoria = $obj->get_data( $obj, $request );

            if ( sizeof( $categoria ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Categoría insertado.',
                ] );
            }

            $mytime = Carbon::now('America/La_paz');

            $fecha = $mytime->toDateString();
            $hora  = $mytime->toTimeString();

            $fecha = explode( '-', $fecha );
            $fecha = $fecha[2] . '/' . $fecha[1] . '/' . $fecha[0];
            
            return response()->json( [
                'response'       => 1,
                'fecha'          => $fecha,
                'hora'           => $hora,
                'arrayCategoria' => $categoria,
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
