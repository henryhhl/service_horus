<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Inventario\ProductoGrupoRequest;
use App\Models\Comercio\Inventario\Producto;
use App\Models\Comercio\Inventario\ProductoGrupo;
use App\Models\Comercio\Inventario\ProductoSubGrupo;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ProductoGrupoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index( Request $request)
    {
        try {

            $esPaginado = isset( $request->esPaginado ) ? $request->esPaginado : 1;
            $obj = new ProductoGrupo();

            if ( $esPaginado == 0 ) {

                $productogrupo = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'productogrupo'  => $productogrupo,
                ] );
            }

            $productogrupo = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'productogrupo'  => $productogrupo->getCollection(),
                'pagination' => [
                    'total'        => $productogrupo->total(),
                    'current_page' => $productogrupo->currentPage(),
                    'per_page'     => $productogrupo->perPage(),
                    'last_page'    => $productogrupo->lastPage(),
                    'from'         => $productogrupo->firstItem(),
                    'to'           => $productogrupo->lastItem(),
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

            $obj = new ProductoGrupo();
            $idproductogrupo = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idproductogrupo'  => $idproductogrupo,
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
    public function store( ProductoGrupoRequest $request)
    {
        try {

            $obj = new ProductoGrupo();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Grupo de Producto ya existe.',
                ] );
            }

            $productogrupo = $obj->store( $obj, $request );

            return response( )->json( [
                'response'     => 1,
                'productogrupo' => $productogrupo,
                'message'      => 'Grupo de Producto registrado éxitosamente.',
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
    public function update( ProductoGrupoRequest $request )
    {
        try {

            $regla = [
                'idproductogrupo' => 'required',
            ];

            $mensajes = [
                'idproductogrupo.required' => 'El ID Grupo de Producto es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ProductoGrupo();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Grupo de Producto ya existe.',
                ] );
            }

            $productogrupo = $obj->find( $request->idproductogrupo );

            if ( is_null( $productogrupo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Grupo de Producto no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Grupo de Producto actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Grupo de Producto.',
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
                'idproductogrupo' => 'required',
            ];

            $mensajes = [
                'idproductogrupo.required' => 'El ID Grupo de Producto es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ProductoGrupo();
            $productogrupo = $obj->find( $request->idproductogrupo );

            if ( is_null( $productogrupo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Grupo de Producto no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            $obj_producto = new Producto();

            if ( $obj_producto->tieneProductoGrupo( $obj_producto, $request->idproductogrupo ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene en Producto Agregado.',
                ] );
            }

            $obj_productosubgrupo = new ProductoSubGrupo();

            if ( $obj_productosubgrupo->tieneProductoGrupo( $obj_productosubgrupo, $request->idproductogrupo ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene en Sub Grupo Agregado.',
                ] );
            }

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Grupo de Producto eliminado éxitosamente.',
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
                'idproductogrupo' => 'required',
            ];

            $mensajes = [
                'idproductogrupo.required' => 'El ID Grupo de Producto es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idproductogrupo = $request->input('idproductogrupo');
            
            $obj = new ProductoGrupo();
            $productogrupo = $obj->searchByID( $idproductogrupo );

            if ( is_null( $productogrupo ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Grupo de Producto no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'productogrupo' => $productogrupo,
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

            $obj = new ProductoGrupo();

            $productogrupo = $obj->get_data( $obj, $request );

            if ( sizeof( $productogrupo ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Grupo de Producto insertado.',
                ] );
            }

            $mytime = Carbon::now('America/La_paz');

            $fecha = $mytime->toDateString();
            $hora  = $mytime->toTimeString();

            $fecha = explode( '-', $fecha );
            $fecha = $fecha[2] . '/' . $fecha[1] . '/' . $fecha[0];
            
            return response()->json( [
                'response'           => 1,
                'fecha'              => $fecha,
                'hora'               => $hora,
                'arrayProductoGrupo' => $productogrupo,
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
