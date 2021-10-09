<?php

namespace App\Http\Controllers\Comercio\Compra;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Compra\ProveedorRequest;
use App\Models\Comercio\Compra\NotaCompra;
use App\Models\Comercio\Compra\OrdenCompra;
use App\Models\Comercio\Compra\Proveedor;
use App\Models\Comercio\Compra\ProveedorPersonal;
use App\Models\Comercio\Compra\ProveedorProductoTipo;
use App\Models\Comercio\Compra\SolicitudCompra;
use App\Models\Comercio\Inventario\ProductoTipo;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProveedorController extends Controller
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
            $obj = new Proveedor();

            if ( $esPaginado == 0 ) {

                $proveedor = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'proveedor'  => $proveedor,
                ] );
            }

            $proveedor = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'proveedor'  => $proveedor->getCollection(),
                'pagination' => [
                    'total'        => $proveedor->total(),
                    'current_page' => $proveedor->currentPage(),
                    'per_page'     => $proveedor->perPage(),
                    'last_page'    => $proveedor->lastPage(),
                    'from'         => $proveedor->firstItem(),
                    'to'           => $proveedor->lastItem(),
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

            $obj = new Proveedor();
            $idproveedor = $obj->newID();
            
            $prodtipo = new ProductoTipo();
            $productotipo = $prodtipo->get_data( $prodtipo, $request );

            return response()->json( [
                'response' => 1,
                'idproveedor' => $idproveedor,
                'arrayProductoTipo'  => $productotipo,
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
    public function store(ProveedorRequest $request)
    {
        try {

            DB::beginTransaction();

            $obj = new Proveedor();

            $proveedor = $obj->store( $obj, $request );
            $array_productotipo = json_decode($request->input('arrayProductoTipo', '[]'));

            foreach ( $array_productotipo as $productotipo ) {
                if ( !is_null( $productotipo->fkidproductotipo ) ) {
                    $productotipo->fkidproveedor = $proveedor->idproveedor;
                    $provprodtipo = new ProveedorProductoTipo();
                    $provprodtipo->store($provprodtipo, $request, $productotipo);
                }
            }

            $array_proveedorpersonal = json_decode($request->input('arrayProveedorPersonal', '[]'));

            foreach ( $array_proveedorpersonal as $proveedorpersonal ) {
                if ( !is_null( $proveedorpersonal->fkidproveedorcargo ) ) {
                    $proveedorpersonal->fkidproveedor = $proveedor->idproveedor;
                    $provpers = new ProveedorPersonal();
                    $provpers->store($provpers, $request, $proveedorpersonal);
                }
            }
            DB::commit();

            return response( )->json( [
                'response' => 1,
                'proveedor' => $proveedor,
                'message'  => 'Proveedor registrado éxitosamente.',
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
    public function show( Request $request, $idproveedor )
    {
        try {

            $obj = new Proveedor();
            $proveedor = $obj->show( $obj, $idproveedor );

            if ( is_null( $proveedor ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Proveedor no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'proveedor'   => $proveedor,
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
    public function edit( Request $request, $idproveedor )
    {
        try {

            $obj = new Proveedor();
            $proveedor = $obj->show( $obj, $idproveedor );

            if ( is_null( $proveedor ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Proveedor no existente, favor revisar.',
                ] );
            }


            return response()->json( [
                'response' => 1,
                'proveedor'   => $proveedor,
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
    public function update(ProveedorRequest $request)
    {
        try {

            $regla = [
                'idproveedor' => 'required',
            ];

            $mensajes = [
                'idproveedor.required' => 'El ID Proveedor es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new Proveedor();
            $proveedor = $obj->find( $request->idproveedor );

            if ( is_null( $proveedor ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Proveedor no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {

                $array_productotipo = json_decode($request->input('arrayProductoTipo', '[]'));

                foreach ( $array_productotipo as $productotipo ) {
                    if ( !is_null( $productotipo->fkidproductotipo ) ) {
                        $productotipo->fkidproveedor = $proveedor->idproveedor;
                        $provprodtipo = new ProveedorProductoTipo();
                        if ( is_null( $productotipo->idproveedorproductotipo ) ) {
                            $provprodtipo->store($provprodtipo, $request, $productotipo);
                        } else {
                            $provprodtipo->upgrade($provprodtipo, $productotipo);
                        }
                    }
                }

                $arrayDeleteProductoTipo = json_decode($request->input('arrayDeleteProductoTipo', '[]'));
                foreach ( $arrayDeleteProductoTipo as $idproveedorproductotipo ) {
                    $provprodtipo = new ProveedorProductoTipo();
                    $provprodtipo->remove($provprodtipo, $idproveedorproductotipo);
                }

                $array_proveedorpersonal = json_decode($request->input('arrayProveedorPersonal', '[]'));

                foreach ( $array_proveedorpersonal as $proveedorpersonal ) {
                    if ( !is_null( $proveedorpersonal->fkidproveedorcargo ) ) {
                        $proveedorpersonal->fkidproveedor = $proveedor->idproveedor;
                        $provpers = new ProveedorPersonal();
                        if ( is_null( $proveedorpersonal->idproveedorpersonal ) ) {
                            $provpers->store($provpers, $request, $proveedorpersonal);
                        } else {
                            $provpers->upgrade($provpers, $proveedorpersonal);
                        }
                    }
                }

                $arrayDeleteProveedorPersonal = json_decode($request->input('arrayDeleteProveedorPersonal', '[]'));
                foreach ( $arrayDeleteProveedorPersonal as $idproveedorpersonal ) {
                    $provpers = new ProveedorPersonal();
                    $provpers->remove($provpers, $idproveedorpersonal);
                }

                return response()->json( [
                    'response' => 1,
                    'message'  => 'Proveedor actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Proveedor.',
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
                'idproveedor' => 'required',
            ];

            $mensajes = [
                'idproveedor.required' => 'El ID Proveedor es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new Proveedor();
            $proveedor = $obj->find( $request->idproveedor );

            if ( is_null( $proveedor ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Proveedor no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            $obj_solicitudcompra = new SolicitudCompra();

            if ( $obj_solicitudcompra->tieneProveedor( $obj_solicitudcompra, $request->idproveedor ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene una transacción Agregado.',
                ] );
            }

            $obj_ordencompra = new OrdenCompra();

            if ( $obj_ordencompra->tieneProveedor( $obj_ordencompra, $request->idproveedor ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene una transacción Agregado.',
                ] );
            }

            $obj_notacompra = new NotaCompra();

            if ( $obj_notacompra->tieneProveedor( $obj_notacompra, $request->idproveedor ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene una transacción Agregado.',
                ] );
            }

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Proveedor eliminado éxitosamente.',
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
                'idproveedor' => 'required',
            ];

            $mensajes = [
                'idproveedor.required' => 'El ID Proveedor es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idproveedor = $request->input('idproveedor');
            
            $obj = new Proveedor();
            $proveedor = $obj->searchByID( $obj, $idproveedor );

            if ( is_null( $proveedor ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Proveedor no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'proveedor' => $proveedor,
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

            $obj = new Proveedor();

            $proveedor = $obj->get_data( $obj, $request );

            if ( sizeof( $proveedor ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Proveedor insertado.',
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
                'arrayProveedor' => $proveedor,
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
