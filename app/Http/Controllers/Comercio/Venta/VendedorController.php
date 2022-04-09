<?php

namespace App\Http\Controllers\Comercio\Venta;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Venta\VendedorRequest;
use App\Models\Comercio\Venta\Vendedor;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class VendedorController extends Controller
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
            $venddor = new Vendedor();

            if ( $esPaginado == 0 ) {

                $vendedor = $venddor->get_data( $venddor, $request );

                return response( )->json( [
                    'response' => 1,
                    'arrayVendedor'  => $vendedor,
                ] );
            }

            $vendedor = $venddor->get_paginate( $venddor, $request );

            return response( )->json( [
                'response' => 1,
                'arrayVendedor'  => $vendedor->getCollection(),
                'pagination' => [
                    'total'        => $vendedor->total(),
                    'current_page' => $vendedor->currentPage(),
                    'per_page'     => $vendedor->perPage(),
                    'last_page'    => $vendedor->lastPage(),
                    'from'         => $vendedor->firstItem(),
                    'to'           => $vendedor->lastItem(),
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

            $venddor = new Vendedor();
            $idvendedor = $venddor->newID();

            return response()->json( [
                'response' => 1,
                'idvendedor'  => $idvendedor,
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
    public function store( VendedorRequest $request )
    {
        try {

            $venddor = new Vendedor();
            $vendedor = $venddor->store( $venddor, $request );

            return response( )->json( [
                'response' => 1,
                'vendedor' => $vendedor,
                'message'  => 'Vendedor registrado éxitosamente.',
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
    public function show( Request $request, $idvendedor )
    {
        try {

            $venddor = new Vendedor();
            $vendedor = $venddor->show( $venddor, $idvendedor );

            if ( is_null( $vendedor ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Vendedor no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'vendedor'   => $vendedor,
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
    public function edit( Request $request, $idvendedor )
    {
        try {

            $venddor = new Vendedor();
            $vendedor = $venddor->show( $venddor, $idvendedor );

            if ( is_null( $vendedor ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Vendedor no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'vendedor'   => $vendedor,
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
    public function update( VendedorRequest $request )
    {
        try {

            $regla = [
                'idvendedor' => 'required',
            ];

            $mensajes = [
                'idvendedor.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $venddor = new Vendedor();

            $vendedor = $venddor->find( $request->idvendedor );
            if ( is_null( $vendedor ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Vendedor no existe.',
                ] );
            }

            $vendedorupdate = $venddor->upgrade( $venddor, $request );

            if ( $vendedorupdate ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Vendedor actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Vendedor.',
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
                'idvendedor' => 'required',
            ];

            $mensajes = [
                'idvendedor.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $venddor = new Vendedor();
            $vendedor = $venddor->find( $request->idvendedor );

            if ( is_null( $vendedor ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Vendedor no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            /* fin de restriccion */

            $vendedordelete = $vendedor->delete();

            if ( $vendedordelete ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Vendedor eliminado éxitosamente.',
                    'vendedordelete' => $vendedordelete,
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al eliminar, favor de intentar nuevamente.',
                'vendedordelete' => $vendedordelete,
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
                'idvendedor' => 'required',
            ];

            $mensajes = [
                'idvendedor.required' => 'El ID es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idvendedor = $request->input('idvendedor');

            $venddor = new Vendedor();
            $vendedor = $venddor->searchByID( $venddor, $idvendedor );

            if ( is_null( $vendedor ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Vendedor no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'vendedor' => $vendedor,
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

            $venddor = new Vendedor();

            $vendedor = $venddor->get_data( $venddor, $request );

            if ( sizeof( $vendedor ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Vendedor insertado.',
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
                'arrayVendedor' => $vendedor,
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
