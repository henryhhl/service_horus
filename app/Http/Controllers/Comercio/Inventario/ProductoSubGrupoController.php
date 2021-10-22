<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Inventario\ProductoSubGrupoRequest;
use App\Models\Comercio\Inventario\Producto;
use App\Models\Comercio\Inventario\ProductoSubGrupo;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ProductoSubGrupoController extends Controller
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
            $obj = new ProductoSubGrupo();

            if ( $esPaginado == 0 ) {

                $productosubgrupo = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'productosubgrupo'  => $productosubgrupo,
                ] );
            }

            $productosubgrupo = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'productosubgrupo'  => $productosubgrupo->getCollection(),
                'pagination' => [
                    'total'        => $productosubgrupo->total(),
                    'current_page' => $productosubgrupo->currentPage(),
                    'per_page'     => $productosubgrupo->perPage(),
                    'last_page'    => $productosubgrupo->lastPage(),
                    'from'         => $productosubgrupo->firstItem(),
                    'to'           => $productosubgrupo->lastItem(),
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

            $obj = new ProductoSubGrupo();
            $idproductosubgrupo = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idproductosubgrupo'  => $idproductosubgrupo,
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
    public function store(ProductoSubGrupoRequest $request)
    {
        try {

            $obj = new ProductoSubGrupo();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Sub Grupo de Producto ya existe.',
                ] );
            }

            $productogrupo = $obj->store( $obj, $request );

            return response( )->json( [
                'response'     => 1,
                'productogrupo' => $productogrupo,
                'message'      => 'Sub Grupo de Producto registrado éxitosamente.',
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
    public function update( ProductoSubGrupoRequest $request )
    {
        try {

            $regla = [
                'idproductosubgrupo' => 'required',
            ];

            $mensajes = [
                'idproductosubgrupo.required' => 'El ID Sub Grupo de Producto es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ProductoSubGrupo();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Sub Grupo de Producto ya existe.',
                ] );
            }

            $productosubgrupo = $obj->find( $request->idproductosubgrupo );

            if ( is_null( $productosubgrupo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Sub Grupo de Producto no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Sub Grupo de Producto actualizado éxitosamente.',
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
                'idproductosubgrupo' => 'required',
            ];

            $mensajes = [
                'idproductosubgrupo.required' => 'El ID Sub Grupo de Producto es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ProductoSubGrupo();
            $productosubgrupo = $obj->find( $request->idproductosubgrupo );

            if ( is_null( $productosubgrupo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Sub Grupo de Producto no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            $obj_producto = new Producto();

            if ( $obj_producto->tieneProductoSubGrupo( $obj_producto, $request->idproductosubgrupo ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene en Producto Agregado.',
                ] );
            }

            if ( $productosubgrupo->isdelete == "N" ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Acción no permitido.',
                ] );
            }

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Sub Grupo de Producto eliminado éxitosamente.',
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
                'idproductosubgrupo' => 'required',
            ];

            $mensajes = [
                'idproductosubgrupo.required' => 'El ID Sub Grupo de Producto es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idproductosubgrupo = $request->input('idproductosubgrupo');
            
            $obj = new ProductoSubGrupo();
            $productosubgrupo = $obj->searchByID( $idproductosubgrupo );

            if ( is_null( $productosubgrupo ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Sub Grupo de Producto no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'productosubgrupo' => $productosubgrupo,
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

            $obj = new ProductoSubGrupo();

            $productosubgrupo = $obj->get_data( $obj, $request );

            if ( sizeof( $productosubgrupo ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Sub Grupo de Producto insertado.',
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
                'arrayProductoSubGrupo' => $productosubgrupo,
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
