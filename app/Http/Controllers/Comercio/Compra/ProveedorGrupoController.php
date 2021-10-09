<?php

namespace App\Http\Controllers\Comercio\Compra;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Compra\ProveedorGrupoRequest;
use App\Models\Comercio\Compra\Proveedor;
use App\Models\Comercio\Compra\ProveedorGrupo;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ProveedorGrupoController extends Controller
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
            $obj = new ProveedorGrupo();

            if ( $esPaginado == 0 ) {

                $proveedorgrupo = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'proveedorgrupo'  => $proveedorgrupo,
                ] );
            }

            $proveedorgrupo = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'proveedorgrupo'  => $proveedorgrupo->getCollection(),
                'pagination' => [
                    'total'        => $proveedorgrupo->total(),
                    'current_page' => $proveedorgrupo->currentPage(),
                    'per_page'     => $proveedorgrupo->perPage(),
                    'last_page'    => $proveedorgrupo->lastPage(),
                    'from'         => $proveedorgrupo->firstItem(),
                    'to'           => $proveedorgrupo->lastItem(),
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

            $obj = new ProveedorGrupo();
            $idproveedorgrupo = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idproveedorgrupo'  => $idproveedorgrupo,
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
    public function store(ProveedorGrupoRequest $request)
    {
        try {

            $obj = new ProveedorGrupo();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Grupo Proveedor ya existe.',
                ] );
            }

            $proveedorgrupo = $obj->store( $obj, $request );

            return response( )->json( [
                'response' => 1,
                'proveedorgrupo' => $proveedorgrupo,
                'message'  => 'Grupo Proveedor registrado éxitosamente.',
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
    public function show( Request $request, $idproveedorgrupo )
    {
        try {

            $obj = new ProveedorGrupo();
            $proveedorgrupo = $obj->show( $obj, $idproveedorgrupo );

            if ( is_null( $proveedorgrupo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Grupo Proveedor no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'proveedorgrupo'   => $proveedorgrupo,
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
    public function edit( Request $request, $idproveedorgrupo )
    {
        try {

            $obj = new ProveedorGrupo();
            $proveedorgrupo = $obj->show( $obj, $idproveedorgrupo );

            if ( is_null( $proveedorgrupo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Grupo Proveedor no existente, favor revisar.',
                ] );
            }


            return response()->json( [
                'response' => 1,
                'proveedorgrupo'   => $proveedorgrupo,
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
    public function update(ProveedorGrupoRequest $request)
    {
        try {

            $regla = [
                'idproveedorgrupo' => 'required',
            ];

            $mensajes = [
                'idproveedorgrupo.required' => 'El ID Grupo Proveedor es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ProveedorGrupo();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Grupo Proveedor ya existe.',
                ] );
            }

            $proveedorgrupo = $obj->find( $request->idproveedorgrupo );

            if ( is_null( $proveedorgrupo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Grupo Proveedor no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Grupo Proveedor actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Grupo Proveedor.',
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
                'idproveedorgrupo' => 'required',
            ];

            $mensajes = [
                'idproveedorgrupo.required' => 'El ID Grupo Proveedor es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ProveedorGrupo();
            $proveedorgrupo = $obj->find( $request->idproveedorgrupo );

            if ( is_null( $proveedorgrupo ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Grupo Proveedor no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            $obj_proveedor = new Proveedor();

            if ( $obj_proveedor->tieneProveedorGrupo( $obj_proveedor, $request->idproveedorgrupo ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene en Proveedor Agregado.',
                ] );
            }

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Grupo Proveedor eliminado éxitosamente.',
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
                'idproveedorgrupo' => 'required',
            ];

            $mensajes = [
                'idproveedorgrupo.required' => 'El ID Grupo Proveedor es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idproveedorgrupo = $request->input('idproveedorgrupo');
            
            $obj = new ProveedorGrupo();
            $proveedorgrupo = $obj->searchByID( $obj, $idproveedorgrupo );

            if ( is_null( $proveedorgrupo ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Grupo Proveedor no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'proveedorgrupo' => $proveedorgrupo,
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

            $obj = new ProveedorGrupo();

            $proveedorgrupo = $obj->get_data( $obj, $request );

            if ( sizeof( $proveedorgrupo ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Grupo Proveedor insertado.',
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
                'arrayProveedorGrupo' => $proveedorgrupo,
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
