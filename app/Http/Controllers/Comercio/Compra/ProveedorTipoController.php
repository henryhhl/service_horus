<?php

namespace App\Http\Controllers\Comercio\Compra;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Compra\ProveedorTipoRequest;
use App\Models\Comercio\Compra\Proveedor;
use App\Models\Comercio\Compra\ProveedorTipo;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ProveedorTipoController extends Controller
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
            $obj = new ProveedorTipo();

            if ( $esPaginado == 0 ) {

                $proveedortipo = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'proveedortipo'  => $proveedortipo,
                ] );
            }

            $proveedortipo = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'proveedortipo'  => $proveedortipo->getCollection(),
                'pagination' => [
                    'total'        => $proveedortipo->total(),
                    'current_page' => $proveedortipo->currentPage(),
                    'per_page'     => $proveedortipo->perPage(),
                    'last_page'    => $proveedortipo->lastPage(),
                    'from'         => $proveedortipo->firstItem(),
                    'to'           => $proveedortipo->lastItem(),
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

            $obj = new ProveedorTipo();
            $idproveedortipo = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idproveedortipo'  => $idproveedortipo,
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
    public function store(ProveedorTipoRequest $request)
    {
        try {

            $obj = new ProveedorTipo();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Tipo Proveedor ya existe.',
                ] );
            }

            $proveedortipo = $obj->store( $obj, $request );

            return response( )->json( [
                'response' => 1,
                'proveedortipo' => $proveedortipo,
                'message'  => 'Tipo Proveedor registrado éxitosamente.',
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
    public function show( Request $request, $idproveedortipo )
    {
        try {

            $obj = new ProveedorTipo();
            $proveedortipo = $obj->show( $obj, $idproveedortipo );

            if ( is_null( $proveedortipo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Tipo Proveedor no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'proveedortipo'   => $proveedortipo,
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
    public function edit( Request $request, $idproveedortipo )
    {
        try {

            $obj = new ProveedorTipo();
            $proveedortipo = $obj->show( $obj, $idproveedortipo );

            if ( is_null( $proveedortipo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Tipo Proveedor no existente, favor revisar.',
                ] );
            }


            return response()->json( [
                'response' => 1,
                'proveedortipo'   => $proveedortipo,
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
    public function update(ProveedorTipoRequest $request)
    {
        try {

            $regla = [
                'idproveedortipo' => 'required',
            ];

            $mensajes = [
                'idproveedortipo.required' => 'El ID Tipo Proveedor es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ProveedorTipo();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Tipo Proveedor ya existe.',
                ] );
            }

            $proveedortipo = $obj->find( $request->idproveedortipo );

            if ( is_null( $proveedortipo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Tipo Proveedor no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Tipo Proveedor actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Tipo Proveedor.',
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
                'idproveedortipo' => 'required',
            ];

            $mensajes = [
                'idproveedortipo.required' => 'El ID Tipo Proveedor es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ProveedorTipo();
            $proveedortipo = $obj->find( $request->idproveedortipo );

            if ( is_null( $proveedortipo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Tipo Proveedor no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            $obj_proveedor = new Proveedor();

            if ( $obj_proveedor->tieneProveedorTipo( $obj_proveedor, $request->idproveedortipo ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene en Proveedor Agregado.',
                ] );
            }

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Tipo Proveedor eliminado éxitosamente.',
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
                'idproveedortipo' => 'required',
            ];

            $mensajes = [
                'idproveedortipo.required' => 'El ID Tipo Proveedor es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idproveedortipo = $request->input('idproveedortipo');
            
            $obj = new ProveedorTipo();
            $proveedortipo = $obj->searchByID( $obj, $idproveedortipo );

            if ( is_null( $proveedortipo ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Tipo Proveedor no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'proveedortipo' => $proveedortipo,
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

            $obj = new ProveedorTipo();

            $proveedortipo = $obj->get_data( $obj, $request );

            if ( sizeof( $proveedortipo ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Tipo Proveedor insertado.',
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
                'arrayProveedorTipo' => $proveedortipo,
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
