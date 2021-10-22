<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Inventario\ProductoMarcaRequest;
use App\Models\Comercio\Inventario\Producto;
use App\Models\Comercio\Inventario\ProductoMarca;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ProductoMarcaController extends Controller
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
            $obj = new ProductoMarca();

            if ( $esPaginado == 0 ) {

                $productomarca = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'productomarca'  => $productomarca,
                ] );
            }

            $productomarca = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'productomarca'  => $productomarca->getCollection(),
                'pagination' => [
                    'total'        => $productomarca->total(),
                    'current_page' => $productomarca->currentPage(),
                    'per_page'     => $productomarca->perPage(),
                    'last_page'    => $productomarca->lastPage(),
                    'from'         => $productomarca->firstItem(),
                    'to'           => $productomarca->lastItem(),
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

            $obj = new ProductoMarca();
            $idproductomarca = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idproductomarca'  => $idproductomarca,
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
    public function store( ProductoMarcaRequest $request)
    {
        try {

            $obj = new ProductoMarca();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Marca de Producto ya existe.',
                ] );
            }

            $productomarca = $obj->store( $obj, $request );

            return response( )->json( [
                'response'     => 1,
                'productomarca' => $productomarca,
                'message'      => 'Marca de Producto registrado éxitosamente.',
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
    public function update( ProductoMarcaRequest $request )
    {
        try {

            $regla = [
                'idproductomarca' => 'required',
            ];

            $mensajes = [
                'idproductomarca.required' => 'El ID Marca de Producto es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ProductoMarca();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Marca de Producto ya existe.',
                ] );
            }

            $productomarca = $obj->find( $request->idproductomarca );

            if ( is_null( $productomarca ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Marca de Producto no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Marca de Producto actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Marca de Producto.',
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
                'idproductomarca' => 'required',
            ];

            $mensajes = [
                'idproductomarca.required' => 'El ID Marca de Producto es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ProductoMarca();
            $productomarca = $obj->find( $request->idproductomarca );

            if ( is_null( $productomarca ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Marca de Producto no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            $obj_productomarca = new Producto();

            if ( $obj_productomarca->tieneProductoMarca( $obj_productomarca, $request->idproductomarca ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene en Producto Agregado.',
                ] );
            }

            if ( $productomarca->isdelete == "N" ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Acción no permitido.',
                ] );
            }

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Marca de Producto eliminado éxitosamente.',
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
                'idproductomarca' => 'required',
            ];

            $mensajes = [
                'idproductomarca.required' => 'El ID Marca de Producto es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idproductomarca = $request->input('idproductomarca');
            
            $obj = new ProductoMarca();
            $productomarca = $obj->searchByID( $idproductomarca );

            if ( is_null( $productomarca ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Marca de Producto no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'productomarca' => $productomarca,
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

            $obj = new ProductoMarca();

            $productomarca = $obj->get_data( $obj, $request );

            if ( sizeof( $productomarca ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Marca de Producto insertado.',
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
                'arrayProductoMarca' => $productomarca,
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
