<?php

namespace App\Http\Controllers\Comercio\Compra;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Compra\ProveedorCargoRequest;
use App\Models\Comercio\Compra\ProveedorCargo;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ProveedorCargoController extends Controller
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
            $obj = new ProveedorCargo();

            if ( $esPaginado == 0 ) {

                $proveedorcargo = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'proveedorcargo'  => $proveedorcargo,
                ] );
            }

            $proveedorcargo = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'proveedorcargo'  => $proveedorcargo->getCollection(),
                'pagination' => [
                    'total'        => $proveedorcargo->total(),
                    'current_page' => $proveedorcargo->currentPage(),
                    'per_page'     => $proveedorcargo->perPage(),
                    'last_page'    => $proveedorcargo->lastPage(),
                    'from'         => $proveedorcargo->firstItem(),
                    'to'           => $proveedorcargo->lastItem(),
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

            $obj = new ProveedorCargo();
            $idproveedorcargo = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idproveedorcargo'  => $idproveedorcargo,
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
    public function store(ProveedorCargoRequest $request)
    {
        try {

            $obj = new ProveedorCargo();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Cargo Proveedor ya existe.',
                ] );
            }

            $proveedorcargo = $obj->store( $obj, $request );

            return response( )->json( [
                'response' => 1,
                'proveedorcargo' => $proveedorcargo,
                'message'  => 'Cargo Proveedor registrado éxitosamente.',
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
    public function show( Request $request, $idproveedorcargo )
    {
        try {

            $obj = new ProveedorCargo();
            $proveedorcargo = $obj->show( $obj, $idproveedorcargo );

            if ( is_null( $proveedorcargo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Cargo Proveedor no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'proveedorcargo'   => $proveedorcargo,
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
    public function edit( Request $request, $idproveedorcargo )
    {
        try {

            $obj = new ProveedorCargo();
            $proveedorcargo = $obj->show( $obj, $idproveedorcargo );

            if ( is_null( $proveedorcargo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Cargo Proveedor no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'proveedorcargo'   => $proveedorcargo,
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
    public function update( ProveedorCargoRequest $request )
    {
        try {

            $regla = [
                'idproveedorcargo' => 'required',
            ];

            $mensajes = [
                'idproveedorcargo.required' => 'El ID Cargo Proveedor es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ProveedorCargo();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Cargo Proveedor ya existe.',
                ] );
            }

            $proveedorcargo = $obj->find( $request->idproveedorcargo );

            if ( is_null( $proveedorcargo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Cargo Proveedor no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Cargo Proveedor actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Cargo Proveedor.',
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
                'idproveedorcargo' => 'required',
            ];

            $mensajes = [
                'idproveedorcargo.required' => 'El ID Cargo Proveedor es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ProveedorCargo();
            $proveedorcargo = $obj->find( $request->idproveedorcargo );

            if ( is_null( $proveedorcargo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Cargo Proveedor no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Cargo Proveedor eliminado éxitosamente.',
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
                'idproveedorcargo' => 'required',
            ];

            $mensajes = [
                'idproveedorcargo.required' => 'El ID Cargo Proveedor es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idproveedorcargo = $request->input('idproveedorcargo');
            
            $obj = new ProveedorCargo();
            $proveedorcargo = $obj->searchByID( $obj, $idproveedorcargo );

            if ( is_null( $proveedorcargo ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Cargo Proveedor no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'proveedorcargo' => $proveedorcargo,
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

            $obj = new ProveedorCargo();

            $proveedorcargo = $obj->get_data( $obj, $request );

            if ( sizeof( $proveedorcargo ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Cargo Proveedor insertado.',
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
                'arrayProveedorCargo' => $proveedorcargo,
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
