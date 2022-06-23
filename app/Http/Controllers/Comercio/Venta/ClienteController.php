<?php

namespace App\Http\Controllers\Comercio\Venta;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Venta\ClienteRequest;
use App\Models\Comercio\Venta\Cliente;
use App\Models\Comercio\Venta\NotaVenta;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ClienteController extends Controller
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
            $clte = new Cliente();

            if ( $esPaginado == 0 ) {

                $cliente = $clte->get_data( $clte, $request );

                return response( )->json( [
                    'response' => 1,
                    'arrayCliente'  => $cliente,
                ] );
            }

            $cliente = $clte->get_paginate( $clte, $request );

            return response( )->json( [
                'response' => 1,
                'arrayCliente'  => $cliente->getCollection(),
                'pagination' => [
                    'total'        => $cliente->total(),
                    'current_page' => $cliente->currentPage(),
                    'per_page'     => $cliente->perPage(),
                    'last_page'    => $cliente->lastPage(),
                    'from'         => $cliente->firstItem(),
                    'to'           => $cliente->lastItem(),
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

            $clte = new Cliente();
            $idcliente = $clte->newID();

            return response()->json( [
                'response' => 1,
                'idcliente'  => $idcliente,
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
    public function store( ClienteRequest $request )
    {
        try {

            $clte = new Cliente();
            $cliente = $clte->store( $clte, $request );

            return response( )->json( [
                'response' => 1,
                'cliente' => $cliente,
                'message'  => 'Cliente registrado éxitosamente.',
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
    public function show( Request $request, $idcliente )
    {
        try {

            $clte = new Cliente();
            $cliente = $clte->show( $clte, $idcliente );

            if ( is_null( $cliente ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Cliente no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'cliente'   => $cliente,
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
    public function edit( Request $request, $idcliente )
    {
        try {

            $clte = new Cliente();
            $cliente = $clte->show( $clte, $idcliente );

            if ( is_null( $cliente ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Cliente no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'cliente'   => $cliente,
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
    public function update( ClienteRequest $request )
    {
        try {

            $regla = [
                'idcliente' => 'required',
            ];

            $mensajes = [
                'idcliente.required' => 'El ID cliente es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $clte = new Cliente();

            $cliente = $clte->find( $request->idcliente );
            if ( is_null( $cliente ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Cliente no existe.',
                ] );
            }

            $clienteupdate = $clte->upgrade( $clte, $request );

            if ( $clienteupdate ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Cliente actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Cliente.',
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
                'idcliente' => 'required',
            ];

            $mensajes = [
                'idcliente.required' => 'El ID Cliente es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $clte = new Cliente();
            $cliente = $clte->find( $request->idcliente );

            if ( is_null( $cliente ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Cliente no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            $ntavta = new NotaVenta();
            if ( $ntavta->existCliente( $ntavta, $cliente->idcliente ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene transacción realizado.',
                ] );
            }

            /* fin de restriccion */

            $clientedelete = $cliente->delete();

            if ( $clientedelete ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Cliente eliminado éxitosamente.',
                    'clientedelete' => $clientedelete,
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al eliminar, favor de intentar nuevamente.',
                'clientedelete' => $clientedelete,
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
                'idcliente' => 'required',
            ];

            $mensajes = [
                'idcliente.required' => 'El ID Cliente es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idcliente = $request->input('idcliente');

            $clte = new Cliente();
            $cliente = $clte->searchByID( $clte, $idcliente );

            if ( is_null( $cliente ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Cliente no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'cliente' => $cliente,
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

    public function searchByNit( Request $request ) {
        try {

            $nitcliente = isset( $request->nitcliente ) ? $request->nitcliente : "";
            $clte = new Cliente();
            $arrayCliente = $clte->searchByNit( $clte, $nitcliente );

            return response()->json( [
                'response'  => 1,
                'arrayCliente' => $arrayCliente,
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

            $clte = new Cliente();

            $cliente = $clte->get_data( $clte, $request );

            if ( sizeof( $cliente ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Cliente insertado.',
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
                'arrayCliente' => $cliente,
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
