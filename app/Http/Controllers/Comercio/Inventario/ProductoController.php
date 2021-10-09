<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Inventario\ProductoRequest;
use App\Models\Comercio\Compra\ProveedorProducto;
use App\Models\Comercio\Inventario\Producto;
use App\Models\Comercio\Inventario\ProductoTipo;
use App\Models\Comercio\Inventario\UnidadMedida;
use App\Models\Comercio\Inventario\UnidadMedidaProducto;
use App\Models\Comercio\Venta\ListaPrecio;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProductoController extends Controller
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
            $obj = new Producto();

            if ( $esPaginado == 0 ) {

                $producto = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'producto'  => $producto,
                ] );
            }

            $producto = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'producto'  => $producto->getCollection(),
                'pagination' => [
                    'total'        => $producto->total(),
                    'current_page' => $producto->currentPage(),
                    'per_page'     => $producto->perPage(),
                    'last_page'    => $producto->lastPage(),
                    'from'         => $producto->firstItem(),
                    'to'           => $producto->lastItem(),
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

            $obj = new Producto();
            $idproducto = $obj->newID();

            $list = new ListaPrecio();
            $listaprecio = $list->get_data( $list, $request );

            $tipprod = new ProductoTipo();
            $productotipo = $tipprod->get_data( $tipprod, $request );

            $undmed = new UnidadMedida();
            $unidadmedida = $undmed->get_data( $undmed, $request );

            return response()->json( [
                'response' => 1,
                'idproducto'        => $idproducto,
                'arrayListaPrecio'  => $listaprecio,
                'arrayProductoTipo' => $productotipo,
                'arrayUnidadMedida' => $unidadmedida,
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
    public function store(ProductoRequest $request)
    {
        try {

            DB::beginTransaction();

            $obj = new Producto();
            $producto = $obj->store( $obj, $request );

            $array_unidadmedidaproducto = json_decode($request->input('arrayUnidadMedidaProducto', '[]'));
            $stocktotal = 0;

            foreach ( $array_unidadmedidaproducto as $unidadmedidaproducto ) {
                if ( !is_null( $unidadmedidaproducto->fkidunidadmedida ) ) {
                    $unidadmedidaproducto->fkidproducto = $producto->idproducto;
                    $undmedprod = new UnidadMedidaProducto();
                    $undmedprod->store($undmedprod, $request, $unidadmedidaproducto);
                    $stocktotal += intval( $unidadmedidaproducto->stock );
                }
            }

            $array_proveedor = json_decode($request->input('arrayProveedor', '[]'));

            foreach ( $array_proveedor as $proveedor ) {
                if ( !is_null( $proveedor->fkidproveedor ) ) {
                    $proveedor->fkidproducto = $producto->idproducto;
                    $proveedorproducto = new ProveedorProducto();
                    $proveedorproducto->store($proveedorproducto, $request, $proveedor);
                }
            }

            $producto->stockactual = $stocktotal;
            $producto->update();

            DB::commit();
            return response( )->json( [
                'response' => 1,
                'producto' => $producto,
                'message'  => 'Producto registrado éxitosamente.',
            ] );
            
        } catch ( \Exception $th ) {

            DB::rollBack();
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
    public function show( Request $request, $idproducto )
    {
        try {

            $obj = new Producto();
            $producto = $obj->show( $obj, $idproducto );

            if ( is_null( $producto ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Producto no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'producto'   => $producto,
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
    public function edit( Request $request, $idproducto )
    {
        try {

            $obj = new Producto();
            $producto = $obj->show( $obj, $idproducto );

            if ( is_null( $producto ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Producto no existente, favor revisar.',
                ] );
            }


            return response()->json( [
                'response' => 1,
                'producto'   => $producto,
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
    public function update( ProductoRequest $request )
    {
        try {

            DB::beginTransaction();

            $regla = [
                'idproducto' => 'required',
            ];

            $mensajes = [
                'idproducto.required' => 'El ID Producto es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new Producto();
            $producto = $obj->find( $request->idproducto );

            if ( is_null( $producto ) ) {
                DB::commit();
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Producto no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {

                $array_unidadmedidaproducto = json_decode($request->input('arrayUnidadMedidaProducto', '[]'));
                $stocktotal = 0;

                foreach ( $array_unidadmedidaproducto as $unidadmedidaproducto ) {
                    if ( !is_null( $unidadmedidaproducto->fkidunidadmedida ) ) {
                        $unidadmedidaproducto->fkidproducto = $producto->idproducto;
                        $undmedprod = new UnidadMedidaProducto();
                        if ( is_null( $unidadmedidaproducto->idunidadmedidaproducto ) ) {
                            $undmedprod->store($undmedprod, $request, $unidadmedidaproducto);
                        } else {
                            $undmedprod->upgrade($undmedprod, $unidadmedidaproducto);
                        }
                        $stocktotal += intval( $unidadmedidaproducto->stock );
                    }
                }

                $array_proveedor = json_decode($request->input('arrayProveedor', '[]'));
                foreach ( $array_proveedor as $proveedor ) {
                    if ( !is_null( $proveedor->fkidproveedor ) ) {
                        $proveedor->fkidproducto = $producto->idproducto;
                        $proveedorproducto = new ProveedorProducto();
                        if ( is_null( $proveedor->idproveedorproducto ) ) {
                            $proveedorproducto->store($proveedorproducto, $request, $proveedor);
                        } else {
                            $proveedorproducto->upgrade($proveedorproducto, $proveedor);
                        }
                    }
                }

                $producto->stockactual = $stocktotal;
                $producto->update();

                $arrayDeleteUnidadMedida = json_decode($request->input('arrayDeleteUnidadMedida', '[]'));
                foreach ( $arrayDeleteUnidadMedida as $idunidadmedidaproducto ) {
                    $unidadmedidaproducto = new UnidadMedidaProducto();
                    $unidadmedidaproducto->remove($unidadmedidaproducto, $idunidadmedidaproducto);
                }
                $arrayDeleteProveedor = json_decode($request->input('arrayDeleteProveedor', '[]'));
                foreach ( $arrayDeleteProveedor as $idproveedorproducto ) {
                    $proveedorproducto = new ProveedorProducto();
                    $proveedorproducto->remove($proveedorproducto, $idproveedorproducto);
                }

                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Producto actualizado éxitosamente.',
                ] );
            }
            DB::rollBack();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Producto.',
            ] );
            
        } catch ( \Exception $th ) {
            DB::rollBack();
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
                'idproducto' => 'required',
            ];

            $mensajes = [
                'idproducto.required' => 'El ID Producto es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new Producto();
            $producto = $obj->find( $request->idproducto );

            if ( is_null( $producto ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Producto no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            //

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Producto eliminado éxitosamente.',
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
                'idproducto' => 'required',
            ];

            $mensajes = [
                'idproducto.required' => 'El ID Producto es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idproducto = $request->input('idproducto');
            
            $obj = new Producto();
            $producto = $obj->searchByID( $obj, $idproducto );

            if ( is_null( $producto ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Producto no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'producto' => $producto,
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

            $obj = new Producto();

            $producto = $obj->get_data( $obj, $request );

            if ( sizeof( $producto ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Producto insertado.',
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
                'arrayProducto' => $producto,
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
