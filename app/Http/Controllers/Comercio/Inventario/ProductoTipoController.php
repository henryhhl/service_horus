<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Inventario\ProductoTipoRequest;
use App\Models\Comercio\Inventario\Producto;
use App\Models\Comercio\Inventario\ProductoTipo;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ProductoTipoController extends Controller
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
            $obj = new ProductoTipo();

            if ( $esPaginado == 0 ) {

                $productotipo = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'productotipo'  => $productotipo,
                ] );
            }

            $productotipo = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'productotipo'  => $productotipo->getCollection(),
                'pagination' => [
                    'total'        => $productotipo->total(),
                    'current_page' => $productotipo->currentPage(),
                    'per_page'     => $productotipo->perPage(),
                    'last_page'    => $productotipo->lastPage(),
                    'from'         => $productotipo->firstItem(),
                    'to'           => $productotipo->lastItem(),
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

            $obj = new ProductoTipo();
            $idproductotipo = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idproductotipo'  => $idproductotipo,
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
    public function store( ProductoTipoRequest $request )
    {
        try {

            $obj = new ProductoTipo();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Tipo de Producto ya existe.',
                ] );
            }

            $productotipo = $obj->store( $obj, $request );

            return response( )->json( [
                'response'     => 1,
                'productotipo' => $productotipo,
                'message'      => 'Tipo de Producto registrado éxitosamente.',
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
    public function update( ProductoTipoRequest $request )
    {
        try {

            $regla = [
                'idproductotipo' => 'required',
            ];

            $mensajes = [
                'idproductotipo.required' => 'El ID Tipo de Producto es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ProductoTipo();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Tipo de Producto ya existe.',
                ] );
            }

            $productotipo = $obj->find( $request->idproductotipo );

            if ( is_null( $productotipo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Tipo de Producto no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Tipo de Producto actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Tipo de Producto.',
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
                'idproductotipo' => 'required',
            ];

            $mensajes = [
                'idproductotipo.required' => 'El ID Tipo de Producto es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ProductoTipo();
            $productotipo = $obj->find( $request->idproductotipo );

            if ( is_null( $productotipo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Tipo de Producto no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            $obj_productotipo = new Producto();

            if ( $obj_productotipo->tieneProductoTipo( $obj_productotipo, $request->idproductotipo ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene en Producto Agregado.',
                ] );
            }

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Tipo de Producto eliminado éxitosamente.',
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
                'idproductotipo' => 'required',
            ];

            $mensajes = [
                'idproductotipo.required' => 'El ID Tipo de Producto es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idproductotipo = $request->input('idproductotipo');
            
            $obj = new ProductoTipo();
            $productotipo = $obj->searchByID( $idproductotipo );

            if ( is_null( $productotipo ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Tipo de Producto no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'productotipo' => $productotipo,
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

            $obj = new ProductoTipo();

            $productotipo = $obj->get_data( $obj, $request );

            if ( sizeof( $productotipo ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Tipo de Producto insertado.',
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
                'arrayProductoTipo' => $productotipo,
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
